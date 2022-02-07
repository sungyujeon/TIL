# 오류 처리

> 오류 처리는 프로그램에 반드시 필요한 요소 중 하나
>
> 깨끗한 코드와 오류 처리는 연관성이 있음
>
> - 오류 처리 코드로 인해 프로그램 논리를 이해하기 어려워진다면 깨끗한 코드라고 할 수 없음
> - 여기저기 흩어진 오류 처리 코드 때문에 실제 코드가 하는 일을 파악하기 어렵게 해서는 안됨



### 오류 코드보다 예외를 사용하라

```java
// bad
public class DeviceController {
	
	public void sendShutDown() {
		DeviceHandle handle = getHandle(DEV1);
		// 디바이스 상태를 점검한다.
		if (handle != DeviceHandle.INVALID) {
			// 레코드 필드에 디바이스 상태를 저장한다.
			retrieveDeviceRecord(handle);
			// 디바이스가 일시정지 상태가 아니라면 종료한다.
			if (record.getStatus() != DEVICE_SUSPENDED) {
				pauseDevice(handle);
				clearDeviceWorkQueue(handle);
				closeDevice(handle);
			} else {
				logger.log("Device suspended. Unable to shut down");
			}
		} else {
			logger.log("Invalid handle for: " + DEV1.toString());
		}
	}
}

// good
public class DeviceController {
	
	public void sendShutDown() {
		try {
			tryToShutDown();
		} catch (DeviceShutDownError e) {
			logger.log(e);
		}
		
		private void tryToShutDown() throws DeviceShutDownError {
			DeviceHandle handle = getHandle(DEV1);
			DeviceRecord record = retrieveDeviceRecord(handle);
			
			pauseDevice(handle);
			clearDeviceWorkQueue(handle);
			closeDevice(handle);
		}
		
		private DeviceHandle getHandle(DeviceID id) {
			//...
			throw new DeviceShutDownError("Invalid handle for: " + id.toString());
		}
	}
}
```

- 오류 코드를 일일이 작성하면 호출자 코드가 복잡해짐(함수를 호출한 즉시 오류를 확인해야 하기 때문)
- 디바이스를 종료하는 알고리즘과 오류를 처리하는 알고리즘을 분리해서 각 개념을 독립적으로 이해할 수 있게됨



### Try-Catch-Finally 문부터 작성하라

```java
// test
@Test(expected = StorageException.class)
public void retrieveSectionShouldThrowOnInvalidFileName() {
    sectionStore.retrieveSection("invalid - file");
}

// 단위 테스트에 맞춘 코드
// 잘못된 파일 접근 시 예외를 던지지 않으므로 실패
public List<recordedGrip> retrieveSection(String sectionName) {
    // 실제로 구현할 때까지 비어 있는 더미를 반환한다
    return new ArrayList<RecordedGrip>();
}

// 예외를 추가한 코드
public List<RecordedGrip> retrieveSection(String sectionName) {
    try {
        FileInputStream stream = new FileInputStream(sectionName);
    } catch (Exception e) {
        throw new StorageException("retrieval error", e);
    }
    return new ArrayList<RecordedGrip>();
}

// 예외를 FileNotFoundException 으로 유형을 좁힌 경우
public List<RecordedGrip> retrieveSection(String sectionName) {
    try {
        FileInputStream stream = new FileInputStream(sectionName);
        stream.close();
    } catch (FileNotFoundException e) {
        throw new StorageException("retrieval error", e);
    }
    return new ArrayList<RecordedGrip>();
}
```

- try 블록은 트랜잭션과 비슷하다. try 블록에서 무슨 일이 생기든지 catch 블록은 프로그램 상태를 일관성 있게 유지해야 한다
- 나머지 논리는 FileInputStream을 생성하는 코드와 close 호출문 사이에 넣으며 오류나 예외가 전혀 발생하지 않는다고 가정
- 먼저 강제로 예외를 일으키는 테스트 케이스를 작성한 후 테스트를 통과하게 코드를 작성하는 방법을 권장. 그러면 자연스럽게 try 블록의 트랜잭션 범위부터 구현하게 되므로 범위 내에서 트랜잭션 본질을 유지하기 쉬워짐



### 미확인(unchecked) 예외를 사용하라

- 기존의 확인된 예외

  - 메서드를 선언할 때 메서드가 반환할 예외를 모두 열거

  - 최근에는 확인된 예외가 안정적인 소프트웨어를 만드는 데 반드시 필요하진 않음

    (C#, C++, 파이썬, 루비 등..)

  - 확인된 오류가 치르는 비용에 상응하는 이익을 제공하는지 따져봐야 함

    - 확인된 예외는 OCP(Open Closed Principle)를 위반함
    - 메서드에서 확인된 예외를 던졌는데 catch 블럭이 세 단계 위에 있다면 그 사이 메서드 모두가 선언부에 해당 예외를 정의해야 함. 즉, 하위 단계에서 코드를 변경하면 상위 단계 메서드 선언부를 전부 고쳐야 함

  - 일반적인 애플리케이션은 의존성이라는 비용이 이익보다 크다

- 미확인 예외



### 예외에 의미를 제공하라



- 예외를 던질 때는 전후 상황을 충분히 덧붙인다
- 이를 통해 발생 원인과 위치 찾기가 쉬워진다
- 자바는 모든 예외에 호출 스택을 제공하지만, 오류 메시지에 정보(실패한 연산 이름, 실패 유형 등)를 담아 예외와 함께 던지는 것이 좋다
- 로깅 기능을 사용한다면 catch 블록에서 오류를 기록하도록 충분한 정보를 넘겨준다



### 호출자를 고려해 예외 클래스를 정의하라

```java
// bad
ACMEPort port = new ACMEPort(12);

try {
    port.open();    
} catch (DeviceResponseException e) {
    reportPortError(e);
    logger.log("Device response exception", e);
} catch (ATM1212UnlockedException e) {
    reportPortError(e);
    logger.log("Unlock exception", e);
} catch (GMXError e) {
    reportPortError(e);
    logger.log("Device response exception");
} finally {
    //...
}

// good
LocalPort port = new LocalPort(12);
try {
    port.open();
} catch (PortDeviceFailure e) {
    reportError(e);
    logger.log(e.getMessage(), e);
} finally {
    //...
}

public class LocalPort {
    private ACMEPort innerPort;
    
    public LocalPort(int portNumber) {
        innerPort = new ACMEPort(portNumber);
    }
    
    public void open() {
        try {
            innerPort.open();
        } catch (DeviceResponseException e) {
            throw new PortDeviceFailure(e);
        } catch (ATM1212UnlockedException e) {
            throw new PortDeviceFailure(e);
        } catch (GMXError e) {
            throw new PortDeviceFailure(e);
        }
    }
}
```

- 오류를 분류하는 다양한 방법(컴포넌트, 유형 등)이 있지만, 오류를 정의할 때 가장 중요한 관심사는 <b>오류를 잡아내는 방법</b>이 되어야 한다

- 위 코드에서 예외에 대응하는 방법이 예외 유형과 무관하게 거의 동일하므로, Wrapper 클래스를 통해 예외를 잡는다
- 외부 API를 사용할 때는 Wrapper 클래스를 만드는 방식이 최선인데, 이를 통해 외부 라이브러리와 프로그램 사이의 의존성이 크게 줄어든다
  - 나중에 다른 라이브러리로 바꿔도 비용이 적음
  - 외부 API를 호출하는 대신 테스트 코드를 넣어서 테스트 하기도 쉬워짐
  - 특정 업체가 API를 설계한 방식에 발목 잡히지 않음(사용하기 편리하게 customizing 하면 됨)



### 정상 흐름을 정의하라

```java
// bad
try {
    MealExpenses expenses = expenseReportDAO.getMeals(employee.getID());
    m_total += expenses.getTotal();
} catch (MealExpensesNotFound e) {
    m_total += getMealPerDiem();
}

// good
MealExpenses expenses = expenseReportDAO.getMeals(employee.getID());
m_total += expenses.getTotal();

public class PerDiemMealExpenses implements MealExpenses {
    public int getTotal() {
        // 기본값으로 일일 기본 식비를 반환
    }
}
```

- 특수 사례 패턴(special case pattern)이라 부름
- 클래스를 만들거나 객체를 조작해 특수 사례를 처리하는 방식
- 클라이언트 코드가 예외적인 상황을 처리할 필요가 없어지고, 클래스나 객체가 예외적인 상황을 캡슐화해서 처리할 수 있음



### null을 반환하지 마라

```java
// worst
public void registerItem(Item item) {
    if (item != null) {
        ItemRegistry registry = persistentStore.getItemRegistry();
        if (registry != null) {
            Item existing = registry.getItem(item.getID());
            if (existing.getBillingPeriod().hasRetailOwner()) {
                existing.register(item);
            }
        }
    }
}

// bad
// getEmployees()가 null을 반환할 수도 있음
List<Employee> employees = getEmployees();
if (employees != null) {
    for (Employee e : employees) {
        totalPay += e.getPay();
    }
}

// good
List<Employee> employees = getEmployees();
for (Employee e : employees) {
    totalPay += e.getPay();
}

public List<Employee> getEmployees() {
    if (!hasEmployees()) {
        return Collections.emptyList();    
    }    
    // return new ArrayList<Employee>();  // ??
}
```

- null을 반환하는 코드는 길어지고, 호출자에게 문제를 떠넘긴다
- 위 코드에서 persistentStore가 null 인지를 확인하지 않는데, 위 코드의 문제점은 null 확인이 누락된 것이 아니라 null 확인이 너무 많아 문제다!
- null 대신에 예외를 던지거나 특수 사례 객체를 반환한다



### null을 전달하지 마라

```java
public class MetricsCalculator {
	
  	// bad
    public double xProjection(Point p1, Point p2) {
        return (p2.x - p1.x) * 1.5;
    }
    
    // good?
    public double xProjection(Point p1, Point p2) {
        if (p1 == null || p2 == null) {
            throw InvalidArgumentException("Invalid argument for MetricsCalculator.xprojection");
        }
        return (p2.x - p1.x) * 1.5;
    }
		
  	// good
    public double xProjection(Point p1, Point p2) {
        assert p1 != null : "p1 should not be null";
        assert p2 != null : "p2 should not be null";
        return  (p2.x - p1.x) * 1.5;
    }
}
```

- 정상적인 인수로 null을 기대하는 API가 아니라면 메서드로 null을 전달하는 코드는 최대한 피해야 한다



### 결론

- 깨끗한 코드는 가독성 + 안정성
- 오류 처리를 프로그램 논리와 분리하면
  - 튼튼하고 깨끗한 코드 작성할 수 있음
  - 독립적인 추론이 가능해지며 코드 유지보수성도 크게 높아짐
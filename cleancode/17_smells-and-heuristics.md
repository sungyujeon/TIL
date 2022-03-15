# 냄새와 휴리스틱



## C-주석

##### C1: 부적절한 정보

- 다른 시스템(e.g. 소스 코드 관리 시스템, 버그 추적 시스템, 이슈 추적 시스템, 기타 기록 관리 시스템)에 저장될 정보는 주석으로 적절하지 못함
- 예를 들어, 변경 이력은 장황한 날짜와 내용으로 소스 코드만 번잡하게 만듦
- 작성자, 최종 수정일, SPR(Software Problem Report) 번호 등과 같은 메타 정보만 주석으로 넣음
- 주석은 코드와 설계에 기술적인 설명을 부연하는 수단

<br>

##### C2: 쓸모 없는 주석

- 오래된 주석, 엉뚱한 주석, 잘못된 주석은 쓸모 없음
- 쓸모 없어진 주석은 아예 달지 않거나 빨리 삭제해야 함
- 쓸모 없는 주석은 실제 코드와 멀어지고, 코드와 무관하게 혼자 따로 놀며 코드를 그릇된 방향으로 이끈다

<br>

##### C3: 중복된 주석

```java
i++  // i 증가
  
/**
 * @param sellRequest
 * @return
 * @throws ManagedComponentException
 */
public SellResponse beginSellItem(SellRequest sellRequest) throws ManagedComponentException {}
```

- 코드만으로 충분한데 구구절절 설명하는 주석이 중복된 주석
- 함수 서명(signature)만 달랑 기술하는 Javadoc

<br>

##### C4: 성의 없는 주석

- 작성할 가치가 있는 주석은 잘 작성할 가치도 있다!
- 단어를 신중하게 선택하고, 문법과 구두점을 올바로 사용하고 주절대지 않아야 함. 당연한 소리를 반복하지 않고 간결하고 명료하게 작성해야 함

<br>

##### C5: 주석 처리된 코드

- 주석 처리된 코드는 흉물
- 주석 처리된 코드는 매일 낡아가고 더 이상 존재하지 않는 함수를 호출함. 자신이 포함된 모듈을 오염시키고 읽는 사람을 헷갈리게 만듦
- 주석으로 처리된 코드는 즉각 삭제하고, 소스 코드 관리 시스템을 참조하라

<br>

## E-환경

##### E1: 여러 단계로 빌드한다

```bash
svn get mySystem
cd mySystem
ant all
```

- 빌드는 간단히 한 단계로 끝나야 함
- 소스 코드 관리 시스템에서 이것저것 따로 체크아웃 할 필요가 없어야 함
- 불가해한 명령이나 스크립트를 잇달아 실행해 각 요소를 따로 빌드할 필요가 없어야 함
- 온갖 JAR 파일, XML 파일, 기타 시스템에 필요한 파일을 찾느라 여기저기 뒤적일 필요가 없어야 함

<br>

##### E2: 여러 단계로 테스트한다

- 모든 단위 테스트는 한 명령으로 돌려야 함(IDE에서 버튼 하나로 모든 테스트를 실행하는 것이 가장 이상적)

<br>

## F-함수

##### F1: 너무 많은 인수

- 함수에서 인수 개수는 적을수록 좋음
- 인수 0개 -> 1개 -> 2개 -> 3개 까지는 괜찮고, 넷 이상은 최대한 피하라

<br>

##### F2: 출력 인수

- 출력 인수는 직관을 정면으로 위배한다
- 독자는 인수를 (출력이 아니라) 입력으로 간주한다
- 함수에서 뭔가의 상태를 변경해야 한다면 (출력 인수를 쓰지 말고) 함수가 속한 객체의 상태를 변경한다

<br>

##### F3: 플래그 인수

- boolean 인수는 함수가 여러 기능을 수행한다는 명백한 증거이므로 피해야 함

<br>

##### F4: 죽은 함수

- 아무도 호출하지 않는 함수는 삭제하라(죽은 코드는 낭비다!)
- 소스 코드 관리 시스템이 모두 기억하므로 걱정할 필요가 없음

<br>

## G-일반

##### G1: 한 소스 파일에 여러 언어를 사용한다

- 한 소스 파일 내에서 다양한 언어(XML, HTML, YAML, Javadoc, JavaScript 등)를 포함하는데, 이는 혼란스럽고 조잡하다
- 소스 파일 하나에 언어 하나만 사용하는 방식이 좋음
- 현실적으로 여러 언어가 불가피하나, 소스 파일에서 언어 수와 범위를 최대한 줄이도록 애써야 함

<br>

##### G2: 당연한 동작을 구현하지 않는다

- The Principle of Least Surprise(최소 놀람의 원칙)에 의거해 함수나 클래스는 다른 프로그래머가 당연하게 여길 만한 동작과 기능을 제공해야 함

- ```java
  Day day = DayDate.StringToDay(String dayName)
  ```

  - 위 코드에서 'Monday'를 Day.MONDAY로 변환하리라, 일반적으로 쓰는 요일 약어도 올바로 변환하리라, 대소문자는 당연히 구분하지 않으리라 기대함

- 당연한 동작을 구현하지 않으면 코드를 읽거나 사용하는 사람이 더 이상 함수 이름만으로 함수 기능을 직관적으로 예상하기 어려움

- 당연한 동작을 구현하지 않으면 저자를 신뢰하지 못하므로 코드를 일일이 살펴야 함

<br>

##### G3: 경계를 올바로 처리하지 않는다

- 직관에 의존하려 하지 마라
- 모든 경계 조건을 테스트하는 테스트 케이스를 작성하라

<br>

##### G4: 안전 절차 무시

- 컴파일러 경고 일부를 꺼버리면 빌드가 쉬워질지 모르나 자칫하면 끝없는 디버깅에 시달리게 됨
- 실패하는 테스트 케이스를 일단 제껴두고 나중으로 미루는 태도는 위험하다

<br>

##### G5: 중복

- DRY(Don't Repeat Yourself) - 데이비드 토머스, 앤디 헌트
- 익스트림 프로그래밍 '한 번, 단 한 번만(Once, and only once)' - 켄트 백
- 코드에서 중복을 발견할 때마다 추상화할 기회로 간주하라
- 중복된 코드를 하위 루틴이나 다른 클래스로 분리하라
- 추상화 수준을 높이면 구현이 빨라지고 오류가 적어진다
- 여러 모듈에서 일련의 switch/case나 if/else 문으로 똑같은 조건을 거듭 확인하는 중복을 피하라
  - 다형성(polymorphism)으로 대체하라
- 알고리즘이 유사하나 코드가 서로 다른 중복을 피하라
  - template method pattern, strategy pattern 으로 중복을 제거하라

<br>

##### G6: 추상화 수준이 올바르지 못하다

- 추상화는 저차원 상세 개념에서 고차원 일반 개념을 분리한다

- 세부 구현과 관련된 상수, 변수, 유틸리티 함수는 기초 클래스에 넣으면 안된다(기초 클래스는 구현 정보에 무지해야 마땅하다)

- 예시

  ```java
  // bad
  public interface Stack {
      Object pop() throws EmptyException;
      void push(Object o) throws FullException;
      double percentFull();
      class EmptyException extends Exception {}
      class FullException extends Exception {}
  }
  
  // good
  public interface Stack {
      Object pop() throws EmptyException;
      void push(Object o) throws FullException;
      class EmptyException extends Exception {}
      class FullException extends Exception {}
  }
  
  public interface BoundedStack implements Stack {
      double percentFull();
  }
  ```

  - percentFull() 메서드는 추상화 수준이 올바르지 않는데, 파생 인터페이스에 구체적인 구현을 넣는 방법을 고려해야 함

<br>

##### G7: 기초 클래스가 파생 클래스에 의존한다

- 기초 클래스와 파생 클래스로 나누는 가장 흔한 이유는
  - 고차원 기초 클래스 개념을 저차원 파생 클래스 개념으로 분리해 독립성을 보장하기 위함
- 따라서 기초 클래스가 파생 클래스를 사용한다면 문제가 있는 것이고, 기초 클래스는 파생 클래스를 아예 몰라야 한다
- 일부 예외가 있기는 하지만, 변경이 시스템에 미치는 영향을 적게 하여 유지보수를 수월하게 하라

<br>

##### G8: 과도한 정보

- 잘 정의된 모듈은 인터페이스가 아주 작다(하지만 작은 인터페이스로도 많은 동작이 가능하다!)
- 잘 정의된 인터페이스는 많은 함수를 제공하지 않아 결합도(coupling)가 낮음
- 클래스나 모듈 인터페이스에 노출할 함수를 제한할 줄 알아야 함
  - 클래스가 제공하는 메서드 수는 적을수록 좋음
  - 메서드가 아는 변수 수도 적을수록 좋음
  - 클래스에 들어있는 인스턴스 변수 수도 적을수록 좋음

- 자료, 유틸리티 함수, 상수, 임시 변수를 숨겨라
- 하위 클래스에서 필요하다는 이유로 protected 변수나 함수를 마구 생성하지 마라

<br>

##### G9: 죽은 코드

- 죽은 코드란 실행되지 않는 코드
- 예시
  - 불가능한 조건을 확인하는 if문
  - throw 문이 없는 try문의 catch 블록
  - 아무도 호출하지 않는 유틸리티 함수
  - switch/case 문에서 불가능한 case 조건
- 죽은 코드는 악취를 풍기는데, 이는 설계가 변해도 제대로 수정되지 않기 때문
- 컴파일은 되지만 새로운 규칙이나 표기법을 따르지 않음
- 적절한 장례식을 치뤄주어라

<br>

##### G10: 수직 분리

- 변수와 함수는 사용되는 위치에 가깝게 정의하라
- 예시
  - 지역 변수는 처음으로 사용하기 직전에 선언하며 수직으로 가까운 곳에 위치시켜라
  - 비공개 함수는 처음으로 호출한 직후에 정의

<br>

##### G11: 일관성 부족

- 어떤 개념을 특정 방식으로 구현했다면 유사한 개념도 같은 방식으로 구현하라
- 예시
  - 한 함수에서 response라는 변수에 HttpServletResponse 인스턴스를 저장했다면 (HttpServletResponse 객체를 사용하는) 다른 함수에서도 일관성 있게 동일한 변수 이름을 사용하라
  - 한 메서드를 processVerificationRequest라 명명했다면 (유사한 요청을 처리하는) 다른 메서드도 (processDeletionRequest처럼) 유사한 이름을 사용하라

<br>

##### G12: 잡동사니

- 비어 있는 기본 생성자, 사용하지 않는 변수/함수, 정보 제공하지 못하는 주석 등을 피하라

<br>

##### G13: 인위적 결합

- 서로 무관한 개념을 인위적으로 결합하지 마라
- 예시
  - 일반적인 enum은 특정 클래스에 속할 이유가 없음(enum이 클래스에 속한다면 enum을 사용하는 코드가 특정 클래스를 알아야만 함)
  - 범용 static 함수도 특정 클래스에 속할 이유가 없음
- 인위적인 결합은 직접적인 상호작용이 없는 두 모듈 사이에서 일어남
  - 뚜렷한 목적 없이 변수, 상수, 함수를 당장 편한 위치에 넣어버린 결과임
  - 이는 게으르고 부주의한 행동

<br>

##### G14: 기능 욕심

- 클래스 메서드는 자기 클래스의 변수와 함수에 관심을 가져야지 다른 클래스의 변수와 함수에 관심을 가져서는 안된다
- 메서드가 다른 객체의 참조자(accessor)와 변경자(mutator)를 사용해 그 객체 내용을 조작한다면 메서드가 그 객체 클래스의 범위를 욕심내는 탓

- 예시

  ```java
  public class HourlyPayCalculator {
      public Money calculateWeeklyPay(HourlyEmployee e) {
          int tenthRate = e.getTenthRate().getPennies();
          int tenthsWorked = e.getTenthsWorked();
          int straightTime = Math.min(400, tenthsWorked);
          int overTime = Math.max(0, tenthsWorked - straightTime);
          int straightPay = straightTime * tenthRate;
          int overtimePay = (int)Math.round(overTime * tenthRate * 1.5);
          
          return new Money/(straightPay + overtimePay);
      }
  }
  ```

  - calculateWeeklyPay() 메서드는 HourlyEmployee 객체에서 온갖 정보를 가져옴
  - 즉, calculateWeeklyPay() 메서드는 HourlyEmployee 클래스의 범위를 욕심내는 것
  - 기능 욕심은 한 클래스의 속사정을 다른 클래스에 노출하므로, 별다른 문제가 없다면 제거하는 편이 좋음(예외적인 케이스가 아래처럼 있기도 함)

  ```java
  public class HourlyEmployeeReport {
      private HourlyEmployee employee;
  
      public HourlyEmployeeReport(HourlyEmployee e) {
          this.employee = e;
      }
  
      String reportHours() {
          return String.format(
              "Name: %s\tHours:%d.%1d\n",
              employee.getName(),
              employee.getTenthWorked() / 10,
              employee.getTenthWorked() % 10
          );
      }
  }
  ```

  - reportHours 메서드는 HourlyEmployee 클래스를 욕심내지만, HourlyEmployee 클래스가 보고서 형식을 알 필요는 없음
  - 함수를 HourlyEmployee 클래스로 옮기면 객체 지향 설계의 여러 원칙을 위배함(SRP, OCP, CCP(Common Closure Principle))
  - 즉, HourlyEmployee가 보고서 형식과 결합되므로 보고서 형식이 바뀌면 클래스도 바뀌게 됨

<br>

##### G15: 선택자 인수

```java
// bad
public int calculateWeeklyPay(boolean overtime) {
    int tenthRate = getTenthRate();
    int tenthsWorked = getTenthsWorked();
    int straightTime = Math.min(400, tenthsWorked);
    int overTime = Math.max(0, tenthsWorked - straightTime);
    int straightPay = straightTime * tenthRate;
    double overtimeRate = overtime ? 1.5 : 1.0 * tenthRate;
    int overtimePay = (int)Math.round(overTime * overtimeRate);
    
    return straightPay + overtimePay;
}

// good
public int straightPay() {
    return getTenthsWorked() * getTenthRate();
}

public int overTimePay() {
    int overTimeTenths = Math.max(0, getTenthsWorked() - 400);
    int overTimePay = overTimeBonus(overTimeTenths);
    
    return straightPay() + overTimePay;
}

private int overTimeBonus(int overTimeTenths) {
    double bonus = 0.5 * getTenthRate() * overTimeTenths;
    
    return (int) Math.round(bonus);
}
```

- 초과근무 수당을 1.5배로 지급하면 true 아니면 false 인데, 메서드를 분리하여 좋은 코드로 리팩터링 가능
- bool 인수 뿐만이 아니라 enum, int 등 함수 동작을 제어하려는 인수는 바람직하지 않음
- 일반적으로 인수를 넘겨 동작을 선택하는 대신 새로운 함수를 만드는 편이 좋음
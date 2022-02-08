# Thread



##### 멀티태스킹과 멀티쓰레딩

- windows, unix 등 대부분의 OS는 멀티태스킹(multi-tasking)을 지원하므로 여러 개의 프로세스가 동시에 실행될 수 있음
- CPU의 코어(core)가 한 번에 단 하나의 작업만 수행할 수 있으므로, 실제로 동시에 처리되는 작업의 개수는 코어의 개수와 일치
- 각 코어가 아주 짧은 시간 동안 여러 작업을 번갈아 수행함으로써 여러 작업들이 모두 동시에 수행되는 것처럼 보이게 함
- 프로세스의 성능이 단순히 쓰레드의 개수에 비례하는 것은 아니며, 하나의 쓰레드를 가진 프로세스 보다 두 개의 쓰레드를 가진 프로세스가 오히려 더 낮은 성능을 보일 수도 있음



##### 멀티쓰레딩의 장단점

- 장점

  - CPU 사용률 향상

  - 자원을 보다 효율적으로 사용

  - 사용자에 대한 응답성 향상

  - 작업이 분리되어 코드가 간결

- 단점
  - 여러 쓰레드가 같은 프로세스 내에서 자원 공유하며 작업하기 때문에 동기화, 교착상태 같은 문제를 고려하여 프로그래밍해야 함



##### 쓰레드의 구현과 실행

- 구현

  - Thread 클래스 상속

    ```java
    class ExtendThread extends Thread {
    	public void run() {}
    }
    ```

    

  - Runnable 인터페이스 구현

    > 인터페이스 구현 시 재사용성(reusability)이 높고 코드의 일관성(consistency)을 유지할 수 있어 더 객체지향적인 방법

    ```java
    class RunnableThread implements Runnable {
    	public void run() {}
    }
    ```

    - Thread 클래스의 매개변수로 Runnable 인터페이스를 구현한 클래스의 인스턴스를 전달해야 함

- 실행

  ```java
  Thread t1 = new Thread();
  t1.start();
  ```

  - start() 메서드를 호출하여야 쓰레드 실행

  - 하나의 쓰레드 인스턴스는 한 번만 실행 가능

    (같은 인스턴스에서 추가 실행하면 `IllegalThreadStateException` 발생)

  - run() 메서드는 단순히 메서드를 호출하는 것 뿐이고, start() 메서드를 호출해야 새로운 call stack을 생성하면서, run() 메서드 함께 실행



##### run(), start()

- run()
  - 클래스에 선언된 메서드를 호출하는 것일 뿐

- start()
  - 새로운 쓰레드가 작업을 실행하는 데 필요한 호출스택(call stack)을 생성
  - 생성된 호출스택에 run()이 첫번째로 push(쓰레드가 독립된 공간에서 작업 수행)



##### main thread

- main 메서드의 작업을 수행하는 것도 쓰레드이며, 이를 main thread라고 함
- main 메서드가 수행을 마쳤다고 하더라도 다른 쓰레드가 아직 작업을 마치지 않은 상태라면 프로그램이 종료되지 않음



##### single thread vs multi thread

> concurrent(병행) : 여러 쓰레드가 여러 작업을 동시에 진행하는 것
>
> parallel(병렬): 하나의 작업을 여러 쓰레드가 나눠서 처리하는 것

- 코어 수에 따른 차이

  - 싱글 코어 시
    - 멀티쓰레드라도 하나의 코어가 번갈아가며 작업을 수행하므로 두 작업이 절대 겹치지 않음
  - 멀티 코어 시
    - 동시에 두 쓰레드가 수행될 수 있으므로 겹치는 부분 발생

- 두 쓰레드가 서로 다른 자원을 사용하는 작업의 경우 single thread 보다 multi thread가 더 효율적

  (사용자로부터 데이터 입력 받는 작업, 네트워크로 파일을 주고 받는 작업, 프린터로 파일을 출력하는 작업과 같이 외부기기와의 입출력을 필요로 하는 경우 등)

- 예시

  ```java
  public class SingleMultiThread {
  	static long startTime = 0;
  	
  	public static void main(String[] args) {
  //		calcTimeWithoutThread();
  		calcTimeWithThread();
  	}
  	
  	
  	private static void calcTimeWithoutThread() {
  		long startTime = System.currentTimeMillis();
  		
  		for (int i = 0; i < 300; i++) {
  			System.out.printf("%s", new String("-"));
  		}
  		System.out.print("\n소요시간1:" + (System.currentTimeMillis() - startTime) + '\n');
  		
  		for (int i = 0; i < 300; i++) {
  			System.out.printf("%s", new String("|"));
  		}
  		System.out.print("\n소요시간2:" + (System.currentTimeMillis() - startTime) + '\n');
  	}
  	
  	private static void calcTimeWithThread() {
  		Thread thread_1 = new TestThread();
  		thread_1.start();
  		startTime = System.currentTimeMillis();
  		
  		
  		for (int i = 0; i < 300; i++) {
  			System.out.printf("%s", new String("-"));			
  		}
  		System.out.print("\n소요시간1:" + (System.currentTimeMillis() - startTime) + '\n');
  	}
  }
  
  class TestThread extends Thread {
  	
  	@Override
  	public void run() {
  		for (int i = 0; i < 300; i++) {
  			System.out.printf("%s",  new String("|"));
  		}
  		System.out.print("\n소요시간2:" + (System.currentTimeMillis() - SingleMultiThread.startTime) + '\n');
  	}
  }
  ```

  



##### 쓰레드 우선순위(priority)

```java
public final void setPriority(int newPriority) {}
public final int getPriority() {}

public static final int MAX_PRIORITY = 10;  // 최대 우선순위
public static final int MIN_PRIORITY = 1;  // 최소 우선순위
public static final int NORM_PRIORITY = 5;  // 보통 우선순위
```

- 멀티코어라 해도 OS 마다 다른 방식으로 스케쥴링하기 때문에, 굳이 우선순위에 차등을 두어 쓰레드를 실행하려면 특정 OS의 스케쥴링 정책과 JVM의 구현을 직접 확인해야 함
- 쓰레드에 우선순위를 부여하는 대신 작업에 우선순위를 두어 PriorityQueue에 저장해두고, 우선순위가 높은 작업이 먼저 처리되도록 하는 것이 나을 수 있음

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


# [JAVA] 동시성 처리 - intro

한동안 동시성은 제가 고려해야 할 사항이라고 생각하지 않았습니다. 우선은 동시성 처리라는 개념이 너무 어려웠고, 기능을 '구현'하는 데 있어서 동시성 처리가 필요할 정도의 성능을 요구하는 로직을 작성할 필요와 경험이 없었기 때문이기도 합니다.

한가지 변명을 하자면 동시성 처리 성능을 개선하기에 앞서 정확히 '동작'하는 기능을 구현하는 것이 더 중요하다고 생각하기도 했고, Clean Code 스터디를 하면서 동시성이 항상 성능을 높여주지는 않는다는 미신과 오해를 그 근거로 들기도 했습니다. 동시성에 대해 정확히 이해하지 못하고 사용할 바에야 동시성의 이점을 포기하고 정확하게 동작하는 기능 구현을 선택하겠다는 나름의 trade-off라고 믿었습니다.

여전히 동시성에 대해서 정확히 이해하지 못했지만 이번 글을 통해 동시성에 대한 대략적인 내용을 살펴보며 학습 지평을 조금 더 넓혀보고자 합니다.

<br>

## 동시성이 필요한 이유

`Clean Code`에서는 동시성이 필요한 이유에 대해서 다음과 같이 설명합니다

- 동시성은 결합(coupling)을 없애는 전략이다. 즉, 무엇(what)과 언제(when)를 분리하는 전략이다.
- what과 when을 분리하면 애플리케이션 구조와 효율이 극적으로 나아진다.
- 효율적인 시스템, 즉 적은 응답시간(response time)과 높은 작업처리량(throughput)을 가져가려면 동시성 구현이 불가피하다.

간단히 말하자면 '처리 성능'을 높이는 방법입니다. 단순히 더 빠른 속도로 처리하는 것이라고 생각할 수도 있지만, 위 설명에 의하면 `coupling`을 없애는 조금 더 추상적이고 구조적인 관점에서의 필요성을 말하고 있습니다. 

<br>

## 동시성 이슈

비용이 높은 작업을 동시에 처리하면 성능을 높일 수 있습니다. 하지만 여기서 문제가 발생합니다. 상태를 변경시키는 공유 자원이 있는 경우 해당 자원에 동시 접근하게 되면 원하는 결과를 얻지 못할 수 있습니다.

Counter 클래스를 만들어 인스턴스 변수 count를 100만번 더하는 plusMillonTimes 메서드를 작성했습니다. 어떤 스레드가 시작되고 끝나는지 확인하기 위해 현재 스레드를 출력합니다.

```java
public class Counter {
    int count = 0;

    void incrementMillionTimes() {
        printStart();
        for (int i = 0; i < 1_000_000; i++) {
            count++;
        }
        printEnd();
    }
  
    private void printStart() {
        System.out.println("start: " + Thread.currentThread());
    }
    private void printEnd() {
        System.out.println("end: " + Thread.currentThread());
    }
}
```

아래 코드에서 2개의 스레드가 증가시키는 count는 200만입니다. 따라서 원하는 결과값도 200만이 됩니다. main thread가 새로운 스레드의 count 작업을 기다리기 위해 0.5초 중단하는 코드를 추가하였습니다.

```java
class CounterTest {
    Counter counter = new Counter();

    @Test
    void 다중_스레드_카운트_증가() {
        countInNewThread();
        countInNewThread();

        Thread.sleep(500);

        assertThat(counter.count).isEqualTo(2_000_000);
    }

    private void incrementInNewThread() {
        new Thread(counter::countMillionTimes)
                .start();
    }
}
```

하지만 결과는 기대값인 200만이 아닌, 약 180만입니다. Thread-0과 Thread-1이 공유자원인 count에 동시 접근하였기 때문입니다.

```tex
start: Thread[Thread-0,5,main]
start: Thread[Thread-1,5,main]
end: Thread[Thread-1,5,main]
end: Thread[Thread-0,5,main]

Expected :2000000
Actual   :1813284
```

<br>

## 동시성 이슈를 해결하는 방법

동시성 이슈를 해결하기 위해서는 공유자원 자체를 없애거나, 공유자원을 동기화해야 합니다. 이 글에서는 자원을 공유하는 상황에서 동기화를 하기 위한 전략을 중점으로 다룰 예정입니다. 

공유하는 자원을 동기화 하기 위해서는 임계 영역(critical section)을 설정해야 합니다. 해당 임계 영역에서는 공유 자원을 동시에 획득할 수 없도록 잠궈야(lock) 합니다.

<br>

## 자바에서의 동시성 이슈 해결

자바에서는 동시성 이슈를 해결하기 위해 여러 전략을 취하고 있고, 이를 효율적으로 개선하기 위해 java.lang.concurrent 패키지 내에 버전이 업그레이드됨에 따라 새로운 API를 추가해왔습니다.

- 자바가 처음 나왔을 때 동시성 처리를 위해 객체의 고유 락을 사용하였습니다.
- jdk 1.5에서는 스레드 실행과 태스크 제출을 분리할 수 있는 ExecutorService interface가 나왔습니다. 이 버전부터 제네릭이 지원되면서, Runnable과 Thread의 변형을 반환할 수 있는 Callable\<T>, Future\<T> 제네릭을 지원하였습니다. 추가적으로 lock을 조금 더 유연하게 사용할 수 있도록 java.lang.concurrent 패키지 내에 locks, atomic 패키지를 만들어 Lock interface와 Atomic Lock을 추가하였습니다.
- jdk 1.8에서는 Future를 조합하는 기능을 추가해 동시성을 강화하는 CompletableFuture를 지원하였습니다. 추가적으로 locks 패키지 내에 optimistic read 기능을 통해 성능을 개선한 StampedLock 구현체도 추가되었습니다.
- jdk 9에서는 Flow API를 통해 분산 비동기 프로그래밍을 명시적으로 지원하기 시작했습니다.

<br>

##### 고유 락(Intrinsic Lock)

- 자바에서 모든 객체는 고유의 lock을 갖고 있습니다(Intrinsic lock 또는 monitor lock이라 부름).

- 한 스레드가 객체 필드에 일관되게 접근하고 싶다면 이 intrinsic lock을 획득하고 해제해야 합니다.

- intrinsic lock을 획득하는 방법에는 두가지가 있습니다.

- synchronized method

  ```java
  public class Counter {
      synchronized void incrementMillionTimes() { ... }
  }     
  ```

  - 한 스레드가 synchronized method를 호출하면, 해당 method를 갖는 객체의 intrinsic lock을 획득하고, return 시 release합니다. lock이 걸리는 범위는 해당 메서드 scope 입니다.

- synchronized statements

  - synchronized 키워드를 사용하여 획득해야 하는 객체의 lock을 명시적으로 선언합니다. 아래 예제는 Counter 객체를 가리키는 this를 명시하였습니다. 이 때 lock은 synchronized를 선언한 scope에서만 발생합니다.

    ```java
    public class Counter {
        void incrementMillionTimes() {
            synchronized (this) {
                //...
            }
        }
    }
    ```

  - 반드시 해당 synchronized 블록이 포함된 객체의 lock을 획득하지 않아도 됩니다. 추가적으로 생성한 객체의 lock을 획득할 수 있습니다. 또한 Lock 객체를 더 유연하게 다루기 위해 자바에서 기본적으로 제공하는 Lock interface를 사용할 수도 있습니다. 이는 다음 설명에서 다루도록 하겠습니다.

    ```java
    public class Counter {
        Object object = new Object();
        
        void incrementMillionTimes() {
            synchronized (object) {
                //...
            }
        }
    }
    ```

##### Atomic object

- java.util.concurrent.atomic 패키지에서 제공하는 객체들입니다.

- 위 예제에서 명시적으로 synchronized 키워드를 사용하지 않고 자바에서 제공하는 객체들을 활용하여 동기화할 수 있습니다. 

- 위에서는 int 타입의 count를 증가시켰지만, atomic 패키지가 제공하는 AtomicInteger를 활용해 값을 증가시켜 원하는 결과값을 얻었습니다.

  ```java
  public class Counter {
      AtomicInteger atomicInt = new AtomicInteger;
  
      void incrementMillionTimes() {
          for (int i = 0; i < 1_000_000; i++) {
              atomicInt.incrementAndGet();
          }
      }
  }
  
  @Test
  void atomic_increment() {
      incrementInNewThread();
      incrementInNewThread();
      Thread.sleep(500);
  
      assertThat(counter.atomicInt.get()).isEqualTo(2_000_000);
  }
  ```

##### Lock interface

- 위에서 고유락을 사용하였을 경우에는 어떤 스레드가 lock을 획득했는지, 어떤 스레드가 lock을 획득하기 위해 큐에 대기하고 있는지 등의 부가 정보를 획득하기 어렵습니다.

- lock 획득 정보

  Lock 정보를 알기 위해 LockInformation class에서 lock을 걸어 task를 실행시켰습니다. 해당 task가 약 1초간 실행된다고 가정하기 위해 Thread를 1초간 중지시켰습니다.

  ```java
  public class LockInformation {
  
      ReentrantLock reentrantLock = new ReentrantLock();
  
      void call() throws InterruptedException {
          printStart();
  
          reentrantLock.lock();
          try {
              System.out.println("task executing: " + Thread.currentThread());
              Thread.sleep(1000);
          } finally {
              printEnd();
              reentrantLock.unlock();
          }
      }
  
      private void printStart() {
          System.out.println("start: " + Thread.currentThread());
      }
      private void printEnd() {
          System.out.println("end: " + Thread.currentThread());
      }
  }
  ```

  스레드 2개를 실행시키고 두번째 스레드가 락을 획득하기 까지의 시간을 확보하기 위해 500ms thread를 멈추고, 락 관련 정보를 획득한 뒤 출력하였습니다. 전체 main method의 실행은 task의 실행이 완료될 때까지 기다리게 하기 위해 3초간 중지시켰습니다.

  ```java
  class LockInformationTest {
  
      LockInformation lockInfo = new LockInformation();
  
      @Test
      void lock_부가_정보() throws InterruptedException {
          callNewThread();
          callNewThread();
  
          Thread.sleep(500);
          int queueLength = lockInfo.reentrantLock.getQueueLength();
          boolean locked = lockInfo.reentrantLock.isLocked();
  
          System.out.println("queueLength = " + queueLength);
          System.out.println("locked = " + locked);
  
          Thread.sleep(3000);
      }
  
      private void callNewThread() {
          Thread thread = new Thread(() -> {
              try {
                  lockInfo.call();
              } catch (InterruptedException e) {
                  e.printStackTrace();
              }
          });
          thread.start();
      }
  }
  ```

  실행결과는 다음과 같습니다. Thread-1과 Thread-0이 시작되고 Thread-1이 먼저 task를 실행합니다. 이 때 Thread-0이 큐에서 대기하고 있고, lock은 잠금 상태입니다. Thread-1 task가 종료되면 Thread-0 task가 실행된 뒤 lock을 반납하고 종료합니다.

  ```txt
  start: Thread[Thread-1,5,main]
  start: Thread[Thread-0,5,main]
  task executing: Thread[Thread-1,5,main]
  queueLength = 1
  locked = true
  end: Thread[Thread-1,5,main]
  task executing: Thread[Thread-0,5,main]
  end: Thread[Thread-0,5,main]
  ```

- 이외에도 lock을 획득한 scope이 무한정 실행된다면 다른 스레드는 blocking되어 해당 작업을 영원히 실행하지 못할 수 있지만, timeout 옵션을 통해 반환될 수 있습니다.

- 또한 `hand over hand`, `chain locking` 이라고 부르는 것처럼 여러 작업에 대한 처리 순서를 유연하게 가져갈 수도 있습니다.

<br>

## 마치며

위에서 설명한 lock을 통한 동시성 이슈 해결은 기본적으로 blocking - synchronization를 기본으로 합니다. Lock interface에서 지원하는 기능이나 ReadWriteLock 구현체 등에서 non-blocking 기반으로 성능 개선을 이루고 있지만, 이는 명시적인 잠금을 사용하지 않는 방법입니다.

앞서 설명한 것처럼 자바에서는 병렬성을 이용하거나 비동기적으로 성능을 개선시켜왔습니다. 다음 글에서는 자바의 병렬성에 대해서 다루어보도록 하겠습니다. 



[참고자료]

[Clean Code](http://www.yes24.com/Product/Goods/11681152)

[Modern Java in Action](http://www.yes24.com/Product/Goods/77125987)

https://docs.oracle.com/javase/tutorial/essential/concurrency/locksync.html

# Process 동기화

### 데이터의 접근

![](../../../Labs/cs-study/운영체제/src/sync-data-access.png)



### Race Condition

![](../../../Labs/cs-study/운영체제/src/race-condition.png)

- 프로세스는 각각 독립적으로 실행되므로 다른 주소공간을 사용하기 때문에 문제가 생기지 않는 다는 입장도 있음
- 문제가 있는 경우는, 시스템 콜을 통해 프로세스가 직접 할 수 없는 일을 os에 맡겨서 공유되는 데이터에 접근하게 될 때임. 운영체제 안에 있는 데이터를 공유할 때 cpu가 하나여도 문제가 발생할 수 있음



### OS에서의 Race Condition

- kernel 수행 중 인터럽트 발생 시

  ![](../../../Labs/cs-study/운영체제/src/race-condition-interrupt.png)

  - 해결: interrupt를 disable/enable 하게 변경시킴

- Process가 system call 하여 kernel mode로 수행 중인데, context switch가 일어나는 경우

  ![](../../../Labs/cs-study/운영체제/src/race-condition-systemcall.png)

  ![](../../../Labs/cs-study/운영체제/src/race-condition-systemcall2.png)

- Multiprocessor에서 shared memory 내의 kernel data

  ![](../../../Labs/cs-study/운영체제/src/race-condition-multiprocessor.png)



### Process Synchronization 문제

> 공유 데이터(shared data)의 동시 접근(concurrent access)은 데이터의 불일치 문제(inconsistency)를 발생시킬 수 있음
>
> 일관성(consistency) 유지를 위해서는 협력 프로세스(cooperating process) 간의 실행 순서를 정해주는 메커니즘 필요
>
> Race condition
>
> - 여러 프로세스들이 동시에 공유 데이터를 접근하는 상황
> - 데이터의 최종 연산 결과는 마지막에 그 데이터를 다룬 프로세스에 따라 달라짐
>
> race condition을 막기 위해서는 concurrent process는 동기화(synchronize) 되어야 함

- Example of a Race Condition

  ![](../../../Labs/cs-study/운영체제/src/race-condition-example.png)

- The Critical-Section Problem

  - n개의 프로세스가 공유 데이터를 동시에 사용하기를 원하는 경우
  - 각 프로세스의 code segment에는 공유 데이터를 접근하는 코드인 <b>critical section</b>이 존재
  - Problem
    - 하나의 프로세스가 critical section에 있을 때 다른 모든 프로세스는 critical section에 들어갈 수 없어야 함

---



## 동기화 문제의 해결 방법

##### 프로그램적 해결법의 충족조건

- Mutual Exclusion
  - 프로세스 Pi가 critical section 부분을 수행 중이면 다른 모든 프로세스들은 그들의 critical section에 들어가면 안됨
- Progress(진행)
  - 아무도 critical section에 있지 않은 상태에서 critical section에 들어가고자 하는 프로세스가 있다면 critical section에 들어가게 해주어야 함
- Bounded Waiting(유한대기)
  - 프로세스가 critical section에 들어가려고 요청한 후부터 그 요청이 허용될 때까지 다른 프로세스들이 critical section에 들어가는 횟수에 한계가 있어야 함 



##### Initial Attempts to Solve Problem

- 두 개의 프로세스가 있다고 가정 P<small>0</small> , P<small>1</small>

- 프로세스들의 일반적인 구조

  ```c++
  do {
    entry section
    critical section
    exit section
    remainder section
  } while (1);
  ```

- 프로세스들은 수행의 동기화(synchronize)를 위해 몇몇 변수를 공유할 수 있음(synchronization variable)



##### 소프트웨어적으로 해결하기 위한 알고리즘들

- Algorithm1

  - synchronization variable

  - ```c++
    do {
      while (turn != 0);
      critical section
      turn = 1;
      remainder section
    } while(1);
    ```

  - Satisfies mutual exclusion, but not progress

    - 즉, 과잉양보: 반드시 한번씩 교대로 들어가야만 함(swap-turn), 먼저 수행 중인 프로세스가 turn을 내 값으로 바꿔줘야만 들어갈 수 있음. 만약 특정 프로세스가 더 빈번히 critical section에 들어가야 한다면?

- Algorithm2

  - Synchronization variables

    ```c++
    boolean flag[2];
    initially flag[모두] = false; /* no one is in CS */
    Pi ready to enter its critical section if flag[i] == true
    ```

  - Process Pi

    ```c++
    do {
      flag[i] = true; /* Pretend I am in */
      while (flag[j]); /* is he also in? then wait */
      critical section
      flag[i] = false;  /* I am out now */
      remainder section
    } while(1);
    ```

  - Satisfies mutual exclusion, but not progress requirement

  - 둘 다 2행까지 수행 후 끊임 없이 양보하는 상황 발생 가능

- Algorithm3(Peterson's Algorithm)

  - Combined synchronization variables of algorithms 1 and 2

  - Process Pi

    ```c++
    do {
      flag[i] = true;  /* my intention is to enter... */
      turn = j;  /* set to his turn */
      while (flag[j] && turn == j);  /* wait only if ... */
      critical section
      flag[i] = false;
      remainder section
    } while(1);
    ```

  - Meets all three requirements; solves the critical section problem for two processes

  - <i>Busy Waiting! = spin lock!</i> (계속 CPU와 memory를 쓰면서 wait)

- Synchronization Hardware

  - 하드웨어적으로 atomic하게 만들어 두면 복잡한 알고리즘 없이 해결!

  - Mutual Exclusion with Test & Set

    ```c++
    Synchronization variable:
    	boolean lock = false;
    
    Process Pi
      do {
        while (Test_and_Set(lock));
        critical section
        lock = false;
        remainder section
      } while(1);
    ```



## 추상적 해결

##### Semaphores

- 앞의 방식을 추상화시킨 것

- Semaphore <i>S</i>

  - integer variable

  - 아래의 두가지 atomic 연산에 의해서만 접근 가능

    - P(S): 자원을 획득하는 과정

      ```c++
      while (S <= 0) do no-op; /* i.e. wait */
      S--
      ```

      - If positive, decrement-&-enter
      - Otherwise, wait until positive(busy-wait)

    - V(S): 자원을 반납하는 과정

- Critical Section of n Processes

  - ##### Busy Wait

    ```c++
    // Synchronization variable
    semaphore mutex;  /* initially 1: 1개가 CS에 들어갈 수 있음*/
    
    // Process Pi
    do {
      P(mutex);  /* if positive, dec-&-enter, Otherwise, wait */
      critical section
      V(mutex);  /* Increment semaphore */
      remainder section
    } while(1);
    ```

    - busy wait는 효율적이지 못함
    - busy wait을 해결하기 위해 Block & Wakeup(<i>sleep lock</i>) 방식으로 구현해야함

  - ##### Block & Wakeup Implementation

    - Semaphore를 다음과 같이 정의

      ```c++
      typedef struct
      {
        int value;  /* semaphore */
        struct process *L;  /* process wait queue*/
      } semaphore;
      ```

    - block과 wakeup을 다음과 같이 가정

      - block: 커널은 block을 호출한 프로세스를 suspend 시킴. 이 프로세스의 PCB를 semaphore에 대한 wait queue에 넣음

      - wakeup(P): block된 프로세스 P를 wakeup시킴. 이 프로세스의 PCB를 ready queue로 옮김

    - 구현

      ```c++
      // P(S)
      S.value--;  /* prepare to enter */
      if (S.value < 0)  /* Oops, negative, I cannot enter */
      {
        add this process to S.L;
        block();
      }
      
      // V(S)
      S.value++;
      if (S.value <= 0)
      {
      	remove a process P from S.L;
        wakeup(P);
      }
      ```

  - Busy Wait vs Block/wakeup(어느 것이 더 효율적?)

    - block/wakeup overhead vs critical section 길이

      - critical section의 길이가 긴 경우 Block/wakeup이 적당 / critical section을 얻기 위한 경쟁이 치열하냐 아니냐로 보는게 더 적당하지 않나 싶음
      - critical section의 길이가 매우 짧은 경우 Block/wakeup 오버헤드가 busy wait 오버헤드보다 더 커질 수 있음

      - 일반적으로는 Blockwakeup 방식이 더 좋음

- Two Types of Semaphores
  - Counting semaphore
    - 도메인이 0 이상인 임의의 정수값
    - 주로 resource counting에 사용
  - Binary semaphore(=mutex)
    - 0 또는 1 값만 가질 수 있는 semaphore
    - 주로 mutual exclusion(lock/unlock)에 사용





---



## Deadlock and Starvation

##### Deadlock

- 둘 이상의 프로세스가 서로 상대방에 의해 충족될 수 있는 event를 무한히 기다리는 현상

##### Starvation

- indefinite blocking
- 프로세스가  suspend된 이유에 해당하는 세마포어 큐에서 빠져나갈 수 없는 현상



## Classical Problems of Synchronization

##### Bounded-Buffer Problem

![](../../../Labs/cs-study/운영체제/src/bounded-buffer-problem.png)



##### Readers-Writers

- 한 process가 DB에 write 중일 때 다른 process가 접근하면 안됨

- read는 동시에 여럿이 해도 됨

- solution

  - Writer가 DB에 접근 허가를 아직 얻지 못한 상태에서는 모든 대기중인  Reader들을 다 DB에 접근하게 해줌
  - Writer는 대기 중인 Reader가 하나도 없을 때 DB 접근이 허용
  - 일단 Writer가 DB에 접근 중이면 Reader들은 접근이 금지
  - Writer가 DB에서 빠져나가야만 Reader의 접근이 허용

- ##### Shared data

  - DB 자체
  - readcount: 현재 DB에 접근 중인 Reader의 수

- ##### Synchronization variables

  - mutex: 공유 변수 readcount를 접근하는 코드(critical section)의 mutual exclusion 보장을 위해 사용
  - db: Reader와 Writer가 공유 DB 자체를 올바르게 접근하게 하는 역할



##### Dining-Philosophers Problem

![](../../../Labs/cs-study/운영체제/src/dining-philosophers-problem.png)

- 앞의 solution의 문제점
  - Deadlock 가능성이 있음
  - 모든 철학자가 동시에 배가 고파져 왼쪽 젓가락을 집어버린 경우
- 해결방안
  - 4명의 철학자만이 테이블에 동시에 앉을 수 있도록 함
  - 젓가락을 두 개 모두 집을 수 있을 때에만 젓가락을 집을 수 있게 함
  - 비대칭
    - 짝수(홀수) 철학자는 왼쪽(오른쪽) 젓가락부터 집도록





## Monitor

> Semaphore의 문제점
>
> - 코딩하기 힘들다
> - 정확성(correctness)의 입증이 어려움
> - 자발적 협력(voluntary cooperation)이 필요함
> - 한 번의 실수가 모든 시스템에 치명적 영향

![](../../../Labs/cs-study/운영체제/src/monitor.png)

- 동시 수행중인 프로세스 사이에서 abstract data type의 안전한 공유를 보장하기 위한 high-level synchronization contstruct
- 모니터 내에서는 한 번에 하나의 프로세스만이 활동 가능
- 프로그래머가 동기화 제약 조건을 명시적으로 코딩할 필요 없음
- 프로세스가 모니터 안에서 기다릴 수 있도록 하게 위해 `condition variable` 사용
- `condition variable`
  - wait와 signal 연산에 의해서만 접근 가능
  - x.wait()을 invoke한 프로세스는 다른 프로세스가 x.signal()을 invoke 하기 전까지 suspend됨
  - x.signal()은 정확하게 하나의 suspend된 프로세스를 resume 한다. suspend된 프로세스가 없으면 아무 일도 일어나지 않음

![](../../../Labs/cs-study/운영체제/src/monitor-dining-philosophers.png)


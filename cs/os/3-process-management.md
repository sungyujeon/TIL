# 프로세스 관리



### 프로세스 생성 (Process Creation)

- 부모 프로세스(Parent process)가 자식 프로세스(children process) 생성
- 프로세스의 트리(계층 구조) 형성
- 프로세스는 자원을 필요로 함
  - 운영체제로부터 받음
  - 부모와 공유
- 자원의 공유
  - 부모와 자식이 모든 자원을 공유하는 모델
  - 일부를 공유하는 모델
  - 전혀 공유하지 않는 모델
- 수행(Execution)
  - 부모와 자식은 공존하며 수행되는 모델
  - 자식이 종료(terminate)될 때까지 부모가 기다리는(wait) 모델
- 주소공간(Address space)
  - 자식은 부모의 공간을 복사함(binary and OS data)
  - 자식은 그 공간에 새로운 프로그램을 올림
- 유닉스의 예
  - fork() 시스템 콜이 새로운 프로세스를 생성
    - 부모를 그대로 복사(OS data except PID + binary)
    - 주소공간 할당
  - fork 다음에 이어지는 exec() 시스템 콜을 통해 새로운 프로그램을 메모리에 올림



### 프로세스 종료 (Process Termination)

- 프로세스가 마지막 명령을 수행한 후 운영체제에게 이를 알려줌 (exit)
  - 자식이 부모에게 output data를 보냄 (via wait)
  - 프로세스와 각종 자원들이 운영체제에게 반납됨
- 부모 프로세스가 자식의 수행을 종료시킴(abort)
  - 자식이 할당 자원의 한계치를 넘어섬
  - 자식에게 할당된 태스크가 더 이상 필요하지 않음
  - 부모가 종료(exit)하는 경우
    - 운영체제는 부모 프로세스가 종료하는 경우 자식이 더 이상 수행되도록 두지 않음
    - 단계적인 종료





### 프로세스와 관련한 시스템콜

- fork() : create a child (copy)

  - A process is created by the fork() system call
  - creates a new address space that is a duplicate of the caller
  - 완전히 새로운 프로그램을 만드려고 하면 다른 system call 이 필요한데 exec()가 그것

- exec() : overlay new image

  - A process can execute a different program by the exec() system call
  - replaces the memory image of the caller with a new program
  - 하나의 프로세스를 완전히 새로운 다른 프로세스로 덮어 씌워서 실행시키는 것

- wait() : sleep until child is done

  - 프로세스 A가 wait() 시스템 콜을 호출하면

    - 커널은 child가 종료될 때까지 프로세스 A를 sleep 시킴(block 상태)
    - Child process가 종료되면 커널은 프로세스 A를 깨운다(ready 상태)

  - wait system call을 linux에서 왜 사용하는가?

    - 예를 들어 `vi A` 라고 한다면, A라는 파일을 수정하는 것인데, 해당 파일을 수정하는 자식 프로세스가 종료되어야 다시 커맨드를 입력하는 shell을 이용할 수 있는 것과 같음

    - 이렇게 wait 하지 않으면 부모와 자식도 cpu를 점유하려는 경쟁 관계가 되기 때문에 하나의 프로세스를 실행하지 못함

- exit() : frees all the resources, notify parent

  - 자발적 종료
    - 마지막 statement 수행 후 exit() 시스템 콜을 통해 명시적으로 적어주지 않아도 main 함수가 리턴되는 위치에 컴파일러가 넣어서 자동적으로 호출
  - 비자발적 종료
    - 부모 프로세스가 자식 프로세스를 강제 종료시킴
      - 자식 프로세스가 한계치를 넘어서는 자원 요청
      - 자식에게 할당된 task가 더 이상 필요하지 않음
    - 키보드로 kill, break 등을 입력한 경우
    - 부모가 종료하는 경우
      - 부모 프로세스가 종료하기 전에 자식들이 먼저 종료됨



### 프로세스 간 협력

- 독립적 프로세스(Independent process)
  - 프로세스는 각자의 주소 공간을 가지고 수행되므로 원칙적으로 하나의 프로세스는 다른 프로세스의 수행에 영향을 미치지 못함
- 협력 프로세스(Cooperating process)
  - 프로세스 협력 매커니즘을 통해 하나의 프로세스가 다른 프로세스의 수행에 영향을 미칠 수 있음
- 프로세스 간 협력 매커니즘(<b>IPC</b> : Interprocess Communication)
  - 2가지가 있음(message passing, shared memory)
  - 메시지를 전달하는 방법
    - Message system(message passing) : 커널을 통해 메시지 전달
      - 프로세스 사이에 공유 변수(shared variable)를 일체 사용하지 않고 통신하는 시스템
      - 운영체제에 system call을 보내 프로세스 간 message passing
    - Direct Communication
      - 통신하려는 프로세스의 이름을 명시적으로 표시
      - process P(send(Q, message)) -> process Q(Receive(P, message))
    - Indirect Communication
      - mailbox(또는 port)를 통해 메시지를 간접 전달
      - process P(Send(M, message)) -> Mailbox M -> Process Q(receive(M, message))
  - 주소 공간을 공유하는 방법
    - shared memory : 서로 다른 프로세스 간에도 일부 주소 공간을 공유하게 하는 shared memory 매커니즘이 있음
    - *thread(shared memory와 차이) : thread는 사실상 하나의 프로세스이므로 프로세스 간 협력으로 보기는 어렵지만 동일한 process를 구성하는 thread들 간에는 주소 공간을 공유하므로 협력이 가능

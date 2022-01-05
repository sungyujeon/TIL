# @Transactional

> 메서드, 클래스, 인터페이스의 Transaction 처리를 가능하게 해주는 annotation
>
> declarative(선언적) / programmatic(프로그래밍적) transaction이 있고, spring에서는 어노테이션을 활용해 선언적 트랜잭션의 형태로 사용
>
> > Transaction
> >
> > - Database의 상태를 변환시키는 하나의 논리적 기능을 수행하기 위한 작업 단위나 한 번에 수행되어야 하는 일련의 연산
> > - ACID 원칙 준수

## @Transactional 옵션

### isolation

```
@Transactional(isolation=Isolation.DEFAULT)
public void addUser(User user) throws Exception {}
```

- DEFAULT

  - 기본 격리 수준(default, DB의 isolation level에 따름)

- READ_UNCOMMITTED(level 0)

  - 커밋되지 않은(트랜잭션 처리 중인) 데이터에 대한 읽기 허용
  - `Dirty Read` 발생 가능(트랜잭션 처리 중인 A 라는 데이터가 rollback 되면 잘못된 데이터를 read하는 것이 될 수 있음)

- READ_COMMITTED(level 1)

  - 커밋된 데이터에 대한 읽기 허용
  - commit 이전에 read가 가능하지만, 실제 테이블 값이 아닌 Undo 영역에 백업된 레코드에서 값을 가져옴
  - `Dirty Read` 방지
  - `Repeatable Read`의 정합성 오류 발생 가능(commit 되기 이전의 A 데이터에서 read 후 A 데이터가 update되어 commit 되면, 이후 A 데이터를 다시 read하면 다른 데이터를 조회해 사용하는 결과가 나타날 수 있음)

- REPEATABLE_READ(level 2)

  - 트랜잭션 완료 시까지 SELECT 문장이 사용하는 모든 데이터에 shared lock이 걸리므로, 다른 사용자는 해당 데이터의 수정 불가

    (row exclusive lock 작업이므로 다른 세션이 커밋하지 않아도 해당 row만 데이터를 수정할 수 없고, 자신의 작업은 중단 없이 실행됨)

  - MySQL에서는 트랜잭션마다 트랜잭션 ID를 부여하여 트랜잭션 ID보다 작은 트랜잭션 번호에서 변경한 것만 읽게 됨

    - MVCC(Multi Version Concurrency Control)
      - Undo 공간에 백업해두고 실제 레코드 값을 변경
      - 백업된 데이터는 불필요하다고 판단하는 시점에 주기적으로 삭제
      - Undo에 백업된 레코드가 많아지면 MySQL 서버의 처리성능이 떨어질 수 있음

  - `Phantom Read` 문제 발생 가능

    - 사용자 A에 의해 특정 범위의 데이터 [1,2,3,4]를 두 번 읽는 트랜잭션이 수행된다고 한다면, 두번째 read 전에 사용자 B가 [5,6,7,8] 이라는 데이터를 추가해버리면 첫번째와 두번째 read의 결과가 달라진다. [1,2,3,4]의 데이터에 대한 shared lock이 걸리지만, 다른 row의 데이터는 영향을 받지 않기 때문에 commit 전에도 영향을 받을 수 있다.

- SERIALIZABLE(level 3)

  - 데이터의 일관성과 동시성을 유지하기 위해 MVCC를 사용하지 않는 것

### **propagation(전파속성)**

```
@Transactional(propagation=Propagation.REQUIRED)
public void addUser(User user) throws Exception {}
```

- REQUIRED(default)

  - 이미 진행중인 트랜잭션이 있다면 해당 트랜잭션을 따르고, 없다면 새로운 트랜잭션 생성

    `Support a current transaction; create a new one if none exists`

- SUPPORTS

  - 이미 진행중인 트랜잭션이 있다면 해당 트랜잭션을 따르고, 없다면 트랜잭션 없이(생성하지 않고) 진행

    `Support a current transaction; execute non-transactionally if none exists`

- REQUIRES_NEW

  - 새로운 트랜잭션을 생성하고, 이미 진행중인 트랜잭션이 있다면 새로운 트랜잭션을 일시 중지시킴(이미 진행중인 트랜잭션 종료 시까지 기다림)

    `Create a new transaction, suspending the current transaction if one exists`

- MANDATORY

  - REQUIRED와 비슷하게 이미 진행중인 트랜잭션이 있으면 따르지만, 없다면 새로운 트랜잭션을 생성하지 않고 예외를 발생시킴
  - 즉, 진행중인 트랜잭션이 있을 경우에만 사용(독립적으로 트랜잭션 생성할 수 없다는 의미)

- NOT_SUPPORTED

  - 현재 진행중인 트랜잭션을 따르지 않고, 트랜잭션 없이(생성하지 않고) 진행

- NEVER

  - 트랜잭션 자체를 사용하지 않음
  - 진행 중인 트랜잭션이 있으면 예외 발생

- NESTED

  - 이미 진행중인 트랜잭션이 있다면 트랜잭션을 새로 생성해 중첩으로 시작
  - 없다면 REQUIRED와 같고, REQUIRED_NEW와는 아래의 차이점이 존재
    - nested는 진행중인 부모 트랜잭션의 커밋과 롤백에는 영향을 받지만, 자신의 커밋과 롤백은 부모 트랜잭션에 영향을 주지 않음
    - 예를 들어 Main 작업과 Sub 작업인 DB로그 작업이 있다면, 로그 작업을 실패한다고 해서 Main 작업도 롤백시키면 안되겠지만 Main 작업이 실패하면 로그 작업도 함께 롤백시켜야 함

### **readonly**

```
@Transactional(readonly=true)
public void addUser(User user) throws Exception {}
```

- false(default)
- true
  - insert, update, delete 실행 시 예외 발생

### **rollbackFor**

```
@Transactional(rollbackFor=Exception.class)
public void addUser(User user) throws Exception {}
```

- 특정 예외가 발생할 시 강제 rollback
- value로는 runtime error, unexpected error가 아닌 사용자가 정의한 예외의 class를 명시

### **noRollbackFor**

```
@Transactional(noRollbackFor=RestException.class)
public void addUser(User user) throws Exception {}
```

- 특정 예외를 rollback 처리하지 않음

### **timeout**

```
@Transactional(timeout=10)
public void addUser(User user) throws Exception {}
```

- default == -1, -1인경우 no timeout
- must return a number of seconds

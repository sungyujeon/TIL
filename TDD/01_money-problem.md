# Money Problem

> [전반적인 TDD의 리듬](#전반적인-TDD의-리듬)
>
> [Money Problem](#Money-Problem)
>
> - [테스트의 시작](#테스트의-시작)
> - [테스트의 진행: 최대한 빠르게 초록 막대 보기](#테스트의-진행:-최대한-빠르게-초록-막대-보기)
> - [테스트의 진행: side effect 해결](#테스트의-진행:-side-effect-해결)
> - [테스트의 진행: equals()](#테스트의-진행:-equals())
> - [테스트의 진행: private](#테스트의-진행:-private)
> - [테스트의 진행: 다른 통화](#테스트의-진행:-다른-통화)
> - [테스트의 진행: 중복 제거(공용 equals)](#테스트의-진행:-중복-제거(공용-equals))
> - [테스트의 진행: Franc와 Dollar 비교하기](#테스트의-진행:-Franc와-Dollar-비교하기)
> - [테스트의 진행: 객체 만들기](#테스트의-진행:-객체-만들기)
> - [테스트의 진행: 다중 통화 표현하기](#테스트의-진행:-다중 통화-표현하기)
> - [테스트의 진행: times() 중복](#테스트의-진행:-times()-중복)
> - [테스트의 진행: 불필요한 subclass](#테스트의-진행:-불필요한-subclass)

<br>

## 전반적인 TDD의 리듬

> 개발자의 목적은 '작동하는 깔끔한 코드'를 얻는 것이다. 이를 얻기는 쉬운 일이 아니므로 나누어 정복하라(divide and conquer). 작동하는 깔끔한 코드를 얻기 위해서 '작동하는'에 해당하는 부분을 먼저 해결하고, '깔끔한 코드' 부분을 나중에 해결하라. 이는 깔끔한 코드를 해결하고 작동하는 부분을 해결하는 아키텍처 주도 개발(architecture-driven development)과 정반대다.

1. 재빨리 테스트를 하나 추가한다
2. 모든 테스트를 실행하고 새로 추가한 것이 실패하는지 확인한다
3. 코드를 조금 바꾼다
4. 모든 테스트를 실행하고 전부 성공하는지 확인한다
5. 리팩토링을 통해 중복을 제거한다

<br>

## Money Problem

> 달러라는 통화 한가지로만 계산하던 시스템을 여러 통화 화폐를 이용해 계산하고, 각 화폐 단위 값에 대한 합산 결과를 하나의 통화 단위로 보여주는 시스템을 구축하고자 함

<br>

### 테스트의 시작

```java
@Test
public void testMultiplication() {
    Dollar five = new Dollar(5);
    five.times(2);
    assertEquals(10, five.amount);
}
```

- 종목, 주, 가격, 합계 테이블이 있다면 다중 통화를 지원할 때는 통화 단위와 환율을 추가해야 함. 이를 위해 다음과 같이 간단한 테스트를 하나 추가하는 것으로 시작
- public, 예기치 않은 부작용, 금액 계산 시 정수 사용 등 문제가 많지만 단순히 작은 단계로 시작하는 것일 뿐이고, 최대한 빨리 실패 케이스부터 만들어 성공하도록 만들어야 함
- 문제
  - Dollar 클래스 없음
  - 생성자 없음
  - times(int) 메서드 없음
  - amount 필드 없음

- 해결

  ```java
  class Dollar {
      int amount;
  
      Dollar(int amount) {}
  
      void times(int multiplier) {}
  }
  ```

  - Dollar 클래스 생성
  - 생성자 작성
  - times() 스텁 구현(stub implementation)
    - 메서드의 서명부와 (반환값이 있을 경우) 반환 명령만 적어서, 이 메서드를 호출하는 코드가 컴파일 될 수 있도록 껍데기만 만들어두는 것
  - amount 필드 작성

- 추가 문제

  - junit을 실행시키면 빨간색이 뜨며 테스트 통과에 실패함

    ```txt
    Expected: 10
    Actual  : 0
    ```

<br>

### 테스트의 진행: 최대한 빠르게 초록 막대 보기

```java
class Dollar {
    int amount = 10;
    // ...
}
```

- amount에 10을 강제 할당하여 Actual 값이 10이 나오게  >> 테스트 통과!

- 테스트 주기

  - 작은 테스트를 하나 추가한다(위 테스트 코드 추가)
  - 모든 테스트를 실행해서 테스트가 실패하는 것을 확인한다(위 실패 확인)
  - 조금 수정한다(amount = 10)
  - 모든 테스트를 실행해서 테스트가 성공하는 것을 확인한다(실행 시 통과)
  - 중복을 제거하기 위해 리팩토링을 한다

- 10이라는 구체적인 값이 아니라 일반화를 해야함. 즉, 마지막 단계인 리팩토링을 해야 함

- 문제

  - 10은 어딘가에서 넘어온 값이므로 중복을 제거해야 함

- 해결

  ```java
  public class Dollar {
      int amount;
  
      Dollar(int amount) {
          this.amount = amount;
      }
  
      void times(int multiplier) {
          amount *= multiplier;
      }
  }
  ```

  - amount는 생성자에서 넘어오는 값이므로 변수에 저장
  - multiplier는 times 메서드 호출 시 넘어오므로 메서드 내에서 사용

- 추가 문제

  ```java
  // five 변수에 담긴 Dollar 객체의 amount는 계속 변함
  @Test
  void testMultiplication() {
      Dollar five = new Dollar(5);
      five.times(2);
      assertEquals(10, five.amount);
      five.times(3);
      assertEquals(15, five.amount);
  }
  ```

  - times() 첫 호출 이후에 five 변수에 담긴 amount는 더 이상 5가 아님
  - 그렇다고 새로운 객체를 반환하게 만드려고 하면, Dollar의 인터페이스를 수정해야 하고, 그러려면 테스트도 수정해야 하는 추가 작업을 해야 함

<br>

### 테스트의 진행: side effect 해결

```java
@Test
void testMultiplication() {
    Dollar five = new Dollar(5);
    Dollar product = five.times(2);    
    assertEquals(10, product.amount);
    product = five.times(3);
    assertEquals(15, product.amount);
}

Dollar times(int multiplier) {
    return new Dollar(amount * multiplier);
}
```

- times() 메서드의 결과로 적절한 객체를 반환하게 리팩토링
  - Dollar 객체와 같이 객체를 값처럼 쓸 수 있는데, 이를 값 객체 패턴(value object pattern)이라 함
  - 값 객체 제약사항 중 하나는 객체의 인스턴스 변수가 생성자를 통해서 일단 설정된 후에는 결코 변하지 않는다는 것

- 최대한 빠르게 초록 막대를 보기 위해 취하는 세가지 전략
  - 가짜로 구현하기: 상수를 반환하게 만들고 진짜 코드를 얻을 때까지 단계적으로 상수를 변수로 바꾸어 간다
  - 명백한 구현 사용하기: 실제 구현을 입력한다
  - 삼각측량(triangulation): 추후 설명

<br>

### 테스트의 진행: equals()

```java
@Test
void testEquality() {
    assertTrue(new Dollar(5).equals(new Dollar(5)));
}
```

- 값 객체의 equals()를 구현할 때 인스턴스 변수인 amount가 동일한지를 보기 위해서는 객체 비교를 함

- 문제

  - 객체 비교를 하고 있기 때문에 테스트에 통과하지 못함

- 해결(삼각측량을 이용한 해결)

  ```java
  @Test
  void testEquality() {
      assertTrue(new Dollar(5).equals(new Dollar(5)));
      assertFalse(new Dollar(5).equals(new Dollar(6)));
  }
  
  public boolean equals(Object object) {
      Dollar dollar = (Dollar) object;
      return this.amount == dollar.amount;
  }
  ```

  - 값 객체가 동일함을 보이기 위해서 동일성을 일반화하여 amount 값 자체를 비교함
  - 삼각측량이란 결국 true를 반환하는 테스트와 false를 반환하는 테스트를 모두 통과시켜서 다른 테스트도 통과할 것이라고 추측(측량)하는 것
  - 이로써 Dollar 객체들의 값을 직접 비교할 수 있게 됨

- 추가 문제

  - equality 문제는 해결하였지만 테스트 시 이를 명확하게 표현하고 있지 않음

<br>

### 테스트의 진행: private

```java
@Test
void testMultiplication() {
    Dollar five = new Dollar(5);
    assertEquals(new Dollar(10), five.times(2));
    assertEquals(new Dollar(15), five.times(3));
}

class Dollar {
    private int amount = 10;
    // ...
}
```

- 객체를 비교하는 것으로 비교하고, amount 인스턴스 변수를 사용하는 것은 Dollar 객체 뿐이므로 private 인스턴스 변수로 변경할 수 있음

- 추가 문제
  - 달러 객체에 대해서는 테스트에 통과했지만, 다른 통화 객체가 통과하리라고 보장할 수는 없음

<br>

### 테스트의 진행: 다른 통화

```java
@Test
void testFrancMultiplication() {
    Franc five = new Franc(5);
    assertEquals(new Franc(10), five.times(2));
    assertEquals(new Franc(15), five.times(3));
}

public class Franc {
    private int amount;

    Franc(int amount) {
        this.amount = amount;
    }

    Franc times(int multiplier) {
        return new Franc(amount * multiplier);
    }

    public boolean equals(Object object) {
        Franc franc = (Franc) object;
        return this.amount == franc.amount;
    }
}
```

- 다른 통화 객체인 Franc 클래스를 만들고 새로운 테스트를 추가하여 기존 TDD 리듬 중 일부를 빠르게 수행한다
  - 테스트 작성 -> 컴파일되게 하기 -> 실패하는지 확인하기 위해 실행 -> 실행하게 만듦 까지는 속도의 문제이기 때문에 빠르게 실행
  - 이후 리팩토링을 서서히 진행한다
- 추가 문제
  - 개별 통화 객체를 모두 생성하고 중복이 많아서 리팩토링이 필요함

<br>

### 테스트의 진행: 중복 제거(공용 equals)

```java
public class Money {
    protected int amount;

    public boolean equals(Object object) {
        Money money = (Money) object;
        return this.amount == money.amount;
    }
}

public class Dollar extends Money {
    Dollar times(int multiplier) {
        return new Dollar(super.amount * multiplier);
    }
}

public class Franc extends Money {
    Franc times(int multiplier) {
        return new Franc(amount * multiplier);
    }  
}

@Test
void testEquals() {
    assertTrue(new Dollar(5).equals(new Dollar(5)));
    assertFalse(new Dollar(5).equals(new Dollar(6)));
    assertTrue(new Franc(5).equals(new Franc(5)));
    assertFalse(new Franc(5).equals(new Franc(6)));
}
```

- 해결
  - Money 클래스를 만들어 공통 속성인 amount, equals() 만들고 각 통화 클래스에서 Money 클래스를 상속하도록 함
  - 테스트 코드도 하나로 합침
- 추가 문제
  - 테스트 코드에서 중복이 들어감

<br>

### 테스트의 진행: Franc와 Dollar 비교하기

```java
void testEquals() {
    assertTrue(new Dollar(5).equals(new Dollar(5)));
    assertFalse(new Dollar(5).equals(new Dollar(6)));
    assertTrue(new Franc(5).equals(new Franc(5)));
    assertFalse(new Franc(5).equals(new Franc(6)));
    assertFalse(new Franc(5).equals(new Dollar(5)));
}
```

- 문제

  - 단순히 equals 비교로 Franc와 Dollar 객체의 amount 값을 비교하면 equals() 로 비교 시 같다는 결과가 나옴

- 해결

  ```java
  public class Money {
      protected int amount;
  
      public boolean equals(Object object) {
          Money money = (Money) object;
          return this.amount == money.amount && getClass().equals(money.getClass());
      }
  }
  ```

  - Class도 함께 포함하여 비교한다

- 추가 문제

  - 모델 코드에서 클래스를 위와 같은 방식으로 사용하는 것은 다소 지저분함

<br>

### 테스트의 진행: 객체 만들기

> Money의 두 하위 클래스는 많은 일을 하지 않는 것 같으므로 제거하고 싶음. 이를 위해 Money 클래스에 하위 객체들을 반환하는 팩토리 메서드(factory method)를 도입할 수 있음.

```java
public abstract class Money {
    protected int amount;

    static Money dollar(int amount) {
        return new Dollar(amount);
    }

    abstract Money times(int multiplier);
}

@Test
void testMultiplication() {
    Money five = new Dollar(5);
    assertEquals(Money.dollar(10), five.times(2));
    assertEquals(Money.dollar(15), five.times(3));
}
```

- 객체 만들기
  - Money를 추상 클래스로 만들고, dollar 객체를 반환하는 dollar 정적 팩토리 메서드를 만든다
  - 테스트코드도 dollar 인스턴스를 정적팩토리 메서드로 생성할 수 있게 되었고, 클라이언트 코드에서 Dollar 라는 이름의 하위 클래스가 있다는 사실을 모르게 됨. 즉, 하위 클래스의 존재를 테스트에서 decoupling 함으로써 어떤 모델 코드에도 영향을 주지 않고 상속 구조를 변경할 수 있게 됨
- 추가 문제
  - 다중 통화를 표현할 때 중복되는 코드들이 여전히 남아 있게 됨

<br>

### 테스트의 진행: 다중 통화 표현하기

```java
public abstract class Money {
    protected int amount;
    protected String currency;

    Money(int amount, String currency) {
        this.amount = amount;
        this.currency = currency;
    }

    static Money dollar(int amount) {
        return new Dollar(amount, "USD");
    }

    static Money franc(int amount) {
        return new Franc(amount, "CHF");
    }

    abstract Money times(int multiplier);

    String currency() {
        return currency;
    }
}

public class Dollar extends Money {

    Dollar(int amount, String currency) {
        super(amount, currency);
    }
  
    @Override
    Money times(int multiplier) {
        return Money.dollar(super.amount * multiplier);
    }
}

public class Franc extends Money {

    Franc(int amount, String currency) {
        super(amount, currency);
    }
  
    @Override
    Money times(int multiplier) {
        return Money.franc(super.amount * multiplier);
    }
}
```

- 해결
  - Money 추상클래스에서 동일한 멤버(생성자, times(), currency())들을 정의
  - 정적팩토리인 dollar(), franc()에서 각 통화 단위를 설정
  - Dollar, Franc 구체 클래스에서는 생성자가 상위 클래스 생성자를 호출(super())
- 추가 문제
  - Dollar, Franc 클래스에 비슷한 형태의 times() 로직이 중복됨

<br>

### 테스트의 진행: times() 중복

```java
public class Dollar extends Money {

    //...
    
    @Override
    Money times(int multiplier) {
        return new Money(amount * multiplier, currency);
    }
}

public class Franc extends Money {

    //...

    @Override
    Money times(int multiplier) {
        return new Money(amount * multiplier, currency);
    }
}
```

- 해결

  - 이전 단계에서 times() 메서드 내에서 정적 팩토리를 호출해 인스턴스를 생성했는데, times() 중복을 없애기 위해서는 다시 new로 만들어야 함

- 추가 문제

  - 테스트 코드를 실행하면 다음의 에러 메시지가 나오면서 실패하는데, 이는 equals() 비교에서 클래스가 같은지를 검사하고 있기 때문이다

    `rg.opentest4j.AssertionFailedError: expected: test01.Franc@3b0090a4<10   CHF> but was: test01.Money@3cd3e762<10   CHF>`

- 추가 해결

  ```java
  public class Money {
      //...
    
      // 기존 코드
      public boolean equals(Object object) {
          Money money = (Money) object;
          return this.amount == money.amount && getClass().equals(money.getClass());
      }
    
      // 변경 코드
      public boolean equals(Object object) {
          Money money = (Money) object;
          return this.amount == money.amount && currency().equals(money.currency());
      }
  ```

  - 기존 코드에서는 클래스를 비교했지만, 변경된 코드에서는 currency를 비교하고 있음

- 테스트 코드 통과 후 상위 클래스로 끌어올리기

  ```java
  public class Money {
      //...
  
      Money times(int multiplier) {
          return new Money(amount * multiplier, currency);
      }
  }
  ```

  - 이제 Dollar, Franc 하위 클래스의 공통 times 메서드를 Money 클래스로 끌어올릴 수 있음

<br>

### 테스트의 진행: 불필요한 subclass

- times() 까지 상위 클래스로 끌어올렸으므로 생성자만 있는 Dollar, Franc 서브 클래스는 불필요하게 됨
- 이로써 불필요한 subclass와, subclass를 사용한 불필요 테스트 코드를 제거함






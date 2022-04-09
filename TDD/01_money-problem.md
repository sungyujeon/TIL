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
> - [테스트의 진행: 다중 통화 더하기](#테스트의-진행:-다중-통화-더하기)
> - [테스트의 진행: 통화 변환](#테스트의-진행:-통화-변환)
> - [테스트의 실제: 서로 다른 통화 더하기](#테스트의-실제:-서로-다른-통화-더하기)
> - [테스트의 실제: 최종 구현](#테스트의-실제:-최종-구현)

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

<br>

### 테스트의 진행: 다중 통화 더하기

- 테스트 코드 작성

  ```java
  @Test
  void testSimpleAddition() {
      Money sum = Money.dollar(5).plus(Money.dollar(5));
      assertEquals(Money.dollar(10), sum);
  }
  ```

  - 간단하게 $5 + $5 = $10을 테스트하는 코드를 작성
  - 이 때 plus() 메서드가 구현되어 있지 않기 때문에 오류 발생

- plus() 메서드 구현

  ```java
  Money plus(Money addend) {
      return Money.dollar(this.amount + money.amount);
  }
  ```

  - Money 인스턴스를 반환하는 plus() 메서드 구현
  - 이후 원하는 방식으로 동작하게 하는 메타포를 생각
    - 두 Money의 합을 나타내는 객체를 만드는데, 
    - 하나는 Money의 합을 마치 지갑처럼 취급하는 것(한 지갑에는 금액과 통화가 다른 여러 화폐들이 들어갈 수 있음)
    - 다른 하나는 (2+3) * 5 와 같은 수식이고 수식의 가장 작은 단위가 Money가 됨. 연산의 결과로 Expression들이 생기는데, 그 중 하나는 Sum(합)이 됨. 연산이 완료되면 환율을 이용해 Expression을 단일 통화로 축약할 수 있음

- 테스트 코드 재작성

  ```java
  @Test
  void testSimpleAddition() {
      Money five = Money.dollar(5);
      Expression sum = five.plus(five);
      Bank bank = new Bank();
      Money reduced = bank.reduce(sum, "USD");
      assertEquals(Money.dollar(10), reduced);
  }
  
  public interface Expression {}
  
  public class Bank {
  
      Money reduce(Expression source, String to) {
          return null;
      }
  }
  
  public class Money implements Expression {
      //...
  
      Expression plus(Money addend) {
          return new Money(amount + addend.amount, currency);
      }
  }
  ```

  - reduce(축약)란 책임(더하는 expression을 기축 통화로 변환하는 작업)은 은행이 맡게 함
  - 은행 클래스를 생성
  - Expression이란 수식은 다른 부분에 대해 모를 수 있도록 하면 테스트하기 쉬울 뿐 아니라 재활용하거나 이해하기에 모두 쉬운 상태로 남아 있을 수 있으므로 interface로 만든다

  - Money 클래스가 Expression을 implements 하고, plus() 메서드의 반환 타입을 Expression으로 만듦(두 money의 합은 expression이어야 하기 때문/ e.g. 2USD + 3CHF )
  - 이 과정을 통해 컴파일이 되고, 바로 실패한다! 만세! 진전이다!!

- 가짜 구현

  ```java
  Money reduce(Expression source, String to) {
      return Money.dollar(10);
  }
  ```

  - 테스트가 통과(초록 막대)하게끔 가짜로 구현한다
  - 지금까지의 과정을 통해
    - 큰 테스트를 작은 테스트($5 + 10CHF 에서 $5 + $5)로 줄여서 발전을 나타낼 수 있도록 함
    - 필요한 계산(computation)에 대한 메타포들을 신중히 생각해봄
    - 새 메타포에 기반하여 기존의 테스트를 재작성
    - 테스트를 빠르게 컴파일
    - 테스트 실행

- 리팩토링

  - 테스트 코드 작성

    ```java
    @Test
    void testPlusReturnsSum() {
        Money five = Money.dollar(5);
        Expression result = five.plus(five);
        Sum sum = (Sum) result;
        assertEquals(five, sum.augend);  // 피가산수(augend): 덧셈의 첫 인자
        assertEquals(five, sum.addend);
    }
    ```

    - Money.plus()는 그냥 Money가 아닌 Expression(Sum)을 반환해야 함

  - Sum 구현

    ```java
    public class Sum implements Expression {
        Money augend;
        Money addend;
    
        Sum(Money augend, Money addend) {
            this.augend = augend;
            this.addend = addend;
        }
    }
    
    public class Money implements Expression {
        //...
    
        Expression plus(Money addend) {
            return new Sum(this, addend);
        }
    }
    ```

    - Sum 클래스를 구현하고 Money.plus()가 Sum을 반환하게 함
    - 이를 위해 Sum도 Expression을 implements
    - 이제 Bank.reduce()는 Sum을 전달받고, 만약 Sum이 가지고 있는 Money 통화가 모두 동일하고 reduce를 통해 얻어내고자 하는 Money의 통화 역시 같다면, 결과는 Sum 내에 있는 Money 들의 amount를 합친 값을 갖는 Money 객체여야 함

  - reduceSum

    ```java
    @Test
    void testReduceSum() {
        Expression sum = new Sum(Money.dollar(3), Money.dollar(4));
        Bank bank = new Bank();
        Money result = bank.reduce(sum, "USD");
        assertEquals(Money.dollar(7), result);
    }
    ```

    - 위 가정에 맞추어 Dollar 통화를 맞추어 테스트 코드를 만들었는데, Bank.reduce() 메서드를 `return Money.dollar(10)`으로 가짜 구현했으므로 테스트에 통과하지 못함
    - 즉, result는 두 Money의 합이어야 하고 통화는 우리가 축약하는 통화여야 함

  - Bank.reduce() 재구현

    ```java
    public class Bank {
    
        Money reduce(Expression source, String to) {
            Sum sum = (Sum) source;
            int amount = sum.augend.amount + sum.addend.amount;
            return new Money(amount, to);
        }
    }
    ```

    - 위 코드는 두 가지 이유로 지저분함

      - 캐스팅: 모든 Expression에 대해 작동해야 함
      - public field와 그 field 들에 대한 두 단계에 걸친 레퍼런스

    - 리팩토링

      ```java
      public class Bank {
      
          Money reduce(Expression source, String to) {
              Sum sum = (Sum) source;
              return sum.reduce(to);
          }
      }
      
      public class Sum implements Expression {
          //...
      
          public Money reduce(String to) {
              int amount = augend.amount + addend.amount;
              return new Money(amount, to);
          }
      }
      ```

      - Expression의 합을 구하는 책임(reduce)을 Sum 클래스로 넘김

  - Money class casting 코드 중복 제거

    ```java
    @Test
    void testReduceMoney() {
        Bank bank = new Bank();
        Money result = bank.reduce(Money.dollar(1), "USD");
        assertEquals(Money.dollar(1), result);
    }
    
    public interface Expression {
        Money reduce(String to);
    }
    
    public class Money implements Expression {
        public Money reduce(String to) {
            return this;
        }
    }
    
    public class Bank {
        Money reduce(Expression source, String to) {
            return source.reduce(to);
        }
    }
    
    // Expression.reduce() 없었다면 했어야할 클래스 캐스팅
    public class Bank {
        Money reduce(Expression source, String to) {
            if (source instanceof Money) {
                return (Money) source;  // Money 객체는 Sum 으로 클래스 캐스팅이 안되므로
            }
            Sum sum = (Sum) source;
            return sum.reduce(to);
        }
    }
    ```

    - 기존 Money 클래스에는 reduce가 없어서, Expression이 Money 타입을 갖는 인스턴스라면 클래스 형변환을 해주어야 했는데, Expression에서 reduce 메서드를 정의하고 Money 클래스에서 이를 구현함으로써 형변환 없이 Bank.reduce()를 동작하게 할 수 있음

<br>

### 테스트의 진행: 통화 변환

- 테스트 코드 작성

  ```java
  @Test
  void testReduceMoneyDifferentCurrency() {
      Bank bank = new Bank();
      bank.addRate("CHF", "USD", 2);
      Money result = bank.reduce(Money.franc(2), "USD");
      assertEquals(Money.dollar(1), result);
  }
  ```

- addRate() 구현

  - addRate() 구현 전 CHF, USD 하드 코딩 구현

    ```java
    // reduce() 구현하는 Money, Expression에 bank 인자 전달
    
    public class Money implements Expression {
        //...
      
        public Money reduce(Bank bank, String to) {
            int rate = (currency.equals("CHF") && to.equals("USD")) ? 2 : 1;
            return new Money(amount / rate, to);
        }
    }
    ```

    - reduce() 구현하는 Money, Expression에 bank 인자 추가
    - Money.reduce()에 CHF, USD 환율 변환하는 가짜 코드 구현

  - Bank.rate()

    ```java
    pupblic class Bank {
        int rate(String from, String to) {
            return from.equals("CHF") && to.equals("USD") ? 2 : 1;
        }
    }
    
    public class Money implements Expression {
        //...
      
        public Money reduce(Bank bank, String to) {
            int rate = bank.rate(currency, to);
            return new Money(amount / rate, to);
        }
    }
    ```

    - Bank.rate() 메서드에서 우선 CHF, USD 환율 변환하는 가짜 코드 구현하고, 위 Money 클래스에서는 Bank에 rate 계산 로직 책임을 담당하게 함

  - 환율표

    ```java
    private class Pair {
        private String from;
        private String to;
    
        Pair(String from, String to) {
            this.from = from;
            this.to = to;
        }
    
        public int hashCode() {
            return 0;
        }
        
        public boolean equals(Object object) {
            Pair pair = (Pair) object;
            return from.equals(pair.from) && to.equals(pair.to);
        }
    }
    ```

    - Bank에서 환율표를 가지고 있다가 필요할 때 찾아볼 수 있게 함
    - 두 개의 통화와 환율을 매핑시키는 해시 테이블 사용
    - 이 때 키를 위한 객체(from, to 정보를 담는 Pair 객체)를 따로 만듦
    - hashCode가 0을 리턴하는 것은 안 좋지만 우선은 구현을 위해 놔둠

  - addRate() 구현

    ```java
    public class Bank {
        private Hashtable rates = new Hashtable();
    
        //...
    
        void addRate(String from, String to, int rate) {
            rates.put(new Pair(from, to), new Integer(rate));
        }
    }
    ```

    - rates를 저장하는 hashtable을 만들고 addRate() 메서드 구현

  - addRate() 사용

    ```java
    int rate(String from, String to) {
        if (from.equals(to)) return 1;
    
        Integer rate = (Integer) rates.get(new Pair(from, to));
        return rate.intValue();
    }
    ```

    - 같은 종류의 통화를 처리하기 위해 분기
    - rate 구할 시 rates hashtable에서 조회

<br>

### 테스트의 실제: 서로 다른 통화 더하기

> 이제 드디어 여러 통화 단위에 대한 합산 결과를 하나의 통화 단위로 보여주는 시스템을 구축할 수 있게 할 것

- 테스트 코드 작성

  ```java
  @Test
  void testMixedAddition() {
      // given
      Money fiveBucks = Money.dollar(5);
      Money tenFrancs = Money.franc(10);
      Bank bank = new Bank();
      bank.addRate("CHF", "USD", 2);
  
      // when
      Money result = bank.reduce(fiveBucks.plus(tenFrancs), "USD");
  
      // then
      assertEquals(Money.dollar(10), result);
  }
  ```

  - 현재는 컴파일이 되지 않는 상태

- Sum.reduce() 수정

  ```java
  public class Sum implements Expression {
      //...
  
      public Money reduce(Bank bank, String to) {
          int amount = augend.reduce(bank, to).amount + addend.reduce(bank, to).amount;
          return new Money(amount, to);
      }
  }
  ```

  - 통화 단위를 바꿔주는 reduce() 메서드 호출을 통해 맞추면 테스트 통과

- Expression 인터페이스 사용

  ```java
  @Test
  void testMixedAddition() {
      // given
      Expression fiveBucks = Money.dollar(5);
      Expression tenFrancs = Money.franc(10);
      Bank bank = new Bank();
      bank.addRate("CHF", "USD", 2);
  
      // when
      Money result = bank.reduce(fiveBucks.plus(tenFrancs), "USD");
  
      // then
      assertEquals(Money.dollar(10), result);
  }
  
  public class Sum implements Expression {
      Expression augend;
      Expression addend;
  
      Sum(Expression augend, Expression addend) {
          this.augend = augend;
          this.addend = addend;
      }
  }
  
  public interface Expression {
      //...
      Expression plus(Expression addend);
  }
  
  public class Money implements Expression {
      //...
  
      @Override
      public Expression plus(Expression addend) {
          return new Sum(this, addend);
      }
  }
  
  public class Sum implements Expression {
      //...
  
      @Override
      public Expression plus(Expression addend) {
          return null;
      }
  ```

  - Sum 하기 위한 Expression인 augend, addend의 타입을 모두 Expression으로 변경하고, 테스트 코드에서도 Expression으로 변경한다
  - 테스트 코드에서 fiveBucks.plus() 메서드가 없기 때문에 Expression을 구현하는 클래스에서 plus를 재정의한다
  - plus()를 재정의한 코드는 우선 stub 구현으로 남겨두고 할 일 목록에 넣어둔다

<br>

### 테스트의 실제: 최종 구현

- 테스트 코드 구현

  ```java
  @Test
  void testSumPlusMoney() {
      // given
      Expression fiveBucks = Money.dollar(5);
      Expression tenFrancs = Money.franc(10);
      Bank bank = new Bank();
      bank.addRate("CHF", "USD", 2);
  
      // when
      Expression sum = new Sum(fiveBucks, tenFrancs).plus(fiveBucks);
      Money result = bank.reduce(sum, "USD");
  
      // then
      assertEquals(Money.dollar(15), result);
  }
  ```

- Sum.plus() 스텁 구현

  ```java
  public class Sum implements Expression {
      //...
  
      @Override
      public Expression plus(Expression addend) {
          return new Sum(this, addend);
      }
  }
  ```

  - stub 구현을 했던 plus() 메서드를 Sum 인스턴스 반환하도록 구현하면 테스트 통과

- Sum.times() 구현

  ```java
  @Test
  void testSumTimes() {
      // given
      Expression fiveBucks = Money.dollar(5);
      Expression tenFrancs = Money.franc(10);
      Bank bank = new Bank();
      bank.addRate("CHF", "USD", 2);
  
      // when
      Expression sum = new Sum(fiveBucks, tenFrancs).times(2);
      Money result = bank.reduce(sum, "USD");
  
      // then
      assertEquals(Money.dollar(20), result);
  }
  
  public interface Expression {
      //...
      Expression times(int multiplier);
  }
  
  public class Money implements Expression {
      //...
  
      @Override
      public Expression times(int multiplier) {
          return new Money(amount * multiplier, currency);
      }
  }
  
  public class Sum implements Expression {
      //...
      
      @Override
      public Expression times(int multiplier) {
          return new Sum(augend.times(multiplier), addend.times(multiplier));
      }
  }
  ```

  - Expression에 times() 메서드 선언 후 구현하는 클래스 Money, Sum 에서 override
# 다중 통화를 지원하는 Money 객체



## 전반적인 TDD의 리듬

> 개발자의 목적은 '작동하는 깔끔한 코드'를 얻는 것이다. 이를 얻기는 쉬운 일이 아니므로 나누어 정복하라(divide and conquer). 작동하는 깔끔한 코드를 얻기 위해서 '작동하는'에 해당하는 부분을 먼저 해결하고, '깔끔한 코드' 부분을 나중에 해결하라. 이는 깔끔한 코드를 해결하고 작동하는 부분을 해결하는 아키텍처 주도 개발(architecture-driven development)과 정반대다.

1. 재빨리 테스트를 하나 추가한다
2. 모든 테스트를 실행하고 새로 추가한 것이 실패하는지 확인한다
3. 코드를 조금 바꾼다
4. 모든 테스트를 실행하고 전부 성공하는지 확인한다
5. 리팩토링을 통해 중복을 제거한다



## Money Problem

> 달러라는 통화 한가지로만 계산하던 시스템을 여러 통화 화폐를 이용해 계산하고, 각 화폐 단위 값에 대한 합산 결과를 하나의 통화 단위로 보여주는 시스템을 구축하고자 함



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



### 테스트의 진행: private


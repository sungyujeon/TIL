# 람다와 스트림

> [ITEM 42. 익명 클래스보다는 람다를 사용하라](#ITEM-42.-익명-클래스보다는-람다를-사용하라)
>
> [ITEM 43. 람다보다는 메서드 참조를 사용하라](#ITEM-43.-람다보다는-메서드-참조를-사용하라)

<br>

## ITEM 42. 익명 클래스보다는 람다를 사용하라

##### lambda expression

```java
//lambda
Collections.sort(words, (s1, s2) -> Integer.compare(s1.length(), s2.length()));

//Comparator util
Collections.sort(words, comparingInt(String::length));

//sort method in 'List' interface, since 1.8
words.sort(comparingInt(String::length));
```

- 매개변수와 반환 타입 명시가 없지만 컴파일러가 타입 추론
- 타입을 명시해야 코드가 더 명확할 때만 제외하고는, 람다의 모든 매개변수 타입은 생략하는 것이 좋음
- 컴파일러가 타입 추론 시 타입 정보 대부분을 제네릭에서 얻기 때문에, 람다를 쓸 때는 제네릭 사용에 더 주의해야 함

```java
//abstract method
public enum Operation {
    PLUS("+") {
        public double apply(double x, double y) { return x + y; }
    };

    private final String symbol;

    Operation(String symbol) { this.symbol = symbol; }

    public abstract double apply(double x, double y);
}

//lambda
public enum Operation {
    PLUS("+", (x, y) -> x - y);

    private final String symbol;
    private final DoubleBinaryOperator op;

    Operation(String symbol, DoubleBinaryOperator op) {
        this.symbol = symbol;
        this.op = op;
    }

    public double apply(double x, double y) {
        return op.applyAsDouble(x, y);
    }
}
```

- 람다를 이용하면 열거 타입의 인스턴스 필드를 이용하는 방식으로 상수별로 다르게 동작하는 코드를 쉽게 구현 할 수 있음

- lambda 단점

  - 메서드나 클래스와 달리 이름이 없고 문서화도 못함

  - 코드 자체로 동작이 명확히 설명되지 않거나 코드 줄 수가 많아지면 람다 쓰지 않는 것이 좋음

    (람다는 한 줄이 가장 좋고, 세 줄 안에 끝내는게 좋음)

  - 열거 타입 생성자 안의 람다는 인스턴스 멤버에 접근 불가
    - 열거 타입 생성자에 넘겨지는 인수 타입도 컴파일 타임에 추론되므로 static에만 접근 가능(가령 위 예시 lambda expression 내에서 symbol instance field 접근 불가)

- 주의점

  - 람다도 익명 클래스처럼 직렬화 형태가 구현별로 다를 수 있으므로, 람다를 직렬화하는 일은 극히 삼가야 함. (직렬화해야만 하는 함수 객체가 있다면 private 정적 중첩 클래스의 인스턴스를 사용하라)

<br>

##### anonymous class

- 함수 객체(function object)

  - 추상 메서드를 하나만 담은 인터페이스(드물게는 추상 클래스)
  - 함수 객체를 만드는 주요 수단이 익명 클래스였음

- 예시

  ```java
  Collections.sort(words, new Comparator<String>() {
      public int compare(String s1, String s2) {
          return Integer.compare(s1.length(), s2.length());
      }
  })
  ```

  - 전략 패턴처럼 함수 객체를 사용하는 과거 객체 지향 디자인패턴에는 익명 클래스면 충분했음
  - Comparator 인터페이스가 정렬 담당하는 추상 정략
  - 문자열을 정렬하는 구체 전략을 익명 클래스로 구현

- 단점

  - 익명 클래스 방식은 코드가 너무 길어 함수형 프로그래밍에는 부적합

- 익명 클래스를 사용하는 경우

  - 추상 클래스의 인스턴스를 만들 때 람다 사용할 수 없으므로 익명 클래스 사용

    ```java
    abstract class AbstractClass {
        abstract void abstractMethod();
    }
    
    AbstractClass abstractClass = new AbstractClass() {
        @Override
        void abstractMethod() { ... }
    };
    
    ```

  - 추상 메서드가 여러 개인 인터페이스의 인스턴스 만들 때 사용

    (functional interface는 추상 메서드를 하나만 가짐)

    ```java
    @FunctionalInterface
    public interface MyFunction {
        public abstract void function();  // public abstract 생략 가능
    }
    ```

  - `this`로 익명 클래스의 인스턴스를 가리키고 싶을 때

    - 함수 객체가 자신을 참조해야 할 때
    - lambda는 바깥 인스턴스를 가리킴

<br>

## ITEM 43. 람다보다는 메서드 참조를 사용하라

##### method reference

- 함수 객체를 람다보다도 더 간결하게 만드는 방법

- 예시

  ```java
  // lambda
  map.merge(key, 1, (count, incr) -> count + incr);
  
  // method reference
  map.merge(key, 1, Integer::sum);
  ```

  - 위 람다식은 두 인수의 합을 단순히 반환할 뿐
  - 매개변수가 늘어날수록 메서드 참조로 제거할 수 있는 코드량도 늘어남

- 장점

  - 메서드 참조에는 기능을 잘 드러내는 이름을 지어줄 수 있고 설명도 문서로 남길 수 있음

- 예외

  - 람다가 메서드 참조보다 간결할 때도 있음

    (주로 메서드와 람다가 같은 클래스에 있을 때)

    ```java
    //ex1
    service.execute(GoshThisClassNameIsHumongous::action);
    service.execute(() -> action());  // 더 간결하다
    
    //ex2
    Function.identity();
    x -> x  // 더 간결하다
    ```

<br>

##### 유형(5가지)

| 메서드 참조 유형   | 예   | 람다 |
| --------- | ---- | ---- |
| 정적 | Integer::parseInt | str -> Integer.parseInt(str) |
| 한정적(인스턴스) | Instant.now()::isAfter | Instant then = Instant.now();<br />t -> then.isAfter(t) |
| 비한정적(인스턴스) | String::toLowerCase | str -> str.toLowerCase() |
| 클래스 생성자 | TreeMap<K,V>::new | () -> new TreeMap<K,V>() |
| 배열 생성자 | int[]::new | len -> new int[len] |

- 한정적 참조
  - 수신 객체(receiving object: 참조 대상 인스턴스)를 특정
  - 근본적으로 정적 참조와 비슷(함수 객체가 받는 인수와 참조되는 메서드가 받는 인수가 똑같음)
- 비한정적 참조
  - 수신 객체를 특정하지 않음
  - 함수 객체를 적용하는 시점에 수신 객체를 알려줌. 이를 위해 수신 객체 전달용 매개변수가 매개변수 목록의 첫 번째로 추가되며, 그 뒤로는 참조되는 메서드 선언에 정의된 매개변수들이 뒤따름
  - 주로 스트림 파이프라인에서의 매핑과 필터 함수에 쓰임(item 45)

# 열거 타입과 애너테이션

> [ITEM 34. int 상수 대신 열거 타입을 사용하라](#ITEM-34.-int-상수-대신-열거-타입을-사용하라)
>
> [ITEM 35. ordinal 메서드 대신 인스턴스 필드를 사용하라](#ITEM-35.-ordinal-메서드-대신-인스턴스-필드를-사용하라)
>
> [ITEM 36. 비트 필드 대신 EnumSet을 사용하라](#ITEM-36.-비트-필드-대신-EnumSet을-사용하라)

## ITEM 34. int 상수 대신 열거 타입을 사용하라

##### 열거 타입을 사용하기 전의 패턴

- 열거 타입은 일정 개수의 상수 값을 정의한 다음, 그 외의 값은 허용하지 않는 타입

- 정수 열거 패턴/문자열 열거 패턴(legacy)

  ```java
  public static final int APPLE_FUJI = 0;
  public static final int APPLE_PIPPIN = 1;
  //...
  ```

  - 정수 열거 패턴(int enum pattern) 단점
    - 타입 안전을 보장할 방법이 없음
    - 표현력도 좋지 않음
    - 정수 열거 패턴을 사용한 프로그램은 깨지기 쉬움
      - 평범한 상수를 나열한 것뿐이라 컴파일 시 그 값이 클라이언트 파일에 그대로 새겨짐
      - 상수의 값이 바뀌면 클라이언트도 반드시 다시 컴파일해야 함
    - 문자열로 출력하기가 다소 까다로움
  - 문자열 열거 패턴(string enum pattern) 단점
    - 정수 대신 문자열 상수를 사용하는 변형 패턴
    - 상수의 의미를 출력할 수 있다는 점은 좋지만, 문자열 상수의 이름 대신 문자열 값을 그대로 하드코딩하게 만들 수 있음
    - 하드코딩한 문자열에 오타가 있어도 컴파일러는 확인할 수 없으니 런타임 버그가 생길 수 있음
    - 문자열 비교에 따른 성능 저하가 있을 수 있음

##### 열거 타입

> ```java
> public enum Apple { FUJI, PIPPIN, GRANNY_SMITH }
> public enum Orange { NAVEL, TEMPLE, BLOOD }
> ```
>
> - 자바의 열거 타입은 완전한 형태의 클래스라서 다른 언어의 열거 타입보다 훨씬 강력함
> - 열거 타입 자체는 클래스이며, 상수 하나당 자신의 인스턴스를 하나씩 만들어 public static final 필드로 공개
> - 열거 타입은 밖에서 접근할 수 있는 생성자를 제공하지 않으므로 사실상 final
> - 클라이언트가 인스턴스를 직접 생성하거나 확장할 수 없으니 열거 타입으로 만들어진 인스턴스들은 딱 하나씩만 존재함을 보장
> - 대부분의 열거 타입의 성능은 정수 상수와 별반 다르지 않아, 열거 타입을 메모리에 올리는 공간과 초기화하는 시간이 들긴 하지만 체감될 정도는 아님
> - 필요한 원소를 컴파일타임에 다 알 수 있는 상수 집합이라면 항상 열거 타입을 사용하라

- 컴파일 타임 안전성 제공
  - 열거 타입을 매개변수로 받는 메서드를 선언했다면, 해당 참조는 (null이 아니라면) 열거 값 중 하나임이 확실
  - 다른 타입의 값을 넘기려 하면 컴파일 오류 발생
- 각자의 이름 공간 존재
  - 이름이 같은 상수도 공존 가능
  - 열거 타입에 새로운 상수를 추가하거나 순서를 바꿔도 다시 컴파일하지 않아도 됨
  - 공개되는 것은 오직 필드의 이름(정수 열거 패턴과 달리 상수 값이 클라이언트로 컴파일되어 각인되지 않음)
- toString 메서드는 출력하기에 적합한 문자열을 반환
- 기타 장점
  - 임의의 메서드나 필드 추가 가능
  - 임의의 인터페이스 구현 가능
  - Object 메서드들을 높은 품질로 구현해둠
  - Comparable, Serializable 구현(직렬화 형태도 웬만큼 변형을 가해도 문젱벗이 동작하게끔 구현)

##### 열거 타입의 메서드/필드

```java
public enum Planet {

    MERCURY(3.302e+23, 2.439e6),
    EARTH(5.975e+24, 6.378e6);

    private final double mass;
    private final double radius;
    private final double surfaceGravity;

    private static final double G = 6.67300E-11;

    Planet(double mass, double radius) {
        this.mass = mass;
        this.radius = radius;
        this.surfaceGravity = G * mass;
    }

    public double mass() { return mass; }
    public double radius() { return radius; }
    public double surfaceGravity() { return surfaceGravity; }

    public double surfaceWeight(double mass) {
        return mass * surfaceGravity;
    }
}
```

- 열거 타입 상수 각각을 특정 데이터와 연결지으려면 생성자에서 데이터를 받아 인스턴스 필드에 저장하면 됨
- 열거 타입은 근본적으로 불변이라 모든 필드는 final이어야 함
- public 선언도 가능하지만, private으로 두고 별도의 public 접근자 메서드를 두는 것이 나음

- 제공 메서드

  -  values()

    ```java
    Planet.values();  // return Planet[] { MERCURY, EARTH }
    ```

    - 상수들의 값을 배열에 담아 반환하는 정적 메서드 values() 제공

  - valueOf()

    ```java
    Planet.valueOf("EARTH");  // Planet 타입의 EARTH 반환
    ```

    - 상수 이름을 입력 받아 그 이름에 해당하는 상수를 반환

  - toString() / *fromString()*

    ```java
    private static final Map<String, Operation> stringToEnum = Stream.of(values()).collect(toMap(Object::toString, e -> e));
    
    // 지정한 문자열에 해당하는 Operation을 (존재한다면) 반환한다.
    public static Optional<Operation> fromString(String symbol) {
        return Optional.ofNullable(stringToEnum.get(symbol));
    }
    ```

    - toString 메서드를 재정의하려거든, toString이 반환하는 문자열을 해당 열거 타입 상수로 변환해주는 fromString 메서드도 함께 제공하는 것을 고려하자

##### 열거 타입의 활용

- 열거 타입을 선언한 클래스 혹은 그 패키지에서만 유용한 기능은 private or package-private 메서드로 구현

- 널리 쓰이는 열거 타입은 톱레벨 클래스로 만들고, 특정 톱레벨 클래스에서만 쓰인다면 해당 클래스의 멤버 클래스로 만들어 사용

- 상수별 메서드 구현(constant-specific method implementation)

  ```java
  // bad
  public enum Operation {
      PLUS, MINUS, TIMES, DIVIDE;
  
      public double apply(double x, double y) {
          switch(this) {
              case PLUS: return x + y;
              case MINUS: return x - y;
              case TIMES: return x * y;
              case DIVIDE: return x / y;
          }
          throw new AssertionError("알 수 없는 연산" + this);
      }
  }
  
  // good
  public enum Operation {
      PLUS("+") {public double apply(double x, double y) {return x + y;}},
      MINUS("-") {public double apply(double x, double y) {return x - y;}},
      TIMES("*") {public double apply(double x, double y) {return x * y;}},
      DIVIDE("/") {public double apply(double x, double y) {return x / y;}}
      ;
  		
    	private final String symbol;
    
      Operation(String symbol) { this.symbol = symbol; }
      
      public abstract double apply(double x, double y);
  }
  ```

  - 각 상수별 클래스 몸체(constant-specific class body)에서 자신에 맞게 재정의 하는 방법
  - 상수별 메서드 구현을 상수별 데이터와 결합도 가능(생성자로 operation을 함께 넘김)

##### 열거 타입 활용 시 제한사항

- 열거 타입 상수는 생성자에서 자신의 인스턴스를 맵에 추가할 수 없음

  ```java
  private static final Map<String, String> myMap = new HashMap<>();
  
  Operation() {
      // It is illegal to access static member 'myMap' from enum constructor or instance initializer
      myMap.put("1", PLUS);
  }
  ```

  - 만약 허용되었다면 런타임에 NullPointerException 발생했을 것
  - 열거 타입의 정적 필드 중 열거 타입의 생성자에서 접근할 수 있는 것은 상수 변수 뿐
  - 열거 타입의 생성자가 실행되는 시점에는 정적 필드들이 아직 초기화되기 전이라, 자기 자신을 추가하지 못하게 하는 제약이 꼭 필요함

- 상수별 메서드 구현에는 열거 타입 상수끼리 코드를 공유하기 어렵다는 단점이 있음

  전략 열거 타입 패턴으로 해결

  ```java
  public enum PayrollDay {
  
      MONDAY(PayType.WEEKDAY),
      TUESDAY(PayType.WEEKDAY),
      WEDNESDAY(PayType.WEEKDAY),
      THURSDAY(PayType.WEEKDAY),
      FRIDAY(PayType.WEEKDAY),
      SATURDAY(PayType.WEEKEND),
      SUNDAY(PayType.WEEKEND);
  
      private final PayType payType;
  
      PayrollDay(PayType payType) {
          this.payType = payType;
      }
  
      // 전략 열거 타입
      enum PayType {
          WEEKDAY {
              int overtimePay(int minsWorked, int payRate) {
                  return minsWorked <= MINS_PER_SHIFT ? 0 : (minsWorked - MINS_PER_SHIFT) * payRate / 2;
              }
          },
          WEEKEND {
              int overtimePay(int minsWorked, int payRate) {
                  return minsWorked * payRate / 2;
              }
          };
  
          abstract int overtimePay(int minsWorked, int payRate);
          private static final int MINS_PER_SHIFT = 8 * 60;
  
          int pay(int minsWorked, int payRate) {
              int basePay = minsWorked * payRate;
              return basePay + overtimePay(minsWorked, payRate);
          }
      }
  }
  ```

  - 새로운 상수를 추가할 때 잔업수당 '전략'을 선택하도록 함

  - 잔업수당 계산을 private 중첩 열거 타입으로 옮기고, PayrollDay 열거 타입의 생성자에서 올바른 것을 선택

  - 이렇게 하면 PayrollDay 열거 타입은 잔업 수당 계산을 그 전략 열거 타입에 위임하여, switch 문이나 상수별 메서드 구현이 필요 없게 됨

  - 이 패턴은 switch 문보다 복잡하지만 더 안전하고 유연함

  - 사용

    ```java
    public static void main(String[] args) {
        PayrollDay monday = PayrollDay.MONDAY;
        int pay = monday.payType.pay(500, 4);  
    }
    ```

- switch 문을 쓰기에 좋은 예외

  - 기존 열거 타입에 상수별 동작을 혼합해 넣을 때는 좋을 수 있음

    ```java
    public static Operation inverse(Operation op) {
        switch(op) {
            case PLUS: return Operation.MINUS;
            case MINUS: return Operation.PLUS;
            case TIMES: return Operation.DIVIDE;
            case DIVIDE: return Operation.TIMES;
            
            default: throw new AssertionError("알 수 없는 연산: " + op);
        }
    }
    ```

    - 추가하려는 메서드가 의미상 열거 타입에 속하지 않는다면 직접 만든 열거 타입이라도 이 방식을 적용하는 것이 좋음
    - 종종 쓰이지만 열거 타입 안에 포함할만큼 유용하지 않은 경우에도 좋음

<br>

## ITEM 35. ordinal 메서드 대신 인스턴스 필드를 사용하라

##### ordinal() 메서드를 사용하는 잘못된 예

```java
//bad
public enum Ensemble {
    SOLO, DUET, TRIO, QUARTET, QUINTET,
    SEXTET, SEPTET, OCTET, NONET, DECTET;

    public int numberOfMusicians() {
        return ordinal() + 1;
    }
}
```

- ordinal() 메서드는 해당 상수가 열거 타입에서 몇 번째 위치인지를 반환
- 동작은 하지만 유지보수하기가 끔찍한 코드
- 이미 사용중이거나 값이 같은 상수는 추가할 방법이 없고, 값을 중간에 비워둘 수 없는 등 코드가 깔끔하지 못할 뿐 아니라 쓰이지 않는 값이 많아질수록 실용성이 떨어짐

##### 인스턴스 필드

```java
//good
public enum Ensemble {
    SOLO(1), DUET(2), TRIO(3), QUARTET(4), QUINTET(5),
    SEXTET(6), SEPTET(7), OCTET(8), DOUBLE_QUARTET(8),
    NONET(9), DECTET(10), TRIPLE_QUARTET(12);

    private final int numberOfMusicians;

    Ensemble(int size) {
        this.numberOfMusicians = size;
    }

    public int getNumberOfMusicians() {
        return numberOfMusicians;
    }
}
```

- 열거타입 상수에 연결된 값은 ordinal 메서드로 얻지 말고 인스턴스 필드에 저장하라
- Enum API document
  - 대부분의 프로그래머는 이 메서드를 쓸 일이 없다.
  - 이 메서드는 EnumSet과 EnumMap과 같이 열거 타입 기반의 범용 자료구조에 쓸 목적으로 설계되었다.

<br>

## ITEM 36. 비트 필드 대신 EnumSet을 사용하라

##### 비트 필드

```java
public class Text {
    public static final int STYLE_BOLD = 1 << 0;  //1
    public static final int STYLE_ITALIC = 1 << 1;  //2
    public static final int STYLE_UNDERLINE = 1 << 2;  //3
    public static final int STYLE_STRIKETHROUGH = 1 << 3;  //4
    
    //매개변수 styles는 0개 이상의 STYLE_ 상수를 비트별 OR한 값이다.
    public void applyStyles(int styles) { ... }
}
```

- 비트별 `OR`를 사용해 여러 상수를 하나의 집합으로 모을 수 있으며, 이렇게 만들어진 집합을 비트 필드(bit field)라 함

- `text.applyStyles(STYLE_BOLD | STYLE_ITALIC)`

  - 비트 필드를 사용하면 비트별 연산을 사용해 합집합과 교집합 같은 집합 연산을 효율적으로 수행 가능

- 비트 필드 사용 시 단점

  - 정수 열거 상수의 단점을 그대로 지님

  - 비트 필드 값이 그대로 출력되면 단순한 정수 열거 상수를 출력할 때보다 해석하기 훨씬 어려움

  - 비트 필드 하나에 녹아 있는 모든 원소를 순회하기도 까다로움

  - 최대 몇 비트가 필요한지를 API 작성 시 미리 예측하여 적절한 타입(보통은 int or long)을 선택해야 함

    (API를 수정하지 않고는 비트 수(32bit or 64bit)를 더 늘릴 수 없기 때문)

- 예외적으로, 정수 상수보다 열거 타입을 선호하는 프로그래머 중에도 상수 집합을 주고 받아야 할 때는 여전히 비트 필드를 사용하기도 함

##### EnumSet 클래스

```java
package java.util;

public abstract class EnumSet<E extends Enum<E>> extends AbstractSet<E>
    implements Cloneable, java.io.Serializable
{
    //... 
}
```

- EnumSet 클래스는 열거 타입 상수의 값으로 구성된 집합을 효과적으로 표현

- Set 인터페이스를 완벽히 구현, 타입 안전, 다른 Set 구현체와도 함께 사용 가능

- 내부적으로 비트 벡터로 구현되어, 원소가 64개 이하라면 EnumSet 전체를 long 변수 하나로 표현하여 비트 필드에 비견되는 성능을 보여줌

- removeAll, retainAll 같은 대량 작업은 (비트 필드를 사용할 때 쓰는 것과 같은) 비트를 효율적으로 처리할 수 있는 산술 연산을 써서 구현

- 비트를 직접 다룰 때 겪는 오류 등 난해한 작업은 EnumSet이 모두 처리

- 예시

  ```java
  public class Text {
      public enum Style { BOLD, ITALIC, UNDERLINE, STRIKETHROUGH }
      
      //어떤 Set을 넘겨도 되나, EnumSet이 가장 좋다.
      public void applyStyles(Set<Style> styles) { ... }
  }
  
  //text.applyStyles(EnumSet.of(Style.BOLD, Style.ITALIC));
  ```

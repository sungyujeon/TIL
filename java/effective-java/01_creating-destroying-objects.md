# 	객체 생성과 파괴

> [ITEM 01. 생성자 대신 정적 팩터리 메서드를 고려하라](#ITEM-01.-생성자-대신-정적-팩터리-메서드를-고려하라)
>
> [ITEM 02. 생성자에 매개변수가 많다면 빌더를 고려하라](#ITEM-02.-생성자에-매개변수가-많다면-빌더를-고려하라)
>
> [ITEM 03. private 생성자나 열거 타입으로 싱글턴임을 보증하라](#ITEM-03.-private-생성자나-열거-타입으로-싱글턴임을-보증하라)
>
> [ITEM 04. 인스턴스화를 막으려거든 private 생성자를 사용하라](#ITEM-04.-인스턴스화를-막으려거든-private-생성자를-사용하라)
>
> [ITEM 05. 자원을 직접 명시하지 말고 의존 객체 주입을 사용하라](#ITEM-05.-자원을-직접-명시하지-말고-의존-객체-주입을-사용하라)
>
> [ITEM 06. 불필요한 객체 생성을 피하라](#ITEM-06.-불필요한-객체-생성을-피하라)
>
> [ITEM 07. 다 쓴 객체 참조를 해제하라](#ITEM-07.-다-쓴-객체-참조를-해제하라)
>
> [ITEM 08. finalizer와 cleaner 사용을 피하라](#ITEM-08.-finalizer와-cleaner-사용을-피하라)
>
> [ITEM 09. try-finally 보다는 try-with-resources를 사용하라](#ITEM-09.-try-finally-보다는-try-with-resources를-사용하라)

<br>

<br>

## ITEM 01. 생성자 대신 정적 팩터리 메서드를 고려하라

> 클래스는 생성자와 별도로 정적 팩터리 메서드(static factory method)를 제공할 수 있음
>
> ```java
> public static Boolean valueOf(boolean b) {
>        return (b ? TRUE : FALSE);
> }
> ```

<br>

### 장점

> 정적 팩토리 메서드가 생성자보다 좋은 장점 다섯 가지

- 이름을 가질 수 있음

  - 생성자에 넘기는 매개변수와 생성자 자체만으로는 반환될 객체의 특성을 제대로 설명하지 못함

  - 반면 정적 팩토리는 이름만 잘 지으면 반환될 객체의 특성을 쉽게 묘사

  - 하나의 시그니처로는 하나의 생성자만 만들 수 있지만, 메서드명만 바꾸면 같은 시그니처로 만들 수 있음

  - 예시

    ```java
    // constructor
    new BigInteger(int, int, Random);
    
    // static factory method
    BigInteger.probablePrime(int, Random);
    ```

- 호출될 때마다 인스턴스를 새로 생성하지 않아도 됨

  - 불변 클래스(immutable class)는 인스턴스를 미리 만들어 놓거나 새로 생성한 인스턴스를 캐싱하여 재활용하는 식으로 불필요한 객체 생성을 피할 수 있음

  - (특히 생성 비용이 큰) 같은 객체가 자주 요청되는 상황이라면 성능을 상당히 끌어올림

    (Flyweight pattern도 이와 비슷)

  - 인스턴스를 살아있게 할 수 있을지 통제 가능(instance-controlled)

    - 클래스를 싱글턴(singleton) 또는 인스턴스화 불가(noninstantiable)로 만들 수 있음

    - 불변값 클래스에서 동치인 인스턴스가 단 하나뿐임을 보장 할 수 있음

      (a == b 일 때만 a.equals(b) 성립)

    - 인스턴스 통제는 Flyweight pattern의 근간이 되며, 열거 타입은 인스턴스가 하나만 만들어짐을 보장

- 반환 타입의 하위 타입 객체를 반환할 수 있음

  - 반환할 객체의 클래스를 자유롭게 선택할 수 있게 하는 '엄청난 유연성' 제공
  - API를 반환할 때 이를 응용하면 구현 클래스를 공개하지 않고 그 객체를 반환할 수 있어 API를 작게 유지 가능 -> 인터페이스를 정적 팩터리 메서드의 반환 타입으로 사용하는 인터페이스 기반 프레임워크의 핵심 기술

- 입력 매개변수에 따라 매번 다른 클래스의 객체를 반환할 수 있음

  - 반환 타입의 하위 타입이기만 하면 어떤 클래스의 객체를 반환해도 상관 없음

  - 예시

    ```java
    public static <E extends Enum<E>> EnumSet<E> noneOf(Class<E> elementType) {
        Enum<?>[] universe = getUniverse(elementType);
        if (universe == null)
            throw new ClassCastException(elementType + " not an enum");
    
        if (universe.length <= 64)
            return new RegularEnumSet<>(elementType, universe);
        else
            return new JumboEnumSet<>(elementType, universe);
    }
    ```

    - EnumSet 클래스는 public 생성자 없이 정적 팩터리만 제공
    - 원소가 64개 이하면 RegularEnumSet의 인스턴스를, 아니면 JumboEnumSet의 인스턴스 반환
    - 클라이언트는 이 두 클래스의 존재를 모름(클라이언트는 팩토리가 건네주는 객체가 어느 클래스의 인스턴스인지 알 수도, 알 필요도 없음)

- 정적 팩토리 메서드를 작성하는 시점에는 반환할 객체의 클래스가 존재하지 않아도 됨

  - 이런 유연함은 서비스 제공자 프레임워크(service provider framework)를 만드는 근간이 됨
  - 3개의 핵심 프레임워크로 이뤄짐(대표적으로 *JDBC*)
    - service interface: 구현체의 동작을 정의 *Connection*
    - provider registration API: 제공자가 구현체를 등록할 때 사용 *DriverManager.registerDriver*
    - service access API: 클라이언트가 서비스의 인스턴스를 얻을 때 사용 *DriverManager.getConnection*
    - +@ service provider interface: 서비스 인터페이스의 인스턴스를 생성하는 팩토리 객체 설명 *Driver*

<br>

### 단점

- 상속을 하려면 *public*이나 *protected* 생성자가 필요하니 정적 팩토리 메서드만 제공하면 하위 클래스를 만들 수 없음
  - 상속 보다 컴포지션을 사용하도록 유도
  - 불변 타입을 만들려면 이 제약을 지켜야 함
  - 위 두가지 속성이 장점일 수도 있음
-  프로그래머가 찾기 어려움
  - 정적 팩토리 메서드 방식 클래스를 인스턴스화할 방법을 직접 프로그래머가 알아내야 함

<br>

### 사용 예시

- `from`
  - 매개변수를 하나 받아서 해당 타입의 인스턴스를 반환하는 형변환 메서드 
  - Date d = Date.from(instant);
- `of`
  - 여러 매개변수를 받아 적합한 타입의 인스턴스를 반환하는 집계 메서드
  - Set\<Rank> faceCards = EnumSet.of(JACK, QUEEN, KING);
- `valueOf`
  - from과 of의 더 자세한 버전
  - BigInteger prime = BigInteger.valueOf(Integer.MAX_VALUE);
- `instance or getInstance`
  - (매개변수를 받는다면) 매개변수로 명시한 인스턴스를 반환하지만, 같은 인스턴스임을 보장하지 않음
  - StackWalker luke = StackWalker.getInstance(options);
- `create or newInstance`
  - instance 또는 getInstance와 같지만, 매번 새로운 인서튼스를 생성해 반환함을 보장
  - Object newArray = Array.newInstance(classObject, arrayLen);
- `getType`
  - getInstance와 같으나, 생성할 클래스가 아닌 다른 클래스에 팩터리 메서드를 정의할 때 쓰임
  - *Type*은 팩토리 메서드가 반환할 객체의 타입
  - FileStore fs = Files.getFileStore(path);
- `newType`
  - newInstance와 같으나 생성할 클래스가 아닌 다른 클래스에 팩토리 메서드를 정의할 때 쓰임
  - *Type*은 팩토리 메서드가 반환할 객체의 타입
  - BufferedReader br = Files.newBufferedReader(path);
- `type`
  - getType과 newType의 간결한 버전
  - List\<Compaint> litany = Collections.list(legacyLitany);

<br>

<br>

## ITEM 02. 생성자에 매개변수가 많다면 빌더를 고려하라

#### builder가 없다면?

- 정적 팩토리와 생성자가 동일하게 갖고 있는 제약

  - 선택적 매개변수가 많을 때 적절히 대응하기 어려움

- 점층적 생성자 패턴(telescoping consturctor pattern)

  - 필수 매개변수만 받는 생성자, 필수 매개변수와 선택 매개변수 n개를 받는 생성자

  - 예시

    ```java
    public class NutritionFacts {
        private final int servingSize;
        private final int servings;
        private final int calories;
        private final int fat;
        //...
    
        public NutritionFacts(int servingSize, int servings) {
            this(servingSize, servings, 0);
        }
    
        public NutritionFacts(int servingSize, int servings, int calories) {
            this(servingSize, servings, calories, 0);
        }
    
        public NutritionFacts(int servingSize, int servings, int calories, int fat) {
            this.servingSize = servingSize;
            this.servings = servings;
            this.calories = calories;
            this.fat = fat;
        }
    }
    ```

    - 인스턴스 생성 시 원하는 매개변수를 포함하는 생성자 중 가장 짧은 것을 골라 호출하면 됨
    - 단점
      - 설정하길 원하지 않는 매개변수까지 포함할 수 있음
      - 매개변수 개수가 많아지면 클라이언트 코드를 작성하거나 읽기 어려움

- 자바빈즈 패턴(JavaBeans pattern)

  - 매개변수가 없는 생성자를 객체로 만든 후, setter 메서들을 호출해 매개변수 값 설정

  - 예시

    ```java
    public class NutritionFacts {
        // 매개변수들은 (기본값이 있다면) 기본값으로 초기화
        private int servingSize = -1;  // 필수; 기본값 없음
        private int servings = -1;     // 필수; 기본값 없음
        private int calories = 0;
    
        public NutritionFacts() {}
        
        public void setServingSize(int val) { servingSize = val; }
        public void setServings(int val) { servings = val; }
        public void setCalories(int val) { calories = val; }
    }
    
    NutritionFacts cocaCola = new NutritionFacts();
    cocaCola.setServingSize(240);
    cocaCola.setServings(8);
    cocaCola.setCalories(100);
    ```

    - 단점
      - 객체 하나를 만드려면 메서드를 여러 개 호출해야 함
      - 객체가 완전히 생성되기 전까지는 일관성(consistency)이 무너진 상태에 놓임
      - 클래스를 불변 아이템으로 만들 수 없음
      - 스레드 안전성을 얻으려면 프로그래머가 추가 작업을 해줘야 함
    - 단점 완화를 위해 freezing 하기도 하지만 실전에서는 거의 안 씀(freeze 메서드를 확실히 호출해줬는지를 컴파일러가 보증할 방법이 없어 런타임 오류에 취약)

<br>

### Builder pattern

> *Builder는 생성할 클래스 안에 정적 멤버 클래스로 만드는게 보통*
>
> - 클라이언트는 필요한 객체를 직접 만드는 대신, 필수 매개변수만으로 생성자(혹은 정적 팩토리)를 호출해 빌더 객체를 얻음
>
> - 이후 빌더 객체가 제공하는 일종의 세터 메서드로 원하는 선택 매개변수를 설정
>
> - 마지막으로 매개변수 없는 build 메서드 호출해 필요한 (보통은 불변인) 객체 얻음

```java
public class NutritionFacts {

    private final int servingSize;
    private final int servings;
    private final int calories;

    private NutritionFacts(Builder builder) {
        servingSize = builder.servingSize;
        servings = builder.servings;
        calories = builder.calories;
    }

    private static class Builder {
        // 필수 매개변수
        private final int servingSize;
        private final int servings;

        // 선택 매개변수 - 기본값으로 초기화
        private int calories = 0;

        public Builder(int servingSize, int servings) {
            this.servingSize = servingSize;
            this.servings = servings;
        }

        public Builder calories(int val) {
            calories = val;
            return this;
        }

        public NutritionFacts build() {
            return new NutritionFacts(this);
        }
    }
}

NutritionFacts nutritionFacts = new NutritionFacts.Builder(240, 8)
  																								.calories(100)
  																								.build();
```

- NutritionFacts 클래스는 불변이며 모든 매개변수의 기본값들을 한 곳에 모아둠
- 빌더의 세터 메서드들은 빌더 자신을 반환하므로 연쇄적으로 호출 가능(fluent API or method chaining)

<br>

### 장점

- 파이썬/스칼라의 명명된 선택적 매개변수(named optional parameters)를 흉내낸 것

- 계층적으로 설계된 클래스와 함께 쓰기에 유용 [참고](https://github.com/sungyujeon/effective-java/blob/sungyu/src/main/java/com/effectiveJava/chapter01/item02/builder/hierarchical/Pizza.java)

  - Pizza.Builder는 재귀적 타입 한정을 이용한 제네릭 타입

  - 추상 메서드인 self()를 더해 하위 클래스에서 형변환하지 않고도 메서드 연쇄를 지원

  - 공변 반환 타이핑(covariant return typing) : 하위 클래스의 메서드가 상위 클래스의 메서드가 정의한 반환 타입이 아닌, 그 하위 타입을 반환하는 기능

    <b>>> 클라이언트가 형변환에 신경쓰지 않고 빌더를 사용할 수 있음</b>

- 가변인수(varargs) 매개변수를 여러 개 사용할 수 있음

<br>

### 단점

- 객체를 만드려면 그에 앞서 빌더부터 만들어야 함(빌더 생성 비용이 크지는 않지만 성능에 민감한 상황에서는 문제가 될 수 있음)

- 점층적 생성자 패턴보다는 코드가 장황해서 매개변수가 4개 이상은 되어야 값어치를 함

  (하지만 API는 시간이 지날수록 매개변수가 많아지는 경향이 있음)

<br>

### 주의사항

- 불변식(invariant)을 보장하려면 빌더로부터 매개변수를 복사한 후 해당 객체 필드들도 검사해야 함

- 검사해서 잘못된 점 발견하면 어떤 매개변수가 잘못되었는지를 자세히 알려주는 `IllegalArgumentException`을 던지면 됨

  *불변식 : 프로그램이 실행되는 동안 반드시 만족해야 하는 조건, 주어진 조건 내에서만 변경을 허용*

<br>

<br>

## ITEM 03. private 생성자나 열거 타입으로 싱글턴임을 보증하라

> Singleton [참고](https://github.com/sungyujeon/TIL/blob/master/spring/spring-singleton.md)
>
> - 인스턴스를 오직 하나만 생성할 수 있는 클래스
> - 예 : 함수와 같은 stateless 객체, 설계상 유일해야 하는 시스템 컴포넌트 등

### 싱글턴을 만드는 방법 3가지

- public static 멤버가 final

  ```java
  public class Elvis {
    
      public static final Elvis INSTANCE = new Elvis();
      
      private Elvis() {}
  }
  ```

  - private 생성자는 public static field인 Elvis.INSTANCE를 초기화할 때 한 번만 호출됨

  - 예외적으로 reflection API AccessibleObject.setAccessible 사용해 private 생성자 호출 가능

    (이를 막으려면 생성자 수정하여 두번째 객체 생성 시 예외 throw)

  - 장점

    - 해당 클래스가 싱글턴임이 API에 명확히 드러남
    - 간결함

  - 단점

    - 싱글턴이 아니게 변경 불가능

- static factory method

  ```java
  public class Elvis {
      private static final Elvis INSTANCE = new Elvis();
  
      private Elvis() {}
      
      private static Elvis getInstance() {
          return INSTANCE;
      }
  }
  ```

  - Elvis.getInstance는 항상 같은 객체의 참조를 반환

  - reflection API 예외 위와 동일

  - 장점

    - 코드가 변경될 때 API를 바꾸지 않고 싱글턴이 아니게 변경할 수 있음

    - 정적 팩토리를 제네릭 싱글턴으로 만들 수 있음(아이템 30)

    - 정적 펙토리의 메서드 참조를 공급자(supplier)로 사용(아이템 43, 44)

      ```java
      public class Concert {
      
          public void start(Supplier<Singer> singerSupplier) {
              Singer singer = singerSupplier.get();
              singer.sing();
          }
      
          public static void main(String[] args) {
              Concert concert = new Concert();
              concert.start(Elvis::getInstance);
          }
      }
      ```

- 원소가 하나인 열거 타입 선언

  ```java
  public enum Elvis {
      INSTANCE;
  }
  ```

  - 장점

    - public field 방식과 비슷하지만 더 간결하고 추가 노력 없이 직렬화 가능
    - 심지어 아주 복잡한 직렬화 상황이나 리플렉션 공격에도 제2의 인스턴스 생기지 않음
    - 대부분의 상황에서 원소가 하나뿐인 열거 타입이 싱글턴을 만드는 가장 좋은 방법

  - 단점

    - 만들려는 싱글턴이 Enum 외의 클래스를 상속해야 한다면 사용 불가능

      (단, 열거 타입이 다른 인터페이스를 구현하도록 선언할 수는 있음)

<br>

### 단점

- 클래스를 싱글턴으로 만들면 이를 사용하는 클라이언트를 테스트하기가 어려워짐

  (타입을 인터페이스로 정의한 다음 그 인터페이스를 구현해서 만든 싱글턴이 아니라면 싱글턴 인스턴스를 가짜(mock) 구현으로 대체할 수 없기 때문)

- 싱글턴 클래스를 직렬화하려면 추가 작업을 해야 함

  - 단순히 Serializable 구현 선언으로 부족

  - 모든 인스턴스 필드를 일시적(transient)로 선언하고 readResolve 메서드 제공해야 함(아이템 89)

  - 이렇게 하지 않으면 직렬화된 인스턴스를 역직렬화할 때마다 새로운 인스턴스 생성

    ```java
    public class Elvis {
        private static final Elvis INSTANCE = new Elvis();
    
        private Elvis() {}
    
        private static Elvis getInstance() {
            return INSTANCE;
        }
      
        private Object readResolve() {
            // '진짜' Elvis를 반환하고, 가짜 Elvis는 가비지 컬렉터에 맡김
            return INSTANCE;
        }
    }
    ```

<br>

<br>

## ITEM 04. 인스턴스화를 막으려거든 private 생성자를 사용하라

```java
public class UtilityClass {
    // 기본 생성자가 만들어지는 것을 막는다(인스턴스화 방지용).
    private UtilityClass() {
        throw new AssertionError();
    }
}
```

- 인스턴스를 만들기 위한 클래스가 아닌 경우

- 예) 정적 메서드와 정적 필드만을 담은 클래스(utility class)

  - 기본 타입 값이나 배열 관련 메서드들을 모아놓은 클래스 java.lang.Math / java.util.Arrays

  - 특정 인터페이스를 구현하는 객체를 생성해주는 정적 메서드(혹은 팩터리) java.util.Collections

  - final 클래스

- 참고사항

  - 추상 클래스로 인스턴스화 막을 수 없음

    - 하위 클래스를 만들어 인스턴스화 할 수 있기 때문

    - 추상 클래스를 본 사용자가 상속해서 쓰라는 뜻으로 오해할 수 있어 더 큰 문제

  - 상속을 불가능하게 함

    - 모든 생성자는 상위 클래스의 생성자를 호출하므로 private 생성자 사용 시 상속 불가능

<br>

<br>

## ITEM 05. 자원을 직접 명시하지 말고 의존 객체 주입을 사용하라

### SpellChecker 예시

- bad example

  ```java
  // bad
  // 정적 유틸리티를 잘못 사용한 예
  public class SpellChecker {  // static final 이용 
      private static final Lexicon dictionary = ...;
      
      private SpellChecker() {}
      
      public static boolean isValid(String word) { ... }
      public static List<String> suggestions(String typo) { ... }
  }
  
  public class SpellChecker {  // 정적 팩토리 이용
      private static final Lexicon dictionary = ...;
  
      private SpellChecker() {}
      public static SpellChecker INSTANCE = new SpellChecker();
  
      public static boolean isValid(String word) { ... }
      public static List<String> suggestions(String typo) { ... }
  }
  ```

  - SpellChecker는 dictionary에 의존하는데, 두 방식 모두 사전을 단 하나만 사용한다고 가정한다는 점에서 확장성이 없음

- good example(의존 객체 주입)

  ```java
  public class SpellChecker {
      
      private final Lexicon dictionary;
      
      public SpellChecker(Lexicon dictionary) {
          this.dictionary = Objects.requireNonNull(dictionary);
      }
      
      public boolean isValid(String word) { ... }
      public List<String> suggestion(String typo) { ... }
  }
  ```

  - SpellChecker가 여러 dictionary 사용할 수 있도록 구성

<br>

### 장점

- 위 예시처럼 dictionary라는 딱 하나의 자원만 사용하지만, 자원이 몇 개든 의존 관계가 어떻든 상관없이 잘 작동

- 불변 보장하여 (같은 자원을 사용하려는) 여러 클라이언트가 의존 객체들을 안심하고 공유 가능
- 유연성과 테스트 용이성 개선
- 생성자, 정적 팩토리, 빌더 모두에 똑같이 응용 가능

- 예시: 생성자에 자원 팩토리를 넘겨주는 방식

  - Factory Method pattern -> Supplier\<T> 인터페이스

  - Supplier\<T>를 입력으로 받는 메서드는 일반적으로 한정적 와일드카드 타입(bounded wildcard type, 아이템 31)을 사용해 팩토리의 타입 매개변수를 제한해야 함

  - 이를 통해 자신이 명시한 타입의 하위 타입이라면 무엇이든 생성할 수 있는 팩토리 넘길 수 있음

  - 클라이언트가 제공한 팩토리가 생성한 Tile들로 구성된 Mosaic 만드는 메서드

    ```java
    Mosaic create(Supplier<? extends Tile> tileFactory) { ... }
    ```

<br>

### 단점

- 의존성이 너무 많으면(가령 수 천개) 코드를 어지럽게 만들기도 함

  (Spring 같은 의존 객체 주입 프레임워크 사용하면 어지러움 개선 가능)

<br>

<br>

## ITEM 06. 불필요한 객체 생성을 피하라

> 똑같은 기능을 매번 생성하는 것 보다는 객체 하나를 재사용하는 것이 나을 때가 많음
>
> 특히 불변 객체는 언제든 재사용 가능

- 예시1

  ```java
  // bad
  String s = new String("hi");
  Boolean(value);
  
  // good
  String s = "hi";
  Boolean.valueOf(value);
  ```

  - bad 코드는 실행될 때마다 인스턴스를 새로 만듦

  - good 코드는 새로운 인스턴스를 매번 새로 만드는 대신 하나의 인스턴스를 사용하고, 같은 가상 머신 안에서 모든 코드가 같은 객체를 재사용함이 보장됨

  - 불변 객체 뿐만이 아니라 가변 객체도 변경되지 않을 것임이 보장된다면 재사용 가능

- 예시2

  ```java
  // bad
  static boolean isRomanNumeral(String s) {
      return s.matches("^(?=.)M*(C[MD]|D?C{0,3})(X[CL]|L?X{0,3})(I[XV]|V?I{0,3})$");
  }
  
  // good
  class RomanNumerals {
      private static final Pattern ROMAN = Pattern.compile("^(?=.)M*(C[MD]|D?C{0,3})(X[CL]|L?X{0,3})(I[XV]|V?I{0,3})$");
      
      static boolean isRomanNumeral(String s) {
          return ROMAN.matcher(s).matches();
      }
  }
  ```

  - bad
    - String.matches() 메서드는 정규표현식으로 문자열 형태를 확인하는 가장 쉬운 방법이지만, 성능이 중요한 상황에서 반복해 사용하기엔 적합하지 않음
    - matches() 메서드가 내부에서 만드는 정규표현식용 Pattern 인스턴스는 곧바로 gc 대상이 됨
    - Pattern은 입력받은 정규표현식에 해당하는 유한 상태 머신(finite state machine)을 만들기 때문에 인스턴스 생성 비용이 높음
  - good
    - isRomanNumeral이 빈번히 호출되는 상황에서 성능을 상당히 끌어올릴 수 있음
    - 다만 isRomanNumeral 클래스가 초기화 후 한 번도 호출되지 않는다면 쓸데없이 초기화한 것이지만, 지연 초기화(lazy initialization)로 개선해도 성능은 크게 나아지지 않을 때가 많음

- 예시3

  - Adapter
  - Map 인터페이스의 keySet 메서드

- 예시4

  - 오토박싱(auto boxing)은 불필요한 객체를 생성해 성능을 떨어뜨릴 수 있음
  - 박싱된 기본 타입 보다는 기본 타입을 사용하고, 의도치 않은 오토박싱이 숨어들지 않도록 주의

- 예시5

  - 아주 무거운 객체가 아니라면 단순히 객체 생성을 피하고자 자신만의 객체 풀(pool)을 만들면 안됨
  - 자체 객체 풀은 코드를 헷갈리게 하고, 메모리 사용량을 늘리고 성능을 떨어뜨림

- 예외

  - 최신 JVM은 성능이 좋으므로 프로그램의 명확성, 간결성, 기능을 위해서는 객체를 추가 생성하는 것은 일반적으로 좋은 일

<br>

<br>

## ITEM 07. 다 쓴 객체 참조를 해제하라

- 예시1

  ```java
  public class Stack {
      private Object[] elements;
      private int size = 0;
      private static final int DEFAULT_INITIAL_CAPACITY = 16;
  
      public Stack() {
          elements = new Object[DEFAULT_INITIAL_CAPACITY];
      }
  
      public void push(Object e) {
          ensureCapacity();
          elements[size++] = e;
      }
  
      public Object pop() {
          if (size == 0) {
              throw new EmptyStackException();
          }
          return elements[--size];  // 메모리 누수의 원인
      }
  
      private void ensureCapacity() {
          if (elements.length == size) {
              elements = Arrays.copyOf(elements, 2 * size - 1);
          }
      }
  }
  ```

  - 위 Stack을 계속 사용하면 gc와 메모리 사용량이 늘어나 성능이 저하됨

  - gc는 객체 뿐 아니라 그 객체가 참조하는 모든 객체를 회수하지 못함

  - 참조 해제의 가장 좋은 방법은 유효 범위(scope) 밖으로 밀어내는 것

  - 해결을 위해 해당 참조를 다 쓰면 null 할당(참조 해제)

    ```java
    // 위 예시에서 메모리 누수 방지
    public Object pop() {
        if (size == 0) {
            throw new EmptyStackException();
        }
        Object result = elements[--size];  // 메모리 누수의 원인
        elements[size] = null;    // 참조 해제
        return result;
    }
    ```

    - 이 방법은 또한 NullPointerException을 통해 null 접근에 대한 오류를 잡아냄

    - 다만 객체 참조를 null 처리하는 일은 예외적인 경우이어야 함

      (Stack 처럼 자기 메모리를 직접 관리하는 클래스에서 메모리 누수에 주의해야 함)

- 예시2

  - cache는 메모리 누수를 일으킬 수 있음

  - key를 참조하는 동안에만 엔트리가 살아 있는 캐시가 필요한 상황이라면 WeakHashMap을 사용해 캐싱하라

  - 시간이 지날수록 엔트리의 가치를 떨어뜨리는 방식을 사용하라

    - 백그라운드 스레드 활용(e.g. Scheduled ThreadPoolExcutor)

    - 캐시에 새 엔트리를 추가할 때 부수 작업 수행

      (e.g. LinkedhashMap은 removeEldestEntry 메서드 활용)

  - 더 복잡한 캐시를 만들고 싶다면 java.lang.ref 패키지 직접 활용

- 예시3

  - listener / callback 은 메모리 누수를 일으킬 수 있음
  - 클라이언트가 콜백을 등록만 하고 명확히 해지하지 않으면 콜백은 계속 쌓임
  - 콜백을 약한 참조(weak reference)로 저장하면 gc가 즉시 수거

<br>

<br>

## ITEM 08. finalizer와 cleaner 사용을 피하라

> 자바가 제공하는 두 가지 객체 소멸자 - finalizer, cleaner
>
> - finalizer는 자바 9에서 deprecated
> - cleaner는 finalizer 보다 덜 위험하지만 여전히 예측할 수 없고 느리고 일반적으로 불필요

<br>

### 사용을 피하는 이유

- finalizer와 cleaner가 즉시 수행된다는 보장이 없음
  - 파일 닫기를 finalizer, cleaner에 맡기면 중대한 오류를 일으킬 수 있음
  - finalizer, cleaner를 얼마나 신속히 수행할지는 전적으로 gc 알고리즘에 달림
  - finalizer 스레드는 다른 애플리케이션 스레드보다 우선순위가 낮음. cleaner는 자신을 수행할 스레드를 제어할 수 있긴 하지만 여전히 백그라운드에서 수행되어 gc의 통제를 받음

- 수행 시점 뿐 아니라 수행 여부도 보장하지 않음
  - 상태를 영구적으로 수정하는 작업(e.g. db lock 해제 등)을 finalizer, cleaner에 의존하면 안됨
  - System.gc, System.runFinalization 메서드도 실행 여부를 보장하진 않음

- finalizer 동작 중 발생한 예외는 무시되고, 처리할 작업이 남았더라도 그 순간 종료
  - catch 되지 않은 예외 때문에 해당 객체가 남을 수 있고, 다른 스레드가 이처럼 훼손된 객체를 사용하려하면 동작을 예측할 수 없음
  - 보통은 잡지 못한 예외가 스레드를 주앋ㄴ시키고 스택 추적 내역을 출력하지만, finalizer는 경고조차 출력하지 않음
  - cleaner는 자신의 스레드를 통제하므로 이러한 문제는 발생하지 않음

- 성능을 저하시킴
  - finalizer가 gc의 효율을 떨어뜨림
  - 안전망 방식에서는 빠르지만, 이를 추가 구현해야 함

- finalizer 공격에 노출되어 심각한 보안 문제 일으킴
  - 생성자나 직렬화 과정(readObject, readResolve)에서 예외 발생하면 생성되다 만 객체에서 악의적인 하위클래스의 finalizer가 수행될 수 있음
  - 이 finalizer는 정적 필드에 자신의 참조를 할당하여 gc가 수집하지 못하게 막을 수 있음
  - final 클래스는 하위 클래스를 만들 수 없어서 안전하지만, final이 아닌 클래스를 finalizer 공격으로부터 방어하려면 아무 일도 하지 않는 finalize() 메서드를 만들고 final 선언해야 함


<br>

### finalize, cleaner의 대안

- 파일이나 스레드 등 종료해야 할 자원을 담고 있는 객체의 클래스에서 AutoCloseable 구현 후 close() 메서드 호출
- 예외가 발생해도 제대로 종료되도록 try-with-resources 사용

<br>

### finalizer, cleaner를 사용하는 경우

- 자원의 소유자가 close 메서드를 호출하지 않는 것에 대비한 안전망 역할

  - 클라이언트가 하지 않은 자원 회수를 늦게라도 해주는 것이 아예 안 하는 것보다는 낫다

  - 일부 클래스는 안전망 역할의 finalizer 제공: FileInputStream, FileOutputStrema, threadPoolExecutor

- native peer와 연결된 객체에서의 사용

  - native peer는 일반 자바 객체가 네이티브 메서드를 통해 기능을 위임한 네이티브 객체
  - native peer는 자바 객체가 아니므로 gc가 모름
  - 단, 성능 저하를 감당할 수 있고 native peer가 심각한 자원을 가지고 있지 않을 때에만 해당

- cleaner의 사용(try-with-resources를 사용하라)

  - (Room, State 사례 생략)

  - try-with-resources 사용

    ```java
    try (Room myRoom = new Room(7)) {
        // do something
    }
    ```

<br>

<br>

## ITEM 09. try-finally 보다는 try-with-resources를 사용하라

> java library에는 close 메서드를 호출해 직접 닫아줘야 하는 자원이 많음
>
> (InputStream, OutputStream, java.sql.Connection 등)
>
> - 자원 닫기는 클라이언트가 놓치기 쉬워서 예측할 수 없는 성능 문제로 이어지기도 함
> - 안전망으로 finalizer 활용하고는 있지만 자원 해제를 보장하지 않음

- try-finally

  ```java
  // bad (전통적 자원 해제 방법)
  static String firstLineOfFile(String path) throws IOException {
      BufferedReader br = new BufferedReader(new FileReader(path));
      try {
          return br.readLine();
      } finally {
          br.close();
      }
  } 
  // 2개 이상에서는 너무 지저분함
  static void copy(String src, String dst) throws IOExcpetion {
      InputStream in = new FileInputStream(src);
      try {
          OutputStream out = new FileOutputStream(dst);
          try {
              byte[] buf = new byte[BUFFER_SIZE];
              int n;
              while ((n = in.read(buf)) >= 0) {
                  out.write(buf, 0, n);
              }
          } finally {
              out.close();
          }
      } finally {
          in.close();
      }
  }
  ```

  - close 메서드를 제대로 구현한 비율은 낮음

  - try-finally 문이 중첩되면, 연쇄된 예외 처리가 복잡해짐

- try-with-resources(since jdk 1.7)

  ```java
  // good
  static String firstLineOfFile(String path) throws IOException {
      try (BufferedReader br = new BufferedReader(new FileReader(path))) {
          return br.readLine();
      }
  }
  
  static void copy(String src, String dst) throws IOExcpetion {
      try (InputStream in = new FileInputStream(src);
           OutputStream out = new FileOutputStream(dst)) {
          byte[] buf = new byte[BUFFER_SIZE];
          int n;
          while ((n = in.read(buf)) >= 0) {
              out.write(buf, 0, n);
          }
      }
  }
  ```

  - 이 구조를 사용하려면 해당 자원이 AutoCloseable 인터페이스를 구현해야 함
  - 자바 라이브러리와 서드파티 라이브러리들은 이미 AutoCloseable을 구현하거나 확장해 둠

[위로](#객체-생성과-파괴)

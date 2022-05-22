# 객체 생성과 파괴

> [ITEM 01. 생성자 대신 정적 팩터리 메서드를 고려하라](#ITEM-01.-생성자-대신-정적-팩터리-메서드를-고려하라)



## ITEM 01. 생성자 대신 정적 팩터리 메서드를 고려하라

> 클래스는 생성자와 별도로 정적 팩터리 메서드(static factory method)를 제공할 수 있음
>
> ```java
> public static Boolean valueOf(boolean b) {
>     return (b ? TRUE : FALSE);
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
    BingInteger.probablePrime(int, Random);
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






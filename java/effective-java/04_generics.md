# 제네릭

> [ITEM 26. RAW 타입은 사용하지 말라](#ITEM-26.-RAW-타입은-사용하지-말라)
>
> [ITEM 27. 비검사 경고를 제거하라](#ITEM-27.-비검사-경고를-제거하라)

- 제네릭(generic)은 자바 5부터 사용(제네릭 지원 전에는 컬렉션에서 객체를 꺼낼 때마다 형변환 해야 했음)
- 제네릭을 사용하면 컬렉션이 담을 수 있는 타입을 컴파일러에 알려주게 됨
- 그래서 컴파일러는 알아서 형변환 코드를 추가할 수 있고, 엉뚱한 타입의 객체를 넣으려는 시도를 컴파일 과정에서 차단하여 더 안전하고 명확한 프로그램을 만들어줌
- 꼭 컬렉션이 아니더라도 이러한 이점을 누릴 수 있으나, 코드가 복잡해진다는 단점이 따라오는데, 이번 장에서는 제네릭의 이점을 최대로 살리고 단점을 최소하하는 방법을 이야기함

<br>

## ITEM 26. RAW 타입은 사용하지 말라

> - 클래스와 인터페이스 선언에 타입 매개변수(type parameter)가 쓰이면 이를 제네릭 클래스 혹은 제네릭 인터페이스라 함
> - 예컨데 List 인터페이스는 원소의 타입을 나타내는 타입 매개변수 E를 받음
> - 그래서 이 인터페이스의 완전한 이름은 List\<E>지만, 짧게 List라고도 자주 씀
> - 제네릭 클래스와 제네릭 인터페이스를 통틀어 **제네릭 타입(generic type)**이라 함

##### generics

- 각각의 제네릭 타입은 일련의 매개변수화 타입(parameterized type)을 정의
- 먼저 클래스(혹은 인터페이스) 이름이 나오고, 이어서 꺽쇠괄호 안에 실제 타입 매개변수들을 나열
  - List\<String>은 원소의 타입이 String인 리스트를 뜻하는 매개변수화 타입
  - String이 정규(formal) 타입 매개변수 E에 해당하는 실제(actual) 타입 매개변수

##### raw type

- 제네릭 타입을 하나 정의하면 그에 딸린 로 타입(raw type)도 함께 정의됨

  - raw type: 제네릭 타입에서 타입 매개변수를 전혀 사용하지 않을 때를 말함(e.g. List\<E>의 로 타입은 List)

- 로 타입은 타입 선언에서 제네릭 타입 정보가 전부 지워진 것처럼 동작하는데, 제네릭이 도입되기 전 코드와 호환되도록 하기 위한 궁여지책

  ```java
  // Stamp 인스턴스만 취급한다.
  private final Collection stamps = ...;
  
  // runtime 시점에 캐스팅 되지 않는 ClassCastException 발생
  for (Iterator i = stamps.iterator(); i.hasNext();) {
      Stamp stamp = (Stamp) i.next();  // ClassCastException
      stamp.cancel();
  }
  ```

  - 컬렉션의 로 타입으로 사용해선 안됨
  - 오류는 가능한 한 발생 즉시, 이상적으로는 컴파일 시점에 발견하는 것이 좋음
  - 위 오류 예시에서는 런타임에 문제가 발생하고, 'Stamp 인스턴스만 취급한다'는 주석도 컴파일러가 이해하지 못하므로 별 도움이 되지 않음

##### generic 활용

```java
private final Collection<Stamp> stamps = ...;
```

- 컴파일러는 stamps에 Stamp의 인스턴스만을 넣어야 함을 인지
  - 아무런 경고 없이 컴파일된다면 의도대로 동작할 것임을 보장(다만 컴파일 경고를 숨기지 않았어야 함)

- 컴파일러는 컬렉션에서 원소를 꺼내는 모든 곳에 보이지 않는 형변환을 추가하여 절대 실패하지 않을 것임을 보장

- raw type은 절대 사용하면 안됨
  - raw type을 쓰면 제네릭이 안겨주는 안전성과 표현력을 모두 잃게 됨
  - 자바 5버전 이하의 호환성 때문에 만들어 놓았을 뿐 쓰면 안됨
    - 마이그레이션을 위해 로 타입을 지원하고, 제네릭 구현에는 소거(erasure; item28) 방식을 사용하기로 함

##### 예시1

List 같은 raw type은 사용해서는 안되나, List\<Object> 처럼 임의 객체를 허용하는 매개변수화 타입은 괜찮음

- List\<Object>는 모든 타입을 허용한다는 의사를 컴파일러에 명확히 전달한 것

- List\<String>은parameter로 List를 받는 메서드에는 전달 가능하지만, Object 타입을 받는 메서드에는 전달 불가

  - 제네릭의 하위 타입 규칙(item28): List\<String>은 raw type인 List의 하위 타입이지만, List\<Object>의 하위 타입은 아님

    ![](./src/generic-1.png)

##### 예시2

2개의  집합(Set)을 받아 공통 원소를 반환하는 메서드

```java
// bad
// 동작은 하지만 로 타입을 사용해 안전하지 않음
static int numElementsInCommon(Set s1, Set s2) {
    int result = 0;
    for (Object o1 : s1) {
        if (s2.contains(o1)) {
            result++;
        }
    }
    return result;
}

// good
// 비한정적 와일드카드 타입(unbounded wildcard type) 사용
static int numElementsInCommon(Set<?> s1, Set<?> s2) { ... }
```

- 비한정적 와일드카드 타입(unbounded wildcard type)

  - 제네릭 타입을 쓰고 싶지만 실제 타입 매개변수가 무엇인지 신경 쓰고 싶지 않을 때 '?' 사용

  - 제네릭 타입 `Set<E>`의 비한정적 와일드카드 타입은 `Set<?>`

    - 어떤 타입이라도 담을 수 있는 가장 범용적인 매개변수화 Set 타입

  - raw type `Set`과의 차이

    - 와일드카드 타입은 안전하고, 로 타입은 안전하지 않음

    - 로 타입 컬렉션에는 아무 원소나 넣을 수 있으니 타입 불변식을 훼손하기 쉬움

    - Collection<?>에는 (null 외에는) 어떤 원소도 넣을 수 없음

      ```java
      static int numElementsInCommon2(Set<?> s1, Set<?> s2) {
      	s1.add("verboten"); // compile error
      }
      ```

      - null 이외에는 어떤 타입도 넣을 수 없게 함
      - 제약에서 벗어나기 위해선 제네릭 메서드나 한정적 와일드카드 타입을 사용해야 함(item 30,31)

##### raw type 을 쓰지 말라는 규칙 이외의 예외

- class 리터럴에는 로 타입을 써야 함

  - 자바 명세에는 class 리터럴에 매개변수화 타입을 사용하지 못하게 함(배열과 기본타입은 허용)
  - List.class, String[].class, int.class는 허용
  - List\<String>.clas, List\<?>.class 허용하지 않음

- instanceof 연산자는 비한정적 와일드카드 타입 외의 매개변수화 타입에는 적용할 수 없음

  - 런타임에는 제네릭 타입 정보가 지워지므로

  - 로 타입이든 비한정적 와일드카드 타입이든 instanceof는 완전히 똑같이 동작하므로, 꺽쇠괄호와 물음표는 아무런 역할 없이 코드만 지저분하게 만드므로, 차라리 로 타입을 쓰는 것이 깔끔

    ```java
    //ok
    if (o instanceof Set) {  // 로 타입
        Set<?> s = (Set<?>) o;  // 와일드카드 타입
    }
    ```

##### 용어

- 매개변수화 타입(parameterized type): `List<String>`
- 실제 타입 매개변수(actual type parameter): `String`
- 제네릭 타입(generic type): `List<E>`
- 정규 타입 매개변수(formal type parameter): `E`
- 비한정적 와일드카드 타입(unbounded wildcard type): `List<?>`
- 로 타입(raw type): List
- 한정적 타입 매개변수(bounded type parameter): `<E extend Number>`
- 재귀적 타입 한정(recursive type bound): `<T extends Comparable<T>>`
- 한정적 와일드카드 타입(bounded wildcard type): `List<? extends Number>`
- 제네릭 메서드(generic method): `static <E> List<E>`, `asList(E[] a)`
- 타입 토큰(type token): `String.class`

<br>

## ITEM 27. 비검사 경고를 제거하라

> 비검사 경고를 모두 제거하라, 그리하면 코드는 타입 안정성이 보장된다!
>
> (runtime에 ClassCastException이 발생할 일이 없음)

##### 종류

- 비검사 형변환 경고(unchecked conversion)

  ```java
  // unchecked conversion (javac -Xlint:uncheck 설정 시)
  private Set<Lark> exaltation = new HashSet();
  
  // since jdk 7
  // 다이아몬드 연산자만으로 해결 가능(올바른 실제 타입 매개변수 추론)
  private Set<Lark> exaltation = new HashSet<>();
  ```

- 비검사 메서드 호출 경고

- 비검사 매개변수화 가변인수 타입 경고

- 비검사 변환 경고

##### @SuppressWarnings("unchecked")

- 경고를 제거할 수 없지만 타입 안전하다고 확신할 수 있다면 애너테이션을 달아 경고를 숨기자

- 개별 지역번수 선언부터 클래스 전체까지 어떤 선언에도 달 수 있음

- **가능한 한 좁은 범위에 적용하라**

  - 보통은 변수 선언, 아주 짧은 메서드, 생성자 등
  - 가칫 심각한 경고를 놓칠 수 있으니 절대로 클래스 전체에 적용해서는 안됨

- 한 줄이 넘는 메서드나 생성자에 애너테이션이 있으면 지역변수 선언 쪽으로 옮기자

  ```java
  public <T> T[] toArray(T[] a) {
      if (a.length < size) {
          // 생성한 배열과 매개변수로 받은 배열의 타입이 모두 T[]로 같으므로 올바른 형변환
          @SuppressWarnings("unchecked")
          T[] result = (T[]) Arrays.copyOf(elements, size, a.getClass());
          return result;
      }
  
      if (a.length > size) {
          a[size] = null;
      }
      
      return a;
  }
  ```

  - return 문에는 @SuppressWarnings 애너테이션을 다는 게 불가능함
  - 메서드 전체에 달고 싶지만, 범위가 필요 이상으로 넓어지므로 반환값을 담을 지역변수를 선언하고 그 변수에 애너테이션을 달아줌
  - **경고를 무시해도 안전한 이유를 항상 주석으로 남겨야 함**

[위로](#제네릭)


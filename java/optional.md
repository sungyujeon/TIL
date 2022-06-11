# Optional

> public final class Optional<T>
>
> - java.util.Optional
> - since 1.8
>
> 
>
> A container object which may or may not contain a non-null value. If a value is present, isPresent() will return true and get() will return the value.
>
> Additional methods that depend on the presence or absence of a contained value are provided, such as orElse() (return a default value if value not present) and ifPresent() (execute a block of code if the value is present)
>
> - orElse() : 값이 없으면 기본값 반환
> - ifPresent() : 값이 있는 경우 코드 블록 실행
>
> This is a value-based class; use of identity-sensitive operations (including reference equality (==), identity hash code, or synchronization)_ on instances of Optional may have unpredictable results and should be avoided.
>
> - value-based class이므로 Optional instance에서 id에 민감한 작업(call by reference, id 해시, 동기화) 을 사용하면 예측할 수 없는 결과가 발생하므로 피해야 함



##### Optional을 쓰지 않는다면

- NullPointerException을 피하기 위해서 null check를 수행하는 로직을 작성해야함
- 따라서 null 대신 초기값을 설정하는 것을 권장하기도 함



##### Optional을 쓴다면

- null 올 수 있는 값을 감싸는 Wrapper class인 Optional을 쓰면 null 값을 가지지 않게 할 수 있음
- Optional final class의 `private final T value` 에 값을 저장하므로 null 값을 가지지 않음



##### Methods

```java
empty()  // return an empty Optional instance
  
equals(Object obj)  // value 비교하여 return boolean

Optional.of(T value)  // value가 null이 아닌 경우
Optional.ofNullable(T value)  // value가 null이면 return empty Optional
  
Optional.orElse(T other)  // parameter로 값을 받음
Optional.orElseGet(Supplier<? extends T> other)  // parameter로 함수를 받음. orElseGet은 값이 null 이면 콜백함수 호출
```

- 세부 [docs](https://docs.oracle.com/javase/10/docs/api/java/util/Optional.html) 참조



<br>

##### 주의점

- API NOTE

  ```java
  Optional is primarily intended for use as a method return type where there is a clear need to represent "no result," and where using null is likely to cause errors. A variable whose type is Optional should never itself be null; it should always point to an Optional instance.
  ```

  - Optional은 기본적으로 method return type 으로 사용하기 위한 의도로 만들어짐
  - '결과가 없음'을 나타내거나 null 사용 시 에러를 유발할 수 있는 때 사용하자는 것

- isPresent() / get() --> ifPresent() / orElseGet(), orElseThrow()

- orElse(T other) --> orElseGet(Supplier supplier)

  ```java
  public T orElseGet(Supplier<? extends T> supplier) {
      return value != null ? value : supplier.get();
  }
  ```

  - orElse() 에서는 Optional이 emtpy여도 실행되지만, orElseGet()은 값이 있을 때만 실행

- Optional은 객체 생성 비용이 들어 단순 값을 얻을 목적이면 Optional 대신 null 비교

- 위와 같은 이유로 컬렉션은 비어있는 컬렉션을 사용하라

- Optional을 필드나 생성자, 인자로 사용하지 마라

- 기본형 Optional의 사용을 고려하라

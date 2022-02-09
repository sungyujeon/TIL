

## Object

> Object 클래스는 모든 클래스의 superclass로, 모든 멤버들은 모든 클래스에서 바로 사용 가능

##### equals(Object obj)

- 매개변수로 객체의 참조변수를 받아서 비교해 boolean 값 리턴

- 참조변수를 비교하므로 값을 비교하지 않지만, String 클래스는 equals() method overriding을 통해 값을 비교함

  ```java
  public final class String {
  	public boolean equals(Object anObject) {
          if (this == anObject) {
              return true;
          }
          if (anObject instanceof String) {
              String aString = (String)anObject;
              if (!COMPACT_STRINGS || this.coder == aString.coder) {
                  // byte[] 의 각 값을 비교
                  return StringLatin1.equals(value, aString.value);
              }
          }
          return false;
      }
  }
  ```



##### hashCode()

- hashing 기법에 사요외는 hash function을 구현한 것

- 특정 object의 메모리상 위치를 나타내는 hash code를 리턴

- String 클래스의 경우 같은 문자라면 같은 hash code를 반환하도록 overriding 되어 있음

  ```java
  public final class String {
  	public int hashCode() {
          int h = hash;
          if (h == 0 && !hashIsZero) {
              h = isLatin1() ? StringLatin1.hashCode(value)
                             : StringUTF16.hashCode(value);
              if (h == 0) {
                  hashIsZero = true;
              } else {
                  hash = h;
              }
          }
          return h;
      }
  }
  ```



##### toString()

```java
public String toString() {
    return getClass().getName() + "@" + Integer.toHexString(hashCode());
}
```

- 인스턴스에 대한 정보를 String으로 제공할 목적으로 정의한 것
- String 클래스는 toString method overriding



##### clone()

- 자신을 복제하여 새로운 인스턴스를 생성
- 원래의 인스턴스는 보존하고 clone method를 이용해 새로운 인스턴스 생성하고자 할 때 사용
- clone()은 단순히 값만을 복사하는 얕은 복사
- Cloneable 인터페이스를 구현해야하고 예외처리 해야 함



##### getClass()

- 자신이 속한 클래스의 Class객체를 반환하는 메서드

- 클래스의 모든 정보를 담고 있고, 클래스 당 1개만 존재

  (클래스 파일이 ClassLoader에 의해 메모리에 올라갈 때 자동 생성)

- Class 객체 얻는 방법

  ```java
  Class cObj = new Card().getClass();  // 생성된 객체로 부터
  Class cObj = Card.class;			 // 클래스 리터럴(*.class)로 부터
  Class cObj = Class.forName("Card");  // 클래스 이름으로 부터
  ```




## String

##### immutable class

- String class는 문자열을 저장하기 위해 문자형 배열 참조변수를 인스턴스 변수로 정의

  ```java
  public final class String implements java.io.Sereializable, Comparable {
      private char[] value;
      // ...
  }
  ```

- 해당 인스턴스 변수는 read만 가능하고 write 불가능하므로, "a" + "b" 와 같은 문자열 결합은 새로운 인스턴스가 생성되어 메모리 공간을 차지하게 되는 것이므로 StringBuffer 클래스를 대안으로 사용하기도 함



##### 문자열 비교

- 문자열을 만드는 두가지 방법

  - 문자열 리터럴

    - 문자열 리터럴은 클래스가 메모리에 로드될 때 자동적으로 미리 생성
    - JVM 내 `constant pool`에 저장
    - 같은 메모리 주소를 바라보므로 같음

    ```java
    String str1 = "abc";
    String str2 = "abc";
    
    // str1 == str2
    ```

  - String 클래스 생성자

    - 새로운 인스턴스를 생성하므로 다름

    ```java
    String str3 = new String("abc");
    String str4 = new String("abc");
    
    // str3 != str4
    ```

    

##### String method

- [string method](./string-method.md)


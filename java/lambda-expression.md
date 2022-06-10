# 람다식

> 자바 1996년 처음 등장한 이후 두 번의 큰 변화가 있었는데, 하나는 JDK1.5 부터 추가된 generics이고 나머지 하나는 JDK1.8 부터 추가된 lambda expression
>
> 특히 람다식의 도입으로 자바는 객체지향언어인 동시에 함수형 언어가 됨

<br>

## 람다식이란

- 메서드를 하나의 식(expression)으로 표현한 것
- 메서드의 이름과 반환값이 없어지므로 람다식을 익명 함수(anonymous function)라고도 함

- 예시

  ```java
  (int a) -> {
      return a * a
  }
  (a) -> return a * a
  
  
  // 기존 method
  int method() {
      return (int)(math.random() * 5) + 1;
  }
  
  // lambda
  int[] arr = new int[5];
  Arrays.setAll(arr, (i) -> (int)(math.random() * 5) + 1);
  ```

<br>

## 함수형 인터페이스(Functional Interface)

- 기존 메서드를 람다식으로 변경하면서 고려된 사항

  ```java
  // lambda -> 익명 클래스의 객체
  (int a, int b) -> a > b ? a  : b;
  new Object() {
      int max(int a, int b) {
          return a < b ? a : b;
      }
  };
  
  // interface를 구현한 익명 클래스의 객체
  interface MyFunction {
  	int max(int a, int b);
  }
  
  MyFunction f = new MyFunction() {
  					public int max(int a, int b) {
  						return a > b ? a : b;
  					}
  			  };
  MyFunction f = (int a, int b) -> a > b ? a : b;  // 익명 객체를 lambda로 대체
  int maxNumber = f.max(3, 5);
  ```

  - 하나의 메서드로 선언된 인터페이스를 정의해서 람다식을 다루는 것은 기존의 자바 규칙을 어기지 않으면서 자연스러웠음
  - 그래서 인터페이스를 통해 람다식을 다루기로 결정되었으며, 람다식을 다루기 위한 인터페이스를 '함수형 인터페이스'라고 부르기로 했음

- 함수형 인터페이스의 제약

  - 오직 하나의 추상 메서드만 정의되어 있어야 함

    (단, static, default 메서드는 개수 제약 없음)

- 함수형 인터페이스 타입의 매개변수와 반환타입

  ```java
  @FunctionalInterface
  interface MyFunction {
      void myMethod();  // 추상 메서드
  }
  
  void aMethod(MyFunction f) {
      f.myMethod();
  }
  
  //메서드의 매개변수가 MyFunction이라면 이 메서드를 호출할 때 람다식을 참조하는 참조변수를 매개변수로 지정해야 함
  MyFunction f = () -> System.out.println("myMethod()");
  aMethod(f);
  
  // 또는 참조변수 없이 람다식을 직접 매개변수로 전달 가능
  aMethod(() -> System.out.println("myMethod()"));
  
  // 람다식을 리턴하는 것도 가능
  MyFunction myMethod() {
      return () -> {};
  }
  ```

- 람다식의 타입과 형변환

  - 함수형 인터페이스로 람다식을 참조할 수 있는 것일 뿐, 람다식의 타입이 함수형 인터페이스의 타입과 일치하는 것은 아님(람다식은 익명 객체이고 익명 객체는 타입이 없음, 정확하게는 컴파일러가 임의로 이름을 정하기 때문에 알 수 없는 것)

  - 따라서 대입 연산자의 양변의 타입을 일치시키기 위해 형변환 필요

    ```java
    MyFunction f = (MyFunction)(() -> {});  // 형변환 생략 가능
    ```

  - 람다식은 오로지 함수형 인터페이스로만 형변환이 가능

    ```java
    Object obj = (Object)(() -> {});  // 불가능
    ```

<br>

### 메서드 참조

> 람다식이 하나의 메서드만 호출하는 경우에는 method reference라는 방법으로 간략화

```java
// method
Integer wrapper(String s) {
    return Integer.parseInt(s);
}

// lambda
Function<String, Integer> f = (String s) -> Integer.parseInt(s);  // 1
BiFunction<String, String, Boolean> f = (s1, s2) -> s1.equals(s2);  // 2

// method reference
Function<String, Integer> f = Integer::parseInt;
BiFunction<String, String, Boolean> f = String::equals;
```

```java
// 이미 생성된 객체의 메서드를 람다식에서 사용할 경우에는 클래스 이름 대신 그 객체의 참조변수를 적어줘야 함
MyClass obj = new MyClass();
Function<String, Boolean> f = (x) -> obj.equals(x);
Function<String, Boolean> f = obj::equals;  // 3
```

- 위와 같이 총 세가지 방법이 있는데, `클래스이름::메서드이름` 또는 `참조변수::메서드이름` 으로 바꿀 수 있음

- 생성자의 메서드 참조

  ```java
  // lambda
  Supplier<MyClass> s = () -> new MyClass();
  Function<Integer, MyClass> f = (i) -> new MyClass(i);
  BiFunction<Integer, String, MyClass> bif = (i, s) -> new MyClass(i, s);
  Function<Integer, int[]> arrayF = x-> new int[];
  
  // method reference
  Supplier<MyClass> s = MyClass::new;
  Function<Integer, MyClass> f = MyClass::new;
  BiFunction<Integer, String, MyClass> bif = MyClass::new;
  Function<Integer, int[]> arrayF = int[]::new;
  ```

  - 매개변수가 있다면 매개변수의 갯수에 따라 알맞은 함수형 인터페이스를 사용하면 됨

  



### java.util.fuction package

- 기본적인 함수형 인터페이스

  - java.lang.Runnable: void run()

  - Supplier\<T>: get()
  - Consumer\<T>: void accpet(T t)
  - Function<T, R>: R apply(T t)
  - Predicate\<T>: boolean test(T t)

- 조건식의 표현에 사용되는 Predicate

  ```java
  Predicate<String> isEmptyStr = s -> s.length() == 0;
  String s = "";
  
  if (isEmptyStr.test(s)) {
      System.out.println("This is an empty String.");
  }
  ```



### 참고자료

https://blogs.oracle.com/javamagazine/post/understanding-java-method-invocation-with-invokedynamic

https://docs.oracle.com/javase/8/docs/api/java/lang/invoke/LambdaMetafactory.html

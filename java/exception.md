# Exception handling

![](./src/exception-handling-hierarchy.png)

##### 에러(Error)와 예외(exception)

- 에러: 프로그램 코드에 의해서 수습될 수 없는 심각한 오류
- 예외: 프로그램 코드에 의해서 수습될 수 잇는 다소 미약한 오류



##### RuntimeException and others

- RuntimeException class / subclass
  - 주로 프로그래머의 실수에 의해 발생될 수 잇는 예외
  - 예를들어 배열 범위 벗어남(ArrayIndexOutOfBoundsException), null인 참조변수의 멤버 호출(NullPointerException), 형변환 오류(ClassCastException), 0으로 나누는 경우(ArithmeticException) 등
- Exception class(RuntimeException 제외)
  - 외부 영향으로 발생할 수 있는 것. 사용자의 동작에 의해서 발생하는 경우가 대다수
  - 존재하지 않는 파일 이름 입력(FileNotFoundException), 클래스 이름 잘못 적은 경우(ClassNotFoundException), 입력 데이터 형식이 잘못됨(DataFormat Exception) 등



##### try - catch

> 예외는 프로그래머가 미리 처리해주어야 하며, 예외처리(exception handling)란 프로그램 실행 시 발생할 수 있는 예외의 발생에 대비한 코드를 작성하는 것. 처리되지 못한 예외(uncaught exception)는 JVM의 '예외처리기(UncaughtExceptionHandler)'가 받아서 원인을 화면에 출력

```java
try {
    // 예외가 발생할 가능성이 있는 문장
} catch (Exception1 e1) {
    // Exception1 발생 시 처리 문장
} catch (Exception2 e2) {
    // Exception2 발생 시 처리 문장
}
```



##### printStackTrace()와 getMessage()

- 예외가 발생했을 때 생성되는 예외 클래스의 인슨턴스에는 발생한 예외에 대한 정보가 담겨 잇음
- printStackTrace()
  - 예외발생 당시의 호출 스택(call stack)에 있었던 메서드의 정보와 예외 메시지를 화면에 출력

- getMessage()
  - 발생한 예외클래스의 인스턴스에 저장된 메시지를 얻을 수 있음



##### 멀티 catch 블럭

```java
try {
    // ...
} catch (Exception1 | Exception e) {
    e.printStackTrace();
}
```

- jdk1.7부터 여러 catch 블럭을 `|` 기호를 이용해 하나의 catch 블럭으로 합칠 수 있게 됨
- 조상 예외 클래스에 선언된 멤버만 사용 가능



##### throw 예외 발생시키기

> 예외 클래스의 객체를 만든 뒤 `throw`를 이용해 예외 발생시킴

```java
try {
    Exception e = new Exception("고의로 발생시킨 예외");
    throw e;
} catch (Exception e) {
    e.prntStackTrace();
}
```



##### 메서드에 예외 선언

```java
void method() throws Exception 1, Exception2 {}
```

- 메서드 뒤에 `throws` 키워드를 이용해 발생 가능한 예외를 나열  

# exception handling antipatterns

> 이 글은 다음의 글을 번역한 것입니다. [Exception-Handling Antipatterns by Tim McCune](https://itblackbelt.wordpress.com/2006/04/17/exception-handling-antipatterns-by-tim-mccune/)
>
> ~~번역중~~



에러를 던지거나 null을 반환해야 할까? 확인 또는 미확인 에러를 사용해야 할까? 초급에서 중급 개발자들에게 예외 처리는 나중에 고려해야 하는 것으로 취급되는 경향이 있다. 그런 개발자들의 전형적인 패턴은 대체로 간단한 try/catch/printStackTrace()이다. 더 creative하게 접근하려 할 때면, 하나 이상의 일반적인 예외 처리 antipatterns에 걸리곤 한다.

> Should you throw an exception, or return null? Should you use checked or unchecked exceptions? For many novice to mid-level developers, exception handling tends to be an afterthought. Their typical pattern is usually a simple try/catch/printStackTrace(). When they try to get more creative, they usually stumble into one or more common exception handling antipatterns.



antipattern 개념은 소프트웨어 개발 커뮤니티에서 1998년 `AntiPatterns: Refactoring Software, Architectures, and Projects in Crisis` 가 발간되면서 인기를 얻었다. antipattern은 공통적으로 발생하는 프로그래밍 실수를 식별하기 위해 실제 세계의 경험을 활용한다. 이는 나쁜 패턴(bad pattern)의 일반적인 형식을 묘사하고, 나쁜 패턴의 부정적 결과를 식별하고, 해결책을 제시하고, 각 패턴을 명명하는 공통된 용어를 정의하는 데 도움을 준다.

> The antipattern concept became popular in the software development community with the release of AntiPatterns: Refactoring Software, Architectures, and Projects in Crisis in 1998. An antipattern draws on real-world experience to identify a commonly occurring programming mistake. It describes the general form of the bad pattern, identifies its negative consequences, prescribes a remedy, and helps define a common vocabulary by giving each pattern a name.



이 글에서는, 각기 다른 java 예외에 대한 기초적인 개념과 실제 활용에 대해 논의한다. 특히, 예외 처리와 관련된 기초적인 logging 개념도 다룬다. 결론적으로 무엇을 해야 하는지 보다는, 무엇을 하지 말아야 할지 그리고 코드 어딘가에서 확실히 본 적이 있을 12가지 일반적인 예외 처리 antipatterns를 살펴본다.

> In this article, we’ll discuss some fundamental concepts about the different types of Java exceptions and their intended uses. We’ll also cover basic logging concepts, especially as they relate to exception handling. Finally, instead of prescribing what to do, we’ll focus on what not to do, and take a look at a dozen common exception-handling antipatterns that you are almost certain to find somewhere in your code base.



## 기본적인 예외 개념

> Basic Exception Concepts



예외 처리를 이해하기 위한 가장 중요한 개념 중의 하나는, Java에 3가지 일반적 유형의 throwable 클래스(checked exceptions/확인된 예외, unchecked exceptions/미확인된 예외, and errors/에러)가 있다는 것이다. 

> One of the most important concepts about exception handling to understand is that there are three general types of throwable classes in Java: checked exceptions, unchecked exceptions, and errors.



##### 확인된 예외

확인된 예외들은 메서드의 throws 절에서 반드시 선언되어야 한다. 해당 예외들은 Exception 클래스를 상속하고, `in your face`(역자: 노골적으로 드러내는 예외라는 의미로 사용되는 듯하다) 유형의 예외가 되도록 의도되었다. 확인된 예외는 정상적인 시스템 동작 중 발생할 수 있는 예상되는 문제들을 나타낸다. 외부 시스템과의 통신, 사용자 입력과 관련된 문제가 그 예이다. 

참고로, 코드의 의도된 기능에 따라, '사용자 입력'은 user interface를 참조하거나 다른 개발자들이 당신의 API에 전달하는 parameters를 참조할 수 있다. 확인된 예외에 대한 올바른 response는 종종 다시 시도하거나 사용자에게 입력값을 수정할 것을 요구(prompt로 표시)한다.

> Checked exceptions are exceptions that must be declared in the throws clause of a method. They extend Exception and are intended to be an “in your face” type of exceptions. A checked exception indicates an expected problem that can occur during normal system operation. Some examples are problems communicating with external systems, and problems with user input. Note that, depending on your code’s intended function, “user input” may refer to a user interface, or it may refer to the parameters that another developer passes to your API. Often, the correct response to a checked exception is to try again later, or to prompt the user to modify his input.



##### 미확인된 예외

미확인된 예외는 throws 절에서 명시할 필요가 없는 예외다. 이는 RuntimeException을 상속한다. 미확인된 예외는 예상되지 않는 예외로, 코드 내부의 버그로 인한 것일 가능성이 높다. 흔한 예가 NullPointerException이다. JDK에는 확인된 예외지만 실제로는 확인되지 않는 핵심 예외들이 존재하는데, IllegalAccessException, NoSuchMethodException이 그것이다. 미확인 예외는 대체로 다시 시도되어선 안되고, 올바른 response는 대게 아무것도 하지 않으며 해당 메서드에서 실행 스택을 통해 버블링되도록 한다. 이것이 throws 절에서 명시할 필요가 없는 이유다. 결국 높은 수준(high level) 실행 수준에서 예외가 기록(logged)된다.(아래 참조)

> Unchecked exceptions are exceptions that do not need to be declared in a throws clause. They extend RuntimeException. An unchecked exception indicates an unexpected problem that is probably due to a bug in the code. The most common example is a NullPointerException. There are many core exceptions in the JDK that are checked exceptions but really shouldn’t be, such as IllegalAccessException and NoSuchMethodException. An unchecked exception probably shouldn’t be retried, and the correct response is usually to do nothing, and let it bubble up out of your method and through the execution stack. This is why it doesn’t need to be declared in a throws clause. Eventually, at a high level of execution, the exception should probably be logged (see below).



##### 에러

에러는 대부분 회복 불가능한 심각한 문제다. OutOfMemoryError, LinkageError, StackOverflowError 등이 그것이다.

> Errors are serious problems that are almost certainly not recoverable. Some examples are OutOfMemoryError, LinkageError, and StackOverflowError.



## 커스텀 예외 생성

> Creating Your Own Exceptions



대부분의 패키지나 시스템 컴포넌트는 하나 이상의 커스텀 예외 클래스들을 포함하고 있다. 두가지 주요한 사례가 있는데, 첫째는 코드가 잘못되었을 때 간단하게 커스텀 예외를 던지는 것이다.

```java
throw new MyObjectNotFoundException("Couldn't find object id" + id);
```

>  Most packages and/or system components should contain one or more custom exception classes. There are two primary use cases for a custom exception. First, your code can simply throw the custom exception when something goes wrong. For example:
>
> throw new MyObjectNotFoundException(“Couldn’t find object id ” + id);



둘째로, 코드가 다른 예외를 감싸거나 throw 하는 것이다.

예외를 감싸는 것을 통해 예시처럼, 기존 예외의 stack trace와 message를 유지하면서 자체 메시지를 첨가해 유저에게 추가적인 정보를 제공할 수 있다. 이를 통해 상세한 구현을 감출 수 있다(예외를 감싸는 가장 중요한 이유). 예를 들어 Hibernate API를 보면, Hibernate가 구현에서 JDBC를 광범위하게 사용하고 수행하는 대부분의 작업이 SQLException을 throw할 수 있음에도 불구하고, Hibernate는 API 어디에서도 SQLException을 노출하지 않는다. 대신에 HibernateException의 다양한 subclass 내부에 예외를 감싼다. 이러한 접근 방식은 공개 API를 변경하지 않고 내부 구현을 바꿀 수 있게 한다.

```java
catch (NoSuchMethodException e) {
    throw new MyServiceException(“Couldn’t process request”, e);
}
```

> Second, your code can wrap and throw another exception. For example:
>
> catch (NoSuchMethodException e) {
>     throw new MyServiceException(“Couldn’t process request”, e);
> }
>
> Wrapping an exception can provide extra information to the user by adding your own message (as in the example above), while still preserving the stack trace and message of the original exception. It also allows you to hide the implementation details of your code, which is the most important reason to wrap exceptions. For instance, look at the Hibernate API. Even though Hibernate makes extensive use of JDBC in its implementation, and most of the operations that it performs can throw SQLException, Hibernate does not expose SQLException anywhere in its API. Instead, it wraps these exceptions inside of various subclasses of HibernateException. Using the approach allows you to change the underlying implementation of your module without modifying its public API.



**다음 내용은 EJB와 관련된 설명이므로 SPRING에서의 내용과 관련이 없을 수 있음**

## Exceptions and Transactions

##### EJB 2

EJB 2를 만든 사람은 활성 트랜잭션(active transaction)을 롤백할지 여부를 결정하기 위해 확인된 예외와 미확인 예외를 구분하였다. EJB가 확인된 예외를 throw하는 경우 트랜잭션은 정상적으로 커밋된다. EJB에서 미확인 예외가 발생하면 트랜잭션이 롤백된다. 활성 트랜잭션을 롤백하는 예외를 거의 항상 원할텐데, EJB로 작업할 때 이 사실을 아는 것은 도움이 된다.

> The creators of the EJB 2 specification decided to make use of the distinction between checked and unchecked exceptions to determine whether or not to roll back the active transaction. If an EJB throws a checked exception, the transaction still commits normally. If an EJB throws an unchecked exception, the transaction is rolled back. You almost always want an exception to roll back the active transaction. It just helps to be aware of this fact when working with EJBs.



##### EJB 3

방금 설명한 문제를 다소 완화하기 위해 EJB 3에는 롤백 요소가 있는 ApplicationException annotation이 추가되었다. 이를 통해 예외(선택 또는 선택 취소)가 트랜잭션을 롤백해야 하는지 여부를 명시적으로 제어할 수 있다.

```java
@ApplicationException(rollback=true)
public class FooException extends Exception
…
```

> To somewhat alleviate the problem that I just described, EJB 3 has added an ApplicationException annotation with a rollback element. This gives you explicit control over whether or not your exception (either checked or unchecked) should roll back the transaction. For example:



##### Message-Driven Beans

EJB의 타입 중 하나(Session Bean, Message Driven Bean, Entity Bean)

큐에 의해 구동되는 메시지 구동 Bean(MDB)으로 작업할 때 활성 트랜잭션을 롤백하면 현재 처리 중인 메시지도 큐에 다시 배치된다. 이후 앱 서버가 클러스터된(clustered) 경우 메시지가 다른 MDB(아마도 다른 머신에 있을 수 있음)로 다시 전달된다. 앱 서버의 재시도 한도에 도달할 때까지 재시도하며, 이 시점에서 메시지는 dead letter queue에 남는다. MDB가 재처리를 피하려는 경우(비용이 많이 드는 작업을 수행하기 때문) 메시지에 대해 getJMSRedelivered()를 호출할 수 있으며 재전송된 경우 그냥 버릴 수 있다.

> Be aware that when working with message-driven beans (MDBs) that are driven by a queue, rolling back the active transaction also places the message that you are currently processing back on the queue. The message will then be redelivered to another MDB, possibly on another machine, if your app servers are clustered. It will be retried until it hits the app server’s retry limit, at which point the message is left on the dead letter queue. If your MDB wants to avoid reprocessing (e.g., because it performs an expensive operation), it can call getJMSRedelivered() on the message, and if it was redelivered, it can just throw it away.



## Logging

코드에서 예외가 발생하면 이를 처리하거나 버블링하거나 감싸(wrapping)거나 기록(logging)해야 한다. 

코드가 프로그래밍 방식으로 예외를 처리할 수 있는 경우(예: 네트워크 오류가 발생한 경우 재시도)에는 그렇게 처리를 완료(단순히 재시도 하면 됨)해야 한다.

프로그래밍 방식으로 처리할 수 없는 경우 일반적으로 버블링(미확인 예외)하거나, wrapping(확인된 예외)해야 한다. 

하지만 호출 스택의 누구도 프로그래밍 방식으로 처리할 수 없는 경우, 이 예외가 발생했다는 사실을 기록하는 것은 궁극적으로 누군가의 책임이 된다(역자: 쉽게 말해 모든 메서드를 호출하는 최상위 메서드에서 해당 예외를 처리해야 한다는 뜻으로 보임). 이 코드는 일반적으로 실행 스택에서 가능한 한 높은 위치에 있어야 한다. MDB의 onMessage() 메서드와 클래스의 main() 메서드가 그 예이다. 예외를 잡으면 적절하게 logging해야 한다.

> When your code encounters an exception, it must either handle it, let it bubble up, wrap it, or log it. If your code can programmatically handle an exception (e.g., retry in the case of a network failure), then it should. If it can’t, it should generally either let it bubble up (for unchecked exceptions) or wrap it (for checked exceptions). However, it is ultimately going to be someone’s responsibility to log the fact that this exception occurred if nobody in the calling stack was able to handle it programmatically. This code should typically live as high in the execution stack as it can. Some examples are the onMessage() method of an MDB, and the main() method of a class. Once you catch the exception, you should log it appropriately.



Apache에서 Log4j 프로젝트를 통해 흔히 사용되는 대안을 가지고 있기는 하지만, JDK도 java.util.logging 패키지를 내장한다. 추가적으로 Apache에서는 Common Logging 프로젝트도 제공하는데, 이는 (연결 가능한 방식으로) 아래에 있는 다른 로깅 구현체를 교체할 수 있는 얇은 layer 역할을 한다. 이러한 logging 프레임워크는 기본적으로 동일한 'levels'를 가지고 있다.

> The JDK has a java.util.logging package built in, although the Log4j project from Apache continues to be a commonly-used alternative. Apache also offers the Commons Logging project, which acts as a thin layer that allows you to swap out different logging implementations underneath in a pluggable fashion. All of these logging frameworks that I’ve mentioned have basically equivalent levels:



##### Log levels

- FATAL
  - 즉각적인 주의가 필요한 극단적인 경우에 사용. ~~이 수준은 엔지니어의 pager를 트리거하는 데 유용할 수 있음~~(???)
- ERROR
  - 버그 또는 일반적인 오류 상태를 나타내지만 반드시 시스템을 정지시키는 것은 아님
  - 이 수준은 엔지니어가 버그로 신고할 수 있는 경고 목록을 이메일로 보내는(역자: 어떤 방식으로든 알람을 보내는) trigger에 유용할 수 있음
- WARN
  - 항상 버그는 아니지만 누군가 알고 싶을 수 있음
  - 일반적으로 발생하는 경고를 확인하길 원할 때 유용
- INFO
  - 기본적인 고급 진단 정보에 사용
  - "앱이 무엇을 하고 있나?"라는 질문에 답하기 위해 비교적 오래 실행되는 코드 섹션의 바로 앞과 뒤에 붙이는 것이 가장 좋음
  - 이 수준의 메시지는 너무 많은 정보를 주는 것을 피해야 함
- DEBUG
  - 낮은 수준의 디버깅 지원에 사용

> \* FATAL: Should be used in extreme cases, where immediate attention is needed. This level can be useful to trigger a support engineer’s pager.
> \* ERROR: Indicates a bug, or a general error condition, but not necessarily one that brings the system to a halt. This level can be useful to trigger email to an alerts list, where it can be filed as a bug by a support engineer.
> \* WARN: Not necessarily a bug, but something someone will probably want to know about. If someone is reading a log file, they will typically want to see any warnings that arise.
> \* INFO: Used for basic, high-level diagnostic information. Most often good to stick immediately before and after relatively long-running sections of code to answer the question “What is the app doing?” Messages at this level should avoid being very chatty.
> \* DEBUG: Used for low-level debugging assistance.



commons-logging 이나 Log4j를 사용하고 있다면 일반적인 문제에 주의해야 한다. error, warn, info, debug 메서드는 message 매개변수만 사용하거나 두번째 매개변수로 Throwable도 같이 사용하는 것으로 overload된다. 

```java
logger.info("this is a message");  // message 매개변수만 사용
logger.info("this is a message", e);  // Throwable을 구현한 인스턴스도 사용
```

예외가 던져졌다는 사실을 기록하려는 경우 메시지와 예외를 모두 전달해야 한다. 단일 매개변수(역자: 메시지만 던지는)를 허용하는 버전을 호출하고 예외를 전달하면, 예외의 stack trace가 숨겨진다.

> If you are using commons-logging or Log4j, watch out for a common gotcha. The error, warn, info, and debug methods are overloaded with one version that takes only a message parameter, and one that also takes a Throwable as the second parameter. Make sure that if you are trying to log the fact that an exception was thrown, you pass both a message and the exception. If you call the version that accepts a single parameter, and pass it the exception, it hides the stack trace of the exception.



log.debug() 호출 시에 log.isDebugEnabled()로 해당 호출을 감싸는 것이 항상 좋다. 이것은 순전히 최적화를 위한 것이고, 습관적으로 하다보면 저절로 된다.

> When calling log.debug(), it’s good practice to always surround the call with a check for log.isDebugEnabled(). This is purely for optimization. It’s simply a good habit to get into, and once you do it for a few days, it will just become automatic.



System.out, System.err을 사용하지 말아라. 항상 logger를 사용해야 한다. logger는 극단적으로 설정(configurable) 가능하고 유연(flexible)하다. 각 appender는 패키지별로 report/act on(보고 및 조치)하려는 치명도 수준(level of severity)을 결정할 수 있다. System.out으로 메시지를 출력하는 것은 엉성하고 용서할 수 없는 것이다.(System.out으로 print 하지 마라!!)

> Do not use System.out or System.err. You should always use a logger. Loggers are extremely configurable and flexible, and each appender can decide which level of severity it wants to report/act on, on a package-by-package basis. Printing a message to System.out is just sloppy and generally unforgivable.



## Antipatterns

##### Log and Throw

```java
catch (NoSuchMethodException e) {
    LOG.error(“Blah”, e);
    throw e;
}

catch (NoSuchMethodException e) {
    e.printStackTrace();
    throw new MyServiceException(“Blah”, e);
}
```

- exception logging + throw 둘 다 하는 것은 나쁨

- logging / throwing은 하나의 문제에 대해 여러 로그 메시지를 생성하고, 이는 로그를 추적하는 개발자에게 지옥 선사

> All of the above examples are equally wrong. This is one of the most annoying error-handling antipatterns. Either log the exception, or throw it, but never do both. Logging and throwing results in multiple log messages for a single problem in the code, and makes life hell for the support engineer who is trying to dig through the logs.



##### Throwing Exception

```java
public void foo() throws Exception {}
```

- 단순히 Exception을 던지는 것은 엉성함(뭔진 모르지만 문제가 있어라고 말하는 것..)

- 이는 확인된 예외를 사용하는 목적을 완전히 상실하는 것

- 메서드가 던질 수 있는 구체적인 확인된 예외를 throws 절에 명시해야 함

- 여러개라면, 이를 custom exception으로 wrapping해야 함

  ```java
  public void foo() throws MyException, AnotherException, SomeOtherException, YetAnotherException {}
  ```

  - 여러개의 확인된 예외를 던지는 것도 괜찮을 수는 있지만, 일반적으로 단일 예외로 wrapping
  - caller가 여러 예외에 의존하고 있다면 괜찮을 수도 있지만 (역자: 이것이 깨끗한 코드인지는 의문)

> This is just sloppy, and it completely defeats the purpose of using a checked exception. It tells your callers “something can go wrong in my method.” Real useful. Don’t do this. Declare the specific checked exceptions that your method can throw. If there are several, you should probably wrap them in your own exception (see “Throwing the Kitchen Sink” below.)
> Throwing the Kitchen Sink
>
> Throwing multiple checked exceptions from your method is fine, as long as there are different possible courses of action that the caller may want to take, depending on which exception was thrown. If you have multiple checked exceptions that basically mean the same thing to the caller, wrap them in a single checked exception.



##### Catching Exception

```java
try {
    foo();
} catch (Exception e) {
    LOG.error(“Foo failed”, e);
}
```

- 이와 같은 패턴도 일반적으로 잘못됨
- 발생할 수 있는 특정한 예외를 잡아야 함
- 단순히 Exception으로 잡는다면, 개발자는 무엇이 잘못되고 있는지 알 수 없음

> This is generally wrong and sloppy. Catch the specific exceptions that can be thrown. The problem with catching Exception is that if the method you are calling later adds a new checked exception to its method signature, the developer’s intent is that you should handle the specific new exception. If your code just catches Exception (or worse, Throwable), you’ll probably never know about the change and the fact that your code is now wrong.



##### Destructive Wrapping

```java
catch (NoSuchMethodException e) {
    throw new MyServiceException(“Blah: ” + e.getMessage());
}
```

- original exception의 stack trace를 무너뜨리는 것으로, 항상 옳지 않음

- 추가 설명 필요

> This destroys the stack trace of the original exception, and is always wrong.



##### Log and Return Null

```java
catch (NoSuchMethodException e) {
    LOG.error(“Blah”, e);
    return null;
}

catch (NoSuchMethodException e) {
    e.printStackTrace();
    return null;
} // Man I hate this one
```

- logging 후 null을 리턴하는 것은 대체로 잘못된 코드
- null을 리턴하지말고 exception을 throw 해서, <b>caller가 이를 처리</b>하게 해야 함

- null 리턴하는 것은, exception이 아닐 때다!

> Although not always incorrect, this is usually wrong. Instead of returning null, throw the exception, and let the caller deal with it. You should only return null in a normal (non-exceptional) use case (e.g., “This method returns null if the search string was not found.”).



##### Catch and Ignore

```java
catch (NoSuchMethodException e) {
    return null;
}
```

- 예외를 잡고 아무것도 하지 않는 것은 예외에 대한 정보를 잃게 하는 것임

> This one is insidious. Not only does it return null instead of handling or re-throwing the exception, it totally swallows the exception, losing the information forever.



##### Throw from Within Finally

```java
try {
    blah();
} finally {
    cleanUp();
}
```

- finally의 cleanUp() 메서드가 예외를 발생시키지 않으면 괜찮은 코드
- 왜냐하면 try 블럭에서 1차적으로 예외가 발생하고, finally 블럭에서 2차적으로 예외가 발생하면, 첫번째 try 문 안에서 발생한 예외는 사라지게 됨

> This is fine, as long as cleanUp() can never throw an exception. In the above example, if blah() throws an exception, and then in the finally block, cleanUp() throws an exception, that second exception will be thrown and the first exception will be lost forever. If the code that you call in a finally block can possibly throw an exception, make sure that you either handle it, or log it. Never let it bubble out of the finally block.



##### Multi-Line Log Messages

```java
// bad
LOG.debug(“Using cache policy A”);
LOG.debug(“Using retry policy B”);

// good
LOG.debug(“Using cache policy A, using retry policy B”);
```

- 모든 log messages들을 적은 수의 호출로 그룹화해야 함
- 여러 줄의 로그 메시지를 사용하는 것이 test case에 따라 괜찮아 보일 수도 있지만, multi thread 환경에서 두 개의 로그 메시지는 붙어있지 않을 수 있어서 발견하기 힘들어짐

> Always try to group together all log messages, regardless of the level, into as few calls as possible. So in the example above, the correct code would look like:
>
> LOG.debug(“Using cache policy A, using retry policy B”);
>
> Using a multi-line log message with multiple calls to log.debug() may look fine in your test case, but when it shows up in the log file of an app server with 500 threads running in parallel, all spewing information to the same log file, your two log messages may end up spaced out 1000 lines apart in the log file, even though they occur on subsequent lines in your code.



##### Unsupported Operation Returning Null

```java
// bad
public String foo() {
    // Not supported in this implementation.
    return null;
}

// good
public String foo() {
    // Not supported in this implementation.
    throw new pportedOperationException();
}
```

- ~~추상 클래스를 구현하고, subclass에서 재정의할 hooks를 제공하는 경우에는 문제가 없지만~~(??)
- null 반환 대신에 `UnsupportedOperationException`를 throw 하는 것이 좋음
- caller가 자신의 코드에서 임의의 NullPointerException이 발생하는 이유를 파악하는 대신 작동하지 않는 이유를 훨씬 더 명확하게 알 수 있음

> When you’re implementing an abstract base class, and you’re just providing hooks for subclasses to optionally override, this is fine. However, if this is not the case, you should throw an UnsupportedOperationException instead of returning null. This makes it much more obvious to the caller why things aren’t working, instead of her having to figure out why her code is throwing some random NullPointerException.



##### Ignoring InterruptedException

```java
while (true) {
try {
    Thread.sleep(100000);
} catch (InterruptedException e) {}
    doSomethingCool();
}
```

InterruptedException is a clue to your code that it should stop whatever it’s doing. Some common use cases for a thread getting interrupted are the active transaction timing out, or a thread pool getting shut down. Instead of ignoring the InterruptedException, your code should do its best to finish up what it’s doing, and finish the current thread of execution. So to correct the example above:

while (true) {
try {
Thread.sleep(100000);
} catch (InterruptedException e) {
break;
}
doSomethingCool();
}

Relying on getCause()

Example:

catch (MyException e) {
if (e.getCause() instanceof FooException) {
…

The problem with relying on the result of getCause is that it makes your code fragile. It may work fine today, but what happens when the code that you’re calling into, or the code that it relies on, changes its underlying implementation, and ends up wrapping the ultimate cause inside of another exception? Now calling getCause may return you a wrapping exception, and what you really want is the result of getCause().getCause(). Instead, you should unwrap the causes until you find the ultimate cause of the problem. Apache’s commons-lang project provides ExceptionUtils.getRootCause() to do this easily.

Conclusion

Good exception handling is a key to building robust, reliable systems. Avoiding the antipatterns that we’ve outlined here helps you build systems that are maintainable, resilient to change, and that play well with other systems.
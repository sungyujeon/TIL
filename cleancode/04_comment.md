# 주석

> [주석은 쉰들러 리스트가 아니다](#주석은-쉰들러-리스트가-아니다)
>
> [좋은 주석](#좋은-주석)
>
> [나쁜 주석](#나쁜-주석)
>
> [중요하다고 생각한 것](#중요하다고-생각한-것)



## 주석은 쉰들러 리스트가 아니다

- 주석은 '순수하게 선하지' 못하다
- 프로그래밍 언어를 치밀하게 사용해 의도를 표현할 능력이 있다면, 주석은 전혀 필요하지 않다
- 주석은 거짓말을 한다
  - 항상도 아니고 고의도 아니지만 주석은 오래될수록 코드에서 멀어진다
  - 주석이 언제나 코드를 따라가지는 않는다
- 주석은 나쁜 코드를 보완하지 못한다
  - 코드에 주석을 추가하는 일반적인 이유는 코드 품질이 나쁘기 때문
  - 표현력이 풍부하고 깔끔하며 주석이 거의 없는 코드가, 복잡하고 어수선하며 주석이 많이 달린 코드보다 훨씬 좋다



## 좋은 주석

##### 법적인 주석

```java
// Copyright (C) 2003,2004,2005 by Object Mentor, Inc. All rights reserved.
// GNU General Public License 버전 2 이상을 따르는 조건으로 배포한다.
```

- 소스 파일 첫머리에 주석으로 들어가는 저작권 정보와 소유권 정보



##### 정보를 제공하는 주석

```java
// 테스트 중인 Responder 인스턴스를 반환한다.
protected abstract Responder responderInstance();

// kk:mm:ss EEE, MMM dd, yyyy 형식이다
Pattern timeMatcher = Pattern.compile(
	"\\d*:\\d*:\\d* \\w*, \\w* \\d*, \\d*"
);
```

- 코드에서 사용한 정규표현식이 시각과 날짜를 뜻한다고 설명(주어진 형식 문자열을 사용해 SimpleDateFormat.format 함수가 반환하는 시각과 날짜를 뜻함)
- 하지만 이 같은 주석도 클래스나 메서드를 만들어 표현하면 더 좋음



##### 의도를 설명하는 주석

```java
public int compareTo(Object o) {
  if(o instanceof WikiPagePath) {
    WikipagePath p = (WikiPagePath) o;
    String compressedName = StringUtil.join(names, "");
    String compressedArgumentName = StringUtil.join(p.names, "");
    return compressedName.compareTo(compressedArgumentName);
  }
  return 1; // 오른쪽 유형이므로 정렬 순위가 더 높다.
}

public void testConcurrentAddWidgets() throws Exception {
  // ...
  
  // 스레드를 대량 생성하는 방법으로 어떻게든 경쟁 조건을 만들려 시도한다.
  for (i = 0; i < 25000; i++) {
    WidgetBuilderThread widgetBuilderThread = 
      new WidgetBuilderThread(widgetBuilder, text, parent, failFlag);
    Thread thread = new Thread(widgetBuilderThread);
    thread.start();
  }
  assertEquals(false, failFlag.get());
}
```



##### 의미를 명료하게 밝히는 주석

```java
public void testCompareTo() throws Exception {
  WikiPagePath a = PathParser.parse("PageA");
  WikiPagePath ab = PathParser.parse("PageA.PageB");
  
  assertTure(a.compareTo(a) == 0);  	// a == a
  aassertTrue(ab.compareTo(ab) == 0)  // ab == ab
}
```

- 모호한 인수나 반환값은 그 의미를 읽기 좋게 표현하면 이해하기 쉬워짐
- 일반적으로 인수나 반환값 자체를 명확하게 만들면 더 좋겠지만, 인수나 반환값이 표준 라이브러리나 변경하지 못하는 코드에 속한다면 의미를 명료하게 밝히는 주석이 유용
- 주석을 달 때는 더 나은 방법이 없는지 고민하고 정확히 달도록 각별히 주의해야 함



##### 결과를 경고하는 주석

```java
// 여유 시간이 충분하지 않다면 실행하지 마십시오.
public void _testWithReallyBigFile() {
  writeLinesToFile(10000000);
  
  response.setBody(testFile);
  response.readyToSend(this);
  assertSubString("content-Length: 1000000000", responseString);
  assertTrue(bytesSent > 1000000000);
}

public static SimpleDateFormat makeStandardHttpDateFormat() {
  // SimpleDateFormat은 스레드에 안전하지 못하다.
  // 따라서 각 인스턴스를 독립적으로 생성해야 한다.
  SimpleDateFormat df = new SimpleDateFormat("EEE, dd MMM yyyy HH:mm:ss z");
  df.setTimeZone(TimeZone.getTimeZone("GMT"));
  return df
}
```

- @Ignore 속성을 이용해 테스트 케이스를 실행하지 않게 할 수 있는 등의 방법도 있음
- 스레드에 안전하지 못하다는 것은 @NotThreadSafe annotation을 이용해 할 수도 있음
- 프로그래머가 주의해야 하는 내용을 주석으로 달 수 있음



##### TODO

```java
// TODO-MdM 현재 필요하지 않다.
// 체크아웃 모델을 도입하면 함수가 필요 없다.
protected VersionInfo makeVersion() throws Exception {
  return null;
}
```

- 당장 구현하기 어려운 업무를 기술
- 더 이상 필요 없는 기능을 삭제하라는 알림, 누군가에게 문제를 봐달라는 요청, 더 좋은 이름을 떠올려달라는 부탁, 앞으로 발생할 이벤트에 맞춰 코드를 고치라는 주의 등에 유용



##### 중요성을 강조하는 주석

```java
String listItemContent = match.group(3).trim();
// 여기서 trim은 정말 중요하다. trim 함수는 문자열에서 시작 공백을 제거한다.
// 문자열에 시작 공백이 있으면 다른 문자열로 인식되기 때문이다.
new ListItemWidget(this, listItemContent, this.level + 1);
return buildList(text.substring(match.end()));
```



##### 공개 API에서 javadocs

- 공개 API 구현 시에는 javadocs가 유용할 수 있음
- 이 역시 정확하게 주석을 다는 것이 중요함



## 나쁜 주석

> 위 설명을 제외한 대부분의 주석이 나쁜 주석이다



##### 주절거리는 주석

```java
public void loadProperties() {
  try {
    String propertiesPath = propertiesLocation + "/" + PROPERTIES_FILE;
    FileInputStream propertiesStream = new FileInputStream(propertiesPath);
    loadedProperties.load(propertiesStream);
  } catch (IOException e) {
    // 속성 파일이 없다면 기본값을 모두 메모리로 읽어 들였다는 의미다.
  }
}
```

- 이해가 안 되어 다른 모듈까지 뒤져야 하는 주석은 독자와 제대로 소통하지 못하는 주석이다



##### 같은 이야기를 하는 주석

```java
// this.closed가 true일 때 반환되는 유틸리티 메서드다.
// 타임아웃에 도달하면 예외를 던진다.
public synchronized void waitForClose(final long timeoutMillis) throws Exception {
  if(!closed) {
    wait(timeoutMillis);
    if(!closed) {
      throw new Exception("MockResponsesender could not be closed");
    }
  }
}

/**
 * 이 컴포넌트의 프로세서 지연값
 */
protected int backgroundProcessorDelay = -1;

/**
 * 이 컴포넌트를 위한 컨테이너 이벤트 Listener
 */
protected ArrayList listeners = new ArrayList();
```

- 주석이 코드보다 더 많은 정보를 제공하지 못함



##### 오해할 여지가 있는 주석

- 위 waitForClose() 메서드를 보면, this.closed가 true여야만 메서드를 반환하는데, this.closed가 true로 변하는 순간에 함수가 반환되리라는 생각으로 어느 프로그래머가 경솔하게 함수를 호출할지도 모른다?



##### 의무적으로 다는 주석

- 모든 함수에 Javadocs를 달거나, 모든 변수에 주석을 달아야 한다는 규칙은 어리석음
- 이런 주석은 코드를 복잡하게 만들고 무질서를 초래



##### 이력을 기록하는 주석

- 변경 이력은 VCS를 사용하라!



##### HTML 주석

```java
/**
 * <p/>
 * <pre>
 */
```



##### 모호한 관계

- 주석과 주석이 설명하는 코드는 둘 사이 관계가 명백해야 함



##### 함수 헤더

- 짧은 함수는 긴 설명이 필요 없음
- 짧고 한 가지만 수행하며 이름을 잘 붙인 함수가 주석으로 헤더를 추가한 함수보다 훨씬 좋음



##### 비공개 코드에서 Javadocs

- 시스템 내부에 속한 클래스와 메서드에까지 Javadocs를 생성할 필요 없음



## 중요하다고 생각한 것

##### 있으나 마나한 주석

```java
/**
 * 기본 생성자
 */
protected AnnualDateRule() {}
```

- 너무 당연한 것은 개발자가 주석을 무시하는 습관에 빠지게 한다!



##### 함수나 변수로 표현할 수 있다면 주석을 달지 마라!

```java
// bad
// 전역 목록 <smodule>에 속하는 모듈이 우리가 속한 하위 시스템에 의존하는가?
if (smodule.getDependSubsystems().contains(subSysMod.getSubSystem())) {}

// good
ArrayList moduleDependees = smodule.getDependSubsystems();
String ourSubSystem = subSysMod.getSubSystem);
if (moduleDependees.contains(ourSubSystem)) {}
```

- 주석이 필요하지 않도록 코드를 개선하라!



##### 위치를 표현하는 주석

```java
// Actions ///////////////////////////////
```

- 특정 기능을 모아놓아 유용한 경우도 있지만, 일반적으로 이 같은 주석은 가독성을 낮춤
- 하지만 너무 자주 사용하지만 않는다면 유용할 수 있음!



##### 닫는 괄호에 다는 주석

```java
while () {
  
} // while
```

- 중첩이 심하고 장황한 함수라면 닫는 괄호에 다는 주석이 필요할 수도 있다
- 하지만 주석을 달기 전에 함수를 줄여라!



##### 주석으로 처리한 코드

> 질 나쁜 와인병 바닥에 앙금이 쌓이듯 쓸모 없는 코드가 점차 쌓여간다!

- 주석으로 처리된 코드는 다른 사람들이 지우기를 주저한다(이유가 있어 남기거나, 중요하니까 지우면 안된다고 생각해서!)
- 그냥 코드를 삭제하라! 소스 코드 관리 시스템을 보아라



##### 전역 정보

```java
/**
 * 적합성 테스트가 동작하는 포트: 기본값은 <b>8082</b>.
 *
 * @param fitnessPort
 */
public void setFitnessePort(int fitnessePort) {
  this.fitnessePort = fitnessePort;
}
```

- 근처에 있는 코드만 기술하라!
- 시스템의 전반적인 정보를 기술하지 말아라!



##### 필요한 정보

```java
/**
 * 이 클래스는 사용자가 지정한 최대 값까지 소수를 구한다.
 * 알고리즘은 에라토스테네스의 체다.
 * 2에서 시작하는 정수 배열을 대상으로 작업한다.
 * 처음으로 남아 있는 정수를 찾아 배수를 모두 제거한다.
 * 배열에 더 이상 배수가 없을 때까지 반복한다.
 */
public class PrimeGenerator {}

private static int determineIterationLimit() {
  // 배열에 있는 모든 배수는 배열 크기의 제곱근보다 작은 소수의 인수다.
  // 따라서 이 제곱근보다 더 큰 숫자의 배수는 제거할 필요가 없다.
  double iterationLimit = Math.sqrt(crossedOut.length);
  return (int) iterationLimit;
}
```

- 첫번째 주석은 중복이라 생각할 수 있지만 알고리즘을 더 이해하기 쉽게해준다!
- 두 번째 주석은 루프 한계값으로 제곱근을 사용한 이유를 설명하므로 필요하다!



##### JavaDoc

> Java 코드에서 API 문서를 HTML 형식으로 생성해주는 도구

```java
// This is a single line comment

/*
 * This is a regular multi-line comment
 */

/**
 * This is a Javadoc
 */
```


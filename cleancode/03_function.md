# 함수

> [어떤 함수가 코드 이해를 어렵게 하는가?](#어떤-함수가-코드-이해를-어렵게-하는가?)
>
> [좋은 함수란?](#좋은-함수란?)
>
> [작은 함수](#작은-함수)
>
> [한 가지만 해라!](#한-가지만-해라!)
>
> [추상화 수준은 하나로!](#추상화-수준은-하나로!)
>
> [내려가기 규칙](#내려가기-규칙)
>
> [Switch](#Switch)
>
> [서술적인 이름을 사용하라!](#서술적인-이름을-사용하라!)
>
> [함수 인수를 줄여라](#서술적인-이름을-사용하라!)
>
> [부수 효과를 일으키지 마라!](#부수-효과를-일으키지-마라!)
>
> [명령과 조회를 분리하라!](#명령과-조회를-분리하라!)
>
> [오류 코드보다 예외를 사용하라!](#오류-코드보다-예외를-사용하라!)
>
> [결론](#결론)

<br>

<br>

##### 어떤 함수가 코드 이해를 어렵게 하는가?

- 추상화 수준이 다양하다
- 코드가 너무 길다
- 중첩된 if 문이 많다
- 이상한 네이밍을 하거나 의미가 모호한 함수를 호출한다.

<br>

##### 좋은 함수란?

> 의도를 분명히 표현하는, 처음 읽는 사람이 직관적으로 파악할 수 있는 함수는 어떻게 작성하는가?

- 작은 함수, 단일 책임, 계층적 추상화, 내려가기

<br>

##### 작은 함수

- 함수는 100줄, 20줄, 더 줄여서 3-4줄까지도 줄일 수 있어야 한다

- 블록 안에 들어가는 함수는 한 줄이어야 한다

  ```java
  if (isTestPage(pageData)) {
    includeSetupAndTeardownPages(pageData, isSuite);
  }
  ```

  - 대개 if/else/while문 등에서 함수를 호출
  - 이를 통해 바깥을 감싸는 함수(enclosing function)가 작아지고, 블록 안에서 호출하는 함수 이름을 적절히 지으면 코드 이해도 쉬워짐

- 함수에서 들여쓰기는 1-2단을 넘어가면 안된다

  ```java
  // bad
  if (pageData.hsAttribute("Test")) {
    if (includeSuiteSetup) {
      if () {
        if () {
          // ...
        }
      }
    }
    if (setup != null) {
      // ...
    }
    if (teardown != null) {
      // ...
    }
  }
  
  // good
  boolean isTestPage = pageData.hasAttribute("Test");
  if (isTestPage) {
    includeSetupPages(testPage, newPageContent, isSuite);
  }
  
  // better
  // 인스턴스 변수로 만들 것을 판단하고, 함수를 쪼갠다
  boolean isSuite;
  if (isTestPage()) {
    includeSetupAndTeardownPages();
  }
  ```

<br>

##### 한 가지만 해라!

- 단일책임(SRP)

- 함수를 만드는 이유는 큰 개념(=== 함수 이름)을 다음 추상화 수준에서 여러 단계로 나눠 수행하기 위함

- 다른 표현이 아니라 의미 있는 이름으로 다른 함수를 추출할 수 있다면 그 함수는 여러 작업을 하는 셈

  ```java
  if (isTestPage(pageData)) {
    includeSetupAndTeardownPages(pageData, isSuite);
  }
  ```

  - `includeSetupAndTeardownPages` -> `includeSetupPages / includeTeardownPages` -> `includeSetupPage / includeTeardownPage` -> `include` -> `build` 로 추상화 수준이 내려감

  - 해당 if문을 includeSetupsAndTeardownsIfTestPage로 변경하는 것은 같은 내용을 다르게 표현할 뿐 추상화 수준을 바꾸지는 않는 것


<br>

##### 추상화 수준은 하나로!

- 함수가 확실히 '한 가지' 작업만 하려면 함수 내 모든 문장의 추상화 수준이 동일해야 함

- 추상화 수준 예시

  - getHtml() : 추상화 수준 매우 높음
  - String pagePathName = PathParser.render(pagepath) : 추상화 수준 중간
  - .append("\n") : 추상화 수준 매우 낮음

- `p.392 [G34] 함수는 추상화 수준을 한 단계만 내려가야 한다`

  > - 함수 내 모든 문장은 추상화 수준이 동일해야 함. 
  > - 추상화 수준은 함수 이름이 의미하는 작업보다 한 단계만 낮아야 함

  ```java
  // bad
  // 추상화 수준이 2개가 섞여 있음(수평선에 크기가 있다는 개념 & HR 태그 자체의 문법)
  // 즉, hr 수평선 태그와 태그의 size 속성을 명시하는 태그가 함수 안에서 직접적으로 작성되어 있다는 것
  public String render() throws Exception {
    StringBuffer html = new StringBuffer("<hr");
    if (size > 0) {
    	html.append(" size=\"")
  				.append(size + 1)
        	.append("\"");
    }
    html.append(">");
    
    return html.toString();
  }
  
  // good
  // hr, size 분리
  // 결론적으로 render() 메서드는 hr 태그를 html 형식으로 리턴하는 행위에 집중(생성과 size를 결정하는 로직은 별도 클래스나 메서드로 분리)
  public String render() throws Exception {
    HtmlTag hr = new HtmlTag("hr");  // HtmlTag 클래스로 hr 태그 (문법적) 생성 로직 분리
    if (extraDashes > 0) {
      hr.addAttribute("size", hrSize(extraDashes));  // hrSize 메서드로 사이즈 결정 로직 분리
    }
    
    return hr.html();
  }
  
  private String hrSize(int height) {
    int hrSize = height + 1;
    return String.format("%d", hrSize);
  }
  ```

<br>

##### 내려가기 규칙

> 코드는 위에서 아래로 이야기처럼 읽혀야 좋음

- 위에서 설명한 것처럼 같은 추상화 수준에서 작성되도록 해야 하고, 이는 글에서 문단을 나누어 계층을 만드는 것과 비슷함

- 예시

  ```txt
  설정 페이지와 해제 페이지를 포함하려면, 설정 페이지를 포함하고, 테스트 페이지 내용을 포함하고, 해제 페이지를 포함한다.
  	- 설정 페이지를 포함하려면, 슈트이면 슈트 설정 페이지를 포함한 후 일반 설정 페이지를 포함
  	- 슈트 설정 페이지를 포함하려면, 부모 계층에서 ...
  	- 부모 계층을 검색하려면 ...
  ```

<br>

##### Switch

> Switch문은 작게 만들기 어렵다! 하지만 case 분기를 최소화 하기 위해 노력해야 한다. 다형적 객체를 생성하는 코드에서만 가급적 사용하라.

```java
// bad
// 새 직원 유형을 추가하면 함수가 길어질 것
public Money calculatePay(Employee e) throws InvalidEmployeeType {
  switch (e.type) {
    case COMMISSIONED:
      return calculateCommissionedPay(e);
    case HOURLY:
      return calculateHourlyPay(e);
    case SALARIED:
      return calculateSalariedPay(e);
    default:
      throw new InvalidEmployeeType(e.type);
  }
}

// good
public abstract class Employee {
  public abstract boolean isPayday();
  public abstract Money calculatePay();
  public abstract void deliverPay(Money pay);
}

public interface EmployeeFactory {
  public Employee makeEmployee(EmployeeRecord r) throws InvalidEmployeeType;
}

public class EmployeeFactoryImpl implements EmployeeFactory {
  public Employee makeEmployee(EmployeeRecord r) throws InvalidEmployeeType {
    switch (r.type) {
      case COMMISSIONED:
        return new CommissionedEmployee(r);
      case HOURLY:
        return new HourlyEmployee(r);
      case SALARIED:
        return new SalariedEmployee(r);
      default:
        throw new InvalidEmployeeType(r.type);
    }
  }
}
```

- switch문을 추상 팩토리에 숨겨서 감춤
- 팩토리 구현 클래스에서 switch로 Employee 파생 클래스의 인스턴스를 생성
- employee 인스턴스의 행위는 계속해서 추가될 수 있으므로(isPayday, calculatePay 등), Employee 인터페이스를 거쳐서 호출함

<br>

##### 서술적인 이름을 사용하라!

- `testableHtml` -> `SetupTeardownIncluder.render()`로 변경해 함수가 하는 일을 좀 더 잘 표현하게 함
- 길고 서술적인 이름이 짧고 어려운 이름보다, 서술적인 주석보다 좋음
- 서술적인 이름을 사용하면 개발자도 설계가 뚜렷해지므로 코드를 개선하기 쉬워짐

<br>

##### 함수 인수를 줄여라

- 가장 이상적인 인수 개수는 0개(무항)
- 1개(단항), 2개(이항)까지도 괜찮을 수 있으나, 3개(삼항)는 가능한 피해야 하고 4개 이상(다항)은 특별한 이유가 필요함

- 인스턴스 변수로 선언하는 대신 함수 인수로 넘기면 이해가 어려워지고, 추상화 수준이 다를 수 있음(추상화 수준이 다르면 현 시점에서 별로 중요하지 않은 세부사항까지 알아야 함)

  ```java
  // bad
  // includeSetupPage 단계에서 알지 않아도 되는 newPageContent의 내용까지 알아야 함. StringBuffer에 문자열을 추가하는 것은 추상화 레벨이 다른 build 단계에서 하고 있음
  includeSetupPageInto(StringBuffer newPageContent);
  
  // good
  includeSetupPage();
  ```

- 단항 함수

  - 인수에 질문을 던지는 경우

    ```java
    boolean fileExists("MyFile");
    ```

  - 인수를 변환해 결과를 반환하는 경우

    ```java
    InputStream fileOpen("MyFile");
    ```

  - 이벤트 함수

    ```java
    void passwordAttemptFailedNtimes(int attempts);
    ```

    - 이벤트 함수는 입력 인수는 있고 출력 인수는 없음
    - 프로그램은 함수 호출을 이벤트로 해석해 입력 인수로 시스템 상태를 바꿈
    - 이벤트 함수는 조심해서 사용해야 하고, 이벤트라는 사실이 코드에 명확히 드러나야 하므로 이름과 문맥을 주의해서 선택해야 함

  - 플래그 인수는 추하다

    - 인수로 boolean 값을 넘기는 것은 여러 일을 처리한다는 것을 공표하는 셈(if면 A를, else면 B를 한다는 뜻이므로)

- 이항 함수

  - 프로그램을 짜다보면 이항 함수를 불가피하게 쓰는 경우도 있지만, 그만큼 위험이 따른다는 사실을 이해해야 함

  - 가급적이면 인스턴스 변수로 만들어 메서드를 구현하는 방향으로 짜는 것이 좋음

    ```java
    // bad
    writeField(outputStream, name);
      
    // good-1
    // FieldWriter 클래스를 새로 만들어 인스턴스 변수를 만들고 write 메서드 구현
    outputStream.writeField(name)
    public class OutputStream {
      
      public void writeField(name) {
        //...
      }
    }
    
    // good-2
    FieldWriter.setName("name");
    FieldWriter.write();
    public class FieldWriter() {
      String name;
      OutputStream outputstream;
      
      public void write() {
    		//...   
      }
      public void setName(String name) {
        this.name = name;
      }
    }
    ```

- 삼항 함수

  - 인수가 3개는 당연히 2개 보다도 어려움
  - assertEquals(1.0, amount, .001)은 괜찮다? >> 부동소수점 비교가 필요하기 때문
  
- 인수 객체

  - 인수가 2-3개 필요하다면 일부를 독자적 클래스 변수로 선언할 것을 고려

    ```java
    Circle makeCircle(double x, double y, double radius);
    Circle makeCircle(Point center, double radius);
    ```

- 인수 목록

  - 때로는 인수 개수가 가변적인 함수도 필요

    ```java
    String.format("%s worked %.2f hours", name, hours)
      
    // 사실상 이항 함수
    public String format(String format, Object... args)
    ```

- 동사와 키워드

  - 인수의 순서와 의도를 제대로 표현하려면 좋은 함수 이름이 필요

  - 단항 함수는 함수와 인수가 동사/명사 쌍을 이루어야 함

    ```java
    write(name);  // good
    writeField(name);  // better
    ```

  - 키워드 추가(함수 이름에 인수 이름을 넣음)

    ```java
    assertEquals(expected, actual)  // good
    assertExpectedEqualsActual(expected, actual);  // better
    ```

<br>

##### 부수 효과를 일으키지 마라!

```java
// bad
public class UserValidator {
  private Cryptographer cryptographer;
  
  public boolean checkPassword(String userName, String password) {
    User user = UserGateway.findByName(userName);
    if (user != User.NULL) {
      String codedPhrase = user.getPhraseEncodedByPassword();
      String phrase = cryptographer.decrypt(codedPhrase, password);
      if ("Valid Password".equals(phrase)) {
        Session.initialize();
        return true;
      }
    }
    return false;
  }
}
```

- 부수 효과를 일으키는 것은 Session.initialize() 호출임

  (왜냐하면 checkPassword란 함수는 암호를 확인한다는 의미이므로 세션을 초기화 한다는 의미는 드러나지 않음. 그래서 함수만 보면 암호를 확인하면서 기존 세션 정보까지 지워버릴 위험에 처함)

- 개선

  - checkPasswordAndInitializeSession() 이란 이름이 더 좋음
  - 하지만 함수가 한 가지만 한다는 규칙을 위반함

- 출력 인수

  ```java
  // bad
  public void appendFooter(StringBuffer report) {}
  
  // good
  report.appendFooter();
  ```

  - 일반적으로 출력 인수는 피해야 함
  - 함수에서 상태를 변경해야 한다면 함수가 속한 객체 상태를 변경하는 방식을 택함

<br>

##### 명령과 조회를 분리하라!

```java
// bad
public boolean set(String attribute, String value) {}
if (set("username", "unclebob")) {}

// good
if (attributeExists("username")) {
  setAttribute("username", "unclebob");
}
```

- 함수는 뭔가를 수행하거나, 뭔가에 답하거나 둘 중 하나만 해야 함

- 위 코드처럼 조회 함수와 attribute를 설정하는 명령 함수를 나누는 것이 중요

<br>

##### 오류 코드보다 예외를 사용하라!

- 명령 함수에서 오류 코드를 반환하는 방식은 명령/조회 분리 규칙을 미묘하게 위반함. 자칫하면 if 문에서 명령을 표현식으로 사용하기 쉬운 탓

  ```java
  if (deletePage(page) == E_OK)
  ```

  - 여러 단계로 중첩되는 코드를 야기한다
  - 오류 코드를 반환하면 호출자는 오류 코드를 곧바로 처리해야 한다는 문제에 부딪힘

- 예시

  - 오류 코드

    ```java
    // bad
    if (deletePage(page) == E_OK) {
      if (registry.deleteReference(page.name) == E_OK) {
        if (configKeys.deleteKey(page.name.makeKey()) == E_OK) {
          logger.log("page deleted");
        } else {
          logger.log("configKey not deleted");
        }
      } else {
        logger.log("deleteReference from registry failed");
      }
    } else {
      logger.log("delete failed");
      return E_ERROR;
    }
    ```

  - 예외

    ```java
    // good
    try {
      deletePage(page);
      registry.deleteReference(page.name);
      configKeys.deleteKey(page.name.makeKey());
    } catch (Exception e) {
      logger.log(e.getMessage());
    }
    ```

    - 각 method에서 각기 다른 error message를 출력하도록 하기

- Try/Catch 블록 뽑아내기

  ```java
  // better
  public void delete(Page page) {
    try {
      deletePageAndAllReferences(page);
    } catch (Exception e) {
      logError(e);
    }
  }
  
  private void deletePageAndAllReferences(Page page) throws Exception {
    deletePage(page);
    registry.deleteReference(page.name);
    configKeys.deleteKey(page.name.makeKey());
  }
  
  private void logError(Exception e) {
    logger.log(e.getMessage());
  }
  ```

  - try/catch 블록은 코드 구조에 혼란을 일으키며, 정상 동작과 오류 처리 동작을 뒤섞음
  - try/catch 블록을 별도 함수로 뽑아내는 편이 더 좋음

- 오류도 한 가지 작업이다

  - 함수는 '한 가지' 작업만 해야 함. 오류 처리도 '한 가지' 작업에 속함
  - 오류 처리하는 함수도 오류만 처리해야 마땅함

- Error.java 의존성 자석(오류 코드 대신 예외를 사용하라!!!)

  ```java
  public enum Error {
    OK,
    INVALID,
    NO_SUCH,
    LOCKED,
    OUT_OF_RESOURCES,
    WAITING_FOR_EVENT;
  }
  
  public static Error isDivided(int number) throws ArithmeticException {
      if (number == 0) {
          throw new ArithmeticException(" / by zero");
          //return Error.ARITHMETIC_INVALID;
      }
      return Error.OK;
  }
  ```

  - 오류 코드를 반환한다는 이야기는, 클래스든 열거형 변수든, 어디선가 오류 코드를 정의한다는 뜻!

  - 위 클래스는 의존성 자석(magnet)
  
  - 다른 클래스에서 Error enum을 import해 사용해야 하므로(즉, Error enum이 변한다면 Error enum을 사용하는 클래스 전부를 컴파일하고 다시 배치해야 함), Error 클래스 변경이 어려워짐
  
  - 이 때, 프로그래머들은 Error 클래스 변경이 어려우므로, 새로운 오류 코드를 정의하고 싶지 않아 기존 오류 코드를 재사용함
  
  - 즉, 오류 코드 대신에 예외를 사용하면 새 예외는 Exception 클래스에서 파생되므로 재컴파일/재배치 없이도 새 예외 클래스를 추가할 수 있음(OCP)
  

<br>

##### 결론

```txt
모든 시스템은 특정 응용 분야 시스템을 기술할 목적으로 프로그래머가 설꼐한 도메인 특화 언어(Domain Specific Language)로 만들어진다. (중략) 대가(master) 프로그래머는 시스템을 (구현할) 프로그램이 아니라 (풀어갈) 이야기로 여긴다. (중략) 진짜 목표는 시스템이라는 이야기를 풀어가는 데 있다는 사실을 명심하길 바란다.
```

- 진짜 목표는 시스템이란 이야기를 풀어나가는 데 있다!
- 함수가 분명하고 정확한 언어로 깔끔하게 맞아떨어져야 이야기를 풀어가기가 쉬워진다!



## Code Example

##### bad example

```java
public static String testableHtml(PageData pageData, boolean includeSuiteSetup) throws Exception {

    WikiPage wikiPage = pageData.getWikiPage();
    StringBuffer buffer = new StringBuffer();

    if (pageData.hasAttribute("Test")) {   // pageData가 테스트 페이지인지 검사하는 로직 중복
        if (includeSuiteSetup) {  // Suite setup 페이지들을 포함하는지 검사하는 로직 중복
            WikiPage suiteSetup = PageCrawlerImpl.getInheritedPage(SuiteResponder.SUITE_SETUP_NAME, wikiPage); // inheritedPage 조회 로직 중복

            if (suiteSetup != null) {
                WikiPagePath pagePath = suiteSetup.getPageCrawler().getFullPath(suiteSetup);
                String pagePathName = PathParser.render(pagePath);  // finding path 로직 중복
                buffer.append("!include -setup .")  // build 로직 중복
                        .append(pagePathName)
                        .append("\n");
            }
        }
    }

    WikiPage setup = PageCrawlerImpl.getInheritedPage("Setup", wikiPage);
    if (setup != null) {  // setup & teardown inheritedPage 여부 검사 로직 중복
        WikiPagePath setupPath = wikiPage.getPageCrawler().getFullPath(setup);
        String setupPathName = PathParser.render(setupPath);
        buffer.append("!include -setup .")
                .append(setupPathName)
                .append("\n");
    }

    buffer.append(pageData.getContent());

    if (pageData.hasAttribute("Test")) {
        WikiPage teardown = PageCrawlerImpl.getInheritedPage("TearDown", wikiPage);

        if (teardown != null) {
            WikiPagePath tearDownPath = wikiPage.getPageCrawler().getFullPath(teardown);
            String tearDownPathName = PathParser.render(tearDownPath);
            buffer.append("\n")
                    .append("!include -teardown .")
                    .append(tearDownPathName)
                    .append("\n");
        }

        if (includeSuiteSetup) {
            WikiPage suiteTeardown = PageCrawlerImpl.getInheritedPage(SuiteResponder.SUITE_TEARDOWN_NAME, wikiPage);

            if (suiteTeardown != null) {
                WikiPagePath pagePath = suiteTeardown.getPageCrawler().getFullPath(suiteTeardown);
                String pagePathName = PathParser.render(pagePath);
                buffer.append("!include -teardown .")
                        .append(pagePathName)
                        .append("\n");
            }
        }
    }
    pageData.setContent(buffer.toString());
    return pageData.getHtml();
}
```

<br>

##### good example

```java
// refactor-1
public static String renderPageWithSetupAndTeardowns(PageData pageData, boolean isSuite) throws Exception {

    boolean isTestPage = pageData.hasAttribute("Test");

    if (isTestPage) {
        WikiPage testPage = pageData.getWikiPage();
        StringBuffer newPageContent = new StringBuffer();

        includeSetupPages(testPage, newPageContent, isSuite);
        newPageContent.append(pageData.getContent());
        includeTeardownPages(testPage, newPageContent, isSuite);
        pageData.setContent(newPageContent.toString());
    }
    return pageData.getHtml();
}

// refactor-2
// 지정된 함수 이름 아래에서 추상화 수준이 하나
public static String renderPageWithSetupAndTeardowns(PageData pageData, boolean isSuite) throws Exception {
    if (isTestPage(pageData)) {  // 페이지가 테스트 페이지인지 판단
        includeSetupAndTeardownPages(pageData, isSuite);  // 설정 페이지와 해제 페이지를 넣음
    }
    return pageData.getHtml();  // 페이지를 HTML로 렌더링
}
```

<br>

##### better example

```java
// SetupTeardownIncluder 객체는 render method만을 공개하여 내부 로직 캡슐화
// private 생성자를 이용해 인스턴스화 & 상속 제한
// Util성 클래스화
public class SetupTeardownIncluder {
    // PageData
    //  - variables: WikiPage, Test 페이지 여부
    //  - methods: getHtml(), hasAttribute(), getContent(), setContent()
    private PageData pageData;
    private boolean isSuite;
    private WikiPage testPage;
    private PageCrawler pageCrawler;
    private StringBuffer newPageContent;
		
    /* render */
    // PageData만으로 rendering(default no suite)
    public static String render(PageData pageData) throws Exception {
        return render(pageData, false);
    }
    
    // PageData & Suite 페이지 포함 여부로 rendering
    public static String render(PageData pageData, boolean isSuite) throws Exception {
        return new SetupTeardownIncluder(pageData).render(isSuite);
    }
    
    private SetupTeardownIncluder(PageData pageData) {
        this.pageData = pageData;
        testPage = pageData.getWikiPage();
        pageCrawler = testPage.getPageCrawler();
        newPageContent = new StringBuffer();
    }

    private String render(boolean isSuite) throws Exception {
        this.isSuite = isSuite;
        if (isTestPage()) {
            includeSetupAndTeardownPages();
        }
        return pageData.getHtml();
    }

    private boolean isTestPage() throws Exception {
        return pageData.hasAttribute("Test");
    }
		
    /* include setup and teardown pages with suite pages if exists */
    private void includeSetupAndTeardownPages() throws Exception {
        includeSetupPages();
        includePageContent();
        includeTeardownPages();
        updatePageContent();
    }

    private void includeSetupPages() throws Exception {
        if (isSuite) {
            includeSuiteSetupPage();
        }
        includeSetupPage();
    }

    private void includeSuiteSetupPage() throws Exception {
        include(SuiteResponder.SUITE_SETUP_NAME, "-setup");
    }

    private void includeSetupPage() throws Exception {
        include("Setup", "-setup");
    }

    private void includePageContent() throws Exception {
        newPageContent.append(pageData.getContent());
    }

    private void includeTeardownPages() throws Exception {
        includeTeardownPage();
        if (isSuite) {
            includeSuiteTeardownPage();
        }
    }

    private void includeTeardownPage() throws Exception {
        include("TearDown", "-teardown");
    }

    private void includeSuiteTeardownPage() throws Exception {
        include(SuiteResponder.SUITE_TEARDOWN_NAME, "-teardown");
    }

    private void updatePageContent() throws Exception {
        pageData.setContent(newPageContent.toString());
    }
		
    /* include method 
     *  - inheritedPage가 있을 시 build(buffer writing)
     */
    private void include(String pageName, String arg) throws Exception {
        WikiPage inheritedPage = findInheritedPage(pageName);
        if (inheritedPage != null) {
            String pagePathName = getPathNameForPage(inheritedPage);
            buildIncludeDirective(pagePathName, arg);
        }
    }

    /* find inherited page and build */
    private WikiPage findInheritedPage(String pageName) throws Exception {
        return PageCrawlerImpl.getInheritedPage(pageName, testPage);
    }

    private String getPathNameForPage(WikiPage page) throws Exception {
        WikiPagePath pagePath = pageCrawler.getFullPath(page);
        return PathParser.render(pagePath);
    }

    private void buildIncludeDirective(String pagePathName, String arg) {
        newPageContent
                .append("\n!include ")
                .append(arg)
                .append(" .")
                .append(pagePathName)
                .append("\n");
    }
}
```






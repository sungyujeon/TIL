# 함수



##### 어떤 함수가 코드 이해를 어렵게 하는가?

- 추상화 수준이 다양하다
- 코드가 너무 길다
- 중첩된 if 문이 많다
- 이상한 네이밍을 하거나 의미가 모호한 함수를 호출한다.



##### 좋은 함수란?

> 의도를 분명히 표현하는, 처음 읽는 사람이 직권적으로 파악할 수 있는 함수는 어떻게 작성하는가?

- 작은 함수, 단일 책임, 계층적 추상화, 내려가기



##### 작은 함수

- 함수는 100줄, 20줄, 더 줄여서 3-4줄까지도 줄일 수 있어야 한다

- 블록 안에 들어가는 함수는 한 줄이어야 한다

  ```java
  if (isTestPage(pageData)) {
    includeSetupAndTeardownPages(pageData, isSuite);
  }
  ```

  - 대개 if/else/while문 등에서 함수를 호출
  - 이를 통해 바깥음 감싸는 함수(enclosing function)가 작아지고, 블록 안에서 호출하는 함수 이름을 적절히 지으면 코드 이해도 쉬워짐

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

  - 해당 if문을 includeSetupsAndTeardownsIfTestPate로 변경하는 것은 같은 내용을 다르게 표현할 뿐 추상화 수준을 바꾸지는 않는 것

    ~~ifTest로 끝내도 되는데 왜 Pate라고 했을까,,~~

    

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



##### Switch

> Switch문은 작게 만들기 어렵다! 하지만 case 분기를 최소화 하기 위해 노력해야 한다. 다형적 객체를 생성하는 코드에서만 가급적 사용하라.

```java
// bad
// 새 직원 유형을 추가하면 함수가 길어질 것이고,
// ?????
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



##### 서술적인 이름을 사용하라!

- `testableHtml` -> `SetupTeardownIncluder.render()`로 변경해 함수가 하는 일을 좀 더 잘 표현하게 함
- 길고 서술적인 이름이 짧고 어려운 이름보다, 서술적인 주석보다 좋음
- 서술적인 이름을 사용하면 개발자도 설계가 뚜렷해지므로 코드를 개선하기 쉬워짐



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

- 
# 유닛 테스트

- [TDD 세 가지 법칙](#TDD-세-가지-법칙)
- [깨끗한 테스트 코드 유지하는 이유](#깨끗한-테스트-코드-유지하는-이유)
- [깨끗한 테스트 코드](#깨끗한-테스트-코드)
  - 도메인 특화 언어
  - 이중 표준
- [테스트 당 assert 하나](#테스트-당-assert-하나)
  - 테스트 개념마다 한 개념만 테스트하라
- [F.I.R.S.T](#F.I.R.S.T)
  - Fast / Independent / Repeatable / Self-Validating / Timely



### TDD 세 가지 법칙

- 실패하는 단위 테스트를 작성할 때까지 실제 코드를 작성하지 않는다
- 컴파일은 실패하지 않으면서 실행에 실패하는 정도로만 단위 테스트를 작성한다
- 현재 실패하는 테스트를 통과할 정도로만 실제 코드를 작성한다



### 깨끗한 테스트 코드 유지하는 이유

> 테스트 코드는 실제 코드 못지 않게 중요하다!

- 코드에 유연성, 유지보수성, 재사용성을 제공하는 것이 단위 테스트
  - 테스트 케이스가 있으면 변경이 두렵지 않음. 반대로 테스트 케이스가 없다면 모든 변경이 잠정적인 버그
- 실제 코드를 점검하는 자동화된 단위 테스트 슈트는 설계와 아키텍처를 최대한 깨끗하게 보존하는 열쇠



### 깨끗한 테스트 코드

- 깨끗한 테스트 코드를 위해서는 가독성이 실제 코드에서 보다도 매우 중요

- bad case

  ```java
  public void testGetPageHierarchyAsXmlDoesntContainSymbolicLinks() throws Exception
  {
    WikiPage pageOne = crawler.addPage(root, PathParser.parse("PageOne"));
    crawler.addPage(root, PathParser.parse("PageOne.ChildOne"));
    crawler.addPage(root, PathParser.parse("PageTwo"));
  
    pageData data = pageOne.getData();
    WikiPageProperties properties = data.getProperties();
    WikiPageProperty symLinks = properties.set(SymbolicPage.PROPERTY_NAME);
    symLinks.set("SymPage", "PageTwo");
    pageOne.commit(data);
  
    request.setResource("root");
    request.addInput("type", "pages");
    Responder responder = new SerializedPageResponder();
    SimpleResponse response = (SimpleResponse) responder.makeResponse(new FitNesseContext(root), request);
    String xml = response.getContent();
  
    assertEquals("text/xml", response.getContentType());
    assertSubString("<name>PageOne</name>", xml);
    assertSubString("<name>PageTwo</name>", xml);
    assertSubString("<name>PageChildOne</name>", xml);
    assertNotSubString("SymPage", xml);
  }
  
  public void testGetPageHierarchyAsXml() throws Exception
  {
    crawler.addPage(root, PathParser.parse("PageOne"));
    crawler.addPage(root, PathParser.parse("PageOne.ChildOne"));
    crawler.addPage(root, PathParser.parse("PageTwo"));
  
    request.setResource("root");
    request.addInput("type", "pages");
    Responder responder = new SerializedPageResponder();
    SimpleResponse response = (SimpleResponse) responder.makeResponse(new FitNesseContext(root), request);
    String xml = response.getContent();
  
    assertEquals("text/xml", response.getContentType());
    assertSubString("<name>PageOne</name>", xml);
    assertSubString("<name>PageTwo</name>", xml);
    assertSubString("<name>PageChildOne</name>", xml);
  }
  
  public void testGetDataAsHtml() throws Exception 
  {
    crawler.addPage(root, PathParser.parse("TestPageOne"), "test page");
  
    request.setResource("TestPageOne");
    request.addInput("type", "data");
    Responder responder = new SerializedPageResponder();
    SimpleResponse response = (SimpleResponse) responder.makeResponse(new FitNesseContext(root), request);
    String xml = response.getContent();
  
    assertEquals("text/xml", response.getContentType());
    assertSubString("test page", xml);
    assertSubString("<Test", xml);
  }
  ```

  - 문제점
    - pagePath는 crawler가 사용하는 객체. 이 코드는 테스트와 무관하며 테스트 코드의 의도만 흐린다
    - responder 객체를 생성하는 코드와 response를 수집해 변환하는 코드도 잡음에 불과함
    - resource와 인수에서 요청 URL을 만드는 코드도 어설픔

- good case

  ```java
  public void testGetPageHierarchyAsXml() throws Exception 
  {
    makepages("PageOne", "PageOne.ChildOne", "PageTwo");
  
    submitRequest("root", "type:pages");
  
    assertResponseIsXML();
    assertResponseContains("<name>PageOne</name>", "<name>PageTwo</name>", "<name>ChildOne</name>");
  }
  
  public void testSymbolicLinksAreNotInXmlPageHierarchy() throws Exception 
  {
    WikiPage page = makePage("PageOne");
    makePages("PageOne.ChildOne", "PageTwo");
  
    addLinkTo(page, "PageTwo", "SymPage");
  
    assertResponseIsXML();
    assertResponseContains("<name>PageOne</name>", "<name>PageTwo</name>", "<name>ChildOne</name>");
    assertResponseDoesNotContain("SymPage");
  }
  
  public void testGetDataAsXml() throws Exception {
    makePageWithContent("TestPageOne", "test page");
    submitRequest("TestPageOne", "type:data");
  
    assertResponseIsXML();
    assertResponseContains("test page", "<Test");
  }
  ```

- 도메인에 특화된 언어

  - 위 good case는 도메인에 특화된 언어(DSL)로 테스트 코드를 구현하는 기법을 보여줌
  - 흔히 쓰는 시스템 조작 API를 사용하는 대신 API 위에다 함수와 유틸리티를 구현한 후 그 함수와 유틸리티를 사용하므로 테스트 코드를 짜기도 읽기도 쉬워짐
  - 이렇게 구현한 함수와 유틸리티는 테스트 코드에서 사용하는 특수 API가 됨. 즉, 테스트를 구현하는 당사자와 나중에 테스트를 읽어볼 독자를 도와주는 테스트 언어

- 이중 표준

  - 테스트 API 코드에 적용하는 표준은 실제 코드에 적용하는 표준과 다름

  - 단순, 간결, 풍부한 표현이 필요하지만 실제 코드만큼 효율적일 필요는 없음

  - 사례

    ```java
    // bad
    @Test
    public void turnOnLoTempAlarmAtThreadhold() throws Exception {
      hw.setTemp(WAY_TOO_COLD);
      controller.tic();
      assertTrue(hw.heaterState);
      assertTrue(hw.blowerState);
      assertTrue(hw.collerState);
      assertTrue(hw.hiTempAlarm);
      assertTrue(hw.loTempAlarm);
    }
    
    // good
    @Test
    public void turnOnCoolerAndBlowerIfTooHot() throws Exception {
      tooHot();
      assertEquals("hBchl", hw.getState());
    }
    
    @Test
    public void turnOnHeaterAndBlowerIfTooCold() throws Exception {
      tooCold();
      assertEquals("HBchl", hw.getState());
    }
    
    @Test
    public void turnOnHiTempAlarmAtThreshold() throws Exception {
      wayTooHot();
      assertEquals("hBCHl", hw.getState());
    }
    
    @Test
    public void turnOnLoTempAlarmAtThreshold() throws Exception {
      wayTooCold();
      assertEquals("HBchL", hw.getState());
    }
    
    public String getState() {
      String state = "";
      state += heater ? "H" : "h";
      state += blower ? "B" : "b";
      state += cooler ? "C" : "c";
      state += hiTempAlarm ? "H" : "h";
      state += loTempAlarm ? "L" : "l";
      return state;
    }
    ```

    - tic 함수는 wayTooCold 함수 안에 숨김
    - assertEquals 첫번째 인자로 넘어가는 문자열은 '그릇된 정보를 피하라'는 규칙 위반이지만, 의미만 안다면 문자열에 따라 해석할 수 있고, 결과를 빠르게 판단할 수 있음

    - 효율을 높이려면 StringBuffer가 더 적합하지만, 테스트에서 효율성을 고려하지 않는다
      - 테스트 환경에서는 자원이 제한적일 가능성이 낮으므로 상관 없음
      - 이중 표준의 본질: 실제 환경에서는 효율성을 고려해야 하지만 테스트 환경에서는 문제 없는 방식



### 테스트 당 assert 하나

- Assert 문이 단 하나인 함수는 결론이 하나라서 코드를 이해하기 쉽고 빠름

- 사례

  ```java
  public void testGetPageHierarchyAsXml() throws Exception {
    givenPages("PageOne", "PageOne.ChildOne", "PageTwo");
  
    whenRequestIsIssued("root", "type:pages");
  
    thenResponseShouldBeXML();
  }
  public void testGetPageHierarchyHasRightTags() throws Exception {
    givenPages("PageOne", "PageOne.ChildOne", "PageTwo");
  
    whenRequestIsIssued("root", "type:pages");
  
    thenResponseShouldContain("<name>PageOne</name>", "<name>PageTwo</name>", "<name>ChildOne</name>");
  }
  ```

  - Given-when-then 관례 사용하면 테스트 코드를 읽기 쉬워지나, 테스트를 분리하면 중복되는 코드가 많아짐

  - template method pattern을 사용하면 중복을 제거할 수 있음
    - case1: given/when을 부모 클래스에 두고 then을 자식 클래스에 둠
    - case2: 독자적인 클래스를 만들어 @Before 함수에 given/when 부분을 넣고 @Test 함수에 then을 넣음
    - 하지만 이보다 위 good case처럼 assert문을 여럿 쓰는 것이 좋음

- 여러 assert문을 쓸 수도 있지만, assert문 갯수는 최대한 줄여야 좋음

- 테스트 함수마다 한 개념만 테스트하라

  ```java
  public void testAddMonths() {
    SerailDate d1 = SerialDate.createInstance(31, 5, 2004);
  
    SerialDate d2 = SerailDate.addMonths(1, d1);
    assertEquals(30, d2.getDayOfMonth());
    assertEquals(6, d2.getMonth());
    assertEqauls(2004, d2.getYYYY());
  
    SerialDate d3 = SerailDate.addMonths(2, d1);
    assertEquals(31, d3.getDayOfMonth());
    assertEquals(7, d3.getMonth());
    assertEqauls(2004, d3.getYYYY());
  
    SerialDate d4 = SerialDate.addMonths(1, SerialDate.addMonths(1, d1));
    assertEquals(30, d4.getDayOfMonth());
    assertEqauls(7, d4.getMonth());
    assertEqauls(2004, d4.getYYYY());
  }
  ```

  - assert문을 여러개를 쓰는 것이 중요한 것이 아니라, 장황하게 여러 개념을 테스트한다는 것이 문제



### F.I.R.S.T

##### Fast

- 테스트는 빨리 실행되어야 함
- 테스트가 느리면 자주 돌릴 엄두를 못내고, 이는 초반에 문제를 찾아내 고치지 못하게 하고, 코드를 마음껏 정리하지 못해 코드 품질이 망가질 가능성이 높음



##### Independent

- 각 테스트는 서로 의존하면 안됨
- 각 테스트는 다른 테스트에 의존하지 않게 해서 어떤 순서로 실행해도 괜찮아야 함
- 테스트를 서로에게 의존하게 하면 하나가 실패할 때 나머지도 잇달아 실패하므로 원인 진단이 어려워지고 후반 테스트가 찾아내야 할 결함이 숨겨짐



##### Repeatable

- 테스트는 어떤 환경에서도 반복 가능해야 함
- 실제 환경, QA 환경, offline 환경에서도 실행할 수 있어야 함



##### Self-Validating

- 테스트는 boolean 값으로 결과를 내야 함(성공 또는 실패)



##### Timely

- 테스트는 적시에 작성해야 함
- 단위 테스트는 테스트하려는 실제 코드를 구현하기 직전에 구현



### 기타

- 테스트 라이브러리

  - JUnit: for unit test
  - Mockito: for mocking dependencies
  - Wiremock: for stubbing out external services
  - Pact: for writing CDC tests
  - Selenium: for writing UI-driven end-to-end tests
  - REST-assured: for writing REST API-driven end-to-end tests

- Test Double

  > 테스트에서 원본 객체를 대신하는 객체

  - Stub
    - 원래의 구현을 최대한 단순한 것으로 대체한다
    - 테스트를 위해 프로그래밍된 항목에만 응답한다
  - Spy
    - Stub의 역할을 하면서 호출에 대한 정보를 기록한다
    - 이메일 서비스에서 메시지가 몇 번 전송되었는지 확인할 때
  - Mock
    - 행위를 검증하기 위해 가짜 객체를 만들어 테스트하는 방법
    - 호출에 대한 동작을 프로그래밍할 수 있다
    - Stub은 상태를 검증하고 Mock은 행위를 검증한다

- Given-when-then 패턴 사용
  - given: 테스트에 대한 pre-condition
  - when: 테스트하고 싶은 동작 호출
  - then: 테스트 결과 확인
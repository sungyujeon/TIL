# 형식 맞추기

> [형식을 맞추는 목적](#형식을-맞추는-목적)
>
> [적절한 행 길이를 유지하라](#적절한-행-길이를-유지하라)
>
> [가로 형식 맞추기](#가로-형식-맞추기)
>
> [팀 규칙](#팀-규칙)



##### 형식을 맞추는 목적

- 코드 형식은 의사소통의 일환
- 의사소통은 전문 개발자의 일차적인 의무
- 맨 처음 잡아놓은 구현 스타일과 가독성 수준은 유지보수 용이성과 확장성에 계속 영향을 미친다



##### 적절한 행 길이를 유지하라

> 200줄 정도의 파일로도 큰 시스템을 구축할 수 있음
>
> 반드시 지켜야 할 엄격한 규칙은 아니지만 일반적으로 큰 파일보다 작은 파일이 이해하기 쉬움

- 개념은 빈 행으로 분리하라

  ```java
  // bad
  package fitnesse.wikitext.widgets;
  import java.util.regex.*;
  public class BoldWidget extends ParentWidget {
      public static final String REGEXP = "'''.+?'''";
      private static final Pattern pattern = Pattern.compile("'''(.+?)'''"), Pattern.MULTILINE + Pattern.DOTALL);
      public BoldWidget(parentWidget parent, String text) throws Exception {
          super(parent);
          Matcher match = pattern.matcher(text);
          match.find();
          addChildWidgets(match.group(1));
      }
  }
  
  // good
  package fitnesse.wikitext.widgets;
  
  import java.util.regex.*;
  
  public class BoldWidget extends ParentWidget {
      public static final String REGEXP = "'''.+?'''";
      private static final Pattern pattern = Pattern.compile("'''(.+?)'''"), 
          Pattern.MULTILINE + Pattern.DOTALL
      );
  
      public BoldWidget(parentWidget parent, String text) throws Exception {
          super(parent);
          Matcher match = pattern.matcher(text);
          match.find();
          addChildWidgets(match.group(1));
      }
  }
  ```

  - 일련의 행 묶음은 완결된 생각 하나를 표현하고, 생각 사이에는 빈 행을 넣어 분리해야 함

- 세로 밀집도

  ```java
  // bad
  // 의미 없는 주석으로 두 인스턴스 변수를 떨어뜨려 놓음
  public class ReporterConfig {
      /**
       * 리포터 리스너의 클래스 이름
       */
      private String m_className;
  
      /**
       * 리포터 리스너의 속성
       */
      private List<Property> m_properties = new ArrayList<Property>();
  }
  
  // good
  public class ReporterConfig {
      private String m_className;
      private List<Property> m_properties = new ArrayList<Property>();
  }
  ```

  - 세로 밀집도는 연관성을 의미함
  - 서로 밀접한 코드 행은 세로로 가까이 놓여야 함

- 수직거리

  ```java
  private static void readPreferences() {
      InputStream is = null;
      try {
          is = new FileInputStream(getPreferencesFile());
          setPreferences(new Properties(getPreferences()));
          getPreferences().load(is);
      } catch (IOException e) {
          if (is != null) {
              is.close();
          }
      }
  }
  ```

  - 서로 밀접한 개념은 세로로 가까이 두어야 함
  - `p.376 G10: 수직 분리`
    - 변수와 함수는 사용되는 위치에 가깝게 정의
    - 지역 변수는 처음으로 사용하기 직전에 선언하며 수직으로 가까운 곳에 위치해야 함
    - 비공개 함수는 처음으로 호출한 직후에 정의함(처음으로 호출되는 위치를 찾은 후 조금만 아래로 내려가면 쉽게 눈에 띄어야 함)

- 개념적 유사성

  - 어떤 코드는 서로를 끌어당김(개념적인 친화도가 높다는 뜻)
  - 친화도가 높은 요인
    - 한 함수가 다른 함수를 호출해 생기는 직접적인 종속성
    - 변수와 그 변수를 사용하는 함수
    - 비슷한 동작을 수행하는 함수들

- 세로 순서

  - 일반적으로 함수 호출 종속성은 아래 방향으로 유지(즉, 호출되는 함수를 호출하는 함수보다 나중에 배치. 이를 통해 소스 코드 모듈이 고차원에서 저차원으로 자연스럽게 내려감)



##### 가로 형식 맞추기

- 한 행의 길이

  - 한 행은 가로로 얼마나 길어야 하는지에 대한 형식

  - 100~120자 제한이 나쁘지 않고, 그 이상은 주의부족
    - Google Java Style Guide
      - Column limit: 100

  - Naver Hackday Java Convention
    - line length: 120

- 가로 공백과 밀집도

  ```java
  private void measureLine(String line) {
      lineCount++;
      int lineSize = line.length();  // 할당연산자 강조를 위해 앞 뒤 공백
      totalChars += lineSize;
      lineWidthHistogram.addLine(lineSize, lineCount);  // 쉼표를 사용해 인수 분리
      recordWidestLine(lineSize); // 함수와 인수의 밀접함을 표현하기 위해 붙임
  }
  
  -b + Math.sqrt(determinant)) / (2*a);  // 연산자 우선순위 강조
  ```

  - 밀접한 개념과 느슨한 개념을 표현

- 가로 정렬

  ```java
  // bad
  public class FitNesseExpediter implements ResponseSender {
      private Socket          socket;
      private InputStream     input;
      private OutputStream    output;
      private long            requestProgress;
    
    	this.context = context;
      socket       = s;
  }
  
  // good
  public class FitNesseExpediter implements ResponseSender {
      private Socket socket;
      private InputStream input;
      private OutputStream output;
      private long requestProgress;
    
      this.context = context;
      socket = s;
  }
  ```

  - 크게 유용하지 못함
  - 변수 유형은 무시하고 변수 이름부터 읽을 수도 있음
  - 대다수의 IDE가 formatting을 통해 가로 정렬을 무시함

- 들여쓰기

  - 범위(scope)로 이뤄진 계층 표현을 위해 코드를 들여쓰는 형식을 맞춰라

  - 들여쓰기를 무시하지 마라

    ```java
    // bad
    public String render() throws Exception { return ""; }
    
    // good
    public String render() throws Exception {
        return "";
    }
    ```

- 가짜 범위

  ```java
  while (dis.read(buf, 0, readBufferSize) != -1)
  ;
  ```

  - 때때로 사용하는 빈 while, for 문의 세미콜론(;)은 새 행에 들여써라



##### 팀 규칙

- 팀에 속한다면 자신이 선호해야 할 규칙은 바로 팀 규칙이다!
- 코드 자체가 최고의 구현 표준 문서가 되게 하라!


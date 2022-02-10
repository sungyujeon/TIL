# 경계



### 외부 코드 사용하기

- 외부 코드 사용의 경계

  - 패키지 제공자나 프레임워크 제공자는 적용성을 최대한 넓히려 애쓴다

  - 반면에 사용자는 자신의 요구에 집중하는 인터페이스를 바란다

  - 이런 긴장으로 인해 시스템 경계에는 문제가 생길 소지가 많다

- 사례

  - java.util.Map interface

    ```java
    clear() void - Map
    containsKey/(Object key) boolean
    containsValue(Object value) boolean
    entrySet() Set - Map
    equals(Object o) - Map
    get(Object key) Object - Map
    getClass() Class<? extends Obeject> - Object
    hashCode() int - Map
    isEmpty() boolean - Map
    keySet() Set - Map
    notify() void - Object
    // ...
    ```

  - Map interface가 변할 경우 수정할 코드가 많아진다는 문제점

    ```java
    // bad
    // Map이 반환하는 Object를 올바른 유형으로 변환할 책임은 Map을 사용하는 클라이언트에게 있음
    Map sensors = new HashMap();
    Sensor s = (Sensor)sensors.get(sensorId);
    
    // not bad
    // Generics를 사용해 코드 가독성을 높임
    // 여전히 Map<String, Sensor>가 사용자에게 필요하지 않은 기능까지 제공한다는 문제는 해결하지 못함
    // Map interface가 변할 경우 수정할 코드가 많아짐
    Map<String, Sensor> sensors = new HashMap<Sensor>();
    Sensor s = sensors.get(seonsorId);
    
    // good
    public class Sensors {
        private Map sensors = new HashMap();
        
        public Sensor getById(String id) {
            return (Sensor) sensors.get(id);
        }
    }
    ```

    - 경계 인터페이스인 Map을 Sensors 안으로 숨김
    - 따라서 Map 인터페이스가 변하더라도 나머지 프로그램에는 영향을 미치지 않음
    - Sensors 클래스는 프로그램에 필요한 인터페이스만 제공
      - Sensors 클래스는 설계 규칙과 비즈니스 규칙을 따르도록 강제함
    - 즉, Map을 사용할 때마다 위와 같이 캡슐화 하라는 말이 아니라, 경계 인터페이스를 이용할 때는 이를 이용하는 클래스나 클래스 계열 밖으로 노출되지 않도록 주의해야 함

##### 

##### 경계 살피고 익히기

> 외부에서 가져온 패키지를 사용하고 싶다면 어떻게 시작하는 것이 좋은가?
>
> 외부 패키지 테스트가 사용자의 책임은 아니지만, 사용자 스스로를 위해 사용할 코드를 테스트 하는 편이 바람직함

- 학습 테스트

  - 외부 코드를 익히기도 어렵고, 통합하기도 어려움
  - 외부 코드를 그대로 호출하기 보단, 먼저 간단한 테스트 케이스를 작성해 외부 코드를 익히는 것을 고려해야 함

  - 프로그램에서 사용하려는 방식대로 외부 API를 호출(통제된 환경에서 API를 제대로 이해하는지를 확인하는 셈)
  - 학습 테스트는 API를 사용하는 목적에 초점을 맞춤

- 사례(log4j)

  ```java
  // 1. Appender가 필요하다는 오류 발견
  @Test
  public void testLogCreate() {
      Logger logger = Logger.getLogger("MyLogger");
      logger.info("hello");
  }
  
  // Appender에 출력 스트림이 없다는 사실 발견
  @Test
  public void testLogCreate() {
      Logger logger = Logger.getLogger("MyLogger");
      ConsoleAppender appender = new ConsoleAppender();
      logger.addAppender(appender);
      logger.info("hello");
  }
  
  // 정상작동
  @Test
  public void testLogCreate() {
      Logger logger = Logger.getLogger("MyLogger");
      logger.removeAllAppenders();
      logger.addAppender(new ConsoleAppender(new Patternlayout("%p %t %m%n"), ConsoleAppender.SYSTEM_OUT));
      logger.info("hello");
  }
  ```

  ```java
  // 단위 테스트 케이스로 분리
  public class LogTest {
      private Logger logger;
      
      @Before
      public void initialize() {
          logger = Logger.getLogger("logger");
          logger.removeAllAppenders();
          Logger.getRootLogger().removeAllAppenders();
      }
      
      @Test
      public void basicLogger() {
          BasicConfigurator.configure();
          logger.info("basicLogger");
      }
      
      @Test
      public void addAppenderWithStream() {
          logger.addAppender(new ConsoleAppender(new PatternLayout("%p %t %m%n"), ConsoleAppender.SYSTEM_OUT));
          logger.info("addAppenderWithStream");
      }
      @Test
      public void addAppenderWithoutStream() {
          logger.addAppender(new ConsoleAppender(newPatternLayout("%p %t %m%n")));
          logger.info("addAppenderWithoutStream");
      }
  }
  ```

  - 간단한 테스트를 해보며 학습을 통해 단위 테스트로 쪼개고, 이를 다시 캡슐화 하여 외부 API를 실제로 호출하는 곳에서는 경계 인터페이스에 대한 자세한 내용을 몰라도 되게 함

- 학습 테스트는 공짜 이상이다

  - 외부 API가 업데이트 되면 학습 테스트를 돌려 차이가 있는지 확인함

  - 외부 API 새 버전이 나올 때마다 호환되지 않을 가능성이 있는데, 학습 테스트를 통해 이를 잡아낼 수 있음

  - 이러한 경계 테스트가 있다면 외부 API의 새 버전으로 이전하기 쉬워짐!

    > 새 버전이 나올 때마다 문제가 생긴다면? 
    >
    > `낡은 버전을 필요 이상으로 오랫동안 사용하려는 유혹에 빠지기 쉽다`



### 아직 존재하지 않는 코드를 사용하기

- 경계와 관련해 또 다른 유형은 아는 코드와 모르는 코드를 분리하는 경계다

- 사례(Transmitter 하위 시스템)

  - 전제

    ```txt
    Transmitter 하위 시스템에 대한 지식이 거의 없음
    해당 시스템을 책임진 사람들은 인터페이스도 정의하지 못하는 상태
    ```

  - 진행

    ```txt
    프로젝트 지연을 원치 않았기에 Transmitter 하위 시스템과 먼 부분부터 작업 시작
    해당 module에서 원하는 기능 정의
      - 지정한 주파수를 이용해 이 스트림에서 들어오는 자료를 아날로그 신호로 전송하라
    구현을 나중으로 미룸
    ```

  - 결론1

    ```txt
    자체적으로 Transmitter interface 정의
    해당 인터페이스에 transmit 메서드 추가
      - transmit(frequency, stream)
      - 즉! 주파수를 이용해 stream에서 들어오는 자료를 아날로그 신호로 전송하는 메서드 추가
    ```

  - 결론2

    ![](/Users/sungyujeon/TIL/cleancode/src/transmitter-architecture.png)

    - 프로그래머가 원하는 인터페이스를 구현하면 인터페이스를 전적으로 통제한다는 장점을 획득
    - 코드 가독성도 높아지고 코드 의도도 분명해짐
    - Transmitter API에서 CommunicationsController 완전 분리
    - Transmitter Adapter 구현
      - Apdapter 패턴으로 future Transmitter API 사용을 캡슐화하여 API가 바뀔 때 수정할 코드를 해당 클래스로 모음
    - CommunicationController 테스트 가능
      - FakeTransmitter 클래스를 만들어 테스트



### 깨끗한 경계

- 경계에 위치하는 코드는 깔끔히 분리해야 한다

- 원하는 기능이 돌아간다는 '기대치'를 정의하는 테스트 케이스도 작성해야 한다

- 통제가 불가능한 외부 패키지에 의존하기 보단, 통제가 가능한 자신의 코드에 의존하는 편이 훨씬 좋다

- 즉, 외부 패키지를 호출하는 코드를 가능한 줄여 경계를 관리해야 한다!

  - 앞서 설명했듯이 새로운 클래스로 경계를 감싸거나, Adapter 패턴을 사용하라

  - 이를 통해 코드 가독성 높아지고, 경계 인터페이스를 사용하는 일관성이 높아지고, 외부 패키지가 변했을 때 변경할 코드도 줄어듬
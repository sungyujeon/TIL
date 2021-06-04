## API(Application Programming Interface)

- 프로그래밍 언어가 제공하는 기능을 수행할 수 있게 만든 인터페이스

  (어플리케이션과 프로그래밍으로 소통하는 방법)

- 프로그래밍을 활용해서 할 수 있는 어떤 것

- CLI, GUI는 각각 명령줄과 그래픽(아이콘)을 통해서 특정 기능을 수행하는 것이며 API는 프로그래밍을 통해 그 일을 수행할 수 있음



## Web API

- 웹 어플리케이션 개발에서 다른 서비스에 요청을 보내고 응답을 받기 위해 정의된 명세
- 현재 웹 개발은 추가로 직접 모든 것을 개발하지 않고 여러 Open API를 가져와서 활용하는 추세
- ex) 구글, 카카오 지도 API, 우편번호, 도로명, 지번 소 검색 API 등



### REST(Representational State Transfer)

##### 개요

- 웹 설계 상의 장점을 최대한 활용할 수 있는 아키텍쳐 방법론
- 네트워크 아키텍쳐 원리의 모음
  - 자원을 정의
  - 자원에 대한 주소를 지정하는 방법
- REST 원리를 따르는 시스템 혹은 API를 RESTful API라고 함



##### 구성

자원 / 행위 / 표현

- 자원(URI)

  - URI(Uniform REsource Identifier / 통합 자원 식별자)

  - 인터넷의 자원을 나타내는 유일한 주소

  - 인터넷에서 자원을 식별하거나 이름을 지정하는 데 사용되는 간단한 문자열

  - 하위 개념 : URL URN

    - URL(Uniform Resource Locator / 통합 자원 위치)

      네트워크 상에 자원(리소스)이 어디 있는지(주소)를 알려주기 위한 약속

      자원은 HTML 페이지, CSS 문서, 이미지 등이 될 수 있음

      '웹 주소' 또는 '링크'라고도 불림

    - URN(Uniform Resource Name / 통합 자원 이름)

      URL과 달리 자원의 위치에 영향을 받지 않는 유일한 이름 역할(독립적 이름)

      자원의 이름이 변하지 않는 한 자원의 위치를 이곳 저곳 옮겨도 문제없이 동작

      ex) ISBN

  - URI 구조

    - http://localhost:3000/posts/3?q=http/#containers

      (Scheme or Protocol / IP : Port / Path ? Query /# fragment)

    - 표현

      URI 가독성 : 밑줄(_)이 아닌 하이픈(-)을 사용

      소문자 사용 : 대소문자에 따라 다른 자원으로 인식

      파일 확장자는 포함시키지 않음

- 행위(HTTP Method)

  - HTTP(HyperText Transfer Protocol)

    - HTML 문서와 같은 자원들을 가져올 수 있도록 해주는 프로토콜(규칙, 약속)

    - 웹에서 이루어지는 모든 데이터 교환의 기초

    - 클라이언트 - 서버 프로토콜

    - 요청(requests) : 클라이언트(브라우저)에 의해 전송되는 메시지

    - 응답(responses) : 서버에서 응답으로 전송되는 메시지

    - 특징

      - 비연결지향(connectionless) : 서버는 응답 후 접속을 끊음

      - 무상태(stateless) : 접속이 끊어지면 클라이언트와 서버 간 통신이 종료되며 상태 저장되지 않음

  - HTTP Method

    - 자원에 대한 행위
    - 즉, HTTP는 HTTP Method를 정의하여 주어진 자원에 수행하길 원하는 행동을 나타냄
    - 의미론적으로 행위를 규정하기 때문에 '실제 그 행위 자체가 수행됨'을 보장하진 않음
    - HTTP verbs 라고도 함

  - HTTP Method 종류

    - GET : 특정 자원을 표시하며, 오직 데이터를 받기만 함
    - POST : 서버로 데이터를 전송하며 서버에 변경사항을 만듦
    - PUT : 요청한 주소의 자원을 수정
    - DELETE : 지정한 자원을 삭제

- 표현(Representations)

  - JSON(Javascript Object Notation)
    - lightweight data-interchange format
    - 자바스크립트 객체 문법을 따르며, 구조화된 데이터를 표현하기 위한 문자 기반 데이터 포맷
    - 일반적으로 웹 어플리케이션에서 클라이언트로 데이터를 전송할 때 사용
    - 자바스크립트 구문에 기반을 두고 있지만 차이점이 있으니 주의



##### 핵심 규칙

1. URI는 정보의 자원을 표현해야 한다.
2. 자원에 대한 (어떠한)행위는 HTTP Method로 표현한다.




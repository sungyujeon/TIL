# HTTP



## 1.1 HTTP: 인터넷의 멀티미디어 배달부

HTTP는 전 세계의 웹 서버로부터 수십억 개의 대량의 정보를 빠르고, 간편하고, 정확하게 사람들의 PC에 설치된 웹브라우저로 옮겨준다.

HTTP는 신뢰성 있는 데이터 전송 프로토콜을 사용하기 때문에, 데이터가 전송 중 손상되거나 꼬이지 않는 것을 보장한다.

------

## 1.2 웹 클라이언트와 서버

웹 콘텐츠는 웹 서버에 존재한다. 웹 서버는 인터넷의 데이터를 저장하고, HTTP 클라이언트가 요청한 데이터를 제공한다.

클라이언트는 서버에게 HTTP 요청을 보내고, 서버는 요청된 데이터를 HTTP 응답으로 돌려준다.

가장 흔한 클라이언트는 웹 브라우저다. 웹 브라우저는 서버에세 HTTP 객체를 요청하고 사용자의 화면에 보여준다. 서버는 요청 받은 객체를 찾고, 성공했다면 그것의 타입, 길이 등의 정보와 함께 HTTP 응답에 실어서 클라이언트에게 보낸다.

------

## 1.3 리소스

웹 서버는 웹 리소스를 관리하고 제공한다. 웹 리소스는 웹 콘텐츠의 원천이다.

가장 단순한 웹 리소스는 웹 서버 파일 시스템의 **정적 파일(static file)**이다.

- 정적 파일은 텍스트 파일, HTML 파일, 마이크로소프트 워드 파일, 어도비 아크로뱃 파일, JPEG 이미지 파일, AVI 동영상 파일, 그 외 모든 종류의 파일을 포함한다.

리소스가 반드시 정적 파일이어야 할 필요는 없다. 리소스는 요청에 따라 콘텐츠를 생산하는 프로그램이 될 수도 있다.

- 이들 **동적 콘텐츠 리소스**는 사용자가 누구인지, 어떤 정보를 요청했는지, 몇 시인지에 따라 다른 콘텐츠를 생성한다.
- 카메라에서 라이브 영상을 가져와서 보여주거나, 주식 거래, 부동산 DB 검색, 온라인 쇼핑몰에서 선물 구입을 할 수 있게 해줄 수도 있다.

요컨대, 어떤 종류의 콘텐츠 소스도 리소스가 될 수 있다.

- 기업 판매 예측 스프레드시트, 지역 공공 도서관의 서가를 탐색하는 웹 게이트웨이, 인터넷 검색엔진 등

### 1.3.1 미디어 타입

인터넷은 수천 가지의 데이터 타입을 다루기 때문에, HTTP는 웹에서 전송되는 객체 각각에 신중하게 MIME 타입이라는 데이터 포맷 라벨을 붙인다.

- MIME(Multipurpose Internet Mail Extensions, 다목적 인터넷 메일 확장)
- MIME는 원래 각기 다른 전자메일 시스템 사이에서 메시지가 오갈 때 겪는 문제점을 해결하기 위해 설계됨
- MIME가 이메일에서 워낙 잘 동작했기 때문에 HTTP에서도 **멀티미디어 콘텐츠를 기술하고 라벨을 붙이기 위해 채택**하였다.

웹 서버는 모든 HTTP 객체 데이터에  MIME 타입을 붙인다. 웹브라우저는 서버로부터 객체를 돌려받을 때, 다룰 수 있는 객체인지 MIME 타입을 통해 확인한다.

MIME 타입은 사선('/')으로 구분된 주 타입(primary object type)과 부 타입(specific subtype)으로 이루어진 문자열 라벨이다.

- text/html → HTML로 작성된 텍스트 문서
- text/plain → plain ASCII 텍스트 문서
- image/jpeg → JPEG 이미지
- image/gif → GIF 이미지
- video/quicktime → 애플 퀵타임 동영상
- application/vnd.ms-powerpoint → 마이크로소프트 파워포인트 프레젠테이션

### 1.3.2 URI

웹 서버 리소스는 각자 이름을 가지고 있기 때문에, 클라이언트는 관심 있는 리소스를 지목할 수 있다. 서버 리소스 이름은 통합 자원 식별자(Uniform Resource Identifier), 혹은 URI로 불린다.

URI는 정보 리소스를 고유하게 식별하고 위치를 지정할 수 있다. HTTP는 주어진 URI로 객체를 찾아온다. URI에는 두 가지가 있는데, URL과 URN이라는 것이다.

**URL은 프로토콜, 서버, 리소스를 명시한다.**

http://www.joes-hardware.com/specials/saw-blade.gif

- http:// → HTTP 프로토콜을 사용하라
- [www.joes-hardware.com](http://www.joes-hardware.com) → 이 주소로 이동하라
- /specials/saw-blade.gif → /special/saw-blade.gif 라고 불리는 리소스를 가져와라

### 1.3.3 URL

통합 자원 지시자(Uniform Resource Locator; URL)는 리소스 식별자의 가장 흔한 형태다.

- 특정 서버의 한 리소스에 대한 **구체적인 위치**를 서술한다.
- 리소스가 정확히 어디에 있고 어떻게 접근할 수 있는지 분명히 알려준다.
  - `http://www.oreily.com/index.html` → 오라일리 출판사 홈페이지의 URL
  - http://www.yahoo.com/images/logo.gif → 야후! 웹사이트 로고의 URL
  - http://www.joes-hardware.com/inventory-check.cgi?item=12731 → 물품 12731의 재고가 있는지 확인하는 프로그램에 대한 URL
  - [ftp://joe:tools4u@ftp.joes-hardware.com/locking-pilers.gif](ftp://joe:tools4u@ftp.joes-hardware.com/locking-pilers.gif) → 비밀번호로 보호되는 FTP를 통해 locking-pilers.gif 이미지 파일에 접근하는 URL

대부분의 URL은 **세 부분**으로 이루어진 표준 포맷을 따른다.

- 첫 번째 부분은 스킴(scheme)으로, 리소스에 접근하기 위해 사용되는 프로토콜을 서술한다. (e.g., `http://`)
- 두 번째 부분은 서버의 인터넷 주소를 제공한다. (e.g., [www.joes-hardware.com](http://www.joes-hardware.com))
- 마지막은 웹 서버의 리소스를 가리킨다 (e.g., /special/saw-blade.gif)

### 1.3.4 URN(Uniform Resource Name)

URN은 콘텐츠를 이루는 한 리소스에 대해, 그 리소스의 위치에 영향을 받지 않는 유일무이한 이름 역할을 한다. 이 **위치 독립적**인 URN은 리소스를 여기저기로 옮겨 다니더라도 문제없이 동작한다. 리소스가 그 이름으 변하지 않게 유지하는 한, 여러 종류의 네트워크 접속 프로토콜로 접근해도 문제없다.

URN은 여전히 실험중인 상태고 아직 널리 채택되지 않았다. 효율적인 동작을 위해 URN은 리소스 위치를 분석하기 위한 인프라 지원이 필요한데, 그러한 인프라가 부재하기에 URN 채택이 더 늦춰지고 있다. 그러나 URN의 전망은 밝다고 한다.

------

## 1.4 트랜잭션

HTTP 트랜잭션은 요청 명령(클라이언트 → 서버)과 응답 결과(서버 → 클라이언트)로 구성되어 있다. 이 상호작용은 HTTP 메시지라고 불리는 정형화된 데이터 덩어리를 이용해 이루어진다.

- HTTP 요청 메시지는 명령과 URI를 포함한다.
- HTTP 응답 메시지는 트랜잭션의 결과를 포함한다.

### 1.4.1 메서드

HTTP는 HTTP 메서드라고 불리는 여러 가지 종류의 요청 멍령을 지원한다. 모든 HTTP 요청 메시지는 한 개의 메서드를 갖는다. 메서드는 서버에게 어떤 동작이 취해져야 하는지 말해준다.

- `GET` - 서버에서 클라이언트로 지정한 리소드를 보내라.
- `PUT` - 클라이언트에서 서버로 보낸 데이터를 지정한 이름의 리소스로 저장하라.
- `DELETE` - 지정한 리소스를 서버에서 삭제하라
- `POST` - 클라이언트 데이터를 서버 게이트웨이 애플리케이션으로 보내라.
- `HEAD` - 지정한 리소스에 대한 응답에서, HTTP 헤더 부분만 보내라.

### 1.4.2 상태 코드

모든 HTTP 응답 메시지는 상태 코드와 함께 반환된다. 상태 코드는 클라이언트에게 요청이 성공했는지 아니면 추가 조치가 필요한지 알려주는 세 자리 숫자다.

- 200 - 좋다. 문서가 바르게 반환된었다.
- 302 - 다시 보내라. 다른 곳에 가서 리소스를 가져가라.
- 404 - 없음. 리소스를 찾을 수 없다.

HTTP는 각 숫자 상태 코드에 텍스트로 된 "사유 구절(reason phrase)"도 함께 보낸다. 이 구문은 단지 설명만을 위해서 포함된 것일 뿐, 실제 응답 처리에는 숫자로 된 코드가 사용된다.

HTTP 소프트웨어는 다음에 열거된 상태 코드와 사유 구절을 모두 같은 것으로 취급한다.

- 200 OK
- 200 Document attached
- 200 Success
- 200 All's cool, dude

### 1.4.3 웹페이지는 여러 객체로 이루어질 수 있다.

애플리케이션은 보통 하나의 작업을 수행하기 위해 여러 HTTP 트랜잭션을 수행한다.

예를 들어, 웹브라우저는 시각적으로 풍부한 웹페이지를 가져올 때 대량의 HTTP 트랜잭션을 수행한다. 페이지 레이아웃을 서술하는 HTML '뼈대'를 한 번의 트랜잭션으로 가져온 뒤, 첨부된 이미지, 그래픽 조각, 자바 애플릿 등을 가져오기 위해 추가로 HTTP 트랜잭션들을 수행한다. 웹페이지는 첨부된 리소스들에 대해 각각 별개의 HTTP 트랜잭션을 필요로 한다.

이와 같이, '웹페이지'는 보통 하나의 리소스가 아닌, 리소스의 모음이다.

------

## 1.5 메시지

HTTP 메시지는 단순한 줄 단위의 문자열이다. 이진 형식이 아닌 일반 텍스트이기 때문에 사람이 읽고 쓰기 쉽다.

웹 클라이언트에서 웹 서버로 보낸 HTTP 메시지를 요청 메시지라고 부른다. 서버에서 클라이언트로 가는 메시지는 응답 메시지라고 부른다. HTTP 요청과 응답 메시지의 형식은 굉장히 비슷하다.

HTTP 메시지의 형식은 다음과 같다.

**시작줄**

- 메시지의 첫 줄은 시작줄로,
- 요청이라면 무엇을 해야 하는지 (`GET /text/hi-there.txt HTTP/1.0`)
- 응답이라면 무슨 일이 일어났는지 나타낸다. (`HTTP/1.0 200 OK`)

**헤더**

- 시작줄 다음에는 0개 이상의 헤더 필드가 이어진다.
- 각 헤더 필드는 쉬운 구문분석을 위해 콜론(':')으로 구분되어 있는 하나의 이름과 하나의 값으로 구성된다.
- 헤더 필드를 추가하려면 그저 한 줄을 더하기만 하면 된다. 헤더는 빈 줄로 끝난다.

**본문**

- 헤더의 빈 줄 다음에는 어떤 종류의 데이터든 들어갈 수 있는 메시지 본문이 필요에 따라 올 수 있다.
- 요청의 본문은 웹 서버로 데이터를 실어 보내며,
- 응답의 본문은 클라이언트로 데이터를 반환한다.
- 문자열이며 구조적인 시작줄과 헤더와 달리, **본문은 임의의 이진 데이터를 포함할 수 있다**(이미지, 비디오, 오디오 트랙, 응용 소프트웨어). 물론 텍스트도 포함할 수 있다.

**요청 메시지 예시**

```
GET /text/hi-there.txt HTTP/1.0
-------------------------------
Accept: text/*
Accept-language: en, fr
```

**응답 메시지 예시**

```
HTTP/1.0 200 OK
------------------------
Content-type: text/plain
Content-length: 19

-------------------------
Hi! I'm a message!
```

## 1.6 TCP 커넥션

Transmission Control Protocol - 전송 제어 프로토콜

### 1.6.1 TCP/IP

HTTP는 응용 계층 프로토콜이다. HTTP는 네트워크 통신의 핵심적인 세부사항에 대해서 신경쓰지 않는다. 대신 대중적이고 신뢰성 있는 인터넷 전송 프로토콜인 TCP/IP에게 맡긴다.

TCP는 다음을 제공한다.

- 오류 없는 데이터 전송
- 순서에 맞는 전달(데이터는 언제나 **보낸 순서대로** 도착한다.)
- 조각나지 않는 데이터 스트림(언제든 어떤 크기로든 보낼 수 있다.)

인터넷 자체가 전 세계의 컴퓨터와 네트워크 장치들 사이에서 대중적으로 사용되는 TCP/IP에 기초하고 있다.

- TCP/IP는 TCP와 IP가 층을 이루는, **패킷 교환 네트워크 프로토콜의 집합**이다.
- TCP/IP는 **각 네트워크와 하드웨어의 특성을 숨기고**, 어떤 종류의 컴퓨터나 네트워크든 서로 신뢰성 있는 의사소통을 하게 해준다.
- 일단 **TCP 커넥션**이 맺어지면, 클라이언트와 서버 컴퓨터 간에 교환되는 메시지가 없어지거나, 손상되거나, 순서가 뒤바뀌어 수신되는 일은 **결코 없다**.

### 1.6.2 접속, IP 주소, 그리고 포트번호

HTTP 클라이언트가 서버에 메시지를 전송할 수 있게 되기 전에, 인터넷 프로토콜(Internet Protocol; IP) 주소와 포트번호를 사용해 클라이언트와 서버 사이에 TCP/IP 커넥션을 맺어야 한다.

TCP에서는 서버 컴퓨터에 대한 IP 주소와 그 서버에서 실행 중인 프로그램이 사용 중인 포트번호가 필요하다. HTTP 서버의 IP 주소와 포트번호를 어떻게 알아낼 수 있을까?

URL을 이용하면 된다. URL은 리소스에 대한 주소이기 때문에, 당연하게도 그 리소스를 가지고 있는 장비에 대한 IP 주소를 알려줄 수 있다.

http://207.200.83.29:80/index.html

- 이 URL은 IP 주소 '207.200.83.29'와 포트번호 '80'을 갖고 있다.

http://www.netscape.com:80/index.html

- 이 URL에는 숫자로 된 IP 주소가 없다. 대신 글자로 된 도메인 이름 혹은 호스트 명("[www.netscape.com](http://www.netscape.com)")을 갖고 있다.
- 호스트 명은 IP 주소에 대한 이해하기 쉬운 형태의 별명이다.
- 호스트 명은 도메인 이름 서비스(Domain Name Service; DNS)라 불리는 장치를 통해 쉽게 IP로 변환될 수 있다.

http://www.netscape.com/index.html

- 이 URL에는 포트번호가 없다. HTTP URL에 포트번호가 빠진 경우에는 **기본값 80**이라고 가정하면 된다.

IP 주소와 포트번호를 이용해서 클라이언트는 TCP/IP로 쉽게 통신할 수 있다. 그 과정은 다음과 같다.

1. 웹브라우저는 서버의 URL에서 호스트 명을 추출한다.
2. 웹브라우저는 서버의 호스트 명을 IP로 변환한다.
3. 웹브라우저는 URL에서 포트번호(있다면)를 추출한다.
4. 웹브라우저는 웹 서버와 TCP 커넥션을 맺는다.
5. 웹브라우저는 서버에 HTTP 요청을 보낸다.
6. 서버는 웹브라우저에 HTTP 응답을 돌려준다.
7. 커넥션이 닫히면, 웹브라우저는 문서를 보여준다.

------

## 1.7 프로토콜 버전

### HTTP/0.9

- 1991
- 오직 GET 메서드만 지원
- 멀티미디어 콘텐츠에 대한 MIME 타입이나, HTTP 헤더, 버전 번호 지원 X
- 원래 간단한 HTML 객체를 받아오기 위해 만들어진 것임.
- 금방 HTTP/1.0으로 대체되었음

### HTTP/1.0

- 처음으로 널리 쓰이기 시작한 HTTP 머전
- 버전 번호, HTTP 헤더, 추가 메서드, 멀티미디어 객체 처리 추가
- 시각적으로 매력적인 웹페이지와 상호작용하는 폼 실현했음 → 월드 와이드 웹을 대세로 만들었음
- 결코 잘 정의된 명세가 아님
- HTTP가 상업적, 학술적으로 급성장하던 시기에 만들어진, 잘 동작하는 용례들의 모음에 가까움

### HTTP/1.0+

- 1990년대 중반, 월드 와이드 웹이 급격히 팽창하고 상업적으로도 성공하면서 여러 유명 웹 클라이언트와 서버들은 그에 따른 요구를 만족시키기 위해 발 빠르게 HTTP에 기능을 추가해갔음
- 오래 지속되는 "keep-alive" 커넥션, 가상 호스팅 지원, 프락시 연결 지원을 포함해 많은 기능이 공식적이진 않지만 사실상의 표준으로 HTTP에 추가되었음
- 이 규격 외의 확장된 HTTP 버전을 흔히 HTTP/1.0+라고 부름

### HTTP/1.1

- HTTP 설계의 구조적 결함 교정, 두드러진 성능 최적화, 잘못된 기능 제거에 집중했음
- 더 복잡해진 웹 애필리케이션과 배포(1990년대 후반에 이미 쓰이고 있었음)를 지원함
- 현재의 HTTP 버전임

### HTTP/2.0

- HTTP/1.1의 성능 문제를 개선하기 위해 구글의 SPDY 프로토콜을 기반으로 설계가 진행된 프로토콜이다.
- 자세한 것은 10장 참고

------

## 1.8 웹의 구성요소

- 프락시: 클라이언트와 서버 사이에 위치한 HTTP 중개자
- 캐시: 많이 찾는 웹페이지를 클라이언트 가까이에 보관하는 HTTP 창고
- 게이트웨이: 다른 애플리케이션과 연결된 특별한 웹 서버
- 터널: 단순히 HTTP 통신을 전달하기만 하는 특별한 프락시
- 에이전트: 자동화된 HTTP 요청을 만드는 준지능적(semi-intelligent) 웹클라이언트

### 1.8.1 프락시

프락시는 웹 보안, 애플리케이션 통합, 성능 최적화를 위한 중요한 구성요소다.

프락시는 클라이언트와 서버 사이에 위치하여, 클라이언트의 모든 HTTP 요청을 받아 (대개 요청을 수정한 뒤에) 서버에 전달한다. 아래의 예시(포워드 프록시)에서 이 애플리케이션은 사용자를 위한 프락시로 동작하며 사용자를 대신해서 서버에 접근한다.

프락시는 주로 보안을 위해 사용한다. 즉 모든 웹 트래픽 속에서 **신뢰할 만한 중개자** 역할을 한다.

또한 프락시는 요청과 응답을 필터링한다. (다운로드 시 바이러스 검출 혹은 성인 콘텐츠 차단 등)

### 1.8.2 캐시

웹캐시와 캐시 프락시는 자신을 거쳐 가는 문서들 중 자주 찾는 것의 사본을 저장해 두는, 특별한 종류의 HTTP 프락시 서버다. 다음번에 클라이언트가 같은 문서를 요청하면 그 캐시가 갖고 있는 사본을 받을 수 있다.

클라이언트는 멀리 떨어진 웹 서버보다 근처의 캐시에서 훨씬 더 빨리 문서를 다운받을 수 있다.

HTTP는 캐시를 효율적으로 동작하게 하고 캐시된 콘텐츠를 최신 버전으로 유지하면서 동시에 프라이버시도 보호하기 위한 많은 기능을 정의한다.

### 1.8.3 게이트웨이

- 다른 서버들의 중개자로 동작하는 특별한 서비스
- 주로 HTTP 트래픽을 다른 프로토콜로 변환하기 위해 사용됨
- 언제나 스스로가 리소스를 갖고 있는 진짜 서버인 것처럼 요청을 다룸
- 클라이언트는 자신이 게이트웨이와 통신하고 있음을 알아차리지 못할 것임

HTTP/FTP 게이트웨이는 FTP URL에 대한 HTTP 요청을 받아들인 뒤, FTP 프로토콜을 이용해 문서를 가져온다. 받아온 문서는 HTTP 메시지에 담아 클라이언트에게 보낸다.



### 1.8.4 터널

- 두 커넥션 사이에서 날것의(raw) 데이터를 열어보지 않고 그대로 전달해주는 HTTP 애플리케이션임
- 주로 비 HTTP 데이터를 하나 이상의 HTTP 연결을 통해 그대로 전송해주기 위해 사용됨
- 예: 암호화된 SSL 트래픽을 HTTP 커넥션으로 전송함으로써 웹 트래픽만 허용하는 사내 방화벽을 통과시키는 것.

### 1.8.5 에이전트

- 사용자를 위해 HTTP 요청을 만들어주는 클라이언트 프로그램
- 웹 요청을 만드는 애플리케이션은 뭐든 HTTP 에이전트임
- 웹 브라우저도 포함.
- 스파이더, 웹로봇, 웹 크롤러 등





---

URL은 인터넷의 리소스를 가리키는 표준이름이다.

URL은 전자정보 일부를 가리키고 그것이 어디에 있고 어떻게 접근할 수 있는지 알려준다.

## 2.1 인터넷의 리소스 탐색하기

URL은 통합 자원 식별자(Uniform Resource Identifier; URI)라고 불리는 더 일반화된 부류의 부분집합이다. URI는 두 가지 주요 부분집합인 URL과 URN으로 구성된 종합적인 개념이다. URN은 현재 그 리소스가 어디에 존재하든 상관없이 그 이름만으로 리소스를 식별하는데에 비해 URL은 리소스가 어디 있는지 설명해서 리소스를 식별한다.

HTTP 명세에서는 URI를 더 일반화된 개념의 리소스 식별자로 사용한다. 하지만 실제로 HTTP 애플리케이션은 URL을 URI의 한 부분으로 취급한다.

http://www.joes-hardware.com/seasonal/index-fall.html

URL의 첫 부분은 **스킴**이다(e.g., http://). 스킴은 웹 클라이언트가 리소스에 어떻게 접근하는지 알려준다.

URL의 두 번째 부분은 **서버의 위치**다(e.g., [www.joes-hardware.com](http://www.joes-hardware.com)). 이는 웹 클라이언트가 리소스가 어디에 호스팅되어 있는지 알려준다.

URL의 세 번째 부분은 리소스의 **경로**다(/seasonal/index-fall.html). 경로는 서버에 존재하는 로컬 리소스들 중에서 요청받은 리소스가 무엇인지 알려준다.

URL은 HTTP 프로토콜이 아닌 다른 가용한 프로토콜을 사용할 수도 있다 (mailto, ftp, rtsp 등). URL은 인터넷에 있는 어떤 리소스든지 가리킬 수 있다(이메일 주소, 서버에 올라가 있는 파일, 스트리밍을 제공하기 위해 비디오 서버에 호스팅하고 있는 영화 등).

URL을 쓰면 리소스를 일관된 방식으로 지칭할 수 있다. 대부분의 URL은 동일하게 '스킴://서버위치/경로' 구조로 이루어져 있다. 따라서 인터넷상의 모든 리소스를 가리키고 가져오기 위해, 그리고 모든 사람이 같은 방식으로 이름을 써서 리소스를 찾을 수 있도록, 단일 방식의 작명 규칙을 가진 것이다.

------

## 2.2 URL 문법

URL로 인터넷상의 모든 리소스를 찾을 수 있지만, 그 리소스들은 다른 스킴(HTTP, FTP, SMTP 등)을 통해 접근할 수 있으며, URL 문법은 스킴에 따라서 달라진다. 그렇지만 사실 대부분의 URL은 일반 URL 문법을 따르며, 서로 다른 URL 스킴도 형태와 문법 면에서 매우 유사하다.

대부분의 URL 스킴의 문법은 일반적으로 9개 부분으로 나뉜다.

```
<스킴>://<사용자 이름>:<비밀번호>@<호스트>:<포트>/<경로>;<파라미터>?<질의>#<프래그먼트>
```

이 모든 컴포넌트를 가지는 URL은 거의 없다. URL의 가장 중요한 세 가지 컴포넌트는 **스킴**, **호스트**, **경로**다.

**컴포넌트별 설명**

**스킴**

- 리소스를 가져오려면 어떤 프로토콜을 사용하여 서버에 접근해야 하는지가 없음.
- 기본값: 없음

**사용자 이름**

- 몇몇 스킴은 리소스에 접근을 하기 위해 사용자 이름을 필요로 한다.
- 기본값: anonymous

**비밀번호**

- 사용자의 비밀번호를 가리키며, 사용자 이름에 콜론(':')으로 이어서 기술한다.
- 기본값: <이메일 주소>

**호스트**

- 리소스를 호스팅하는 서버의 호스트 명이나 IP 주소
- 기본값: 없음

**포트**

- 리소스를 호스팅하는 서버가 열어놓은 포트번호. 많은 스킴이 기본 포트를 가지고 있다(HTTP의 경우 80).
- 기본값: 스킴에 따라 다름

**경로**

- 이전 컴포넌트와 빗금('/')으로 구분되어 있으며, 서버 내 리소스가 서버 어디에 있는지를 가리킨다. 경로 컴포넌트의 문법은 서버와 스킴에 따라 다르다.
- 기본값: 없음

**파라미터**

- 특정 스킴들에서 입력 파라미터를 기술하는 용도로 사용한다. 파라미터는 이름/값을 쌍으로 가진다. 파라미터는, 다른 파라미터나 경로의 일부와 세미콜론(';')으로 구분하여 기술하며, 여러 개를 가질 수 있다.
- 기본값: 없음

**질의**

- 스킴에서 애플리케이션(DB, 게시판, 검색엔진, 기타 인터넷 게이트웨이)에 파라미터를 전달하는데 쓰인다. 질의 컴포넌트를 작성하는데 쓰이는 공통 포맷은 없다. 이는 URL의 끝에 "?"로 구분한다.
- 기본값: 없음

**프래그먼트**

- 리소스의 **조각이나 일부분**을 가리키는 이름이다. **URL이 특정 객체를 가리킬 경우에 프래그먼트 필드는 서버에 전달되지 않는다**. 이는 클라이언트에서만 사용한다. URL의 끝에서 "#" 문자로 구분한다.
- 기본값: 없음

### 2.2.1 스킴: 사용할 프로토콜

스킴은 주어진 리소스에 어떻게 접근하는지 알려주는 중요한 정보다. 이는 URL을 해석하는 애플리케이션이 어떤 프로토콜을 사용하여 리소스를 요청해야 하는지 알려준다.

스킴 컴포넌트는 알파벳으로 시작해야 하고 URL의 나머지 부분들과 첫 번째 콜론으로 구분한다.

스킴 명은 대소문자를 구분하지 않는다.

### 2.2.2 호스트와 포트

애플리케이션이 인터넷에 있는 리소스를 찾으려면, 리소스를 호스팅하고 있는 장비와 그 장비 내에서 리소스에 접근할 수 있는 서버가 어디에 있는지 알아야 한다.

**호스트 컴포넌트**

- 접근하려고 있는 리소스를 가지고 있는 인터넷 상의 호스트 장비를 가리킨다.
- 도메인 이름 or IP 주소

**포트 컴포넌트**

- 서버가 열어놓은 네트워크 포트를 가리킨다.
- 내부적으로 TCP 프로토콜을 사용하는 HTTP는 기본 포트로 80을 사용한다.

### 2.2.3 사용자 이름과 비밀번호

많은 서버가 자신이 가지고 있는 데이터에 접근을 허용하기 전에 사용자 이름과 비밀번호를 요구한다. FTP 서버가 좋은 예다.

```
# 예시 1 <ftp://ftp.prep.ai.mit.edu/pub/gnu>
# 예시 2 <ftp://anonymous@ftp.prep.ai.mit.edu/pub/gnu>
# 예시 3 <ftp://anonymous:my_passwd@ftp.prep.ai.mit.edu/pub/gnu>
# 예시 4 <ftp://joe:joespasswd@www.joes-hardware.com/sales_info.txt>
```

1. 첫 번째 예는 사용자 이름이나 비밀번호 컴포넌트가 없이 표준 스킴, 호스트, 경로만 있다. 애플리케이션이 FTP와 같이 사용자 이름과 비밀번호를 요구하는 URL 스킴을 사용한다면, 그 값들이 삽입되어 있지 않을 경우 기본 사용자 이름과 비밀번호 값을 넣어놓을 것이다.
   - 예를 들어, 사용자 이름과 비밀번호를 기술하지 않고 FTP URL에 접근하면, 기본 사용자 이름 값으로 'anonymous'가, 비밀번호는 브라우저마다 가지고 있는 기본값을 사용한다(인터넷 익스플로러는 'IEUser'를, 크롬은 'chrome@example.com'을 넣는다).
2. 두 번째 예에는 사용자 이름이 'anonymous'로 되어 있다. 호스트 컴포넌트와 나란히 기술되어 있는 사용자 이름은 단순한 이메일 주소처럼 보이기도 한다. '@' 문자는 URL로부터 사용자 이름과 비밀번호 컴포넌트를 분리한다.
3. 세 번째 예는 사용자 이름('anonymous')과 비밀번호('my_passwd')를 콜론으로 분리하여 모두 기술하였다.

### 2.2.4 경로

URL의 경로 컴포넌트는 리소스가 서버의 어디에 있는지 알려준다.

해당 경로는 아래 예와 같이 계층적 파일 시스템 경로와 유사한 구조를 가진다.

http://www.joes-hardware.com:80/seasonal/index-fall.html

이 URL의 경로는 '/seasonal/index-fall.html'로 유닉스 파일 시스템의 파일 경로와 유사하다.

경로는 서버가 리소스의 위치를 찾는데 사용하는 정보다. HTTP URL에서 경로 컴포넌트는 '/' 문자를 기준으로 경로조각으로 나뉜다(유닉스 파일 시스템의 파일 경로와 유사하게). 각 경로조각은 자체만의 파라미터 컴포넌트를 가질 수 있다.

### 2.2.5 파라미터

URL을 사용하는 애플리케이션이 리소스에 접근하려면 프로토콜 파라미터가 필요하다. 프로토콜 파라미터가 없으면, 다른 한편에 있는 서버는 그 요청을 잘못 처리하거나 처리를 하지 않을 것이다.

- 바이너리와 텍스트, 총 두 개의 포맷을 지원하는 FTP를 예로 들자면, 사용자는 바이너리 이미지가 텍스트 형식으로 전송되는 것을 원하지 않는다. 이미지가 엉망이 될 게 뻔하기 때문이다.

URL의 파라미터 컴포넌트는 애플리케이션이 서버에 정확한 요청을 하기 위해 필요한 입력 파라미터를 받는 데에 사용한다. 이 컴포넌트는 이름/값 쌍의 리스트로 URL 나머지 부분들로부터 세미콜론으로 구분하여 URL에 기술한다. 이를 통해 애플리케이션이 리소스에 접근하는데 필요한 어떤 추가 정보든 전달할 수 있다.

- ex) [ftp://prep.ai.mit.edu/pub/gnu;type=d](ftp://prep.ai.mit.edu/pub/gnu;type=d)

이 경우 이름은 'type'이고, 값은 'd'인 type=d라는 단 한 개의 파라미터를 전달한다.

HTTP URL에서의 경로 컴포넌트는 경로조각으로 나눌 수 있다. 각 조각은 자체 파라미터를 가질 수 있다.

- ex) http://www.joes-hardware.com/hammers;sale=false/index.html;graphics=true

위 URL에는 hammers와 index.html이라는 두 개의 경로조각이 있다. hammers 경로조각은 값이 false인 sale이라는 파라미터를 가진다. index.html 경로조각은 값이 true인 graphics 파라미터를 가진다.

### 2.2.6 질의 문자열

DB 같은 서비스들은 요청받을 리소스 형식의 범위를 좁히기 위해서 질문이나 질의를 받을 수 있다.

죠의 컴퓨터 가게에 판매되지 않은 상품의 재고 리스트가 있고, 어떤 상품들이 비축되어 있는지 조회할 수 있다고 해보자. 다음 URL은 아이템 번호 12731의 재고가 있는지 확인하기 위해서 웹 DB 게이트웨이에 질의하는데 사용된다.

- http://www.joes-hardware.com/invetory-check.cgi?item=12731

물음표('?')의 우측에 있는 값들을 질의 컴포넌트라고 부른다. URL의 질의 컴포넌트는 게이트웨이를 가리키는 URL의 경로 컴포넌트와 함께 전달하고 있다. 보통 게이트웨이는, 다른 애플리케이션에 접근하려고 할 때 거치는 통로라고 할 수 있다.

사용하면 안 되는 특정 문자들을 제외하고는 질의 컴포넌트 포맷에 제약사항은 없다. 편의상 많은 게이트웨이가 '&'로 나뉜 '이름=값' 쌍 형식의 질의 문자열을 원한다.

- ex) http://wwo.joes-hardware.com/inventory-check.cgi?item=12731&color=blue

이 예에는 이름/값 쌍으로 된 두 개의 질의 컴포넌트가 존재한다. item=12731과 color=blue. 이 질의는 제품번호가 12731이고 파란색인 물품의 재고가 있는지 검사한다.

### 2.2.7 프래그먼트

HTML 같은 리소스 형식들은 본래의 수준보다 더 작게 나뉠 수 있다.

- 예를 들어 절(paragraph)이 포함된 용량이 큰 한 개의 텍스트 문서의 경우, 그 리소스에 대한 URL은 텍스트 문서 전체를 가리키겠지만, 이상적으로는 리소스 안에 있는 특정 절을 가리킬 수 있어야 한다.

리소스의 특정 부분을 가리킬 수 있도록 URL은 리소스 내의 조각을 가리킬 수 있는 프래그먼트 컴포넌트를 제공한다.

- 예를 들어 URL은 HTML 문서에 있는 특정 이미지나 일부분을 가리킬 수 있다.

프래그먼트는 URL의 오른쪽에 # 문자에 이어서 온다.

- ex) http://www.joes-hardware.com/tools.html#drills

이 예에서 drills라는 프래그먼트는 죠의 컴퓨터 가게 웹 서버에 위치한 /tools.html 웹페이지의 일부를 가리킨다. 그 부분을 'drills'라고 기술하였다.

일반적으로 HTTp 서버는 객체 일부가 아닌 전체만 다루기 때문에, **클라이언트는 서버에 프래그먼트를 전달하지 않는다**. 브라우저가 서버로부터 전체 리소스를 내려받은 후, 프래그먼트를 사용하여 사용자가 보고자 하는 리소스의 일부를 보여준다.

------

## 2.3 단축 URL

웹 클라이언트는 몇몇 단축 URL을 인식하고 사용한다.

상대 URL은 리소스 안에 있는 리소스를 간결하게 기술하는데 사용할 수 있다.

많은 브라우저가 사용자가 기억하고 있는 URL 일부를 입력하면 나머지 부분을 자동으로 입력해주는 URL '자동 확장'을 지원한다. 이에 대해서는 'URL 확장'에서 다룬다.

### 2.3.1 상대 URL

URL은 상대 URL와 절대 URL 두 가지로 나뉜다. 절대 URL은 리소스에 접근하는데 필요한 모든 정보를 가지고 있다.

상대 URL은 모든 정보를 담고 있지는 않다. 상대 URL로 리소스에 접근하는데 필요한 모든 정보를 얻기 위해서는, 기저(base)라고 하는 다른 URL을 사용해야 한다.

상대 URL은 URL을 짧게 표기하는 방식이다. 만약 어떤 HTML 문서 내의 a 태그에 href속성 값이 "./hammers.html"으로 주어진 경우 이는 올바른 문법의 상대 URL인 것이다. 이는 **문서의 URL을 기준으로 상대경로**로 해석될 수 있다.

상대 URL 문법에 따르면, HTML 작성자는 URL에 스킴과 호스트 그리고 다른 컴포넌트들을 모두 입력하지 않아도 된다. 그 정보는 컴포넌트가 포함된 리소스의 기저 URL에서 알아낼 수 있다. 다른 리소스에 대한 URL 역시 이 상대 URL로 기술할 수 있다.

상대 URL은 프래그먼트이거나 URL 일부다. URL을 처리하는 브라우저 같은 애플리케이션은 상대 URL과 절대 URl 간에 상호 변환을 할 수 있어야 한다.

상대 URL을 사용하면 리소스 집합(HTML 페이지 같은)을 쉽게 변경할 수 있다. 그리고 문서 집합의 위치를 변경하더라도, 새로운 기저 URL에 의해서 해석될 것이기 때문에 위치를 변경하더라도 잘 동작할 것이다.

**기저 URL**

변환 과정의 첫 단계는 기저 URL을 찾는 것이다. 기저 URL은 상대 URL의 기준이 된다. 그것을 가져오는 몇 가지 방법이 있다.

1. 리소스에서 명시적으로 제공
   - 어떤 리소스들은 기저 URL을 명확하게 기술하기도 한다. 예를들어 HTML 문서에서는 그 안에 있는 모든 상대 URL을 변경하기 위해서 기저 URL을 가리키는 <BASE> HTML 태그를 기술할 수 있다.
2. 리소스를 포함하고 있는 기저 URL
   - 만약 상대 URL이 기저 URL이 명시되지 않은 리소스에 포함된 경우, 해당 리소스의 URL을 기저 URL로 쓸 수 있다. (HTML 문서 내 하이퍼링크)
3. 기저 URL이 없는 경우
   - 기저 URL이 없는 경우도 있다. 보통 이런 경우는 절대 URL만으로 이루어져 있다는 뜻이다. 하지만 불완전하거나 깨진 URL일 수도 있다.

**상대 참조 해석하기**

상대 URL을 절대 URL로 변환하기 위한 다음 단계는 **상대 URL과 기저 URL을 각각의 컴포넌트 조각으로 나누는 것이다**.

사실상 이것은 URL을 파싱하는 것에 불과하지만, 컴포넌트 단위로 분리한다는 점에서 이 작업을 'URL 분해하기'라고 부르기도 한다. 기저 URL과 상대 URL을 컴포넌트로 분해하고 나면, 변환을 끝내기 위해 알고리즘을 사용할 수 있다(책 그림 2-5 참고)

### 2.3.2 URL 확장

어떤 브라우저들은 URL을 입력한 다음이나 입력하고 있는 동안에 자동으로 URL을 확장한다. 이는 사용자가 URL을 빠르게 입력하게 도와준다. 이러한 '확장' 기능은 두 가지로 나뉜다.

**호스트 명 확장**

- 호스트 명 확장 기능을 지원하는 브라우저는 단순한 휴리스틱만을 사용해서 입력한 호스트 명을 전체 호스트 명으로 확장할 수 있다.
- 예를 들어 주소 입력란에 'yahoo'를 입력하면, 브라우저는 호스트 명에 자동으로 'www.'과 '.com'을 붙여서 '[www.yahoo.com](http://www.yahoo.com)'을 만든다.
- 어떤 브라우저는 'yahoo'란 단어를 포함한 사이트를 찾지 못하면, 확장을 포기하기 전에 몇 가지의 URl을 추가로 제시한다.
- 브라우저는 이런 간단한 기능을 제공하여 사용자의 시간을 절약하고 혼란을 막아준다. 하시만 호스트 명에 대한 확장 기능은 프락시와 같은 다른 HTTP 애플리케이션에 문제를 발생시킬 수도 있다.

**히스토리 확장**

- 히스토리 확장은 브라우저가 과거에 사용자가 방문했던 URL의 기록을 저장해 놓는 것이다. URL을 입력하면, 그 **입력된 URL의 앞 글자들을 포함하는 완결된 형태의 URL들을 선택하게 해준다**.
- 따라서 http://www.joes- 와 같이 이전에 방문했던 URL의 시작 부분을 입력하면, 브라우저는 [http://www.joes-hardware.com을](http://www.joes-hardware.xn--com-of0o) 보여줄 것이다. 그러면 사용자는 전체 URL을 입력하는 대신 선택만 하면 된다.
- 프락시를 사용할 경우 URL 자동확장 기능은 다르게 동작할 수 있다는 것을 유념하자.

------

## 2.4 안전하지 않은 문자

- URL은 잘 호환되도록 설계되었다. 모든 프로토콜이 데이터를 전송하기 위해서 서로 다른 전송 장치를 가지고 있기 때문에, 어떤 인터넷 프로토콜을 통해서든 안전하게 전송될 수 있도록 URL을 설계하는 것은 중요했다.
- 안전한 전송이란, 정보가 유실될 위험 없이 URL을 전송할 수 있다는 것을 의미한다.
- 전자메일에 사용되는 SMTP 같은 프로토콜은 특정 문자를 제거할 수도 있는 전송 방식을 사용한다. → 문자가 제거되는 일을 피하고자 **URL은 상대적으로 작고 일반적으로 안전한 알파벳 문자만 포함하도록 허락**한다.
- URL은 **가독성**을 위해서 **출력이 되지 않거나 보이지 않는 문자를 사용하는 것이 금지**되었다.
- URL 설계자들은 사람들이 URL에 이진 데이터나 일반적으로 안전한 알파벳 외의 문자도 포함하려고 할 때가 있다는 것을 알고, **이스케이프**라는 기능을 추가하여 **안전하지 않은 문자를 안전한 문자로 인코딩**할 수 있게 하였다.

### 2.4.1 URL 문자 집합

컴퓨터 시스템의 기본 문자 집합은 보통 영어 중심으로 설정되어 있다. 역사적으로 많은 컴퓨터 애플리케이션이 US-ASCII 문자 집합을 사용해왔다. US-ASCII는 만들어진 지 오래된 문자 집합이기 때문에, 적은 수의 문자만을 포함하고 있다.

영어 이외의 언어나 특정 이진 데이터를 지원하기 위해서 URL 설계자들은 URL에 **이스케이프 문자열**을 쓸 수 있게 설계하였다. **이스케이프 문자열**은 US-ASCII에서 사용이 금지된 문자들로, 특정 문자나 데이터를 인코딩할 수 있게 함으로써 이동성과 완성도를 높였다.

### 2.4.2 인코딩 체계

인코딩은 안전하지 않은 문자를 퍼센티지 기호(%)로 시작해, ASCII 코드로 표현되는 두 개의 16진수 숫자로 이루어진 '이스케이프' 문자로 바꾼다.

- '~' → ASCII 코드 126(0x7E) → %7E
- '빈 문자' → ASCII 코드 32(0x20) → %20
- '%' → ASCII 코드 37(0x25) → %25

### 2.4.3 문자 제한

몇몇 문자는 URL 내에서 특별한 의미로 예약되어 있다. URL에서 예약된 문자들을 본래의 목적이 아닌 다른 용도로 사용하려면 그 전에 반드시 인코딩해야 한다.

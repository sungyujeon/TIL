# HTTP Message

> HTTP 메시지는 HTTP 애플리케이션 간에 주고받은 데이터 블록



## 메시지 구성

> 메시지는 시작줄, 헤더 블록, 본문 3파트로 이루어짐

- 요청 메시지
  - 요청줄 : <메서드> <요청 URL> <버전>
  - 헤더
  - 엔티티 본문
- 응답 메시지
  - 요청줄 : <버전> <상태코드> <사유 구절(reason-phrase)>
  - 헤더
  - 엔티티 본문



## 시작줄

> 모든 HTTP 메시지는 시작줄로 시작
>
> 요청 메시지는 서버에게 어떤 동작이 일어나야 하는지 설명해주는 메서드와, 그 동작에 대한 대상을 지칭하는 요청 URL, HTTP 버전을 포함
>
> 응답 메시지는 수행 결과에 대한 상태 정보와 결과 데이터를 클라이언트에게 반환하며, HTTP 버전, 상태 코드, 사유 구절로 구성



##### 메서드

- 분류
  - GET: 서버에서 어떤 문서를 가져옴
  - POST: 서버가 처리해야 할 데이터를 보냄
    - 입력 데이터를 처리하기 위해 만들어짐
  - PUT: 서버에 요청 메시지의 본문을 저장
    - 멱등성(여러번 적용하더라도 결과가 달라지지 않는 성질)
    - URL 요청에 따라 새 문서를 생성하거나, 이미 존재한다면 수정
  - DELETE: 서버에서 문서 제거
  - HEAD: 서버에서 어떤 문서에 대한 헤더만 요청
    - HTTP 1.1 부터 가능 / GET method 요청 때 HEAD 정보를 반드시 포함해야 했기 때문
    - 리소스를 가져오지 않고도 정보를 알 수 있음
    - 응답의 상태 코드를 통해 개체가 존재하는지 확인 가능
    - 리소스가 변경되었는지 검사 가능
  - TRACE: 메시지가 프락시를 거쳐 서버에 도달하는 과정 추적
    - 클라이언트가 요청할 때, 해당 요청은 방화벽, 프락시, 게이트웨이 등의 애플리케이션을 통과할 수 있고, 해당 앱들이 기존 HTTP 요청을 수정할 수 있음
    - TRACE 요청은 목적지 서버에서 'Loopback' 진단을 하여, 자신이 받은 요청 메시지를 본문에 넣어서 응답
  - OPTIONS: 서버가 어떤 메서드를 수행할 수 있는지 확인
- 안전한 메서드(Safe Method)
  - GET, HEAD
  - 위 메서드 사용하는 HTTP 요청 결과로 서버에 어떤 영향도 없음을 의미
  - 정보를 읽어오는 역할만 함



##### 상태코드

- 100~101: 정보
  - HTTP/1.1에서 도입
  - 100 Continue: 요청의 시작 부분 일부가 받아들여졌으며, 클라이언트는 나머지를 계속 이어서 보내야 함을 의미. 이를 보낸 후 서버는 반드시 요청을 받아 응답해야 함. 클라이언트가 서버에 엔티티 본문을 전송하기 전에 그 엔티티 본문을 서버가 받아들일 것인지 확인하려고 할 때, 그 확인 작업을 최적화하기 위한 의도로 도입되어쓰나, 모호한 점이 많음.
  - 101 Switching Protocols
- 200~206: 성공
  - 200 OK
    - 요청 정상 / 엔티티 본문은 요청 리소스 포함
  - 201 Created
  - 202 Accepted
    - 요청은 받아들여졌으나 서버는 아직 어떤 동작도 수행하지 않음을 의미
    - 요청이 받아들이기에 단지 적합하다는 의미
  - 203 Non-Authoritative Information
    - 엔티티 헤더에 있는 정보가 원래 서버가 아닌 리소스의 사본에서 왔다는 의미
  - 204 No Content
    - 응답 메시지는 헤더와 상태줄을 포함하지만 엔티티 본문은 포함하지 않을 때
    - 주로 웹브라우저를 새 문서로 이동시키지 않고 갱신하고자 할 때(폼을 리프레시 할 때 많이 사용)
  - 205 Reset Content
  - 206 Partial Content
- 300~305: 리다이렉션
  - 리다이렉션 코드는 클라이언트가 요청하는 리소스에 대해 다른 위치를 사용하라고 말해주거나, 해당 리소스의 내용 대신 다른 대안 응답을 제공
  - 만약 리소스가 이동했다면, 어디서 찾을 수 있는지 알려주기 위해 상태 코드 + Location 헤더를 보냄
  - 몇몇 상태코드는 리소스에 대한 애플리케이션의 로컬 복사본이 원래 서버와 비교했을 때 유효한지 확인하기 위해 사용(서버에 있는 리소스와 비교해 수정되었는지 확인, 수정되지 않았으면 로컬 복사본을 브라우저가 제공)
  - 301(Moved Permenently) vs 302(Found)
    - 301은 새로운 URL이 영구적으로 변경되었음을 나타내고, 302는 임시적으로 해당 URL 주소를 알려주는 차이가 있음
  - 303 See Other
    - 클라이언트에게 리소스를 다른 URL에서 가져와야 한다고 알려줄 때
    - 보통은 클라이언트의 POST 메서드 요청에 대해 리소스 위치를 알려줄 때 사용
  - 304
    - 변경되지 않았음을 나타냄
- 400~415: 클라이언트 에러
  - 400 Bad Request
    - 클라이언트의 잘못된 요청
  - 401 Unauthorized
    - 인증되지 않은 사용자
  - 402 Payment Required
  - 403 Forbidden
    - 요청 거부(권한이 없는 사용자일 경우)
  - 404 Not Found
    - 클라이언트가 요청한 URL을 찾을 수 없음
  - 405 Method Not Allowed
    - 지원하지 않는 Method 요청 시 / 어떤 메서드가 사용 가능한지 클라이언트에게 알려주기 위해 요청에 Allow 헤더 포함되어야 함
  - 406 Not Acceptable
  - 407 Proxy Authentication Required
  - 408 Request Timeout
  - 409 Conflict
  - 410 Gone
  - 411 Length Required
  - 412 Precondition Failed
  - 413 Request Entity Too Large
  - 414 Request URI Too Long
  - 415 Unsupported Media Type
  - 416 Requested Range Not Satisfiable
  - 417 Expectation Failed
- 500~505: 서버 에러
  - 500 Internal Server Error
    - 서버 에러
  - 501 Not Implemented
    - 클라이언트가 서버의 능력을 넘는 요청을 했을 때(서버가 지원하지 않는 메서드를 사용하는 등)
  - 502 Bad Gateway
    - 프락시나 게이트웨이처럼 행동하는 서버가 그 요청 응답 연쇄에 있는 다음 링크로부터 가짜 응답에 맞닥뜨렸을 때 사용(만약 부모 게이트웨이에 접속하는 것이 불가능 할 때????)
  - 503 Service Unavailable
    - 현재는 요청 처리 불가능하지만, 나중에는 가능함을 의미하고자 할 때
  - 504 Gateway Timeout
  - 505 HTTP Version Not Supported



##### HTTP 버전 번호

- 버전번호는 HTTP/<메이저>.<마이너> 구성
- 버전별 메시지의 형식과 능력에 대한 단서 제공



## 헤더

##### 헤더 분류

- 일반 헤더(General Header): 요청과 응답 양쪽에 모두 나타날 수 있음

  - 클라이언트, 서버, 다른 애플리케이션 등을 위해 다양한 목적으로 사용

  - 예를 들어 Date 헤더는 서버와 클라이언트를 가리지 않고 메시지가 만들어진 일시를 지칭하기 위해 사용

  - Connection, Date, MIME-Version, Trailer chunked transfer, Transfer-Encoding, Upgrade, Via

    ```text
    Date: Tue, 3 Oct 1999 02:16:00 GMT
    ```

- 요청 헤더: 요청에 대한 부가 정보 제공

  - 클라이언트가 서버에게 받고자 하는 데이터의 타입이 무엇인지 정보 제공
  - `Accept: */*` 헤더는 클라이언트가 어떤 미디어 타입도 받아들일 것임을 의미
  - Accept 관련 헤더를 이용해 클라이언트는 서버에게 무엇을 원하고 무엇을 받아들일 수 있는지 등의 추가 정보를 제공
  - Accept, Accept-Charset, Accept-Encoding, Accept-Language 등
  - 이외에도 조건부 요청 헤더, 요청 보안 헤더, 프락시 요청 헤더 등이 있음

- 응답 헤더: 응답에 대한 부가 정보 제공

  - 어떤 종류의 서버와 통신을 하고 있는지 정보 제공
  - 누가 응답을 보내고 있는지, 응답자의 능력은 어떻게 되는지 알려주어, 클라이언트가 나중에 더 나은 요청을 할 수 있도록 도와줌
  - Age, Public, Retry-After, Server, Title, Warning 등
  - 이외에도 협상 헤더, 응답 보안 헤더 등이 있음

- Entity 헤더: 본문 크기와 콘텐츠, 혹은 리소스 그 자체 서술

  - 엔티티 본문에 대한 정보를 담은 헤더(예를 들어 본문에 들어 있는 데이터 타입이 무엇인지)

  - 콘텐츠 헤더, 엔티티 캐싱 헤더 등이 있음

    ```text
    Content-Type: text/html
    ```

- 확장 헤더: 명세에 정의되지 않은 새로운 헤더

  - 아직 승인된 HTTP 명세에는 추가되지 않은 비표준 헤더



## 엔티티 본문

> 엔티티 본문은 선택적으로, 포함될 수도 포함되지 않을 수도 있음
>
> 이미지, 비디오, HTML 문서, 애플리케이션, 신용카드 트랜잭션, 전자우편 등 다양한 종류의 데이터를 실어 나를 수 있음






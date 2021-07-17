# Cookie & Storage

>  웹 클라이언트에서 저장하기 위해 사용하는 공간은 크게 쿠키와 웹 스토리지로 나눌 수 있음. 그리고 웹 스토리지는 다시 seesion storage, local storage로 나뉨

> 그럼 우린 Cookie와 Storage 중에 어디에 저장해야 돼?
>
> -> [여기](https://dev.to/gkoniaris/how-to-securely-store-jwt-tokens-51cf) 참조



## Cookie

- 쿠키는 HTTP 통신의 무상태성(stateless)를 보완해주기 위해 나온 것으로, 서버가 클라이언트에 값을 저장하고 읽을 수 있도록 해준 것
- <b>서버에서 접근할 수 있으며, 자동으로 요청에 포함됨</b>
- HttpOnly 설정을 추가한다면 클라이언트의 접근을 완전히 차단해 XSS 방지 가능

- 만료 시점
  - session cookies : 브라우저가 종료되면 삭제
  - persistent cookies : 지정된 만료일에 삭제



## Storage

##### Session Storage

- session cookies와 비슷하며, 세션 종료시 삭제
- 서버에서 접근할 수 없으므로, 클라이언트에서 스토리지의 값을 꺼내 서버에 전달해줘야 함



##### Local Storage

- persistent cookies와 비슷하지만, 반 영구적으로 저장 가능
- session storage와 같이 클라이언트에서 스토리지의 값을 꺼내 서버에 전달해줘야 함

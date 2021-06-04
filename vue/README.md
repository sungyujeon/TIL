# Vue.js

>
>
>

## 개요

- 사용자 인터페이스를 만들기 위한 progressive framework

- 현대적인 tool과 다양한 라이브러리를 통해 SPA(Single Page Application)를 완벽하게 지원

- Evan You에 의해 발표(2014)

  - 구글 Angular 개발자 출신
  - 학사 미술, 미술사 전공 / 석사 디자인 & 테크놀로지
  - 구글 Angular 보다 가볍고 간편하게 사용할 수 있는 프레임워크 만들기 위해 개발

- 등장배경

  - 과거 웹 사이트들은 요청에 따라 매번 새로운 페이지를 응답하는 방식(Multi Page Form)

  - 스마트폰이 등장하면서 모바일 최적화에 대한 필요성이 생김

  - 이러한 문제를 해결하기 위해 Vue와 같은 프론트엔드 프레임워크가 등장(CSR, SPA)

  - 1개의 웹페이지에서 여러 동작이 이루어지며 모바일 앱과 비슷한 형태의 사용자 경험 제공

  - CSR(Client Side Rendering)

    - 최초 요청 시 서버에서 빈 문서를 응답하고 이후 클라이언트에서 데이터를 요청해 데이터를 받아 DOM을 렌더링 하는 방식

    - SSR보다 초기 전송되는 페이지의 속도는 빠르지만, 서비스에 필요한 데이터를 클라이언트(브라우저)에서 추가로 요청하여 재구성해야 하기 때문에 전체적인 페이지 완료 시점은 SSR보다 느림

    - SPA가 사용하는 렌더링 방식

      ##### 장점

      - 서버와 클라이언트 간의 트래픽 감소(웹 애플리케이션에 필요한 모든 정적 리소스를 최초에 한 번 다운로드)
      - 사용자 경험 향상(전체 페이지를 다시 렌더링하지 않고 변경되는 부분만을 갱신)

      ##### 단점

      - SEO(검색 엔진 최적화) 문제가 발생할 수 있음
      - SEO 문제 대응
        - Vue.js 또는 React 등의 SPA 프레임워크는 SSR을 지원하는 SEO 대응 기술 존재
        - 추가 프레임워크를 사용하기도 함(Nuxt.js(vue), Next.js(react))

  - SSR(Server Side Rendering)

- Vanilla JS vs Vue.js

  - Vanilla JS
    - 한 유저가 100만개의 게시물을 
  - Vue.js

- MVVC Pattern

  - 애플리케이션
  - Model / View / View Model
  - Model : Vue에서 Model은 JavaScript Object
  - View : 
  - ViewModel : Vue Instance

  




## Vue Router

> SPA 등장 이전에는 서버가 모든 라우팅을 통제하여 요청 경로에 맞는 HTML을 제공하였지만, SPA 등장 이후에 서버는 index.html 하나만 제공하고 이후 모든 처리는 JS 코드를 활용해 진행하게 됨

- Vue.js의 공식 라우터
- 중첩된 라우트/뷰 매핑 모듈화된, 컴포넌트 기반의 라우터 설정 등 SPA 상에서 라우팅을 쉽게 개발할 수 있게 하는 기능 제공



##### 설치

```bash
# vue router는 vue cli의 plugin이므로 add만 해주면 됨
# router에 의해 폴더의 구조가 바뀌므로 백업을 해두거나 처음에 설정해주어야 됨
$ vue add router
```



##### router-link

- index.js 파일에 정의한 경로에 등록한 특정한 컴포넌트와 매핑
- HTML5 히스토리 모드에서, router-link는 클릭 이벤트를 차단하여 브라우저가 페이지를 다시 로드하지 않도록 함
- a 태그지만 GET 요청을 보내는 a 태그와는 조금 다르게 기본 GET 요청을 보내는 이벤트를 제거한 형태로 구성



##### router-view

- 실제 component가 DOM에 부착되어 보이는 자리를 의미
- router-link를 클릭하면 해당 경로와 연결되어 있는 index.js에 정의한 컴포넌트가 위치



##### History mode

- HTML history API를 사용해서 router를 구현한 것
- 브라우저의 히스토리는 남기지만 실제 페이지는 이동하지 않는 기능



##### components vs views

- 컴포넌트를 만들어갈 때 정해진 구조가 있는 것은 아님
- 주로 아래와 같이 구조화 하여 활용
- App.vue | 최상위 컴포넌트
  - views/  |  router(index.js)에 매핑되는 컴포넌트를 모아두는 폴더
  - components/  |  router에 매핑된 컴포넌트 내부에 작성하는 컴포넌트를 모아두는 폴더





## Vuex

> statement management pattern + library for vue.js (상태 관리 패턴 + 라이브러리)

##### 개념

- 상태를 전역 저장소로 관리할 수 있도록 지원하는 라이브러리
  - state가 예측 가능한 방식으로만 변경될 수 있도록 보장하는 규칙 설정
  - 애플리케이션의 모든 컴포넌트에 대한 <b>중앙 집중식 저장소</b> 역할
- Vue의 공식 devtools와 통합되어 기타 고급 기능을 제공
- state?
  - state는 data이며, 해당 어플리케이션의 핵심이 되는 요소
  - 각 컴포넌트에서 관리(.html의 경우 new Vue({}), SFC에서는 .vue에 해당)
  - DOM은 data(state)에 반응하여 DOM을 렌더링
- Pass props & Emit event
  - 단방향 흐름이라 데이터의 흐름을 직관적으로 파악 가능하지만, 컴포넌트 중첩이 깊어지는 경우 동위 관계의 컴포넌트로의 데이터 전달이 불편해졌음 -> Vuex



##### 동작방식

- 중앙 저장소에서 state를 모아놓고 관리
- 규모가 큰 (컴포넌트 중첩이 깊은) 프로젝트에 매우 편리
- 각 컴포넌트에서는 중앙 집중 저장소의 state만 신경쓰면 됨
- 이를 공유하는 다른 컴포넌트는 알아서 동기화



##### Vuex Core Concept

- 단방향 데이터 흐름

  - 상태(state)는 앱을 작동하는 원본 소스(data)
  - view는 상태의 선언적 매핑
  - action은 뷰에서 사용자 입력에 대해 반응적으로 상태를 바꾸는 방법(methods)

- 상태 관리 패턴

  - 컴포넌트의 공유된 상태를 추출하고 이를 전역에서 관리하도록 함
  - 컴포넌트는 커다란 뷰가 되며 모든 컴포넌트는 트리에 상관 없이 상태에 access 하거나 동작을 trigger 할 수 있음
  - 상태 관리 및 특정 규칙 적용과 관련된 개념을 정의하고 분리함으로써 코드의 구조와 유지 관리 기능 향상

- 구성요소

  - State / Actions / Mutations / Getters

  - state

    - 중앙에서 관리하는 모든 상태 정보(state)
    - Mutations에 정의된 메서드에 의해 변경
    - 여러 컴포넌트 내부에 있는 특정 state를 중앙에서 관리
    - state가 변화하면 해당 state를 공유하는 컴포넌트의 DOM은 자동 렌더링
    - <b>dispatch()</b>를 사용하여 Actions 내부의 메서드 호출

  - Actions

    - Component에서 <b>dispatch()</b> 메서드에 의해 호출

    - Backend API와 통신하여 Data Fetching 등의 작업을 수행(동기적 작업 뿐만 아니라 비동기적 작업을 포함 가능)

    - 항상 context가 인자로 넘어옴

      - store.js 파일 내에 있는 모든 요소에 접근해서 속성 접근 & 메서드 호출이 가능
      - 단, (가능하지만) state를 직접 변경하지 않음

    - mutations에 정의된 메서드를 commit 메서드로 호출

    - state는 오로지 mutations 메서드를 통해서만 조작

      (명확한 역할 분담을 통해 서비스 규모가 커져도 state를 올바르게 관리하기 위함)

  - Mutations

    - Actions에서 commit() 메서드에 의해 호출
    - 비동기적으로 동작하면 state가 변화하는 시점이 달라질 수 있기 때문에 동기적인 코드만 작성
    - mutations에 정의하는 메서드의 첫번째 인자로 state가 넘어옴

  - Getters

    - state를 변경하지 않고 활용하여 계산을 수행(computed와 유사)
      - 실제 계산된 값을 사용하는 것처럼 getters는 저장소의 상태(state)를 기준으로 계산
      - 예를 들어, state에 todo list의 해야 할 일의 목록의 경우 todo가 완료된 목록만 필터링해서 보여줘야 하는 경우가 있음
      - getters에서 completed의 값이 true인 요소가 필터링 해서 계산된 값을 담아 놓을 수 있음
    - getters 자체가 state 자체를 변경하지는 않음 --> state를 특정한 조건에 따라 계산만 하여 값만 가져옴





## Vue <==> API

##### Server & Client

- server
  - 클라이언트에게 '정보', '서비스'를 제공하는 컴퓨터 시스템
  - 정보 & 서비스
    - Django를 통해 응답한 template
    - DRF를 통해 응답한 JSON
- client
  - 서버에게 그 서버가 맞는(서버가 제공하는) 서비스를 요청하고
  - 서비스 요청을 위해 필요한 인자를 서버가 원하는 방식에 맞게 제공하며
  - 서버로부터 반환되는 응답을 사용자에게 적절한 방식으로 표현하는 기능을 가진 시스템



##### CORS

---

> Same-origin policy(SOP) / 동일 출처 정책
>
> - 두 URL의 Protocol, Port, Host가 모두 같아야 동일한 출처
> - 특정 출처(origin)에서 불러온 문서나 스크립트가 다른 출처에 서 가져온 리소스와 상호작용 하는 것을 제한하는 보안 방식
> - 잠재적으로 해로울 수 있는 문서를 분리함으로써 공격받을 수 있는 경로를 줄임

---

##### 개념

- Cross-Origin Resource Sharing / 교차 출처 리소스(자원) 공유

- 추가 HTTP headers를 사용하여, 특정 출처에서 실행중인 웹 애플리케이션이 다른 출처의 자원에 접근할 수 있는 권한을 부여하도록 <b>브라우저</b>에 알려주는 체제

- 리소스가 자신의 출처(Domain, Protocol, Port)와 다를 때 교차 출처 HTTP 요청을 실행

- 보안 상의 이유로 브라우저는 교차 출처 HTTP 요청을 제한(SOP)

- 다른 출처의 리소스를 불러오려면 그 출처에서 올바른 CORS header를 포함한 응답을 반환해야 함

- Why CORS?

  - 브라우저 & 웹 애플리케이션 보호

    - 악의적인 사이트의 데이터를 가져오지 않도록 사전 차단
    - 응답으로 받는 자원에 대한 최소한의 검증
    - 서버는 정상적으로 응답하지만 브라우저에서 차단

  - Server의 자원 관리

    - 누가 해당 리소스에 접근할 수 있는지 관리

    

##### CORS HTTP 응답 헤더 예시

Access-Control-Allow-Origin / Access-Control-Allow-Credentials /

Access-Control-Allow-Headers / Access-Control-Allow-Methods



##### Acess-Control-Allow-Origin 응답 헤더

- 이 응답이 주어진 출처(origin)로 부터 요청 코드와 공유될 수 있는지를 나타냄
- 예시
  - Access-Control-Allow-Origin : `*`
  - 브라우저 리소스에 접근하는 임의의 origin으로부터 요청을 허용한다고 알리는 응답에 포함
  - `*`는 모든 도메인에서 접근할 수 있음을 의미
  - `*` 외에 특정 origin 하나를 명시할 수 있음



##### Authentication & Authorization

- Authentication
  - 인증, 입증 / 자신이라고 주장하는 사용자가 누구인지 확인하는 행위
  - 모든 보안 프로세스의 첫 번째 단계(가장 기본 요소)
  - 401 Unauthorized (의미상 이 응답은 unauthenticated를 의미)
- Authorization
  - 권한 부여, 허가 / 사용자에게 특정 리소스 또는 기능에 대한 액세스 권한을 부여하는 과정(절차)
  - 보안 환경에서 권한 부여는 항상 (Authentication)인증을 따라야 함
  - 403 Forbidden(401과 다른 점은 서버는 클라이언트가 누구인지 알고 있음)
- Authentication 이후 Authorization이 따라오는 경우가 많음(세션, 토큰, 제3자를 활용하는 등의 다양한 인증 방식이 존재)



##### Token Based Authentication

- Session(참조)

- JWT

  - JSON 포맷을 활용하여 요소 간 안전하게 정보를 교환하기 위한 표준 포맷
  - 암호화 알고리즘에 의한 디지털 서명이 되어 있기 때문에 자체로 검증 가능하고 신뢰할 수 있는 정보 교환 체계
  - JWT 자체가 필요한 모든 정보를 갖기 때문에(self-contained), 이를 검증하기 위한 다른 검증 수단이 필요 없음
  - 사용처 : Authentication, Information Exchange

- JWT 활용 이유

  - (Session에 비해) 상대적으로 HTML, HTTP 환경에서 사용하기 용이

    (Session은 유저의 session 정보를 server에 보관해야 하지만, JWT는 Client Side에 토큰 정보를 저장하고 필요한 요청에 (유효한 토큰을) 같이 넣어 보내면 그 자체가 인증 수단이 됨)

  - 높은 보안 수준

  - JSON의 범용성

  - Server 메모리에 정보를 저장하지 않아 Server 자원 절약 가능

- 구조

  - Header
    - 토큰의 유형(type)과 Hashing algorithm으로 구성
  - Payload
    - 토큰에 넣을 정보
    - claim은 정보의 한 조각을 의미하며 payload에는 여러 개의 claim을 넣을 수 있음
    - 종류 : Registered / Public / Private (claims)
  - Signature
    - Header와 Payload의 encoding 값을 더하고 거기에  private key로 hashing하여 생성










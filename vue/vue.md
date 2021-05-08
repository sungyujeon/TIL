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

  

  
# Web Basic



최초의 웹사이트 info.cern.ch(유럽 입자 물리 연구소에서 처음으로 web을 사용함)

global css property usage



### HTML(Hyper Text Markup Language)

<<웹 컨텐츠의 의미와 구조를 정의>>

웹 페이지를 작성하기 위한(구조를 잡기 위한) 언어



메타 데이터를 표현하는 새로운 규악(Open Graph Protocol)

- HTML 문서의 메타 데이터를 통해 문서의 정보를 전달
- 페이스북에서 만들었으며, 메타정보에 해당하는 제목, 설명 등을 쓸 수 있도록 정의



### HTML 기본 구조

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    
  </head>
</html>
```



### DOM(Document Object Model) 트리

##### `요소(element)`

`\<h1>contents\</h1>`  (여는/시작)태그 ~ (닫는/종료)태그

  \>> HTML 요소는 태그와 내용(contents)로 구성되어 있음



##### `속성(attribute)`

`<a href="https://google.com"></a>`  속성명 = "속성값"



##### `HTML Global Attribute`

- 모든 HTML 요소가 공통으로 사용할 수 있는 속성(몇몇 요소에는 효과가 없을 수 있음)

  `id, class, etc...`





### 시맨틱 태그(Semantic Tag)

- HTML5에서 의미론적 요소를 담은 태그의 등장
- 대표적인 태그들은 다음과 같다.
  - header : 문서 전체나 섹션의 헤더(머릿말 부분)
  - nav : 내비게이션
  - section : 문서의 일반적인 구분, 컨텐츠의 그룹을 표현
  - article : 문서, 페이지, 사이트 안에서 독립적으로 구분되는 영역
  - footer : 문서 전체나 섹션의 푸터(마지막 부분)
- 개발자 및 사용자 뿐만 아니라..
- 웹상에 존재하는 수많은 웹 페이지들에 메타데이터를 부여하여 기존의 단순한 데이터의 집합이었던 웹페이지를 '의미'와 '관련성'을 가지는 거대한 데이터베이스로 구축하고자 하는 발상



### input 유형(type)









# CSS

### 선택자(Selector)

- HTML 문서에서 특정한 요소를 선택하여 스타일링 하기 위함
- 기본선택자
  - 전체 선택자, 요소 선택자
  - 클래스 선택자, 아이디 선택자, 속성 선택자
- 결합자(Combinators)
  - 자손 결합자, 자식 결합자
  - 일반 형제, 인접 형제 결합자



### CSS상속

- CSS는 상속을 통해 부모 요소의 속성을 자식에게 상속

  - 상속되는 것 : Text 관련 요소(font, color, text-align), opacity, visibility 등

  - 상속되지 않는 것 : Box model 관련 요소(width, height, margin, padding, border, box-sizing, display)

    ​							position 관련 요소(position, top/right/bottom/left, z-index 등)

- 



### Postion

- static : 디폴트 값(기준 위치)
  - 기본적인 요소의 배치 순서에 따름(좌측 상단)
  - 부모 요소 내에서 배치될 때는 부모 요소의 위치를 기준으로 배치
- relative
  - static 위치를 기준으로
- absolute
  - 부모를 기준으로
- fixed
  - 



### Flex

- 배치 방향 설정 : flex-direction
- 메인축 방향 설정 : justify-content
- 교차축 방향 설정 : align-items, align-self, align-content
- 기타 : flex-wrap, flex-flow, flex-grow, order, flex-shrink, flex-basis





##### Emmet

div.class

div#id

div>a

dummy data: lorem + `tab`





## HTTP(HyperText Transfer Protocol)

##### 개념

- HTML 문서와 같은 리소스들을 가져올 수 있도록 해주는 프로토콜(규칙, 약속)
- 웹에서 이루어지는 모든 데이터 교환의 기초
- 클라이언트-서버 프로토콜
- 요청(request)
  - 클라이언트(브라우저)에 의해 전송되는 메시지
- 응답(responses)
  - 서버에서 응답으로 전송되는 메시지



##### 특징

- 비연결지향(connectionless) : 서버는 응답 후 접속을 끊음
- 무상태(stateless) : 접속이 끊어지면 클라이언트와 서버 간의 통신이 끝나며 상태를 저장하지 않음





## Cookie

##### 개념

- 서버가 사용자의 웹 브라우저에 전송하는 작은 데이터 조각

- 브라우저(클라이언트)는 전송 받은 쿠키를 로컬에 key-value의 데이터 형식으로 저장

  (동일한 서버에 재요청 시 저장된 쿠키를 함께 요청)

- 웹 페이지에 접속하면 요청한 웹페이지를 받으며 쿠키를 로컬에 저장하고, 클라이언트가 서버에 재요청할 때마다 웹페이지 요청과 함께 쿠키 값도 같이 전송

##### 사용목적

- 세션관리 : 로그인, 아이디 자동완성, 공지 하루 안보기, 팝업체크, 장바구니 등의 정보 관리
- 개인화 : 사용자 선호, 테마 등의 세팅
- 트래킹 : 사용자 행동을 기록 및 분석하는 용도

##### Cookie lifetime

1. Session cookie
   - 현재 세션(current session)이 종료되면 삭제
   - 브라우저는 현재 세션이 종료되는 시기를 정의
   - 일부 브라우저는 다시 시작할 때 세션 복원(session restoring)을 사용해 계속 지속될 수 있도록 함
2. Permanet cookie
   - Expires 속성에 지정된 날짜 혹은 Max-Age 속성에 지정된 기간이 지나면 삭제



## Session

##### 개념

- 사이트와 특정 브라우저 사이의 'state(상태)'를 유지시키는 것
- 클라이언트가 서버에 접속하면 서버가 특정 session_id를 발급하고 클라이언트는 session id를 쿠키를 사용해 저장, 클라이언트가 다시 서버에 접속할 때 해당 쿠키(session id가 저장된)를 이용해 서버에 session id 전달
- Django는 특정 session id를 포함하는 쿠키를 사용해서 각각의 브라우저와 사이트가 연결된 세션을 알아냄(세션 정보는 django DB의 django_session 테이블에 저장)
- 주로 로그인 상태 유지에 사용



## Rendering

- 사용자 화면에 뷰를 보여주는 것





##### https://animate.style/  애니메이션 api

##### https://poiemaweb.com/ 웹프로그래밍 튜토리얼

##### https://cantunsee.space/ 디자인 감각 테스트

##### https://codepip.com/ 게임으로 배우는 html, css

##### https://flexboxfroggy.com/#ko flexbox 연습 사이트

##### http://www.flexboxdefense.com/ flexbox 연습 사이트

##### https://css-tricks.com/ flexbox 연습 사이트

##### material design 부트스트랩 같은 사이트

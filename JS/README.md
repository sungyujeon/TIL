# JAVASCRIPT(ECMAScript)

> 왜 배우는가? 
>
> 브라우저 화면을 '동적'으로 만들기 위함
>
> 브라우저를 조작할 수 있는 유일한 언어
>
> > 브라우저
> >
> > 웹 서버에서 이동하며 클라이언트와 서버간 양방향으로 통신하고, HTML 문서나 파일을 출력하는 GUI 기반의 소프트웨어 인터넷 컨텐츠를 검색 및 열람하도록 함. 구글 크롬, 모질라 파이어폭스, 마이크로소프트 엣지, 오페라, 사파리 등

## HISTORY

- ##### 핵심 인물
  
  - 팀 버너스리(Sir Tim Berners-Lee) : WWW, URL, HTTP, HTML 최초 설계자, 웹의 아버지
  - 브랜던 아이크(Brendan Eich) : JavaScript 최초 설계자, 모질라 재단 공동 설립자, 코드네임 피닉스 프로젝트 진행(파이어폭스 전신)
  
- ##### JS의 탄생
  
  - 1994년 넷스케이프 커뮤니케이션스사의 Netscape Navigator(NN) 브라우저가 전세계 점유율 80% 이상 독점하며 표준 역할을 함
  - 당시 넷스케이프에 재직중이던 브랜던 아이크가 HTML을 동적으로 동작하기 위한 회사 내부 프로젝트를 진행 중 JS를 개발
  - 이름 변천사
    - Mocha -> LiveScript > JavaScript(1995)
  
- ##### 파편화와 표준화
  
  - 제1차 브라우저 전쟁 이후 많은 브라우저에서 자체 자바스크립트 언어를 사용
  - 크로스 브라우징 이슈가 발생하여 웹 표준의 필요성이 제기
  - 크로스 브라우징
    - W3C에서 채택된 표준 웹 기술을 채택해 서로 다른 브라우저에서 다르게 구현되는 기술을 비슷하게 만들며 웹 페이지를 제작하는 방법론
  - 1996년부터 넷스케이프는 표준 제정에 대한 필요성 주장
    - Ecma 인터내셔널(정보와 통신 시스템을 위한 국제적 표준화 기구)에 표준 제정 요청
  - 1997년 ECMAScript 1(ES1) 탄생
  - 2015년 ES2015(ES6) 탄생
    - JS의 고질적인 문제 해결
  
- ##### Vanilla JavaScript
  
  - 표준화된 브라우저, ES6 이후의 다양한 도구의 등장으로 순수 자바스크립트 활용의 증대
  
- ECMA(ECMA International)

  - 정보 통신에 대한 표준을 제정하는 비영리 표준 기구
  - ECMAScript는 ECMA에서 ECMA-262 규격에 따라 정의한 언어
  - ECMAScript6는 ECMA에서 제안하는 6번째 표준 명세를 말함

- Semicolon

  - 자바스크립트는 세미콜론을 선택적으로 사용
  - 세미콜론이 없을 경우 ASI(Automatic Semicolon Insertion)에 의해 자동으로 세미콜론이 삽입

- 코딩 스타일 가이드

  - 코딩 스타일의 핵심은 합의된 원칙과 일관성(절대적인 하나의 정답은 없으며, 상황에 맞게 원칙을 정하고 일관성 있게 사용하는 것이 중요)
  - 코딩 스타일은 코드의 품질에 직결되는 중요한 요소(나아가 코드의 가독성, 유지보수 또는 팀원과의 커뮤니케이션 등 개발 과정 전체에 영향을 끼침)
  - 참고
    - Airbnb Javascript Style Guide
    - Google Javascript Style Guide
    - standardjs



## 변수(variable)와 식별자(identifier)

- 식별자

  - 변수를 구분할 수 있는 변수명을 말함
  - 문자, 달러($), 밑줄(_)로 시작
  - 대소문자를 구분하며 클래스명 외에는 모두 소문자로 시작
  - 예약어 사용 불가능(for, if, case 등)
  - 작성 스타일
    - camelCase, lower-camel-case (변수, 객체, 함수)
    - PascalCase, upper-camel-case (클래스, 생성자)
    - SNAKE_CASE (상수)

- 변수

  > 선언(Declaration) : 변수를 생성하는 행위 또는 시점
  >
  > 할당(Assignment) : 선언된 변수에 값을 저장하는 행위 또는 시점
  >
  > 초기화(Initialization) : 선언된 변수에 처음으로 값을 저장하는 행위 또는 시점

  - let

    - 재할당할 수 있는 변수 선언 시 사용
    - 변수 재선언 불가능
    - 블록 스코프(if, for, 함수 등의 중괄호 내부를 가리킴, 블록 스코프를 가지는 변수는 블록 바깥에서 접근 불가능)

  - const

    - 재할당할 수 없는 변수 선언 시 사용
    - 변수 재선언 불가능
    - 블록 스코프

  - var

    - var로 선언한 변수는 재선언 및 재할당 모두 가능

    - ES6 이전에 변수를 선언할 때 사용되던 키워드

    - 호이스팅 되는  특성으로 인해 예기치 못한 문제 발생 가능

      (ES6 이후부터는 var 대신 const와 let을 사용하는 것을 권장)

      >  hoisting
      >
      > 변수를 선언 이전에 참조할 수 있는 현상
      >
      > 변수 선언 이전의 위치에서 접근 시 undefined를 반환

    - 함수 스코프



## DOM(Document Object Model)

> - DOM 조작 : 문서(HTML) 조작
>
> - BOM(Browser Object Model) 조작 : navigator, screen, location, frames, history, XHR
>
> - JavaScript Core(ECMAScript)
>   - Data Structure(Object, Array), Conditional Expression, Iteration



### DOM

- HTML, XML 등과 같은 문서를 다루기 위한 언어 독립적인 문서 모델 인터페이스
- 문서를 구조화하고 구조화된 구성 요소를 하나의 객체로 취급하여 다루는 논리적 트리 모델
- 문서가 구조화되어 있으며 각 요소는 객체(object)로 취급
- 단순한 속성 접근, 메서드 활용 뿐만 아니라 프로그래밍 언어적 특성을 활용한 조작 가능
- ##### 주요 객체
  
  - window : DOM을 표현하는 창. 가장 최상위 객체(작성 시 생략 가능)
  - document : 페이지 콘텐츠의 Entry Point 역할을 하며, <body> 등과 같은 수많은 다른 요소들을 포함
  - navigator, location, history, screen
- ##### BOM(Browser Object Model)
  
  - 자바스크립트가 브라우저와 소통하기 위한 모델
  - 브라우저의 창이나 프레임을 추상화해서 프로그래밍적으로 제어할 수 있도록 제공하는 수단(버튼, URL 입력창, 타이틀 바 등 브라우저 윈도우 및 웹페이지의 일부분을 제어 가능)
  - window 객체는 모든 브라우저로부터 지원받으며 브라우저 window 자체를 지칭
- ##### DOM - 해석
  
  - Parsing(파싱) : 구문 분석, 해석, 브라우저가 문자열을 해석하여 DOM Tree로 만드는 과정
- ##### DOM 조작
  
  - Document는 문서 한 장(HTML)에 해당하고 이를 조작
  - 조작 순서 : 선택(select) / 변경(manipulation)
- DOM 관련 객체의 상속 구조
  - EventTarget : Event Listener를 가질 수 있는 객체가 구현하는 DOM 인터페이스
  - Node : 여러가지 DOM 타입들이 상속하는 인터페이스
  - Element : Document 안의 모든 객체가 상속하는 가장 범용적인 기반 클래스, 부모인 Node와 그 부모인 EventTarget의 속성을 상속
  - Document : 브라우저가 불러온 웹페이지를 나타냄, DOM 트리의 진입점(entry point) 역할을 수행
  - HTML Element : 모든 종류의 HTML 요소, 부모인 element의 속성 상속
- ##### DOM 선택
  
  - ##### 선택 관련 메서드
    
    - Document.querySelector() - return 단일 element
      - 제공한 선택자와 일치하는 element 하나 선택
      - 제공한 CSS selector를 만족하는 첫번째 element 객체를 반환(없다면 null)
    - Document.querySelectorAll() - return NodeList
      - 제공한 선택자와 일치하는 element를 선택
      - 매칭할 하나 이상의 셀렉터를 포함하는 유효한 CSS selector를 인자(문자열)로 받음
      - 지정된 selector에 일치하는 NodeList를 반환
    - getElementById() - return 단일 element
    - getElementByTagName() - return HTMLCollection
    - getElementByClassName() - return HTMLCollection
    - 위의 세 개보다 querySelector가 id, class, tag 선택자 등을 모두 사용가능하기 때문에 더 구체적이고 유연하게 선택 가능
  - ##### HTMLCollection & NodeList
    
    - 둘 다 배열과 같이 각 항목을 접근하기 위한 인덱스를 제공(유사 배열)
    - 둘 다 Live Collection으로 DOM의 변경사항을 실시간으로 반영하지만, querySelectorAll()에 의해 반환하는 NodeList는 Static Collection
    - HTMLCollection
      - name, id, 인덱스 속성으로 각 항목들에 접근 가능
    - NodeList
      - 인덱스 번호로만 각 항목에 접근 가능
      - 단, HTMLCollection과 달리 배열에서 사용하는 for each 함수 및 다양한 메서드 사용가능
  - ##### Collection
    
    - Live Collection
      - 문서가 바뀔 때 실시간으로 업데이트
      - DOM의 변경사항을 실시간으로 collection에 반영
    - Static Collection(non-live)
      - DOM이 변경되어도 collection 내용에는 영향을 주지 않음
      - querySelectorAll()의 반환 NodeList만 static
  - ##### 변경 관련 메서드
    
    - Document.createElement() : 주어진 태그명을 사용해 HTML 요소를 만들어 반환
    - ParentNode.append()
      - 특정 부모 노드의 자식 노드 리스트 중 마지막 자식 다음에 Node 객체나 DOMString을 삽입(반환값 없음)
      - 여러개의 Node 객체, DOMString을 추가할 수 있음
    - Node.appendChild()
      - 한 노드를 특정 부모 노드의 자식 노드 리스트 중 마지막 자식으로 삽입(Node만 추가)
      - 만약 주어진 노드가 이미 문서에 존재하는 다른 노드를 참조한다면 새로운 위치로 이동
    - ChildNode.remove() : 이를 포함하는 트리로부터 특정 객체를 제거
    - Node.removeChild({childNode})
      - DOM에서 자식 노드를 제거하고 제거된 노드를 반환
      - Node는 인자로 들어가는 자식 노드의 부모 노드
  - ##### 변경 관련 속성(property)
    
    - Node.innerText
      - 노드와 그 자손의 텍스트 컨텐츠(DOMString)를 표현(해당 요소 내부의 raw text). 사람이 읽을 수 있는 요소만 남김
      - 즉, 줄 바꿈을 인식하고 숨겨진 내용을 무시하는 등 최종적으로 스타일링이 적용된 모습으로 표현
    - Element.innerHTML
      - 요소(element) 내에 포함된 HTML 마크업을 반환
      - XSS공격에 취약점이 있으므로 사용시 주의
    - Element.setAttribute(name, value)
      - 지정된 요소의 값을 설정
      - 속성이 이미 존재하면 값을 업데이트, 그렇지 않으면 생성
    - Element.getAttribute()
      - 해당 요소의 지정된 값(문자열)을 반환
      - 인자는 값을 얻고자 하는 이름



## Event

> 네트워크 활동 혹은 사용자와의 상호작용 같은 사건의 발생을 알리기 위한 객체
>
> 이벤트는 마우스를 클릭하거나 키보드를 누르는 등 사용자 행동에 의해 발생할 수도 있고, 특정 메서드를 호출(HTML.Element.click())하여 프로그래밍적으로도 만들어낼 수 있음

- ##### 이벤트 처리기(Event-handlers)

  - EventTarget.addEventListener()
  - 해당 메서드를 통해 다양한 요소에서 이벤트를 붙일 수 있음

- ##### Event 기반 인터페이스

  - UIEvent, AininationEvent, ClipboardEvent, DragEvent 등
  - UIEvent
    - 간단한 사용자 인터페이스 이벤트
    - Event의 상속을 받음
    - MouseEvent, KeyboardEvent, InputEvent, FocusEvent 등의 부모 객체 역할을 함

- ##### Event handler

  - EventTarget.addEventListener()
  - 지정한 이벤트가 대상에 전달될 때마다 호출할 함수를 설정
  - 이벤트를 지원하는 모든 객체(Element, Document, Window 등)를 대상으로 지정 가능
  - target.addEventListener(type, listener[, options])
    - type : 반응할 이벤트 유형(대소문자 구분 문자열)
    - listener : 지정된 타입의 이벤트가 발생했을 때 알림을 받는 객체
    - EvenetListener 인터페이스 혹은 JS function 객체(콜백 함수)여야 함



## preventDefault()

- 현재 이벤트의 기본 동작을 중단
- 태그의 기본 동작(a 태그는 클릭 시 페이지 이동, form 태그는 폼 데이터를 전송)
- 이벤트의 전파를 막지 않고 이벤트의 기본 동작만 중단





---

> Basic Syntax

## Data Type

- 수(Number)

  - 정수 타입이 존재하지 않음. 명백한 정수는 암묵적으로 실수

    ```js
    console.log(3 / 2)  // 1이 아닌 1.5
    0.1 + 0.2 = 0.30000000000000004  // 비트 단위의 작업시 유의
    ```

  - String to Number

    ```js
    parseInt('123', 10)  // 123
    parseInt('010', 10)  // 10
    parseInt('0x10')  // 16, 16진수 표기법으로 된 string의 변환
    parseInt('11', 2)  // 3, 2진수로 변환
    ```

    ```js
    // 단항 연산자를 사용한 숫자 변환
    + '42'  // 42
    ```

    ```js
    // 문자열이 수가 아닌 경우 NaN(Not a Number) 반환
    parseInt('hello', 10)  // NaN
    isNaN(NaN)  // true
    ```

    ```js
    // infinity, -infinity
    1 / 0  // infinity
    -1 / 0  // -infinity
    ```

- 문자열(String)

  ```js
  'hello'.length  // 5
  'hello'.charAt(0)  // 'h'
  'hello, world'.replace('hello', 'goodbye')  // 'goodbye, world'
  'hello'.toUpperCase()  // 'HELLO'
  ```

- 부울(Boolean)

  - `false` false, 0, 빈 문자열(" "), NaN, null, undefined

    ```js
    Bollean('')  // false
    Bollean(234)  // true
    ```

  - `&&`, `||`, `!`  지원

- 기호(Symbol)

- 객체(Object) - 함수(Function), 배열(Array), 날짜(Date), 정규식(RegExp)

  > 아래 Object 참조

- 널(Null)

  - 값이 없음을 가리키는 '객체'타입의 객체

- 정의되지 않음(Undefined)

  - 할당되지 않은 변수



## Operators(연산자)

- `+` `-` `*` `/` `%` `=` `==` `===` `++` `--`

- `==` vs `===`

  ```js
  123 == '123'  // true
  123 === '123'  // false
  ```



## Modifier(제어자)

- `if` `else if` `else`

  ```js
  let name = 'hong'
  if (name == 'hong') {
    name += 'kim'
  } else if (name == 'kim') {
    name += 'hong'
  } else {
    name += '!'
  }
  ```

- `switch`

  ```js
  switch(action) {
    case 'draw':
      drawIt()
      break
    case 'eat':
      eatIt()
      break
    default:
      doNothing()
  }
  ```

  

- `while` `do-while`

  ```js
  while (true) {
    // 무한루프
  }
  
  do {
    // 실행
  } while (true)
  ```

- `for`

  - `for ... in`  vs `for ... of`

    - for in은 객체의 모든 열거가능한 속성에 대해 반복
    - for of 컬렉션 전용 / 모든 객체 보다는 [Symbol.iterator] 속성이 있는 모든 컬렉션 요소에 대해 반복

    ```js
    Object.prototype.objCustom = function () {}
    Array.prototype.arrCustom = function () {}
    
    let iterable = [3, 5, 7]
    iterable.foo = 'hello'
    
    for (let i in iterable) {
      console.log(i)  // 0, 1, 2, "foo", "arrCustom", "objCustom"
    }
    
    for (let i of iterable) {
      console.log(i)  // 3, 5, 7
    }
    ```

  ```js
  for (let i = 0; i < 5; i++) {
    // 5번 반복
  }
  ```

  ```js
  for (let value of array) {
    // value로 작업 실행
  }
  ```

  ```js
  for (let property in object) {
    // object의 항목(property)로 작업 실행
  }
  ```

- 삼항 연산자

  ```js
  let allowed = (age > 18) ? 'yes' : 'no'
  ```



## Object(객체)

> JavaScript 객체는 이름-값 쌍(name-value pairs) 다음과 비슷함
>
> - Python : Dictionaries
> - Perl, Ruby : Hashes
> - C, C++ : Hash tables
> - Java : HashMaps
> - PHP : Associative arrays

- 빈 객체 생성

  ```js
  const obj = new Object()
  const obj = {}  // object literal
  
  const obj = {
    name: 'Carrot',
    'for': 'max',
    details: {
      color: 'orange',
      size: 12
    }
  }
  
  obj.details.color  // orange
  obj['details']['size']  // 12
  ```

- 객체 프로토타입(Person)과 프로토타입의 인스턴스(you) 생성

  ```js
  function Person(name, age) {
    this.name = name
    this.age = age
  }
  
  const you = new Person('You', 24)
  ```



## Functions

- 기본 구조

  ```js
  function add(x, y) {
    const total = x + y
    return total
  }
  // return이 없을 시 undefined
  add(2, 3)  // 5
  add(2, 3, 4)  // 매개변수 보다 많은 매개변수 전달 시 4는 무시됨
  ```

- arguments

  ```js
  // 매개변수를 함수 내부에서 접근할 수 있는 객체
  function avg() {
    let sum = 0
    for (let i = 0, j = arguments.length; i < j; i++) {
      sum += arguments[i]
    }
    return sum / arguments.length
  }
  
  avg(2, 3, 4, 5)  // 3.5
  ```

- rest parameter

  ```js
  function avg(...args) {
    let sum = 0
    for (let value of args) {
      sum += value
    }
    return sum / arr.length
  }
  ```

  선언 위치 이후에 모든 인자를 저장 >> function avg(firstValue, ...args) {} 에서 첫번째 값은 firstValue에, 두번째부터 args에 전달됨

- 익명 함수(Anonymous function)

  ```js
  const avg = function () {
    // ...code
  }
  ```

- ##### user-defined functions(사용자 정의 객체)

  js에서는 function을 class로 사용

  ```js
  // 1
  function Person(first, last) {
    return {
      first: first,
      last: last
    }
  }
  function personFullName(person) {
    return person.first + ' ' + person.last
  }
  
  
  // 2
  function Person(first, last) {
    this.first = first
    this.last = last
    this.fullName = function () {
      return this.first + ' ' + this.last 
    }
  }
  const p = new Person('Simon', 'Willison')
  
  
  // 3(객체 생성 시마다 fullName 함수 객체를 생성하여 낭비하는 것을 개선)
  function personFullName() {
    return this.first + ' ' + this.last
  }
  
  function Person(first, last) {
    this.first = first
    this.last = last
    this.fullName = personFullName
  }
  
  // 4
  // Person.prototype은 모든 Person 인스턴스들 간에 공유되는 객체
  // Person 객체의 설정되지 않은 속성에 접근을 시도할 때마다,
  // 대체용도로 Person.prototype에 그 속성이 있는지 찾음
  function personFullName() {
    return this.first + ' ' + this.last
  }
  
  function Person(first, last) {
    this.first = first
    this.last = last
  }
  Person.prototype.fullName = function () {
    return this.first + ' ' + this.last
  }
  ```

  ```js
  // built-in 객체의 prototype에도 추가 가능
  const s = 'Simon'
  s.reversed()  // TypeError on line 1: s.reversed is not a function
  
  String.prototype.reversed = function () {
    let r = ''
    for (let i = this.length - 1; i >= 0; i--) {
      r += this[i]
    }
    return r
  }
  s.reversed()  // nomiS
  ```

- Inner functions(내장 함수)

  지역 변수로 함수를 선언하여 name space를 늘리지 않고,  유지 보수에 용이하게 코드 구조를 가져갈 수 있음

  ```js
  function parentFunc () {
    const a = 1
    
    function nestedFunc () {
      const b = 4
      return a + b
    }
    return nestedFunc() // 5
  }
  ```

  

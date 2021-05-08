# AJAX

>Asynchronous Javascript And XML(비동기식 js와 xml)
>
>- 서버와 통신하기 위해 XMLHttpRequest 객체를 활용
>
>  - XMLHttpRequest는 동기식, 비동기식 통신 모두 지원
>
>  - XML 뿐만 아니라 모든 종류의 데이터를 받아오는 데 사용 가능
>
>  - 생성자 : XMLHttpRequest()
>
>    ```js
>    const request = new XMLHttpRequest()
>    const URL = 'https://jsonplaceholder.typicode.com/todos/1/'
>       
>    request.open('GET', URL)
>    request.send()
>       
>    const todo = request.response
>    console.log(todo)
>    ```
>
>    
>
>- 페이지 전체를 reload하지 않고서도 수행되는 '비동기성'
>
>  - 사용자의 event가 있으면 전체 페이지가 아닌 일부분만을 업데이트
>
>- AJAX의 X가 XML을 의미하긴 하지만, 요즘은 더 가벼운 용량과 JavaScript의 일부라는 장점 때문에 JSON을 더 많이 사용



## 배경

- 2005년 Google Maps & Gmail 드엥 활용되는 기술을 설명하기 위해 AJAX라는 용어를 최초로 사용
- AJAX는 특정 기술이 아닌 기존의 여러 기술을 사용하는 새로운 접근법을 설명하는 용어
  - 기존 기술을 잘 활용할 수 있는 방식으로 구성 및 재조합한 새로운 접근법
- Google 사용 예시
  - Gmail : 메일의 전송 버튼을 눌러놓고 다른 페이지로 넘어가고 메일은 알아서 전송 처리됨
  - Google Mas : 스크롤하는 행위 하나하나가 모두 요청이지만 페이지는 갱신되지 않음



## 동기와 비동기

##### 동기식

- 순차적, 직렬적 태스크 수행
- 요청을 보낸 후 응답을 받아야만 다음 동작이 이루어짐(blocking)

##### 비동기식

- 병렬적 태스크 수행

- 요청을 보낸 후 응답을 기다리지 않고 다음 동작이 이루어짐(non-blocking)

  (요청을 보내놓고 다음 태스크로 진행)



## Asynchronous JS

##### Concurrency model

Event loop를 기반으로 하는 동시성 모델(Concurrency model)

- Call Stack
  - 요청이 들어올 때마다 해당 요청을 순차적으로 처리하는 Stack(LIFO) 형태의 자료 구조
- Web API(Browser API)
  - JavaScript 엔진이 아닌 브라우저 영역에서 제공하는 API
  - setTimeout(), DOM events, 그리고 AJAX로 데이터를 가져오는 시간이 소요되는 일들을 처리
- Task Queue(Event Queue, Message Queue)
  - 콜백 함수가 대기하는 Queue(FIFO) 형태의 자료 구조
  - main thread가 끝난 후 실행되어 후속 JavaScript 코드가 차단되는 것을 방지
- Event Loop
  - Call Stack이 비어있는지 여부 확인
  - 비어있는 경우 Task Queue 에서 실행 대기중인 콜백이 있는지 확인
  - Task Queue 대기중인 콜백이 있다면 가장 앞에 있는 콜백을 Call Stack으로 push



##### 순차적인 비동기 처리

- Web API로 들어오는 순서는 중요하지 않고, 어떤 이벤트가 먼저 처리되느냐가 중요(실행 순서 불명확)

- 이를 해결하기 위해 순차적인 비동기 처리를 위한 2가지 작성 방식

- ##### Async callbacks

  - 백그라운드에서 실행을 시작할 함수를 호출할 때 인자로 지정된 함수
  - 예) addEventListener()의 두번째 인자

- ##### promise-style

  - Modern Web APIs에서의 새로운 코드 스타일
  - XMLHttpRequest 보다 조금 더 현대적인 버전



## Callback Function

> 다른 함수에 인자로 전달된 함수
>
> 외부 함수 내에서 호출되어 일종의 루틴 또는 작업을 완료함
>
> 동기식, 비동기식 모두 사용됨
>
> 비동기 작업이 완료된 후 코드 실행을 계속하는 데 사용되는 경우 비동기 콜백이라고 함

- Async callbacks

  - 백그라운드에서 코드 실행을 시작할 함수를 호출할 때 인자로 지정된 함수
  - 백그라운드 코드 실행이 끝나면 콜백 함수를 호출하여 작업이 완료되었음을 알리거나 다음 작업을 실행하게 할 수 있음

- Why use Callback?

  - 콜백 함수는 명시적인 호출이 아닌 특정 routine 혹은 action에 의해 호출되는 함수

  - Django의 경우 '요청이 들어오면', event의 경우 '특정 이벤트가 발생하면' 이라는 조건 하에서 함수를 호출할 수 있었던 건 'Callback Function' 매커니즘이 있기 때문에 가능

  - 비동기 로직을 수행할 때 콜백 함수는 필수

    명시적인 호출이 아닌 특정 시점에 알아서 호출되도록 만들어야 하기 때문이며, 기다려주지 않고 언젠가 처리해야 하는 일은 콜백 함수를 활용

- Callback Hell

  - 순차적인 연쇄 비동기 작업을 처리하기 위해 '콜백 함수를 호출하고 , 그다음 콜백 함수를 호출하고, 또 그 함수의 콜백 함수를 호출하고...'의 패턴이 지속적으로 반복되어  여러 개의 연쇄 비동기 작업을 할 때 마주하는 상황

  - Callback Hell 또는 pyramid of doom 라고 부름

  - 디버깅 어려움, 코드 가독성 떨어짐

  - 해결하기

    - Keep your code shallow

    - Modularize

    - Handle every single error

    - ##### Promise way



## Promise

- Promise object

  - 비동기 작업의 최종 완료 또는 실패를 나타내는 객체

    - 미래의 완료 또는 실패와 그 결과 값을 나타냄
    - 미래의 어떤 상황에 대한 약속

  - 각각의 .then() 블록은 서로 다른 promise를 반환, 즉 chaining 하여 연쇄적인 작업 수행 가능 >> 결국 여러 비동기 작업을 차례대로 수행할 수 있음

    \>> 반드시 반환값이 있어야 함, 없다면 콜백 함수가 이전의 promise 결과를 받을 수 없음

  - 성공(이행)에 대한 약속 : <b>.then()</b>

    - 이전 작업(promise)이 성공했을 때(이행했을 때) 수행할 작업을 나타내는 콜백 함수
    - 그리고 각 콜백 함수는 이전 작업의 성공 결과를 인자로 전달 받음
    - 따라서 성공했을 때의 코드를 콜백 함수 안에 작성

  - 실패(거절)에 대한 약속 : <b>.catch()</b>

    - .them이 하나라도 실패하면(거부되면) 동작

      (동기식의 'try..except' 구문과 유사)

    - 이전 작업의 실패로 인해 생성된 error 객체는 catch블록 안에서 사용할 수 있음

- Promise의 상태

  - 대기(pending) : 이행하거나 거부되지 않는 초기 상태
  - 이행(fulfilled) : 연산이 성공적으로 완료됨
  - 거부(rejected) : 연산이 실패함

- 

  
# React

> 2021.06.04 ~ ing



## Setting

1) cdn install 방식

 - React API, React DOM, Babel 설치 필요

   ```html
   <head>
     <script src="https://unpkg.com/react@^16/umd/react.production.min.js"></script>
     <script src="https://unpkg.com/react-dom@16.13.0/umd/react-dom.production.min.js"></script>
   	<script src="https://unpkg.com/babel-standalone@6.26.0/babel.js"></script>
   </head>
   
   <body>
     <div id ="root"></div>
     <script type="text/babel">
     	// React code will go hear
     	class App extends react.Components {
   			render() {
       		return (
         		// react html
       			<h1>Hello World</h1>
       		)
   		  }
   		}
   
   		ReactDOM.redner(<App/>, document,getElementById('root'))
     </script>
   </body>



2) npm 설치

- 위 패키지를 통해 설치 시 port 3000을 통해 react node server 활성화 후 실행

  ```bash
  $ npx create-react-app {project-name}
  $ npm start
  ```

- node.js package 모듈을 통해 react project 생성  >> react server start(node package를 통해 설치 시 gitingore, src 등 기본 폴더 구조 생성(node_modules, .gitingnore, README.md, package.json))

- /public/index.html : root html 파일

- /src/App.js : root js 파일, 모든 react code에 대한 compile

- /src/index.css  &&  /src/index.js : 모든 react code에 대한 css, js 파일 load

  /src/index.js에서 react, react-dom, ./index.css, App.js load하여 root html인 /public/index.html에 render



## State

> 컴포넌트 안에서 관리되는 데이터를 저장하는 객체
>
> state data를 사용하는 쪽과 구현하는 쪽을 분리시키기 위함
>
> state data의 변경이 일어날 때 해당 변수의 데이터가 모두 변경되도록 연동됨(state가 변경이 되면 HTML이 자동으로 rerendering)

- useState

  - useState 함수에 인자로 data를 전달하면, state 객체에 저장되는 변수와 해당 변수를 변경시키는 함수를 배열로 반환
  - 아래 setScore() 함수를 실행하여 state data를 변경시킴(인자로 대체시킬 값을 전달)

  ```react
  import { useState } from 'react'
  
  // score는 해당 state 데이터(0), setScores는 해당 데이터를 변경하는 함수
  // state data에는 문자, 숫자, 배열, 객체 등 모든 타입의 데이터를 할당할 수 있음
  let [score, setScore] = useState(0)
  
  // score 1 증가
  setScore(score++)
  ```



## Event Handler

```react
// attribute: event, value: { 실행될 함수 }
<span onClick={ func }>button</span>
```





## Syntax

- class

  class는 js에서 이미 사용하고 있는 예약어(Reserved Words)이므로 className 속성으로 설정

  ```react
  <div className="container"></div>
  ```

  

- data binding

  - 중괄호({})를 사용하여 데이터를 바인딩

  - 변수, 함수 등을 모두 바인딩 가능

    ```react
    function App() {
      let posts = 'Posts'
      function func() {
        return 100
      }
      return (
        <div className="App">
          <h4>{ posts }</h4>
          <h4>{ func() }</h4>
          <img src={ logo } />
        </div>
      );
    }
    ```

  

- style attribute

  - js의 예약어 등 제한이 많기 때문에 중괄호 안에 key-value 쌍으로 명시

  - '-' 등이 사용되는 스타일 속성은 camelCase로 작성

    ```react
    let myStyle = { color: 'blue', fontSize: '30px' }
    <h4 style={ myStyle }>{ posts }</h4>
    ```

    

  

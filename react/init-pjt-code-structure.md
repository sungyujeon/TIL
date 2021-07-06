# Initial Project Code Structure

> 처음 리액트 프로젝트를 생성했을 시 자동 생성되는 코드의 구조 설명



##### React Module

```react
import React from 'react'
```

- 리액트를 불러와서 사용할 수 있게 해줌
- 프로젝트 생성 시 node_modules directory에 react 모듈이 설치되고, import 구문을 사용해 불러옴
- Point
  - 모듈을 불러와서 사용하는 것은 브라우저에 없던 기능으로, 브라우저가 아닌 환경에서 자바스크립트를 실행할 수 있게 해주는 환경인 node.js에서 지원하는 기능임.
  - 이 기능을 브라우저에서도 사용하기 위해 번들러(bundler)를 사용



##### bundler

- 대표적인 번들러로 webpack, Parcel, browserify 등이 있음

- 번들러 도구를 사용하면 모듈을 불러왔을 때 불러온 모듈을 모두 합쳐 하나의 파일을 생성해줌

- 파일 로드

  ```react
  import logo from './logo.svg'
  import './App.css'
  ```

  - 웹팩을 사용하면 SVG, CSS 파일 등도 불러와서 사용 가능
  - 웹팩의 로더(loader)라는 기능이 담당
    - css-loader(css 파일), file-loader(웹폰트, 미디어 파일 등)
    - babel-loader는 최신 js 문법을 ES5 문법으로 변환(구 브라우저 호환성 문제)

  

##### JSX

- 컴포넌트 내에서 return 값이 되는 자바스크립트의 확장 문법
- JSX 형식으로 작성한 코드는 브라우저에서 실행되기 전 코드가 번들링 되는 과정에서 바벨이 일반 자바스크립트 형태의 코드로 변환함



##### ReactDOM

```react
import ReactDOM from 'react-dom'

ReactDOM.render(
	<React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
```

- ReactDOM.render()는 컴포넌트를 페이지에 렌더링 하는 역할을 함
- 첫번째 파라미터에는 페이지에 렌더링할 내용을 JSX 형태로 작성하고, 두번째 파라미터에는 JSX를 렌더링할 document 내부 요소 설정
- React.StrictMode
  - 리액트 프로젝트에서 리액트의 레거시 기능들을 사용하지 못하게 하는 기능
  - 향후 deprecated 될 기능을 사용했을 때 경고를 출력하게 됨



##### Component의 JSX를 하나의 요소로 감싸주어야 하는 이유

- Virtual DOM에서 컴포넌트 변화를 감지할 때 효율적으로 비교할 수 있도록 컴포넌트 내부는 하나의 DOM 트리 구조로 이루어져야 한다는 규칙이 있기 때문
- \<div /> 태그 또는 `<></> ` fragment 사용


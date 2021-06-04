# React



## Setting

1) cdn install 방식

​	- React API, React DOM, Babel 설치 필요

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
```

2) npm 설치

- 위 패키지를 통해 설치 시 port 3000을 통해 react node server 활성화 후 실행

  ```bash
  $ npx create-react-app {project-name}
  $ npm start
  ```

- node.js package 모듈을 통해 react project 생성  >> react server start(node package를 통해 설치 시 gitingore, src 등 기본 폴더 구조 생성(node_modules, .gitingnore, README.md, package.json))

- /public/index.html : root html 파일

- /src/App.js : root js 파일, 모든 react cod에 대한 compile

- /src/index.css && /src/index.js : 모든 react code에 대한 css, js 파일 load

  /src/index,js에서 react, react-dom, ./index.css load

1

3) 





- react.components를 상속함으로써 render 함수를 호출하여 return 값으로 html 페이지를 로드함

```React
class App extends react.Components {
	render() {
    return (
      // react html
    	<h1>Hello World</h1>
    )
  }
}
```





2) 







- node.js 설치

  ```bash
  
  ```

- 


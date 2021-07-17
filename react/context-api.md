# Context API

> - Context API는 리액트 프로젝트에서 전역적으로 사용할 데이터가 있을 때 유용한 기능
> - 리액트 관련 라이브러리(router, redux, styled-components)에서도 기반 기술로 사용
> - 사용자 로그인 정보, 앱 환경설정, 테마 등의 전역적 데이터 관리를 위함
> - Redux, MobX 같은 상태 관리 라이브러리가 있지만, v16.3 업데이트 이후 Context API가 많이 개선되어 사용



## 목차

- [Context 만들기](#context-만들기)
- [정적 Context](#정적-context)
  - Consumer
  - Provider
- [동적 Context](#동적-context)
- [useContext Hook](#usecontext-hook)
- [static contextType](#static-contexttype)



## Context 만들기

- /src/context 디렉토리에 만들어 다른 파일들과 구분

- 생성

  ```jsx
  import { createContext } from 'react'
  
  const ColorContext = createContext({
    color: 'black',
    // ...
  })
  
  export default ColorContext
  ```



## 정적 Context

##### Consumer(context value 사용)

- 다른 컴포넌트에서 생성한 context 사용

- ColorBox 컴포넌트에서의 사용

  - Consumer 사이에 중괄호를 넣어 그 안에 함수를 넣어줌

  - 이러한 패턴을 Function as a child 혹은 Render Props라 함

    (컴포넌트의 childeren이 있어야할 자리에 일반 JSX 또는 문자열이 아닌 함수를 전달하는 것)

  ```jsx
  import ColorContext from '../context/ColorContext'
  
  const ColorBox = () => {
    <ColorContext.Consumer>
    	{ 
        value => (
          <div
            style={{
              background: value.color
            }}
            
          >
          </div>
      	)
      }
    </ColorContext.Consumer>
  }
  
  export default ColorBox
  ```



##### Provider(context value 변경)

- Provider를 사용해 context value 수정 가능

- Provider를 사용할 때는 value 값을 반드시 명시해주어야 동작함

  ```jsx
  // App.js
  
  import ColorBox from './components/ColorBox'
  import ColorContext from './context/ColorContext'
  
  const App = () => {
    <ColorContext.Provider value={{ color: 'red' }}>
    	<ColorBox />
    </CommonContext.Provider>
  }
  ```



## 동적 Context

> 위 정적 context에서는 고정된 value만 사용이 가능했지만, 동적 context는 context 값을 업데이트할 수 있음

- ColorProvider, ColorConsumer overriding

```jsx
// /src/context/ColorContext.js

import React, { createContext, useState } from 'react'

const ColorContext = createContext({
  state: {
    color: 'black',
    subcolor: 'red'
  },
  actions: {
    setColor: () => {},
    setSubcolor: () => {}
  }
})

const ColorProvider = ({ children }) => {
  const [color, setColor] = useState('black')
  const [subcolor, setSubcolor] = useState('red')
  
  const value = {
  	state: { color, subcolor },
    actions: { setColor, setSubcolor }
  }
  
  return (
  	<ColorContext.provider value={value}>
      {children}
    </ColorContext.provider>
  )
}

const { Consumer: ColorConsumer } = ColorContext

export { ColorProvider, ColorConsumer }
export default ColorContext
```



- 프로젝트 적용

  ```jsx
  // App.js
  
  import ColorBox from './components/ColorBox'
  import SelectColors from './components/SelectColors'
  import { ColorProvider } from './context/ColorContext'
  
  const App = () => {
    return (
    	<ColorProvider>
        <SelectColors />
      	<ColorBox />
      </ColorProvider>
    )
  }
  
  export default App
  ```

  ```jsx
  // 동적 context에서 state 값을 가져와 사용하는 컴포넌트에서는 ColorConsumer.state를 사용하고, state 값을 변화시키는 컴포넌트에서는 ColorConsumer.actions를 사용
  
  // /src/components/ColorBox.jsx
  import { ColorConsumer } from './context/ColorContext'
  
  const ColorBox = () => {
    return (
    	<ColorConsumer>
      	{
          value => (
          	<>
            	<div
              	style={{
                	width: '64px',
                  background: value.state.color
  	            }}
              >
            	</div>
            </>
          )
        }
      </ColorConsumer>
    )
  }
  
  // /src/components/SelectColors.jsx
  import { ColorConsumer } from './context/ColorContext'
  
  const colors = ['red', 'blue', ...]
  
  const SelectColors = () => {
    return (
    	<div>
        <ColorConsumer>
          {({ actions }) => {
            <div>
              {colors.map( color => (
                <div
                  key={color}
                  style={{
                    background: color
                  }}
                  onClick={() => {
                    actions.setColor(color)
                  }}
                  
                >
                </div>
              ))}  
            </div>
          }}
        	
        </ColorConsumer>
      	
      </div>
    )
  }
  
  export default SelectColors
  ```

  

## useContext Hook

> Consumer 대신 useContext Hook을 이용해 편리하게 context 사용 가능

```jsx
// src/context/ColorContext

import { ColorContext } from './context/ColorContext'

const ColorBox = () => {
  const { state } = useContext(ColorContext)
  return (
  	<>
    	<div
      	style={{
        	background: state.color
      	}}
      >	
    	</div>
    </>
  )
}

export default ColorBox
```



## static contextType

> 클래스형 컴포넌트에서 context 쉽게 사용하는 방법 - 생략




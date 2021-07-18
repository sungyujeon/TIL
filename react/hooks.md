# Hooks

> function component에서 사용
>
> Hook은 최상위(at the top level)에서만 호출해야함. 반복문, 조건문, 중첩된 함수 내에서 사용 불가능
>
> react function component와 custom Hook에서만 사용 가능
>
> Hook은 항상 `use`로 시작해 React가 감지할 수 있게함



## 목차

- [State Hook](#state-hook)
- [Effect Hook](#effect-hook)
- [Reducer Hook](#reducer-hook)
- [Context Hook](#context-hook)
- [Context & Reducer & Redux](#context-&-reducer-&-redux)
- [useMemo](#usememo)
- [useCallback](#usecallback)
- [useRef](#useref)
- [Custom Hooks](#custom-hooks)



### State Hook

> 컴포넌트 안에서 관리되는 데이터를 저장하는 객체
>
> state data를 사용하는 쪽과 구현하는 쪽을 분리시키기 위함
>
> state data의 변경이 일어날 때 해당 변수의 데이터가 모두 변경되도록 연동됨(state가 변경이 되면 HTML이 자동으로 rerendering)
>
> 일반 변수는 함수가 끝날 때 사라지지만, state 변수는 React에 의해 유지

- useState React Hook은 class component에서는 사용할 수 없고, function component에서만 사용 가능

- useState

  - useState 함수에 인자로 data를 전달하면, state 객체에 저장되는 변수와 해당 변수를 변경시키는 함수를 배열로 반환
  - 아래 setScore() 함수를 실행하여 state data를 변경시킴(인자로 대체시킬 값을 전달)

  ```jsx
  import { useState } from 'react'
  
  // score는 해당 state 데이터(0), setScores는 해당 데이터를 변경하는 함수
  // state data에는 문자, 숫자, 배열, 객체 등 모든 타입의 데이터를 할당할 수 있음
  function Board() {
    let [score, setScore] = useState(0)
    let [titles, setTitles] = useState(['title1', 'title2',])
  	
    // 1) 값
    // score 1 증가 함수
    // state 객체를 직접 변경하지 않고 사본을 만들어 변경함()
  	function increaseCount() {
      let newCount = count + 1
      setCount(newCount)
    }
    
    // 2) 객체
    // 깊은 복사를 통해 titles 사본을 만든 뒤 setTitles
    function changeTitles() {
      let newTitles = [...titles]
      newTitles[0] = 'title0'
      setTitles(newTitles)
    }
    
    return (
      // <></>: JSX fragment
    	<>
        <p>{ count }</p>
        <p>{ titles }</p>
        <button onClick={ increaseCount }>count 1 증가</button>
        <button onClick={ changeTitles }>title 변경</button>
      </>
    )
  }
  ```



### Effect Hook

- side effect를 구현하기 위한 hook(class component lifecycle method의 componentDidMount, componentDidUpdate, componentWillUnmount가 합쳐진 것)
- component가 rendering 된 이후에 어떤 일을 수행해야하는지를 표현(rendering 이후에 매번 수행되므로 effect를 수행하는 시점에 DOM이 업데이트 되었음을 보장)
- useEffect를 컴포넌트 내부에 위치시켜 state 변수에 접근 가능

```jsx
import { useState, useEffect } from 'react'

function Example() {
  const [count, setCount] = useState(0)
  const [visible, setVisible] = useState(false)
  
  // mount 될 때만 실행(constructor와 비슷)
  // 두번째 인자로 빈 배열을 전달
  // return 값을 주어 unmount 될 때만 한 번 실행할 때도 빈 배열 전달
  useEffect(() => {
    console.log('mount 시에만 실행')
    return () => {
      console.log('unmount 시에만 실행')
    }
  }, [])
  
  // 특정 값이 변경될 때에만 호출
  // 두번째 인자 배열에 필요한 변수만 넣음
  useEffect(() => {
    console.log(count)
  }, [count])
  	
  return (
  	<>
    	{ visible && 
        <CountInfo count={count}/>
      }
    </>
  )
}

const CountInfo = (props) => {
  const [count, setCount] = useState(props.count)
  
  // CountInfo component unmount 시 return 호출하여 clean up
  useEffect(() => {
    return () => {
      console.log('CountInfo component cleanup')
    }
  })

  return (
    <>
      <p>count: {count}</p>
    </>
  )
}
```



### Reducer Hook

> 다양한 컴포넌트 상황에 따라 다양한 상태를 다른 값으로 업데이트하고 싶을 때 사용
>
> 가장 큰 장점은 컴포넌트 업데이트 로직을 컴포넌트 바깥으로 뺄 수 있다는 것

```jsx
import { useReducer } from 'react'

// reducer 함수를 Counter component 외부로 빼서 사용 가능
const reducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 }
    case 'DECREMENT':
      return { count: state.count - 1 }
    default:
      return state
  }
}

const Counter = () => {
  const [state, dispatch] = useReducer(reducer, { count: 0 })

  const handleCount = type => e => {
    dispatch({ type })
  }

  return (
    <div>
      <p>Counter component의 count: {state.count}</p>
      <button onClick={handleCount('INCREMENT')}>count 증가</button>
      <hr/>
      <button onClick={handleCount('DECREMENT')}>count 감소</button>
    </div>
  )
}

export default Counter
```



### Context Hook

- [Context API](./context-api.md) 정리 파일 참조



### Context & Reducer & Redux

- [Context, Reducer, Redux 차이]() 정리 파일 참조



### useMemo

```jsx
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b])
```

- 메모이제이션된 값을 반환
- 생성(create) 함수와 의존성 값의 배열을 인자로 전달하면 useMemo는 의존성이 변경되었을 때만 메모이제이션된 값을 다시 계산
- useMemo로 전달된 함수는 렌더링 중에 실행되므로, 통상적으로 렌더링 중에는 하지 않는 것을 useMemo의 콜백함수에서 하지 말 것
- useMemo는 성능 최적화를 위해 사용할 수 있지만, 의미상으로 보장이 있다고 생각하면 안됨. 차후 react에서는 이를 사용하지 않을 수도 있음



### useCallback

```jsx
const memoizedCallback = useCallback(
	() => {
    doSomething(a, b)
  },
  [a, b]
)
```

- 메모이제이션된 콜백을 반환
- 콜백 함수와 의존성 값의 배열을 전달
- 빈 배열을 전달할 시 최초 렌더링 시에만 함수 생성
- 리스트에 인자를 전달하면 해당 인자들이 변경되었을 때에만 함수 생성



### useRef

> 참조해야 할 element나 component가 있거나(등록 완료 후 포커싱을 input tag로 옮기는 등의 작업), 컴포넌트 렌더링과 상관 없는 로컬 변수를 만들 때 사용



### Custom Hooks

> 여러 컴포넌트에서 비슷한 기능을 공유할 경우, 자신만의 Hook으로 작성해 로직을 재상용 할 수 있음

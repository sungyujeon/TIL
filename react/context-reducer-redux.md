# Context & Reducer & Redux 차이

- Hook인 Context & Reducer와 Redux library의 차이를 알아보기로 하였다. 이들은 모두 상태 관리를 위한 기술로, 전역적으로 관리할 데이터(로그인 정보, 앱 환경설정, 테마 등)가 필요할 때 쓴다.

- context와 reducer를 공부하면서 Redux와의 차이점이 무엇인지 궁금했다. 가장 큰 차이점은 미들웨어를 사용할 수 있는지에 대한 여부다. Redux는 Redux saga, Redux Thunk 등의 미들웨어와 함께 사용할 수 있는데, 이를 통해 대규모 서비스에서의 디버깅이나 데이터 흐름을 파악하기가 더 용이해진다.

- 다른 차이점은, Redux는 하나의 store(container)에서 데이터를 관리하지만, hook 에서는 특정 컴포넌트 트리에서 데이터의 흐름을 제어할 수 있다는 점이다. 이는 Redux를 학습한 이후에 더 자세하게 다뤄보려고 한다.

- 기본적으로 Redux를 사용함에 있어 미들웨어의 사용을 제외한다면, Context/Reducer Hook을 함께 사용하는 것과 기능적으로 유사하다. 



## Context + Reducer

- useContext를 사용하면 기본적으로 전역 데이터(state)를 갖고, 이를 변경할 수 있다. 

- useReducer를 사용하면 state 값을 action type에 따라 변경할 수 있다.

  ```jsx
  import { useReducer, createContext } from 'react'
  
  export const CountContext = createContext()
  
  const initialState = {
    count: 0,
  }
  
  const reducer = (state, action) => {
    switch (action.type) {
      case 'INCREMENT':
        return { ...state, ...action.payload }
      case 'DECREMENT':
        return { ...state, ...action.payload }
      default:
        return state
    }
  }
  
  export const CountContextProvider = props => {
    const [state, dispatch] = useReducer(reducer, initialState)
    
    return (
    	<CountContext.Provider value={ [state, dispatch] }>			
      	{ props.children }
      </CountContext.Provider>
    )
  }
  ```

  ```jsx
  import { CountContextProvider } from './context/CountContext'
  import Counter from './components/Counter'
  
  const App => {
    return (
    	<CountContextProvider>
      	<CounterComp />
      </CountContextProvider>
    )
  }
  ```

  ```jsx
  import { useContext } from 'react'
  
  import { CountContext } from '../../context/CountContext'
  
  const Counter = () => {
    const [state, dispatch] = useContext(CountContext)
    
    const handleIncreaseCount = type => e => {
      console.log('increase count')
      dispatch({
        type,
        payload: {
          count: state.count + 1,
        }
      })
    }
    
    const handleDecreaseCount = type => e => {
      console.log('decrease count')
      dispatch({
        type,
        payload: {
          count: state.count - 1,
        }
      })
    }
    
    return (
    	<>
      	<p>count: { state.count }</p>
      	<button onClick={handleIncreaseCount('INCREMENT')}>count 증가</button>
      	<button onClick={handleDecreaseCount('DECREMENT')}>count 감소</button>
      </>
    )
  }
  
  export default Counter
  ```



## Redux

추후 공부 예정

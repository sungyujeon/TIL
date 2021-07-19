# Redux

> 리덕스를 이용할 시 컴포넌트의 상태 업데이트 관련 로직을 다른 파일로 분리시켜 관리 가능



## Redux의 세가지 규칙

- 단일 스토어
  - 하나의 application에 하나의 스토어 유지
  - 상태관리가 복잡해지므로 하나로 통일
- 읽기 전용 상태
  - 리덕스의 상태는 읽기 전용이므로, 객체 불변성을 유지시켜줘야 함
  - 내부적으로 데이터가 변경되는 것을 감지하기 위해 얕은 비교(shallow equality) 검사를 하기 때문(성능 향상)
- 순수 함수 reducer
  - 변화를 일으키는 reducer는 순수함수여야 함
  - reducer 함수는 파라미터로 prevState와 Action 객체를 받는데, 파라미터 외의 값에는 의존하면 안됨



## 기본 개념

##### 액션

- 상태에 어떠한 변화가 필요하면 action 발생(object)

- type 필드를 반드시 가지고 있어야 함(action 결정)

  ```json
  {
    type: 'TOGGLE_VALUE',
    //...
  }
  ```



## React-Redux 사용

- vanilla js로 redux 라이브러리를 사용할 땐 내장 함수인 store.dispatch, store.subscribe 함수를 사용했지만, react-redux에서는 유틸 함수(connect)와 컴포넌트(Provider)를 사용

- 폴더 구조

  - 일반적인 구조(Redux 공식 문서)

    - 액션 타입, 액션 생성 함수, 리듀서 코드를 별도 파일로 분리해서 작성하는 방법

      ```bash
      .
      └── src
          └── containers
              ├── actions
              │   ├── counter.js
              │   ├── todos.js
              ├── constants
              │   ├── ActionTypes.js
              └── reducers
                  ├── counter.js
                  └── todos.js
      ```

  - Ducks 패턴

    - 액션 타입, 액션 생성 함수, 리듀서 함수를 기능별로 파일 하나에 모두 작성하는 방법

      ```bash
      .
      └── src
          └── modules
              ├── counter.js
              └── todos.js
      ```

      

  

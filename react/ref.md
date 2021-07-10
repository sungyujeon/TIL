# ref(In Progress)

> DOM에 reference를 달아 특정 태그의 id 값을 설정하는 것과 같은 효과를 냄
>
> 리액트 컴포넌트에서도 id를 쓸 수 있지만, 해당 컴포넌트가 재사용될 경우 id가 중복되므로 적절치 않음



## class component에서의 사용

##### callback 함수를 통한 ref 설정

- this.input은 input 요소의 DOM을 가리키게 됨. ref의 이름은 자유롭게 지정 가능하여, `this.sth` 등으로 naming 할 수 있음

  ```react
  <input ref={(ref) => {this.input=ref}} />
  ```



##### createRef를 통한 ref 설정

- v16.3 부터 도입
- 




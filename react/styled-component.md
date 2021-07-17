# Styled Component

> JavaScript 파일 내에서 CSS를 사용할 수 있게 해주는 대표적인 React 대상 CSS-in-JS 라이브러리



## 기본 사용

##### 기본 사용

```js
import styled from 'styled-components'

const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
	
	/* & 문자를 사용해 Sass처럼 자기 자신 선택 가능 */
	&:hover {
		background: rgba(255, 255, 255, 0.9);
	}
`;

render(
  <Wrapper>
    <Title>
      Hello World!
    </Title>
  </Wrapper>
)
```



##### javascript 사용

```js
import styled { css } from 'styled-components'

const Button = styled.button`
  /* Adapt the colors based on primary prop */
  background: ${props => props.primary ? "palevioletred" : "white"};
  ${props => 
		props.primary &&
    css`
    background: none;

    &:hover {
    	background: white;
    }
		`
	}
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

render(
  <div>
    <Button>Normal</Button>
    <Button primary>Primary</Button>
  </div>
);
```



##### media query 유틸 함수

[참고](https://styled-components.com/docs/advanced#media-templates)

```js
import styled, { css } from 'styled-component'

const sizes - {
  desktop: 1024,
  tablet: 768
}

// 위에 있는 size 객체에 따라 자동으로 media 쿼리 함수를 만듦
const media = Object.keys(sizes).reduce( (acc, label) => {
  acc[label] = (...args) => css`
		@media (max-width: ${sizes[label] / 16}em) {
			${css(...args)}
		}
	`
  return acc
}, {})

// props로 넣어준 값을 직접 전달함
const Box = styled.div`
	${media.desktop`width: 768px;`}
	${media.tablet`width: 100%;`}
`
```





## 원리

##### Tagged 템플릿 리터럴

- backtick(`)을 사용해 만든 문자열에 스타일 정보를 넣어주는 것을 템플릿 리터럴이라 함

- 일반 템플릿 리터럴과 다른 점은 템플릿 안에 자바스크립트 객체나 함수를 전달할 때 온전히 추출할 수 있다는 것

- 일반 템플릿

  ```js
  `hello ${{'foo': 'bar'}} ${() => 'world'}`
  // "hello [object Object] () => 'world'"
  ```

- tagged template literal

  styled-components는 이 속성을 이용해 styled-components로 만든 컴포넌트의 props를 스타일 쪽에서 쉽게 조회할 수 있게 함

  ```js
  function tagged(...args) {
    console.log(args)
  }
  
  tagged`hello ${{'foo': 'bar'}} ${() => 'world'}`
  // [Array(3), {…}, ƒ]
  // 0: (3) ["hello ", " ", "", raw: Array(3)]
  // 1: {foo: "bar"}
  // 2: () => 'world'
  ```

  

##### styled element

- Tagged 템플릿 리터럴을 통해 스타일이 적용된 div로 이루어진 리액트 컴포넌트가 생성되므로, 추후에 `<MyComp /> `라는 컴포넌트로 사용가능한 것

  ```js
  import styled from 'styled-component'
  
  const MyComp = styled.div`
  	font-size: 2rem;
  `
  ```

- 태그명이 유동적이거나 특정 컴포넌트 자체를 스타일링 하고 싶을 때

  ```jsx
  // 태그 타입을 styled 인자로 전달
  const MyInput = styled('input')`
  	background: gray;
  `
  
  // 컴포넌트 형식의 값을 styled 인자로 전달
  const StyledLink = styled(Link)`
  	color: blue;
  `
  
  // Link 컴포넌트를 styled 컴포넌트로 넣기 위해서는
  // Link 컴포넌트 classname props를 최상위 DOM의 className 값으로 석정해야 함
  const Link = ({ className }) => {
    return (
    	<div className={ className }></div>
    )
  }
  ```

- { css } 사용

  - props에 따라 적용되는 css를 여러 줄 입력할 때는 바로 문자열 형식의 css를 넣어도 되지만, css tagged template을 사용해 넣어주는 것이 좋음
  - css를 사용하지 않으면 syntax highlighting이 이루어지지 않고, 함수 등 자바스크립트 코드를 사용하지 못함

  ```js
  const Button = styled.button`
    ${props => 
  		props.primary &&
      css`
      background: none;
  
      &:hover {
      	background: white;
      }
  		`
  	}
  `
  ```

  



## 기타

### Sass

> Syntatically Awesome Style Sheets
>
> CSS 전처리기로 복잡한 작업을 쉽게 할 수 있도록 해주고 코드의 재활용성, 가독성을 높여 유지 보수를 쉽게 해줌

- Sass에서 두가지 확장자 .sass, .scss를 지원

  - .sass
    - 중괄호와 세미콜론 사용하지 않음
  - .scss
    - 기존 CSS 작성 방식과 문법이 크게 다르지 않음

- 사용

  ```bash
  $ npm install node-sass@4.14.1
  ```

  ```scss
  // .scss
  
  $red: $fa5252;
  
  // mixin(재사용되는 스타일 블록을 함수처럼 사용 가능)
  @mixin square($size) {
    $calculated: 32px * $size;
    width: $caculated;
    height: $calculated;
  }
  
  .SassComponent {
    .box { // 일반 CSS box class와 동일
      background: red;
      &.red { // .red 클래스가 .box와 함께 사용될 때
        background: $red;
        @include square(2);
      }
      &:hover {  // .box에 마우스 올렸을 시
        background: black;
      }
    }
  }
  ```

- utils 함수 분리

  > 여러 파일에서 사용될 수 있는 Sass 변수 및 믹스인은 다른 파일로 분리하여 작성한 뒤 재사용

  ```scss
  // src/styles/utils.scss
  
  $red: $fa5252;
  
  // mixin(재사용되는 스타일 블록을 함수처럼 사용 가능)
  @mixin square($size) {
    $calculated: 32px * $size;
    width: $caculated;
    height: $calculated;
  }
  
  // 다른 scss 파일에서 import하여 사용
  @import './styles/utils'
  ```

  


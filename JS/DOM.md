# DOM



##### DOM과 HTML 속성

> HTML에서 태그는 복수의 속성을 가질 수 있는데, 브라우저는 HTML을 파싱해 DOM 객체를 만들 때 HTML 표준 속성을 인식하고, 이 표준 속성을 사용해 DOM 프로퍼티를 만듦
>
> 따라서 요소가 `id`와 같은 표준 속성으로만 구성되어 있다면 이에 해당하는 프로퍼티가 자연스럽게 만들어지지만, 표준이 아닌 속성일 때는 바로 만들어지지 않음

- 비표준 속성의 접근과 수정

  - elem.hasAttribute(name): 속성 존재 여부 확인
  - elem.getAttribute(name): 속성값을 가져옴
  - elem.setAttribute(name, value): 속성값 변경
  - elem.removeAttribute(name): 속성값 삭제




##### attribute vs property

> attribute는 html 문서 안에 존재하며 변하지 않지만, property는 DOM 안에 존재하여 동적으로 제어가 가능한 값

- attribute

  - HTML element의 추가적 정보 전달

  - 이름 = '값' 쌍으로 표현

    ```html
    <div class="my-class" />
    ```

- property

  - attribute에 대한 HTML DOM tree 안에서의 표현

    ```html
    Div node
    |- nodename = "DIV"
    |- className = "my-class"
    ```


# 의존 객체 자동 주입

> Automatic Dependency Injection
>
> 스프링 설정파일에서 혹은 태그로 의존 객체 대상을 명시하지 않아도 스프링 컨테이너가 자동적으로 의존 대상 객체를 찾아 대상 객체에 필요한 DI(의존성을 주입)하는 것
>
> @Resource @Autowired @Inject 태그의 차이점은 의존 객체를 찾는 방법이 다름



## @Resource

> Java에서 지원하는 어노테이션 / 특정 프레임워크에 종속적이지 않음

- 찾는 순서
  - 이름 -> 타입 -> @Qualifier -> 실패
- 사용 위치
  - 멤버 변수, setter 메서드
- 특징
  - `<context:annotation-config />` 구문을 반드시 xml 설정파일에 추가해야 함



## @Autowired

> Spring에서 지원하는 어노테이션
>
> 주입하려고 하는 객체의 타입이 일치하는지 찾고 객체를 자동 주입

- 찾는 순서
  - 타입 -> 이름 -> @Qualifier -> 실패
  - 만약에 타입이 존재하지 않으면 @Autowired에 위치한 속성명이 일치하는 bean을 컨테이너에서 찾음. 이름이 없을 경우 @Qualifier 어노테이션의 유무를 찾아 그 어노테이션이 붙은 속성에 의존성 주입

- 사용 위치
  - 멤버변수, setter 메서드, 생성자, 일반 메서드



## @Inject

> Java에서 지원하는 어노테이션 / 특정 프레임워크에 종속적이지 않음

- 찾는 순서
  - 타입 -> @Qualifier -> 이름 -> 실패
  - @Autowired와 동일하게 작동하지만 찾는 순서가 다름
  - @Inject 사용을 위해서는 maven/gradle에 javax 라이브러리 의존성 추가해야 함
- 사용 위치
  - 멤버변수, setter 메서드, 생성자, 일반 메서드

# call, apply, bind

> call, apply는 특정 메서드를 실행시키는 함수이고, bind는 새로운 메서드(함수)를 생성
>
> call, apply, bind는 모두 this binding을 위해 사용되는 경우가 많음

## call

> `func.call(thisArg[, arg1[, arg2[, ...]]])`

- call 메서드는 주어진 this 값, 전달된 인수들과 함께 함수를 호출함
- 기본적으로 메서드(함수)를 호출하는 함수



## apply

> `func.apply(thisArg, [argsArray])`

- apply 메서드의 결과는 call 메서드의 결과와 같지만, 전달되는 인수들이 iterable 해야 한다는 차이점이 있음



## bind

> func.bind(thisArg[, arg1[, ...]])

- bind() 메서드 호출 시 this를 binding한 새로운 함수 생성
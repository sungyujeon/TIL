# this

> 다른 객체지향 언어에서 this는 클래스로 생성한 인스턴스 객체를 의미하나, js에서는 어디든 사용할 수 있어 혼란을 야기함
>
> 이는 상황에 따라 this가 바라보는 대상이 달라지기 때문
>
> 함수와 객체(메서드)의 구분이 느슨한 js에서 this는 이 둘을 실질적으로 구분하는 거의 유일한 기능



## 상황에 따라 달라지는 this

> js this는 실행 컨텍스트가 생성될 때 함께 결정. 실행 컨텍스트는 함수를 호출할 때 생성되므로, this는 `함수를 호출할 때 결정`된다고 할 수 있음. 즉, 함수를 어떤 방식으로 호출하느냐에 따라 값이 달라짐



##### 전역 공간에서의 this

- 전역 공간에서 this는 전역 객체를 가리킴

- 브라우저 환경(this === window) / Node.js 환경(this === global)

- 전역변수를 선언하면 자바스크립트 엔진은 이를 전역객체의 프로퍼티로 할당함

  ```javascript
  var a = 1;
  console.log(a);  // 1
  console.log(this.a);  // 1
  console.log(window.a);  // 1
  ```

  - 예를 들면 전역객체에 선언한 변수는 글로벌 실행컨텍스트의 LexicalEnvironment의 프로퍼티로 저장됨.



##### 메서드 호출 시 해당 스코프 내에서의 this

> 함수를 실행하는 가장 일반적인 방법 두가지는, 함수로 호출하는 경우와 메서드로 호출하는 경우
>
> 함수와 메서드의 차이는 `독립성`. 함수는 그 자체로 독립적인 기능을 수행하지만, 메서드는 호출한 대상 객체에 관한 동작 수행
>
> js는 각 상황별로 this 키워드에 다른 값을 부여함

```javascript
var func = function (x) {
  console.log(this, x)
}
func(1)  // window { ... } 1

var obj = {
  method: func
}
obj.method(2)  // { method: f } 2
obj['method'](3)  // { method: f } 3
```

- 변수에 담아 호출한 경우와 obj 객체의 프로퍼티에 할당해서 호출한 경우 this가 달라짐
- 즉, `.`이나 `[]` 대괄호 표기법으로 어떤 함수를 호출할 때 객체가 명시되어 있는 경우 메서드로 호출한 것이고, 단독으로 호출한 경우에는 함수를 호출한 것
- 메서드 호출 시 this
  - 메서드로서 호출하는 경우는 마지막에 명시된 객체가 this가 됨



##### 함수 호출 시 this

- 기본적으로 this가 지정되지 않음

- this가 지정되지 않은 경우에 this는 전역 객체를 바라봄

- 이는 Douglas Crockford에 의하면 명백한 오류라고 함!?

  ```javascript
  var obj = {
    outer: function () {
      console.log(this);  // (1) { outer: f }
      var innerFunc1 = function () {
        console.log(this)  // (2) Window { ... }
      }
      innerFunc1()
      
      var self = this
      var innerFunc2 = function () {
        console.log(self)  // { outer: f }
      }
      innerFunc2()
    }
  }
  ```

  - this를 우회하기 위해 바로 바깥 객체의 this를 특정 변수에 담아두면 내부 함수에서 바로 바깥 객체를 바라보도록 this를 설정할 수 있음 >> 이를 해결하기 위한 것이 `arrow function`



##### this를 바인딩하지 않는 함수

> ~~?????? 화살표 함수가 이거 때문이었다고!!!?? shocked...~~

- ES6에서는 함수 내부에서 this가 전역객체를 바라보는 문제를 보완하고자 this를 바인딩하지 않는 arrow function 도입
- 화살표 함수는 실행 컨텍스트를 생성할 때 this 바인딩 과정 자체가 제외되어, 상위 스코프의 this를 그대로 활용할 수 있음



##### 콜백 함수 호출 시 this

```javascript
setTimeout(function () { console.log(this) }, 300)  // (1) window { ... }

[1, 2].forEach(function (x) {
  console.log(this, x)  // (2) // window { ... }
})

document.body.querySelector('#a')
	.addEventListener('click', function (e) {
  	console.log(this)  // event { ... }
	})
```

- 객체 메서드 호출이 아니므로 1,2는 전역객체가 출력
- 3은 addEventListener가 지정한 HTLM element와 클릭 이벤트에 대한 정보가 담긴 객체가 this가 됨



##### 생성자 함수 호출 시 this

```javascript
var Cat = function (name, age) {
  this.bark = '야옹'
  this.name = name
  this.age = age
}

var nabi = new Cat('나비', 3)
```

- new 명령어로 생성자함수 호출하면, 생성자의 prototype 프로퍼티를 참조하는 `__proto__` 라는 프로퍼티가 있는 객체(인스턴스)를 만들고, this는 해당 인스턴스를 가리킴



##### 명시적 this binding

```javascript
var func = function (a, b, c) {
  console.log(this, a, b, c)
}

func(1, 2, 3)  // window { ... } 1 2 3
func.call({ x: 1}, 4, 5, 6)  // { x: 1 } 4 5 6
func.apply({ x: 1 }, [7, 8, 9])  // { x: 1 } 7 8 9
```

- call 메서드는 메서드의 호출 주체인 함수를 즉시 실행하도록 하는 명령
- 이 때 call 메서드의 첫 번째 인자를 this로 바인딩하면 임의의 객체를 this로 지정할 수 있음

- `apply` 메서드도 있는데, call 메서드는 첫번째 인자 제외한 나머지 모든 인자를 매개변수로 지정하지만, apply는 두번째 인자를 배열로 받아 그 배열의 요소들을 호출할 함수의 매개변수로 지정한다는 차이점만 존재

- ~~call, apply를 이용하면 유사배열객체(array-like object)에 배열 메서드를 적용할 수 있는데, 지금은 잘 이해가 가지 않아서 나중에 다시 돌아와서 살펴보자..~~ 라고 하려고 했는데 bind 메서드로 해결을 했다네..?



##### bind 메서드

> bind 메서드는 ES5에 추가된 기능으로, call과 비슷하지만 즉시 호출하지는 않고 넘겨받은 this 및 인수들을 바탕으로 새로운 함수를 반환하기만 하는 메서드

```javascript
var func = function (a, b, c, d) {
  console.log(this, a, b, c, d)
}
func(1, 2, 3, 4)  // window { ... } 1 2 3 4

var bindFunc = func.bind({ x: 1 })
bindFunc(5, 6, 7, 8)  // { x: 1} 5 6 7 8
```

- 새로운 함수를 호출할 때 인수를 넘기면 그 인수들은 기존 bind 메서드를 호출할 때 전달했던 인수들의 뒤에 이어 등록됨

- name property

  ```javascript
  var func = function () {}
  var bindFunc = func.bind({ x: 1 }, 2, 3)
  console.log(func.name)  // func
  console.log(bindFunc.name)  // bound func
  ```

  - bind 메서드 적용해 만든 새로운 함수는 독특한 성질이 있는데, name 프로퍼티에 동사 bind의 수동태인 'bound' 라는 접두어가 붙는다는 점
  - name 프로퍼티가 'bound xxx'라면 이는 곧 함수명이 xxx인 원본 함수에 bind메서드를 적용한 새로운 함수라는 의미가 되어 기존의 call, apply 메서드 보다 코드를 추적하기 더 수월해짐



##### 상위 컨텍스트의 this를 내부함수나 콜백 함수에 전달하기

```javascript
var obj = {
  outer: function () {
    console.log(this)  // { outer: f }
    var innerFunc = function () {
      console.log(this)  // { outer: f }
    }.bind(this)
    innerFunc()
  }
}
obj.outer()
```

그런데 그냥 화살표 함수 쓰면 됨

```javascript
var obj = {
  outer: function () {
    console.log(this)  // { outer: f }
    var innerFunc = () => {
      console.log(this)
    }
    innerFunc()
  }
}
obj.outer()
```



##### 콜백 함수와 함께 thisArg를 인자로 받는 메서드

- 추가 공부 (코어 자바스크립트 pp.91-93)


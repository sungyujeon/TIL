

# Python Basic



> 2021.1.18 ~

***

##### Python 학습 참조 사이트

[`Python 공식 Tutorial`](https://docs.python.org/3/tutorial/index.html)

[`PEP-8`](https://www.python.org/dev/peps/pep-0008/) 

[`pythontutor`](http://pythontutor.com/)

***



### Case naming convention

![](../../../Screen Shot 2021-01-18 at 1.25.43 PM.png)



***



jupyter notebook 단축키

`a` 'Above' 한 칸 위에 셀을 추가

`b` 'Below' 한 칸 밑에 셀을 추가

`m` 'Markdown' change cell to markdown

`y` 'pYthon' change cell to code

`h` 'Help' 단축키 도움말

***





# 기초 문법(Syntax)

***

## 주석(comment)

- 한 줄 주석은 `#`으로 표현한다.
- 여러 줄의 주석은
  1. 한 줄 씩 `#`을 사용하거나,
  2. `"""` 또는 `'''`(여러줄 문자열, multiline string)으로 표현한다.



## 코드 라인

- 파이썬 코드는 '1줄에 1문장(statement)'이 원칙
- 문장(statement)은 파이썬이 실행 가능(executable)한 최소한의 코드 단위
- 한 줄 표기 시 `;`을 작성하여 표기 가능하다.



## 변수(Variable)

- 할당연산자(Assignment Operator) : `=`
  - 데이터 타입 확인(`type()` / 메모리 주소 확인(`id()`)



## 식별자(Identifiers)

파이썬에서 식별자는 변수, 함수, 모듈, 클래스 등을 식별하는 데 사용되는 이름(name)

* 식별자의 이름은 영문알파벳(대문자와 소문자), 밑줄(_), 숫자로 구성된다.
* 첫 글자에 숫자가 올 수 없다.
* 길이에 제한이 없다.
* 대소문자(case)를 구별한다.
* 아래의 키워드는 사용할 수 없다. [파이썬 문서](https://docs.python.org/ko/3/reference/lexical_analysis.html#keywords)

```
False, None, True, and, as, assert, async, await, break, class, continue, def, del, elif, else, except, finally, for, from, global, if, import, in, is, lambda, nonlocal, not, or, pass, raise, return, try, while, with, yield
```



## Data Type

##### 1. Number

##### 파이썬에서 쓸 수 있는 가장 큰 수

* 파이썬에서 가장 큰 숫자를 활용하기 위해 sys 모듈을 불러온다.
* 파이썬은 기존 C 계열 프로그래밍 언어와 다르게 정수 자료형(integer)에서 오버플로우가 없다.
* 임의 정밀도 산술(arbitrary-precision arithmetic)을 사용하기 때문이다. 

> **오버플로우(overflow)**
- 데이터 타입 별로 사용할 수 있는 메모리의 크기가 제한되어 있다.
- 표현할 수 있는 수의 범위를 넘어가는 연산을 하게 되면, 기대했던 값이 출력되지 않는 현상, 즉 메모리가 차고 넘쳐 흐르는 현상

> **임의 정밀도 산술(arbitrary-precision arithmetic)**
- 사용할 수 있는 메모리양이 정해져 있는 기존의 방식과 달리, 현재 남아있는 만큼의 가용 메모리를 모두 수 표현에 끌어다 쓸 수 있는 형태
- 특정 값을 나타내는데 4바이트가 부족하다면 5바이트, 더 부족하면 6바이트까지 사용할 수 있게 유동적으로 운용



## 컨테이너(container)

- 시퀀스(Sequence)형: ordered data
  - list, tuple, range, string
- 비 시퀀스(Non-sequence)형: unordered data
  - set, dictionary



## 제어문

##### 조건문

`if`문은 반드시 참/거짓을 판단할 수 있는 조건과 함께 사용이 되어야 함



##### 조건표현식(a.k.a 삼항연산자)

`true value if <조건식> else false_value`



## 반복문

##### while문

```python
while <조건식>
	<코드 블럭>
```

##### for문

시퀀스(string, tuple, list, range)나 다른 순회가능한 객체(iterable)의 요소 순환

###### enumerate

- 열거 객체를 반환

- iterable은 시퀀스, 이터레이터 또는 이터레이션을 지원하는 다른 객체여야 함

- enumerate()에 의해 반환된 이터레이터의 `__next__()` 메서드는

  iterable을 이터레이션 해서 얻어지는 값을 포함하는 튜플을 반환

- default: `enumerate(iterable, start=0)`



##### 반복제어(break, continue, for-else)

`break` 반복문 종료

`continue` continue 이후의 코드 실행하지 않고 반복 수행

`for-else` break문으로 종료 시 실행되지 않음



##### pass

아무것도 하지 않음.

단순히 자리를 채우는 용도로 사용



## 함수(function)

```python
def <함수이름>(parameter1, parameter2):
  <코드블럭>
  return value
```

###### built-in function

![](../../../Screen Shot 2021-01-20 at 10.32.30 PM.png)

[파이썬 문서](https://docs.python.org/ko/3/library/functions.html)

##### 함수의 입력(Input)

- 매개변수(parameter) : 함수를 정의할 때

- 인자(argument) : 함수를 호출할 때

  - 위치 인자(Positional Arguments) : 함수는 기본적으로 인자를 위치로 판단

  - 키워드 인자(Keyword Arguments) : 직접 변수의 이름으로 특정 인자 전달

  - 기본 인자 값(Default Argument Values) : 키워드 인자의 default 값

    * `*args` : 가변 인자 리스트(Arbitrary Argument Lists)

      \- 정해지지 않은 여러 개의 인자

      \- 보통 매개변수 목록의 마지막에 쓰임

    * `**kwargs` : 가변 키워드 인자(Arbitrary Keyword Arguments)

      \- 정해지지 않은 키워드 인자 >> `dict` 형태로 처리

##### 함수와 스코프(scope)

- `L`ocal scope        : 로컬에 정의된 함수
- `E`nclosed scope : 로컬 상위에 정의된 함수
- `G`lobal scope      : 함수 밖의 변수 혹은 import된 모듈
- `B`uilt-in scope    : 파이썬 안에 내장되어 있는 함수 또는 속성

###### >> LEGB Rule : 이름 검색(resolution) 규칙



##### 재귀 함수

- 함수 내부에서 자기 자신을 호출하는 함수

- 최대 재귀 깊이(maximum recursion depth) : 3,000

  `google에 재귀 함수를 검색하면? recursion??? 개발자 밈?`



## 예외(Exception)

##### 에러(Error)

syntax error(문법 에러), 문법적으로 잘못된 코드로 인해 발생하는 에러



##### 예외(Exception)

> 실행 도중 예상치 못한 상황(exception)을 맞이하면, 프로그램 실행을 멈춤

- 문법적으로는 옳지만 실행시 발생하는 에러
- 아래의 모든 에러는 `Exception`을 상속받아 이루어짐

`ZeroDivisionError`, `NameError`, `TypeError`, `ValueError`, `IndexError`

`KeyError`, `ModuleNotFoundError`, `ImportError`, `KeyboardInterrupt` etc..



##### 예외 처리(Exception Handling)

`try` `except`

```python
try:
  <코드블럭1>
except (예외):
  <코드블럭2>
else:
  <코드블럭3>
finally:
  <코드블럭4>
```

- `try` 아래의 코드블럭이 실행
- 예외 발생되지 않으면, `except` 없이 `else` 실행 후 `finally` 실행 후 종료
- 예외 발생하면, 남은 부분을 수행하지 않고 `except` `finally` 실행 후 종료



##### 예외 강제 발생(Exception Raising)

- `raise` 로 강제 예외 발생

```python
raise <에러>('메시지')
```



- `assert`로 강제 예외 발생

  보통 <b>상태를 검증하는 데 사용</b>되며 무조건 `AssertionError` 발생

  ```python
  assert Boolean expression, error message
  assert len([1, 2]) == 1, '길이가 1이 아닙니다.'
  ```

  

  








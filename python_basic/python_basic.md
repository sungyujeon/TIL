# Python Basic



> 2021.1.18 ~

***

[`Python 공식 Tutorial`](https://docs.python.org/3/tutorial/index.html)

[`PEP-8`](https://www.python.org/dev/peps/pep-0008/)

***



### Case naming convention

![](../../../Screen Shot 2021-01-18 at 1.25.43 PM.png)



***



jupyter notebook 단축키

`a` 'above' 한 칸 위에 셀을 추가

`b` 'below' 한 칸 밑에 셀을 추가

`m` 'markdown' change cell to markdown

`y` '?' change cell to code

`h` 'help' 단축키 도움말





### 기초 문법(Syntax)

##### 주석(comment)

- 한 줄 주석은 `#`으로 표현한다.
- 여러 줄의 주석은
  1. 한 줄 씩 `#`을 사용하거나,
  2. `"""` 또는 `'''`(여러줄 문자열, multiline string)으로 표현한다.



##### 코드 라인

- 파이썬 코드는 '1줄에 1문장(statement)'이 원칙
- 문장(statement)은 파이썬이 실행 가능(executable)한 최소한의 코드 단위
- 한 줄 표기 시 `;`을 작성하여 표기 가능하다.



##### 변수(Variable)

- 할당연산자(Assignment Operator) : `=`
  - 데이터 타입 확인(`type()` / 메모리 주소 확인(`id()`)



##### 식별자(Identifiers)

파이썬에서 식별자는 변수, 함수, 모듈, 클래스 등을 식별하는 데 사용되는 이름(name)

* 식별자의 이름은 영문알파벳(대문자와 소문자), 밑줄(_), 숫자로 구성된다.
* 첫 글자에 숫자가 올 수 없다.
* 길이에 제한이 없다.
* 대소문자(case)를 구별한다.
* 아래의 키워드는 사용할 수 없다. [파이썬 문서](https://docs.python.org/ko/3/reference/lexical_analysis.html#keywords)

```
False, None, True, and, as, assert, async, await, break, class, continue, def, del, elif, else, except, finally, for, from, global, if, import, in, is, lambda, nonlocal, not, or, pass, raise, return, try, while, with, yield
```



##### Data Type

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



### 컨테이너(container)

- 시퀀스(Sequence)형: ordered data
  - list, tuple, range, string
- 비 시퀀스(Non-sequence)형: unordered data
  - set, dictionary
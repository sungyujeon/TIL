# Typescript

> 참고사이트 : [한 눈에 보는 타입스크립트](https://edu.goorm.io/learn/lecture/22106/%2525ED%252595%25259C-%2525EB%252588%252588%2525EC%252597%252590-%2525EB%2525B3%2525B4%2525EB%25258A%252594-%2525ED%252583%252580%2525EC%25259E%252585%2525EC%25258A%2525A4%2525ED%252581%2525AC%2525EB%2525A6%2525BD%2525ED%25258A%2525B8)



## 개요

##### 타입스크립트란?

- 타입스크립트는 MS에서 개발하고 유지/관리하는 오픈 소스
- Vanilla js로 컴파일되는 자바스크립트 Superset(상위 호환)으로 2012년 10월에 처음 릴리즈



##### 왜 타입스크립트를 써야 하는가?

- C, Java 같은 강한 타입 시스템은 높은 가독성과 코드 품질을 제공하고, 런타임이 아닌 컴파일 환경에서 에러가 발생해 오류들을 쉽게 잡아낼 수 있음
- js는 타입 시스템이 없는 동적 프로그래밍 언어로, js 변수는 문자열, 숫자, 불린 등 여러 타입을 가지지만 이를 약한 타입 언어라고 표현할 수 있으며 비교적 유연하게 개발할 수 있는 환경을 제공하는 한편 런타임 환경에서 쉽게 에러가 발생할 수 있음
- 타입스크립트는 자바스크립트에 강한 타입 시스템을 적용해 대부분의 에러를 컴파일 환경에서 코드를 입력하는 동안 체크할 수 있음



##### 참고 사이트

- typescript playground
  - [사이트 바로가기](https://www.typescriptlang.org/play)
  - 타입스크립트 공식 페이지에서 제공하는 REPL로, 작성한 내용이 컴파일러 옵션에 따라 어떻게 자바스크립트로 변환되는지 확인가능

- Repl.it
  - [사이트 바로가기](https://replit.com/languages/typescript)
  - 파일과 디렉토리로 관리되는 타입스크립트 프로젝트를 손쉽게 구성할 수 있어, 간단한 프로젝트로 타입스크립트를 테스트하기 좋음



## Settings

- react

  - yarn

    ```bash
    $ yarn create react-app <<pjt name>> . --template typscript
    ```

  - npm

    ```bash
    $ npx create react-app <<pjt name>> . --template typscript
    ```

  - typescript eslint

    ```bash
    $ yarn add -D @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-airbnb-typescript  // (eslint-plugin-jest / jest 사용시 추가)
    ```

    ```bash
    $ npx install-peerdeps --dev eslint-config-airbnb
    ```

  - add the packages to integrate ESLint with Prettier rules.

    ```bash
    $ yarn add -D prettier eslint-config-prettier eslint-plugin-prettier
    ```

## 타입 선언(기본)

##### Boolean

```typescript
let isBoolean: boolean;
let isDone: boolean = false;
```



##### Number

모든 부동 소수점 값 사용 가능

ES6에 도입된 2진수 및 8진수 리터럴도 지원

```typescript
let num: number;
let integer: number = 6;
let float: number = 3.14;
let hex: number = 0xf00d; // 61453
let binary: number = 0b1010; // 10
let octal: number = 0o744; // 484
let infinity: number = Infinity;
let nan: number = NaN;
```



##### String

```typescript
let str: string;
let red: string = 'Red';
let green: string = "Green";
let myColor: string = `My color is ${red}.`;
let yourColor: string = 'Your color is' + green;
```



##### Array

배열은 두가지 방법으로 타입 선언 가능

```typescript
// 문자열만 가지는 배열
let fruits: string[] = ['Apple', 'Banana', 'Mango']
let fruits: Array<string> = ['Apple', 'Banana', 'Mango']
```



##### Tuple

- 정해진 타입의 고정된 길이 배열을 표현

  ```typescript
  let tuple: [string, number]
  tuple = ['a', 1]
  tuple = ['a', 1, 2]  //Error - TS2322
  ```

- Tuple 타입의 배열(2차원 배열) 사용 가능

  ```typescript
  let users: [number, string, boolean][]
  // let users: Array<[number, string, boolean]>
  
  users = [[1, 'Neo', true], [2, 'Evan', false], [3, 'Lewis', true]]
  ```

- Tuple은 정해진 타입의 고정된 길이 배열을 표현하지만, 이는 할당에 국한되고 `.push()` `.splice()` 등을 통해 값을 넣는 행위는 막을 수 없음

  ```typescript
  let tuple: [string, number];
  tuple = ['a', 1];
  tuple = ['b', 2];
  tuple.push(3);
  console.log(tuple); // ['b', 2, 3];
  tuple.push(true); // Error - TS2345: Argument of type 'true' is not assignable to parameter of type 'string | number'.
  ```



##### Union

다중 타입(문자열과 숫자 등)을 동시에 가지는 타입

```typescript
let union: (string | number)
union = 'Hello'
union = 123

let array: (string | number)[] = ['Apple', 1, 2]
let array: Array<string | number> = ['Apple', 1, 2]
```



##### Intersaction

`&`(ampersand) 사용해 2개 이상의 타입을 조합하는 경우

잘 사용되지는 않음



##### Object

`typeof` 연산자가 `object`로 반환하는 모든 타입

여러 타입의 상위 타입이기 때문에 그다지 유용하지 않음

```typescript
let obj: object = {}
let arr: object = []
let func: object = function () {}
let nullValue: object = null
let date: object = new Date()
```

> 컴파일러 옵션에서 엄격한 타입 검사(strict)를 true로 설정하면 null은 포함하지 않음



##### Function

화살표 함수를 이용해 타입 지정 가능

인수의 타입과 반환 값의 타입을 입력

```typescript
// 인자와 반환값이 있는 경우
let myFunc: (arg1: number, arg2: number) => number;
myFunc = (x, y) => {
	return x + y;
}

// 인자와 반환값이 없는 경우
let yourFunc: () => void;
yourFunc = () => {
  console.log('hello world')
}

// interface로 정의
interface IName {
  (PARAMETER: PARAM_TYPE): RETURN_TYPE  // Call signature
}
interface IGetUser {
  (name: string): IUser
}
const getUser: IGetUser = function (n){ return user }
```



##### Void

값을 반환하지 않는 함수에서 사용

```typescript
function hello(msg: string): void {
	console.log(`Hello ${msg}`)
}
```



##### Any

모든 타입을 의미

외부 자원을 활용해 개발할 때 불가피하게 타입을 단언할 수 없는 경우 사용

```typescript
let any: any = 123
any = 'Hello World'
any = {}
any = null
const list: any[] = [1, true, 'Anything']
```

> 강한 타입 시스템의 장점을 유지하기 위해 Any 사용을 엄격하게 금지하려면, 컴파일 옵션 `"noImplicitAny": true` 설정을 통해 Any 사용 시 에러 발생시킬 수 있음



##### Unknown

Any와 같이 최상위 타입인 Unknown은 알 수 없는 타입을 의미

Any와 같이 Unknown에는 어떤 타입의 값도 할당할 수 있지만, Unknown을 다른 타입에 할당할 수 없음

```typescript
let a: any = 123;
let u: unknown = 123;

let v1: boolean = a; // 모든 타입(any)은 어디든 할당할 수 있음
let v2: number = u; // 알 수 없는 타입(unknown)은 모든 타입(any)을 제외한 다른 타입에 할당할 수 없음
let v3: any = u; // OK
let v4: number = u as number; // 타입을 단언하면 할당할 수 있음
```

> 일반적인 경우 Unknown은 타입 단언(Assertions)이나 타입 가드(Guards)를 필요로 함



##### null / undefined

기본적으로 Null, Undefined는 모든 타입의 하위 타입으로 각 타입에 할당가능하고, 서로의 타입에도 할당 가능

```typescript
let num: number = undefined;
let str: string = null;
let obj: { a: 1, b: false } = undefined;
let arr: any[] = null;
let und: undefined = null;
let nul: null = undefined;
let voi: void = null;
```

> 컴파일 옵션 `"strictNullChecks": true` 설정 시 엄격하게 Null과 Undefined도 서로 할당할 수 없게함



##### Never

절대 발생하지 않을 값. 어떠한 타입도 적용할 수 없음

```typescript
function error(message: string): never {
  throw new Error(message)
}
```





## 타입 선언(심화)

##### Interface

```typescript
interface User {
	name: string,
  age: number,
  isValid: boolean
}

let userArr: User[] = [
  {
    name: 'Neo',
    age: 20,
    isValid: true
  },
  {
    name: 'Leo',
    age: 21,
    isValid: false
  }
]
```



##### Readonly

초기화된 값을 유지해야 하는 읽기 전용 속성 정의

만약 모든 속성이 readonly일 경우 Utility, Assertion 타입 활용 가능

```typescript
let arrA: readonly number[] = [1, 2, 3, 4];
let arrB: ReadonlyArray<number> = [0, 9, 8, 7];

arrA[0] = 123; // Error - TS2542: Index signature in type 'readonly number[]' only permits reading.
arrA.push(123); // Error - TS2339: Property 'push' does not exist on type 'readonly number[]'.
```



##### Class

인터페이스로 클래스를 정의하는 경우 `impolements` 키워드 사용

```typescript
interface IUser {
	name: string,
  getName(): string
}

class User implements IUser {
  constructor(public name: string) {}
  getName() {
    return this.name
  }
}
```

만약 정의한 클래스를 인수로 사용하는 경우 에러 발생

```typescript
interface ICat {
  name: string
}

class Cat implements ICat {
  constructor(public name: string) {}
}

function makeKitten(c: ICat, n: string) {
  return new c(n); // Error - TS2351: This expression is not constructable. Type 'ICat' has no construct signatures.
}
const kitten = makeKitten(Cat, 'Lucy');
console.log(kitten);
```

따라서 다음과 같이 Construct signature를 만들어야 함

```typescript
interface IName {
  new (PARAMETER: PARAM_TYPE): RETURN_TYPE // Construct signature
}
```

```typescript
interface ICat {
  name: string
}
interface ICatConstructor {
  new (name: string): ICat;
}

class Cat implements ICat {
  constructor(public name: string) {}
}

function makeKitten(c: ICatConstructor, n: string) {
  return new c(n); // ok
}
const kitten = makeKitten(Cat, 'Lucy');
console.log(kitten);
```



##### 인덱싱 가능 타입(Indexable types)

인터페이스를 통해 특정 속성(메서드 등)의 타입을 정의할 수 있지만, 여러 속성을 가지거나 단언할 수 없는 임의의 속성이 포함되는 구조에서는 한계가 있음. 이런 상황에서 index signature를 활용함

```typescript
interface INAME {
  [INDEXER_NAME: INDEXER_TYPE]: RETURN_TYPE // Index signature
}
```

```typescript
interface IItem {
  [itemIndex: number]: string | boolean | number[]
}
let item: IItem = ['Hello', false, [1, 2, 3]];
console.log(item[0]); // Hello
console.log(item[1]); // false
console.log(item[2]); // [1, 2, 3]
```

```typescript
interface IItem {
  [itemIndex: number]: string | boolean | number[]
}
let item: IItem = ['Hello', false, [1, 2, 3]];
console.log(item[0]); // Hello
console.log(item[1]); // false
console.log(item[2]); // [1, 2, 3]
```



`keyof` 사용 시 속성 이름을 타입으로 사용할 수 있음. 인덱싱 가능 타입의 속성 이름들이 유니온 타입으로 적용됨

```typescript
interface ICountries {
  KR: '대한민국',
  US: '미국',
  CP: '중국'
}
let country: keyof ICountries; // 'KR' | 'US' | 'CP'
country = 'KR'; // ok
country = 'RU'; // Error - TS2322: Type '"RU"' is not assignable to type '"KR" | "US" | "CP"'.
```

`keyof`를 통해 인덱싱으로 타입의 개별 값에도 접근 가능

```typescript
interface ICountries {
  KR: '대한민국',
  US: '미국',
  CP: '중국'
}
let country: ICountries[keyof ICountries]; // ICountries['KR' | 'US' | 'CP']
country = '대한민국';
country = '러시아'; // Error - TS2322: Type '"러시아"' is not assignable to type '"대한민국" | "미국" | "중국"'.
```



##### 타입 별칭(Type Aliases)

`type` 키워드를 사용해 새로운 타입 조합을 만들 수 있음

하나 이상의 타입을 조합해 별칭(이름)을 부여하며, 조합한 각 타입들을 참조하게 함

```typescript
type MyType = string;
type YourType = string | number | boolean;
type TUser = {
  name: string,
  age: number,
  isValid: boolean
} | [string, number, boolean];

let userA: TUser = {
  name: 'Neo',
  age: 85,
  isValid: true
};
let userB: TUser = ['Evan', 36, false];

function someFunc(arg: MyType): YourType {
  switch (arg) {
    case 's':
      return arg.toString(); // string
    case 'n':
      return parseInt(arg); // number
    default:
      return true; // boolean
  }
}
```



##### Generic

재사용을 목적으로 함수나 클래스의 선언 시점이 아닌 사용 시점에 타입을 선언할 수 있는 방법

```typescript
function toArray<T>(a: T, b: T): T[] {
  return [a, b];
}

toArray<number>(1, 2);
toArray<string>('1', '2');
toArray<string | number>(1, '2');
toArray<number>(1, '2'); // Error
```

- 제약 조건(Constraints)

  예를 들어 모든 타입을 허용하는  `T`에 string, number인 경우만 허용하는 제약조건을 넣고 싶다면 `extends` 키워드를 사용하는 제약 조건을 추가할 수 있음

  ```typescript
  interface MyType<T extends string | number> {
    name: string,
    value: T
  }
  
  const dataA: MyType<string> = {
    name: 'Data A',
    value: 'Hello world'
  };
  const dataB: MyType<number> = {
    name: 'Data B',
    value: 1234
  };
  const dataC: MyType<boolean> = { // TS2344: Type 'boolean' does not satisfy the constraint 'string | number'.
    name: 'Data C',
    value: true
  };
  const dataD: MyType<number[]> = { // TS2344: Type 'number[]' does not satisfy the constraint 'string | number'.
    name: 'Data D',
    value: [1, 2, 3, 4]
  };
  ```

- 조건부 타입(Conditional Types)

  제약 조건과 다르게 '타입 구현' 영역에서 사용하는 `extends`는 삼항 연산자를 사용할 수 있음. 이를 조건부 타입이라 함

  ```typescript
  // `T`는 `boolean` 타입으로 제한.
  interface IUser<T extends boolean> {
    name: string,
    age: T extends true ? string : number, // `T`의 타입이 `true`인 경우 `string` 반환, 아닌 경우 `number` 반환.
    isString: T
  }
  
  const str: IUser<true> = {
    name: 'Neo',
    age: '12', // String
    isString: true
  }
  const num: IUser<false> = {
    name: 'Lewis',
    age: 12, // Number
    isString: false
  }
  ```

- infer

  `infer` 키워드를 사용해 타입 변수의 타입 추론(Inference) 여부를 확인할 수 있음

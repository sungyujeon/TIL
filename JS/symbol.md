# Symbol

> primitive type 중의 하나(`Symbol is a primitive type for unique identifiers`)
>
> object의 key에는 string, symbol 두가지 타입만이 가능
>
> 'symbol' represents a unique identifier



##### Hidden properties

- Symbol은 object에서 hidden property로 기능하여, 제3자가 실수로라도 접근할 수 없게 함

  ```js
  let user = { // belongs to another code
    name: "John"
  };
  
  let id = Symbol("id");
  
  user[id] = 1;
  
  alert( user[id] ); // we can access the data using the symbol as the key
  ```

  - 오직 Symbol('id')를 참조하고 있는 값으로만 user object의 key에 접근할 수 있음



##### Symbols in an object literal

- object literal `{ ... }`에서 Symbol을 사용할 때 `[]`(backets) 사용해야함

  ```js
  let id = Symbol('id')
  
  let user = {
      name: 'john',
      [id]: 123  // not 'id': 123
  }
  ```



##### Symbols are skipped by for...in

- `for ... in` loop에서 접근할 수 없음

  ```js
  let id = Symbol("id");
  let user = {
    name: "John",
    age: 30,
    [id]: 123
  };
  
  for (let key in user) alert(key); // name, age (no symbols)
  
  // the direct access by the symbol works
  alert( "Direct: " + user[id] );
  ```

- Object.keys(user) 에서도 마찬가지로 접근 불가능

- Object.assgin({}, user) 에서는 Symbol까지 복사



##### global symbol registry

- global Symbol을 만들어 추후에 다시 접근할 수 있게 함

  ```js
  let id = Symbol.for('id')  // if the symbol did not exist, it is created
  
  // read it again (maybe from another part of the code)
  let idAgain = Symbol.for('id')
  
  // the same symbol
  alert( id === idAgain ); // true
  ```

- name으로 접근 가능

  ```js
  // get symbol by name
  let sym = Symbol.for("name");
  let sym2 = Symbol.for("id");
  
  // get name by symbol
  alert( Symbol.keyFor(sym) ); // name
  alert( Symbol.keyFor(sym2) ); // id
  ```

  
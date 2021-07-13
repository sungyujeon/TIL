# Array

- Internals

  - array는 객체의 한 종류, 따라서 객체와 같이 동작

  - arr[0]에 접근하는 것은 arr object에 0이라는 key로 value에 접근하는 것과 같음

  - 객체로 취급되기 때문에 (technically) 가능한 것들

    ```js
    let fruits = []
    
    fruites[999] = 5  // 기존 length 보다 큰 index에 할당 가능
    fruits.age = 25  // property 만드는 것 가능
    ```

    하지만 배열은 특별한 구조로 취급하고, ordered data이기 때문에 위와 같은 사용은 최적화 측면에서 권장되지 않음

- 선언

  ```js
  let arr = new Array()
  let arr = []
  
  // 가장 많이 사용하는 선언 및 초기화
  let fruits = ['apple', 'banana']
  ```

- replace

  ```js
  fruites[1] = 'Pear'
  ```

- add

  ```js
  fruites[2] = 'Lemon'
  ```

- 존재하지 않는 배열 인덱스 참조 시 undefined

  ```js
  typeof(a[90]) // undefined
  ```

- methods

  ```js
  a = ['dog', 'cat']
  a.length  // 길이 반환
  a.toString()  // 문자열 반환
  a.concat(item1[, item2]...)  // item들이 덧붙여진 한 개의 배열 반환
  a.join(sep)  // sep 인자로 구분해 합친 문자열 반환
  a.pop()  // 배열의 마지막 항목 반환 및 제거
  a.push(item)  // 배열 마지막에 추가
  a.shift()  // 배열의 첫번째 항목 반환 및 제거
  a.unshift()  // 배열의 앞에 추가
  a.slice(start[, end])  // 배열의 일부분을 새배열로 반환
  a.sort()  // 배열 정렬
  a.reverse()  // 배열 역정렬
  a.slice()  // 얕은 복사
  ```

  - javascript array methods에 negative indexes 허용

    ```js
    let arr = [1, 2, 5]
    arr.splice(-1, 0, 3, 4)
    arr // [1,2,3,4,5]
    ```

  - splice

    배열의 값을 삭제하기 위해 `delete arr[1]`을 사용, 하지만 해당 값을 삭제하고 배열의 길이는 유지하기 때문에 해당 값을 제외한 새로운 배열을 얻기 위해 splice 사용, 삭제된 배열은 return

    ```js
    // arr.splice(start[, deleteCount, ele1, ..., eleM])
    
    let arr = ['I', 'go', 'home']
    const newArr = arr.splice(1,1) // from index 1 remove 1 element
    arr // ['I', 'home']
    newArr // ['go']
    ```

  - slice

    arr.slice(start[, end]) start ~ end 배열 잘라서 새로운 배열 리턴

    ```js
    let arr = ['t', 'e', 's', 't']
    arr.slice(1, 3)  // e, s
    arr.slice(-2)  // s, t
    arr.slice // 새로운 배열을 반환하기 때문에 얕은 복사
    ```

  - concat

    arr.concat(arg1, agr2...) 인자들을 포함하여 새로운 배열 리턴

    ```js
    let arr = [1, 2]
    arr.concat([3, 4], 5, 6)
    arr // [1,2,3,4,5,6]
    ```

    ```js
    // object는 해당 object를 단순히 포함하지만
    // array-like object는 위와 같이 elements들을 추가
    // Symbol.isConcatSpread property 추가
    let arr = [1, 2]
    let arrayLike = {
      0: 'something',
      1: 'else',
      [Symbol.isConcatSpreadable]: true,
      length: 2
    }
    arr // [1, 2, something, else]
    
    ```

  - forEach

    ```js
    ['dog', 'cat'].forEach( function (currentValue, index, array) {
      // currentValue, array[index]로 작업 수행
    })
    ```

  - indexOf / lastIndexOf / includes

    ```js
    let arr = [1, 0, false]
    
    arr.indexOf(0) // 1
    arr.indexOf(false) // 2
    arr.indexOf(null) // -1
    arr.includes(1)  // true
    ```

  - find / findIndex

    ```js
    let result = arr.find(function (item, index, array) {
      // if true is returned, item is returned and iteration is topped
      // for falsy scenario returns undefined
    })
    ```

    ```js
    let users = [
      {id: 1, name: 'john'},
      {id: 2, name: 'sally'}
    ]
    
    let user = users.find( item => item.id == 1 )
    user // {id: 1, name: 'john'}
    ```

    findIndex는 동일하게 동작하지만 index 값을 반환 없으면 return -1

  - filter

    찾는 값이 여러개일 경우 filter / return all matching elements

    ```js
    let results = arr.filter(function (item, index, array) {
      // if true is pushed to results and the iteration continues
      // returns empty array if nothing found
    })
    ```

  - map

    ```js
    let result = arr.map(function (item, index, array) {
      // returns the new value instead of item
    })
    ```

  - sort(fn)

    sort 시에 default로 string sort. 숫자 비교를 위해선 compare function을 추가

    ```js
    let arr = [1, 2, 15]
    arr.sort() // [1, 15, 2]
    
    arr.sort((a, b) => {
      if (a > b) return 1
      if (a == b) return 0
      if (a < b) return -1
    })
    
    arr.sort((a, b) => a - b) // shorter
    
    console.log(arr)
    ```

    string 비교 시에 더 엄격하게 비교하기 위해 localeCompare 사용

    ```js
    let countries = ['Österreich', 'Andorra', 'Vietnam'];
    
    alert( countries.sort( (a, b) => a > b ? 1 : -1) ); // Andorra, Vietnam, Österreich (wrong)
    
    alert( countries.sort( (a, b) => a.localeCompare(b) ) ); // Andorra,Österreich,Vietnam (correct!)
    ```

  - split / join

    ```js
    // str.split(delim)
    'a, b'.split(', ') // ['a', 'b']
    'ab'.split('')  // ['a', 'b']
    ```

    ```js
    // arr.join(glue)
    ['a', 'b'].join(';')  // 'a;b'
    ```

  - reduce

    ```js
    let arr = [];
    
    // Error: Reduce of empty array with no initial value
    // if the initial value existed, reduce would return it for the empty arr.
    arr.reduce((sum, current) => sum + current);
    ```

    

    

    

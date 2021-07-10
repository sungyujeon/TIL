# Array

- 선언

  ```js
  let arr = new Array()
  let arr = []
  
  // 가장 많이 사용하는 선언 및 초기화
  let fruits = ['apple', 'banana']
  ```

- replace

  ```js
  
  ```

  

- 존재하지 않는 배열 인덱스 참조 시 undefined

  ```js
  typeof(a[90]) // undefined
  ```

- forEach

  ```js
  ['dog', 'cat'].forEach( function (currentValue, index, array) {
    // currentValue, array[index]로 작업 수행
  })
  ```

- methods

  ```js
  a = ['dog', 'cat']
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


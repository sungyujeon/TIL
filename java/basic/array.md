# 배열

> 배열이란, 같은 타입의 여러 변수를 하나의 묶음으로 다루는 것



##### 배열의 선언과 생성

```java
// 타입[] 변수이름;
// 대괄호가 변수의 이름의 일부라기 보다는 타입의 일부로 보아 더 선호
int[] scores = new int[5];

// 타입 변수이름[]
int scores[] = {1,2,3,4,5};
```



##### 배열의 길이

- 자바에서는 JVM이 모든 배열의 길이를 별도로 관리
- '배열이름.length'를 통해 접근
- 배열은 한 번 생성하면 길이를 변경할 수 없으므로, 이미 생성된 배열의 길이는 변하지 않고 length는 상수. 즉, 값을 읽을 수만 있고 변경할 수 없음



##### 배열의 복사

- 다중 for loop을 통한 복사

- System.arraycopy()

  ```java
  System.arraycopy(arr, startIdx, newArr, startIdx, arr.length)
  ```



##### 다차원 배열

- 2차원 배열의 초기화

  ```java
  // 타입[][] 변수;
  int[][] arr = new int[][];
  ```

  
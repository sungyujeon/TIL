# 조건문과 반복문



## 조건문

> 출처 : https://www.w3schools.com/java/java_conditions.asp

##### Java has the following conditional statements:

- Use `if` to specify a block of code to be executed, if a specified condition is true
- Use `else` to specify a block of code to be executed, if the same condition is false
- Use `else if` to specify a new condition to test, if the first condition is false
- Use `switch` to specify many alternative blocks of code to be executed



##### Switch

- The `switch` expression is evaluated once.
- The value of the expression is compared with the values of each `case`.
- If there is a match, the associated block of code is executed.
- The `break` and `default` keywords are optional.
- 제약조건
  - switch문의 조건식 결과는 정수 또는 문자열
  - case문의 값은 정수 상수(e.g. final int ONE = 1)만 가능하며, 중복되지 않아야 함



##### for-loop

```java
for(int i = 0; i <= 5; i++) {}
// 초기화, 조건식, 증감식, 블럭
```

- 다양한 연산자로 증감식 작성 가능

  ```java
  for(int i = 0; i <= 5; i+=2) {}
  for(int i = 0; i <= 5; i*=2) {}
  ```

- `,`로 두 문장 이상을 하나로 연결해 사용 가능

  ```java
  for(int i = 1, j = 10; i <= 10; i++, j--) {}
  ```



##### 향상된 for loop(enhanced for statement)

> jdk1.5qㅜ터 배열과 컬렉션에 저장된 요소에 접근할 수 있음

```java
// for (타입 변수명 : 배열 또는 컬렉션) {}
for(int value : arr) {};
```



##### while, do-while

```java
// while (조건식) {}
while (true) {};
```

```java
do {
  
} while (true);
```



##### break, continue

- break : switch, for loop 등에서 break문을 통해 자신이 포함된 가장 가까운 반복문에서 벗어남
- continue : 반복문에서만 사용되며, 해당 반복문의 끝으로 이동해 다음 반복으로 넘어감



##### 이름 붙은 반복문

> break문은 단 하나의 반복문만 벗어날 수 있으므로 여러 개의 반복문 중첩될 경우 이름 붙은 반복문 사용

```java
Loop1: 
for(int i = 0; i < 10; i++) {
	for(int j = 0; j < 10; j++) {
    break Loop1;
    // continue Loop1;
  }
}
```


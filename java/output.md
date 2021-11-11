# 출력



## 형식화된 출력

##### printf

- 지시자(specifier)를 통해 변수의 값을 여러 가지 형식으로 변환하여 출력하는 function

- java.util.Formatter(java.util 패키지의 Formatter 클래스 참조)

- 자주 쓰는 지시자

  ```java
  System.out.printf("%b %d %o %x %f, %e %c %s", 1, 10, 100, 0xff, 3.14, 31.4, 65, 65);
  ```

  - %b : boolean
  - %d : decimal
  - %o : octal
  - %x : hexa-decimal
  - %f : floating-point
  - %e : exponent
  - %c : character
  - %s : string

- 정수형 지시자 활용

  ```java
  System.out.printf("[%5d]", 10);  // [   10]
  System.out.printf("[%-5d]", 10); // [10   ]
  System.out.printf("[%05d]", 10); // [00010]
  ```

- 실수형 지시자 활용

  ```java
  System.out.printf("[%14.10f]", 1.23456789); // [  1.2345678900]
  ```

  - %전체자리.소수점아래자리f

- 문자열 지시자 활용

  ```java
  System.out.printf("[%s]", "가나");   // [가나]
  System.out.printf("[%5s]", "가나");  // [   가나] 우측정렬
  System.out.printf("[%-5s]", "가나"); // [가나   ] 좌측정렬
  System.out.printf("[%.1s]", "가나"); // [가]      왼쪽에서 n만큼 출력
  ```

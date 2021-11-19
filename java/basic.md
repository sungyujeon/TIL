# b



## Package

- 패키지란 클래스의 묶음으로, 클래스 또는 인터페이스를 포함 가능

- 패키지는 물리적으로 하나의 디렉토리, 클래스는 물리적으로 하나의 클래스 파일(.class)

- 패키지의 선언

  ```java
  package 패키지명;
  ```

  - 소스파일에서 주석과 공백을 제외한 첫번째 문장이어야 함
  - 소스파일에 단 한 번만 선언 가능
  - 소문자로 작성(대문자도 가능하지만 클래스명과 구분하기 위함)



## Import

- 다른 패키지의 클래스 사용 시 사용

- class 선언문 이전에 위치해야 함

- 선언

  ```java
  import 패키지명.클래스명;
  import 패키지명.*;  // 해당 패키지의 모든 클래스 import. 실행 시 성능상 차이는 없음
  ```

- static import문

  - static 멤버 호출 시 클래스 이름 생략 가능

  - 특정 클래스의 static 멤버 자주 사용할 때 편리함

    ```java
    import static java.lang.Integer.*;
    import static java.lang.Math.random;
    
    random();
    ```

    

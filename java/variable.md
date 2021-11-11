## 변수(Variable)

```java
int age = 10;  // 선언 및 초기화
age = 5  // 할당
```

##### 명명 규칙

- 식별자(identifier) : 프로그래밍에서 사용하는 모든 이름. 식별자에는 명명 규칙이 존재

  - 대소문자가 구분되며 길이에 제한 없음

  - 예약어(=keyword, reserved word) 사용 안됨

  - 숫자로 시작해선 안됨

  - 특수문자는 `_`  `$` 만 허용

- 자바 변수 선언 권장 규칙
  - 클래스 : UpperCamelCase
  - 변수/메서드 : lowerCamelCase
  - 상수 : PI(대문자), MAX_NUMBER(snake case + 대문자)

##### 타입

- 기본형

  - 실제 값(data) 저장

  - 논리형(boolean), 문자형(char), 정수형(byte, short, int, long), 실수형(float,double)

    - 논리형: true / false. 기본형과 연산 불가. 1byte
    - 문자형
      - 하나의 문자만 저장. ASCII 코드, 유니코드, 문자 세가지 방법. 2byte
      - 내부적으로 정수(유니코드)로 저장
      - 정수형 또는 실수형과 연산 가능
    - 정수형
      - 주로 int(default data type) 사용
      - CPU가 가장 효율적으로 처리할 수 있는 타입
      - JVM의 피연산자 스택(operand stack)이 피연산자를 4 byte 단위로 저장하기 때문에 크기가 4 byte 보다 작은 자료형(byte, short)의 값을 계산할 때는 4 byte로 변환하여 연산이 수행되므로 int를 사용하는 것이 효율적.
      - byte(1byte), short(2byte), int(4byte), long(8byte)
    - 실수형
      - float(4byte, 소수점 아래 7자리 정밀도), double(8byte, 소수점 아래 15자리 정밀도)
      - 실수형은 `얼마나 0에 가깝게 표현할 수 있는가`가 중요
      - 정수형의 경우 overflow 시 정수값이 반복되지만, 실수형은 overflow 시 무한대 / underflow(실수형으로 표현할 수 없는 아주 작은 값 e.g. 1.4 * 10^(-45)) 시 0에 수렴
      - 저장방식
        - +-M * 2^E
        - Sign(부호, 1/1bit) + 지수(Exponent, 8/11bit) + 가수(Mantissa, 23/52bit)
        - IEEE754 표준에 따른 부동소수점수의 표현방법
        - 저장방식 추후 보강

  - 상수와 리터럴(constant & literal)

    - constatnt

      ```java
      final int MAX_SPEED = 10;
      ```

      - 한 번 값을 저장하면 다른 값으로 변경 불가
      - 선언과 동시에 초기화(jdk1.6부터 선언과 동시에 초기화하지 않고 사용 전에만 초기화하면 되는 것으로 바뀌었지만, 선언과 동시에 초기화 권장)

    - literal

      ```java
      final int MAX_SPEED = 10;  // 10이 literal
      ```

      - 각 데이터 타입의 리러털에 붙는 접미사가 다름

        ```java
        // 정수형(byte, short는 int 타입의 리터럴 사용)
        byte num1 = 127;  // none
        short num2 = 32767;  // none
        int num3 = 2147483647;  // default data type
        long num4 = 9223372036854775807L;  // L or l
        
        // 실수형
        float rNum1 = 1.4f;  // f or F
        double rNum2 = 3.0e8  // d or D or none, default data type
        ```

    - character literal vs string literal

      ```java
      char ch = 'J';  // '' 빈 리터럴 사용 불가, ' ' 공백 리터럴 사용 가능
      String name = "JAVA";
      ```

      - String은 클래스이므로 `String name = new String("JAVA");` 처럼 사용해야 하지만 예외 허용

- 기본형의 형변환(casting)

  - 형변환은 변수 또는 상수의 타입을 다른 타입으로 바꾸는 것
  - 작은 타입 -> 큰 타입 변환은 값 손실이 없음(정수 -> 실수, boolean 제외)
  - 정수 <-> 정수
    - 큰 타입에서 작은 타입으로 변환할 경우 값 손실 발생 가능
    - 작은 타입의 범위를 벗어나는 정수형일 경우 자바에서는 컴파일 불가능
  - 실수 <-> 실수
    - double -> float 형변환의 경우 가수의 24번째 자리에서 반올림이 발생할 경우 overflow 또는 underflow 발생해 무한대 또는 0에 수렴할 수 있음
  - 정수 <-> 실수
    - 정수 -> 실수는 단순히 실수의 저장형식으로 저장되어 간단. 단, float으로 변환할 경우 7자리를 넘어가면 오차가 발생할 수 있음
    - 실수 -> 정수는 실수형의 소수점 이하 값을 버림

- 자동 형변환

  ```java
  int i = 3;
  double d = 1.0 + i;  // double d = 1.0 + (double)i;
  ```

  - 서로 다른 타입 간의 대입 또는 연산할 때 형변환으로 타입 일치시키는 것이 원칙이나, 생략 가능한 이유는 컴파일러가 생략된 형변환을 자동적으로 추가하기 때문
  - 자동 형변환의 규칙
    - 컴파일러는 기존의 값을 최대한 보존할 수 있는 타입으로 자동 형변환
    - 모든 연산에서 산술 변환이 일어나지만, 쉬프트 연산자와 증감 연산자는 예외

- 참조형

  - 특정 값이 저장되는 주소(memory address)를 값으로 가짐
  - 참조형 변수 간의 연산 불가(기본형 변수만을 연산)

  - 선언 시 변수의 타입을 클래스 이름으로 사용

    ```java
    class MyDate() {
        Date today = new Date();
    }
    ```

    - 객체 생성 연산자 new의 결과는 생성된 객체의 주소
    - 참조형 변수는 null 또는 객체의 주소(4 byte, 0x0 ~ 0xFFFFFFFF)를 값으로 가짐. JVM이 32bit가 아닌 64bit의 경우 주소 크기는 8 byte


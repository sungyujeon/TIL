# Overriding

> 조상 클래스로부터 상속받은 메서드의 내용을 변경하는 것



##### 조건

- 조상클래스의 메서드와 이름이 같아야 함

- parameter가 같아야 함

- return 타입이 같아야 함

  (jdk1.5부터 공변 반환타입(covariant return type)이 추가되어, 반환 타입을 subclass의 타입으로 변경하는 것이 가능)

- 접근제어자(access modifier), 예외(exception)는 제한된 조건 하에서 다르게 변경 가능

  - 접근제어자는 superclass의 메서드보다 좁은 범위로 변경 불가능
  - instance method와 static method 간 변경 불가능
  - 예외는 superclass의 예외보다 많은 수의 예외 선언 불가능

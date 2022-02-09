# Interface



##### default method

```java
public interface Interface {
	
	default String method() {
		return "it can be implemented and overrided";
	}
}
```

- 인터페이스가 default 키워드로 선언되면 method 구현 가능
- 해당 인터페이스 구현 클래스는 default method overriding 가능

- 인터페이스가 변경되면 인터페이스 구현 클래스는 모두 해당 메서드를 구현해야 하는 문제가 있는데, 이를 해결하기 위해 JAVA 1.8 부터 변경



##### static method

```java
interface Interface {
	
	static int multiply(int x, int y) {
		return x * y;
	}
}

Interface.multiply(2, 3);
```

- 인터페이스에서 정의한 static 메서드는 반드시 `인터페이스명.메서드` 형식으로 호출하여야 함

- JAVA 1.8부터 인터페이스를 이용해 간단한 기능을 가지는 유틸성 인터페이스를 만들 수 있게 됨

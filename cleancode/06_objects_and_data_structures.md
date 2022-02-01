# 객체와 자료구조



### 자료 추상화

```java
// 구체적인 Point 클래스
public class Point {
    public double x;
    public double y;
}

// 추상적인 Point 클래스
public interface Point {
    double getX();
    double getY();
    void setCartesian(double x, double y);
    double getR();
    double getTheta();
    void setPolar(double r, double theta);
}
```

- 변수 사이에 함수라는 계층을 넣는다고 구현이 저절로 감춰지지는 않는다

  - 구체적인 Point 클래스에서는 구현을 외부로 노출한다.
  - 추상적인 Point 클래스는 자료 구조 이상을 표현하고 있다.
    - 클래스 메서드가 접근 정책을 강제한다(좌표를 읽을 때는 각 값을 개별적으로 읽어야 하지만, 좌표를 설정할 때는 두 값을 한꺼번에 설정해야 함)

- 구현을 감추려면 추상화가 필요하다! 단순히 getter, setter 설정으로 변수를 다룬다고 클래스가 되지는 않는다!

  ```java
  // 구체적인 Vehicle 클래스
  public interface Vehicle {
      double getFuelTankCapacityInGallons();  // getter만 설정한다고 추상화가 아님
      double getGallonsOfGasoline();
  }
  
  // 추상적인 Vehicle 클래스
  public interface Vehicle {
      double getPercentFuelRemaining();
  }
  ```

- 추상 인터페이스를 제공해 사용자가 구현을 모른 채 자료의 핵심을 조작할 수 있어야 진정한 의미의 클래스다!



### 자료/객체 비대칭

> <b>자료구조</b>는 자료를 그대로 공개하며 별다른 함수 제공하지 않음
>
> <b>객체</b>는 추상화 뒤로 자료를 숨긴 채 자료를 다루는 함수만 공개



##### 절차적인 도형 클래스

```java
public class Square {
    public Point topLeft;
    public double side;
}

public class Rectangle {
    public Point topLeft;
    public double height;
    public double width;
}

public class Circle {
    public Point center;
    public double radius;
}

public class Geometry {
    public final double PI = 3.141592653589793;

    public double area(Object shape) throws NoSuchShapeException {
        if (shape instanceof Square) {
            Square s = (Square)shape;
            return s.side * s.side;
        } else if (shape instanceof Rectangle) {
            Rectangle r = (Rectangle)shape;
            return r.height * r.width;
        } else if (shape instanceof Circle) {
            Circle c = (Circle) shape;
            return PI * c.radius * c.radius;
        }
        throw new NoSuchShapeException();
    }
}
```

- 장점
  - Geometry 클래스에 새로운 메서드를 추가할 때(예를 들면 둘레 길이를 구하는 perimeter()), 다른 도형 클래스는 아무런 영향을 받지 않고 추가할 수 있음

- 단점
  - 만약 새로운 도형을 추가하고 싶다면 Geometry 클래스에 속한 메서드를 모두 고쳐야 함
  - ~~고쳐야 하는 예시 코드 추가해야 함~~



##### 객체 지향적인 도형 클래스

```java
public interface Shape {
    double area();
}

public class Square implements Shape {
    private Point topLeft;
    private double side;

    @Override
    public double area() {
        return side * side;
    }
}

public class Rectangle implements Shape {
    private Point topLeft;
    private double height;
    private double width;

    @Override
    public double area() {
        return height * width;
    }
}

public class Circle implements Shape {
    private Point center;
    private double radius;
    public final double PI = 3.141592653589793;
    
    @Override
    public double area() {
        return PI * radius * radius;
    }
}
```

- 장점

  - area()는 다형(polymorphic) 메서드임. Geometry 클래스를 만들 필요 없음
  - 새 도형(e.g. Pentagon)을 추가해도 기존 메서드에 영향을 미치지 않음

- 단점

  - 새 함수를 추가하고 싶다면 도형 클래스 전부를 고쳐야 함

    ```java
    public interface Shape {
        double area();
        double perimeter();
    }
    ```

    - perimeter() 메서드를 추가하고 싶다면 Shape 인터페이스를 구현하는 모든 클래스의 perimeter() 메서드를 구현해야 함(최소한 override 해야 함)



##### 절차지향  vs 객체지향 정리

- 자료 구조를 사용하는 절차적인 코드는
  - 기존 자료 구조를 변경하지 않으면서 <b>새 함수</b> 추가하기 쉬움
  - 새로운 자료 구조 추가하기 어려움
- 객체 지향 코드는
  - 기존 함수 변경하지 않으면서 <b>새 클래스</b>를 추가하기 쉬움
  - 새로운 함수 추가하기 어려움
- 결론
  - 즉, 객체 지향 코드에서 어려운 변경은 절차적인 코드에서 쉬우며, 절차적인 코드에서 어려운 변경은 객체 지향 코드에서 쉽다!
  - 상황에 따라 새로운 자료 타입이 필요(객체 지향 기법 활용)할지, 새로운 함수가 필요(절차적인 코드와 자료구조 활용)할지를 분별하는 것이 중요



### 디미터 법칙

> 디미터 법칙(Law of Demeter)은 잘 알려진 휴리스틱(heuristic)으로,
>
> 모듈은 자신이 조작하는 객체의 속사정을 몰라야 한다는 법칙
>
> `Don't Talk to Strangers` 또는 `Principle of least knowledge` 로도 알려져 있음(한 객체가 알아야 하는 다른 객체가 최소화 되어야 하므로)

##### 예시

```java
// good
class C {
    InstanceObject instanceObject = new InstanceObject();

    public void f(ArgsOfF argsOfF) {
        ObjectCreatedByF objectCreatedByF = new ObjectCreatedByF();
        
        methodOfF();  // 클래스 C
        objectCreatedByF.method();  // f가 생성한 객체
        argsOfF.method();  // f 인수로 넘어온 객체
        instanceObject.method();  // C인스턴스 변수에 저장된 객체
    }
    
    public void methodOfF() {}
}

// bad
final String ouputDir = ctxt.getOptions().getScratchDir().getAbsolutePath();
```

- `클래스 C의 메서드 f는 다음과 같은 객체의 메서드만 호출해야 한다`
  - 클래스 C
  - f가 생성한 객체
  - f 인수로 넘어온 객체
  - C인스턴스 변수에 저장된 객체

- `bad` 예시가 디미터 법칙을 어긴 이유
  - `Context ctxt = new Context();`로 생성한 ctxt 인스턴스가 있다면
  - Context 클래스의 getOptions() 메서드는 호출해도 되지만,
  - ctxt.getOptions()가 반환하는 객체의 getScratchDir(), 다시 그 객체의 getAbsolutePath() 메서드를 호출하는 것은 디미터 법칙을 어긴 것이 됨



##### 기차 충돌

> 위 bad 예시와 같은 코드를 기차 충돌(train wreck)이라 부름
>
> 여러 객차가 한 줄로 이어진 기차처럼 보이기 때문

- ~~[G36] 예시 추가~~

- 개선

  ```java
  // bad
  final String ouputDir = ctxt.getOptions().getScratchDir().getAbsolutePath();
  
  // good
  Options opts = ctxt.getOptions();
  File scratchDir = opts.getScratchDir();
  final String ouputDir = scratchDir.getAbsolutePath();
  ```

  - 하지만 이러한 개선도 디미터 법칙을 위반하는지 여부는 Context, Options, ScratchDir이 객체인지, 자료구조인지 여부에 달렸다!

  - ~~<b>객체</b>라면 내부 구조를 숨겨야 하므로 디미터 법칙을 위반한다~~ <b>왜??????</b>

  - <b>자료구조</b>라면 내부 구조를 노출하므로 디미터 법칙이 적용되지 않음

    ```java
    final String outputDir = ctxt.options.scratchDir.absolutePath;
    ```

- 추가 개선

  ```java
  // bad1
  // ctxt 객체에 공개해야 하는 메서드가 너무 많아짐
  ctxt.getAbsolutePathOfScratchDirectoryOption();
  
  // bad2
  // getScratchDirectoryOption() 메서드가 객체가 아닌 자료 구조를 반환한다고 가정하므로 혼란스러움
  ctxt.getScratchDirectoryOption().getAbsolutePath();
  
  // better
  BufferedOutputStream bos = ctxt.createScratchFileStream(classFileName);
  ```

  - Context, Options, ScratchDir이 객체라면 디미터 법칙을 위반하므로

  - 해당 메서드가 어떤 기능을 하기를 원하는지를 정확하게 파악하는 것이 중요!

    ```java
    // 위 코드에서 최종적으로 outputDir 문자열을 얻는 이유가 임시 파일을 생성하려는 것임을 알 수 있음
    String outFile = outputDir + "/" + className.replace('.', '/') + ".class";
    FileOutputStream fout = new FileOutputStream(outFile);
    BufferedOutputStream bos = new BufferedOutputStream(fout);
    ```

    - 결론적으로 임시 디렉터리의 절대 경로를 얻으려는 이유는 임시 파일을 생성하기 위함이므로
    - Context 객체에게 해당 메서드 기능을 추가하는 것이 최종 개선된 코드
      - 이로써 Context는 내부 구조를 드러내지 않고, 모듈에서 해당 메서드는 자신이 몰라야 하는 여러 객체를 탐색할 필요가 없어짐

- 정리
  - 자료구조는 무조건 함수 없이 공개 변수만 포함하고
  - 객체는 비공개 변수와 공개 함수를 포함하게 하라!
  - 하지만, 단순한 자료 구조에도 조회 함수와 설정 함수를 정의하라 요구하는 프레임워크와 표준(e.g. `bean`)이 존재하긴 함



##### 잡종 구조

- 위와 같은 혼란으로 인해 절반은 객체, 절반은 자료 구조인 잡종 구조가 탄생함
- 잡종 구조에서는 새로운 함수, 새로운 자료구조를 추가하기 어려움(즉, 양쪽의 단점을 모아놓은 셈)
- 잡종 구조는 되도록 피하는 편이 좋음



### DTO(자료 전달 객체)

> DTO(Data Transfer Object)
>
> 자료 구조체의 전형적인 형태는 공개 변수만 있고 함수가 없는 클래스
>
> 특히, 데이터베이스와 통신하거나 소켓에서 받은 메시지 구문 분석 시 유용

- DTO는 객체로 취급하지 않고, 자료구조로 취급해야 한다!
- 활성 레코드
  - 활성 레코드는 DTO의 특수한 형태
  - 공개 변수가 있거나, 비공개 변수에 조회/설정 함수가 있는 자료구조지만, 대개 save/find와 같은 탐색 함수도 제공
  - 활성 레코드에 비즈니스 로직이 포함된 메서드를 추가해 객체로 취급하면 안됨! 이는 잡종 구조를 유발함

# 클래스와 인터페이스

> [ITEM 15. 클래스와 멤버의 접근 권한을 최소화하라](#ITEM-15.-클래스와-멤버의-접근-권한을-최소화하라)
>
> [ITEM 16. public 클래스에서는 public 필드가 아닌 접근자 메서드를 사용하라](#ITEM-16.-public-클래스에서는-public-필드가-아닌-접근자-메서드를-사용하라)
>
> [ITEM 17. 변경 가능성을 최소화하라](#ITEM-17.-변경-가능성을-최소화하라)
>
> [ITEM 18. 상속보다는 컴포지션을 사용하라](#ITEM-18.-상속보다는-컴포지션을-사용하라)
>
> [ITEM 19. 상속을 고려해 설계하고 문서화하라. 그러지 않았다면 상속을 금지하라](#ITEM-19.-상속을-고려해-설계하고-문서화하라.-그러지-않았다면-상속을-금지하라)
>
> [ITEM 20. 추상 클래스보다는 인터페이스를 우선하라](#ITEM-20.-추상-클래스보다는-인터페이스를-우선하라)
>
> [ITEM 21. 인터페이스는 구현하는 쪽을 생각해 설계하라](#ITEM-21.-인터페이스는-구현하는-쪽을-생각해-설계하라)
>
> [ITEM 22. 인터페이스는 타입을 정의하는 용도로만 사용하라](#ITEM-22.-인터페이스는-타입을-정의하는-용도로만-사용하라)

<br>

## ITEM 15. 클래스와 멤버의 접근 권한을 최소화하라

- 캡슐화
  - 어설프게 설계된 컴포넌트와 잘 설계된 컴포넌트의 가장 큰 차이는 클래스 내부 데이터와 내부 구현 정보를 외부 컴포넌트로부터 얼마나 잘 숨겼느냐임
  - 내부 구현을 완벽히 숨겨 구현과 API를 깔끔히 분리하면 시스템을 구성하는 컴포넌트들을 서로 독립시켜서 개발, 테스트, 최적화, 적용, 분석, 수정을 개별적으로 할 수 있게 해줌
    - 시스템 개발 속도를 높임. 여러 컴포넌트를 병렬로 개발할 수 있기 때문
    - 시스템 관리 비용을 낮춤. 각 컴포넌트를 더 빨리 파악하여 디버깅할 수 있고 다른 컴포넌트로 교체하는 부담도 적음
    - 캡슐화 자체가 성능을 높여주지는 않지만, 성능 최적화에 도움이 됨. 완성된 시스템을 프로파일링해 최적화할 컴포넌트를 정한 다음(아이템 67), 다른 컴포넌트에 영향을 주지 않고 해당 컴포넌트만 최적화할 수 있기 때문
    - 소프트웨어 재사용성을 높임. 외부에 거의 의존하지 않고 독자적으로 동작할 수 있는 컴포넌트라면 그 컴포넌트와 함께 개발되지 않은 낯선 환경에서도 유용하게 쓰일 가능성이 높음
    - 큰 시스템을 제작하는 난이도를 낮춰줌. 시스템 전체가 아직 완성되지 않은 상태에서도 개별 컴포넌트의 동작을 검증할 수 있기 때문
- 접근 제어 매커니즘
  - private, protected, default(package-private), public
  - 모든 클래스와 멤버의 접근성을 가능한 한 좁혀야 함(즉, 소프트웨어가 올바로 동작하는 한 항상 가장 낮은 접근 수준을 부여해야 함)
  - 가장 바깥의 top-level 클래스와 인터페이스에는 public, package-private 접근 수준을 부여할 수 있음<small>(java 8부터 interface에도 default, static 메서드를 지원하며, java 9부터는 private 메서드도 지원)</small>
  - 고려사항
    - 클래스의 공개 API 설계 후, 그외 모든 멤버는 private으로 만듦
    - 이후 오직 같은 패키지의 다른 클래스가 접근해야 하는 멤버에 한하여 package-private으로 풀어줌
    - 권한을 풀어주는 일을 자주 하게 되면 시스템에서 컴포넌트를 더 분해해야 하는 것은 아닌지 다시 고민해봐야 함
    - Serializable 구현 클래스에서는 그 필드들도 의도치 않게 공개 API 될 수 있으므로 주의(아이템 86,87)
  - public 클래스에서는 멤버의 접근 수준을 package-private에서 protected로 바꾸는 순간 그 멤버에 접근할 수 있는 대상 범위가 엄청나게 넓어짐. public 클래스의 protected 멤버는 공개 API 이므로 영원히 지원되어야 함. 또한 내부 동작 방식을 API 문서에 적어 사용자에게 공개해야 할 수도 있음(아이템 19). 따라서 protected 멤버의 수는 적을수록 좋음
  - 멤버 접근성을 좁히지 못하게 방해하는 제약
    - 상위 클래스의 메서드를 재정의할 때는 그 접근 수준을 상위 클래스에서보다 좁게 설정할 수 없음
    - 이 제약은 상위 클래스의 인스턴스는 하위 클래스의 인스턴스로 대체해 사용할 수 있어야 한다는 규칙(리스코프 치환 원칙)을 지키기 위해 필요함

- public 클래스의 인스턴스 필드는 되도록 public이 아니어야 함(아이템16)

  - 필드가 가변 객체 참조하거나 final이 아닌 인스턴스 필드를 public으로 선언하면 그 필드에 담을 수 있는 값을 제한할 힘을 잃게 됨(불변식 보장할 수 없음)

  - 필드가 수정될 때 (락 획득 같은) 다른 작업 할 수 없으므로 public 가변 필드를 갖는 클래스는 일반적으로 스레드 안전하지 않음
  - public 필드를 없애는 방식으로는 리팩터링 할 수 없음
  - 단, 상수라면 public static final 필드로 공개해도 좋지만, 이런 필드는 반드시 기본 타입 값이나 불변 객체를 참조해야 함

- 모듈 시스템(since java 9)

  - 모듈 시스템 개념이 도입되면서 두 가지 암묵적 접근 수준이 추가됨

  - 모듈은 자신에 속하는 패키지 중 공개(export)할 것들을 선언함

  - public, protected 멤버라도 해당 패키지를 공개하지 않으면 모듈 외부에서는 접근할 수 없음

    즉, public, protected 라도 그 효과가 모듈 내부로 한정되는 것임

  - 기존 4개의 접근 수준과 달리 모듈의 새로운 두 접근 수준은 주의해서 사용해야 함

    - 자신 모듈의 JAR 파일을 자신의 모듈 경로가 아닌 애플리케이션의 클래스패스(classpath)에 두면 그 모듈 안의 모든 패키지는 마치 모듈이 없는 것처럼 행동함

<br>

## ITEM 16. public 클래스에서는 public 필드가 아닌 접근자 메서드를 사용하라

```java
public class Point {
    public double x;
    public double y;
}
```

- 이러한 클래스는 데이터 필드에 직접 접근할 수 있어서 캡슐화의 이점 제공하지 못함

- API를 수정하지 않고는 내부 표현을 바꿀 수 없고, 불변식을 보장할 수도 없으며, 외부에서 필드에 접근할 때 부수 작업을 수행할 수도 없음

<br>

```java
public class Point {
    private double x;
    private double y;

    public Point(double x, double y) {
        this.x = x;
        this.y = y;
    }

    public double getX() {
        return x;
    }

    public void setX(double x) {
        this.x = x;
    }

    public double getY() {
        return y;
    }

    public void setY(double y) {
        this.y = y;
    }
}
```

- public 클래스에서 접근자를 제공해 클래스 내부 표현 방식을 언제든 바꿀 수 있는 유연성을 얻음
- Package-private 클래스 혹은 private 중첩 클래스라면 데이터 필드를 노출한다 해도 문제는 없음

<br>

## ITEM 17. 변경 가능성을 최소화하라

##### 불변클래스

- 인스턴스의 내부 값을 수정할 수 없는 클래스
- 불변 클래스는 가변 클래스보다 설계하고 구현하고 사용하기 쉬우며, 오류가 생길 여지도 적고 훨씬 안전
- 불변 클래스를 만드는 규칙
  - 객체의 상태를 변경하는 메서드(변경자)를 제공하지 않음
  - 클래스를 확장할 수 없도록 함
    - 하위 클래스에서 부주의하게 혹은 나쁜 의도로 객체의 상태를 변하게 만드는 사태를 막음
  - 모든 필드를 final로 선언
    - 시스템이 강제하는 수단을 이용해 설계자의 의도를 명확히 드러내는 방법
    - 새로 생성된 인스턴스를 동기화 없이 다른 스레드로 건네도 문제없이 동작하게끔 보장하는 데 필요
  - 모든 필드를 private으로 선언
    - 필드가 참조하는 가변 객체를 클라이언트에서 직접 접근해 수정하는 일을 막음
    - 기본 타입 필드나 불변 객체를 참조하는 필드를 public final로만 선언해도 불변 객체가 되지만, 이렇게 하면 다음 릴리즈에서 내부 표현을 바꾸지 못하므로 권장하지는 않음
  - 자신 외에는 내부의 가변 컴포넌트에 접근할 수 없도록 함
    - 클래스에 가변 객체를 참조하는 필드가 하나라도 있다면 클라이언트에서 그 객체의 참조를 얻을 수 없도록 해야 함
    - 접근자 메서드가 그 필드를 그대로 반환해서도 안됨
    - 생성자, 접근자, readObject 메서드 모두에서 방어적 복사를 수행

```java
public final class Complex {

    private final double re;
    private final double im;

    public Complex(double re, double im) {
        this.re = re;
        this.im = im;
    }

    public double realPart() {
        return this.re;
    }
    
    public double imaginaryPart() {
        return this.im;
    }
    
    public Complex plus(Complex c) {
        return new Complex(re + c.re, im + c.im);
    }
    
    // ...
}
```

- plus와 같은 사칙연산 메서드는 인스턴스 자신은 수정하지 않고 새로운 Complex 인스턴스를 만들어 반환함. 피연산자에 함수를 적용해 그 결과를 반환하지만 피연산자 자체는 그대로인 프로그래밍 패턴을 함수형 프로그래밍이라 함
- method 이름으로 add 같은 동사 대신 plus 같은 전치사를 사용한 점에 주목
  - add는 값을 변경하여 더한다는 의미가 크고, plus는 객체의 값을 변경하지 않는다는 사실을 강조하려는 의도

<br>

##### 장점

- 불변 객체는 근본적으로 스레드 안전하여 따로 동기화할 필요가 없음

- 불변 클래스라면 한 번 만든 인스턴스를 최대한 재활용하기를 권함

  - 가장 쉬운 재활용 방법은 자주 쓰이는 값들을 상수(public static final)로 제공하는 것

    ```java
    public static final Complex ZERO = new Complex(0, 0);
    public static final Complex ONE = new Complex(1, 0);
    public static final Complex I = new Complex(1, 0);
    ```

- 불변 클래스는 자주 사용되는 인스턴스를 캐싱하여 같은 인스턴스를 중복 생성하지 않게 해주는 정적 팩터리를 제공할 수 있음

  - 여러 클라이언트가 인스턴스를 공유하여 메모리 사용량과 가비지 컬렉션 비용이 줄어듬
  - 새로운 클래스를 설계할 때 public 생성자 대신 정적 팩터리를 만들어두면, 클라이언트를 수정하지 않고도 필요에 따라 캐시 기능을 나중에 덧붙일 수 있음

- 불변 객체를 자유롭게 공유할 수 있다는 점은 방어적 복사도 필요 없다는 결론으로 이어짐

  - 아무리 복사해봐야 원본과 똑같으니 복사자체가 의미가 없으므로 clone 메서드나 복사 생성자를 제공하지 않는게 좋음

- **불변 객체끼리는 내부 데이터를 공유할 수 있음**

  - BigInteger 클래스는 내부에서 값의 부호(sign)와 크기(magnitude)를 따로 표현함

    ```java
    public class BigInteger {
        final int signum;  // -1, 0, 1로 부호를 나타냄
        final int[] mag;  // 생성 단계에서 초기화
      
        private BigInteger(int[] val) {
            if (val.length == 0)
                throw new NumberFormatException("Zero length BigInteger");
    
            if (val[0] < 0) {
                mag = makePositive(val);
                signum = -1;
            } else {
                mag = trustedStripLeadingZeroInts(val);
                signum = (mag.length == 0 ? 0 : 1);
            }
            if (mag.length >= MAX_MAG_LENGTH) {
                checkRange();
            }
        }
    }
    ```

    - 배열은 비록 가변이지만 복사하지 않고 원본 인스턴스와 공유해도 됨

- **객체를 만들 때 다른 불변 객체들을 구성요소로 사용하면 이점이 많음**

  - 값이 바뀌지 않는 구성요소로 이뤄진 객체라면 그 구조가 아무리 복잡해도 불변식 유지하기가 수월해짐
  - 불변 객체는 map의 키와 set의 원소로 쓰기에 안성맞춤(map or set 안에 담긴 값이 바뀌면 불변식이 허물어지는데, 불변 객체를 사용하면 그런 걱정을 하지 않아도 됨)

- **불변 객체는 그 자체로 실패 원자성을 제공**

  - 실패 원자성(failure atomicity)이란 '메서드가 예외가 발생한 후에도 그 객체는 여전히 (메서드 호출 전과 똑같은) 유효한 상태여야 한다'는 성질. 불변 객체의 메서드는 내부 상태를 바꾸지 않으니 이 성질을 만족

<br>

##### 단점

- 값이 다르면 반드시 독립된 객체로 만들어야 함
  - 값의 가짓수가 많다면 생성 비용이 매우 커짐
- 객체 생성 단계가 많고 중간 단계에서 만들어진 객체가 버려진다면 성능 문제가 더 커짐
  - 대처 방법: 흔히 쓰일 다단계 연산(multistep operation)을 예측하여 기본 기능으로 제공
    - BigInteger는 모듈러 지수 같은 다단계 연산 속도를 높여주는 가변 동반 클래스(companion class)를 package-private으로 두고 있음
    - 연산들을 정확히 예측할 수 있다면 package-private 가변 동반 클래스만으로 충분하지만, 그렇지 않다면 public으로 제공하는 것이 최선
    - String의 StringBuilder, StringBuffer 등이 가변 동반 클래스

<br>

##### 불변 클래스를 만드는 설계 방법

- 자신을 상속하지 못하게 하는 방법

  - final class 선언

  - 모든 생성자 private or package-private 만들고 public static factory method 제공 방법

    ```java
    public class Complex {
        
        //...
      
        private Complex(double re, double im) {
            this.re = re;
            this.im = im;
        }
    
        public static Complex valueOf(double re, double im) {
            return new Complex(re, im);
        }
    }
    
    ```

    - private 생성자를 통해 다른 패키지에서 이 클래스 확장이 불가능함
    - 정적 팩터리 방식은 다수의 구현 클래스를 활용한 유연성을 제공하고, 이에 더해 다음 릴리즈에서 객체 캐싱 기능을 추가해 성능을 끌어올릴 수도 있음

- 불변 클래스 성능을 위한 예외

  - 모든 필드가 final 이고 어떤 메서드도 그 객체를 수정할 수 없다는 것 보다, '어떤 메서드도 객체의 상태 중 외부에 비치는 값을 변경할 수 없다'고 예외를 둘 수도 있음
  - 어떤 불변 클래스는 계산 비용이 큰 값을 나중에 (처음 쓰일 때) 계산하여 final이 아닌 필드에 캐시해두기도 함. 똑같은 값을 요청 시 캐시 값을 반환해 비용 절감. 이는 객체가 항상 같은 값을 반환하기 때문에 사용할 수 있는 것

- 직렬화 시 주의점

  - Serializable을 구현한 불변 클래스의 내부에 가변 객체를 참조하는 필드가 있다면 readObject나 readResolve 메서드를 반드시 제공하거나, ObjectOutputStream.writeUnshared와 ObjectInputStream.readUnshared 메서드를 사용해야 함.
  - 그렇지 않으면 공격자가 이 클래스로부터 가변 인스턴스를 만들어낼 수 있음

<br>

##### 정리

- 클래스는 꼭 필요한 경우가 아니라면 불변이어야 함
- 불변으로 만들 수 없는 클래스라도 변경할 수 있는 부분을 최소한으로 줄여야 함
- 생성자는 (불변식 설정이 모두 완료된) 초기화가 완벽히 끝난 상태의 객체를 생성해야 함
  - 확실한 이유가 없다면 생성자와 정적 팩터리 외에 어떤 초기화 메서드도 public 으로 제공해서는 안됨

<br>

## ITEM 18. 상속보다는 컴포지션을 사용하라

> 상속은 코드를 재사용하는 강력한 수단이지만 항상 최선은 아니다. 잘못 사용하게 되면 오류를 내기 쉬운 소프트웨어를 만들게 된다. 상위 클래스와 하위 클래스를 모두 같은 프로그래머가 통제하는 패키지 안에서라면 상속도 안전한 방법이다. 확장할 목적으로 설계되었고 문서화도 잘 된 클래스(아이템19)도 마찬가지로 안전하다. 하지만 일반적인 구체 클래스를 패키지 경계를 넘어, 즉 다른 패키지의 구체 클래스를 상속하는 일은 위험하다.

##### 상속의 단점

- 메서드 호출과 달리 상속은 캡슐화를 깨뜨린다

  - 상위 클래스가 어떻게 구현되느냐에 따라 하위 클래스의 동작에 이상이 생길 수 있음

  - 즉, 상위 클래스는 릴리즈마다 내부 구현이 달라질 수 있으며, 이로 인해 하위 클래스는 오작동할 수 있다는 뜻

  - 예시

    ```java
    public class InstrumentedHashSet<E> extends HashSet<E> {
    
        private int addCount = 0;
    
        public InstrumentedHashSet() {}
    
        public InstrumentedHashSet(int initCap, float loadFactor) {
            super(initCap, loadFactor);
        }
    
        @Override
        public boolean add(E e) {
            addCount++;
            return super.add(e);
        }
    
        @Override
        public boolean addAll(Collection<? extends E> c) {
            addCount += c.size();
            return super.addAll(c);  // add() 메서드를 재호출하며 중복 카운팅
        }
    
        public int getAddCount() {
            return this.addCount;
        }
    
        public static void main(String[] args) {
            InstrumentedHashSet<String> s = new InstrumentedHashSet<>();
            s.addAll(List.of("a", "b", "c"));
    
            System.out.println("s.getAddCount() = " + s.getAddCount());
        }
    }
    
    ```

    - HashSet을 사용하는 프로그램을 확장하여 새로운 클래스를 만들었을 때, 잘못 동작할 수 있음
    - addAll() 메서드가 add() 메서드를 사용하게 되므로 중복된 계산을 하게 되어 3이 아닌 6을 반환

- 다음 릴리즈에서 상위 클래스에 새로운 메서드를 추가하면 의도하지 않은 동작을 할 수도 있음

  - 컬렉션 프레임워크 이전부터 존재하던 Hashtable, Vector를 컬렉션 프레임워크에 포함시켜 보안 허점들을 수정해야 하는 사태가 벌어지기도 함

- 하위 클래스에 새로운 메서드를 추가하는 것도 해결책이 될 수 없음

  - 상위 클래스가 다음 릴리즈에서 새 메서드를 추가했는데, 시그니쳐가 같다면 override 하는 것과 똑같은 부수 효과가 발생하고, 시그니쳐가 같고 반환 타입이 다르면 하위 클래스는 컴파일조차 되지 않음
  - 중복되는 상위 클래스의 규약을 만족하지 못할 가능성이 높음

- 컴포지션을 써야 할 상황에서 상속을 사용하는 건 내부 구현을 불필요하게 노출하는 꼴

  - API가 내부 구현에 묶이고 그 클래스의 성능도 영원히 제한됨
  - 더 심각한 문제는 클라이언트가 노출된 내부에 직접 접근할 수 있음

- 상속을 사용하기로 결정하기 전에 다음과 같은 질문을 해야 함

  - 확장하려는 클래스의 API에 아무런 결함이 없는가?

  - 결함이 있다면, 이 결함이 여러분의 클래스의 API까지 전파해도 괜찮은가?

    \>> 컴포지션으로는 이런 결함을 숨기는 새로운 API를 설계할 수 있지만, 상속은 상위 클래스의 API를 '그 결함까지도' 그대로 승계한다

<br>

##### 컴포지션(composition)

> 기존 클래스를 확장하지 않고 새로운 클래스의 private 필드로 기존 클래스 인스턴스를 참조하게 함
>
> `private SuperClass superClass = new SuperClass();`
>
> - 이러한 방식을 forwarding 이라 하며 새 클레스의 메서드들을 전달 메서드(forwarding method)라 함
> - 새로운 클래스는 기존 클래스의 내부 구현 방식의 영향에서 벗어날 수 있음
> - 기존 클래스에 새로운 메서드가 추가되더라도 영향받지 않음

```java
public class ForwardingSet<E> implements Set<E> {

    // Override all methods of the interface Set

}
```

- 다른 Set 인스턴스를 감싸고(wrap) 있다는 뜻에서 래퍼 클래스라고 하며, 다른 Set에 계측 기능을 덧씌운다는 뜻에서 데코레이터 패턴이라고도 함
- 컴포지션과 전달의 조합은 넓은 의미로 위임(delegation)이라고 부름. 단, 엄밀하게 래퍼 객체가 내부 객체에 자기 자신의 참조를 넘기는 경우만 위임에 해당함
- 래퍼 클래스는 단점이 거의 없지만 callback framework 와는 어울리지 않다는 점만 주의하면 됨
  - 자기 자신의 참조를 다른 객체에 넘겨서 다음 호출(콜백) 때 사용하도록 함
  - 내부 객체는 자신을 감싸고 있는 래퍼의 존재를 모르니 대신 자신(this)의 참조를 넘기고, 콜백 때는 래퍼가 아닌 내부 객체를 호출하게 됨
  - 이를 self 문제라고 함

<br>

## ITEM 19. 상속을 고려해 설계하고 문서화하라. 그러지 않았다면 상속을 금지하라

##### 상속을 고려한 설계와 문서화

- 메서드를 재정의하면 어떤 일이 일어나는지 정확히 정리하여 문서로 남겨야 함
- 상속용 클래스는 재정의할 수 있는 메서드('재정의 가능'이란 public/protected 중 final이 아닌 모든 메서드)들을 내부적으로 어떻게 이용하는지 문서로 남겨야 함
  - 예를들어 API로 공개된 메서드에서 self의 다른 메서드를 호출할 수 있는데, 공개 메서드가 재정의 가능하다면 그 사실을 API 설명에 적시해야 함
  - 어떤 순서로 호출하는지, 각각의 호출 결과가 이어지는 처리에 어떤 영향을 주는지도 담아야 함

- @implSpec

  - javadoc에서 보통 'Implementation Requirements'로 시작하는 절

  - @impleSpec 태그는 자바 8에서 처음 도입되어 자바 9부터 본격적으로 사용되기 시작

  - 예시

    ```java
    /**
     * {@inheritDoc}
     *
     * @implSpec
     * This implementation iterates over the collection looking for the
     * specified element.  If it finds the element, it removes the element
     * from the collection using the iterator's remove method.
     *
     * <p>Note that this implementation throws an
     * {@code UnsupportedOperationException} if the iterator returned by this
     * collection's iterator method does not implement the {@code remove}
     * method and this collection contains the specified object.
     *
     * @throws UnsupportedOperationException {@inheritDoc}
     * @throws ClassCastException            {@inheritDoc}
     * @throws NullPointerException          {@inheritDoc}
     */
    public boolean remove(Object o) {
      // ...
    }
    ```

    - iterator의 remove() 메서드를 이용하므로 iterator 메서드를 재정의하면 동작에 영향이 있음을 알 수 있음
    - '좋은 API 문서란 '어떻게'가 아닌 '무엇'을 하는지 설명해야 한다'는 격언과 일치하지는 않는데, 상속이 캡슐화를 해치기 때문에 일어나는 안타까운 현실
    - 즉 클래스를 안전하게 상속할 수 있도록 하려면 내부 구현 방식을 설명해야 함

- 효율적인 하위 클래스를 어려움 없이 만들게 하려면 클래스 내부 동작 과정 중간에 끼어들 수 있는 훅(hook)을 잘 선별하여 protected 메서드 형태로 공개해야 할 수도 있음

  ```java
  package java.util.AbstractList;
  
  /**
   * ...
   * This method is called by the clear operation on this list and its subLists. Overriding this method to take advantage of the internals of the list implementation can substantially improve the performance of the clear operation on this list and its subLists.
   */
  protected void removeRange(int fromIndex, int toIndex) { //... }
  ```

  - List 구현체 최종 사용자는 removeRange 메서드에 관심이 없음에도 protected로 제공하는 이유는, 단지 하위 클래스에서 부분리스트의 clear 메서드를 고성능으로 만들기 쉽게 하기 위해서임
  - removeRange 메서드가 없다면 하위 클래스에서 clear 메서드를 호출하면 (제거할 원소 수의) 제곱에 비례해 성능이 느려지거나 부분리스트의 메커니즘을 밑바닥부터 새로 구현해야 했을 것

- 상속용 클래스를 설계할 때 어떤 메서드를 protected로 노출해야 하는가?
  - 안타깝게도 마법은 없음..
  - 심사숙고해서 잘 예측해서 실제 하위 클래스를 만들어 시험해보는 것이 최선
  - protected 메서드 하나하나가 내부 구현에 해당하므로 그 수는 가능한 적어야 하지만, 너무 적게 노출해 상속으로 얻는 이점마저 없애선 안됨
  - 경험상 이 검증은 하위 클래스 3개 정도가 적당하고, 하나 이상은 제 3자가 작성해봐야 함

<br>

##### 상속 허용 클래스의 제약 사항

- 상속용 클래스의 생성자는 직간접적으로 재정의 가능 메서드를 호출해선 안됨
  - 상위 클래스의 생성자가 하위 클래스의 생성자보다 먼저 실행되므로 하위 클래스에서 재정의한 메서드가 하위 클래스의 생성자보다 먼저 호출됨
  - 이 때 재정의한 메서드가 하위 클래스의 생성자에서 초기화하는 값에 의존한다면 의도대로 동작하지 않음
- Cloneable, Serializable 인터페이스는 상속용 설계의 어려움을 더함
  - 둘 중 하나라도 구현한 클래스를 상속할 수 있게 설계하는 것은 일반적으로 좋지 않은 생각. 그 클래스를 확장하려는 프로그래머에게 엄청난 부담을 지우기 때문
  - clone(), readObject() 메서드는 생성자와 비슷한 효과를 냄(새로운 객체 생성)
    - 따라서 상속용 클래스에서 Cloneable, Serializable 구현할지 정해야 한다면, 이들을 구현할 때 따르는 제약도 생성자와 비슷하다는 점에 주의해야 함
    - 즉, clone(), readObject() 모두 직간접적으로 재정의 가능 메서드를 호출해선 안됨
    - clone()은 복제본의 상태를 수정하기 전에 재정의 메서드를 호출하고, readObject()는 하위 클래스의 상태가 미처 다 역직렬화되기 전에 재정의 메서드부터 호출

##### 정리

- 상속용으로 설계하지 않은 클래스는 상속을 금지하라
- 상속을 금지하는 두가지 방법
  - 클래스 final 선언
  - 모든 생성자를 private or package-private 선언하고 public static factory method를 만듦
- 예외
  - 핵심 기능 정의한 인터페이스가 있고, 클래스가 해당 인터페이스를 구현했다면 상속 금지해도 어려움 없음
  - 하지만 구체 클래스가 표준 인터페이스를 구현하지 않았는데 상속을 금지하면 사용이 불편해짐
    - 이런 클래스라도 상속을 꼭 허용해야 한다면 클래스 내부에서는 재정의 가능 메서드를 사용하지 않게 만들고 이 사실을 문서로 남기면 좋음(즉, 재정의 가능 메서드를 호출하는 자기 사용 코드를 완벽히 제거하라는 뜻. 메서드 재정의해도 다른 메서드의 동작에 아무런 영향을 주지 않으므로)
    - 클래스 동작 유지하면서 재정의 가능 메서드를 사용하는 코드를 제거하는 기계적인 방법으로는, 각 재정의 가능 메서드는 private '도우미 메서드'로 옮기고, 재정의 가능 메서드를 호출하는 다른 코드들이 모두 이 도우미 메서드를 직접 호출하도록 수정하라

<br>

## ITEM 20. 추상 클래스보다는 인터페이스를 우선하라

##### 인터페이스와 추상클래스

- 공통점
  - 자바가 제공하는 다중 구현 메커니즘
  - 자바 8부터 인터페이스도 default method를 제공할 수 있게 되어, 이 두 메커니즘 모두 인스턴스 메서드를 구현 형태로 제공할 수 있음
- 차이점
  - 추상클래스가 정의한 타입을 구현하는 클래스는 반드시 추상 클래스의 하위 클래스가 되어야 함(자바는 단일 상속만 지원하므로 추상클래스 방식은 새로운 타입을 정의하는 데 커다란 제약을 안음)
  - 인터페이스는 선언 메서드를 모두 overridng 하고 그 일반 규약을 잘 지킨 클래스라면 다른 어떤 클래스를 상속했든 같은 타입으로 취급

<br>

##### 인터페이스의 장점

- 기존 클래스에도 손쉽게 새로운 인터페이스 구현 가능

  - 추상클래스는 기존 클래스 위에 새로운 추상 클래스 끼워넣기 어려운 것이 일반적
  - 두 클래스가 같은 추상클래스를 extends 하려면 그 추상클래스는 계층구조상 두 클래스의 공통 조상이어야 함(즉, 새로 추가된 추상클래스의 모든 자손이 이를 상속하게 되는 것이 적절치 않음)

- mixin 정의에 안성맞춤

  - mixin이란 클래스가 구현할 수 있는 타입으로, 믹스인을 구현한 클래스에 원래의 '주된 타입' 외에도 특정 선택적 행위를 제공한다고 선언하는 효과를 줌(e.g. Comparable은 자신을 구현한 클래스의 인스턴스들끼리는 순서를 정할 수 있다고 선언하는 것)
  - 대상 타입의 주된 기능에 선택적 기능을 '혼합(mixed in)'한다고 해서 믹스인이라 부름
  - 추상클래스로는 믹스인을 정의할 수 없음. 기존 클래스에 덧씌울 수 없기 때문에(단일 상속)

- 계층구조가 없는 타입 프레임워크를 만들 수 있음

  - 예시

    ```java
    public interface Singer {
        AudioClip sing(Song s);
    }
    
    public interface Songwriter {
        Song compose(int chartPosition);
    }
    
    public interface SingerSongwriter extends Singer, Songwriter {
        AudioClip strum();
        void actSensitive();
    }
    ```

    - 작곡도 하고 노래도 하는 가수가 있다고 한다면, 이 코드처럼 타입을 인터페이스로 정의할 때 Singer와 Songwriter 모두를 구현해도 전혀 문제가 없음
    - 심지어 Singer, Songwriter 모두 확장하고 새로운 메서드도 추가하면 제3의 인터페이스를 정의할 수 있음

  - 같은 구조를 클래스로 만들려면 가능한 조합을 각각의 클래스로 정의한 고도비만 계층구조가 만들어질 것(속성이 n개라면 지원해야 할 조합의 수는 2^n개). 이를 조합 폭발(combinational explosion)이라 부름

- 래퍼 클래스 관용구(아이템 18)와 함께 사용하면 기능을 향상시키는 안전하고 강력한 수단이 됨

  - 래퍼 클래스를 만들기 위해 상속을 사용하는 것보다는 인터페이스를 구현하도록 하는 것이 좋음
  - 타입을 추상클래스로 정의해두면 그 타입에 기능을 추가하는 방법은 상속 뿐
  - 상속해서 만든 클래스는 래퍼 클래스보다 활용도가 떨어지고 깨지기는 더 쉬움

- default method

  - 인터페이스의 메서드 중 구현 방법이 명백한 것이 있으면, 그 구현을 디폴트 메서드로 제공해 프로그래머들의 일감을 덜어줄 수 있음
  - 디폴트 메서드를 제공할 때는 상속하려는 사람을 위한 설명을 @implSpec 자바독 태그를 붙여 문서화해야 함
  - 디폴트 메서드의 제약
    - equals, hashCode 같은 Object 메서드를 디폴트 메서드로 제공해서는 안됨
    - 인스턴스 필드를 가질 수 없음
    - public이 아닌 정적 멤버도 가질 수 없음(private static method 제외)
    - 직접 만들지 않은 인터페이스에는 디폴트 메서드 추가 불가

  - 예시

    ```java
    // java.util.Collection interface
    
    default boolean removeIf(Predicate<? super E> filter) {
        Objects.requireNonNull(filter);
        boolean removed = false;
        final Iterator<E> each = iterator();
        while (each.hasNext()) {
            if (filter.test(each.next())) {
                each.remove();
                removed = true;
            }
        }
        return removed;
    }
    ```

    - @implSpec
      - The default implementation traverses all elements of the collection using its {@link #iterator}.  Each matching element is removed using {@link Iterator#remove()}.  If the collection's iterator does not support removal then an {@code UnsupportedOperationException} will be thrown on the first matching element.

- 인터페이스와 추상 골격 구현(skeletal implementation) 동시 제공

  - 인터페이스와 추상 클래스의 장점을 모두 취할 수 있음

    - 인터페이스로는 타입을 정의하고, 필요하면 디폴트 메서드 몇 개도 함께 제공함

    - 골격 구현 클래스는 나머지 메서드들까지 구현

      \>> 이를 통해 골격 구현을 확장하는 것만으로 이 인터페이스를 구현하는 데 필요한 일이 대부분 완료됨(템플릿 메서드 패턴)

  - 관례상 인터페이스 이름이 Interface 라면 골격 구현 클래스의 이름은 AbstractInterface로 지음

    - AbstractCollection, AbstractSet, AbstractList, AbstractMap 등

      (어쩌면 SkeletonMap, SkeletonSet 등이 더 적절했을지도)

  - 골격 구현 클래스를 잘 설계하면 그 인터페이스로 나름의 구현을 하려는 프로그래머의 일을 상당히 덜어줌

  - 골격 구현 클래스의 우회적 이용

    - 인터페이스를 구현한 클래스에서 해당 골격 구현을 확장한 private 내부 클래스를 정의하고, 각 메서드 호출을 내부 클래스의 인스턴스에 전달
    - wrapper class와 비슷한 방식으로 `simulated multiple inheritance`라 함

  - 예시1

    ```java
    static List<Integer> intArrayAsList(int[] a) {
        Objects.requireNonNull(a);
        
        return new AbstractList<>() {
    
            @Override 
            public Integer get(int i) {
                return a[i];
            }
            
            @Override
            public Integer set(int i, Integer val) {
                int oldVal = a[i];
                a[i] = val;
                return oldVal;
            }
            
            @Override
            public int size() {
                return a.length;
            }
        };
    }
    ```

    - 완벽히 동작하는 List 구현체를 반환하는 정적 팩터리 메서드

      (int 배열을 받아 Integer 인스턴스의 리스트 형태로 보여주는 어댑터이기도 함)

    - AbstractList 추상클래스에 선언된 get() public abstact method 구현

    - AbstractList가 상속하는 AbstractCollection 클래스의 size() public abstract method 구현

    - 골격 구현 클래스는 추상클래스처럼 구현을 도와주는 동시에, 추상클래스로 타입을 정의할 때 따라오는 심각한 제약에서는 자유로움

  - 예시2

    ```java
    public abstract class AbstractMapEntry<K, V> implements Map.Entry<K, V> {
    
        // 변경 가능한 엔트리는 이 메서드를 반드시 재정의해야 한다.
        @Override
        public V setValue(V value) {
            throw new UnsupportedOperationException();
        }
    
        // Map.Entry.equals의 일반 규약을 구현한다.
    
        @Override
        public boolean equals(Object o) {
            if (o == this)
                return true;
            if (!(o instanceof Map.Entry))
                return false;
            Map.Entry<?,?> e = (Map.Entry) o;
            return Objects.equals(e.getKey(), getKey())
                    && Objects.equals(e.getValue(), getValue());
        }
    
        // Map.Entry.hashCode의 일반 규약을 구현한다.
        @Override
        public int hashCode() {
            return Objects.hashCode(getKey()) ^ Objects.hashCode(getValue());
        }
    
        @Override
        public String toString() {
            return getKey() + "=" + getValue();
        }
    }
    ```

    - Map.Entry 인터페이스나 그 하위 인터페이스로는 이 골격 구현을 제공할 수 없음. 디폴트 메서드는 equals, hashCode, toString 같은 Object 메서드를 재정의할 수 없기 때문
    - 골격 구현은 기본적으로 상속해서 사용하는 것을 가정하므로 설계 및 문서화 지침을 모두 따라야 함

  - 단순 구현(simple implementation)은 골격 구현의 작은 변종

    - 단순 구현도 골격 구현과 같이 상속을 위해 인터페이스를 구현한 것이지만, 추상클래스가 아니란 점이 다름

    - 동작하는 가장 단순한 구현으로, 이러한 단순 구현은 그대로 써도 되고 필요에 맞게 확장해도 됨

    - 예시

      ```java
      public abstract class AbstractMap<K,V> implements Map<K,V> {
      
          public static class SimpleImmutableEntry<K,V>
                  implements Map.Entry<K,V>, java.io.Serializable
          {
              private static final long serialVersionUID = 7138329143949025153L;
      
              private final K key;
              private final V value;
      
              public SimpleImmutableEntry(K key, V value) {
                  this.key   = key;
                  this.value = value;
              }
      
              public SimpleImmutableEntry(Map.Entry<? extends K, ? extends V> entry) {
                  this.key   = entry.getKey();
                  this.value = entry.getValue();
              }
      
              public K getKey() {
                  return key;
              }
      
              public V getValue() {
                  return value;
              }
      
              public V setValue(V value) {
                  throw new UnsupportedOperationException();
              }
              
              public boolean equals(Object o) {
                  if (!(o instanceof Map.Entry))
                      return false;
                  Map.Entry<?,?> e = (Map.Entry<?,?>)o;
                  return eq(key, e.getKey()) && eq(value, e.getValue());
              }
      
              public int hashCode() {
                  return (key   == null ? 0 :   key.hashCode()) ^
                          (value == null ? 0 : value.hashCode());
              }
      
              public String toString() {
                  return key + "=" + value;
              }
          }
      }
      ```

      - AbstractMap 추상클래스의 static class
      - getKey(), getValue(), setValue(), equals(), hashCode(), toString() 구현

<br>

## ITEM 21. 인터페이스는 구현하는 쪽을 생각해 설계하라

##### default method in interface. since jdk 1.8

- 디폴트 메서드 선언 시 구체 클래스에서 overriding 없이 사용할 수 있게 되었지만 모든 구현체와 매끄럽게 연동되리라는 보장은 없음

- 생각할 수 있는 모든 상황에서 불변식을 해치지 않는 디폴트 메서드를 작성하기는 어려움

  - 예시(interface Collection, `removeIf` method since jdk 1.8)

    ```java
    default boolean removeIf(Predicate<? super E> filter) {
        Objects.requireNonNull(filter);
        boolean result = false;
        for (Iterator<E> it = iterator(); it.hasNext()) {
            if (filter.test(it.next())) {
                it.remove();
                result = true;
            }
        }
    }
    ```

    - default 메서드를 범용적으로 구현하였다고 해서 모든 Collection 구현체와 잘 어우러지는 것은 아님
    - org.apache.commons.collections4.collection.SynchronizedCollection
      - 해당 컬렉션에서 removeIf를 재정의하고 있지 않아 동기화해주지 못하는 현상이 발생

- 자바 플랫폼 라이브러리에서는 이런 문제를 예방하기 위해 일련의 조치를 취함

  - 구현한 인터페이스의 디폴트 메서드를 재정의하고, 다른 메서드에서는 디폴트 메서드를 호출하기 전에 필요한 작업을 수행하도록 함
  - 예컨데 Collections.synchronizedCollection이 반환하는 package-private 클래스들은 removeIf를 재정의하고, 이를 호출하는 다른 메서드들은 디폴트 구현을 호출하기 전에 동기화하도록 함

- 디폴트 메서드는 (컴파일에 성공하더라도) 기존 구현체에 런타임 오류를 일으킬 수 있음

- 기존 인터페이스에 디폴트 메서드로 새 메서드를 추가하는 일은 꼭 필요한 경우가 아니라면 피해야 함. 추가하려는 디폴트 메서드가 기존 구현체들과 충돌하지 않을지 심사숙고해야 함

- 새로운 인터페이스를 만드는 경우라면 표준적인 메서드 구현을 제공하는 데 아주 유용하며, 그 인터페이스를 더 쉽게 구현해 활용할 수 있게끔 해줌(아이템 20)

- 결론적으로 인터페이스를 설계할 때는 여전히 세심한 주의를 기울여야 함

  - 새로운 인터페이스라면 릴리스 전에 반드시 테스트를 거쳐야 함
  - 서로다른 방식으로 최소한 세가지는 구현해봐야 함
  - 인터페이스를 다양한 작업에 활용하는 클라이언트도 여러 개 만들어봐야 함

<br>

## ITEM 22. 인터페이스는 타입을 정의하는 용도로만 사용하라

> 인터페이스는 자신을 구현한 클래스의 인스턴스를 참조할 수 있는 타입 역할을 함
>
> 달리 말해 클래스가 어떤 인터페이스를 구현한다는 것은 자신의 인스턴스로 무엇을 할 수 있는지를 클라이언트에 얘기해주는 것
>
> 인터페이스는 오직 이 용도로만 사용해야 함

##### 상수 인터페이스

```java
static final double AVOGADROS_NUMBER = 6.022_140_857e23;
static final double BOLTZMANN_CONSTANT = 1.380_648_52e-23;
// ...
```

- 메서드 없이 상수를 뜻하는 static final 필드로만 구성된 인터페이스
- 상수 인터페이스 안티패턴은 인터페이스를 잘못 사용한 예
- 클래스 내부에서 사용하는 상수는 외부 인터페이스가 아니라 내부 구현에 해당하므로, 상수 인터페이스를 구현하는 것은 이 내부 구현을 클래스의 API로 노출하는 행위
- 클래스가 어떤 상수 인터페이스를 사용하든 사용자에게는 아무런 의미가 없고 클라이언트가 내부 구현에 해당하는 이 상수들에 종속되게 함

##### 상수 유틸리티 클래스

```java
public class PhysicalConstants {
    private PhysicalConstants() {}

    public static final double AVOGADROS_NUMBER = 6.022_140_857e23;
    public static final double BOLTZMANN_CONSTANT = 1.380_648_52e-23;
}
```

- 특정 클래스나 인터페이스와 강하게 연관된 상수라면 그 클래스나 인터페이스 자체에 추가해야 함
- 모든 숫자 기본 타입의 박싱 클래스가 대표적으로, Integer/Double에 선언된 MAX_VALUE, MIN_VALUE가 좋은 예
- 열거 타입으로 나타내기 적합한 상수라면 열거 타입으로 만들어 공개하면 됨
- 그것도 아니면 인스턴스화할 수 없는 유틸리티 클래스에 담아 공개

[위로](#클래스와-인터페이스)


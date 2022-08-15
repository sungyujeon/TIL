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
  - 새로운 클래스를 설계할 때 public 생성자 대신 정적 팩터리를 만들어두면, 클라이언트를 수정하지 ㅇ낳고도 필요에 따라 캐시 기능을 나중에 덧붙일 수 있음

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




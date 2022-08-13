# 모든 객체의 공통 메서드

- Object 클래스는 모든 클래스에서 상속하도록 설계됨

- Object에서 final이 아닌 메서드(equals, hashCode, toString, clone, finalize)는 모두 재정의(overriding)를 염두에 두고 설계되어서 재정의 시 지켜야 하는 일반 규약이 명확히 정의되어 있음

- 따라서 모든 클래스는 이 메서드들을 일반 규약에 맞게 재정의해야 함

- 해당 메서드를 잘못 구현하면 대상 클래스가 이 규약을 준수한다고 가정하는 클래스(HashMap, HashSet 등)를 오동작하게 만들 수 있음

> [ITEM 10. equals는 일반 규약을 지켜 재정의하라](#ITEM-10.-equals는-일반-규약을-지켜-재정의하라)
>
> [ITEM 11. equals를 재정의하려거든 hashCode도 재정의하라](#ITEM-11.-equals를-재정의하려거든-hashCode도-재정의하라)
>
> [ITEM 12. toString을 항상 재정의하라](#ITEM-12.-toString을-항상-재정의하라)
>
> [ITEM 13. clone 재정의는 주의해서 진행하라](#ITEM-13.-clone-재정의는-주의해서-진행하라)
>
> [ITEM 14. Comparable을 구현할지 고려하라](#ITEM-14.-Comparable을-구현할지-고려하라)

<br>

## ITEM 10. equals는 일반 규약을 지켜 재정의하라

### equals를 재정의 하지 않는 경우

- equals() 메서드 이슈를 회피하는 가장 좋은 방법은 아예 재정의하지 않는 것

- 아래 4가지 상황에 해당하진다면 재정의하지 않는 것이 좋음

  - 각 인스턴스가 본질적으로 고유하다
    - 값을 표현하는 것이 아니라 동작하는 개체를 표현하는 클래스
    - Thread가 좋은 예로, Object의 equals 메서드는 이러한 클래스에 딱 맞게 구현되어 있음
  - 인스턴스의 '논리적 동치성(logical equality)'을 검사할 일이 없다
  - 상위 클래스에서 재정의한 equals가 하위 클래스에도 딱 들어맞는다
    - Set/List/Map 구현체는 AbstractSet/AbstractList/AbstractMap 을 상속받아 그대로 씀
  - 클래스가 private이거나 package-private이고 equals 메서드를 호출할 일이 없다

- 재정의를 막고 싶다면 아래와 같이 호출을 금지하라

  ```java
  @Override
  public boolean equals(Object o) {
      throw new AssertionError();  // 호출 금지
  }
  ```

<br>

### equals를 재정의해야 하는 경우

- 객체 식별성(object identity; 두 객체가 물리적으로 같은가)이 아니라 논리적 동치성을 확인해야 하는데, 상위 클래스의 equals가 논리적 동치성을 비교하도록 재정의되지 않았을 때
- 주로 값 클래스(Integer, String 처럼 값을 표현하는 클래스)들이 해당됨
  - 객체가 같은지가 아니라 값이 같은지를 알고 싶어 할 것
  - 다만 값 클래스라 해도 값이 같은 인스턴스가 둘 이상 만들어지지 않음을 보장하는 인스턴스 통제 클래스는 equals 재정의하지 않아도 됨(e.g. enum). 이런 클래스는 어차피 논리적으로 같은 인스턴스가 2개 이상 만들어지지 않음

<br>

### equals 메서드 일반 규약

> Object API 명세
>
> ```java
> public boolean equals(Object obj) {
>     return (this == obj);
> }
> ```
>
> Indicates whether some other object is "equal to" this one.
> The equals method implements an equivalence relation on non-null object references:
>
> - It is reflexive: for any non-null reference value x, x.equals(x) should return true.
> - It is symmetric: for any non-null reference values x and y, x.equals(y) should return true if and only if y.equals(x) returns true.
> - It is transitive: for any non-null reference values x, y, and z, if x.equals(y) returns true and y.equals(z) returns true, then x.equals(z) should return true.
> - It is consistent: for any non-null reference values x and y, multiple invocations of x.equals(y) consistently return true or consistently return false, provided no information used in equals comparisons on the objects is modified.
> - For any non-null reference value x, x.equals(null) should return false.
>
> The equals method for class Object implements the most discriminating possible equivalence relation on objects; that is, for any non-null reference values x and y, this method returns true if and only if x and y refer to the same object (x == y has the value true).
> Note that it is generally necessary to override the hashCode method whenever this method is overridden, so as to maintain the general contract for the hashCode method, which states that equal objects must have equal hash codes.

##### 반사성(reflexivity)

>  null이 아닌 모든 참조 값 x에 대해 x.equals(x)는 true

- 객체는 자기 자신과 같아야 함

<br>

##### 대칭성(symmetry)

> null이 아닌 모든 참조 값 x, y에 대해 x.equals(y)가 true면 y.equals(x)도 true

- 두 객체는 서로에 대한 동치 여부에 똑같이 답해야 함

- 예시

  ```java
  // 대칭성 위배
  @Override
  public boolean equals(Object obj) {
      if (obj instanceof CaseInsensitiveString) {
          return s.equalsIgnoreCase((CaseInsensitiveString) o), s);
      }
      
      if (obj instanceof String) {
          return s.equalsIgnoreCase((String) obj);
      }
      
      return false;
  }
  
  CaseInsensitiveString cis = new CaseInsensitiveString("Polish");
  String s = "polish";
  
  // 해결하기 위해서는 CaseInsensitiveString의 equals를 String과도 연동하겠다는 허황된 꿈을 버려야 함
  @Override
  public boolean equals(Object o) {
      return o instanceof CaseInsensitiveString &&
             ((CaseInsensitiveString) o).s.equalsIgnoreCase(s);
  }
  ```

  - cis.equals(s)는 true 반환
  - s.equals(cis)는 false 반환
  - cis는 String을 알지만, String은 cis를 모르기 때문

<br>

##### 추이성(transitivity)

> null이 아닌 모든 참조 값 x, y, z에 대해 x.equals(y)가 true이고 y.equals(z)도 true면 x.equals(z)도 true

- 첫번째와 두번째 객체가 같고 두번째 객체와 세번째 객체가 같다면, 첫번째와 세번째 객체도 같아야 함

- 예시(상위 클래스에는 없는 새로운 필드를 하위 클래스에 추가하는 상황)

  ```java
  // bad
  public class Point {
      private final int x;
      private final int y;
  
      public Point(int x, int y) {
          this.x = x;
          this.y = y;
      }
  
      @Override
      public boolean equals(Object obj) {
          if (!(obj instanceof Point)) {
              return false;
          }
  
          Point p = (Point)obj;
          return p.x == x && p.y == y;
      }
  }
  
  public class ColorPoint extends Point {
      private final Color color;
  
      public ColorPoint(int x, int y, Color color) {
          super(x, y);
          this.color = color;
      }
      
      @Override
      public boolean equals(Object obj) {
          if (!(obj instanceof Point)) {
              return false;
          }
          
          if (!(obj instanceof ColorPoint)) {
              return obj.equals(this);
          }
          
          return super.equals(obj) && ((ColorPoint) obj).color == color;
      }
  }
  ```

  - ColorPoint의 equals 오버라이드 없이 상속 받으면 일반 규약은 지켜지지만, color 비교라는 중요한 정보가 누락됨

  - 그렇다고 color 정보를 포함하여 equals를 오버라이딩하면 추이성이 지켜지지 않음

    ```java
    ColorPoint p1 = new ColorPoint(1, 2, Color.RED);
    Point p2 = new Point(1, 2);
    ColorPoint p3 = new ColorPoint(1, 2, Color.BLUE);
    ```

    - p1.equals(p2) == true
    - p2.equals(p3) == true
    - p1.equals(p1) == false >> 추이성 위반

  - 문제는, 구체 클래스를 확장해 새로운 값을 추가하면서 equals 규약을 만족시킬 방법은 존재하지 않음

    - getClass를 통해 같은 구현 클래스의 객체와만 비교하면 된다고 생각할 수 있지만 이는 리스코프치환 원칙 위배

      ```java
      // 리스코프 치환 원칙 위배
      @Override
      public void boolean equals(Object o) {
          if (o == null || o.getClass() != getClass())
            return false;
          Point p = (Point) o;
          return p.x == x && p.y == y; 
      }
      ```

      - 리스코프 치환 원칙에 따르면 어떤 타입에 있어 중요한 속성이라면 그 하위 타입에서도 마찬가지로 중요함. 따라서 그 타입의 모든 메서드가 하위 타입에서도 똑같이 잘 작동해야 함
      - 즉, Point의 하위 클래스는 정의상 여전히 Point이므로 어디서든 Point로써 활용될 수 있어야 함
      - 하지만 구체 클래스끼리만 equals를 비교하게 하면 이 원칙을 위배하는 것

- 예시2(구체 클래스의 하위 클래스에서 값을 추가하는 우회 방법)

  - 상속 대신 컴포지션을 사용

    ```java
    class ColorPoint {
        private final Point point;
        private final Color color;
    
        public ColorPoint(int x, int y, Color color) {
            this.point = new Point(x, y);
            this.color = Objects.requireNonNull(color);
        }
        
        public Point asPoint() {
            return point;
        }
    
        @Override
        public boolean equals(Object obj) {
            if (!(obj instanceof ColorPoint))
                return false;
            ColorPoint cp = (ColorPoint) obj;
            return cp.point.equals(point) && cp.color.equals(color);
        }
    }
    ```

<br>

##### 일관성(consistency)

> null이 아닌 모든 참조 값 x, y에 대해 x.equals(y)를 반복해서 호출하면 항상 true/false 일관적으로 반환

- 두 객체가 같다면 앞으로도 영원히 같아야 함
- 가변 객체는 비교 시점에 따라 서로 다를 수도 같을 수도 있지만, 불변 객체는 한번 다르면 끝까지 달라야 하므로, 클래스를 작성 시 불변 클래스로 만드는 것이 나을지 고려하라
- 클래스가 불변이든 가변이든 equals의 판단에 신뢰할 수 없는 자원이 끼어들게 해서는 안됨
  - java.net.URL의 equals는 주어진 URL과 매핑된 호스트의 IP 주소를 이용해 비교하는데, 네트워크를 통해야 하므로 항상 같다고 보장할 수 없어서 문제
  - 이를 피하려면 항시 메모리에 존재하는 객체만을 사용한 결정적(deterministic) 계산만 수행해야 함

<br>

##### non-null

> null이 아닌 모든 참조 값 x에 대해 x.equals(null)은 false

- 모든 객체가 null과 같지 않아야 함

- 흔히 NullPointerException을 던지지만, 일반 규약은 이런 경우도 허용하지 않음

  ```java
  // bad >> null 검사는 불필요
  @Override
  public boolean equals(Object o) {
      if (o == null)
          return false;
      //...
  }
  
  // good >> 묵시적 null 검사
  @Override
  public boolean equals(Object o) {
      if (!(o instanceof MyType))
          return false;
      MyType mt = (MyType) o;
      //...
  }
  ```

  - instanceof 검사를 하면 해당 단계에서 null 일 때 false 반환하게 되어 묵시적 검사를 하게 됨

<br>

### 정리 - equals 메서드 구현 방법의 단계

- == 연산자를 사용해 입력이 자기 자신의 참조인지 확인
  - 단순 성능 최적화용으로, 비교 작업이 복잡한 상황일 때 좋음
- instanceof 연산자로 입력이 올바른 타입인지 확인
- 입력을 올바른 타입으로 형변환
- 입력 객체와 자기 자신의 대응되는 '핵심' 필드들이 모두 일치하는지 모두 검사

- 예시

  ```java
  @Override
  public boolean equals(Object obj) {
      if (o == this)  // == 연산 비교
          return true;
      if (!(o instanceof MyType))  // instanceof 검사
          return false;
      
      MyType mt = (MyType) o;  // 형변환
      return mt.value1 == value1 && mt.value2 == value2... // 모든 필드 검사
  }
  ```

  

<br>

### 참고사항

- float과 double을 제외한 기본 타입필드는 == 연산자로 비교하고, 참조 타입 필드는 equals로 비교하는데 float, double은 각각 정적 메서드인 Float.compare(float, float)과 Double.compare(double, double)로 비교
  - Float.NaN, -0.0f, 특수한 부동소수 값 등을 다뤄야 하기 때문
  - 이 메서드들은 오토박싱을 수반할 수 있으니 성능상 좋지 않음
- 때로는 null도 정상 값으로 취급하는 참조 타입 필드도 있는데, 이런 필드는 정적 메서드인 Objects.equals(obj, obj)로 비교해서 NullPointerException 발생을 예방
- CaseSensitiveString 예시처럼 비교가 복잡한 필드를 가진 클래스는 그 필드의 표준형(canonical form)을 저장해둔 후 표준형끼리 비교하면 훨씬 경제적. 특히 불변 클래스에 제격인데, 가변 객체라면 값이 바뀔 때마다 표준형을 최신 상태로 갱신해야 함
- 어떤 필드를 먼저 비교하느냐가 equals 성능을 좌우하기도 함
  - 다를 가능성이 더 크거나 비교하는 비용이 싼 필드를 먼저 비교

- equals를 재정의할 땐 hashCode도 재정의하라(아이템 11)
- 너무 복잡하게 해결하려 들지 마라
  - 보통은 필드들의 동치성만 검사해도 equals 규약을 어렵지 않게 지킬 수 있음
- Object 외 타입을 매개변수로 받는 equals 메서드는 선언하지 마라

<br>

## ITEM 11. equals를 재정의하려거든 hashCode도 재정의하라

> - equals를 재정의한 클래스 모두에서 hashCode도 재정의해야 함. 그렇지 않으면 hashCode 일반 규약을 어기게 되어 해당 클래스의 인스턴스를 HashMap이나 HashSet 같은 컬렉션의 원소로 사용할 때 문제를 일으킴
> - Object 명세
>   - equals 비교에 사용되는 정보가 변경되지 않았다면, 애플리케이션이 실행되는 동안 그 객체의 hashCode 메서드는 몇 번을 호출해도 일관되게 항상 같은 값을 반환해야 한다. 단, 애플리케이션을 다시 실행한다면 이 값이 달려져도 상관없다.
>   - equals(Object)가 두 객체가 같다고 판단했다면, 두 객체의 hashCode는 똑같은 값을 반환해야 한다.
>   - equals(Object)가 두 객체를 다르다고 판단했더라도, 두 객체의 hashCode가 서로 다른 값을 반환할 필요는 없다. 단, 다른 객체에 대해서는 다른 값을 반환해야 해시테이블의 성능이 좋아진다.

##### 좋은 hashCode 작성 요령

1. int 변수 result를 선언한 후 값 c로 초기화. 이 때 c는 해당 객체의 첫번째 핵심필드를 단계 2.a 방식으로 계산한 해시코드다(여기서 핵심 필드란 equals 비교에 사용되는 필드)

2. 해당 객체의 나머지 핵심 필드 f 각각에 대해 다음 작업을 수행

   a. 해당 필드의 해시코드 c를 계산

   - 기본 타입 필드라면, Type.hashCode(f)를 수행한다. 여기서 Type은 해당 기본 타입의 박싱 클래스
   - 참조 타입 필드면서 이 클래스의 equals 메서드가 이 필드의 equals를 재귀적으로 호출해 비교한다면, 이 필드의 hashCode를 재귀적으로 호출한다. 계산이 더 복잡해질 것 같으면, 이 필드의 표준형(canonical representation)을 만들어 그 표준형의 hashCode를 호출한다. 필드의 값이 null이면 0을 사용한다(다른 상수도 괜찮지만 전통적으로 0을 사용)
   - 필드가 배열이라면, 핵심 원소 각각을 별도 필드처럼 다룬다. 이상의 규칙을 재귀적으로 적용해 각 핵심 원소의 해시코드를 계산한 다음, 단계 2.b 방식으로 갱신한다. 배열에 핵심 원소가 하나도 없다면 단순히 상수(0을 추천한다)를 사용한다. 모든 원소가 핵심원소라면 Arrays,hashCode를 사용한다.

   b. 단계 2.a 에서 계산한 해시코드 c로 result를 갱신한다.

   - `result = 31 * result + c;`

3. result를 반환한다.

<br>

##### HashCode

- 파생 필드는 해시코드 계산에서 제외해도 됨. 다른 필드로부터 계산해낼 수 있는 필드는 무시해도 되고, equals 비교에 사용되지 않은 필드는 '반드시' 제외해야 함. 그렇지 않으면 해시코드 규약 두번째를 어기게 됨
- 단계 2.b 곱셈 31 * result 는 필드를 곱하는 순서에 따라 result 값이 달라지게 함. 그 결과 클래스에 비슷한 필드가 여러개일 때 해시효과를 크게 높여줌.

- Object 클래스는 임의의 개수만큼 객체를 받아 해시코드를 계산해주는 정적 메서드인 hash 제공

  ```java
  @Override
  public int hashCode() {
    return Objects.hash(lineNum, prefix, areaCode);
  }
  ```

  - 해당 메서드는 느리므로 성능에 민감하지 않은 상황에서만 사용해야 함
  - 입력 인수를 담기 위한 배열이 만들어지고, 입력 중 기본 타입이 있다면 박싱 언박싱도 거쳐야 하기 때문

- 성능을 높인다고 해시코드를 계산할 때 핵심 필드를 생략해서는 안됨

- hashCode가 반환하는 값의 생성 규칙을 API 사용자에게 자세히 공표하지 말아야 함. 그래야 클라이언트가 이 값에 의지하지 않게 되고, 추후에 계산 방식을 바꿀 수도 있음

<br>

<br>

## ITEM 12. toString을 항상 재정의하라

>  toString 메서드는 단순히 `class_name@16진수hashcode`를 반환할 뿐
>
> toString 일반 규약에 따르면 
>
> - '간결하면서 사람이 읽기 쉬운 형태의 유익한 정보'를 반환해야 함
>
>   ```java
>   The result should be a concise but informative representation that is easy for a person to read.
>   ```
>
> - 모든 하위 클래스에서 이 메서드를 재정의하라
>
>   ```txt
>   It is recommended that all subclasses override this method.
>   ```

- toString을 잘 구현한 클래스를 사용하는 시스템은 디버깅하기 쉬움

  ```java
  System.out.println(phoneNumber + "에 연결할 수 없습니다.")
  ```

  - toString을 재정의하면 위 코드만으로 문제를 진단하기에 충분한 메시지를 남길 수 있음

- 실전에서 toString은 그 객체가 가진 주요 정보를 모두 반환하는게 좋음

- toString을 구현할 때 반환값의 포맷을 문서화할지 정해야 함

  - 포맷을 명시하기로 했다면, 명시한 포맷에 맞는 문자열과 객체를 상호 전환할 수 있는 정적 팩터리나 생성자를 함께 제공해주면 좋음
  - BigInteger, BigDecimal과 대부분의 기본 타입 클래스가 여기 해당함
  - 단점은, 한 번 포맷을 명시하면 평생 그 포맷에 얽매이게 됨

- 포맷을 명시하든 아니든 의도를 명확히 밝혀야 함

  - 포맷 사용

    ```java
    /**
     * 이 전화번호의 문자열 표현을 반환한다.
     * 이 문자열은 "XXX-YYY-ZZZZ" 형태의 12글자로 구성된다.
     * XXX는 지역 코드, YYY는 프리픽스, ZZZZ는 가입자 번호다.
     * 각각의 대문자는 10진수 숫자 하나를 나타낸다.
     * 
     * 전화번호의 각 부분의 값이 너무 작아서 자릿수를 채울 수 없다면,
     * 앞에서부터 0으로 채워나간다. 예컨대 가입자 번호가 123이라면
     * 전화번호의 마지막 네 문자는 "0123"이 된다.
     */
    @Override
    public String toString() {
        return String.format("%03d-%03d-%04d", areaCode, prefix, lineNum);
    }
    ```

  - 포맷 미사용

    ```java
    /**
     * 이 약물에 대한 대략적인 설명을 반환한다.
     * 다음은 이 설명의 일반적인 형태이나,
     * 상세 형식은 정해지지 않았으며 향후 변경될 수 있다.
     * 
     * "[약물 #9: 유형=사랑, 냄새=테레빈유, 겉모습=먹물]"
     */
    @Override
    public String toString() {}
    ```

- 포맷 명시 여부와 상관없이 toString이 반환한 값에 포함된 정보를 얻어올 수 있는 API를 제공하라

  - 반환 정보를 위한 접근자를 제공하지 않으면, 해당 정보가 필요한 클라이언트는 toString 반환값을 파싱해야 함. 성능이 나빠지고 필요하지도 않은 작업임
  - 또한 향후 포맷을 바꾸면 시스템이 망가지는 결과 초래 가능

- 정적 유틸리티 클래스, 대부분의 열거타입은 toString을 제공할 이유가 없음

  - 이미 완벽한 toString을 제공하니 따로 재정의하지 않아도 됨
  - 하지만 하위 클래스들이 공유해야 할 문자열 표현이 있는 추상 클래스라면 toString을 재정의해야 함
    - 대다수의 컬렉션 구현체는 추상 컬렉션 클래스들의 toString 메서드를 상속해 사용함


<br>

<br>

## ITEM 13. clone 재정의는 주의해서 진행하라

>Cloneable은 복제해도 되는 클래스임을 명시하는 용도의 mixin interface(아이템20)임
>
>- 하지만 문제는 clone 메서드 선언이 Cloneable이 아닌 Object이고, 그마저도 protected
>- 따라서 Cloneable을 구현하는 것만으로는 외부 객체에서 clone 메서드를 호출 보장하지 않음
>- 실무에서는 Cloneable을 구현한 클래스는 clone 메서드를 public으로 제공하며, 사용자는 당연히 복제가 제대로 이뤄지리라 기대

##### 허술한 clone 메서드의 일반 규약

- 객체의 복사본을 생성해 반환한다. '복사'의 정확한 뜻은 그 객체를 구현한 클래스에 따라 다를 수 있다. 일반적인 의도는 다음과 같다. 어떤 객체 x에 대해 다음 식은 참이다.

  - `x.clone != x`
  - `x.clone().getClass() == x.getClass()`

- 하지만 이상의 요구를 반드시 만족해야 하는 것은 아니다. 한편 다음 식도 일반적으로 참이지만, 역시 필수는 아니다. `x.clone().equals(x)`. 관례상, 이 메서드가 반환하는 객체는 super.clone을 호출해 얻어야 한다. 이 클래스와 (Object를 제외한) 모든 상위 클래스가 이 관례를 따른다면 다음 식은 참이다.

  - `x.clone().getClass() == x.getClass()`

- 관례상 반환된 객체와 원본 객체는 독립적이어야 한다. 이를 만족하려면 super.clone으로 얻은 객체의 필드 중 하나 이상을 반환 전에 수정해야 할 수도 있다.

- 일반적으로 이것은 내부 'deep structure'를 구성하는 mutable object을 복사하고 이 객체에 대한 참조를 복사본에 대한 참조로 대체하는 것을 의미한다. 클래스에 기본 필드 또는 immutable에 대한 참조만 포함된 경우 수정할 필요는 없다.

- ```txt
  Creates and returns a copy of this object.  The precise meaning of "copy" may depend on the class of the object. The general intent is that, for any object {@code x}, the expressions:
  - x.clone() != x
  - x.clone().getClass() == x.getClass()
  will be true, but these are not absolute requirements.
  
  While it is typically the case that:
  - x.clone().equals(x)
  will be true, this is not an absolute requirement.
  By convention, the returned object should be obtained by calling super.clone. If a class and all of its superclasses (except Object) obey this convention, it will be the case that
  - x.clone().getClass() == x.getClass().
  
  By convention, the object returned by this method should be independent of this object (which is being cloned).  To achieve this independence, it may be necessary to modify one or more fields of the object returned by {@code super.clone} before returning it.
  
  Typically, this means copying any mutable objects that comprise the internal "deep structure" of the object being cloned and replacing the references to these objects with references to the copies.  If a class contains only primitive fields or references to immutable objects, then it is usually the case that no fields in the object returned by {@code super.clone} need to be modified.
  ```

<br>

##### final 클래스의 clone 재정의

- 클래스가 final 이라면 걱정해야 할 하위 클래스가 없으니 이 관례는 무시해도 안전
- 하지만 final 클래스의 clone 메서드가 super.clone을 호출하지 않는다면 Cloneable을 구현할 이유도 없음. 굳이 Object의 clone 구현의 동작 방식에 기댈 필요가 없기 때문

##### clone 재정의

- 예시1(불변 객체) - 정상 동작

  ```java
  @Override
  public PhoneNumber clone() {
    try {
      return (PhoneNumber) super.clone();
    } catch (CloneNotSupoortedException e) {
      throw new AssertionError();
    }
  }
  ```

  - 이 메서드가 동작하게 하기 위해선 PhoneNumber 클래스 선언에 Cloneable을 구현해야 함
  - Object의 clone 메서드는 Object를 반환하지만 PhoneNumber의 clone 메서드는 PhoneNumber를 반환하게 함. 이는 자바가 covariant return typing을 지원하므로 권장하는 방식. 이 방식으로 클라이언트가 형변환하지 않아도 되게끔 해줌
  - try-catch 블록으로 감싼 이유는 Object의 clone 메서드가 checked exception을 던지기 때문

- 예시2(가변 객체) - 비정상 동작

  ```java
  public class Stack {
      private Object[] elements;
      private int size = 0;
      private static final int DEFAULT_INITIAL_CAPACITY = 16;
      
      //...
  }
  ```

  - clone 메서드가 super.clone의 결과를 그대로 반환하면 기본형 타입인 size 필드는 정상 값이겠지만, elements 필드는 원본 Stack 인스턴스와 똑같은 배열을 참조하므로 비정상적으로 동작할 것

  - clone 메서드는 사실상 생성자와 같은 효과를 냄. 즉, clone은 원본 객체에 아무런 해를 끼치지 않는 동시에 복제된 객체의 불변식을 보장해야 함.

    ```java
    @Override
    public Stack clone() {
        try {
            Stack result = (Stack) super.clone();
            result.elements = elements.clone();
            return result;
        } catch (CloneNotSupportedException e) {
            throw new AssertionError();
        }
    }
    ```

    - 스택 내부 정보를 복사해야 하는데, 참조 타입 객체를 재귀적으로 호출해서 복사하는 것

- 예시3 - HashTable clone

  ```java
  public class HashTable implements Cloneable {
  
      private Entry[] buckets = ...;
      
      private static class Entry {
          final Object key;
          Object value;
          Entry next;
          
          Entry(Object key, Object value, Entry next) {
              this.key = key;
              this.value = value;
              this.next = next;
          }
        
        	// Entry가 가리키는 연결 리스트를 재귀
        또는 반복자로 복사
          Entry deepCopy() {
              //return new Entry(key, value,
              //        next == null ? null : next.deepCopy());
            
            	Entry result = new Entry(key, value, next);
              for (Entry p = result; p.next != null; p = p.next)
                  p.next = new Entry(p.next.key, p.next.value, p.next.next);
              
              return result;
          }
      }
    
    	@Override
  		public HashTable clone() {
        try {
            HashTable result = (HashTable) super.clone();
            result.buckets = new Entry(buckets.length);
            for (int i = 0; i < buckets.length; i++)
                if (buckets[i] != null)
                    result.buckets[i] = buckets[i].deepCopy();
  
            return result;
        } catch (CloneNotSupportedException e) {
            throw new AssertionError();
        }
  		}
  }
  ```

  - Stack 예시와 동일하게 재귀적으로 clone 할 경우 원본과 같은 연결 리스트를 참조해 비정상 동작할 것
  - 복잡한 가변 상태를 갖는 클래스를 재귀할 때는 deepcopy를 지원하도록 보강. 재귀적으로 호출하면 stack overflow가 발생할 수 있으므로 반복자로 순회하는 방향이 더 좋음

##### 주의사항

- 생성자에서는 재정의될 수 있는 메서드를 호출하지 않아야 하는데(아이템19), clone 메서드도 동일

  - 만약 clone이 하위 클래스에서 재정의한 메서드를 호출하면, 하위 클래스는 복제 과정에서 자신의 상태를 교정할 기회를 잃게 되어 원본과 복제본의 상태가 달라질 가능성이 큼
  - 따라서 put(key, value) 메서드는 final 이거나 private 이어야 함
  - Object의 clone 메서드는 CloneNotSupportedException을 던진다고 선언했지만 재정의한 메서드는 그렇지 않음. public인 clone 메서드에서는 throws 절을 없애야 함. checked exception을 던지지 않아야 메서드 사용이 편리하기 때문

- 상속용 클래스는 Cloneable을 구현해서는 안됨

  - Object 방식을 모방해 clone 메서드를 protected로 선언하고, CloneNotSupportedException도 던질 수 있다고 선언할 수도 있음

  - clone을 동작하지 않게 구현해놓고 하위 클래스에서 재정의하지 못하게 할 수도 있음

    ```java
    @Override
    protected final Object clone() throws CloneNotSupportedException {
        throw new CloneNotSupportedException();
    }
    ```

- Cloneable을 구현한 thread-safe class 작성 시에는 clone 메서드 역시 적절히 동기화해야 함

  - Object의 clone 메서드는 동기화를 신경쓰지 않음

##### 복사 생성자와 복사 팩터리

> 정확한 이름은 변환생성자(coversion constructor)와 변환팩터리(conversion factory)
>
> - 원본의 구현 타입에 얽매이지 않고 복제본의 타입을 직접 선택할 수 있으므로
> - 예를 들면 HashSet 객체 s를 TreeSet 타입으로 복제 가능

- 복사 생성자

  ```java
  public Yum(Yum yum) { ... };
  ```

- 복사 팩터리

  ```java
  public static Yum newInstance(Yum yum) { ... };
  ```

- 복사 생성자와 복사 팩터리는 Cloneable/clone 방식보다 나은 면이 많음

  - 언어 모순적이고 위험천만한 객체 생성 메커니즘(생성자 쓰지 않는 방식)을 사용하지 않고, 엉성한 문서화된 규약에 기대지 않고, 정상적인 final 필드 용법과도 충돌하지 않고, 불필요한 검사 예외를 던지지 않고, 형변환도 필요치 않음
  - 해당 클래스가 구현한 interface 타입의 인스턴스를 인수로 받을 수 있음

<br>

<br>

## ITEM 14. Comparable을 구현할지 고려하라

> Comparable을 구현했다는 것은 그 클래스의 인스턴스들에는 자연적인 순서(natural order)가 있음을 뜻함
>
> 알파벳, 숫자, 연대 같이 순서가 명확한 값 클래스를 작성한다면 반드시 Comparable 인터페이스를 구현하라

##### Comparable interface

```java
public interface Comparable<T> {
    public int compareTo(T o);
}
```

- this 객체와 특정 객체의 순서를 비교한다. this 객체가 주어진 객체보다 작으면 음의 정수, 같으면 0, 크면 양의 정수를 반환한다.
- 모든 객체에 대해 전역 동치 관계를 부여하는 equals 메서드와 달리 compareTo는 타입이 다른 객체를 전혀 신경쓰지 않아도 되며, 타입이 다른 객체가 주어지면 간단히 ClassCastException을 던져도 된다.
- 기존 클래스를 확장한 구체 클래스에서 새로운 값 컴포넌트를 추가했다면 compareTo 규약을 지킬 방법이 없다. Comparable을 구현한 클래스를 확장해 값 컴포넌트를 추가하고 싶다면, 확장하는 대신 독립된 클래스를 만들고, 이 클래스에 원래 클래스의 인스턴스를 가리키는 필드를 둔 뒤 내부 인스턴스를 반환하는 메서드를 제공하라. 이렇게 하면 바깥 클래스에 우리가 원하는 compareTo 메서드를 구현할 수 있다.
- compareTo 메서드로 수행한 동치성 테스트의 결과가 equals와 같아야 한다. 이를 잘 지키면, compareTo로 줄지은 순서와 equals의 결과가 일관되게 된다. 단, 이 클래스의 객체를 정렬된 컬렉션에 넣으면 해당 컬렉션이 구현한 인터페이스(Collection, Set, Map)에 정의된 동작과 엇박자를 낼 것이다.
  - BigDecimal 을 예시로 보면, 빈 HashSet 인스턴스 생성 후 new BigDecimal("1.0")과 new Big Decimal("1.00") 차례로 추가하면, 이 두 BigDecimal은 equals 메서드로 비교하면 서로 다르기 때문에 HashSet은 원소를 2개 갖게 된다. 하지만 HashSet 대신 TreeSet을 사용하면 원소를 하나만 갖게 된다. compareTo 메서드로 비교하면 두 BigDecimal 인스턴스가 똑같기 때문이다.

<br>

##### 작성 요령

- Comparable은 타입을 인수로 받는 제네릭 인터페이스이므로 compareTo 메서드의 인수 타입은 컴파일타임에 정해짐. 입력 인수의 타입을 확인하거나 형변환할 필요가 없다는 뜻이고, 인수의 타입이 잘못됐다면 컴파일 자체가 되지 않는다.

- null을 인수로 넣어 호출하면 NPE를 던져야 함

- compareTo 메서드는 각 필드가 동치인지를 비교하는 게 아니라 그 순서를 비교

- 객체 참조 필드를 비교하려면 compareTo 메서드를 재귀적으로 호출

- Comparable을 구현하지 않은 필드나 표준이 아닌 순서로 비교해야 한다면 비교자(Comparator)를 대신 사용

  ```java
  public final class CaseInsensitiveString implements Comparable<CaseInsensitiveString> {
  
      @Override
      public int compareTo(CaseInsensitiveString cis) {
          return String.CASE_INSENSITIVE_ORDER.compare(s, cis.s);
      }
  }
  ```

- 클래스에 핵심 필드가 여러 개라면 어느 것을 먼저 비교하느냐가 중요해짐. 가장 핵심적인 필드부터 비교해나가야 함

  ```java
  @Override
  public int compareTo(PhoneNumber pn) {
      int result = Short.compare(areaCode, pn.areaCode);
      if (result == 0) {
          result = Short.compare(prefix, pn.prefix);
          if (result == 0) {
              result = Short.compare(lineNum, pn.lineNum);
          }
      }
      return result;
  }
  ```

- 자바 8에서는 Comparator 인터페이스가 일련의 비교자 생성 메서드(comparator construction method)와 함께 메서드 연쇄 방식으로 비교자를 생성할 수 있게 됨. 하지만 약 10% 정도의 성능 저하가 있음

  ```java
  private static final Comparator<PhoneNumber> COMPARATOR =
          comparingInt((PhoneNumber pn) -> pn.areaCode)
                  .thenComparingInt(pn -> pn.prefix)
                  .thenComparingInt(pn -> pn.lineNum);
  
  public int compareTo(PhoneNumber pn) {
      return COMPARATOR.compare(this, pn);
  }
  ```

- compare 메서드를 활용한 비교자

  ```java
  static Comparator<Object> hashCodeOrder = new Comparator<>() {
      public int compare(Object o1, Object o2) {
          return Integer.compare(o1.hashCode(), o2.hashCode());
      }
  };
  ```

- 비교자 생성 메서드를 활용한 비교자

  ```java
  static Comparator<Object> hashCodeOrder
    = Comparator.comparingInt(o -> o.hashCode());
  ```

  


# 모든 객체의 공통 메서드

- Object 클래스는 모든 클래스에서 상속하도록 설계됨

- Object에서 final이 아닌 메서드(equals, hashCode, toString, clone, finalize)는 모두 재정의(overriding)를 염두에 두고 설계되어서 재정의 시 지켜야 하는 일반 규약이 명확히 정의되어 있음

- 따라서 모든 클래스는 이 메서드들을 일반 규약에 맞게 재정의해야 함

- 해당 메서드를 잘못 구현하면 대상 클래스가 이 규약을 준수한다고 가정하는 클래스(HashMap, HashSet 등)를 오동작하게 만들 수 있음

> [ITEM 10. equals는 일반 규약을 지켜 재정의하라](#ITEM-10.-equals는-일반-규약을-지켜-재정의하라)
>
> [ITEM 11. equals를 재정의하려거든 hashCode도 재정의하라](#ITEM-11.-equals를-재정의하려거든-hashCode도-재정의하라)

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


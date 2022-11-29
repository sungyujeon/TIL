# 창발성(emergence)

- [단순한 설계 규칙](#단순한-설계-규칙)
- [모든 테스트를 실행하라](#모든-테스트를-실행하라)
- [리팩터링](#리팩터링)
  - [중복을 없애라](#중복을-없애라)
  - [프로그래머의 의도를 표현하라](#프로그래머의-의도를-표현하라)
  - [클래스와 메서드 수를 최소로 줄여라](#클래스와-메서드-수를-최소로-줄여라)

<br>

### 단순한 설계 규칙

> 켄트 백(Kent Beck)은 다음 규칙을 따르면 설계는 '단순하다'고 말한다
>
> 켄트 백(애자일 소프트웨어 개발의 창설 문서인 애자일 선언문의 서명인 가운데 한 명)

- 모든 테스트를 실행한다
- 중복을 없앤다
- 프로그래머 의도를 표현한다
- 클래스와 메서드 수를 최소로 줄인다

<br>

### 모든 테스트를 실행하라

- 설계는 의도한대로 돌아가는 시스템을 내놓아야 한다
- 테스트가 가능한 시스템을 만들려고 애쓰면 설계 품질이 함께 높아진다
  - 크기가 작고 하나의 목적만 수행하는 클래스가 나옴
  - SRP를 준수하는 클래스는 테스트가 더 쉬움
  - 테스트 케이스가 많을수록 개발자는 테스트하기 쉽게 코드를 작성함
- 결합도가 높으면 테스트 케이스를 작성하기 어렵기 때문에 테스트 케이스를 많이 작성할수록 개발자는
  - DIP와 같은 원칙을 적용하고
  - 의존성주입, 인터페이스, 추상화 등과 같은 도구를 사용해 결합도를 낮춤

<br>

### 리팩터링

- 테스트 케이스를 모두 작성했다면 코드와 클래스를 정리, 즉 점진적으로 코드를 리팩터링 해나간다
- 중복을 없애고, 프로그래머 의도를 ㅍ현하고, 클래스와 메서드 수를 최소로 줄여나가는 것이 리팩터링

<br>

### 중복을 없애라

- 깔끔한 시스템을 만들려면 단 몇 줄이라도 중복을 제거하겠다는 의지가 필요하다

- 예시1

  ```java
  // size 구하는, empty 인지 판정하는 메서드를 두 개 작성해야 함
  int size() {}
  boolean isEmpty() {}
  
  // size 메서드를 isEmpty 메서드에서 사용하면 중복을 줄일 수 있음
  boolean isEmpty() {
      return 0 == size();
  }
  ```

- 예시2

  ```java
  // bad
  public void scaleToOneDimension (float desiredDimension, float imageDimension) {
      if (Math.abs(desiredDimension - imageDimension) < errorThreshold) {
          return;
      }
      float scalingFactor = desiredDimension / imageDimension;
      scalingFactor = (float)(Math.floor(scalingFactor * 100) * 0.01f);
      
      RenderedOp newImage = ImageUtilities.getScaledImage(image, scalingFactor, scalingFactor);
      image.dispose();
      System.gc();
      image = newImage;
  }
  
  public synchronized void rotate(int degrees) {
      RenderedOp newImage = ImageUtilities.getRotatedImage(image, degrees);
      image.dispose();
      System.gc();
      image = newImage;
  }
  
  // good
  public void scaleToOneDimension (float desiredDimension, float imageDimension) {
      if (Math.abs(desiredDimension - imageDimension) < errorThreshold) {
          return;
      }
      float scalingFactor = desiredDimension / imageDimension;
      scalingFactor = (float)(Math.floor(scalingFactor * 100) * 0.01f);
  
      replaceImage(ImageUtilities.getScaledImage(image, scalingFactor, scalingFactor));
  }
  
  public synchronized void rotate(int degrees) {
      replaceImage(ImageUtilities.getRotatedImage(image, degrees));
  }
  
  private void replaceImage(RenderedOp newImage) {
      image.dispose();
      System.gc();
      image = newImage;
  }
  ```

  - scaleToOneDimension 메서드와 rotate 메서드는 일부 코드가 동일
  - replaceImage() 메서드를 만들어 중복을 제거
    - 하지만 replaceImage는 클래스의 SRP를 위반하는 것이 되므로, 별도 클래스로 빼는 것이 좋음
    - 이러한 '소규모 재사용'은 시스템 복잡도를 극적으로 줄여줌

- TEMPLATE METHOD PATTERN

  - 고차원 중복을 제거할 목적으로 사용

  - 예시

    ```java
    // bad
    public void accrueUSDivisionVacation() {
        // 지금까지 근무한 시간을 바탕으로 휴가 일수를 계산하는 코드
        // ...
        // 휴가 일수가 미국 최소 법정 일수를 만족하는지 확인하는 코드
        // ...
        // 휴가 일수를 급여 대장에 적용하는 코드
        // ...
    }
    
    public void accrueEUDivisionVacation() {
        // 지금까지 근무한 시간을 바탕으로 휴가 일수를 계산하는 코드
        // ...
        // 휴가 일수가 유럽연합 최소 법정 일수를 만족하는지 확인하는 코드
        // ...
        // 휴가 일수를 급여 대장에 적용하는 코드
        // ...
    }
    
    // good
    abstract public class VacationPolicy {
        public void accrueVaction() {
            calculateBaseVacationHours();
            alterForLegalMinimums();
            applyToPayroll();
        }
    
        private void calculateBaseVacationHours() {}
        abstract protected void alterForLegalMinimums();
        private void applyToPayroll() {}
    }
    
    public class USVacationPolicy extends VacationPolicy {
        @Override
        protected void alterForLegalMinimums() {
            // 미국 법정 일수를 사용한다.
        }
    }
    
    public class EUVacationPolicy extends VacationPolicy {
        @Override
        protected void alterForLegalMinimums() {
            // 유럽연합 최소 법정 일수를 사용한다.
        }
    }
    
    ```

    - bad case에서 최소 법정 일수를 계산하는 코드만 제외하면 두 메서드는 거의 동일
    - template method pattern을 이용하면 하위 클래스는 중복되지 않는 정보만 override 해서 구현하여 accrueVaction() 메서드에서 abstract로 구현해야 하는 부분만 채우면 됨

<br>

### 프로그래머의 의도를 표현하라

- 소프트웨어 프로젝트 비용 중 대다수는 장기적인 유지보수에 들어간다
  - 자신이 이해하는 코드를 짜기는 쉬운데, 코드를 짜는 동안은 모두 이해하지만 나중에 코드를 유지보수할 사람이 코드를 짠 사람보다 문제를 깊이 이해할 가능성은 희박하다!
  - 시스템이 점차 복잡해지며 유지보수 개발자가 시스템을 이해하느라 보내는 시간은 점점 늘어나고 동시에 코드를 오해할 가능성도 점점 커진다!
- 개발자가 명백하게 짤수록 다른 사람이 그 코드를 이해하기 쉬워진다
  - 좋은 이름을 선택한다(naming을 잘해라)
    - 이름과 기능이 완전히 딴판인 클래스나 함수로 유지보수 담당자를 놀라게 하면 안된다
  - 함수와 클래스 크기를 가능한 줄인다
    - 작은 클래스와 함수는 이름 짓기도 쉽고, 구현하기도 쉽고, 이해하기도 쉽다
  - 표준 명칭을 사용한다
    - 디자인 패턴은 의사소통과 표현력 강화가 주요 목적이다
    - 예를 들어 클래스가 COMMAND나 VISITOR와 같은 표준 패턴을 사용한다면 클래스 이름에 패턴 이름을 넣는다(이로써 다른 개발자가 클래스 설계 의도를 이해하기 쉬워짐)
  - 단위 테스트 케이스를 꼼꼼히 작성한다
    - 테스트 케이스는 소위 '예제로 보여주는 문서'다!

<br>

### 클래스와 메서드 수를 최소로 줄여라

- 중복을 제거하고, 의도를 표현하고, SRP를 준수한다는 기본 개념도 극단으로 치달으면 득보다 실이 많다
- 예를 들어
  - 클래스마다 무조건 인터페이스를 생성하라고 요구하는 구현 표준
  - 자료 클래스와 동작 클래스는 무조건 분리해야 한다는 주장 등
- 하지만 단순한 설계규칙 4개 중에 가장 우선순위가 낮다
  - 클래스와 메서드 수를 최소로 줄이는 것도 중요하지만, 테스트 케이스를 만들고 중복을 제거하고 의도를 표현하는 작업이 더 중요하다!
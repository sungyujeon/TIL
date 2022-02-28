# 동시성

- [동시성이 필요한 이유](#동시성이-필요한-이유)
- [동시성에 대한 미신과 오해](#동시성에-대한-미신과-오해)
- [동시성을 구현하기 어려운 이유](#동시성을-구현하기-어려운-이유)
- [동시성 방어 원칙](#동시성-방어-원칙)
- [라이브러리를 이해하라](#라이브러리를-이해하라)
- [실행 모델을 이해하라](#실행-모델을-이해하라)

<br>

### 동시성이 필요한 이유

- 동시성은 결합(coupling)을 없애는 전략
  - 즉, 무엇(what)과 언제(when)을 분리하는 전략
  - 스레드가 하나인 프로그램은 무엇과 언제가 서로 밀접
- 무엇과 언제를 분리하면 애플리케이션 구조와 효율이 극적으로 나아짐
  - 구조적인 관점에서 프로그램은 거대한 루프 하나가 아니라 작은 협력 프로그램 여럿으로 보임
  - Servlet 모델을 살펴보면 웹 요청이 들어올 때마다 웹 서버는 비동기식으로 서블릿을 실행하는데, 각 서블릿 스레드는 다른 서블릿 스레드와 무관하게 돌아감
- 응답 시간(response time)과 작업처리량(throughput)
  - 적은 응답시간과 많은 작업처리량, 즉 효율적인 시스템의 관점에서 보면 동시성 구현이 불가피함
  - 예시
    - 웹 스크래핑의 경우 한 번에 한 사이트만 처리 가능하다면 스크래핑 시 시간이 늘어남
    - 한 번에 한 사용자만 처리하는 시스템이 있다면 응답 시간이 늘어남
    - 정보 대량 분석 시스템에서는 모든 정보를 처리한 후에야 최종적인 답을 내므로 비효율적

<br>

### 동시성에 대한 미신과 오해

> 동시성이 항상 성능을 높여준다거나, 설계가 변하지 않는다거나, 웹 또는 EJB 컨테이너를 사용하면 동시성을 이해할 필요가 없다는 등의 오해가 존재하지만 사실이 아니다

- 동시성은 사실 때로 성능을 높여준다. 대기 시간이 아주 길어 여러 스레드가 프로세서를 공유할 수 있거나, 여러 프로세서가 동시에 처리할 독립적인 계산이 충분히 많은 경우에만 성능이 높아짐

- 단일 스레드 시스템과 다중 스레드 시스템은 설계가 판이하게 다름

- 동시성을 해결해주는 모듈을 사용해도 컨테이너가 어떻게 동작하는지, 어떻게 동시 수정, 데드락 등과 같은 문제를 피할 수 있는지 알아야 함
- 동시성은 다소 부하를 유발한다. 성능 측면에서 부하가 걸리며 코드도 더 짜야함
- 간단한 문제라도 동시성을 복잡하다
- 일반적으로 동시성 버그는 재현하기 어려움(그래서 진짜 결함으로 간주되지 않고 일회성 문제로 여겨 무시하기 쉬움)
- 동시성을 구현하려면 흔히 근본적인 설계 전략을 재고해야 함

<br>

### 동시성을 구현하기 어려운 이유

- 예시

  ```java
  public class X {
      private int lastIdUsed;
      
      public int getNextId() {
          return ++lastIdUsed;
      }
  }
  ```

  - new X(), lastIdUsed = 42 일 때, 두 스레드가 해당 인스턴스를 공유한다면 결과는 아래 중 하나
    - threadA.lastIdUsed = 43, threadB.lastIdUsed = 44
    - threadA.lastIdUsed = 44, threadB.lastIdUsed = 43
    - threadA.lastIdUsed = 43, threadB.lastIdUsed = 43
  - 즉, 일부 상황에서 스레드가 인스턴스를 공유할 경우 잘못된 결과가 나올 수 있음
    - 바이트 코드만 고려했을 때 실행하는 잠재적인 경로는 최대 12,870개이고, lastIdUsed가 long 타입이면 2,704,156개로 경로가 증가(~~자세한 경로 내용은 부록 동시성2 참조~~)

<br>

### 동시성 방어 원칙

- 동시성에서 프로그램이 정상적으로 돌아가게 하려면 다음의 원칙을 지켜야 함

- SRP(단일 책임 원칙)

  - 메서드/클래스/컴포넌트를 변경할 이유가 하나여야 한다는 원칙
  - 동시성은 구현이 복잡하므로 다른 코드와 분리해야 함
  - 동시성 구현 시 고려사항
    - 독자적인 개발, 변경, 조율 주기가 있음
    - 일반적인 코딩에서 겪는 난관가 다른 어려움이 존재
    - 잘못 구현된 동시성 코드는 실패 원인이 매우 다양

- 따름 정리(corollary)

  > corollary(추론)이라는 따름 정리는 이를 유도하는 명제나 정리의 선언에 뒤따른다는 것으로, 앞선 논리에서 추론이 가능하다는 의미

  - 자료 범위를 제한하라(캡슐화하고 공유 자료를 최소화하라)
    - 공유 객체를 사용하는 코드 내 임계영역(critical section)을 synchronized 키워드로 보호
    - 이러한 임계영역을 줄이는 것이 중요한데, 공유 자료를 수정하는 위치가 많을 수록 다음의 가능성도 높아짐
      - 보호할 임계영역을 누락시켜서 공유 자료를 수정하는 모든 코드를 망가뜨림
      - 모든 임계영역을 올바로 보호했는지 확인하느라 많은 노력을 들임
      - 버그 찾기가 더 어려워짐
  - 자료 사본을 사용하라
    - 공유 자료를 줄이려면 처음부터 공유하지 않는 방법이 제일 좋음
    - 객체를 복사해 읽기 전용으로 사용하거나 각 스레드가 객체를 복사해 사용한 후 한 스레드가 해당 사본에서 결과를 가져오는 방법
  - 스레드는 가능한 독립적으로 구현하라
    - 다른 스레드와 자료를 공유하지 않게 함
    - 각 스레드가 모든 정보를 비공유 출처에서 가져오며 로컬 변수에 저장
    - 즉, 자료를 독립적인 단위로 분할하라

<br>

### 라이브러리를 이해하라

- 자바에서의 스레드 구현 시
  - 스레드 환경에 안전한 컬렉션을 사용
  - 서로 무관한 작업을 수행할 때는 executor 프레임워크 사용
  - 스레드가 blocking 되지 않는 방법 사용
  - 일부 라이브러리는 스레드에 안전하지 못하다는 것을 인지
- 스레드 환경에 안전한 컬렉션
  - java.util.concurrent 패키지가 제공하는 클래스는 다중 스레드 환경에서 사용해도 안전하고 성능이 좋음
  - 예시로 concurrentHashMap은 거의 모든 상황에서 HashMap 보다 빠르고, 동시 읽기/쓰기 지원하는 등 ThreadSafe 하다.
- 즉, 언어가 제공하는 thread 관련 라이브러리를 검토하라
  - java에서는 java.util.concurrent, java.util.concurrent.atomic, java.util.concurrent.locks 등을 익혀라

<br>

### 실행 모델을 이해하라

- 기본 용어
  - 한정된 자원(Bound Resource)
    - 다중 스레드 환경에서 사용하는 자원으로, 크기나 숫자가 제한적
    - DB 연결, 길이가 일정한 읽기/쓰기 버퍼 등
  - 상호 배제(Mutual Exclusion)
    - 한 번에 한 스레드만 공유 자료나 공유 자원을 사용할 수 있는 경우
  - 기아(Starvation)
    - 한 스레드나 여러 스레드가 굉장히 오랫동안 혹은 영원히 자원을 기다리는 것
  - 데드락(Deadlock)
    - 여러 스레드가 각기 필요한 자원을 기다리고 있는 상태
  - 라이브락(Livelock)
    - 락을 거는 단계에서 각 스레드가 서로를 방해

- 생산자-소비자(Producer-Consumer)
  - 
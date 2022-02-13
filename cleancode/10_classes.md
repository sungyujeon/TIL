# 클래스

- [클래스 체계](#클래스-체계)
- [클래스는 작아야 한다](#클래스는-작아야-한다)
  - 단일 책임 원칙
  - 응집도
- [변경하기 쉬운 클래스](#변경하기-쉬운-클래스)



### 클래스 체계

- 클래스를 정의하는 표준 자바 관례에 따르면 다음의 순서를 따른다
  - 변수 목록
    - static public constant -> static private -> private
  - 공개 함수
  - 비공개 함수는 자신을 호출하는 공개 함수 직후(즉, 추상화 단계가 순차적으로 내려감)
- 캡슐화
  - 변수와 유틸리티 함수는 가능한 공개하지 않음
  - 하지만 반드시 숨겨야 한다는 법칙도 없기 때문에 때로는 접근 허용하기도 함
    - 변수나 유틸리티 함수를 protected로 선언해 테스트 코드에 접근 허용하기도 함
  - 그럼에도 불구하고 비공개 상태를 유지할 온갖 방법을 강구해야 하고, 캡슐화를 풀어주는 결정은 언제나 최후의 수단



### 클래스는 작아야 한다

```java
// bad
public class SuperDashboard extends JFrame implements MetaDataUser {
  public Component getLastFocusedComponent() {}
  public void setLastFocused(Component lastFocused) {}
  public int getMajorVersionNumber() {}
  public int getMinorVersionNumber() {}
  public int getBuildNumber() {}
}

// good
public class SuperDashboard extends JFrame implements MetaDataUser {
  public Component getLastFocusedComponent() {}
  public void setLastFocused(Component lastFocused) {}
}

public class Version {
  public int getMajorVersionNumber() {}
  public int getMinorVersionNumber() {}
  public int getBuildNumber() {}
}
```

- 클래스를 설계할 때도 메서드와 마찬가지로 '작게'가 기본 규칙

- 메서드가 행 수로 크기를 측정했다면, 클래스는 <b>책임</b> 단위로 측정

  - 단순히 메서드 수가 작다고 좋은 것이 아니라, 위 bad 코드는 책임이 너무 많음
  - 클래스 이름은 해당 클래스 책임을 기술해야 한다. <b>작명은 클래스 크기를 줄이는 첫 번째 관문!</b>
    - 간결한 이름이 떠오르지 않는다면 클래스 크기가 너무 큰 것
    - 클래스 이름이 모호하다면 클래스 책임이 너무 많은 것
  - 클래스 설명은 if, and, or, but 을 사용하지 않고 25단어 내외로 가능해야 한다

- <b>단일 책임 원칙</b>(SRP: Single Responsibility Principle)

  - 클래스나 모듈을 변경할 이유가 단 하나 뿐이어야 한다는 원칙

  - 위 bad case에서 SuperDashboard를 변경할 이유가 두 가지
    - SuperDashboard는 소프트웨어 버전 정보를 추적하는데, 버전 정보는 소프트웨어를 출시할 때마다 달라짐
    - SuperDashboard는 자바 스윙 컴포넌트를 관리하는데, 스윙 코드를 변경할 대마다 버전 정보가 달라짐
    - 따라서 버전 추적하는 class를 별도로 만들어 책임을 분리하게 한다

  - 개발자들은 큰 그림을 이해하려면 이 클래스 저 클래스를 수없이 넘나들어야 한다고 걱정하지만, 작은 클래스가 많은 시스템이든 큰 클래스가 몇 개뿐인 시스템이든 돌아가는 부품은 그 수가 비슷하다!

  - 크기가 큰 다목적 클래스 몇 개로 이뤄진 시스템은 (변경을 가할 때) 당장 알 필요가 없는 사실까지 포함하여 독자를 방해한다

- <b>응집도</b>(Cohesion)

  - 클래스는 인스턴스 변수 수가 적어야 한다

  - 메서드가 인스턴스 변수를 더 많이 사용할수록, 인스턴스 변수를 메서드마다 사용할수록 응집도가 높아짐

  - 응집도가 높다는 말은, 클래스에 속한 메서드와 변수가 서로 의존하며 논리적인 단위로 묶인다는 의미로 받아들여지기 때문에 응집도가 높은 클래스를 선호하는 경향이 있음

  - 사례1

    ```java
    public class Stack {
        private int topOfStack = 0;
        List<Integer> elements = new LinkedList<Integer>();
    
        public int size() {
            return topOfStack;
        }
    
        public void push(int element) {
            topOfStack++;
            elements.add(element);
        }
    
        public int pop() throws PoppedWhenEmpty {
            if (topOfStack == 0) {
                throw new PoppedWhenEmpty();
            }
            int element = elements.get(--topOfStack);
            elements.remove(topOfStack);
            return element;
        }
    }
    ```

    - '함수를 작게, 매개변수 목록을 짧게'라는 전략을 따르다 보면 몇몇 메서드만이 사용하는 인스턴스 변수가 많아짐
    - 이는 새로운 클래스로 쪼개야 한다는 신호이고, 응집도가 높아질수록 변수와 메서드를 적절히 분리해 새로운 클래스 두세 개로 쪼갠다

  - <b>응집도를 유지하면 작은 클래스 여럿이 나온다</b>

    - 큰 함수 일부를 작은 함수로 빼낼 때, 빼내려는 코드가 큰 함수에 정의된 변수 넷을 사용한다면, 변수 네 개를 새 함수에 인수로 넘기는 것이 아니라 인스턴스 변수로 만든다면 새 함수는 <b>인수가 필요없어지고, 그만큼 함수를 쪼개기 쉬워진다</b>

  - 사례2
  
    ```java
    // bad
    public class PrintPrimes {
        public static void main(String[] args) {
            final int M = 1000;
            final int RR = 50;
            final int CC = 4;
            final int WW = 10;
            final int ORDMAX = 30;
            int P[] = new int[M + 1];
            int PAGENUMBER;
            int PAGEOFFSET;
            int ROWOFFSET;
            int C;
            int J;
            int K;
            boolean JPRIME;
            int ORD;
            int SQUARE;
            int N;
            int MULT[] = new int[ORDMAX + 1];
            J = 1;
            K = 1;
            P[1] = 2;
            ORD = 2;
            SQUARE = 9;
    
            while (K < M) {
                do {
                    J = J + 2;
                    if (J == SQUARE) {
                        ORD = ORD + 1;
                        SQUARE = P[ORD] * P[ORD];
                        MULT[ORD - 1] = J;
                    }
                    N = 2;
                    JPRIME = true;
                    while (N < ORD && JPRIME) {
                        while (MULT[N] < J) {
                            MULT[N] = MULT[N] + P[N] + P[N];
                        }
                        if (MULT[N] == J) {
                            JPRIME = false;
                        }
                        N = N + 1;
                    }
                } while (!JPRIME);
                K = K + 1;
                P[K] = J;
            }
            PAGENUMBER = 1;
            PAGEOFFSET = 1;
            while (PAGEOFFSET <= M) {
                System.out.println("The First " + M + " Prime Numbers --- Page " + PAGENUMBER);
                System.out.println("");
                for (ROWOFFSET = PAGEOFFSET; ROWOFFSET < PAGEOFFSET + RR; ROWOFFSET++) {
                    for (C = 0; C < CC; C++) {
                        if (ROWOFFSET + C * RR <= M) {
                            System.out.format("%10d", P[ROWOFFSET + C * RR]);
                        }
                    }
                    System.out.println("");
                }
                System.out.println("\f");
                PAGENUMBER = PAGENUMBER + 1;
                PAGEOFFSET = PAGEOFFSET + RR * CC;
            }
        }
    }
    ```
  
    ```java
    // good
    public class PrimePrinter {
        public static void main(String[] args) {
            final int NUMBER_OF_PRIMES = 1000;
            int[] primes = PrimeGenerator.generate(NUMBER_OF_PRIMES);
    
            final int ROWS_PER_PAGE = 50;
            final int COLUMNS_PER_PAGE = 4;
            RowColumnPagePrinter tablePrinter = new RowColumnPagePrinter(ROWS_PER_PAGE, COLUMNS_PER_PAGE, "The First " + NUMBER_OF_PRIMES + " Prime Numbers");
            tablePrinter.print(primes);
        }
    }
    
    public class RowColumnPagePrinter {
        private int rowsPerPage;
        private int columnsPerPage;
        private int numbersPerPage;
        private String pageHeader;
        private PrintStream printStream;
    
        public RowColumnPagePrinter(int rowsPerPage, int columnsPerPage, String pageHeader) {
            this.rowsPerPage = rowsPerPage;
            this.columnsPerPage = columnsPerPage;
            this.pageHeader = pageHeader;
            numbersPerPage = rowsPerPage * columnsPerPage;
            printStream = System.out;
        }
    
        public void print(int data[]) {
            int pageNumber = 1;
            for (int firstIndexOnPage = 0; firstIndexOnPage < data.length; firstIndexOnPage += numbersPerPage) {
                int lastIndexOnPage = Math.min(firstIndexOnPage + numbersPerPage - 1, data.length - 1);
                printPageHeader(pageHeader, pageNumber);
                printPage(firstIndexOnPage, lastIndexOnPage, data);
                printStream.println("\f");
                pageNumber++;
            }
        }
    
        private void printPage(int firstIndexOnPage, int lastIndexOnPage, int[] data) {
            int firstIndexOfLastRowOnPage = firstIndexOnPage + rowsPerPage - 1;
            for (int firstIndexInRow = firstIndexOnPage; firstIndexInRow <= firstIndexOfLastRowOnPage; firstIndexInRow++) {
                printRow(firstIndexInRow, lastIndexOnPage, data);
                printStream.println("");
            }
        }
    
        private void printRow(int firstIndexInRow, int lastIndexOnPage, int[] data) {
            for (int column = 0; column < columnsPerPage; column++) {
                int index = firstIndexInRow + column * rowsPerPage;
                if (index <= lastIndexOnPage) {
                    printStream.format("%10d", data[index]);
                }
            }
        }
    
        private void printPageHeader(String pageHeader, int pageNumber) {
            printStream.println(pageHeader + " ---- Page " + pageNumber);
            printStream.println("");
        }
    
        public void setOutput(PrintStream printStream) {
            this.printStream = printStream;
        }
    }
    
    public class PrimeGenerator {
        private static int[] primes;
        private static ArrayList<Integer> multiplesOfPrimeFactors;
    
        protected static int[] generate(int n) {
            primes = new int[n];
            multiplesOfPrimeFactors = new ArrayList<Integer>();
            set2AsFirstPrime();
            checkOddNumbersForSubsequentPrimes();
            return primes;
        }
    
        private static void set2AsFirstPrime() {
            primes[0] = 2;
            multiplesOfPrimeFactors.add(2);
        }
    
        private static void checkOddNumbersForSubsequentPrimes() {
            int primeIndex = 1;
            for (int candidate = 3; primeIndex < primes.length; candidate += 2) {
                if (isPrime(candidate)) {
                    primes[primeIndex++] = candidate;
                }
            }
        }
    
        private static boolean isPrime(int candidate) {
            if (isLeastRelevantMultipleOfNextLargetPrimeFactor(candidate)) {
                multiplesOfPrimeFactors.add(candidate);
                return false;
            }
            return isNotMultipleOfAnyPreviousPrimeFactor(candidate);
        }
    
        private static boolean isLeastRelevantMultipleOfNextLargetPrimeFactor(int candidate) {
            int nextLargerPrimeFactor = primes[multiplesOfPrimeFactors.size()];
            int leastRelevantMultiple = nextLargerPrimeFactor * nextLargerPrimeFactor;
            return candidate == leastRelevantMultiple;
        }
    
        private static boolean isNotMultipleOfAnyPreviousPrimeFactor(int candidate) {
            for (int n = 1; n < multiplesOfPrimeFactors.size(); n++) {
                if (isMultipleOfNthPrimeFactor(candidate, n)) {
                    return false;
                }
            }
            return true;
        }
    
        private static boolean isMultipleOfNthPrimeFactor(int candidate, int n) {
            return candidate == smallestOddNthMultipleNotLessThanCandidate(candidate, n);
        }
    
        private static int smallestOddNthMultipleNotLessThanCandidate(int candidate, int n) {
            int multiple = multiplesOfPrimeFactors.get(n);
            while (multiple < candidate) {
                multiple += 2 * primes[n];
            }
            multiplesOfPrimeFactors.set(n, multiple);
            return multiple;
        }
    }
    ```
  
    - 가장 눈에 띄는 변화는 리팩터링한 프로그램이 길어졌다는 사실
      - 더 길고 서술적인 변수 이름을 사용
      - 코드에 주석을 추가하는 수단으로 함수 선언과 클래스 선언을 활용
      - 가독성을 높이고자 공백을 추가하고 형식을 맞춤
    - 단일 책임 원칙을 지키기 위해 세 가지 책임으로 나눠짐
      - PrimePrinter 클래스는 main 함수 하나만 포함하여 실행 환경을 책임짐
      - RowColumnPagePrinter 클래스는 숫자 목록을 주어진 행과 열에 맞춰 페이지에 출력
      - PrimeGenerator 클래스는 소수 목록을 생성
    - 이 같은 코드로 리팩터링하기 위해
      - 프로그램의 정확한 동작을 검증하는 테스트 슈트를 작성
      - 한 번에 하나씩 수 차례에 걸쳐 조금씩 코드 변경
      - 코드를 변경할 때마다 테스트를 수행해 원래 프로그램과 동일하게 동작하는지 확인



### 변경하기 쉬운 클래스

> 깨끗한 시스템은 클래스를 체계적으로 정리해 변경에 수반하는 위험을 낮춘다

- 사례

  ```java
  // bad
  // 주어진 메타 자료로 적절한 SQL 문자열을 만드는 Sql 클래스
  class Sql {
      public Sql(String table, Column[] columns)
      public String create()
      public String insert(Objeect[] fields)
      public String selectAll()
      public String findByKey(String keyColumn, String keyValue)
      public String select(Column column, String pattern)
      public String select(Criteria criteria)
      public String preparedInsert()
      private String columnList(Column[] columns)
      private String valuesList(Object[] fields, final Column[] columns)
      private String selectWithCriteria(String criteria)
      private String placeholderList(Column[] columns)
  }
  ```

  - select, create 만 주어져 있다고 한다면, update 문을 추가하기 위해 해당 클래스에 수정을 해야 함

- 개선

  ```java
  abstract public class Sql {
      public Sql(String table, Column[] columns)
      abstract public String generate();
  }
  
  public class CreateSql extends Sql {
      public CreateSql(String table, Column[] columns)
      @Override public String generate()
  }
  
  public class SelectSql extends Sql {
      public SelectSql(String table, Column[] columns)
      @Override public String generate()
  }
  
  public class InsertSql extends Sql {
      public InsertSql(String table, Column[] columns, Object[] fields)
      @Override public String generate()
      private String valuesList(Object[] fields, final Column[] columns)
  }
  
  public class SelectWithCriteriaSql extends Sql {
      public SelectWithCriteriaSql(String table, Column[] columns, Criteria criteria)
      @Override public String generate()
  }
  
  public class SelectWithMatchSql extends Sql {
      public SelectWithMatchSql(String table, Column[] columns, Column column, String pattern)
      @Override public String generate()
  }
  
  public class FindByKeySql extends Sql {
      public FindByKeySql(String table, Column[] columns, String keyColumn, String keyValue)
      @Override public String generate()
  }
  
  public class PreparedInsertSql extends Sql {
      public PreparedInsertSql(String table, Column[] columns)
      @Override public String generate()
      private String placeholderList(Column[] columns)
  }
  
  public class Where {
      public Where(String criteria)
      public String generate()
  }
  
  public class ColumnList {
      public ColumnList(Column[] columns)
      public String generate()
  ```

  - 공개 인터페이스를 각각 Sql 클래스에서 파생하는 클래스로 만듦
  - valueList와 같은 비공개 메서드는 해당하는 파생 클래스로 옮김
  - 모든 파생 클래스가 공통으로 사용하는 비공개 메서드는 Where와 ColumnList라는 두 유틸리티 클래스에 넣음
  - 클래스 분리의 결과
    - 코드가 단순해지고 이해가 쉬워짐
    - 함수 하나를 수정했다고 다른 함수가 망가질 위험도 사라짐
    - 테스트 관점에서 모든 논리를 구석구석 증명하기도 쉬워짐
    - update 문을 추가하기 위해 기존 클래스를 변경할 필요가 없어짐(추가하고 싶다면 UpdateSql을 만들어 넣으면 됨)
    - SRP, OCP의 원칙을 지킴

- <b>변경으로부터 격리</b>

  - 인터페이스와 추상 클래스를 사용해 구현이 미치는 영향을 격리한다

  - 상세한 구현에 의존하는 클라이언트 클래스는 구현이 바뀌면 위험에 빠짐

  - 상세한 구현에 의존하는 코드는 테스트가 어려움

  - 사례

    ```java
    public interface StockExchange {
        Money currentPrice(String symbol);
    }
    
    public class TokyoStockExchange implements StockExchange {
        @Override
        Money currentPrice(String symbol) {
            
        }
    }
    
    public class Portfolio {
        private StockExchange exchange;
        public Portfolio(StockExchange exchange) {
            this.exchange = exchange;
        }
        // ...
    }
    
    public class PortfolioTest {
        private FixedStockExchangeStub exchange;
        private Portfolio portfolio;
        
        @Before
        protected void setup() throws Exception {
            exchange = new FixedStockExchangeStub();
            exchange.fix("Microsoft", 100);
            protfolio = new Portfolio(exchange);
        }
        
        @Test
        public void GivenFiveMicrosoftTotalShouldBe500() throws Exception {
            portfolio.add(5, "Microsoft");
            Assert.assertEquals(500, portfolio.value());
        }
    }
    ```

    - Portfolio 클래스에서 TokyoStockExchange API를 직접 호출하는 대신 StockExchange라는 인터페이스를 생성한 뒤 이를 구현하게 한다
    - 이제 TokyoStockExchange 클래스를 흉내내는 테스트용 PortfolioTest 클래스를 만들 수 있음. 이 클래스는 고정된 주가를 반환
    - 개선된 Portfolio 클래스는 TokyoStockExchange라는 상세 구현 클래스가 아니라, StockExchange라는 인터페이스에 의존하게 되어 실제로 주가를 얻어오는 출처나 얻어오는 방식 등과 같은 구체적인 사실을 모두 숨김 
    - 결과
      - 테스트가 가능할 정도로 시스템 결합도를 낮추면 유연성과 재사용성도 높아짐
      - 결합도를 최소로 줄이면 자연스럽게 DIP를 따르는 클래스가 나옴
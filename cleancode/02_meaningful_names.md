## Meaningful Names

> convention이란 합의나 관습과 같은 것이므로, 프로젝트 조직 내에서 정한 규칙을 따르는 것이 가장 중요
>
> [의도를 분명히 밝혀라](#의도를-분명히-밝혀라)
>
> [그릇된 정보를 피하라](#그릇된-정보를-피하라)
>
> [통일성 있는 단어 사용하기](#통일성-있는-단어-사용하기)
>
> [변수명에 타입 넣지 않기](#변수명에-타입-넣지-않기)
>
> [해법 영역 -> 문제 영역(domain)](#해법-영역-->-문제 영역\(domain\))
>
> [의미 있는 맥락을 추가하라](#의미-있는-맥락을-추가하라)
>
> [루프 속 i j k 자제](#루프-속-i-j-k-자제)
> 
> [Google Java Naming Guide](#google-java-naming-guide)




##### 의도를 분명히 밝혀라

```java
// bad
int d; // 경과 시간(단위: 날짜)

// good
int elapsedTimeInDays;
int fileAgeIndays;

public List<int[]> getFlaggesCells() {
  	List<int[]> flaggedCells = new ArrayList<int[]>();
    for (int[] cell : gameBoard) {
				if (cell[STATUS_VALUE] == "FLAGGED") {
          	flaggedCells.add(cell);
        }
    }
  	return flaggedCells;
}

// 추가 개선
cell[STATUS_VALUE] == "FLAGGED"
cell.isFlagged()
```

- 변수나 상수의 갯수, 간결한 코드라고 해서 좋은 코드가 아니라, naming을 한 의도를 정확하게 표현할 때 이해하기가 더 수월해짐



##### 그릇된 정보를 피하라

```java
// bad
int a = 1;
if (O == l)
```

- 알파벳 O, L 등을 쓰는 것은 숫자와 혼동될 수 있으므로 피해야 할 변수



##### 통일성 있는 단어 사용하기

- Member / Customer / User
- Service / Manager
- Repository / Dao

- 한 프로젝트에서 같은 객체를 표현하는 클래스의 naming은 통일하는 것이 좋음



##### 변수명에 타입 넣지 않기

```java
String nameString -> name
int itemPriceAmount -> itemPrice
Account[] accountArray -> accounts
Map<Account> accountMap

public interface IShapeFactory -> ShapeFactory
public class ShapeFactoryImpl -> CircleFactory
```

- interface class에 `I`를 접두어로 붙이는 것을 피함(다루는 클래스가 굳이 인터페이스라는 사실을 알리지 않아도 됨)
- interface를 구현한 concrete class의 경우에도 접미사로 `Impl`을 붙이거나 실제 구현된 클래스의 이름(위처럼 `CircleFactory`)을 사용하는 것이 좋음. (Impl 보다도 실제 구현 클래스의 의미를 정확하게 표현하는 것이 좋으나, Impl도 여전히 많이 쓰이고 있음)



##### 해법 영역 -> 문제 영역(domain)

- 코드를 다루는 것은 프로그래머이므로, 알고리즘이나 패턴, 수학 용어 등 기술 개념을 사용하는 것도 좋음. 적절한 프로그래밍 용어가 없다면 해당 도메인의 용어를 가져와도 됨.
- 해당 코드가 프로그래밍에 가까운지, 도메인에 가까운지를 구분하는 능력을 가져야 함



##### 의미 있는 맥락을 추가하라

```java
private void printGuessStatistics(char candidate, int count) {
  	String number;
    String verb;
    String pluralModifier;
}

// 추가 개선
public class GuessStatisticsMessage {
  	private String number;
  	private String verb;
  	private String pluralModifier;
}

/******************************************************/
// bad
int a;
String b;
System.out.printf("User Requested %s. count = %d", b, a);

// good
class SalesItem {
  ItemCode code;
  String name;
  int count;
}

SalesItem selectedItem = salesItemRepository.getItemByCode(purchaseRequest.getItemCode());
System.out.printf("User Requested %s. count = %d", selectedItem.getCount(), selectedItem.getCount());
```

- 메서드 안에서 변수를 선언하여 사용하는 것보다, 클래스 내에 인스턴스 변수로 만들면 해당 변수들이 클래스 내에 포함되어 있다는 맥락을 더 잘 표현할 수 있는 것



##### 루프 속 i j k 자제

```java
// bad
for (int i = 0; i < messages.size(); i++) {}

// good
for (String message : messages) {}
messages.stream().forEach(
		message -> // ...
)

```

- i,j -> row, col / width, height
- i,j,k -> row, col, depth



##### Google Java Naming Guide

- Package

  ```java
  com.example.deepspace 👍
  com.example.deepSpace 👎
  com.example.deep_space 👎
  ```

  - All lower case, no underscores

- Class

  ```text
  // class는 명사, 명사구
  Character, ImmutableList
  
  // 인터페이스는 명사, 명사구, (형용사)
  List, Readable
  
  // 테스트 클래스는 Test로 끝내기
  HashTest, HashIntegrationTest
  ```

  - UpperCamelCase

- Method

  ```txt
  // method는 동사, 동사구
  sendMessage, stop
  
  // jUnit 테스트에 underscore 사용되기도 함
  // <methodUnderTest>_<state> 패턴
  pop_emptyStack
  ```

  - lowerCamelCase


- The others
  - CONSTANT_CASE
    - constant
  - lowerCamelCase
    - non-constant
    - parameter
    - local variable
  - other camel cases
    - 축약형과 같은 단어의 조합도 가급적 upper or lower camel case
    - XmlHttpRequest - XMLHTTPRequest 👎
    - newCustomerId - newCustomerID 👎
    - innerStopwatch - innerStopWatch 👎
    - supportsIpv6OnIos - supportsIPv6OnIOS 👎
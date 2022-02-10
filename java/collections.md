# Collections Framework

> 컬렉션 프레임웍이란 '데이터 군을 저장하는 클래스들을 표준화한 설계'



## Collections Framework Hierarchy

![](./src/java-collection-framework-hierarchy.jpg)

> 출처 : https://facingissuesonit.com/2019/10/15/java-collection-framework-hierarchy/

<br>

##### Collection interface

|                            Method                            |                         Description                          |
| :----------------------------------------------------------: | :----------------------------------------------------------: |
|    boolean add(Object o)<br>boolean addAll(Collection c)     | 지정된 객체(o) 또는 Collection(c)의 객체들을 Collection에 추가 |
|                         void clear()                         |                 Collection의 모든 객체 삭제                  |
| boolean contains(Object o)<br>boolean containsAll(Collection c) | 지정된 객체(o) 또는 Collection의 객체들이 Collection에 포함되어 있는지 확인 |
|                   boolean equals(Object o)                   |                  동일한 Collection인지 비교                  |
|                        int hashCode()                        |                 Collection의 hash code 반환                  |
|                      boolean isEmpty()                       |                 Collection이 비어있는지 확인                 |
|                      boolean iterator()                      |             Collection의 Iterator를 얻어서 반환              |
|                   boolean remove(Object o)                   |                       지정된 객체 삭제                       |
|               boolean removeAll(Collection c)                |            지정된 Collection에 포함된 객체들 삭제            |
|                          int size()                          |             Collection에 저장된 객체의 갯수 반환             |
|                      Object[] toArray()                      |     Collection에 저장된 객체를 객체배열(Object[])로 반환     |
|                 Object[] toArray(Object[] a)                 |       지정된 배열에 Collection의 객체를 저장해서 반환        |
- Lambda, Stream 관련 method 추가 학습 필요



##### List/Set/Map interface

- List
  - 중복을 허용하면서 저장순서가 유지되는 컬렉션 구현 시 사용

- Set
  - 중복을 허용하지 않고 저장순서가 유지되지 않는 컬렉션 클래스 구현 시 사용
- Map
  - key-value 쌍으로 묶어서 저장하는 컬렉션 클래스 구현 시 사용



## List 구현 클래스

##### ArrayList

```java
// new ArrayList(Collection c)
// 주어진 컬렉션이 저장된 ArrayList 생성
ArrayList list = new ArrayList(set);

// boolean add(Object o) >> 성공시 return true 
// void add(int index, Object element)
list.add(1);  // [1]
list.add(0, 2);  // [2, 1]

// boolean addAll(Collection c)
// boolean addAll(int index, Collection c)
List otherCollection = new ArrayList();
list.addAll(otherCollection);
list.addAll(0, otherCollection);

// void clear()
list.clear();  // []

// Object clone()
// shallow copy
Object cloneList = list.clone();

// boolean contains(Object o)
list.contains(object);

// Object get(int index)
list.get(0);

// int indexOf(Object o)
list.indexOf(1);

// boolean isEmpty()
list.isEmpty();

// Iterator iterator()
list.iterator();

// int lastIndexOf(Object o)
// if not exists then return -1
list.lastIndexOf(3);

// Object remove(int index)
// boolean removeAll(Collection c)
list.remove(0);
list.removeAll(otherCollection);

// boolean retainAll(Collection c)
// otherCollection과 공통된 것만 남기고 삭제
list.retainAll(otherCollection);

// Object set(int index, Object element)
// 해당 index 값을 완전 대체
list.set(0, 0);

// int size()
list.size();

// void sort(Comparator c)
list.sort(comparator);

// List subList(int fromIndex, int toIndex)
list.subList(0, 1);

// Object[] toArray()
list.toArray();

// void trimToSize()
list.trimToSize();
```

- ArrayList size

  - default size: 10

  - 저장할 요소의 갯수가 크다면, 이를 고려하여 미리 만들어 두는 것이 효율적(자동적으로 크기가 늘어나긴 하지만 이 과정에서 처리 시간이 더 소요됨)

    ```java
    import java.util.ArrayList;
    import java.util.List;
    
    public class ArrayListRunTimeTestBySize {
    
    	public static void main(String[] args) {
    		
    		// 초기 사이즈 미할당
    		long startTime1 = System.currentTimeMillis();
    		List list1 = new ArrayList();
    		setList(list1);
    		long endTime1 = System.currentTimeMillis();
    		
    		calcAndPrintRunTime(startTime1, endTime1, "default size(10) ArrayList");
    		
    		// 초기 사이즈 할당
    		long startTime2 = System.currentTimeMillis();
    		List list2 = new ArrayList(10_000_000+10);
    		setList(list2);
    		long endTime2 = System.currentTimeMillis();
    		calcAndPrintRunTime(startTime2, endTime2, "size(10_000_000) ArrayList");
    	}
    	
    	private static void setList(List list) {
    		for (int i = 0; i < 10_000_000; i++) {
    			list.add(i);
    		}
    	}
    	
    	private static void calcAndPrintRunTime(long startTime, long endTime, String flag) {
    		System.out.println(flag + " 소요시간: " + (endTime - startTime)); 
    	}
    }
    ```

    - 100만까지는 큰 속도 차이를 보이지 않았으나, 1000만~1억까지는 큰 속도 차이를 보임(단위: ms, 10회정도 실행 후 평균 측정)
      - 10,000,000: 300 vs 160
      - 100,000,000: 3000 vs 2000
    - 하지만 1억으로 배열의 크기가 커지면 그만큼 heap memory를 많이 할당해야 하기 때문에 상당히 큰 크기의 배열은 애초에 생성하지 않도록 하는 것이 메모리 관리에서 필요하지 않을까 생각.
    - 하지만 매우 큰 갯수만큼 할당해야 하는 것이 자명하다면, 미리 배열의 크기를 할당해놓는 것이 더 효율적
    - 10억에서는 `OutOfMemoryError: Java heap space` 에러 발생

    

##### LinkedList

- Object Array는 크기를 변경할 수 없고, 비순차적 데이터의 추가/삭제에 시간이 오래 걸림
- LinkedList는 각 node들 간의 연결로 이루어져 추가/삭제에 O(1)의 시간 소요. 단, 조회는 O(n)
- java.util.LinkedList 클래스도 doubly linked list 로 구현되어 있음



##### Stack and Queue

- 스택은 순차적으로 데이터를 추가/삭제하므로 ArrayList 같은 배열 기반의 컬렉션 클래스가 적합
- 큐는 데이터를 꺼낼 때 항상 첫번째 데이터를 삭제하므로, 추가/삭제가 더 쉬운 LinkedList로 구현

- stack

  ```java
  Stack stack = new Stack();
  
  // boolean empty()
  stack.empty();
  
  // Object peek()
  // throw EmptyStackException if stack is empty else return last element
  stack.peek();
  
  // Object pop()
  // throw EmptyStackException if stack is empty else pop the last element
  stack.pop();
  
  // Object push(Object item)
  stack.push(1);
  
  // int search(Object o)
  // if not exists return -1 else return the index
  // starting with index 1 (배열과 다름)
  stack.search(2);
  ```

- queue

  ```java
  Stack stack = new Stack();
  
  // boolean empty()
  stack.empty();
  
  // Object peek()
  // throw EmptyStackException if stack is empty else return last element
  stack.peek();
  
  // Object pop()
  // throw EmptyStackException if stack is empty else pop the last element
  stack.pop();
  
  // Object push(Object item)
  stack.push(1);
  
  // int search(Object o)
  // if not exists return -1 else return the index
  // starting with index 1 (배열과 다름)
  stack.search(2);
  
  Queue queue = new LinkedList();
  
  // boolean add(Object o)
  // offer()와 비교하여 예외를 던지느냐 false를 반환하느냐의 차이
  // and when using a capacity-restricted queue, this method is generally preferable to 'add'
  queue.add(1);
  
  // Object remove()
  // if not exists throw NoSuchElementException else pop the left object
  queue.remove();
  
  // Object element()
  // if not exists throw NoSuchElementException else return the left object
  queue.element();
  
  // boolean offer(Object o)
  queue.offer(otherQueue);
  
  // Object poll()
  // if not exists return null else pop the left object
  queue.poll();
  
  // Object peek()
  // if not exists return null else return the left object
  queue.peek();
  ```

  - Queue interface를 구현한 클래스(참고)
    - AbstractQueue, ArrayBlockingQueue, ArrayDeque, ConcurrentLinkedDeque, Priority Queue 등...

- PriorityQueue

  - Queue interface의 구현체 중의 하나로, 저장한 순서에 관계없이 우선순위가 높은 것부터 꺼냄
  - null은 저장할 수 없음(NullPointerException 발생)
  - 저장공간으로 배열을 사용하며, 각 요소를 heap 자료구조 형태로 저장

- Deque(Double Ended Queue)

  - Queue의 변형으로, 양쪽 끝에 추가/삭제 가능
  - 구현체로는 ArrayDeque, LinkedList가 있음

# Algorithm



## 시간복잡도(빅-오(O) 표기법)

- 빅-오 표기법(Big-Oh Notation)

- 시간 복잡도 함수 중에서 가장 큰 영향력을 주는 n에 대한 항만을 표시

- 계수(Coefficient)는 생략하여 표시

  `O(1), O(logn), O(n), O(nlogn), O(n**2), O(2**n), O(n!)`



## 정렬의 종류

> 2개 이상의 자료를 특정 기준에 의해 재배열 하는 것(오름차순, 내림차순)

- 버블 정렬(Bubble Sort)

  ```python
  def bubble_sort(arr):
    for i in range(len(arr)-1, 0, -1):
      for j in range(i):
        if arr[j] > arr[j+1]:
          arr[j], arr[j+1] = arr[j+1], arr[j]
  ```

  `O(n**2)` 배열의 길이 n에 대하여 각 요소에 대해 n의 시간이 필요

  

- 카운팅 정렬(Counting Sort)
  - 항목들의 순서를 결정하기 위해 집합에 각 항목이 몇 개씩 있는지 세는 작업을 하여, 선형 시간에 정렬하는 효율적인 알고리즘
  - 정수나 정수로 표현할 수 있는 자료에 한해 적용 가능(정수 항목으로 인덱스 되는 카운트들의 배열을 사용하기 때문)

  ```python
  def counting_sort(A, B, k):
    #A[1..n] 입력 배열 (1 to k)
    #B[1..n] 정렬된 배열
    #C[1..n] 카운트 배열
    
    C = [0] * k
    
    for i in range(len(B)):
    	C[A[i]] += 1
      
    for i in range(1, len(C)):
      C[i] += C[i-1]
      
    for i in range(len(B)-1, -1, -1):
      B[C[A[i]]-1] = A[i]
    	C[A[i]] -= 1
  ```

  `O(n+k)` 배열의 길이 n에 대하여 가장 큰 수 k만큼의 처리가 더 필요

  

- 선택 정렬(Selection Sort)

  - 주어진 자료들 중 가장 작은 값의 원소부터 차례대로 선택하여 위치를 교환하는 방식

    ```python
    def selection_sort(arr):
      for i in range(len(arr)-1):
        min = i
        for j in range(i+1, len(arr)):
          if a[min] > a[j]:
            min = j
          a[i], a[min] = a[min], a[i]
    ```

    `O(n**2)` 배열의 길이 n에 대하여 n만큼 최솟값을 찾아서 바꿈

    



- 퀵 정렬(Quick Sort)
- 삽입 정렬(Insertion Sort)
- 병합 정렬(Merge Sort)





## DFS(Depth First Search)

메모리에서 값이 어떻게 변하는지 항상 생각해보자



## BFS(Breadth First Search)





## 백준 특강

##### 코딩 테스트에 자주 나오는 알고리즘

- 시뮬레이션, 파싱
- 브루트 포스
- BFS
- 다이나믹 프로그래밍



##### 파싱(Parsing)

> 어떤 문자열을 의미있게 분해하는 것을 의미



##### 시뮬레이션(Simulation)

> 문제에서 어떤 동작을 제시했을 때 그대로 구현하면 되는 문제

- 문제를 정확히 읽고, 이해하고, 명시된 조건을 모두 코드로 구현해야 함



##### 브루트포스(Brute Force)

> 모든 경우의 수를 모두 검사하는 것
>
> 제한에 따라서 브루트포스로 풀 수 있는지 없는지 확인할 수 있음

- 문제의 가능한 경우의 수를 계산해본다.
- 가능한 모든 방법을 다 만들어본다.
  - 코드 -> [반복문, 재귀, 순열, 비트마스크]
  - 재귀 : 순서, 선택에 관련된 문제
- 각각의 방법을 이용해 답을 구해본다.



##### BFS

> DFS/BFS 목적은 임의의 정점에서 시자갷서, 모든 정점을 한 번씩 방문하는 것
>
> BFS는 최단 거리를 구하는 알고리즘
>
> 최소 비용 문제, 간선의 가중치가 1, 정점과 간선의 개수가 적어야
>
> 시간복잡도 : O(V(정점) + E(가중치))



##### BOJ 숨바꼭질 5(17071번)





##### 문자열 탐색

> KMP 알고리즘 공부하기



##### 브루트포스 연습용 boj 문제

N과M 8문제, NM과 K 1
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


# MergeSort

[MergeSort Visualizer](https://www.hackerearth.com/practice/algorithms/sorting/merge-sort/visualize/)

- 존 폰 노이만(John von Neumann)이 제안한 방법
- 안정 정렬, 분할정복 알고리즘 중의 하나
  - 안정 정렬 : 시간 복잡도가 최악의 경우 O(nlogn) 보장
  - 분할 정복 : 문제를 작은 2개의 문제로 분리하고 각각 해결한 뒤 결과를 모아 원래의 문제를 해결하는 방법
- 하나의 리스트를 두 개의 크기로 분할하고 분할된 부분 리스를 정렬한 다음, 두개의 정렬된 부분 리스트를 합하여 전체가 정렬된 리스가 되게 하는 방법
  - 분할(Divide): 2개의 부분 배열로 나눔
  - 정복(Conquer): 부분 배열 정렬, 부분 배열의 크기가 충분히 작지 않으면 다시 분할
  - 결합(Combine): 정렬된 부분 배열을 하나의 배열에 병합



##### Python

```python
def mergeSort_methods():
    def merge_recursion(A, p, q, r):
        i = p  # 왼쪽 배열의 시작 idx
        j = q + 1  # 오른쪽 배열의 시작 idx
        tmp = [0] * (r-p+1)

        for k in range(r-p+1):  # r-p+1 병합해야 하는 배열의 길이
            if i <= q and j <= r:
                if A[i] > A[j]:
                    tmp[k] = A[j]
                    j += 1
                else:
                    tmp[k] = A[i]
                    i += 1
            elif j <= r:
                tmp[k] = A[j]
                j += 1
            else:
                tmp[k] = A[i]
                i += 1

        for k in range(r-p+1):
            A[p+k] = tmp[k]

    def merge_loop(A, p, q, r):
        tmp = []
        i = p
        j = q+1

        while i <= q and j <= r:
            if A[i] > A[j]:
                tmp.append(A[j])
                j += 1
            else:
                tmp.append(A[i])
                i += 1
        
        while i <= q:
            tmp.append(A[i])
            i += 1
        
        while j <= r:
            tmp.append(A[j])
            j += 1

        for k in range(r-p+1):
            A[p+k] = tmp[k]
        

    def mergeSort(A, p, r):
        if p < r:
            q = (p+r) // 2
            mergeSort(A, p, q)
            mergeSort(A, q+1, r)

            # merge_recursion(A, p, q, r)
            merge_loop(A, p, q, r)


    li = [5, 2, 1, 3, 6, 4]
    mergeSort(li, 0, len(li)-1)
    print(li)

mergeSort_methods()
```


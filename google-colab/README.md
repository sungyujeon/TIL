# Google Colab 기반 Face Recognition 입문

> 목표
>
> - Google Colab 기본 사용법 학습
> - Python 코드의 GPU 가속 적용 실행 > Google Drive와 연동해 수행결과를 읽고 쓰기
> - OpenCV 라이브러리 학습
> - OpenCV API 사용한 이미지 처리
> - face_recognition package 사용한 얼굴인식 기능 개발



## Google Colab ?

- Google Colab(oratory)은 Jupyter Notebook이 실행되는 PC의 로컬 리소르를 사용하는 것과 달리 소스코드를 Google의 클라우드 컴퓨팅 환경에서 제공되는 CPU / GPU / TPU를 사용해 실행시킬 수 있고, 소스코드나 데이터를 Google Drive를 통해 불러오거나 저장할 수 있는 개발 환경
- Cloud 기반이므로 별도 설치과정이 필요 없으며 딥러닝, M/L, 데이터 사이언스 분야에서 널리 사용



## Colab - Drive 연동

- Google Drive에 파일 추가
- 해당 파일을 앱에서 열기 - Google Colab 선택

- `<>` code snippet을 통해 샘플 코드 사용



## GPU 가속 비교

CPU와 GPU를 비교하였을 때 약 35배의 차이가 있었다.

```python
import tensorflow as tf
import timeit

device_name = tf.test.gpu_device_name()

def cpu():
  with tf.device('/cpu:0'):
    random_image_cpu = tf.random.normal((100, 100, 100, 3))
    net_cpu = tf.keras.layers.Conv2D(32, 7)(random_image_cpu)
    return tf.math.reduce_sum(net_cpu)

def gpu():
  with tf.device('/device:GPU:0'):
    random_image_gpu = tf.random.normal((100, 100, 100, 3))
    net_gpu = tf.keras.layers.Conv2D(32, 7)(random_image_gpu)
    return tf.math.reduce_sum(net_gpu)
  
cpu()
gpu()

# Run the op several times.
print('Time (s) to convolve 32x7x7x3 filter over random 100x100x100x3 images '
      '(batch x height x width x channel). Sum of ten runs.')
print('CPU (s):')
cpu_time = timeit.timeit('cpu()', number=10, setup="from __main__ import cpu")
print(cpu_time)
print('GPU (s):')
gpu_time = timeit.timeit('gpu()', number=10, setup="from __main__ import gpu")
print(gpu_time)
print('GPU speedup over CPU: {}x'.format(int(cpu_time/gpu_time)))
```

```python
# 실행결과
Time (s) to convolve 32x7x7x3 filter over random 100x100x100x3 images (batch x height x width x channel). Sum of ten runs.
CPU (s):
3.862475891000031
GPU (s):
0.10837535100017703
GPU speedup over CPU: 35x
```



## Colab에서 OpenCV 라이브러리를 사용한 그래픽 처리

https://docs.opencv.org/master/dc/da5/tutorial_py_drawing_functions.html

##### cv2 method

- cv2.shape-method(canvas, arg1, arg2, color, thickness)
  - shape-method: line, rectangle, ellipse, putText etc.

  - canvas: The canvas where you want to draw the shapes

  - arg1, arg2: shape-method에 따라 필요한 값 전달

  - thickness: 굵기 값, default=1, circle에 가까운 모양일 경우 -1

    

```python
import cv2
import numpy as np
from matplotlib import pyplot as plt

# 이미지 버퍼 생성
buffer = np.full((512,512,3), 255, np.uint8)

# 이미지 버퍼 가공
# cv2.line(buffer, (123,0), (123,128), (0,255,0), 3)
# cv2.rectangle(buffer, (200, 200), (300,300), (0,255,0), 3)
# cv2.circle(buffer, (447, 63), 63, (0,255,0), -1)
# cv2.ellipse(buffer, (256,256), (100,50), 0, 0, 180, 255, -1)
font = cv2.FONT_HERSHEY_SIMPLEX
cv2.putText(buffer,'OpenCV',(10,500), font, 4, (100,123,55), 2,  cv2.LINE_AA)

# 이미지 버퍼 출력
plt.imshow(buffer)
plt.show()
```



## OpenCV API 사용한 이미지 처리





## face_recognition package 사용한 얼굴인식 기능 개발
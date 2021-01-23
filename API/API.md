# API 활용하기

> json 형태의 외부 API를 load >> dict 형태로 변환하여 활용
>
> 결과값을 코드에서 활용



### `open`

`open(*file*, *mode='r'*, *buffering=-1*, *encoding=None*, *errors=None*, *newline=None*, *closefd=True*, *opener=None*)`

- file을 열고 해당 파일 객체를 반환
- `mode` : 파일이 열리는 모드를 지정하는 선택적 문자열

- `encoding` : 파일을 디코딩하거나 인코딩하는 데 사용. 텍스트 모드에서만 사용해야 함
- `buffering` `erros` `newline` `closefd` `opener` : 추후 정리



### `JSON`

`json.load(*fp*, ***, *cls=None*, *object_hook=None*, *parse_float=None*, *parse_int=None*, *parse_constant=None*, *object_pairs_hook=None*, ***kw*)`

- `fp` `file pointer` (JSON 문서를 포함하는 `.read`를 지원하는 텍스트 파일이나 바이너리 파일)
- `fp`를 파이썬 객체로 역직렬화
- `parse_float` JSON 데이터의 float타입을 str 타입으로 변환
- `parse_int`     JSON 데이터의 int타입을 str 타입으로 변환
- `parse_constant` 잘못된 JSON nubers를 만나 예외를 던지는 대신 `NaN` `Infinity` `-Infinity` 
- `object_hook` `object_pairs_hook` : 추후 정리



##### movie 정보를 갖는 JSON 파일을 불러와 `dict` 형태의 파이썬 객체로 반환하는 예시

```python
import json
movie_json = open('data/movie.json', encoding='UTF8')
movie_dict = json.load(movie_json)
```


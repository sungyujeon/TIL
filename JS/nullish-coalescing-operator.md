# Nullish coalescing operator '??'

- is two question marks `??`
- null 또는 undefined 를 반환하면 operator 뒤의 값을 반환
- comparison with `||`
  - `??` 는 `||` 와 비슷하게 동작하지만 차이점이 존재
  - `||` returns the first truthy value
  - `??` returns the first defined value
  - ||는 false, 0, '' 들도 모두 null/undefined로 취급하지만, ?? 는 오직 null과 undefined만 falsy value로 취급함

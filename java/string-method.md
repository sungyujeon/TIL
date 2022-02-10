# String method

- String(String s)

  ```java
  String s = new String("hello");  // hello
  ```

- String(char[] value)

  ```java
  char[] c = ['a', 'e']
  String s = new String(c);  // ae
  ```

- String(StringBuffer buf)

  ```java
  String buffer sb = new StringBuffer("hello");  //hello
  ```

- char charAt(int index)

  ```java
  "hello".charAt(1);  // e
  "aeiou".charAt(2);  // i
  ```

- String[] split(String regex, int limit)

  ```java
  String string = "81-2-010";
  string.split("-");  // ["81", "2", "010"]
  string.split("-", 2);  // ["81", "2-010"]
  ```

  - [StringTokenizer](#StringTokenizer) 참조
  - 가장 큰 차이점은 split()은 regex 기준, StringTokenizer는 여러 구분자 기준



### StringTokenizer

> StringTokenizer(String str)
>
> StringTokenizer(String str, String delim)  - 구분자 추가
>
> StringTokenizer(String str, String delim, boolean returnDelims) - 토큰에 구분자 포함 여부

- 문자열을 지정한 여러 delimeter(구분자)로 쪼개주는 클래스

- 사례

  ```java
  String str = "one-two-=three end";
  StringTokenizer st = new StringTokenizer(str);  // 1번
  StringTokenizer st = new StringTokenizer(str, "-= ");  // 2번
  
  while (st.hasMoreTokens()) {
      System.out.println(st.nextToken());
      
  // 1번 출력(default whitespace(" \t\n\r\f"))
  one-two-=three
  end
      
  // 2번 출력
  one
  two
  three
  end
  
  // 3번 출력
  one
  -
  two
  -
  =
  three
   
  end
  ```

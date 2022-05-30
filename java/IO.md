# Java I/O

> 참고자료
>
> - 자바의정석



## 개념

- Input / Output 입출력
- 컴퓨터 내부 또는 외부의 장치와 프로그램 간의 데이터를 주고 받는 것

- 스트림(stream)
  - 입출력 수행 시 두 대상을 연결하고 데이터를 전송할 수 있는 연결통로가 필요한데 이를 stream이라 정의
  - 데이터를 운반하는 데 사용하는 연결통로



## 스트림

- 개념

  - 입출력 수행 시 두 대상을 연결하고 데이터를 전송할 수 있는 연결통로가 필요한데 이를 stream이라 정의
  - 데이터를 운반하는 데 사용하는 연결통로

- 바이트기반 스트림

  - `InputStream`, `OutputStream`
    - InputStream
      - int available() : 데이터 크기 반환
      - void close() : 스트림 닫고 자원 반환
      - void mark(int readlimit()) : 현재 위치 표시, readlimit 되돌아갈 수 있는 byte 수
      - void reset(long n) : mark() 호출 되었던 위치로 되돌림
      - boolean markSupported() : mark() / reset() 지원하는지 알려줌. mark/limit사용 전 지원여부 확인
      - abstract int read() : 1byte 읽어옴. 더 이상 읽어올 데이터 없으면 return -1
      - int read(byte[] b) : 배열 b의 크기만큼 읽어서 배열을 채우고 읽어 온 데이터 수 반환
      - Int read(byte[] b, int off, int len) : 최대 len개의 byte 읽어서 배열 b의 지정된 위치(off) 부터 저장
      - long skip(long n) : 스트림에서 주어진 길이(n)만큼 건너뜀
    - OutputStream
      - void close() : 입력 소스 닫고 자원 반환
      - void flush() : 스트림 버퍼에 있는 모든 내용을 출력 소스에 씀
      - abstract void write(int b) : 주어진 값을 출력 소스에 씀
      - void write(byte[] b) : 배열 b에 저장된 모든 내용 출력 소스에 씀
      - void write(byte[] b, int off, int len) : 배열 b에 저장된 내용 중에서 off번째부터 len개 만큼 읽어서 출력소스에 씀
  - FIleInputStream -> FileOutputStream :: 파일
  - ByteArrayInputStream -> ByteArrayOutputStream :: 메모리(byte배열)
  - PipedInputStream -> PipedOutputStream :: 프로세스(프로세스 간의 통신)
  - AudioInputStream -> AudioOutputStream :: 오디오장치

- 보조스트림

  - FilterInputStream -> FilterOutputStream :: 필터를 이용한 입출력 처리(Base Decorator)
  - BufferedInputStream -> BufferedOutputStream :: 버퍼를 이용한 입출력 향상
  - DataInputStream -> DataOutputStream  :: int, float 기본형 단위로 데이터 처리
  - ObjectInputStream -> ObjectOutputStream :: 데이터를 객체단위로 읽고 쓰는 데 사용(주로 파일을 이용하며 객체 직렬화와 관련 있음)
  - SequenceStream -> x :: 두 개의 스트림을 하나로 연결
  - LineNumberInputStream -> x :: 읽어 온 데이터의 라인 번호를 카운트
  - PushbackInputStream -> x :: 버퍼를 이용해 읽어 온 데이터를 다시 되돌리는 기능(unread, push back to buffer)
  - x -> PrintStream :: 버퍼를 이용해 추가적인 print관련 기능 제공(print, printf, println, etc...)

- 문자기반 스트림

  - `Reader` `Writer` 바이트기반은 입출력 단위가 1byte인데, Java에서는 한 문자를 의미하는 char형이 1byte가 아니라 2byte이기 때문에 문자기반 스트림 사용
  - FileInputStream/FileOutputStream -> FileReader/FileWriter
  - ByteArray~ -> CharArrayReader/CharArrayWriter
  - Piped~ -> PipedReader/PipedWriter
  - StringBuffer~(deprecated) -> StringReader/StringWriter

- 문자기반 보조스트림

  - BufferedInputStream/BufferedOutputStream -> BufferedReader/BufferedWriter
  - Filter~ -> FilterReader/FilterWriter
  - LineNumber~(deprecated) -> LineNumberReader
  - Print~ -> PrintWriter
  - Pushback~ -> PushbackReader

  


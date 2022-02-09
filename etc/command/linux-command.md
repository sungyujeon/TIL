# Linux Command



##### 디스크 용량 확인

> df(disk filesystem) -h(human-readable)

```bash
$ df -h  // 정리된 형태로 보기
$ df  // 기본 명령어
$ df -k  // 킬로바이트 단위
$ df -m  // 메가바이트 단위
$ df .  // 현재 디렉토리가 포함된 파티션의 남은 용량 확인
$ du  // 현재 디렉토리에서 서브 디렉토리까지 용량 확인
$ du -a  // 현재 디렉토리의 사용량 파일 단위로 출력
$ du -s  // 총 사용량
$ du -h  // 깔끔하게 보여줌
```



##### 프로세스 상태

> ps(process status) [OPTIONS]
>
> -e 커널 프로세스 제외한 모든 프로세스 출력
>
> -f full listing(uid, pid 등)

```bash
$ ps -ef | grep java
```



##### tail

> 파일의 내용을 뒤에서부터 출력

```bash
$ tail [OPTION] [FILE]
```

- Options
  - -f, -follow[={name|descriptor}]
    - 계속해서 파일의 상태를 감시하며 파일에 내용이 뒤에 추가될 때마다 새로 추가된 내용을 보여줌. 기본값은 descriptor
    - 기본값이 descriptor이기 때문에 파일 이름이 변경되면 변경된 이전 파일이 아닌 변경된 이름의 파일에 대해 내용 출력. 파일명 변경 전 파일을 보고 싶다면 `-F` 또는 `--follow=name -retry` 옵션 사용



##### 파일 목록 조회

```bash
$ ls
$ ls -l # === ll
```

- `ls` : 파일 목록 확인
- `ls -l` === `ll` : 파일 목록(권한, 소유자, 용량, 갱신일 확인)

```bash
-rw-r--r-- 1 root root 0 3월 27 01:22 test.txt
```

- `-` 파일 유형('-' 일반파일, 'd' 디렉터리, 'b' 블록 디바이스, 'c' 문자 디바이스, 'l' 링크)

- `rw-r--r--` 파일 허가권

  - r(read) 읽기 권한 / w(write) 쓰기 권한 / x(execute) 실행 권한

  - u(user), g(group), o(other) 순으로 3개씩 잘라서 표현

- `1` 링크의 수
- `root` 해당 파일에 대한 소유권을 가진 사용자 이름
- `root` 파일 소유한 그룹의 이름
- `0` 파일 크기
- `3월 27 01:22` 파일 최종 수정 일시
- `test.txt` 파일 이름



##### 로그 문자열 검색해서 해당 결과만 보기

```bash
$ cat catalina.out.2021-01-01 | grep 09:28
```

- `09:28` 문자열이 포함된 결과만 출력



```shell
$ grep -A(or -B) n file.log
```

```bash
$ sed -n '/word/,$p' test.txt
```

- text.txt 파일에서 `word`란 단어가 들어간 라인부터 끝까지 출력
- `-n` : word가 포함된 라인 찾기
- `,`(콤마) : 범위 지정
- `&` : 행의 끝



##### 파일 내용 확인(화면 단위)

```bash
$ vi {file-name}
$ /{search string}

$ more {file-name}
$ /{search string}
```

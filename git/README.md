# git command

> git 기초 명령어 정리



## 설정

### init

- `git init`
- 폴더를 git으로 관리하기 위해 `.git` 폴더를 생성하는 명령어
- 최초에 한 번만 실행하면 된다.



### status

- `git status`
- 현재 git의 상태를 출력



### log

- `git log` `git log --oneline`
- 현재 쌓여있는 commit history 출력 / 한 줄 출력



### diff

- `git diff`
- 마지막 commit과 현재 working directory 상태를 비교



### remote add

- `git remote add <별명> <주소>`
- 원격저장소 주소를 등록



## 조작

### add

- `git add <파일이름>`
  - `<파일이름>`에 `.`을 입력하면 전체 파일이 추가된다.
- working directory에 있는 파일을 staging area(INDEX)에 올림



### commit

- `git commit -m "커밋메시지"`
- staging area에 올라간 파일들을 스냅샷으로 저장



### push

- `git push <원격저장소 이름> <브랜치명>`
  - `git push origin master`
- commit history를 원격 저장소에 업로드



### reset

- `git reset <log>`
- commit 기록을 없애고 과거로 돌아감



### revert

- `git revert <log>`
- 
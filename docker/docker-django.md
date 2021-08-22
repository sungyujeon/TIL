# Docker로 Django 서버 구축하기



## 도커로 django 개발 환경 구성하기

- 도커로 여러 환경에서 동일한 서버를 배포할 수 있다는 점에 주목하면, 개발 환경도 어디서나 동일하게 구성할 수 있겠다고 상상할 수 있음

- 도커 테스트 파일 clone

  ```bash
  $ git clone https://github.com/raccoonyy/django-sample-for-docker-compose.git
  ```

  - 해당 git repo는 windows 개행 방식인 crlf 방식이므로, unix 계열의 os에서 클론을 받을 시 캐리지 리턴을 인식하지 못해 에러가 발생할 수 있다. 따라서 뒤에 config를 붙여 해당 repo를 유닉스 계열 방식의 리턴으로 바꿔줘야 한다.

    ```bash
    $ git clone https://github.com/raccoonyy/django-sample-for-docker-compose.git --config core.autocrlf=input
    ```

- 도커 이미지 빌드

  ```bash
  $ docker build -t django-sample .
  ```

  - docker-sample 이라는 도커 이미지 생성한 것임

- 도커 이미지 정상 생성 확인

  ```
  $ docker image ls | grep django-sample
  ```

- django 앱 컨테이너 실행

  ```bash
  $ docker run -it --rm \
  	-p 8000:8000 \
  	django-sample \
  	./manage.py runserver 0:8000
  ```

  - db 서버를 컨테이너로 실행하지 않고, 앱 컨테이너와 연결하지 않았으면 db 서버와 연결하지 못하는 에러가 발생하므로 db 컨테이너를 생성하고 django 앱과 연결하는 과정이 필요함

- DB 컨테이너 실행

  ```bash
  $ docker run -it --rm postgres
  ```

  - 여기서도 여전히 에러가 발생함. 왜냐하면 db를 django 앱과 연결하는 과정이 필요하기 때문임

- DB 연결하기

  - 도커 컨테이너들은 각각 격리된 환경에서 실행됨. 따라서 별도의 옵션을 지정하지 않으면 다른 컨테이너의 존재를 알 수 없음. 따라서 해당 컨테이너의 존재를 알려주기 위해 다음의 설정을 하여야 함

    - DB 컨테이너를 실행하며 컨테이너 이름을 붙이고
    - 앱 컨테이너를 실행할 때 db 컨테이너를 연결

  - DB 컨테이너 실행

    ```bash
    $ docker run --rm \
        --name db \
        -e POSTGRES_DB=djangosample \
        -e POSTGRES_USER=sampleuser \
        -e POSTGRES_PASSWORD=samplesecret \
        postgres
    ```

  - 앱 컨테이너를 실행하며 db 컨테이너를 연결(link)

    ```bash
    $ docker run -it --rm \
        -p 8000:8000 \
        --link db \
        -e DJANGO_DB_HOST=db \
        -e DJANGO_DEBUG=True \
        django-sample \
        ./manage.py runserver 0:8000
    ```



## 이제 개발만 하면 될까?

##### 도커 컨테이너 내부의 코드 업데이트 문제

- 문제점

  - 프로젝트의 Dockerfile 살펴보면 `ADD ./djangosample /app/dajngosample/` 부분이 존재. 도커 이미지가 만들어지다가 해당 코드를 만나면 컨테이너 밖의 소스 코드가 컨테이너 속에 추가되고, 이 시저무터 컨테이너 밖의 소스 코드 변경에 영향을 받지 않게 됨.
  - 그래서 평소 개발하듯 소스 코드를 아무리 수정해도 Django 개발 서버가 이를 반영하여 재시작하는 일이 발생하지 않음

- 해결

  ```bash
  $ docker run -it --rm \
      -p 8000:8000 \
      --link db \
      -e DJANGO_DB_HOST=db \
      -e DJANGO_DEBUG=True \
      --volume=$(pwd):/app/ \
      django-sample \
      ./manage.py runserver 0:8000
  ```

  - 격리된 컨테이너에 통로를 하나 만듦
  - 수정할 소스 코드의 디렉토리를 앱 컨테이너 내부의 소스코드와 연결하여, 코드를 바꿀 때마다 컨테이너 속 코드도 바뀌게 해야 함
  - 실행중인 django docker container를 종료하고 다시 실행
  - 클론 받은 repo root 폴더에서 진행
  - --volume : 이 옵션을 사용하여 로컬 디렉토리의 특정 경로를 컨테이너 내부로 마운트할 수 있음($(pwd)는 이 명령을 실행하는 현재 디렉토리의 절대 경로)



##### DB 데이터 보존 문제

- 문제점

  - DB 컨테이너를 실행하며 --rm 옵션을 지정하였는데, 이렇게 하면 DB 컨테이너 종료와 함께 컨테이너 내부에 쌓였던 DB 데이터도 모두 사라짐
  - 따라서 DB 데이터도 mount 할 필요가 있음

- 해결

  ```bash
  $ mkdir -p ./docker/data
  $ docker run -it --rm \
      --name db \
      -e POSTGRES_DB=djangosample \
      -e POSTGRES_USER=sampleuser \
      -e POSTGRES_PASSWORD=samplesecret \
      --volume=$(pwd)/docker/data:/var/lib/postgresql/data \
      postgres
  ```

  - `-p` : 존재하지 않는 중간의 디렉토리를 자동으로 생성해줌



##### 모든 개발 준비를 마쳤으니! 순서대로 container 재실행!

- DB 데이터 보존 문제를 해결하는 docker run 명령어 실행
- 도커 컨터이너 내부의 코드 업데이트 문제를 해결하는 docker run 명령어 실행
- 결과
  - Django 서버가 데이터베이스와 잘 연결되고, 소스 코드를 변경하면서 개발 서버가 알아서 재시작하며, 컨테이너를 종료해도 DB에 쌓인 데이터가 사라지지 않음





## 그래서 이 모든 코드를 매번 작성하려고?

- 문제점
  - 도커로 개발 환경을 구성하는 데 성공했지만 불편한 부분이 남았음! 옵션이 너무 장황함..
  - 수많은 옵션들을 작성하다보면 헷갈리기도 하고 빼먹기도 함
  - DB와 APP 컨테이너를 실행할 때, 반드시 DB 컨테이너를 먼저 실행하고 APP 컨테이너를 실행해야 하는데 이 순서를 맞추지 않기도 함
- 해결
  - 실행하기 불편하다는 이유로 도커를 포기하기엔 환경 독립성이 주는 장점이 너무 큼!
  - 도커 출시와 함께 독립된 개발 환경을 빠르게 구성할 수 있는 Fig 프로젝트가 나왔고, 피그가 인기를 얻자 도커는 피그 프로젝트를 흡수하여 Docker Compose 라는 이름의 도구로 만들어버림!
  - Docker Compose를 사용하면 컨테이너 실행에 필요한 옵션을 docker-compose.yml 이라는 파일에 적어둘 수 있고, 컨테이너 간 실행 순서나 의존성도 관리할 수 있음



## Docker Compose

- 선행 조건

  - 이후의 과정을 따라하려면 도커 엔진의 버전이 1.13.1 이상이어야 하고, 도커 컴포즈의 버전은 1.6.0 이상이어야 함

- docker-compose.yml 파일을 만들어보자!

  ```yaml
  version: '3'
  
  services:
    db:
      image: postgres
      volumes:
        - ./docker/data:/var/lib/postgresql/data
      environment:
        - POSTGRES_DB=sampledb
        - POSTGRES_USER=sampleuser
        - POSTGRES_PASSWORD=samplesecret
        - POSTGRES_INITDB_ARGS=--encoding=UTF-8
  
    django:
      build:
        context: .
        dockerfile: ./compose/django/Dockerfile-dev
      environment:
        - DJANGO_DEBUG=True
        - DJANGO_DB_HOST=db
        - DJANGO_DB_PORT=5432
        - DJANGO_DB_NAME=sampledb
        - DJANGO_DB_USERNAME=sampleuser
        - DJANGO_DB_PASSWORD=samplesecret
        - DJANGO_SECRET_KEY=dev_secret_key
      ports:
        - "8000:8000"
      command: 
        - python manage.py runserver 0:8000
      volumes:
        - ./:/app/
  ```

  - docker-compose.yml은 장황한 도커 실행 옵션을 미리 적어둔 문서라고 볼 수 있음

  

##### yml 설정에 대한 설명

- DB
  - `version`
    - docker-compose.yml 파일의 첫 줄에는 파일 규격 버전을 적음
    - 파일의 규격에 따라 지원하는 옵션이 달라지는데, '3' 이라고만 적으면 3으로 시작하는 최신 버전을 사용한다는 의미
  - `services`
    - 이 항목 밑에 실행하려는 컨테이너들을 정의
    - 컴포즈에서는 컨테이너 대신 서비스라는 개념을 사용
  - `db`
    - postgres 서비스의 이름을 db로 정함
  - `image`
    - db 서비스에 사용할 도커 이미지를 적음
    - 여기에서는 dockerhub의 공식 postgres 이미지를 사용
  - `volumes`
    - docker run으로 db 컨테이너를 실행할 때 --volume 옵션을 사용해 DB 데이터를 로컬 컴퓨터에 저장했던 부분과 동일
    - 다만 docker-compose.yml volumes는 상대 경로를 지정할 수 있어 편리
  - `environment`
    - docker run 명령어의 -e 옵션에 적었던 내용들
    - POSTGRES_INITDB_ARGS 부분이 추가되었는데, DB 서버의 인코딩을 UTF-8로 설정하기 위함

- DJango

  - `django`
    - 앱 서비스의 이름을 django로 지정

  - `build`
    - db 서비스와 달리 앱 서비스는 특정 이미지 대신 build 옵션을 추가
    - context는 docker build 명령을 실행할 디렉토리 경로
    - dockerfile에는 '개발용' 도커 이미지를 빌드하는 데 사용할 Dockerfile을 지정하면 됨
    - Dockerfile-dev 파일에서는 (운영용 Dockerfile과 달리) 소스코드를 컨테이너에 넣지 않음
  - `environment`
    - 각 값은 앱 서비스의 환경변수로 설정되며, Django 설정 파일(djangosample/settings.py)에서 불러와 사용하게 됨
    - DB 관련 정보들은 db 서비스에서 설정한 값들과 일치해야 함
  - `ports`
    - docker run 명령어의 -p 옵션에 해당하는 부분
  - `command`
    - docker run으로 앱 컨테이너를 실행할 때 가장 마지막에 적었던 명령어 부분
  - `volumes`
    - docker run으로 앱 컨테이너를 실행할 때 -v 옵션을 사용하여 프로젝트 루트 디렉토리를 컨테이너 안의 /app 디렉토리와 연결했던 부분





## 드디어 실행해보자!

- 실행

  ```bash
  $ docker-compose up -d
  ```

  - `-d` 옵션을 사용하지 않을 경우 현재 터미널에서 컨테이너의 로그가 출력되고 `ctl + c` 를 눌러서 프로세스를 종료하는 순간 컨테이너도 함께 정지됨
  - 길고 복잡한 명령어가 사라지고 간단한 명령어 한 줄로 개발 서버와 DB를 모두 실행했음!

- 앱 서비스에서 db 서비스를 어떻게 찾았지????

  ```yaml
  services:
  	django:
  		links:
  			- db
  ```

  - 도커 컴포즈 파일 버전 3으로 와서 links 항목을 사용하지 않더라도 한 네트워크 안에 있는 서비스끼리 서로 통신을 할 수 있기 때문에, 이 항목을 사용하지 않음!
  - docker-compose.yml 안에 있는 서비스들은 별도로 지정하지 않으면 하나의 네트워크에 속하게 됨





## 좀 더 자세히 살펴보자!

##### 개발용 Dockerfile을 별도로 관리하기

- Dockerfile-dev 는 운영용 Dockerfile 과는 달리 개발 서버에 필요 없는 내용은 지우고 개발 서버에만 필요한 내용은 추가하면 됨

- ```yaml
  FROM python:3
  
  RUN apt-get update && apt-get -y install \
  		libpq-dev
  		
  WORKDIR /app
  ADD			./requirements.txt	/app/
  RUN			pip install -r requirements.txt
  
  # ADD		./djangosample		/app/djangosample/
  # ADD		./manage.py				/app/
  
  # CMD ["python", "manage.py", "runserver", "0:8000"]
  ```

- 위 주석으로 처리한 부분은 원래 Dockerfile에는 있었지만 개발 서버용 도커 이미지에서 삭제한 내용

  - 앱코드 : 앱 코드는 컨테이너 안에 집어 넣지 않고 로컬 컴퓨터의 디렉토리를 참조(docker-compose.yml의 volume 부분)
  - CMD : docker-compose의 command로 관리하는 것이 더 쉬움



##### 더 개선할 점

- DB 데이터용 볼륨 추가

  ```yaml
  version: '3'
  
  # 변경 부분!
  volumes:
    django_sample_db_dev: {}
  
  services:
    db:
      image: postgres
      volumes:
        # 여기도!
        - django_sample_db_dev:/var/lib/postgresql/data
      environment:
        ...
  ```

  - 지금까지는 DB 실데이터를 ./docker/data에 저장하고 있었는데, 실수로 이 디렉토리를 지운다거나 소스코드 버전 관리 시스템에 들어가버리면 낭패일 수 있음

  - 이 디렉토리를 직접 관리하지 않고 도커에 맡길 수 있음

  - volumes에 django_sample_db_dev 라는 이름으로 볼륨을 만들고 아래 명령어로 볼 수 있음(볼륨은 도커가 관리하는 가상 디스크라고 생각하면 됨)

    ```bash
    $ docker volumes ls
    ```

  - 이렇게 만든 볼륨을 db 서비스에서 사용하려면, db 서비스 선언부 안에 volumes 항목을 넣고 `- 가상디스크_이름:컨테이너_속_디렉터리` 처럼 지정!

  - 이후로는 모든 DB 데이터가 `django_sample_db_dev` 볼륨에 저장됨

  - 만약 지우고 싶다면 아래 명령어를 사용!

    ```bash
    $ docker volume rm django_sample_db_dev
    ```

  

- 파이썬 로그가 한 발 느리게 출력되는 문제 수정

  ```bash
  ENV PYTHONBUFFERED=0
  ```

  - 도커 컴포즈에서 파이썬 로그가 한 발 늦게 출력된다는 느낌을 받을 때가 있음
  - 파이썬에서 출력 버퍼가 기본으로 작동하면서 출력 로그를 붙잡고 있기 때문임
  - 이 버퍼링을 없애기 위해선 PYTHONBUFFERED 환경 변수를 추가하면 됨
  - ./compose/django/Dockerfile-dev에 위 내용 추가(설정할 값은 0이든 1이든 상관 없고, 환경변수가 존재하기만 하면 됨)

- Django 서버가 데이터베이스를 못 찾아요

  ```yaml
  ./compose/django/Dockerfile-dev 마지막에 추가
  ADD		https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh /
  ```

  ```yaml
  services:
  	django:
  		command:
  			- bash
  			- -c
  			- |
  				/wait-for-it.sh db:5432 -t 10
  				python manage.py runserver 0:8000
  ```

  

  - 이는 대부분 첫 실행시에만 발생하는 문제
  - DB 서비스가 실행된 후 초기화 되기 전에 (대략 5~10초) Django 서버가 실행되기 때문
  - 가장 간단한 해결 방법은 서비스를 중지하고 다시 실행하는 것이지만 근본적인 해결책이 아님
  - 따라서 wait-for-it.sh 이라는 셸 스크립트를 사용함
    - wait-for-it.sh 은 특정 서버의 특정 포트로 접근할 수 있을 때까지 기다려주는 스크립트
    - 이 스크립트를 도커 이미지 안에 넣고, 이미지 실행 명령 앞에 붙여주면 됨
  - 이렇게 하면 db 서비스의 5432 포트가 사용 가능할 때까지 기다린 후 Django 서버가 실행되기 때문에 오류가 발생하지 않음

  

  

  

## 더 편하게 쓰고 싶다고?

##### docker-compose.yml 파일을 수정했다면?

```bash
$ docker-compose up -d [service name]
```

- docker-compose.yml 파일을 수정하고 이를 서비스에 적용하려면 서비스를 멈추고(stop), 서비스를 지우고(rm), 서비스를 시작(up) 해야함

- 하지만 up 명령만 실행해도 알아서 컨테이너를 재생성하고 서비스를 재시작해줌

  

##### Dockerfile-dev 파일을 수정했다면?

```bash
$ docker-compose up -d --build [service name]
```

- Dockerfile-dev 파일을 수정했을 땐 build 명령을 사용해 도커 이미지를 새로 만들어야 함. 이후 서비스 중지와 삭제, 재시작을 해야함
- 하지만 up 명령에 --build 옵션을 넣으면 알아서 이미지를 새로 만들고 서비스를 재시작



## POSTGRES

> ubuntu 20.04 환경에서 docker로 띄우고 있는 postgres db에 접근하여 사용

- 접속

  ```bash
  $ sudo docker exec -it <<container name or id>> /bin/bash
  $ psql --username={myusername} --dbname={mydbname}
  ```

- 조회

  - `\l` : 데이터베이스 목록 조회

- 특정 database 접속

  ```bash
  <<database_name>>=# \c {database_name}
  ```

- 테이블 생성

  ```bash
  <<database_name>>=# CREATE {TABLE_NAME} ( {attributes...} );
  ```

- 테이블 조회

  ```bash
  <<database_name>>=# SELECT * FROM {TABLE_NAME};
  ```

  


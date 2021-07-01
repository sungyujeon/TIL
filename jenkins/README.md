# Jenkins + docker를 활용한 CI/CD구축
> Jenkins는 CI/CD를 도와주는 대표적인 툴



## Jenkins & Nginx 설치 & Gitlab 연동

##### 설치

- [Docker 설치 ](https://docs.docker.com/get-docker/)

- Jenkins 설치

  - docker image 생성 및 실행

    ```bash
    $ docker run -d -u root -p 9090:8080 --name=jenkins jenkins/jenkins
    ```

##### 실행

- http://localhost:9090

- 로그인

  - admin 비밀번호 입력(확인)

    ```bash
    $ docker logs jenkins
    ```



##### Gitlab 연동

- Personal Access Tokens 발행
  - name: jenkins-deploy
  - scopes: API
  - key: 발급한 키
- Jenkins Manage 내 관련 plugins 설치
  - gitlab, Blue Ocean 관련 등
- Configure System
  - GitLab 연동 란의 Jenkins 추가
    - 위에서 발행한 Gitlab personal access tokens 입력
    - ID: gitlab 로그인 id
- 생성 테스트: Test Connection
  - success 메시지 출력 시 성공



##### Nginx 설치

- docker 이용 설치

  ```bash
  $ mkdir dist
  $ docker run --name nginx -d -p 80:80 -v 'dist 폴더 경로'/dist:/usr/share/nginx/html nginx
  ```

- /dist/index.html 파일 생성 후 localhost 서버 실행 테스트

  ```html
  <!-- /dist/index.html -->
  <h1>Test Code</h1>
  ```

  ```text
  http://localhost/index.html
  ```



## CI/CD

> 현재는 gitlab repository에 소스를 push하면 자동으로 dist 폴더까지 배포가 되는 것을 목표로 함. Pipeline, Blue Ocean 플러그인 등을 이용할 수 있음

##### Jenkins Pipeline 연결

- pipeline 생성

  - new items - name 설정 - pipline plug-in 선택

- gitlab to jenkins 트리거 전송 설정

  gitlab에 특정 이벤트(push나 merge request)가 실행되면서 파일에 변화가 생기면 해당 트리거를 jenkins에게도 알려주어야 함.

  - Jenkins 설정

    - Build Trigger 섹션 중 'Build when a change is pushed to GitLab.' 설정해야 함.

    - Build Triggers secret token

      - Build Triggers는 필요에 따라 설정하면 됨

      - push events, opened merge request events, approved merge requests(ee-only), comments, etc..

      - Build Triggers - Advanced - Generate Secret token

  - Gitlab 설정

    - setting - integration 설정

      - URL: `http://<url>/project/<pipline_name>/`

        nginx 서버가 localhost 등의 internal server일 경우 보안상 제한하는 경우가 있다. 이 경우 gitlab의 권한 설정을 다시 해주거나, secure introspectable tunnel을 열어주는 ngrok을 이용한다.

        [ngrok download](https://ngrok.com/download) >> http port tunnel 생성

        ```bash
      $ ngrok http 9090
        ```
  
      - Secret Token: 위에서 발급받은 Build Triggers secret token

      - Add webhook

- Pipeline script 작성

  ```text
  ...
  ```

  



##### Freestyle project

- new items - Freestyle project

- [gitlab -> jenkins 트리거 전송 설정](#gitlab-to-jenkins-트리거-전송-설정) 동일

- Configure

  - Source Code Management

    - Git URL, credential 등록(GitLab API Token으로 이미 등록되어 있다면 ID 중복으로 인해 추가 되지 않음. 따라서 깃랩 ID/PW로 Credentials를 등록해야 함)

  - Build Triggers 'pipeline'과 동일

  - Build Environment

    - Provide Node & npm bin/ folder to PATH(도커 jenkins 이미지 내 nodejs 설치된 경로 잡아주기 위함)
    - 이 때, nodejs plug-in이 설치되어 있어야 하며, Manage Jenkins - Global Tool Configuration 내 NodeJS installations를 등록해줘야 함

  - Build - Execute shell

    - 필요한 명령어를 shell command에 등록

      ```bash
      npm i -g yarn
      yarn install
      yarn test:unit
      yarn build
      pwd
      ls
      ```

- 연결된 원격저장소가 push나 merge 등을 통해 triggered 될 시 excute shell 명령어들이 실행됨

- jenkins와 dist 폴더를 연동하지 않았다면, jenkins 기본 workspace에 build 됨

  - build된 파일들을 가져오고 싶다면 docker container에서 파일을 이동시켜주어야 함(container to host)

    ```bash
    $ docker cp jenkins:<docker 배포 경로> <이동할 경로>
    $ docker cp jenkins:/var/jenkins_home/workspace/jenkins_pipeline_test/dist /Users/sungyujeon/dist/
    ```

    

##### Pipeline vs Freestyle project

> [해당 글](https://support.cloudbees.com/hc/en-us/articles/115003908372-Main-differences-between-Freestyle-Scripted-Pipeline-Job-Declarative-Pipeline-Job)을 참조하였습니다.

```text
Main difference

The main difference between any job and a Pipeline Job is that the Pipeline Scripted job runs on the Jenkins master, using a lightweight executor expected to use very few resources in order to translate the pipeline to atomic commands that execute or send to the agents.

In our example, in the Freestyle job everything is executed in the agent, but for the Scripted Pipeline Job, the pipeline code is translated in the master to atomic commands that are sent to the agents.
```

- pipline script는 더 가벼운 executor를 사용하여 더 적은 자원을 사용
- Freestyle project는 모든 작업이 실행되지만, pipline script에서는 jenkins 마스터에서 agent로 전송되는 atomic commands만이 실행됨




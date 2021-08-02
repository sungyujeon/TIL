# Openvidu





## Openvidu 서버 배포

> openvidu on-promises 방식으로 배포
>
> 이 방식은 low-level에 속하는 서버 설정(openvidu server, kurento media server, coturn, redis, nginx 등의 서버를 도커 컨테이너 설정만 가져와서 별도로 추가 설정 없이 사용할 수 있게 하는 것)
>
> docker-compose를 이용해 위 서버들이 실행되는 도커 컨테이너들을 관리하게 됨
>
> 기본적으로 아래 설정들은 ubuntu 환경에서 실행됨



##### Prerequisites

- i5a208.ssafy.io
  - 별도 인스턴스에서 진행하려고 했으나 설정 문제로 현재 싸피 도메인을 이용하여 배포중(별도 인스턴스 진행 시 EC2 또는 Lightsail 시도 이력은 아래 삭선 참고)

- ~~Lightsail 이용~~
  - EC2 instance가 볼륨이 10GB라 용량 부족으로 lightsail을 이용함

- ~~EC2 instance 생성(EC2 프리 티어가 10GB로 용량 부족)~~

  - 기존 제공된 ec2 instance에서는 웹 배포 서버에서 https 설정을 위해 443 포트를 사용하여 충돌이 날 가능성이 높음
  - on-promises 방식에서 nginx가 포함되어 있어 https 설정 시 동일하게 443 포트를 사용(하는 것으로 의심됨)
  - 따라서 개별 EC2 instance를 하나 설정

- Docker 설치

  - 참고자료 https://docs.docker.com/engine/install/ubuntu/

  ```bash
  $ sudo apt-get update
  $ sudo apt-get install \
      apt-transport-https \
      ca-certificates \
      curl \
      gnupg \
      lsb-release
  $ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
  $ echo \
    "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
    $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
  $ sudo apt-get update
  $ sudo apt-get install docker-ce docker-ce-cli containerd.io
  ```

- Docker-Compose 설치

  ```bash
  $ sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
  $ sudo chmod +x /usr/local/bin/docker-compose
  ```

- 보안그룹 인바운드 설정

  > 싸피에서 제공한 도메인은 모든 port가 열려 있으므로 별도 설정 불필요

  - **22 TCP**: to connect using SSH to admin OpenVidu.
  - **80 TCP**: if you select Let's Encrypt to generate an SSL certificate this port is used by the generation process.
  - **443 TCP**: OpenVidu server and application are published by default in standard https port.
  - **3478 TCP+UDP**: used by TURN server to resolve clients IPs.
  - **40000 - 57000 TCP+UDP**: used by Kurento Media Server to establish media connections.
  - **57001 - 65535 TCP+UDP**: used by TURN server to establish relayed media connections.

- Deployment

  - root 권한 설정

    ```bash
    $ sudo su
    ```

  - /opt 폴더에 설치를 권장

    ```bash
    $ cd /opt
    ```

  - openvidu 설치

    ```bash
    $ curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_openvidu_latest.sh | bash
    ```

  - configuration

    - /opt/openvidu/.env 파일 수정(letsencrypt로 수정 시)

      - DOMAIN_OR_PUBLIC_IP : 오픈바이두 서버가 사용 가능한 도메인명 또는 public ip
      - CERTIFICATE_TYPE: 증명서 타입
      - OPENVIDU_SECRET: dashboard 입장 시 로그인 패스워드(default username: OPENVIDUAPP)
      - LETSENCRYPT_EMAIL : certificate type이 letsencrypt라면 해당 증명서 발급시 입력한 이메일(아니여도 상관이 없는 것 같지만 유효한 이메일을 적어야 함)

      ```json
      DOMAIN_OR_PUBLIC_IP=i5a208.p.ssafy.io
      
      CERTIFICATE_TYPE=letsencrypt
      
      OPENVIDU_SECRET=ssafy
      
      LETSENCRYPT_EMAIL=llking829@gmail.com
      ```

  - start

    - /opt/openvidu/ 에서 실행

    ```bash
    $ ./openvidu start
    ```

    

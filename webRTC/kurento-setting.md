# WebRTC

> WebRTC(Web Real-Time Communication)은 웹 어플리케이션과 사이트가 중간자 없이 브라우저 간에 오디오나 영상 미디어를 포착하고 스트림하고, 데이터도 교환할 수 있도록 하는 기술
>
> 주로 화상 컨퍼런스, 파일 공유, 화면 공유, 방송 등에 사용



## STUN/TURN 개요

- 일반적으로 사용하는 인터넷 네트워크는 방화벽이 존재하여, NAT(Network Address Translation)을 사용해 서로 다른 네트워크 상의 서버, 호스트 등이 내부 내테으쿼를 통해 서로 매핑하여 통신하는 방식
- WebRTC는 시그널링(Signaling)이라는 통신 절차를 통해 P2P(Peer to Peer)로 통신하는데, 이 때 방화벽 뒤에 숨은 네트워크에 속한 클라이언트 Private IP들 끼리 P2P 통신이 불가하므로 중개하는 STUN 또는 TURN 서버를 사용



##### STUN(Session Traversal Utilities for NAT)

- STUN 서버는 UDP 프로토콜 기반으로 동작
- 클라이언트의 Public IP를 활용해 시그널링 수행할 수 있도록 함



##### TURN(Traversal Using Relays around NAT)

- TURN 서버는 클라이언트들이 서로 통신할 때 Public 망에 존재하는 TURN 서버를 경유하도록하여 미디어 스트리밍을 릴레이하도록 해 P2P 통신이 가능하도록 함
- TURN은 STUN의 확장 개념이며, 클라이언트가 서로 다른 NAT 또는 방화벽 뒤에 잇을 때, NAT 또는 방화벽을 순회하며 클라이언트가 중개 서버를 통해 데이터를 주고 받을 수 있도록 함



## Kurento (미디어 서버)

##### EC2 instance 접근

- EC2 instance를 생성하여 실행한다.

- 내가 진행한 방식은 cloud9 IDE를 이용해 바로 인스턴스를 생성하고 IDE를 사용하는 방향으로 접근하였다.

  - cloud9 접속 - EC2 instance 생성 - cloud9 IDE 실행

- EC2 내 Docker, Docker Compose 설치

  - 참고자료: https://docs.docker.com/engine/install/ubuntu/

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
  $ sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
  $ sudo chmod +x /usr/local/bin/docker-compose
  	
  ```

  

##### Kurento 실행

- docker 이미지를 활용해 간편하게 Kurento 미디어 서버 Docker 이미지를 실행

- 파일의 권한을 666으로 변경하여 그룹 내 다른 사용자도 접근 가능하게 변경

  ```bash
  $ sudo chmod 666 /var/run/docker.sock
  ```

- 미디어 서버의 기본 포트는 8888

  ```bash
  $ docker pull kurento/kurento-media-server:latest
  $ docker run -d --name kms --network host \
  	kurento/kurento-media-server:latest
  ```



##### STUN/TURN 서버 설치

- Coturn을 WebRTC 시그널링(Signaling)을 위한 STUN/TURN 서버로 활용

- STUN/TURN 서버는 로컬 환경에서 동작하지 않고, Public으로 동작이 가능한 AWS EC2 환경 등에서 설치되어야 함

- 아래는 Ubuntu 기준

- EC2 보안 그룹 설정 및 IP 주소 확인

  - EC2 - 보안그룹 - STUN/TURN 서버로 활용할 EC2의 보안 그룹 설정

    - 인바운드 규칙에 아래와 같이 프로토콜 및 포트 번호 허용하도록 추가

      ```txt
      3478 : UDP
      3478 : TCP
      49152-65535 : UDP
      ```

      Source 허용 범위를 Anywhere IPv4 모두 허용하는 0.0.0.0으로 설정

    - EC2 퍼블릭 IPv4 주소와 프라이빗 IPv4 주소 확인

- Coturn 설치

  ```bash
  $ sudo apt-get update && sudo apt-get install --no-install-recommends --yes \ coturn
  ```

- Coturn 설정

  - Ubuntu에서 /etc/default/coturn 파일 수정

    ```txt
    TURNSERVER_ENABLED=1
    ```

  - Ubuntu에서 /etc/turnserver.conf 파일 수정

    ```txt
    listening-port=3478
    tls-listening-port=5349
    listening-ip=<EC2 Private IPv4>
    external-ip=<EC2 Public IPv4>/<EC2 Private IPv4>
    relay-ip=<EC2 Private IPv4>
    fingerprint
    lt-cred-mech
    user=myuser:mypassword
    realm=myrealm
    log-file=/var/log/turn.log
    simple-log
    ```

  - Coturn 재가동

    ```bash
    $ sudo service coturn restart
    ```



##### Kurento STUN/TURN 서버 설정

- Kurento 미디어 서버가 STUN/TURN 서버와 함께 동작하기 위해 TUN/TURN 서버의 위치를 알려주는 설정 작업 수행

  참고: https://doc-kurento.readthedocs.io/en/latest/user/configuration.html#stun-turn-server

- Kurento Docker 컨테이너 접속

  ```bash
  $ docker ps -a
  $ docker exec -it <container_id> /bin/bash
  ```

- Kurento WebRtcEndpoint.ini 수정

  - /etc/kurento/modules/kurento/WebRtcEndpoint.conf.ini

    ```txt
    stunServerAddress=<EC2 Public IPv4>
    stunServerPort=3478
    turnURL=myuser:mypassword@<EC2 Public Ipv4>?transport=udp
    ```

    

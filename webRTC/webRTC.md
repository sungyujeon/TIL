# webRTC

> 참고자료
>
> - [MDN WebRTC_API](https://developer.mozilla.org/ko/docs/Web/API/WebRTC_API)
> - [MDN WebRTC Signaling](https://developer.mozilla.org/ko/docs/Web/API/WebRTC_API/Signaling_and_video_calling)
> - [kurento](https://www.kurento.org/)
> - [openvidu](https://openvidu.io/index)



## webRTC란?

- WebRTC(Web Real-Time Communication)는 웹 애플리케이션과 사이트가 중간자 없이 브라우저 간에 오디오나 영상 미디어를 포착하고 스트림할 뿐 아니라, 임의의 데이터도 교환할 수 있도록 하는 javascript API 또는 기술
- 즉 웹 브라우저간의 API 통신이기 때문에 프로그램 설치 없이 Peers 간 영상, 오디오, 데이터 등의 교환(통신)이 이루어질 수 있는 것
- Google 개발자들이 만들어서 W3C 등에서 표준화하여 사용
- 주로 화상 컨퍼런스, 파일 공유, 화면 공유, 방송 등에 사용



## webRTC의 동작 방식

- webRTC API는 P2P 통신이 가능하게 만들어주는데, 여전히 다른 서버의 도움이 필요함. 왜냐하면 피어들 간에 통신이 가능하기 위해서는 각 피어의 통신가능한 네트워크 주소를 알아내야 하고, 해당 통신들을 적절하게 중재해줘야 함
- ICE(Interactive Connectivity Establishment)
  - ICE는 다른 네트워크를 사용하는 브라우저가 통신하기 위해 사용되는 프레임워크
  - 양쪽 종단에 위치한 Peer는 방화벽, 프록시 등으로 인해 직접 통신이 불가능한데, 이를 가능하게 만들어주는 프레임워크라고 할 수 있음
  - 그럼 ICE 프레임워크는 어떻게 종단간 연결을 가능하게 만드는가?
  - STUN protocol을 사용하는 서버나 TURN 서버를 통해 가능하게 만듦
- STUN protocol
  - STUN(Session Traversal Utilities for NAT)은 외부 네트워크와 연결할지를 결정하기 위해 클라이언트의 public ip를 찾고 P2P로 연결을 막는 요소가 라우터에 있는지 알아냄
  - UDP 프로토콜을 기반으로 동작하며, 클라이언트의 Public IP를 활용해 시그널링을 수행할 수 있도록 함
  - ICE가 결국 Peer  to Peer 통신을 가능하게 하려면 이 STUN 서버를 통해 양 Peer 들이 Public IP를 사용해 중재되어야 함
- TURN server
  - 몇몇 라우터들은 STUN 프로토콜이 동작하는 server에서 'Symmetric NAT'라 불리는 제한이 있음
  - 이전에 연결된 적이 있는 외부 네트워크와만 통신하게 만드는 것인데, 이럴 경우 peer들끼리 새로운 연결을 수립할 수 없음
  - 따라서 TURN server는 Symmetric NAT 제한을 <b>우회</b>하여, 피어간의 연결을 'relay' 시키는데, 자원 소모가 심하기 때문에 STUN 프로토콜로 연결이 가능할 시 사용하지 않을 수 있음
- Signaling
  - 시그널링은 통신 조정 프로세스
  - 지속적인 연결이 있어야 하고, 다량의 데이터를 송수신하는 미디어 특성상 통신이 무분별하게 피어들 간에 이루어지면 심각한 부하가 생길 수 있음
  - 따라서 signaling 서버는 어떤 클라이언트가 다른 클라이언트와 연결을 수립하고 싶은지, 끊고 싶은지에 대한 정보들을 받아들여 각 피어들의 통신을 통제할 수 있음
  - 시그널링 서버는 실제 스트림 데이터가 아니라 서버와 다음의 데이터만 주고 받기 때문에 리소스를 많이 소모하지 않음
    - 통신을 열고 닫는 데 사용되는 세션 컨트롤 메시지
    - 에러 메시지
    - 코덱이나 코덱 설정, 대역폭, 미디어 타입 등 메타데이터
    - 보안 연결 수립을 위한 키 데이터
    - 네트워크 데이터
  - 이러한 정보는 Session Description 패킷에 담겨 통신되고, 이러한 통신 규약을 SDP라 함
  - SDP(Session Description Protocol)
    - PeerConnection 객체를 생성하면 해당 객체에서 offer SDP, answer SDP 패킷 얻을 수 있는데, SDP는 미디어에 대한 메타데이터로, 사용할 수 있는 코덱은 무엇이 있고, 어떤 프로토콜을 사용하는지 등의 데이터가 텍스트 형태로 명시되어 있음
- ICE 프레임워크는 결국 클라이언트의 모든 통신 가능한 주소를 식별(discovery)하는 것인데, Peer 간에 직접 연결이 가능할지, TURN 서버를 통해서 연결이 가능할지, TURN 서버를 통해 연결이 가능할지를 결정하는 역할을 하는 것이다. 이제 실제 통신이 일어날 때는 signaling 서버에서 중재를 하는 것이다.



## Peer to Peer Connection

- Peers 간 네트워크 주소를 알게 되었으므로 통신이 가능해진 것인데, ICE 프레임워크는 이를 어떻게 구현하고 있는가?

- 실시간 통신을 하기 위해 Peer들 간에 커넥션이 만들어짐
- 피어 간의 커넥션은 `RTCPeerConnection` 인터페이스를 통해 이루어짐. 
  - 세부내용 [MDN 문서](https://developer.mozilla.org/ko/docs/Web/API/RTCPeerConnection) 참조
  - 이 인터페이스는 로컬 컴퓨터와 원격 피어 간의 webRTC 연결을 담당하며, 원격 피어에 연결하기 위한 메서드들을 제공하고, 연결을 유지하고 연결 상태를 모니터링하며 더 이상 연결이 필요하지 않을 경우 연결을 종료함
- 커넥션이 이루어지고 열리게 되면, 미디어 스트림들(`MediaStream`)과 데이터 채널(`RTCDataChannel`)들을 커넥션에 연결할 수 있음
  - 즉, 커넥션이 이루어졌으면 영상/오디오 미디어스트림 또는 바이너리 데이터들을 주고 받을 수 있게 하는 것
  - MediaStream
    - 미디어 스트림들은 미디어 정보를 가지는 다수의 트랙들로 구성
    - MediaStreamTrack interface object를 베이스로 하는 트랙은 음성, 영상, 텍스트를 포함하는 다양한 미디어 데이터의 타입 중 하나를 포함할 수 있음
  - RTCDataChannel
    - 임의의 바이너리 데이터(즉 이미지, 텍스트, 파일 등 모든 데이터)를 RTCDataChannel 인터페이스를 통해 피어들 간 교환이 가능



## KMS(Kurento Media Server)

- 이상은 중간 소프트웨어 없이 웹 브라우저끼리 어떻게 P2P 통신을 하는가에 대한 이론적인 설명임

- webRTC API 통신을 하기 위해 위와 같은 서버 구축이 필요하다는 것인데, kms는 해당 미디어 트래픽이 통과하는 미들웨어라고 할 수 있음

- kms는 다음을 가능하게 함

  - group communications
  - transcoding
  - recording
  - mixing
  - broadcasting
  - routing of audiovisual flows

- 즉, kms를 중간에 거치면서 그룹콜이나 녹화 등 여러가지 기능이 가능해지는 것임

- kurento 공식 docs에서도 다음과 같이 설명함. 즉 advanced video 앱을 위해 사용됨

  `Kurento Media Server is a multimedia server package that can be used to develop advanced video applications for WebRTC platforms.`



## OpenVidu

- 그렇다면 오픈비두는 무엇인가?
- 오픈비두를 사용하지 않는다면 signaling, stun, turn 서버를 비롯해 kms도 구축해야 하며, P2P 통신을 위한 실제 구현 코드들도 직접 작성해야 할 것임
- 하지만 OpenVidu 오픈소스(물론 pro버전은 유료) application을 사용하면 해당 서버들을 openvidu application server에서 모두 구현하고 있어 사용하기만 하면 되는 것(또한 ip cameras, audio/video filter 등 다른 기능들도 제공)
- on premises 방식으로 배포했을 때 docker container 목록을 보면 다음과 같이 볼 수 있는데, signaling을 수행하는 openvidu server와 kms, turn 서버를 비롯해 프록시 서버인 nginx, 데이터 저장을 위한 redis db 서버, 실제 구현된 client app 까지도 포함되어 있음
  - **OpenVidu Server (openvidu-server)**: this is the brain of OpenVidu platform. In charge of the signaling plane.
  - **Kurento Media Server (kms)**: this is the heart of the OpenVidu platform. In charge of media plane.
  - **Coturn (coturn)**: server used to allow media communications with browsers in certain special networks.
  - **Redis (redis)**: database to manage users in Coturn server.
  - **Nginx (nginx)**: a reverse proxy used to configure SSL certificate and to allow both Openvidu Server and the Application to be served in the standard https port (443).
  - **Videoconference Application (app)**: OpenVidu Call application or any other application. Can be disabled.
- OpenVidu를 통해 우리는 여러 서버들을 설치하고 배포하는 과정을 생략하고 openvidu 서버와만 api 통신을 통해 webRTC 기술을 구현할 수 있는 것

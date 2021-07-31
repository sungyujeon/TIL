# Network 개요



## 네트워크란?

- 노드들이 데이터를 공유할 수 있게 하는 디지털 전기통신망의 하나
  - 노드: 네트워크에 속한 컴퓨터 또는 통신 장비를 뜻하는 말
- 즉, 분산되어 있는 컴퓨터를 통신망으로 연결한 것
- 네트워크에서 여러 장치들은 노드 간 연결을 사용하여 데이터를 교환
- 인터넷
  - 문서, 그림, 영상과 같은 여러 데이터를 공유하도록 구성된 가장 큰 네트워크



## 네트워크의 분류

- 크기에 따른 분류
  - LAN(Local Area Network)
    - 가까운 지역을 하나로 묶은 네트워크
  - WAN(Wide Area Network)
    - 멀리 있는 지역을 묶은 네트워크
    - 가까운 지역끼리 묶인 LAN과 LAN을 다시 하나로 묶은 것
  - MAN(Metropolitan Area Network)
  - VLAN, CAN, PAN 등
- 연결 형태에 따른 분류
  - Star
    - 중앙 장비에 모든 노드가 연결
    - LAN 대역의 네트워크 장비를 연결시킬 때 많이 사용(비용 절감)
    - 중앙 네트워크 장비에 고장이 나면 모든 네트워크 통신 마비
  - Mesh
    - 여러 노드들이 서로 그물처럼 연결
    - WAN 대역의 네트워크를 연결할 때 많이 사용
    - 한 네트워크 장비가 고장나도 다른 네트워크 통신을 통해 지속
  - Tree
    - 계층 구조로 연결
  - 링형, 버스형, 혼합형 등
  - 실제 네트워크는 여러 형태를 혼합한 형태(혼합형)



## 네트워크의 통신 방식

> 네트워크에서 데이터를 주고 받는 방식

- 유니캐스트
  - 특정 대상과 1:1로 통신
- 멀티캐스트
  - 특정 다수와 1:N으로 통신
- 브로드캐스트
  - 네트워크에 있는 모든 대상과 통신



## 네트워크 프로토콜

> 프로토콜은 일종의 약속, 양식
>
> 네트워크에서 노드와 노드가 통신할 때, 어떤 노드가 어느 노드에게 어떤 데이터를 어떻게 보내는지 작성하기 위한 양식

##### tracert 실습

- google dns server와 통신하는 실습

  ```bash
  $ tracert 8.8.8.8
  ```

- 여러 네트워크 대역들을 거쳐가며 google 서버에 도달함을 볼 수 있음



##### Wireshark 실습

- 실제 인터넷 프로토콜이 어떻게 동작하고 있는지 로그 볼 수 있음
- 프로토콜이 여러가지(ethernet, IPv4, TCP...) 같이 사용되는 것이 encapsulation





## 네트워크 모델

- TCP/IP 모델

  - 4계층: 응용
  - 3계층: 전송
  - 2계층: 네트워크
  - 1계층: 네트워크 인터페이스

- OSI 7계층 모델

  > 1984년 네트워크 통신을 체계적으로 다루는 ISO에서 표준으로 지정한 모델
  >
  > 데이터 흐름을 각 구간별로 나눠 놓은 것

  - 7계층: 응용
    - HTTP, SMTP, IMAP, POP, FTP, TELNET, SSH
  - 6계층: 표현
    - SMB, AFP, XDR
  - 5계층: 세션
    - NetBIOS
  - 4계층: 전송
    - TCP, UDP, SPX
  - 3계층: 네트워크
    - IP, ICMP, ARP, RARP, IGMP, X.25, CLNP, BGP, OSPF, RIP, IPX, DDP
  - 2계층: 데이터링크
    - 이더넷, 토큰링, PPP, HDLC, 프레임 릴레이, ISDN, ATM, 무선랜, FDDI
  - 1계층: 물리
    - 전선, 전파, 광섬유, 동축케이블, 도파관, PSTN, 리피터, DSU, CSU, 모뎀



- TCP/IP vs OSI 7 layer
  - 공통점
    - 계층적 네트워크 모델
    - 계층 간 역할 정의
  - 차이점
    - 계층의 수 차이
    - OSI는 역할 기반, TCP/IP는 프로토콜 기반
    - OSI는 통신 전반에 대한 표준, TCP/IP는 데이터 전송기술 특화
- 패킷
  - 네트워크 상에서 전달되는 데이터를 통칭하는 말
  - 데이터의 형식화된 블록
  - 제어 정보(header, (footer)) + 사용자 데이터(payload)
    - 여러 프로토콜을 이용해서 최종적으로 보낼 때 패킷을 만드는 과정(패킷을 이용한 통신과정 - 캡슐화)
    - 패킷을 받았을 때 프로토콜을 하나씩 확인하면서 데이터를 확인하는 과정(디캡슐화)
  - 계층별 패킷의 이름 PDU(Protocol Data Unit)
    - TCP + 데이터 ( Segment )
    - IPv4 + TCP + 데이터 ( Packet )
    - Ethernet + IPv4 + TCP + 데이터 ( Frame )

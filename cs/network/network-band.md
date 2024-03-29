# Network 대역

> 아래 대역들은 이론상으로 해당 IP 주소 대역을 사용할 수 있다는 것인데, 이는 이미 예약되어 사용할 수 없는 ip가 있기 때문임

##### 공인 IP 대역

- A class : <b>xxx</b>.xxx.xxx.xxx / 0.0.0.0 ~ 127.255.255.255
  - 0.0.0.0/8 == 기본 게이트웨이 ip(default route)
  - 10.0.0.0/8 ~ 10.255.255.255/8 == A class 사설 네트워크
  - 127.0.0.0/8 ~ 127.255.255.255/8 == 루프백 주소(자기자신과 통신하는 주소)
- B class : <b>xxx.xxx</b>.xxx.xxx / 128.0.0.0 ~ 191.255.255.255
  - 169.254.0.0/16 ~ 169.254.255.255/16 == 링크로컬(ip를 할당받지 못했을 때 윈도우 자체적으로 부여하는 ip, 169.254.0.0 의 경우에 IP를 설정받지 않은 컴퓨터끼리 해당 대역을 할당 받아 통신할 수 있게 됨)
  - 172.16.0.0/12 ~ 172.31.255.255/12 == B class 사설 네트워크 대역
- C class : <b>xxx.xxx.xxx</b>.xxx / 192.0.0.0 ~ 233.255.255.255
  - 192.0.2.0/24 ~ 192.0.2.255/24 == RFC 문서 또는 교육용 문서
  - 192.88.99.0/24 ~ 192.168.99.255 == IPv6 to IPv4 릴레이 애니캐스트(anycast는 IPv6에서 사용하며 송신자와 송신자 인근에 있는 소수의 수신자 간의 통신 기법)
  - 192.168.0.0/16 ~ 192.168.255.255/16 == C class 사설 네트워크 대역
  - 198.18.0.0/15 ~ 198.19.255.255/15 == 네트워크 장비의 벤치마크 테스트
- D class : xxx.xxx.xxx.xxx / 224.0.0.0 ~ 239.255.255.255
  - 멀티캐스트
- E class : xxx.xxx.xxx.xxx / 240.0.0.0 ~ 255.255.255.255
  - 실험용 IP
  - 255.255.255.255 == 브로드캐스트 IP



##### 사설 IP 대역

> 사설 네트워크는 IPv4 주소 부족 현상을 지연시킬 목적으로 사용
>
> 흔히 기업이나 공유기를 사용하는 가정에서 사용
>
> - 외부에서 대표 공인 ip만 검색되며 내부 ip는 접근할 수 없어 보안성 증가
> - 하나의 공인 ip 사용해서 여러개의 사설 ip를 사용할 수 있어 경제적

- A class : 10.0.0.0 ~ 10.255.255.255
- B class : 172.16.0.0 ~ 172.31.255.255
- C class : 192.168.0.0 ~ 192.168.255.255




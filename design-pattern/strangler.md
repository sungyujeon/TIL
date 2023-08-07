# Strangler Pattern

> 이 글은 다음 글([Micro service architecture for the legacy codebase](https://medium.com/techwasti/micro-service-architecture-for-legacy-code-base-1f7e63c5a4a8))을 번역하였습니다.

<br>

새로운 기능과 기능이 도입되면 application의 복잡성이 극적으로 증가하고 코드를 유지보수하거나 새로운 기능을 추가하는 것이 더 어려워집니다. 이러한 application은 [Big Ball of Mud](https://medium.com/techwasti/manage-big-ball-of-mud-99f76123d7d4)가 됩니다. 팀은 이렇게 복잡한 application을 유지보수하기 위해서 계속해서 노력해야 하고, 누군가는 새로운 기술이나 hosting, 아키텍쳐 패턴으로 대체할 것을 제안하게 됩니다. 그런데 전체 솔루션을 대체하는 것은 매우 어렵습니다.

업계에서는 microservice, serverless architecture라는 유행어가 있어 왔습니다. greenfield(기존 시스템과 구조가 없는 새로운 환경)에서 개발을 시작하는 것은 쉽지만, 레거시 시스템은 어떻습니까?

<br>

## Strangulation

Martin Fowler는 [Strangler Application](https://martinfowler.com/bliki/StranglerFigApplication.html) 을 다음과 같이 묘사했습니다.

> *One of the natural wonders of this area are the huge strangler vines. They seed in the upper branches of a fig tree and gradually work their way down the tree until they root in the soil. Over many years they grow into fantastic and beautiful shapes, meanwhile strangling and killing the tree that was their host.*
>
> host인 나무를 따라서 토양에 뿌리를 내린 뒤에 그 나무를 서서히 죽여버리는 strangler vines에 대한 설명

(이러한 비유는) monolith application을 micro-service, nano service architecture, 또는 해당 application에 적합한 다른 아키텍처 패턴으로 변환하는 과정을 말합니다.

<br>

## Solution

2004년 Martin Fowler는 Strangler Application Pattern을 대규모 웹 애플리케이션에서 리팩터링된 코드의 배포를 처리하는 방법(a way of handling the release of refactored code in a large web application)으로 정의했습니다. 

근본적인 전략은 [EventInterception](https://www.martinfowler.com/bliki/EventInterception.html)이고, 이것은 기능을 서서히 strangler(신규 서비스)로 이동시키고 [AssetCapture](https://www.martinfowler.com/bliki/AssetCapture.html)(기존 시스템의 하위 서비스들이라고 보면 될 듯)를 할 수 있게 합니다.

Strangler Application은 나무를 서서히 죽여가는 덩굴에 대한 추론을 기반으로 합니다. 아이디어는 application을 별개의 기능적 도메인들로 나누고 해당 도메인들은 한 번에 하나씩 새로운 micro-services-based 도메인이 되는 구조입니다. (개별 비지니스 도메인에 매핑되는 개별 URI들로 구축되는 대규모 application). 시간이 지나면 모놀리식 application을 최종적으로 중단할 때까지 `strangles`(교살)하거나 대체합니다.

Strangler Application의 단계는 다음과 같습니다.

- application에서 단독으로 기능할 수 있는 특정 부분을 선택
- 이를 수정하거나 리팩터링해서 서비스로 재구축
- 배포하는 동안 프록시 패턴을 사용하여 트래픽을 우회시킴. 이렇게 하면 legacy나 신규 사용자 모두가 사용 가능해짐. 또는 backend legacy system 으로 가는 요청을 intercept 또는 filter하는 facade를 만듦
- application이 완전히 migration 될 때까지 위 단계를 반복



이 패턴을 적용할 때의 장점은 새로운 기능을 배포할 때 `big bang migration`(한 번에 완전히 바꿔서 배포하는) 하는 것보다 더 빠른 시간 내에 구현이 가능하다는 것입니다. 또한 micro services를 도입하기 위한 점진적인 접근 방식도 제공합니다. msa로 전환하는 방식이 기존 배포 환경에서 동작하지 않는다면 필요 시 간단하게 방향을 전환(손쉽게 롤백할 수 있다 정도로 이해하면 될 듯)할 수 있습니다.



##### Strangler Pattern은 결국 다음 문제들을 해결합니다.

- Legacy code or Big ball of mud
- complicated and complex architecture
- Monolithic design
- Fragmented business rules
- Painful deployment process



##### 참고자료

> [Micro service architecture for the legacy codebase](https://medium.com/techwasti/micro-service-architecture-for-legacy-code-base-1f7e63c5a4a8) - Medium by Maheshwar Ligade
>
> [신규 포인트 시스템 전환기 #2 - 오픈 준비 단계](https://techblog.woowahan.com/2588/) - 우아한기술블로그
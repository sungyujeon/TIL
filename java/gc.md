# GC(Garbage Collection)



## GC(Garbage Collection)란?

자바에서는 C계열의 언어와 달리 메모리 관리를 개발자가 직접 하지 않습니다. Garbage Collector가 사용되지 않는 메모리에 대한 참조를 자동으로 해제하여 메모리 공간을 확보합니다.

자바에서는 버전 업그레이드를 하면서 GC 알고리즘도 같이 향상시켜왔습니다. 처리 성능을 높이고, 애플리케이션이 중단되는 시간을 최대한 줄이기 위해서입니다. GC의 대상이 되는 메모리 영역은 [JVM의 메모리 구조](https://sundotcom.tistory.com/3)에서 heap 영역인데, 자바가 처음 출시되었을 때 사용하던 mark-and-sweep 알고리즘 이후부터는 generational 개념과 동시성(concurrent) 기반으로 작동하고 있습니다. generational 기반 GC의 자세한 내용은 [NaverD2 - Java Garbage Collection](https://d2.naver.com/helloworld/1329) 글을 참고바랍니다.

이 글에서는 자바 버전이 업그레이드 되면서 발전한 GC 알고리즘의 변천사를 중심으로 살펴보도록 하겠습니다.

[Oracle blog](https://blogs.oracle.com/javamagazine/post/java-garbage-collectors-evolution)의 표를 보면 각 GC 알고리즘이 어떤 부분에 중점을 두어 개선되었는지 알 수 있습니다. 어떤(what) 부분을 개선하기 위해서 해당 알고리즘을 사용했고, 어떻게(how) 개선할 수 있었는지에 대해 큰 틀을 잡아두면 GC를 이해하는 데 더 도움이 될 것 같습니다.

| Garbage collector        | Focus area                 | Concepts                                                     |
| ------------------------ | -------------------------- | ------------------------------------------------------------ |
| Serial                   | Footprint and startup time | Single-threaded stop-the-world(STW) and generational collection |
| Parallel                 | Throughput                 | Multithreaded STW compaction and generational collection     |
| Garbage First(G1)        | Balanced performance       | Multithreaded STW compaction, concurrent liveness, and generational collection |
| Shenandoah               | Latency                    | Everything concurrent to the application                     |
| Z Garbage Collector(ZGC) | Latency                    | Everything concurrent to the application                     |

Throughput은 특정 시간에 얼마만큼의 작업을 처리할 수 있는지에 대한 양입니다. throughput을 고려했다는 것은 같은 시간에 더 많은 양의 GC 처리를 해낼 수 있다고 이해할 수 있습니다. 

Latency는 실행되고 있는 application이 GC를 위해 대기하는 시간입니다. 실행 서버가 GC 처리를 위해 더 적은 시간, 더 적은 범위만을 대기하게 하는 것입니다. 

Footprint는 메모리 관점에서 GC가 사용하는 메모리의 크기를 나타냅니다. 당장 GC를 해야 하는 메모리 공간을 분리 또는 줄일 수 있다면 그만큼 성능도 더 올라갈 것입니다. 

위 글에 따르면 throughput, latency, footprint는 상호 연결되어 있어 최적화 시 개선 영역에 대한 trade-off를 잘 고려해야 할 것입니다. 예를 들어 latency가 낮은 garbage collector는 동시에 더 많은 일을 하고 그 단계를 세분화하여 실행되기 때문에 더 많은 리소스가 소모될 것입니다.

 

#### JDK 1.0 mark-and-sweep

자바가 처음 나올 때 사용하던 GC 알고리즘은 mark-and-sweep 입니다.

Garbage Collector는 Reachability 라는 개념을 기준으로 메모리를 관리합니다. 접근하거나 사용할 수 있는 값이라는 의미로, 도달 가능한 값은 메모리에서 해제하지 않습니다. 서버가 실행되는 동안 해제하지 않는 값을 'Root' 값으로 관리하게 되는데, rechable object는 root가 참조하는 값 또는 chaining을 통해 루트로부터 참조하는 값으로 정의할 수 있습니다.

가비지 컬렉터는 root 정보를 수집하고 mark 합니다. 이후 root가 참조하고 있는 모든 객체를 방문하고 mark합니다. 또 다시 mark된 모든 객체를 방문하며 해당 객체가 참조하는 객체도 mark하는 방식을 반복합니다. 이 과정을 통해 방문한 모든 객체(rechable object)를 mark하고, mark되지 않은 도달 불가능한 값은 메모리를 해제시킵니다.



![img](https://blog.kakaocdn.net/dn/bKQvhm/btrY8i9JADA/s9TR1LHekmtxDfm53f8Zik/img.png)



 

#### JDK 1.8 Parallel GC

2014년 자바 8버전이 공개되었을 때 default GC 알고리즘은 Parallel GC 였습니다. 당시에 G1(Garbage First) GC는 실험적으로 적용되고 있었습니다. G1 GC는 곧이어 다루기로 하고, Parallel GC에 대해서 살펴보겠습니다.

Parallel GC가 이전 Serial GC와 비교되는 가장 큰 차이점은 multiple threads에서 GC를 수행해 속도를 개선했다는 점입니다. [NaverD2 - Java Garbage Collection](https://d2.naver.com/helloworld/1329) 글에서는 Parallel GC의 발전 과정을 다음과 같이, Parallel GC -> Parallel Old GC -> CMS(Concurrent Mark and Sweep) GC 단계로 나누어 설명합니다.

Parallel GC는 앞서 설명한대로 다중 스레드로 GC를 동작시키는 것입니다. Parallel Old GC는 old generation의 GC 수행 시 별도로 살아 있는 객체를 식별하는 차이가 있습니다. CMS는 여러 스레드가 실행하는 도중 live-object들을 mark and remark 하는 작업을 동시에 수행해 STW, pause time을 더 짧게 가져가는 차이가 있습니다.

Parallel GC를 사용할 때는 다음 옵션들을 통해 GC를 최적화할 수 있습니다. 각 옵션들은 pause time을 더 짧게 가져가고, 처리량은 실행 application time 대비 GC 시간의 비율을 줄이고, GC 대상이 되는 메모리 영역(footprint)를 최소화하는 전략입니다.

-XX:MaxGCPauseMillis=\<N>, -XX:GCTimeRatio=\<N>, -Xmx\<N>

 

#### JDK 9 G1 GC

jdk 1.6에서 처음 소개되어, 1.7에서 fully-supported 되었고, 9 버전부터 default GC로 채택되었습니다. 위에서 G1 GC는 Balanced performance를 주요 목표로 하고 있습니다. 이는 throughput과 latency의 균형을 맞추는 전략이라고 이해하면 될 것 같습니다.

이를 위해서 G1 GC는 메모리 영역을 여러 region으로 나누었습니다. 해당 region은 young region(generation)일수도, old region(generation)일 수도 있습니다. young region은 GC pause마다 항상 해제되어야 하지만, old region은 목표하는 pause time 만큼만 작동하도록 유연하게 조절할 수 있습니다.



![img](https://blog.kakaocdn.net/dn/NFtfF/btrZdfyMhUj/RzkjryaYMRmpQa5xiXNvtK/img.png)



위 설명처럼 region 3은 copy해야 하는 데이터가 70%나 되기 때문에 GC하지 않고 두고, region 1,2를 GC하여 새로운 영역에 할당해 메모리 영역을 확보합니다. 이러한 과정을 거쳐 pause time을 조절하는 것입니다.

하지만 메모리 관리에 추가적인 작업을 하는 데는 메모리를 더 사용하고 시간도 더 오래 걸릴 수 있습니다. old generation 영역의 데이터를 GC 한다면, 한 번에 하는 것이 일반적으로는 더 적은 자원을 사용하게 될 것입니다. 하지만 전체적으로 보면 pause time은 최소한으로 줄일 수 있습니다. 위 글에 의하면 old region에 대한 GC 시간이 young region에서 GC하는 시간과 거의 같을 수 있다고 합니다.

처음 G1 GC가 나왔을 때는 throughput이 Parallel GC 보다 낮았지만, 추후 개선의 과정을 통해서 균형을 맞춰가고 있다고 합니다. 'large objects'를 구분하여 처리량을 높일 수 있는 old region data를 별도로 관리해 쉽게(easy picking) GC 할 수 있게 하거나, 내부적인 최적화를 통해 어떤 old region을 추적할지 애플리케이션의 동작과 관련지어 판단할 수도 있다고 합니다. 이를 통해 throughput과 latency의 균형을 맞춰간 것이라고 보면 좋을 것 같습니다.

 

#### jdk 17 ZGC

jdk 11에서 소개되어 12~16 버전에서 G1 GC와 함께 사용되다 17 버전에서 64bit 플랫폼 default GC로 채택되었습니다. 

ZGC는 throughput 보다는 latency의 관점에서 문제를 해결하고자 합니다. 다른 GC 알고리즘과 비교하여 submillisecond(약 0.01ms) 가지 pause time을 줄여줍니다(jdk 1.8에서 G1 GC는 약 124ms). 모든 GC 작업을 application이 실행되는 동안 동시에 실행하고, GC가 중지되는 아주 일부의 시간에만 pause time이 발생합니다.

ZGC는 G1 GC와 비교하여 고정된 사이즈의 region을 갖는 것이 아니라 'heap arena' 라는 동적 할당/비할당이 가능한 구조를 가집니다. 이는 더 큰 heap 메모리를 효율적으로 관리할 수 있게 하여 아주 큰 메모리를 필요로하는 application에 적합합니다. 또한 'load barrier'라는 기술을 사용해 object의 변경사항을 따로 저장해두지 않고 특별한 코드를 컴파일 단계에서 삽입해 스레드가 메모리를 참조할 때 즉시 mark / relocate / remapping 하는 과정을 거칩니다.

 

[참고자료]

https://blogs.oracle.com/javamagazine/post/java-garbage-collectors-evolution

https://blogs.oracle.com/javamagazine/post/understanding-garbage-collectors

[https://docs.oracle.com/en/java/javase/18/gctuning/parallel-collector1.html](https://docs.oracle.com/en/java/javase/18/gctuning/parallel-collector1.html#GUID-DCDD6E46-0406-41D1-AB49-FB96A50EB9CE)

https://javascript.info/garbage-collection

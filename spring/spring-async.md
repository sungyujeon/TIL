# @Async

> 출처: [@gillog](https://velog.io/@gillog/Spring-Async-Annotation%EB%B9%84%EB%8F%99%EA%B8%B0-%EB%A9%94%EC%86%8C%EB%93%9C-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0)
>
> @Async는 Spring에서 제공하는 Thread Pool을 활용하는 비동기 메서드 지원 annotation



### Java

```java
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class Async {
	static ExecutorService executorService = Executors.newFixedThreadPool(5);
	
	public void asyncMethod(final String message) throws Exception {
		executorService.submit(new Runnable() {
			@Override
			public void run() {
				// do something
			}
		});
	}
}
```

- 순수 Java에서 비동기 방식으로 메서드 구현 시에는
- Runnable의 run()을 재구현하는 반복이 필요



### Spring

##### Default

```java
public class Async {
	static ExecutorService executorService = Executors.newFixedThreadPool(5);
	
    @Async
	public void asyncMethod(final String message) throws Exception {
		// do something
	}
}
```

- default: `SimpleAsyncTaskExecutor` 사용



##### Customizing

```java
import java.util.concurrent.Executor;

import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.AsyncConfigurerSupport;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

@Configuration
@EnableAsync
public class AsyncConfig extends AsyncConfigurerSupport {
    
    @Override
    public Executor getAsyncExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(5);
        executor.setMaxPoolSize(20);
        executor.setQueueCapacity(100);
        executor.setThreadNamePrefix("CUSTOM-THREAD-");
        executor.initialize();
        return executor;
    }
}
```

- @Configuration: Spring 설정 관련 Class로 @Component 등록되어 Sacnning 될 수 있음
- @EnableAsync: Spring method에서 비동기 기능을 사용하게 활성화
- CorePoolSize: 기본 실행 대기하는 Thread의 수
- MaxPoolSize: 동시 동작하는 최대 Thread 수
- QueueCapacity: MaxPoolSize 초과 요청에서 Thread 생성 요청 시, 해당 요청을  Queue에 저장하는데, 이 때 최대 수용 가능한 Queue의 수(Thread에 자리가 생기면 하나씩 빠져나가 동작)
- ThreadnamePrefix: 생성되는 Thread 접두사 지정



추가 작성 필요

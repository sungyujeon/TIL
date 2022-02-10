# Mybatis

> 개발자가 지정한 SQL, 저장 프로시저, 고급 매핑 지원하는 persistant framework
>
> SQL을 별도 파일로 분리해서 관리
>
> SqlSession과 관련된 클래스는 mybatis에서 제공하고, 개발자는 쿼리문을 작성하는 데 집중 가능(SqlSession이 하는 역할에 대한 추가 학습 필요)



## Mybatis 적용 흐름

mybatis 연동 및 기본 설정 - Controller.java - Service.java - DAO.java - Mapper.xml

- View

  nexacro X-API transaction을 통해 통신. url(e.g. /cm/cmm/retrieveIfRsltList.do)로 request mapping된 함수 호출.

  ```js
  this.fn_search = function (obj:nexacro.Button,e:nexacro.ClickEventInfo)
  {
      // 생략...
      var sSvcID  		= "retrieveifRsltRgstList"; // Transaction 서비스ID(사용자지정)
  	var sTargetUrl 		= "DataURL::cm/cmm/retrieveIfRsltList.do";
  	var sInDatasets  	= "ds_input=ds_cond";		// 송신 Dataset("input=Dataset")
  	var sOutDatasets 	= "ds_ifRsltRgst=ds_output";	// 수신 Dataset("Dataset=output")
  	var sArgument  		= "";
  	var sCallbackFunc    = "fn_callback";		// Callback 함수명
  	
  	// 트랜젝션 공통함수 호출
  	this.gfn_transaction(this,
  			sSvcID,
  			sTargetUrl, 
  			sInDatasets, 
  			sOutDatasets, 
  			sArgument, 
  			sCallbackFunc);
  };
  ```

  - sSvcID : transaction 구분 id
  - sTargetUrl : 요청 서버 url
  - sInDatasets : ds_input에 담긴 값을 ds_cond 테이블 구조의 xml로 변환한 구조로 추측(추가 공부 필요)
  - sOutDatasets : id가 ds_ifRsltRgst인 grid에 ds_output 테이블 구조의 데이터를 반영(추가 공부 필요)

- Controller
  
  controller에서 service 호출
  
  ```java
  @Controller
  public class testController {
      
      @Resource(name="testService")
  	private testService testService;
      
  	@RequestMapping(value="/test/action.do")
  	public ModelAndView getUsers(TestDTO testDTO) throws Exception{
  		
  		ModelAndView mav = null;
  		
  		try {
  			testService.getUsers();
  			mav = sendClient(testDTO, "0", "");  // 정상 흐름
  		}catch (Exception e) {
  			logger.error(e, e);
  			mav = sendClient(testDTO, "-1", TraceID.getTxID());  // 오류 흐름
  		}
  		
  		return mav;
  	}
  }
  ```
  
  - `testController`에서 `getUsers` 메서드를 호출
  - 위 메서드에서 비지니스 로직 수행
  
- Service
  
  service에서 resource 설정을 통해 DAO 객체 할당
  
  ```java
  public interface testService {
      // interface 조회 method
      void getUsers() throws Exception;
      
      // ...
  }
  ```
  
  ```java
  @Service("testService")
  public class testServiceImpl extends SoBaseService implements testService {
      @Resource(name="testDAO")
  	private TestDAO testDAO;
      
      @Override
  	public void getUsers() throws Exception {
  		List <Map> records = testDAO.getUsers(map);
  	} 
  }
  ```
  
  - map 객체를 DAO 메서드에 인자로 전달 -> 해당 메서드로 DB 결과 리스트(records) 반환
  - soBaseService에 정의된 sendController 함수에 outDataset format과 실제 결과인 records 전달 -> outDataset에 records put
  
  - 최종 결과인 outDataset이 controller에 전달
  
- DAO
  
  mybatis mapping을 통해 sql 수행한 결과값(list) 리턴
  
  ```java
  @Repository("testDAO")
  public class TestDAO extends EgovAbstractMapper {
      public List getUsers(Map params) throws Exception {
      	return selectList("testDAO.getUsers", params);
      } 
  }
  ```
  
  - @Repository annotation을 활용해 spring container에 bean으로 등록하여 관리
  - EgovAbstractMapper 클래스를 상속 받아 이미 정의된 selectList 등의 메서드 호출
  - 해당 메서드에는 Mapper.xml의 select tag id, inDataset을 인자로 전달
  - 이를 통해 Mapper.xml에 접근해 sql 수행
  
- Mapper.xml
  - sql 로직 작성



## Mybatis 활용

##### 설정

- mybatis-x.x.x.jar 파일 dependency 설정(pom.xml / maven)

- `SqlSessionFactoryBuilder` -> `SqlSessionFactory instance` -> `SqlSession instance`

  - 모든 mybatis 어플리케이션은 `SqlSessionFactoryBuilder`를 사용해 `SqlSessionFactory instance`를 만들 수 있음

  - `SqlSessionFactory`에서`SqlSession instance` 생성

    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "WEB-INF/dtd/mybatis-3-mapper.dtd">
    <mapper namespace="testDAO">
        <select id="testDAO.getUsers">
        </select>
    </mapper>
    ```

    - SqlSession을 호출하는 XML 기반의 매핑 구문



##### SQL Map XML

- SQL Map XML 파일은 첫번째(first class) 엘리먼트만을 가짐

- `select` : 매핑된 SELECT 구문

  - select element는 각각의 구문이 처리하는 방식에 대한 세부 속성 설정 가능

  - `id` : 구문을 찾기 위해 사용될 수 있는 네임스페이스 내 유일한 구분자

  - `parameterType` : 파라미터 타입(패키지 경로를 포함한 클래스명이나 별칭을 사용하면 해당 타입)

  - `resultType` : 리턴 타입(패키지 경로를 포함한 클래스명이나 별칭을 사용하면 해당 타입)

  - `resultMap` : 외부 resultMap의 참조명(패키지 경로를 포함한 클래스명이나 별칭을 사용하면 해당 타입)

    > 패키지 경로를 포함한 클래스명이나 별칭이라는 뜻은 Student class 타입으로 설정하면 해당 타입으로 파라미터를 전달하거나 return 된다는 의미임 (e.g. com.pharos.Student)
    >
    > resultType과 resultMap의 차이는 fully qualified class name or alias를 써야하고, collection 타입이라면 그 자체로 collection이 되어선 안되고 collection 타입을 포함해야 함. 반면에 resultMap은 사용자가 직접 지정하는 클래스에 매핑 가능

  - 이외에 `flushCache`, `useCache`, `timeout`, `fetchSize`, `statementType`, `resultSetType`, `databaseId`, `resultOrdered` 등이 있음(추후 정리)

- `insert` : 매핑된 INSERT 구문

- `update` : 매핑된 UPDATE 구문

- `delete` : 매핑된 DELETE 구문

- `cache` : 해당 네임스페이스를 위한 캐시 설정
- `cache-ref` : 다른 네임스페이스의 캐시 설정에 대한 참조
- `resultMap` : 데이터베이스 결과 데이터를 객체에 로드하는 방법을 정의하는 엘리먼트
- `sql` : 다른 구문에서 재사용하기 위한 SQL 조각

- 기타 활용

  - 컬럼명이 프로퍼티명과 다르다면 SQL 구문에 별칭 지정 가능

    ```xml
    <select id="getUsers" resultType="User">
      select
        user_id             as "id",
        user_name           as "userName",
        hashed_password     as "hashedPassword"
      from some_table
      where id = #{id}
    </select>
    ```

- 기타 자세한 활용이나 설정 적용은 [mybatis document(sqlmap-xml)](https://mybatis.org/mybatis-3/ko/sqlmap-xml.html) 참고



##### 동적 SQL

> mybatis의 가장 강력한 기능 중 하나는 동적 SQL 처리
>
> if, choose(when, otherwise), trim(where, set), foreach 지원

##### if

```xml
<select id="findActiveLike" resultType="Blog">
  SELECT * FROM BLOG
  WHERE state = ‘ACTIVE’
  <if test="title != null">
    AND title like #{title}
  </if>
</select>
```



##### choose, when, otherwise

> java의 switch 구문과 유사

```xml
<select id="findActiveBlogLike" resultType="Blog">
  SELECT * FROM BLOG WHERE state = ‘ACTIVE’
  <choose>
    <when test="title != null">
      AND title like #{title}
    </when>
    <when test="author != null and author.name != null">
      AND author_name like #{author.name}
    </when>
    <otherwise>
      AND featured = 1
    </otherwise>
  </choose>
</select>
```



##### trim, where, set

> if 예제를 통해 어떤 조건에도 부합하지 않으면 `WHERE`만 남게되어 에러가 나게 됨. 

추가 작성 필요

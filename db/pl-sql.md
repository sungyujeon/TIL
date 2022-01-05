# PL/SQL

> PL/SQL(Procedural Language/SQL)
>
> 블록 구조에 절차적 단위(IF, LOOP, FOR 등)로 된 코드를 포함할 수 있으며 절차적 프로그래밍 가능하게 한 TRANSACTION 처리 언어

##### 성능향상

- PL/SQL은 여러 SQL 문장을 BLOCK으로 묶고 한 번에 BLOCK 전부를 서버로 전송하기 때문에 통신량을 줄일 수 있음
- PL/SQL Engine이 SQL문과 Non SQL 문을 구분
  - Non SQL : PL/SQL Engine내의 `Procedural statement executor`가 수행
  - SQL : `SQL statement executor`가 수행



##### Syntax

> 선언부(선택), 실행부(필수), 에러처리부(선택)
>
> BEGIN, END 필수

```sql
DECLARE
	-- variables, cursor, user_defined, exeception
BEGIN
	-- SQL, PL/SQL statements;
EXCEPTION
	-- actions to perform when errors occur
END;
```



##### 변수(variables)	

- 사용

  - 선언부에서 변수 선언 및 초기화
  - 실행부에서 변수에 새 값 할당
  - 매개변수를 통해 PL/SQL 블록으로 값 전달

- 예시

  ```sql
  	v_name VARCHAR(10) := UPPER('&p_name');
  	v_sal NUMBER(7, 2) := &p_sal;
  	v_deptno NUMBER(2) := &p_deptno;
  BEGIN
  	IF v_deptno := 10 THEN
  		v_sal := v_sal * 1.2;
  	ELSIF v_deptno = 30 THEN
  		v_sal := v_sal * 1.1;
  	END IF;
  	
  	INSERT INTO emp(empno, ename, sal, deptno)
  		VALUES (empno_sequence.NEXTVAL, v_name, v_sal, v_deptno)
  END;
  ```

  ```sql
  identifier [CONSTANT] datatype [NOT NULL]
  [:= | DEFAULT expression]
  
  v_number CONSTANT NUMBER NOTNULL := 1;
  ```

- 종류

  > Scalar, Composite, Reference, LOB(large objects)

  - Scalar : 주로 단일 값. 테이블의 열에 해당하는 것

    - `%TYPE`

      - 이전에 선언된 다른 변수 또는 데이터베이스 열에 맞추어 변수를 선언하기 위해 `%TYPE` 속성 사용 가능
      - DB 테이블, 테이블에 insert/update 되는 값이라면 해당 컬럼의 데이터타입으로 사용하겠다는 의미

      ```sql
      DCLARE
      	v_empno emp.empno%TYPE := 10;
      ```

    - `BOOLEAN` 변수

      - TRUE, FALSE, NULL 지정 가능
      - 논리 연산자(AND, OR, NOT) 에 의해 연결 가능

  - Composite : 레코드 같은 조합 데이터형

    ```sql
    DECLARE
    	TYPE ename_table_type IS TABLE OF emp.ename%TYPE
    	INDEX BY BINARY_INTEGER;
    	TYPE job_table_type IS TABLE OF emp.job%TYPE
    	INDEX BY BINARY_INTEGER;
    	ename_table ename_table_type;
    	job_table job_table_type;
    	i BINARY_INTEGER := 0;
    BEGIN
    	FOR k IN (SELECT ename, job FROM emp) LOOP
            i := i + 1;
            ename_table(i) := k.ename;
            job_table(i) := k.job;
    	END LOOP;
    	
    	FOR j IN 1..i LOOP
            DBMS_OUTPUT.PUT_LINE(RPAD(ename_table(j),12) ||
            RPAD(job_table(j),9));
    	END LOOP;
    END;
    ```

    - 서로 다른 데이터형들을 논리적인 하나의 단위로 묶기 위해 사용

  - Reference : 참조 데이터형(pointer)
    - 추가 자료 필요
  - LOB : locator라 불리며 라인 밖에서 지정된 객체의 위치값
    - 텍스트, 그래픽, 이미지, 비디오클립, 소리웨이브 폼 같은 블럭을 4GB 크기까지 저장





## Subprogram(procedure, function)

> Subprogram은 매개변수를 사용할 수 있고 호출할 수 있는 PL/SQL BLOCK
>
> 일반적으로 특정 작업들을 수행하기 위해 Procedure를 사용하고, 값을 계산하기 위해 Function 사용
>
> 컴파일된 상태로 데이터베이스에 저장되어 있어 성능 향상

##### Procedure

- syntax

  ```sql
  CREATE [OR REPLACE] PROCEDURE procedure_name
  	[(arguments1, [mode1] datatype [{:= | DEFAULT} expression]
      [,arguments1, [mode2] datatype [{:= | DEFAULT} expression]
       ,...])]
  IS
  	v_value				NUMBER := 10;	
  	USER_DEFINE_ERR 	EXCEPTION;
  BEGIN
  	pl/sql_block;
  END;
  ```

  - `OR REPLACE` : procedure_name이 존재할 경우 PROCEDURE의 내용을 지우고 다시 생성
  - `argument` : 매개변수 이름
  - `IS` ~ `BEGIN` 사이에 local variable 선언 및 할당
  - `MODE` : `IN`(입력 매개변수), `OUT`(출력 매개변수), `IN OUT`(입력, 출력 매개변수)

- script 작성 예시

  ```sql
  CREATE OR REPLACE PROCEDURE SP_EMP_SAL_UPDATE(
  	p_empno IN EMP.EMPNO%TYPE,
  	p_sal IN EMP.SAL%TYPE
  )
  IS
  BEGIN
  	UPDATE EMP 
  	SET SAL = p_sal
  	WHERE EMPNO = p_empno;
  END SP_EMP_SAL_UPDATE;
  ```

- 실행

  ```sql
  -- sqlplus
  EXECUTE SP_EMP_SAL_UPDATE;
  
  -- mybatis
  <select id="testDAO.updateEmpSal" statementType="CALLABLE">
      {
          CALL SP_EMP_SAL_UPDATE
          ( #{p_empno, mode=IN, jdbcType=NUMBER, javaType=java.lang.Integer}
          , #{p_sal, mode=IN, jdbcType=NUMBER, javaType=java.lang.Integer}
          )
      }
  </select>
  ```

<br>

##### Function

> pl_sql block 내부에서 식의 일부로 함수 사용 가능

- syntax

  ```sql
  CREATE [OR REPLACE] FUNCTION function_name
  	[(argument1 [mode1] datatype [{:= | DEFAULT} expression]
      [,argument2 [mode2] datatype [{:= | DEFAULT} expression], ...])]
  RETURN data_type
  {IS | AS}
  BEGIN
  	pl/sql_block;
  END;
  ```

  - `RETURN` : return 되는 data type을 명시
  - 이외에는 procedure와 동일

- script 작성 예시

  ```sql
  CREATE OR REPLACE PROCEDURE FN_GET_ENAME(
  	v_empno IN EMP.EMPNO%TYPE
  )
  RETURN VARCHAR2
  IS
  	v_ename EMP.ENAME%TYPE;
  BEGIN
  	SELECT ENAME
  	INTO v_ename
  	FROM EMP
  	WHERE EMPNO = v_empno;
  	
  	RETURN v_ename;
  	
  END FN_GET_ENAME;
  ```

- 실행

  ```sql
  -- sqlplus
  SET SERVEROUTPUT ON
  VAR g_ename VARCHAR2
  EXECUTE :g_ename := FN_GET_ENAME(7934)
  ```

  ```sql
  -- PL/SQL BLOCK 내에서 사용 가능
  BEGIN
  	FN_GET_ENAME(7934)
  END;
  ```

  


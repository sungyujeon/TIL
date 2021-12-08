# SQL(Structured Query Language)

> oracle database 기준



## SQL 함수

##### 단일 행 함수

> 문자형, 숫자형, 날짜형, 변환형, 일반함수(NVL, DECODE)

- 특징
  - 질의에서 RETURN 되는 각각의 행에 대해 수행
  - 행별로 하나의 결과를 RETURN
  - 참조 시 사용한 데이터형과 다른 데이터형으로 결과를 RETURN 할 수 있음
  - 하나 이상의 인수를 필요로 함
  - 함수 중첩 가능(하위 level -> 상위 level)



##### DECODE 함수

> CASE, IF-THEN-ELSE-END IF문장의 조건적 조회를 가능하게 함

```sql
DECODE(col | expr, search1, result[, search2, result2, ...][,default])
DECODE(#{callSrcFlag}, 'BATCH', TO_CHAR(SYSDATE, 'YYYYMMDD'), #{baseDt})
```

- `if` callSrcFlag `==` 'BATCH' `THEN` SYSDATE `ELSE` baseDt



##  GROUP BY

```sql
SELECT [COLUMN,] group_function(column) [, group_function(column), ...]
FROM table_name
[WHERE condition]
[GROUP BY group_by_expression]
[HAVING condition]
[ORDER BY column]
```

- `GROUP BY` : 질의 결과 정렬을 위한 옵션(ASC(default), DESC)
- `group_funtion` : Group Function이 SELECT 절 뒤에서 Column과 함께 기술되면 반드시 GROUP BY 절이 기술되어야 함. 하지만 Column과 함께 기술되지 않으면 반드시 기술할 필요는 없음
- `HAVING condition` : 그룹에 대한 조건을 기술
- 기타
  - group by에서 alias 사용 불가
  - where 절을 먼저 명시하면 조건에 맞는 값들만 grouping, having 절은 grouping 이후 조건절 적용
  - grouping 된 결과는 실행 순서상 where절에 기술할 수 없으므로 해당 조건은 having에서 처리

```sql
SELECT A.GOODS_CD                 AS GOODS_CD     /*상품코드*/
	 , A.JO_DGR                   AS JO_DGR       /*작지차수*/
	 , A.MTRL_CD                  AS MTRL_CD      /*자재코드*/
	 , A.MTRL_DTL_CD              AS MTRL_DTL_CD  /*자재상세코드*/
	 , B.MTRL_KD                  AS MTRL_KD      /*자재구분*/
	 , SUM( A.RTN_QTY *(-1))      AS ALOC_QTY     /*배분수량*/
	 , SUM( A.RTN_QTY *(-1))      AS OUT_QTY      /*출고수량*/
	 , SUM( A.RTN_AMT_VATE *(-1)) AS OUT_AMT_VATE /*출고금액부가세제외 */
FROM TB_WM_MTRL_RTN     A    /*TB_WM_자재반품*/
   , TB_PM_MTRL_MSTR    B    /*TB_PM_자재마스터*/
WHERE A.COMP_KD     =    B.COMP_KD
  AND A.MTRL_CD     =    B.MTRL_CD
  AND A.MTRL_RTN_KD =    '10'                    /*자재반품구분 */
  AND A.COMP_KD     =    '1'--#{sessionCompKd}
--  AND A.RTN_DT      like #{clsnMm} || '%'
GROUP BY A.GOODS_CD
       , A.JO_DGR
       , A.MTRL_CD
       , A.MTRL_DTL_CD
       , B.MTRL_KD
```

- GOODS_CD, JO_DGR, MTRL_CD, MTRL_DTL_CD, MTRL_KD 순으로 group by 하면, 뒤에서 부터 역순으로 같은 것들을 grouping 해서 selected



## 다중 테이블 데이터 검색

##### JOIN

- JOIN의 종류
  - Cartesian Product: 모든 가능한 행들의 Join
  - Equijoin(inner join): Join 조건이 정확히 일치하는 경우 사용(일반적으로 PK, FK)
  - Non-Equijoin: Join 조건이 정확히 일치하지 않는 경우에 사용
  - Outer Join: Join 조건이 정확히 일치하지 않는 경우에도 모든 행들을 출력
  - Self Join: 하나의 테이블에서 행들을 Join 하고자 할 경우 사용
  - Set Operators: 여러 개의 SELECT 문장을 연결하여 작성

- Set Operators

  > 첫번째 SELECT 구문의 열과 두번째 SELECT 구문의 열은 1:1 대응하여 개수와 타입이 일치해야 함
  >
  > ORDER BY는 단 한 번만 기술 가능하고 SELECT 구문의 마지막에 기술

  - SET 연산자의 종류

    - UNION : 합집합(중복되는 값 한 번만 출력)
    - UNION ALL : 합집합(중복)
    - INTERSET : 교집합
    - MINUS : 차집합

  - MINUS

    ```sql
    SELECT A.GOODS_CD AS GOODS_CD
          ,TO_NUMBER(FN_SM_GET_UPRC(A.COMP_KD, '1', DECODE(#{callSrcFlag}, 'BATCH', TO_CHAR(SYSDATE, 'YYYYMMDD'), #{baseDt}), '*', A.GOODS_CD, 'S')) AS GOODS_UPRC
    FROM TB_PM_GOODS_MSTR A
    WHERE A.COMP_KD = #{sessionCompKd}
    AND A.BRND_CD IN (SELECT B.BRND_CD
                      FROM TB_SM_SHP_GOODS_BRND B
                      WHERE B.COMP_KD = A.COMP_KD
                      AND B.SHP_CD = #{shpCd})
    
    MINUS
                    
    SELECT A.GOODS_CD AS GOODS_CD
          ,TO_NUMBER(FN_SM_GET_UPRC(A.COMP_KD, '1', DECODE(#{callSrcFlag}, 'BATCH', TO_CHAR(SYSDATE -1, 'YYYYMMDD'), TO_CHAR(TO_DATE(#{baseDt}, 'YYYYMMDD') -1, 'YYYYMMDD')), '*', A.GOODS_CD, 'S')) AS GOODS_UPRC
    FROM TB_PM_GOODS_MSTR A
    WHERE A.COMP_KD = #{sessionCompKd}
    AND A.BRND_CD IN (SELECT B.BRND_CD
                      FROM TB_SM_SHP_GOODS_BRND B
                      WHERE B.COMP_KD = A.COMP_KD
                        AND B.SHP_CD = #{shpCd})) A
    ```

    - column이 `GOODS_CD`, `GOODS_UPRC` 일치하므로 set operator 사용 가능



## SUBQUERY

> subquery는 다른 SELECT 문장 절에 내장된 SELECT 문장
>
> NESTED SUBQUERY는 main query 이전에 한 번만 수행됨

- 규칙

  - 괄호로 묶어야 함
  - 두 종류의 비교 연산자들이 사용
    - 단일 행 연산자 : `=` `>` `>=` `<=` `<>` `!=`
    - 복수 행 연산자 : `IN` `NOT IN` `ANY` `ALL EXISTS`
      - ANY: 비교연산자와 SUBQUERY 사이에 넣어 개별 값과 비교(or)
      - ALL: ANY와 비슷하나 모든 값과 비교(and)

  - 연산자의 오른쪽에 나타나야 함
  - ORDER BY 사용 불가
- SUBQUERY를 사용할 수 있는 절
  - WHERE, HAVING, UPDATE
  - INSERT 구문의 INTO
  - UPDATE 구문의 SET
  - SELECT, DELETE의 FROM 절



## with

> oracle 9 이후부터 사용되었고, 이름이 부여된 서브쿼리
>
> 임시 테이블을 만드는 관점에서 VIEW와 쓰임새가 비슷하지만, VIEW는 한 번 만들면 DROP 할 때까지 없어지지 않지만, WITH 절은 한 번 실행할 쿼리문 내에서 정의되었을 경우, 그 쿼리문 안에서만 실행됨

```sql
WITH example AS
(
	SELECT 'with절'
	FROM dual
)

SELECT * FROM example;
```

- with절을 한 번만 사용하면 subquery를 만드는 것과 성능상 크게 차이가 없지만, 해당 subquery를 하나의 sql 문에서 여러 번 사용한다면, 성능상 큰 이점이 있음
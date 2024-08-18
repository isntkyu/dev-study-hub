## ep.01 CHAR vs VARCHAR

### 공통점

- 최대 저장 가능 문자 길이를 명시하는 문자열 저장 컬럼

### 차이점

- CHAR 타입은 할당된 문자 길이와 상관없이 항상 고정된 공간을 할당해서 사용한다.
- CHAR 는 최대 255 VARCHAR는 최대 16383 글자까지 저장 가능하다
- VARCHAT 타입은 실제로 저장된 문자의 바이트 수를 별도로 관리한다. (길이 저장 바이트)
- 가변길이 문자셋(UTF8MB4)을 사용하는 경우에는 CHAR 타입도 저장된 값의 길이를 같이 관리한다.
- 공간을 미리 예약하는가 하지 않는가의 차이이다.

> 일반적으로 알려진 고정길이 값인 경우에 VARCHAR 를 사용해야 한다는 인식은 아무런 의미가 없다. (바이트 하나 정도의 차이이기 때문에)

### CHAR 사용해야할 경우

- 가변 폭이 큰 경우에 낭비가 심할 수 있다. (1~ 100 글자)
- 가변 폭이 크지 않다면 낭비는 크지 않다. (90 ~100 글자)
- 자주 변경되는 경우 (특히 인덱싱 된 컬럼)

> VARCHAR 타입은 값의 길이 변경시(update) 새로운 공간을 찾아서 저장하기에 변경이 잦아지면 컴팩션이 필요할 수 있지만, CHAR 타입 사용시엔 그러한 공간 낭비를 보완할 수 있다.

---

## ep.02 VARCHAR vs TEXT

### 공통점

- 문자열 타입
- 최대 65,535 Bytes까지 저장 가능

### 차이점

- VARCHAR는 최대 글자 수 만큼만 저장 가능
- TEXT 타입은 인덱스 생성시 Prefix 길이 지정 필요
- TEXT 타입은 표현식으로만 디폴트 값 지정 가능

> VARCHAR 타입은 메모리 버퍼 공간을 미리 할당해두며 재활용하고, TEXT 타입은 필요할 때마다 할당/해제 한다. 컬럼 사용이 빈번하다면, VARCHAR 이 권장된다.
> 반면, 길이가 긴 VARCHAR 컬럼이 자주 추가된다면, Row 최대 사이즈에 영향이 가지 않도록 TEXT 타입이 권장된다.
> VARCHAR 타입은 실제 최대 사용길이 만큼 명시해야 메모리 효율 증가

### 주의사항

저장되는 값의 사이즈가 크면 Off-page 형태로 데이터가 저장될 수 있다.
이 경우에 실제 내부 페이지에는 포인터값만 저장된다.

**Off-page 컬럼 참조여부에 따라 쿼리 성능이 매우 달라진다.**

이러한 이유 때문에 쿼리의 SELECT 절에는 가능한 필요한 컬럼만 명시해야한다.

### 정리

- 저장되는 데이터 사이즈가 크고 컬럼을 자주 사용하지 않으며, 테이블 내에 다른 문자열 컬럼이 많다면 -> TEXT
- DB 메모리 용량이 충분하고 자주 사용되며, 데이터 사이즈가 많이 크지 않다면 -> VARCHAR

---

## ep.03 COUNT(\*) & COUNT(DISTINCT)

### 잘못된 기대

COUNT(\*) 쿼리는 SELECT \* 보다는 빠를 것으로 기대  
오히려 부하가 크고 오래걸린다.

ORM 에서 생성한 COUNT(DISTINCT(id))  
이게 부하가 훨씬 크다.

### COUNT(\*) 성능

일반적으로 SELECT \* 은 limit 과 사용되지만 COUNT (\*) 은그렇지 않다.  
성능은 동일하지만, 데이터가 매우 많아진다면 COUNT (\*) 이 부하가 클 수 있다.

### COUNT(\*) 성능 개선

커버링 인덱스를 활용한다.

> SELECT COUNT(index_column)

하지만, 모든 쿼리를 커버링 인덱스로 튜닝할 수는 없음

### COUNT(\*) vs COUNT(DISTINCT expor)

- COUNT(\*) 은 레코드 건수만 확인
- COUNT(DISTINCT expor) 은 임시 테이블로 중복 제거 후 건수 확인 (많은 메모리와 CPU 자원 사용)

중복 제거용 임시테이블 생성을 위해 내부적으로 insert, update를 더 사용하게 된다.

### COUNT(\*) 튜닝

- 최고의 튜닝은 쿼리 자체를 제거하는 것
- 커버링 인덱스
- 페이징 시 페이지 번호 없이 이전/이후 페이지 이동
- 대략적 건수 사용, 표시할 페이지의 레코드 만큼만 건수 확인
  - select Count(\*) from (select 1 from table limit 200) z;
  - 뒷 페이지 일 수록 느려지겠지만, 앞 쪽 페이지의 조회가 높은 서비스의 경우 효과적
- 임의의 페이지 번호는 표기
  - 페이지를 정확한 건수 기준으로 표기하지 않고 대략적으로 표기
- 통계 정보 이용
  - where조건이 없을 떄, INFORMATION_SCHEME.tables
- 제거 대상
  - where 없는 COUNT(\*)
  - where 일치 건수가 많은 COUNT(\*)
- 인덱스 활용하여 최적화 대상
  - 정확한 COUNT(\*)가 필요
  - COUNT(\*) 대상이 소량
  - where 조건이 인덱스로 커버 가능한 경우

---

## ep.04 페이징 쿼리 작성

### LIMIT & OFFSET

- DBMS 서버에 부하가 크다.
- 순차적으로 레코드를 읽을 수 밖에 없어서 쿼리 실행 횟수가 늘어날수록 점점 더 읽는 데이터가 많아짐
- 다른 방법으로는 범위 기반 방식과 데이터 개수 기반 방식이 있다.

### 범위 기반 방식

- 특정 날짜 범위나 숫자 범위를 기준으로 데이터를 나눠서 조회(where절 활용)
- 주로 배치작업에서 데이터를 날짜 범위로 나눠서 조회할 때 사용
- 여러 번 쿼리를 나누어 실행해도 쿼리가 단순하다.
- 날짜 컬럼으로 잡거나 AutoIncrement 컬럼을 기준으로 나누는 예시.

### 데이터 개수 기반 방식

- 주로 서비스 단에서 order by & limit 절이 사용됨
- n회차 쿼리마다 형태가 달라진다.
- where절에 따라 쿼리 형태가 달라진다.
- order by 컬럼에 pk를 포함시킨다.
- 이전 쿼리의 결과를 사용하여 비교 컬럼을 추가한다.
  - ex) where... and id > {이전 쿼리의 마지막 값} order by id limit 30;
- 범위 조건 사용시에는 쿼리 성능 향상을 위해 날짜 컬럼을 ORDER 시킨다. (인덱스일 경우 활용을 하기 위해)
  - ex) order by finished_at, id limit 30;
- 식별자 컬럼과 범위조건 컬럼의 값 순서가 동일하지 않은 경우에는 쿼리를 조금 더 수정해야한다.

---

## ep.05 Stored Function

- Built-in Function
- UDF
- Stored Function
  - deterministic, 동일 상태와 동일 입력일 때 동일 결과
  - <-> not deterministic

where 조건절에 deterministic 함수를 사용하면 pk를 const 타입으로 접근한다.

pk를 const 타입으로 접근하면 레코드를 1건만 읽는 다는뜻이며, 매우 빠르게 처리된다.

> not deterministic 함수는 풀스캔을 실행한다.

입력에 따라 다른 값을 반환할 수 있기 때문에 모든 row를 비교하면서 함수를 호출한다. 비교 기준 값이 **변수**이기 때문에 인덱스 최적화가 안된다.

not deterministic 으로 선언된 built-in 함수들

- uuid()
- rand()
- now()
- sysdate()
- ...

예외적으로 now() 함수는 하나의 Statement 내에서는 deterministic 처럼 작동한다. (sysdate()로 비교하면 풀스캔)

sysdate-is-now 시스템 설정을 해야 sysdate()도 now()처럼 작동한다.

함수 선언시 디폴트는 Not deterministic 이기 때문에, 옵션을 명시하자

+security 속성과 definer 속성도 정확히 이해하고 꼭 명시하자

---

## ep.06 Lateral Derived Table

- Derived Table: From 절에서 서브쿼리를 통해 생성되는 임시 테이블
- 선행 테이블의 컬럼을 참조할 수 없다.
- LDT는 선행 테이블의 컬럼을 참조할 수 있다.
- 참조한 값을 바탕으로 동적 결과 생성

> SELECT \* FROM t left join LETERAL (select ~ From a where t.column = ?) s;

select 절의 서브쿼리는 하나의 값만 반환할 수 있다.  
이 때 inner join lateral 사용하여 해결 가능하다.

inner join은 문법상 on 절이 선택사항이고,  
left join은 on 절이 필수라 on true 라도 붙여야 한다.

Select 절 내 연산 결과 반복 참조에 사용할 수 있다.  
동일한 연산을 중복하지 않을 수 있다.

> select \*  
> from t,  
>  lateral (select ~) l1,  
>  lateral (select ~) l2;

---

## ep.07 SELECRT .. FOR UPDATE

- MySQL의 SELECT는 기본적으로 잠금 없는 일관된 읽기를 제공.
  - 레코드를 읽고 있는 도중에 다른 세션이 데이터를 변경하지 못하도록 Shared Lock을 걸 수 있지만, 성능이 저하됨.
  - 반대 상황에서는 레코드 변경 세션은 Exclusive Lock을 걸어야 하고, 심각한 성능 저하 유발
  - 이런 동시 처리 성능 개선을 위해 Non-Locking Consistend Read(MVCC)
  - undo 라는 공간에 레코드를 백업하고 읽음
- Repeatable Read 격리수준에서는 하나의 트랜잭션에서 여러번 조회해도 동일한 결과를 반환

> Select .. for [UPDATE | SHARE] 는  
> 항상 격리수준과 무관하게 최신 커밋 데이터 조회  
> 즉, 일반 select와 다른 결과 받게 될 수 있음

### FOR UPDATE

- for update 구문은 exclusive lock 을 걸기 때문에 다른 트랜잭션은 대기하게되는 것.
  - 트랜잭션 내에서 사용되어야만 효과가 있다.
  - Auto-commit 모드에서는 효력이 없는 것과 마찬가지
  - 안 쓸 수 방법이 있을 수 있다.(affected_rows를 확인하는 방법 등)
  - where 조건에 필터링 조건을 잘 넣어서 잠금을 걸지 않도록 할 수 있다.
- Lock Release 조건
  - read-committed
  - binlog_format=MIXED|ROW

### FOR SHARE

- 부모 테이블의 레코드를 확인하고 자식 테이블에 INSERT 할 떄 사용
  - 부모테이블을 조회(for share) 하고 자식테이블 삽입할 때 부모 레코드를 보존하도록.
- 부모레코드를 변경해야하면 for update를 쓰는 게 맞다
  - 공유잠금에서 배타잠금으로 lock-upgrade하게 되면, 데드락 유발한다.

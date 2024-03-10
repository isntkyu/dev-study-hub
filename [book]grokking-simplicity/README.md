# 쏙쏙 들어오는 함수형 코딩

- 액션

함수를 호출하는 시점과 횟수에 의존성이 있음  
부수효과가 있음

- 계산

호출 시점과 횟수가 의미 없음  
실행 전까지 동작을 알 수 없음  
순수함수

- 데이터

실행이 불가능  
이벤트로 발생한 사실

`코드를 액션, 계산 데이터로 분류하는 것이 함수형프로그래밍의 기본이며 함수형 프로그래밍에서는 액션보단 계산, 계산보단 데이터를 선호한다.`

---

`자주 바뀌는 것부터 자주 바뀌지 않는 순서로 레이어를 구성한다.`

가장 바뀌지 않는 것은 언어레벨

> 비즈니스 규칙 > 도메인 규칙 > 기술스택

- 액션에 해당하는 것

함수호출, 메서드호출, 생성자, 표현식, 상태(값 할당, 속성삭제)

액션은 가능한 `적게, 작게 바깥쪽에`
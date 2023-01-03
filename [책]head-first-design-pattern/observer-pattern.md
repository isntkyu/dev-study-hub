# 2장

- java: https://github.com/isntkyu/head-first-design-patterns/tree/master/src/main/java/observer
- ts: https://github.com/isntkyu/typescript-head-first-design-patterns/tree/main/ObserverPattern

신문구독의 예시

- 구독자: observer (신문이 발행되면 소식을 받음)
- 신문사: subject (데이터 관리, 구독자를 등록 / 해지)

## 정의

옵저버패턴

- 한 객체의 상태가 바뀌면 그 객체에 의존하는 다른 객체에게 연락이 가고 자동으로 내용이 갱신되는 방식으로 일대다 의존성을 정의합니다.
- 보통 인터페이스로(주제, 옵저버) 구현됨
- 느슨한 결합의 좋은 예

**상호작용하는 객체 사이에는 가능하면 느슨한 결합을 사용해야한다**

**느슨한 결합을 이용하는 디자인이 훨씬 유연하고 변화에 강하다.**

- 푸시: 주제가 옵저버에게 상태를 알림
- 풀: 옵저버가 주제로부터 상태를 끌어옴 (이게 옳음)

옵저버패턴에서는 구성을 활용해서 옵저버들을 관리함.

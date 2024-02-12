## 타입스크립트 기능보다는 ECMAScript 기능을 사용하기

- 상수 열거형은 런타임에 완전히 제거된다. preserveConstEnums 설정해야 유지됨.
    - js와 ts에서의 동작이 다르다.
    - 리터럴 유니온을 사용하자.
- 매개변수 속성(constructor(public name: string)) 과 일반 멤버변수를 혼용하지 말자.

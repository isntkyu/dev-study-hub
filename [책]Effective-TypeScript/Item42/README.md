## 모르는 타입의 값에는 any 대신 unknown 사용하기

- 어떠한 타입이든 unknown과 any에 대입가능
- unknown은 오직 unknown과 any만 할당가능
- never < -> unknown
- unknown은 타입 단언을 해야 사용가능

가끔은 제네릭보다 unknown을 반환하여 사용자가 직접 단언을 사용하게 하는 것이 안전할 때도 있다.

{} 타입과 unknown의 차이점은 {}는 null, undefined가 불가능하다는 점. (object 타입은 객체와 배열만 포함)
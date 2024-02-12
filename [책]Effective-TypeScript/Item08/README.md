### 타입 공간과 값 공간의 심벌 구분하기

```ts
class Cylinder {}

const v = typeof Cylinder
type T = typeof Cylinder
```

v는 값이 function 이다. (클래스는 js에서는 실제 함수로 구현됨)

T는 인스턴스 타입이 아닌 생성자 함수다.

> 타입스크립트에서 typeof class는 그 클래스의 타입이다.

인스턴스 타입을 사용하려면 `type C = InstanceType<typeof Cylinder>`

---

알기 쉬운 예시
```ts
type T = Cylinder
type T = InstanceType<typeof Cylinder>

const cylinder = new Cylinder()
type T = typeof cylinder
```

위의 3가지 T 는 모두 같다. (인스턴스 타입)

다만 `type T = InstanceType<typeof cylinder>`는 타입에러다.

InstanceType는 클래스 생성자 함수(typeof class)를 인자로 받는다 .

---

그 외

- 속성 접근자 []
- 타입스크립트의 this (다형성 this)
- 
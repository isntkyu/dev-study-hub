# zerocho- 타입스크립트 올인원 Part: 1

---

- type 자리( : 뒤)를 비워도 동작 가능한 자바스크립트 코드여야 한다.

```ts
const a: number = 1;

...

const a = 1;
```

- 화살표 함수의 타입 정의하기.
  리턴 타입도 화살표로 표시한다.

```ts
type Add = (x: number, y: number) => number;
```

- 인터페이스로 함수 타입 정의하기.

```ts
interface Add {
  (x: number, y: number): number;
}
```

- 튜플은 고정된 길이의 배열이다. (개수를 맞춰야함)

```ts
const a: [number, number, string] = [1, 2, "4"];
```

- 값이 타입의 역할을 할 수 있고 const 로 정의된 변수에 굳이 타입을 넓혀 정의할 필요는 없다.

```ts
const a = 5;

// 를

const a: number = 5;

// 로 타이핑을 필요는 없는게, 어차피 값이 5에서 변하지 않는 const 이기 떄문
```

- 추론을 활용하여 타입스크립트의 실수와 장점을 확인해가며 타이핑!

- 자바스크립트에서는 사라지는 타입스크립트 문법

  - interface
  - type
  - generic
  - :
  - enum
  - declare
  - as
  - 타입처럼 쓰이는 함수 선언 ex)function add (x: number, y: number) : number;
  - !
    - ! 는 절대 비추천. 차라리 | null 등을 써라.

- 빈배열 선언시 타입을 넣는다. 아니면 never 타입 배열로 인식된다.

```ts
const a = []; //never[]

const a: string = []; // string[]
```

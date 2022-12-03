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

- String(X), string(O)

대문자 스트링을 사용하지마라.

- Template Literal Types

```ts
type A = "a" | "b";
type BACKTICK = `hello ${A}`;
```

- rest 파라미터

rest 파라미터에도 타입을 붙일 수 있다.

- tuple

타입과 개수를 잡아주는 Array 타입인데.
push 함수로는 추가 가능함.

- enum

```ts
const enum Direction {
  UP = 0,
  DOWN = 1,
  LEFT = 2,
  RIGHT = 3,
}
```

enum도 타입처럼 쓸 수 있음.

아래와 똑같음. 하지만 enum 은 JS 에서 사라짐.
아래의 as const 도 사라짐.

```ts
const Direction = {
  UP: 0,
  DOWN: 1,
  LEFT: 2,
  RIGHT: 3,
} as const;
```

as const: 엄격히 상수로 타이핑.

enum 을 안쓰면,

> type Direction = typeof D[keyof typeof D];

```ts
const obj = { a: "123", b: "hello" } as const;
type key = typeof obj[keyof typeof obj]; // 밸류를 타이핑.
```

- type 보단 interface에 객체지향프로그래밍에 필요한 기능이 많다.

- union (|)

typesript가 착각하기 쉽다. (string | number 의 경우 예시)

- intersection(&)

type A = obj & obj
객체타입을 전부 만족시켜야할 때 사용.
객체의 모든속성을 다 만족해야한다.

- type 확장.

```ts
type A = { a: 1 };
type B = A & { b: 1 };
type C = B & { c: 1 };

const c: C = { a: 1, b: 2, c: 3 };
```

- interface 확장

```ts
interface A {
  a: number;
}
interface B extends A {
  b: string;
}

const b: B = { a: 1, b: "str" };
```

type을 extends도 가능.

**extends 하지 않고 여러번 선언해도 확장됨.**

```ts
interface A {
  a: number;
}
interface A {
  b: string;
}

const b: B = { a: 1, b: "str" };
```

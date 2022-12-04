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

- 좁은타입과 넓은타입

any <-> never
상세할수록 좁은타입임.

- 잉여 속성 체크

변수에 타입을 선엄함과 동시에 오브젝트 리터럴로 만들게 되면 잉여속성이 체크됨.

```ts
interface A {
  a: number;
  b: string;
}

const a: A = {
  a: 1,
  b: "str",
  c: 1, //  error
};
```

하지만 변수에 담아서 사용하면 체크되지 않음.

```ts
interface A {
  a: number;
  b: string;
}
const foo = {
  a: 1,
  b: "str",
  c: 1, //  error
};

const a: A = foo; // not error
```

- void

return undefined 는 가능 return null은 안됨.

매개변수(콜백), 메소드(인터페이스, 선언)에서는 return 해도 됨. (사용하지 않겟다는 의미)
함수에서는 return 하면 안됨. (리턴이 없다는 의미)

- declare로 함수를 선언하면 js 에서는 사라지며 구현이 없어도된다.

- 그래도 void를 사용할 떄 리턴을 하면 안되는 이유

```ts
interface A {
  talk: () => void;
}
const a: A = {
  talk() {
    return 3;
  },
};

const b = a.talk();
```

위의 코드에서 b 의 타입은 void 로 추론됨. 뒤에 as unknown as number 붙이면됨.

- any보다는 차라리 unknown 을 쓴다.

unknown을 쓰면 나중에 사용시에 as 로 타이핑해서 서야한다.

```ts
try {
} catch (err) {
  (error as Error).message;
}
```

- 타입 가드 (기법)

타입에러메시지는 마지막거만 보면된다.

```ts
if (typeof a === "number") a.toFixed(1);
```

union 타입일 때 구분을 위해 사용한다.

- class를 타입으로 쓰면 인스턴스를 대입해야하는 것.

union class type 에서 타입가드는 **instanceof** 사용

내부 속성 값 비교를 if 문에 넣어도 타입추론이 된다. (똑똑한 듯)

- in 연산자

클래스간 타입 가드 사용시에 if ('속성명' in A) 로 사용 가능하다.

- is 연산자

타입 판별을 커스텀할 때 사용.
return 타입에 is 를 넣어야 구별해준다.

- {} 과 Object

{}: 문자열도 대입 됨. 모든 타입을 말하는 것.

- 4.8 버전 unknown = {} | null | undefined

- 인덱스드 시그니처

{ [key: string]: number }

- 맵드 타입스

키를 제한하기.

```ts
type A = "a" | "b";
type B = { [key in A]: number };
const b: B = { a: 1, b: 2 };
```

값도 방식으로 제한 가능.

- Class

생성자에서 매개변수를 받으면서 값을 넣을 수도 있다.

> constructor(a: number = 123) {}

클래스의 타입은 typeof Class 이고 그냥 Class는 인스턴스를 가리킨다.

- 자바스크립트의 프라이빗(#) 보다는 타입스트립트의 private을 쓰자.

---

- 제네릭: 선언이 아닌 사용할 때 타입이 정해지는 것.

T extends 를 사용하면 제네릭으로 들어올 수 있는 타입을 제한할 수도 있다.

여러 제네릭 받기도 가능.

> <T extends number, F extends string>

- 함수모양의 제네릭 제한

> <T extends (...args: any) => any>

- 생성자로 제한하기

> <T extends abstract new (...args: any) => any>

- 인자에 기본값 대입하기 (ES2015에서 가능)

- Partial

본체의 프로퍼티들을 옵셔널로 만든다.

직접 구현하기

```ts
type Partial<T> = {
  [key in keyof T]?: T[key];
};
```

타입을 속성을 가져올 수 있음

```ts
interface Profile {
  name: string;
}
type Name = Profile["name"];
```

- Pick, Omit

Pick <-> Omit(선택한 속성을 빼는것.)

```ts
type Pick<T, S extends keyof T> = {
  [key in S]: T[key];
};
```

- Omit

pick과 exclude의 조합

```ts
type ExcludeB = Exclude<keyof B, "b">;

type Omit<T, S extends keyof any> = Pick<T, Exclude<keyof T, S>>;
```

- 제네릭간의 삼항연산

```ts
type Extract<T, U> = T extends U ? T : never;
```

- Required

'-?' 옵셔널제거

```ts
type R<T> = {
  [key in keyof T]-?: T[key];
};
```

- Readonly

-readonly 도 가능 (떼버리는 것)

```ts
type R<T> = {
  readonly [key in keyof T]: T[key];
};
```

- Record

```ts
type R<T extends keyof any, S> = {
  [key in T]: S;
};
```

- NonNullable

non nullable 한 타입(key)만 가져옴.

```ts
type N<T> = T extends null | undefined ? never : T;
```

---

- infer

```ts
function A(
  x: number,
  y: number,
  z: boolean
): {
  x: number;
  y: number;
  z: boolean;
} {}

type Params = Parameters<typeof A>;
type NUMBER = Params[0];

type Parameters<T extends (...args: any) => any> = T extends (
  ...args: infer A
) => any
  ? A
  : never;

type ReturnType<T extends (...args: any) => any> = T extends (
  ...args: any
) => infer A
  ? A
  : never;
```

Parameters, ReturnType 은 있는 타입임.

infer: 추론

생성자 타입 가져오려면, **infer abstract new (...args: any) => any**

- Lowercase<>, Uppercase<>

intrinsic.
구현부가 ts로 구현이 안됨.

---

- Promise.all

keyof Array: 어레이 객체의 속성, 인덱스(string)

```ts
all<T extends readonly unknown[] | []>(values: T): Promise<(-readonly [P in keyof T]: Awaited<T[P]>)>;
```

- Awaited

conditional type과 infer 타입추론 재귀 방식으로 최종 타입을 추론한다.

---

- bind

```ts
type T = ThisParameterType<typeof a>;

type NoThis = OmitThisParameter<typeof a>;

// this 를 없앤 함수를 뽑아냄 .
```

현재 bind는 5개 이상의 파라미터를 받는 경우는 그대로 타입을 반환함.
5개정도면 실제 유스케이스는 전부 커버가 가능하긴 함. 문법적 한계.

5개 이상의 경우 타입추론, 타입에러 이상할 수 있음.

---

- flat

typescript 배열 의 인덱스로 -1 을 구현함. [-1, 0 ...][depth] (ts에서는 마이너스가 안됨.)

20차원끼지만 구현되어있음.

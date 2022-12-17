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

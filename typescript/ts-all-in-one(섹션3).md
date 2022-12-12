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

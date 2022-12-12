- Partial

본체의 프로퍼티들을 옵셔널로 만든다.

직접 구현하기

```ts
type P<T> = {
  [key in keyof T]?: string;
};
```

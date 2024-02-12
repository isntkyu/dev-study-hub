## 동적 데이터에 인덱스 시그니처 사용하기

키의 타입: string, number, symbol

*Record*

```ts
type R = Record<'x' | 'y', string>;
type R = { [k in 'x' | 'y']: string };
type R = {
    x: string
    y: string
}
```


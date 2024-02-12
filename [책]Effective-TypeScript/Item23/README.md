## 한꺼번에 객체 생성하기

객체는 한번에 만들기  
여러 객체 조합은 스프레스 연산사용하기.
> 조건부로 속성 추가하지 않는 팁 ( ...(var ? { a: 'a' }: {} //or null ))  
    옵셔널 속성이 됨  
> 이 때 추가할 객체에 속성이 여러개라면 유니온 타입이 된다.!!

example

```ts
let b: boolean = false
const a = { foo: 'f', var: 'v'}
const b = {
    ...a,
    ...(b ? { cdd: 'c' }: {})
} // cdd?: string

const c = {
    ...a,
    ...(b ? { cdd: 'c', ee: 'e' }: null)
} // { ...a, ...b } | { ...a }

```


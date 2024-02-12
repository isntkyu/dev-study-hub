## 부정확한 타입보다는 미완성 타입을 사용하기

배열을 인터페이스로 타이핑하는법
```ts
interface Arr {
    0: number
    1: string
    // ..
    length: 2 // 짝수 등으로 제한 가능
}
```
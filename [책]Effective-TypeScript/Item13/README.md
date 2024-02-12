### 타입과 인터페이스의 차이

인터페이스로 함수 타입

```ts
interface IFn {
    (a: string): string
}
```

type의 확장 (extends)

```ts
type TA = TB & { a: number }
```

인터페이스는 유니온타입 등의 복잡한 타입을 확장하지 못한다.

type도 implements 가 가능하다.

튜플은 type이 간결하고 메서드 활용도 좋다.

---

일관된 스타일을 사용하는게 좋으나,
복잡한 타입은 type 이 좋고
API 등의 선언병합이 필요한 객체타입은 interface가 좋다.
## 타입을 집합이라고 생각하기

**객체에서**

```ts
interface A {}
interface B {}

keyof (A & B) = (keyof A) | (keyof B)
keyof (A | B) = (keyof A) & (keyof B)
```

타입 연산자는 인터페이스 속성이 아닌 타입의 범위(값의 집합)에 적용된다.  
추가적인 속성을 가져도 타입에 속한다.

```ts
interface A {
    a: string
}
interface B {
    b: string
}

type K = keyof (A | B) // never
```

위의  유니온 타입에 속하는 값은 어떤 키도 없다. ( = {} )

타입 연산은 집합의 범위끼리 적용하는 것.
A & B 는 A와 B 의 속성을 모두 가지는 값들의 집합인 것이다.(교집합)

---

```ts
const list = [1, 2] // number[]
const tuple: [number, number] = list
// type error
```

집합(상속)의 순서가 반대라서 에러임.

```ts
const triple: [number, number, number] = [1, 2, 3]
const double: [number, number] = triple
// error
```

위는 왜 에러일까 ?
타입을 { 0: number, 1: number, length: 2 } 로 모델링 하기 때문.
length의 리터럴 타입이 서로 달랐다.
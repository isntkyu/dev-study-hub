## 매핑된 타입을 사용하여 값을 동기화하기

인터페이스에 매핑된 타입을 정의하고
속성을 추가할 수 있는지 여부를 타입으로 다루기

예제

```ts
interface S {
    a: string
    b: string
    c: string
}

const REQUIRES_UPDATE: { [k in keyof S]: boolean } = {
    a: true,
    b: true,
    c: false
}

function shouldUpdate(
    oldS: S,
    newS: S
) {
    let k: keyof ScrollIntoViewOptions
    for (k in oldS) {
        if (oldS[k] !== newS[k] && REQUIRES_UPDATE[k]) {
            return true
        }
    }
    return false
}
```
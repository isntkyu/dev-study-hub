## 타임 단언보다는 타입 선언을 사용하기

화살표 함수에서의 타입선언.

```ts
const people = ['a', 'b', 'c'].map(name => { name })
// type: { name: string }[] 

const people = ['a', 'b', 'c'].map(name => ({ name } as Person))
// type: Person[] 

const people = ['a', 'b', 'c'].map(name => {
    const person: Person = { name };
    return person
})
// type: Person[] 

const people = ['a', 'b', 'c'].map(name => {
    (name): Person => ({ name })
})
// type: Person[] 
```

소괄호의 의미 중요

(name): Person 는 name 타입이 없고 반환 타입이 Person이라고 명시
(name: Person) 이라고 하면 반환 타입이 없기 때문에 오류

최종
```ts
const people: Person[]  = ['a', 'b', 'c'].map(name => {
    (name): Person => ({ name })
})
```

---

타입 단언으로 타입간의 변환은 안됨. 서브타입이어야 함.
변환 하려면 as unknown as T
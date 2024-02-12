## 타입 좁히기

일반적인예시  
- null 체크
- instanceof
- a in Obj (속성체크)
- Array.isArray

조심할 부분
- typeof null === object
- falsy한 값들


태그값 갖기
```ts
interface A { type: 'a', b: string}
interface B { type: 'b', b: string}
type AB = A | B
function fun (ab: AB) {
    switch (ab.type) {
        case 'a' // type A
            break;
        case 'b' // type B
            break;
    }
}
```

- 커스텀 함수 (return type에 is 사용) 사용자 정의 타입 가드
  - 함수 반환이 true 인 경우 타입 좁혀짐
  - filter 함수 등으로 타입이 걸러지지 않을 때 사용가능

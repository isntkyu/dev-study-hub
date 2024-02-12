## 잉여 속성 체크의 한계 인지하기

객체 리터럴을 변수에 할당하거나, 함수의 매개변수로 전달할 때 잉여 속성 체크가 일어난다.

임시 변수를 사용한다거나 하면 잉여 속성 체크가 일어나지 않음.

예시
```ts
interface IExample {
    a: string
    b: number
}
const e: IEample = {
    a: 'a',
    b: 1,
    c: true
}  // Typeerror

const obj = {
    a: 'a',
    b: 1,
    c: true
}
const e2: IExample = obj // 정상
```

임시 변수에 할당하면 obj 는 객체 리터럴이 아닌,  
`{a: string, b: number, c: boolean}` 타입이 됨.  
이 타입은 IExample 타입에 구조적 할당이 가능하다.
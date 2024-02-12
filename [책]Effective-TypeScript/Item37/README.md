## 공식 명칭에는 상표를 붙이기

구조적타이핑의 한계를 극복하는 법

상표 기법: 인터페이스와 그에 해당하는 값에 상표(속성)을 붙여주기 - 실수방지, 런타임에서 잡는 것과 동일한 효과

예시
```ts
type Meters = number & { _brand: 'meters' }

const meters = (m: number) => m as Meters

const oneKm = meters(1000) // type: Meters
const tenKm = oneKm * 10 // type: number
```
어차피 연산 후에는 상표가 사라진다.
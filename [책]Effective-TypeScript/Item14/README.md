## 타입 연산과 제너릭 사용으로 반복 줄이기 

타입 시스템에서의 DRY 원칙적용

- 타입에 꼭 이름을 붙여 사용하기
  - 코드에서 상수를 사용해서 반복을 줄이는 기법 응용
- extends
- 인터섹션
  - (확장이 안되는) 유니온 타입에 유용
- 인덱싱을 통한 의존성 부여
```ts
type A = {
    a: B['a']
}

type A_ = { // loop, pick
    [k in 'a']: B[k]
}
```
> pick<T, K> 도 loop로 타입을 가져오는 원리이기 때문에, 없는 타입을 넣으면 never가 될 것 같음.

### 유니온 타입의 인덱싱 또는 Pick

```ts
interface A {
    type: 'save'
}
interface B{
    type: 'load'
}

type Action = A | B
type ActionType = Action['type'] // 'save' | 'load'
type ActionType_ = Pick<Action, 'type'> // { type: 'save' | 'load' }
```

### 키를 그대로 사용하며 전부 옵셔널로 다시 정의하기(update Dto) 

keyof 사용

```ts
type OptionsUpdate = {
    [k in keyof B]?: B[k]
}
```

== Partial


### typeof 사용하기

값의 형태의 타입을 사용하고플 때 사용,
실제로는 타입 시스템에서 먼저 연산되며 정확하다.

선언의 순서에 주의한다. 타입 정의를 먼저하고 값을 타입에 할당 가능하다고 선언하기.

#### funA 함수의리턴타입 뽑아내기

```ts
type R = ReturnType<typeof funA>
```

함수 타입에 적용시킨다.





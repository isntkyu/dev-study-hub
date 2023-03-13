## 분배 조건부 유형

type-challenge의 InUnion 문제를 푸는데, 정답 코드들을 봐도 잘 이해가 안간다.

그러던 중 타입스크립트 문서에서 힌트가 될 자료를 찾았다.

### Distributive Conditional Types

간단히 말하면 제네릭으로 유니온 타입이 들어오는 경우에 대한 이야기.

```ts
type ToArray<T> = T extends any ? T[] : never;
```

여기서 T 제네릭으로 유니온 타입을 넣는 경우

```ts
type Example = ToArray<string | number>;
// == string[] | number[]
```

유니온 타입이 분배된다는 특성이다.

분배하고 싶지 않고 유니온타입 배열을 원할 경우

```ts
type ToArrayNonDist<T> = [T] extends [any] ? T[] : never;
```

이 개념을 이용해 IsUnion 문제를 풀어보자

---

https://github.com/isntkyu/type-challenges/blob/main/questions/01097-medium-isunion/README.md

분배 조건부 유형은 제네릭이 유니온타입일 경우에 대한 이야기 이므로.

미분배 타입 유형과 분배 타입 유형이 다르면. 제네릭이 유니온 타입이라는 개념으로 접근한다.

정답 코드

```ts
type Dist<T> = T extends any ? T[] : never;
type NonDist<T> = [T] extends [any] ? [T] : never;
type IsUnion<T> = [T] extends [never]
  ? false
  : NonDist<T> extends Dist<T>
  ? false
  : true;
```

추가적으로 never 조건부를 위해서는
대괄호로 감싸야 한다는 점도 배웠다.

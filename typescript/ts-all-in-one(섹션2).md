- forEach, map 제네릭 분석

제네릭을 안쓰고 유니온 타입을 사용하면 안되는 예시

```ts
function add(x: number | string, y: number | string) {
  return x + y;
}

add(1, "2"); // 이런 경우 발생할 수 있음
```

- filter 제네릭 분석

- forEach 직접 만들기

```ts
const a: Arr = [1, 2, 3];
a.forEach((item) => console.log(item));
a.forEach((item) => {
  console.log(item);
  return "3";
});
```

```ts
interface Arr<T> {
  forEach(callbackFn: (value: T) => void): void;
}
```

- map 만들기

```ts
interface Arr<T> {
  map<S>(callbackFn: (value: T) => S): S[];
}
```

- filter 만들기

```ts
interface Arr<T> {
  filter<S extends T>(callbackFn: (value: T) => value is S): S[];
}
```

- 공변성 / 반공변성

리턴 타입은 더 범위가 넓은 타입으로 대입 가능하다.
매개변수는 더 좁은 타입으로 대입 가능하다.

```ts
function a(x: string | number): number {
  return +x;
}
type B = (x: string): number | string;
const b: B = a;
```

- 오버로딩

같은 타입 여러번 선언.
오버로딩 하면 실제 구현부에서는 any를 쓰더라도 타입추론이 가능

- instanceof

클래스로만 사용가능하고(인터페이스는 js에서 사라지기 때문), as 를 안쓸 수 있는 타입가드 방법
catch 문에서 주로 사용

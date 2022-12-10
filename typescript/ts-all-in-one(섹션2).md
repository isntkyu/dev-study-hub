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

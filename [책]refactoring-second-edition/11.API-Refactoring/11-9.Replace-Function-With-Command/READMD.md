## 11.9 함수를 명령으로 바꾸기

함수를 객체 안에 캡슐화한다.

```ts
function score() {// A}

// ...

class Scorer {
    // ...
    execute() {// A}
}
```

이를 명령 객체, 혹은 명령 이라한다.

일급 함수를 지원한다면 명령보다 일급함수가 낫다.
ex) javascript

웹팩은 esmodule 형태로 번들링 해줘서 tree-shaking 지원이 되지않느다.

그러면 사용한 코드가 아니라 라이브러리 전체 코드를 가져오게 된다.

그래서 treeShaking 지원하는 rollup 사용

treeShaking: 실제 사용하는 코드만 빌드.

commonjs: modules.export

es6: export

```tsx
const enum EDirection {
  Up,
  Down,
  Left,
  Right,
}

const ODirection = {
  Up: 0,
  Down: 1,
  Left: 2,
  Right: 3,
} as const;

EDirection.Up;

(enum member) EDirection.Up = 0

ODirection.Up;

(property) Up: 0

// Using the enum as a parameter
function walk(dir: EDirection) {}

// It requires an extra line to pull out the values
type Direction = typeof ODirection[keyof typeof ODirection];
function run(dir: Direction) {}

walk(EDirection.Left);
run(ODirection.Right);
```

as const를 통한 상수관리(리터럴타입으로)

ts의 enum은 IIFE 로 트랜스코드되는데 롤업 번들러는 IIFE를 사용하지않는 코드라고 판단할 수 없어서 트리쉐이킹 안된다.

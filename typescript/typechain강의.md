타입스크립트에선 let 변수 선언시 타입이 자동으로 들어감 `let a = “ss”; a=1;` < 에러

{ age?: number } age 꼭필요하지않은 속성

ts는 프로퍼티가 언디파인일수도잇는걸 알려줌.

화살표 함수사용:

```tsx
const pm = (name: string): player ⇒ ({name})
```

readonly: js로 바뀌지 않고 타입앞에 붙임
tuple 앞에도 붙임. js엔 투플도 없음.

void, unknown: 타입스크립트에만 존재.
never: 실행될 일 없는 것

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/25b036e0-ca00-4d49-a2e9-3ee969a96b50/Untitled.png)

타입에 대한 경우의수 위 처럼 나누지 않으면 컴파일 에러임.

type add = (a: number, b: number) ⇒ number: 콜 시그니처

오버로딩: 한 함수에 대한 콜시그니처가 여러개
![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/99c5310c-5f3a-4312-b493-04a4857fc3e4/Untitled.png)

제네릭 - 콜시그니처를 생성해줌

```tsx
type a = {
<T>(arr: T[]): T
}
// 같음
type a = <T>(arr: T[]) ⇒ T
```

- any로 하면 런타임에러 나올수잇으나 제네릭쓰면 컴파일전에 알려준다 타입스크립트가
  ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/6eb889f2-fab9-427b-87dc-fae1f6380691/Untitled.png)

- 추상클래스는 상속받을수잇고 인스턴스 못만듦

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/66820d63-9c70-47a3-a1fd-d1e2052a687e/Untitled.png)

- 객체의 속성 타입 정의 방법

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/5ade0cd1-05e6-45b1-bb84-7c0d33272812/Untitled.png)

- 열거형 타입

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/10829d4b-b022-4e3d-8faf-3ad13a4117cf/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/68c5353c-b92b-4abd-9d61-6a082124219d/Untitled.png)

- 인터페이스 확장 두 가지

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/5b5c3b96-49f9-4f4d-ad76-0f11b321a992/Untitled.png)

- 같은 이름의 인터페이스 여러개 만들면 알아서 합쳐줌.(type 은 불가능한 기능)
- 인터페이스, 타입 둘 다 객체의 모양을 알려주는 것.

- 추상클래스는 js에서는 일반 클래스로 나타남.

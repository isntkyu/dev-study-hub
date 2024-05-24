# 쏙쏙 들어오는 함수형 코딩

<img width="101" alt="스크린샷 2024-03-10 오후 11 54 49" src="https://github.com/isntkyu/dev-study-hub/assets/56504493/13aac5f0-2941-4311-96ef-1bb6a91d8c1b">

---

- 액션

함수를 호출하는 시점과 횟수에 의존성이 있음  
부수효과가 있음

- 계산

호출 시점과 횟수가 의미 없음  
실행 전까지 동작을 알 수 없음  
순수함수

- 데이터

실행이 불가능  
이벤트로 발생한 사실

`코드를 액션, 계산 데이터로 분류하는 것이 함수형프로그래밍의 기본이며 함수형 프로그래밍에서는 액션보단 계산, 계산보단 데이터를 선호한다.`

---

`자주 바뀌는 것부터 자주 바뀌지 않는 순서로 레이어를 구성한다.`

가장 바뀌지 않는 것은 언어레벨

`비즈니스 규칙 > 도메인 규칙 > 기술스택`

- 액션에 해당하는 것

함수호출, 메서드호출, 생성자, 표현식, 상태(값 할당, 속성삭제),  
변경 가능한 값,  
암묵적 입력과 출력(= 부수효과)이 있는 함수.( <-> 명시적)

액션은 가능한 `적게, 작게 바깥쪽에`

> 리팩터링2판에서 배운 기법들이 등장한다. 모든 개발서적은 일맥상통한다 역시

- 계산 추출

암묵적 입력과 출력 찾아서 빼내기  
암묵적입력은 인자로 암묵적 출력은 리턴으로

> 연습문제를 생각해보니 바로 습득하기 좋다

- 카피온라이트

쓰기를 읽기로 바꾸는 것  
불변 데이터 구조를 읽는 것은 계산이고,  
카피온라이트는 원본을 수정하지 않기 때문에 계산이다.

객체 배열을 SLice 해도 객체들은 `구조적 공유`중이다.

- 방어적복사

원본이 바뀌는 것을 막아줌.  
데이터 전달 전 깊은복수 전달한 후 깊은복사

카피온라이트는 다른 카피온라이트 함수 호춣할때만 안전하다. 즉, 안전지대 안에서만 불변성이 보장된다.

방어적복사는 비용이 크긴함.

---

### 계층형 설계

- 계층 직접 설계

호출 그래프를 그려 코드 시각화

- 추상화 벽

라이브리나 API와 비슷하다. 클라이언트는 내부구현에 관심이 없고. 내부구현은 클라이언트의 사용처에 관심이 없다.  
그 것을 나눌 수 있는 계층이 추상화벽

`배열을 순회하지 말고 객체(해시맵)을 사용하자 [성능]`

> 애초에 배열 util 함수(lodash 등)을 사용할 생각보다 객체로 구현할 생각부터 해보자! (특히, 추가 삭제가 필요할 때)

구현에 대한 확신이 없을 때,  
코드의 유지보수성을 위해,  
타 팀간의 조율을 줄이기 위해,  
주어진 문제에 집중하기 위해,  
추상화 벽이 필요하다

- 작은 인터페이스

새로운 기능(요구사항)을 하위계층보다 상위계층(추상화벽 위)에 구현하는 것.

예를 들면, 로깅을 위한 함수호출 같은 경우 '계산'인 하위계층 함수보다 이미 '액션'인 상위 계층 핸들러 함수에 넣는 것이 좋다.

추상화 벽은 작게 만들어야 합니다.

- 편리한 계층

> 프로그래밍언어는 기계어의 추상화벽

편리함을 생각해서 패턴 재적용하라.(너무 구체적이라면)

- 비기능적 요구사항

테스트성, 재사용성, 유지보수성  
하위 계층은 테스트가 중요함.  
상위 계층은 유지보수 쉬움(더 자주 바뀜, 잘 만들었다면)  
하위 계층이 재사용성 높음.

- 코드의 냄새(함수 이름의 암묵적 인자)

함수 이름의 일부로 필드를 결정하는 문자열이 들어감.(함수 이름이 구현에 있는 다른 부분을 가리킴)  
즉, 함수이름이 구현의 차이를 만듦.

필드명을 인자로 만들어내면 됨.

ex) setPrice, setShip -> setField(field: 'price' | 'ship')

일급으로 할 수 있는 것

1. 변수에 할당
2. 함수의 인자로 넘기기
3. 함수의 리턴값으로 받기
4. 배열이나 객체에 담기

일급이 아닌 것

1. 수식 연산자
2. for, if
3. try/catch block

신박한 값 대체 방법

```ts
const translations = {};
if (translations.hasOwnProperty(field)) field = translations[field];
```

- 데이터 지향(data orientation)

일반적인 엔티티는 재사용 가능해야 해서 객체나 배열 사용한다. 데이터를 그대로 사용하면서 여러 방법으로 해석될 수 있도록 제한하지 않는 것

- 고차함수 (ex. forEach)

함수가 함수를 인자로 받음(콜백)

자바스크립트에서 함수는 일급 값이기 때문에 일급이 아닌 것들을 함수로 만들면 일급이 된다.

- 함수 본문 콜백으로 바꾸기 리팩터링

```ts
function example(fun) {
  try {
    fun();
  } catch (err) {
    // handle err log
  }
}

function fun() {}
example(function () {
  fun;
});
```

함수를 넘기면서 바로실행되면 안되고 감싸서 넘겨야함!

- 함수 체이닝

map, reduce, filter 등 체이닝할 때 명확하게 만들기

1. 체인 단계에 이름 붙이기
2. 콜백에 이름 붙이기
   즉, 함수 추출이다. 두 가지 방법을 비교하자. 보통은 두번째 방법이 재사용성이 좋다

연습 문제

```ts
function bigSpeders(customers) {
  var withBigpurchases = filter(customers, hasBigPurchase);
  var with2OrMorePurchase = filter(withBigpurchases, has2OrMorePurchases);

  return with20rMorePurchase;
}

function hasBigPurchase(customer) {
  return filter(customer.purchases, isBigPurchase).length > 0;
}

function isBigPurchase(purchase) {
  return purchase.total > 100;
}

function has2OrMorePurchases(customer) {
  return customer.purchases.length >= 2;
}

// -----------------------------

function average(numbers) {
  return reduce(numbers, 0, plus) / numbers.length;
}

function plus(acc, cur) {
  return acc + cur;
}

function averagePurchaseTotals(customers) {
  return map(customers, function (customer) {
    return average(
      map(customer.purchases, function (purchase) {
        return purchase.total;
      })
    );
  });
}
```

- 스트림 결합(한번의 반복만 돌고 하나의 배열만 새로생성) 하면 가비지컬렉션이 적어진다.

하지만 일반적으론 가독성이 더 중요하니, 병목이 생겼을 때만 참고하자

함수 체이닝과 콜백을 활용해서 리팩토링

- 체이닝 팁

1. 데이터만들기
2. 배열 전체를 다루기
3. 작은 단계로 나누기
4. 조건문을 filter로

```ts
function shoesAndSocksInventory(products) {
  const shoesAndSocks = filter(products, function () {
    return ['shoes', 'socks'].includes(product.type)
  })
  const inventories = map(shoesAndSocks, function(product) => {
    return product.numberInInventory
  })
  return reduce(inventories, 0, plus)
}
```

- 메서드로 체이닝 해도 됨.

- reduce로 값을 만들기

- 하지만 ES6

- reduce의 강력함

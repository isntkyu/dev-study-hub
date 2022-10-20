typeorm EntityManager API의 save()와 Bulk Insert 케이스

---

## Bulk insert 효율

결제요청 API 에서 다수의 row를 삽입해야하는 로직

- 순서 보장이 필요
- 수십 줄의 insert가 발생할 것으로 예측됨.

```js
for (const req of reqs) {
  const oi = new OrderItem();
  await oiRepo.save(oi);
}
```

기존에 구현되어 있던 방식인데 반복문을 돌면서 한번씩 save 하는 것이 효율적인가 ? 의문이 들었어

save는 entity Array를 받을 수 있는 것으로 안다.

```js
const ois: OrderItem[] = [];
for (const req of reqs) {
  const oi = new OrderItem();
  ois.push(oi);
}
await oiRepo.save(ois);
```

위와 같이 바꿨다. 여러번의 save 작업을 한번으로 줄였으니 효율성이 늘어났을 것 같음.

혹시 모르니 orm logging: true 옵션으로 raw 쿼리를 확인해봤다.

근데 똑같다.

두 코드 전부 reqs의 length 만큼( insert -> select )를 반복했다.

---

## save

save() 는 엔티티를 삽입하고 삽입된 엔티티를 select해서 리턴한다.
물론 삽입한 엔티티가 다른 로직에 필요하다면 적합한 함수이다.

하지만 나는 그렇지 않았고 insert 효율이 중요했다

```sql
insert into OrderItem values (), (), (), ......
```

이렇게 쿼리가 생성되길 바랐던 것.

이렇게 하려면 insert() 를 사용하면 된다.

최종적으로 코드는

```js
const ois: OrderItem[] = [];
for (const req of reqs) {
  const oi = new OrderItem();
  ois.push(oi);
}
await oiRepo.insert(ois);
```

이렇게 수정했다.

---

## Upsert

위의 문제를 해결하기위해 typeorm 레퍼런스에서 save 설명을 읽어보았는데,

객체 중복시 update를 한다는 설명이 있다.

그냥 insert만 날리던데 무슨 조건과 방식으로 update 를 하는 걸까 궁금해졌다.

---

분명히 중복체크를 하려면 select 후에 update를 날려야 할텐데 무엇을 기준으로 select 할까

정답은 pk 였음

```jsx
const orderItem = new OrderItem();
orderItem.id = 1;
orderItem.name = "test";
await OrderItemRepo.save(orderItem);
```

```jsx
const orderItem = new OrderItem();
orderItem.name = "test";
await OrderItemRepo.save(orderItem);
```

위에거는 select → update → select

아래거는 insert → select

이렇게 동작함.

Entity에 pk 데코레이터 를 찾고 save 할 인스턴스에 pk 값이 있으면 그 값으로 select 를 던지는 것이다. select한 값이 null 이면 insert 아니면 update.

- pk 가 auto_increment 가 아닐경우에는 다르게 동작하는지도 테스트해보았는데 똑같이 동작했음.

upsert 로직이 필요할 때 save 를 쓰면될까 ? 싶어서

upsert() 함수를 보니 typeorm에서 upsert는

```sql
insert into user values () ON CONFLICT () Do UPdate
```

쿼리를 생성한다.

그렇다 Mysql 에는 없고 postgresql 에서 사용하면 된다.

## 객체 래퍼 타입은 피하기

String, Number, Symbol 등이 객체 래퍼타입

메서드를 가질 수 있다.

문자열 메서드를 사용할떄
ex. 'abc'.charAt(3)

String 객체로 래핑하고 메서드를 호출하고, 래핑한 객체를 버린다.

그렇기에 다음과 같은 현상이 나타난다.
```ts
x = 'a'
x.lang = 'eng'
console.log(x.lang) // undefined
```

String 객체는 자기 자신하고만 동일하다

new String('a') === new String('a')  
=> false

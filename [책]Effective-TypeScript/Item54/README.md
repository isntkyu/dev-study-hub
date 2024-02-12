## 객체를 순회하는 노하우

프로토타입 오염을 조심해야한다. for...in 구문을 사용하면 객체의 정의에 없는 속성이 추가될 수 있다.

Object.entries 를 사용하자.

혹은 정확한 타입을 원할경우엔 keyof를 사용하자.  
let k: keyof typeof obj;
for (k in obj) {}
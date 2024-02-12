## 7-1 팩토리

구현으로부터 객체 생성을 분리  
실행 시 생성되는 객체를 결정할 수 있다.  
클로저를 활영하여 캡슐화를 강제하는데 사용될 수 있다.

### 7-1-1 객체 생성과 구현의 분리

단순성 유용성 및 작은 노출 면으로 순수한 oop 보단 함수형이 선호된다.  
객체 생성과 구현을 분리. 간단히는 new 를 사용하는 부분을 함수로 감싼다고 생각.
또는 여러 조건에 따라 다른 클래스의 인스턴스를 반환하도록 할 수 있음.

### 7-1-2 캡슐화를 강제할 수 있는 메커니즘

**캡슐화**란, 외부 코드가 컴포넌트 내부 핵심에 접근하는 것을 막는다. 컴포넌트와의 상호작용은 공용 인터페이스를 통해서만 가능하여 외부 코드와 컴포넌트 상세 구현을 분리한다.

javascript에서는 함수의 스코프와 클로저를 사용하여 캡슐화가 가능하다.

- 예시 코드 분석
-

```js
function createPerson(name) {
  const privateProperties = {};

  const person = {
    setName(name) {
      if (!name) {
        throw new Error("a person must have a name");
      }
      privateProperties.name = name;
    },
    getName() {
      return privateProperties.name;
    },
  };

  person.setName(name);
  return person;
}
```

person이 퍼블릭 인터페이스.  
person을 통해서만 접근할 수 있는 privateProperties.
클로저를 통한 프라이빗 변수 privateProperties

### 7-1-3 간단한 코드 프로파일러 만들기

./profiler.js

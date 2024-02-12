## 변경 관련된 오류 방지를 위해 readonly 사용하기

파라미터도 받은 값을 변경하지 않아야할 때 파라미터 타입에 지정할 수도 있다.

기능이 많은쪽이 서브타입이다. (number[]가 readonly number[]의 서브타입)

readonly 특히 배열에 지정하면 좋다. 원래 배열은 const 여도 pop, push 가능이라

하지만 단점은,
이 함수를 호출하는 쪽에서 파라미터를 readonly로해야하고, 이러면 다른 함수를 못 쓸 수 있다.
이 경우엔 assertion을 사용한다.

장점: 배열의 참조를 사용케 하는 경우에 원래배열 변경을 막을 수 있다.

Readonly<T> 
깊은 readonly 가능
or DeepReadonly<T>

인덱스 시그니처에도 readonly 가능 (필드의 값을 읽기전용으로 지정)

const 와의 차이를 이해해야 한다.

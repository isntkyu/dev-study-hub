## any를 구체적으로 변형해서 사용하기

쓰더라도 구체적으로 변형해서 쓰자.

any 보다는 any[] 처럼.

객체라면  
{ [key: string]: any } 혹은 object

`단, object 타입은 속성에 접근은 안된다는 차이가 있다.`

type Fn0 = () => any;  
매개변수 없이 호출 가능한 함수

type Fn1 = (arg: any) => any;  
매개변수가 1개

type Fn2 = (...args: any[]) => any;  
모든 개수의 매개변수, Function 타입과 같다.



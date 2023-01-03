# 3장

- java: https://github.com/isntkyu/head-first-design-patterns/tree/master/src/main/java/decorator
- ts: https://github.com/isntkyu/typescript-head-first-design-patterns/tree/main/DecoratorPattern

데코레이터패턴

- 객체에 추가요소를 동적으로 더할 수 있습니다
- 데코레이터를 사용하면 서브클래스를 만들 때보다 훨씬 유연하게 기능을 확장할 수 있습니다.

프레임워크는 디자인패턴을 갖고있는거같다고 생각하고

라이브러리는 기능을 갖고있는거같음.

- 객체구성: 인스턴스변수로 다른 객체를 저장하는 방식

추상클래스를 상속받은 추상클래스는 상위 추상메소드 구현 안해도된다.

[java.io](http://java.io) 패키지는 데코레이터 패턴으로 만들어짐.

- FileInputStream을 데코레이터로 장식

OCP : 클래스는 확장에는 열리고 변경에는 닫혀있어야한다.

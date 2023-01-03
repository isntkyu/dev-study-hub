# 5장

private 생성자와 정적 메소드 getInstance

인스턴스가 필요한 상황이 닥치기전까지 인스턴스 생성하지 않는 **게으른 인스턴스생성**

```java
public class Singleton{
	private static Singleton uniqueInstance;

	private Singleton(){}

	public Singleton getInstance (){
		if (uniqueInstance == null) {
			return new Singleton();
		}	else {
			return uniqueInstance;
		}
	}
}
```

**싱글턴 패턴**: 클래스 인스턴스를 하나만 만들고 그 인스턴스로의 전역 접근 제공

멀티스레드 문제의 해결

1. 동기화 (성능이 저하됨)
2. 인스턴스를 처음부터 만듦.
3. DCL(double checked locking)

   처음에 인스턴스 생성시까지만 동기화.

생길 수 있는 문제

- 클래스 로더 관련문제
- 리플렉션, 직렬화, 역직렬화

**enum으로 싱글턴을 생성하면 해결됨**

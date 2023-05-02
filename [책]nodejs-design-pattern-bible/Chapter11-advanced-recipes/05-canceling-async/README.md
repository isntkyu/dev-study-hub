## 비동기 작업 취소

멀티 스레드에서는 스레드를 종료할 수 있지만
싱글 스레드 플랫폼에서의 작업취소

---

100ms 후에 취소가 될 상태로 제어하는 실습

- cancelable()
  > Starting async routine A  
  > Async routine A completed  
  > Async routine A result  
  > Starting async routine B  
  > Async routine B completed  
  > Async routine B result  
  > Function canceled

2. 취소 로직을 래핑.

3. 제너레이터 사용

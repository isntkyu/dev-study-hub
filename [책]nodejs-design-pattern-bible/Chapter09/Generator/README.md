### 제너레이터

다른 진입점이 있을 수 있는 표준함수

이론:

제너레이터를 호출해도 바로 본문이 실행되지는 않는다.
반복자이면서 반복가능자인 제너레이터객체를 반환한다.

제너레이트 객체도 for...of 등에 사용가능.(yield 되는 값)  
.throw() // try catch 가능  
.return() 함수 제공 (강제종료)

제너레이터 객체도 반복자라서,
@@iterator 함수를 구현할 수 있다.

```js
    * [Symbol.iterator] () {
        let nextRow = 0
        let nextCol = 0

        return {
            next: () => {
                yield this.data[nextRow][nextCol]

                if (nextCol === this.data[nextRow].length - 1) {
                    nextRow++
                    nextCol = 0
                } else {
                    nextCol++
                }
            }
        }
    }
```

> 상태를 유지하기 위한 변수로 클로저를 사용할 필요가 없다.
제너레이터는 재진입 사이에 상태를 유지해주기 때문에.!

---

### 비동기 반복자

@@asyncIterator 함수  
for await ... of 구문  
await ~.next()


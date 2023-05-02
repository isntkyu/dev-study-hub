## 11-2 비동기식 요청 일괄 처리 및 캐싱

<img width="617" alt="스크린샷 2023-04-20 오후 11 06 56" src="https://user-images.githubusercontent.com/114394976/233391912-6b020df8-258b-44c0-837a-adbf0c0361c4.png">

### 응답 속도

#### 한 요청

> Server started  
> Processing query: ?product=book  
> totalSales() took: 548ms}  
> Processing query:  
> totalSales() took: 439ms}

#### LocalTest

> Processing query: ?product=book  
> Processing query: ?product=book  
> Processing query: ?product=book  
> Processing query: ?product=book  
> totalSales() took: 822ms}  
> Processing query: ?product=book  
> Processing query: ?product=book  
> Processing query: ?product=book  
> totalSales() took: 1186ms}  
> Processing query: ?product=book  
> Processing query: ?product=book  
> Processing query: ?product=book  
> Processing query: ?product=book  
> totalSales() took: 1684ms}  
> Processing query: ?product=book  
> Processing query: ?product=book  
> Processing query: ?product=book  
> totalSales() took: 2074ms}  
> Processing query: ?product=book  
> Processing query: ?product=book  
> Processing query: ?product=book  
> totalSales() took: 2506ms}  
> Processing query: ?product=book  
> Processing query: ?product=book  
> totalSales() took: 2851ms}  
> Processing query: ?product=book  
> totalSales() took: 3241ms}  
> totalSales() took: 3495ms}  
> totalSales() took: 3625ms}  
> totalSales() took: 3739ms}  
> totalSales() took: 3786ms}  
> totalSales() took: 3798ms}  
> totalSales() took: 3779ms}  
> totalSales() took: 3713ms}  
> totalSales() took: 3594ms}  
> totalSales() took: 3489ms}  
> totalSales() took: 3358ms}  
> totalSales() took: 3206ms}  
> totalSales() took: 3032ms}  
> totalSales() took: 2820ms}

#### Promise를 통한 Batch 처리 추가

> Processing query: ?product=book  
> Processing query: ?product=book  
> Batching  
> Processing query: ?product=book  
> Batching  
> totalSales() took: 461ms}  
> Processing query: ?product=book  
> Processing query: ?product=book  
> Batching  
> Processing query: ?product=book  
> Batching  
> totalSales() took: 425ms}  
> Processing query: ?product=book  
> Processing query: ?product=book  
> Batching  
> Processing query: ?product=book  
> Batching  
> totalSales() took: 424ms}  
> Processing query: ?product=book  
> Processing query: ?product=book  
> Batching  
> totalSales() took: 385ms}  
> Processing query: ?product=book  
> Processing query: ?product=book  
> Batching  
> totalSales() took: 382ms}  
> Processing query: ?product=book  
> Processing query: ?product=book  
> Batching  
> totalSales() took: 376ms}  
> Processing query: ?product=book  
> Processing query: ?product=book  
> Batching  
> totalSales() took: 375ms}  
> Processing query: ?product=book  
> Processing query: ?product=book  
> Batching  
> totalSales() took: 377ms}  
> Processing query: ?product=book  
> totalSales() took: 370ms}

#### Cache

> Processing query: ?product=book  
> Processing query: ?product=book  
> Cache hit  
> Processing query: ?product=book  
> Cache hit  
> totalSales() took: 453ms}  
> Processing query: ?product=book  
> Cache hit  
> Processing query: ?product=book  
> Cache hit  
> Processing query: ?product=book  
> Cache hit  
> Processing query: ?product=book  
> Cache hit  
> Processing query: ?product=book  
> Cache hit  
> Processing query: ?product=book  
> Cache hit  
> Processing query: ?product=book  
> Cache hit  
> Processing query: ?product=book  
> Cache hit  
> Processing query: ?product=book  
> Cache hit  
> Processing query: ?product=book  
> Cache hit  
> Processing query: ?product=book  
> Cache hit  
> Processing query: ?product=book  
> Cache hit  
> Processing query: ?product=book  
> Cache hit  
> Processing query: ?product=book  
> Cache hit  
> Processing query: ?product=book  
> Cache hit  
> Processing query: ?product=book  
> Cache hit  
> Processing query: ?product=book  
> Cache hit

---

### 캐싱 참고사항

- 메모리사용률을 위해 LRU, FIFO 정책 적용
- 레디스, 멤캐시등 공유저장소 사용
- ttl 아닌 수동 캐시 무효화는 관리가 복잡하지만 수명이 길고 최신의 캐시데이터 사용가능

# 이벤트 기반 마이크로서비스 구축

### 🪦 툼스톤 이벤트
- 값 없이 키만 존재하는 이벤트로, 해당 데이터가 삭제되었음을 나타낸다.
- 삭제 이벤트임을 표현하는 표준적인 관례로 사용된다.

### 🧹 컴팩션 (Compaction)
- 로그에서 가장 최근 레코드만 유지하고 이전 레코드를 제거하는 방식.
- 저장 공간 최적화 및 조회 성능 향상에 기여한다.

---

### 📡 이벤트 브로커 vs 메시지 브로커

| 항목             | 메시지 브로커                        | 이벤트 브로커                          |
|------------------|--------------------------------------|----------------------------------------|
| 메시지 전달 방식 | 단일 컨슈머만 수신, ACK 후 삭제됨    | 불변 로그 기반, 여러 컨슈머가 읽기 가능 |
| 순서 보장        | 기본적으로 순서 보장 (큐 기반)       | 컨슈머 그룹 및 파티션 기반 순서 제어 가능 |
| 메시지 재사용    | 불가                                 | 가능 (오프셋 기준으로 다시 읽기 가능)   |
| 활용 예시        | SQS, RabbitMQ                        | Kafka, Pulsar                          |

> 이벤트 브로커는 오프셋 기반으로 유연하게 소비할 수 있으며, 확장성과 유실 방지 측면에서 유리하다.

---

### 🏗️ 마이크로서비스 실행 환경: 가상머신 vs 컨테이너

- **가상머신**: OS 수준 격리로 보안성이 높으나, 무겁고 느리며 비용이 많이 든다.
- **컨테이너**: 경량화된 프로세스 격리 환경으로 빠른 기동과 자원 효율성이 뛰어나 마이크로서비스에 적합하다.

---

## 📜 통신 및 데이터 규약

### ✅ 스키마 진화

- 스키마는 **정방향**, **역방향**, **양방향**으로 진화할 수 있다.
- **Avro**와 **Protocol Buffers**는 진화 전략을 잘 지원한다.
- **JSON**은 유연하지만, 스키마 진화 측면에서는 취약하다.

> 현재 JSON을 사용하고 있지만, 제로 페이로드 방식으로 PK만 포함하는 경우 진화 리스크는 낮다고 판단된다.

### ✅ 데이터 유형 전략

- 이벤트에 포함되는 데이터는 명확하게 제한해야 한다.
- 문자열 사용이나 `enum` 남용은 피해야 한다.

### ✅ 이벤트 스트림 설계 원칙

- 하나의 스트림은 **하나의 역할**만 가져야 한다.
- 이벤트에는 불필요한 필드를 넣지 않고, 결과만을 담는다.

---

## 🔄 데이터 발행 방식 비교

### 1. 쿼리 기반 동기화 (Polling)
- 주기적으로 SELECT 쿼리로 변경사항 감지
- **단점**:
  - 시스템 성능 저하
  - 삭제 감지 어려움
  - 타임스탬프 필요 (`updated_at` 기반)

### 2. CDC (Change Data Capture)
- DB의 변경 로그를 분석하여 이벤트를 발행
- **단점**:
  - 내부 데이터 모델이 외부에 노출될 가능성

### 3. 아웃박스 테이블 (Outbox Pattern)
- 내부 테이블과 아웃박스 테이블을 동일 트랜잭션으로 갱신
- 아웃박스 테이블을 읽어 이벤트 발행 후 삭제

#### 장점
- 언어/플랫폼 독립
- 스키마 강제 가능
- 내부 모델 격리
- 사전 반정규화 가능

#### 단점
- 애플리케이션 코드 변경 필요
- 비즈니스 로직에 오버헤드 발생
- 저장소 성능에 영향 가능

> 아웃박스 테이블은 데이터 포맷을 명확히 정의하여 서비스 간 결합을 줄인다.

---

## ⚙️ 이벤트 기반 처리 구성 요소

- 상태 비저장 토폴로지
  - 이벤트 변환, 분기, 병합 등
- 이벤트 스트림 리파티션
- 스트림 코파티션 (같은 파티션으로 묶음)
- 파티션 할당 방식 (컨슈머 인스턴스별 분산 처리)

---

## ⏱️ 확정적 스트림 처리와 시간 정렬

### 이벤트 스케줄링
- 여러 파티션에서 들어온 이벤트의 처리 순서를 결정하는 프로세스
- 이벤트 시간 기준으로 **인터리빙(interleaving)** 처리 가능
- 처리 기준:
  - 이벤트 시간 (추천)
  - 브로커 도착 시간
  - 컨슈머 수신 시간
  - 컨슈머 처리 시간

### 워터마크 (Watermark)
- 이벤트 시간 기준의 진행 상태를 추적
- 시간 `t` 이전 이벤트가 모두 처리되었음을 선언
- 병렬 처리 환경에서 컨슈머 간의 시간 동기화에 유용

### 스트림 시간 (Stream Time)
- Apache Kafka Streams의 개념
- 이벤트 처리 시점 중 가장 높은 타임스탬프를 유지
- 각 토폴로지마다 독립적인 스트림 시간 관리
- 하위 토폴로지에서는 한 번에 하나의 이벤트만 처리됨

> 워터마크는 선언적이며, 스트림 시간은 처리 기반으로 시간 흐름을 계산한다.

### 🌀 비순차 이벤트와 지각 이벤트 처리

- 순서가 어긋난 이벤트는 보통 여러 프로듀서와 파티션으로 인해 발생한다.
- 처리 전략:
  - 고정 윈도우
  - 슬라이딩 윈도우
  - 세션 윈도우

> 지각 이벤트에 대한 기준은 **비즈니스 요구사항에 따라 정의**되어야 하며, 절대적인 방식은 없다.

### 🔁 재처리 vs 준실시간 처리

- 오프셋 리셋 또는 이벤트 재처리 시 고려할 점:
  - 데이터 양
  - 재처리 소요 시간
  - 서비스 영향도

### 마치며

- 이벤트 기반 시스템은 **정합성과 지연의 트레이드오프**를 잘 설계해야 한다.
- 적절한 스트림 전략과 데이터 관리 정책이 안정성과 확장성에 큰 영향을 미친다.

---

## 상태 저장 스트리밍


### 상태 저장소, 이벤트 스트림에서 상태 구체화

- 구체화된 상태: (불변) 소스 이벤트 스트림의 이벤트를 투영한 것. 공통 비즈니스 엔티티
- 상태 저장소: (가변) 서비스가 비즈니스 상태를 저장하는 곳 

상태를 처리기의 내부/외부 어디에 저장할지 비즈니스에 따라 선택해야한다.

### 체인지 로그 이벤트 스트림에 상태 기록

체인지로그는 상태 저장소의 변경사항을 기록한 것이다.  
인스턴스 외부에 유지되는 영구적인 상태 사본으로써 이벤트 처리 진행을 체크포인트 하는 수단으로 활용  
최근 키/값 쌍만 알아도 상태 재구성을 할 수 있으므로 최근 데이터로 **컴팩션**이 필요하다.  
카프카 스트림즈 프레임워크는 지원한다.

### 내부 상태 저장소에 상태 구체화

동일한 컨테이너(인스턴스)에 로컬 디스크 기반 상태 저장소 활용(락스DB등의 키/값 저장소가 주로 쓰임, 관계형은 잘 안씀)  
복구나 확장에 불리하기 때문에 단순한 토폴로지에 사용하면 좋다

> NAS: 네트워크 결합 스토리지

### 외부 상태 저장소와 상태 구체화

가상머신이나 컨테이너 외부에 존재하지만 동일한 네트워크에 존재하는 상태 저장소  
완전한 데이터 지역성이 장점이나, 여러 기술을 관리해야하는 부담이 있다. (비용이나 네트워크 지연 성능저하도 있다.)

> SLA: 서비스 수준 협약 service level agreement

### 재구성 vs 상태 저장소 마이그레이션

애플리케이션의 내부 상태를 업데이트 하는 가장 일반적인 방법이 재구성(rebuild)이다.  
새로운 비즈니스 로직에 따라 상태가 재구성되고 모든 새 출력도 다운스트림으로 전파한다.

거대한 상태 저장소는 재구성이 매우 오래 걸리고 비용이 크다.  
그치만 대규모 데이터 마이그레이션의 위험성이 더 클 수 있으니 정밀한 테스트 데이터로 철저한 검증이 필요함

### 트랜잭션과 실제로 한 번 처리

카프카는 트랜잭션 지원한다.(오프셋 업데이트, 체인지 로그 업데이트, 출력 이벤트를 트랜잭션으로 묶어 원자적 처리)  
트랜잭션을 지원하지 않는 브로커를 사용해도 '실제로 한 번 처리' 로직을 구현해야한다.  
이는 '정확히 한 번 처리' 와는 다르다.

#### 실제로 한 번 처리 구현하기 (멱등성)

중복 이벤트 생성을 방지해야 한다.  
ACK를 받지 못해서 재시도를 하는 등의 컹유, 오프셋을 업데이트 하기 전에 실패하는 경우에 중복 이벤트 생성이 될 수 있음.  

## 마이크로서비스 워크플로 구축

### 코레오그래피 패턴

코레오그래피에서 프로듀서는 자신의 데이터를 누가 어떻게 소비할지 모릅니다.  
포괄적인 비즈니스와 워크플로를 구성하기 위해 재사용 가능한 서비스를 제공하는데 초점을 두었다.  
직접 API로 호출하는 마이크로서비스 보다는 결합이 느슨하다. (직접호출 MSA는 경계 컨텍스트에 완전히 종속된다.)

- 워크플로 중간 단계를 삽입하거나 순서를 바꾸면 문제가 생길 수 있음.  
- 서비스간의 관계를 콘텍스트 외부에서 이해하기 어려움.
    - 비즈니스 기능을 하나의 서비스로 로컬화하면 어느 정도 해결.

종단 간의 워크플로를 전부 다 보기 위한 모니터링이 힘들다. (이벤트 스트림의 독립성 때문에)

### 오케스트레이션 패턴

중앙의 마이크로서비스(오케스트레이터)가 하위 워커 마이크로서비스에게 명령을 내리고 응답을 기다린다.  
전체 워크플로 로직을 알고 있다.  

결제 3회 시도 후 실패처리하는 마이크로서비스가 있다면, 3번 재시도로직은 마이크로서비스 내부에 둔다.  
재시도를 하달 받는 것이 아니다. 결제 마이크로서비스의 경계 콘텍스트의 일부분이기 때문에.  
오케스트레이터는 성공/실패만 알면 된다. 비즈니스 로직에는 관여하지 않는다.  

API 통신(직접 호출 요청/응답)으로도 같은 패턴이 가능하다.

#### 이벤트 기반 오케스트레이션
- 다른 EDA와 동일한 모니터링 도구 및 랙 확장 기능 사용 가능
- 오케스트레이션 외부의 서비스, 다른 서비스가 이벤트 스트림 소비 가능
- 보존성 좋음. 브로커를 통해 통신하므로 다른 서비스의 실패에 영향받지 않음.

#### 직접 호출 오케스트레이션
- 속도가 빠름.
- 간헐적인 접속 문제를 오케스트레이터가 관리해야함.

잘 짜맞춰 사용하면된다. 메인은 이벤트 기반으로. 외부 API나 기존 서비스는 직접 호출로 사용하는 식으로  
혼용할 때는 각 서비스가 실패시 잘 처리되는지 꼼꼼히 확인해야한다.

오케스트레이터는 오케스트레이션 역할만 해야한다. 유일신이 되어서는 안된다.  
비즈니스 로직은 최소화 한다.  

오케스트레이터 레벨에서 모니터링, 로깅을 구현하면 디버깅이 용이하다.

## 분산 트랜잭션

이행/역전 로직은 반드시 동일한 마이크로서비스안에 두어야한다. 그래야 롤백을 할 수 없을 때에도 새 트랜잭션이 시작되지 못하게 할 수 있고 관리 목적으로도 필요하기 때문.

분산트랜잭션은 리스크와 복잡도가 높아질 수 있음. (작업 동기화, 롤백 간소화, 인스턴스 장애관리, 네트워크 연결 등)  
하지만, 분산트랜잭션이 없어서 리스크과 복잡도가 늘어나는 경우에는 꼭 필요하다.

정상 처리 액션과 복구 액션은 사가패턴에 참여하는 마이크로서비스가 실패해도 멱등적이어야 한다.

### 코레오그래피 트랜잭션: 사가 패턴

느슨했던 서비스가 단단히 결합될 수 있고 복잡해질 수 있다.  
단순한 분산 트랜잭션, 시가닝 지나도 변경될 일이 거의 없는 강력한 워크플로에 잘 맞다.  
각각의 이벤트 스트림을 완전 구체화 해야해서 모니터링이 쉽지 않다.

서비스 하나가 실패했다면 이전 서비스에 응답하는 식으로 워크플로를 역전시키며 롤백을 실행해야 한다.  

최초 입력 스트림을 받은 서비스에서 최종 실패 트랜잭션 스트림을 생성해야 하기 때문에,  
최종 컨슈머는 마지막 서비스와, 실패 서비스를 모두 리스닝 해야한다.

그럼에도 불구하고, 진행중이거나 교착된 트랜잭션 상태는 알 수 없기 때문에  
각 이벤트는 구체화 되거나 내부 상태를 API로 제공해야한다.

순서가 매우중요하며 변경이 어려운 패턴이다.

### 오케스트레이션 트랜잭션

오케스트레이션 트랜잭션은 타임아웃, 사람의 입력(rest api, 수동) 등 다양한 신호를 지원할 수 있다.  
그래서 어느 지점부터라도 트랜잭션을 중단시킬 수 있다.

특정 서비스의 실패 응답은 자신의 내부 저장소에 아무것도 쓰지 않았음을 보장해야한다. 그래야 다른 서비스 전체가 롤백되어도 일관성 유지

오케스트레이터는 롤백이 실패할 경우엔 명령을 여러번 다시 내리거나, 모니터링을 통해 알림을 받거나, 강제종료 하거나 등의 조치를 취해야한다.  
최종 출력 스트림이나 최종 이벤트 처리는 오케스트레이터의 몫인 거다.  

트랜잭션 상태를 표출할 수 있고 모니터링이 용이하다.  
워크플로를 유연하게 변경 가능하고, 의존관계가 더 잘 드러나서 모니터링, 디버깅이 쉽다.

### 보상 워크플로 

시스템적으로 엄격히 관리되는 관점이 아닌, 고객 경험의 관점에서 보상 워크플로 구축을 고려하기.  
비즈니스적인 보상 액션

### 마치며

코레오그래피는 워크플로들이 독립적이고 결합이 느슨하여, 순서가 변경되지 않고 서비스 수가 적고, 비트랜잭션 워커플로에 적합  
오케스트레이션은 가시성이 좋고 모니터링이 수월하며 복잡한 트랜잭션을 처리할 수 있고 수정이 용이하다.

## Faas 응용 마이크로서비스

### 처리 완료 이후에만 오프셋 커밋

적어도 이벤트가 한 번 이상 처리됨을 강력하게 보장한다.  
함수 처음 시작시 커밋을 하는 경우는 데이터 손실에 민감하다면 삼가는게 좋다.

### 함수가 적을수록 좋다

함수를 많이 관리하면 매우 파편화될 가능성이 높다.

### 함수에서 다른 함수 호출

다중 함수 솔루션은 흔히 코레오그래피/오케스트레이션 디자인 패턴을 사용한다.
- 이벤트 기반 통신
- 직접 호출 패턴
  - 코레오그래피와 비동기 함수 호출
  ```
  function A(events) {
    asyncB(events)
    context.success()
    return;
  }
  ```
  - 오케스트레이션과 동기 함수 호출
  - 이벤트 스트림 - 트리거를 걸어 처리
  - 큐로 트리거를 걸어 이벤트 처리

## 기본 프로듀서/컨슈머 마이크로 서비스

이벤트 스케줄링, 구체화 매커니즘, 체인지로그, 로컬 상태 저장소를 이용한 확장 등의 완전한 기능을 갖추지 않고도 비즈니스 요건을 충족할 수 있다.

사이드카 패턴이란?

기존 코드를 많이 고치지 않고 신기능 추가 가능한 패턴중 하나  
프론트엔드의 배포체에 일부분이 되며, 이벤트를 소비해서 프론트엔드 저장소에 데이터를 동기화한다.

#### 이벤트 순서와 무관한 상태 저장 비즈니스 로직

순서에 대한 요건이 특별히 없이 모든 이벤트가 도착해야한다는 요건: **게이팅 패턴**

### 하이브리드 BPC 애플리케이션으로 외부 스트리밍을 처리

외부 스트림과 내부 스트림을 조인하여 출력

## 대용량 프레임워크 마이크로서비스

주키퍼 클러스터
- 마스터 노드
  - 워커 노드
    - 실행기
      - Job(태스크) - 파티션

장점 및 제약
- 주로 분석기술이다.
- 마이크로서비스 배포를 감안한 프레임워크가 아니다
- jvm기반이 대부분이라 언어가 제한된다.
- 에닡티 스트림을 무한 보존되는 테이블로 구체화하는 기능이 바로 지원되지 않는다. (테이블-테이블조인, 테이블-스트림 조인, 게이팅패턴 안된다.)

---

## 경량 프레임워크 마이크로서비스

이벤트 브로커 + CMS 정도

장점  
가용한 옵션이 많지 않을 뿐이지 대용량 프레임워크 못지않은 외려 능가하는 스트림 처리 기능을 제공하는 경우도 많다.  
스트림을 간편하게 조인하고 테이블로 구체화할 수 있다.  
애플리케이션이 실행중인 상태에서도 동적으로 확장이 가능하다. (업스트림과 다운스트림 분리 확장도 가능)

카프카 스트림즈, 삼자 모두 JVM 기반 (이벤트 스트림 조인 기능)

결론  
확장성이 매우 우수하고 CMS와 연계하여 마이크로서비스 고도화. 독립적으로 오래 실행되는 상태 저장 마이크로서비스에 알맞음

## 이벤트 기반 마이크로서비스와 요청-응답 마이크로서비스의 통합

- 외부 이벤트 처리
- 자율적으로 생성된 분석 이벤트 처리
- 서드파티 요청-응답 API 연계
- 상태 저장 데이터 처리 및 서비스
- 이벤트 기반 워크플로 내에서 요청 처리
- 요청-응답 애플리케이션과 마이크로 프런트엔드
- 마이크로프론트엔드 장점/단점


## 지원 도구

### 마이크로서비스 - 팀 배정

권한을 세분화 하여 이벤트 스트림의 권한 할당  
이벤트 스트림에 메타데이터를 태깅하여 태그는 권한을 가진 팀만 다룰 수 있게 하기 등  
메타데이터 예시
- 스트림 소유자(서비스) 표기
- 개인 식별 정보
- 재무 정보
- 네임스페이스: 경계 콘텍스트에 관한 기술자
- 사용 중단 여부
- 맞춤 태그(커스텀)

### 쿼터

프로듀서나 컨슈머 그룹에 CPU 처리 시간의 20%만 할당하는 등의 브로커 설정  
한 서비스가 요청한 i/o로 인해 전체 클러스터가 포화되어 먹통되거나 하는 일을 막는다.

### 스키마 레지스트리

- 프로듀서가 스키마를 레지스트리에 등록하고 id를 얻어옴.
- 프로듀서에 id 캐싱
- 스키마id와 함께 프로듀스(발행))
- 컨슈머는 스키마 id로 스키마를 획득해서 적용
- 컨슈머도 스키마 캐싱

### 스키마 생성/변경 알림

접근 통제 리스트(ACL)를 사용하면 어느 서비스가 어느 이벤트 스트림을 소비하는지  어느 스키마에 의존하는지 파악할 수 있다.  
스키마 업데이트는 스키마 스트림에서 소비할 수 있고 이벤트 스트림도 상호참조할 수 있다.  
ACL이 정보를 제공하고 마이크로서비스-팀 배정 시스템을 통해 변경이 통보된다.  
ACL은 경계콘텍스트를 강제하는 수단

### 컨슈머 오프셋 랙 모니터링

버로우: 카프카용 모니터링 시스템  
히스테리시스(허용임계치): 클라우드워치 등에서 사용가능

## 이벤트 기반 마이크로서비스 테스트

### 토폴로지 테스트

토폴로지를 테스트하는 서드파티 옵션을 제공하는 경우가 많음.  
예를 들어, 카프카 스트림즈는 TopologyTestDriver  
테스트 프레임워크를 잘 활용하자 

### 스키마 진화와 호환성 테스트

스키마 레지스트리에서 스키마를 가져와서 진화 규칙에 부합하는지 체크  
스키마 생성 도구를 사용하여 컴파일 타임에 스키마를 생성

### 이벤트 기반 마이크로서비스와 통합 테스트

### 이벤트 기반 마이크로서비스 배포



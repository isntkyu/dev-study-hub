# 3장

상태줄, 헤더, 본문

CRLF

HTTP/1.1 버전은 1,1버전을 이해할수 있음을 의미.

http/2.22 > http/2.3

http method **TRACE**: 루프백 진단. 진단 용도. 본문 불가능

http method **OPTIONS**: 어떤 메소드 지원되는지 물음.

상태코드 100 continueㅡ, 프락시에서 다루면 이득 101 스위칭프로토콜

201: created(put을 위함)

202: accepted 요청은 받아들여졋지만 서버는 동작을 수행하지 않앗다.

204: no content

300: multiple resource

301: 요청한 url이 옮겨짐

303: post요청 용도, 새 url이 응답메시지에 들어잇음

405: allow 헤더가 필요함.

407: 401과 같으나 프락시를위해 존재

408: 타임아웃

411: content-length 헤더 요구

413: too large

414: uri too long

417: except헤어에 서버가 만족시킬수없는 기대가 담긺

응답: Set-Cookie, 요청: Cookie

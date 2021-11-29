http 이론 요약
===============

## 1.http란? 
HTML 문서와 같은 리소스들을 가져올 수 있게 해주는 프로토콜이다.
(프로토콜: 컴퓨터 내부 또는 컴퓨터 사이에서 데이터 교환 방식을 정의하는 규칙)
클라이언트-서버 프로토콜이며, 클라이언트에서 전송되는 메시지를 request, 서버에서 요청에 대한 응답으로 보내는 것이 response이다.

## 2. HTTP 기반 시스템 구성요소
클라이언트, 서버, 그 사이에 위치하는 프록시(proxy) 등이 있다.
-	클라이언트(사용자 에이전트) : 사용자를 대신하여 동작하는 모든 도구. 주로 브라우저에 의해 수행된다. 브라우저는 항상 요청을 보내는 개체다.
-	웹 서버: 클라이언트에 의한 request에 대한 문서를 제공하는 서버
-	프록시: 여러 계층으로 이뤄진 웹 스택 구조에서 애플리케이션 계층에서 동작하는 머신

## 3. HTTP 특징
-	간단하다
-	확장 가능하다
-	State를 저장하지 않지만 http 쿠키를 통해 state가 있는 세션을 만들 수 있다.

## 4. http로 제어가능 한 요소
http는 확장 가능하기 때문에 다양한 요소들을 제어할 수 있다.
-	캐시: http로 문서가 캐시 되는 방식 제어, 인증: 특정 사용자만 접근하게 만드는 방법 중 하나. http 쿠키를 통해 특정 세션을 설정하거나 특정 헤더로 제공되는 기능, 프록시 터널링, 세션

## 5. http 메시지
http request– (method) (path) (version of protocol) 
	       (header)
-	Method: GET, POST 등의 동작 또는 OPTIONS, HEAD와 같은 명사로 요청의 종류
-	Path: 가져오려는 리소스 경로
-	Header: 서버에 대한 추가 정보
http response- (version of the protocol) (status code) (status message)
	      (header)
-	Status code: 요청의 성공 여부와 그 이유를 나타내는 코드
(참고: https://developer.mozilla.org/ko/docs/Web/HTTP/Status )
-	Status message: 상태 코드에 대한 짧은 설명 메시지

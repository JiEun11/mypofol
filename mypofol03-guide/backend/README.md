#### 설치
1.  패키지 설치
    ```sh
    [myfopol03]$ cd backend
    [backend  ]$ npm i
    ```

2.  패키지 설치 후, 실행: package.json 스크립팅 참고

#### 프로젝트 구조
<pre>
|--- index.js                     [node-express web application 설정 및 그 web application이 실행될 서버 생성 및 실행]
|--- /config
|       |--- app.env              [node-express web application 설정 프로퍼티: 서버 서비스 포트, 정적 웹 자원 위치, 등,,,] 
|       |--- mariadb.env          [RDBMS(Mariadb) 연결 정보 및 Connection Pool 설정 프로퍼티] 
|       |--- jwt.env              [JWT 비밀키, issue 옵션]
|--- /routes
|       |--- index.js             [dispathers & middlewares 설정: *설정순서중요]
|       |--- dispatcher-api.js    [ /api 시작하는 요청을 인터셉터들과 컨트롤러 함수들에 체인]
|       |--- dispatcher.js        [ /    시작하는 요청을 인터셉터들과 컨트롤러 함수들에 체인]
|       |--- interceptors.js      [인터셉터들: verifyToken, validAccount, delayForTest]
|       |--- middlewares.js       [미들웨어들: resLocals, acceptOnlyJsonRequest, jsonResult, error404, error500]
|--- /controllers
|       |--- jwt.js               [jwt기반 보안 요청 처리: auth, signout, refreshToken]
|       |--- main.js              [react application(bundle, main.js) landing]            
|       |--- account.js           [acccount 관련 CRUD API 요청 처리] 
|       |--- educations.js        [education 관련 CRUD API 요청 처리]
|       |--- experiences.js       [experiences 관련 CRUD API 요청 처리]
|       |--- profile.js           [profile 관련 CRUD API 요청 처리]
|       |--- projects.js          [projects 관련 CRUD API 요청 처리]
|       |--- skills.js            [skills 관련 CRUD API 요청 처리]
|       |--- training.js          [training 관련 CRUD API 요청 처리]
|--- /models
|       |--- dbcp.js              [Connection Pool 생성 함수 정의 및 익스포트]
|       |--- account.js           [주로 account table CRUD] 
|       |--- educations.js        [주로 education table CRUD]
|       |--- experiences.js       [주로 experience table CRUD]
|       |--- profile.js           [주로 profile table CRUD]
|       |--- projects.js          [주로 project table CRUD]
|       |--- skills.js            [주로 skill table CRUD] 
|       |--- trainings.js         [주로 training table CRUD]
|--- /views
|       |--- index.ejs            [react application bundle(main.js) 랜딩 view, * 404 에러 view 역할하는 것도 이해할 필요가 있음]
|       |--- /error               
|       |       |--- 404.ejs      [404 에러 페이지: 404 view는 index.ejs이기 때문에 거의 필요 없음]
|       |       |--- 500.ejs      [500 에러 페이지: API 호출의 Internal Error 외의 Internal Error 발생 시 view]   
|--- /public
|       |--- /css                 [대부분  CSS가 react app에 번들되기 때문에 필요 없으나 landing 페이지나 전역 스타일링 정도는 필요]
|       |--- /images              [webpack 번들링 작업시 해싱 이미지 위치 / 번들링 되지 않는 이미지 URL(예: 디폴트 프로필 이미지)]
|       |--- /upload-images       [webpack 번들링 되지 않는 사용자 업로드 이미지의 위치]
|       |--- /js
|       |      |--- main.js       [webpack 번들링 최종 결과물]                  
|--- /multer-temporary-store 
</pre>


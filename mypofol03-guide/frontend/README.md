#### 설치

1.  패키지 설치
    ```sh
    [myfopol03]$ cd frontend
    [frontend ]$ npm i
    ```

2.  패키지 설치 후, 실행: package.json 스크립팅 참고

#### 프로젝트 구조

<pre>
|--- /public                                                         [Webpack Dev Server's Web Service Home]
|      |--- index.html
|      |--- /css                 
|      |--- /images              
|--- /config                                                         [개발/테스트 설정]
|      |--- webpack.config.js                                        [웹팩 설정]
|      |--- babel.config.json                                        [babel 설정]
|--- /src
|      |--- index.js                                                 [Webpack Bundling Entry]
|      |--- App.js                                                   [Application Router 설정 컴포넌트]
|      |--- /assets                                                  [Component Resources Directory]
|      |      |--- /images
|      |      |--- /css
|      |      |      |--- /component
|      |      |      |      |--- /main
|      |      |      |      |      |--- Main.css
|      |      |      |      |      |--- DialogSignin.css
|      |      |      |      |      |--- Welcome.css
|      |      |      |      |--- /account
|      |      |      |      |      |--- Profile.css
|      |      |      |      |      |--- experiences
|      |      |      |      |      |     |--- Experiences.css
|      |      |      |      |      |     |--- ExperienceItem.css
|      |      |      |      |      |--- Projects.css
|      |      |      |      |      |--- Educations.css
|      |      |      |      |      |--- Skills.css
|      |      |      |      |      |--- Trainings.css
|      |      |      |      |--- /dashboard
|      |      |      |--- /layout
|      |      |      |      |--- Header.css
|      |      |      |      |--- Footer.css
|      |      |      |      |--- SidePannel.css
|      |      |      |      |--- LayoutMain.css
|      |      |      |      |--- LayoutAccount.css
|      |      |      |      |--- SidebarAccount.css
|      |--- /auth                                                    [JWT Client for React 구현 패키지]
|      |      |--- index.js                                          [component/auth 패키지 내의 export 컴포넌트 설정: AuthContextRouter, AuthRoutes, useAuthContext]
|      |      |--- AuthContextRouter.js                              [접근 제어 라우터: JWT 기반]
|      |      |--- AuthRoutes.js                                     [접근 제어가 필요한 Route 컴포넌트들의 컨테이터 컴포넌트]
|      |      |--- AuthContextProvider.js                            [JWT Access Token을 Context내에 저장과 사용을 도와주는 컴포넌트 및 훅]
|      |      |--- AuthNesting.js                                    [Neting Routes 기반 Helper Component]
|      |--- /component                      
|      |      |--- /main                                             [Main Component 구현 패키지]
|      |      |      |--- index.js                                   [component/main 패키지 내의 export 컴포넌트 설정: Main]
|      |      |      |--- Main.js
|      |      |      |--- DialogSignin.js
|      |      |      |--- DialogSignup.js
|      |      |      |--- Welcome.js
|      |      |--- /account                                          [account 메뉴에 라우팅 되는 Component들의 구현 패키지]
|      |      |      |--- index.js                                   [component/account 패키지 내의 export 컴포넌트 설정: Profile, Experiences, Projects, Educations, Skills, Trainings]
|      |      |      |--- Profile.js                                 [Profile Component]        
|      |      |      |--- /experiences                               [Experiences Component]                               
|      |      |      |      |--- Experiences.js
|      |      |      |      |--- ExperienceItem.js
|      |      |      |--- /projects                                  [Projects Component]
|      |      |      |      |--- Projects.js
|      |      |      |--- /educations                                [Educations Component]
|      |      |      |      |--- Educations.js
|      |      |      |      |--- EducationItem.js
|      |      |      |--- /skills                                    [Skills Component]
|      |      |      |      |--- Skills.js
|      |      |      |--- /trainings                                 [Trainings Component]
|      |      |      |      |--- Trainings.js
|      |      |--- /dashboard
|      |--- /layout                                                  [Layout Component 구현 패키지]
|      |      |--- index.js                                          [component/lauout 패키지 내의 export 컴포넌트 설정: LayoutMain, LayoutAccount]
|      |      |--- LayoutMain.js                                     [Main Component의 부모 고계 컴포넌트]
|      |      |--- LayoutAccount.js                                  [account Component 들의 부모 고계 컴포넌트]       
|      |      |--- Header.js
|      |      |--- Footer.js
|      |      |--- SidePannel.js
|      |      |--- SidebarAccount.js
|      |      |--- LayoutDashboard.js 
</pre>
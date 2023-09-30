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
|      |      |      |--- /main
|      |      |      |      |--- Main.css
|      |      |      |      |--- DialogSignin.css
|      |      |      |      |--- Welcome.css
|      |      |      |--- /account
|      |      |      |      |--- profile
|      |      |      |      |     |--- Profile.css
|      |      |      |      |--- experiences
|      |      |      |      |     |--- Experiences.css
|      |      |      |      |     |--- ExperienceItem.css
|      |      |      |      |--- projects
|      |      |      |      |     |--- Projects.css
|      |      |      |      |--- educations
|      |      |      |      |     |--- Educations.css
|      |      |      |      |--- skills
|      |      |      |      |     |--- Skills.css
|      |      |      |      |--- trainings
|      |      |      |      |     |--- Trainings.css
|      |      |      |--- /dashboard
|      |      |      |--- /common
|      |      |      |      |--- Header.css
|      |      |      |      |--- Footer.css
|      |      |      |      |--- SidePannel.css
|      |      |      |      |--- SidebarAccount.css
|      |--- /auth                                                    [JWT Client for React 구현 패키지]
|      |      |--- index.js                                          [component/auth 패키지 내의 export 컴포넌트 설정: AuthContextRouter, AuthRoutes, useAuthContext]
|      |      |--- AuthContextRouter.js                              [접근 제어 라우터: Context 내에 access token 저장 관리]
|      |      |--- AuthRoutes.js                                     [접근 제어가 필요한 Route 컴포넌트 들의 컨테이터]
|      |      |--- AuthContextProvider.js                            [JWT Access Token을 Context내에 저장과 사용을 도와주는 컴포넌트 및 훅]
|      |      |--- AuthNesting.js                                    [Neting Routes 기반 Authentication Validation Helper]
|      |--- /component                      
|      |      |--- /main                                             [Main Component 구현 패키지]
|      |      |      |--- index.js                                   [component/main 패키지 내의 export 컴포넌트 설정: Main]
|      |      |      |--- Main.js
|      |      |      |--- DialogSignin.js
|      |      |      |--- DialogSignup.js
|      |      |      |--- Welcome.js
|      |      |--- /account                                          [account 메뉴에 라우팅 되는 Component들의 구현 패키지]
|      |      |      |--- index.js                                   [component/account 패키지 내의 export 컴포넌트 설정: Profile, Experiences, Projects, Educations, Skills, Trainings]
|      |      |      |--- Account.js                                 [자식 profile, experience, ... 등의 공통 Component 처리 및 Layout 역할을 하는 부모 컴포넌트]        
|      |      |      |--- Sidebar.js                                 [account 컴포넌트들의 공통 사이드바 메뉴 컴포넌트] 
|      |      |      |--- /profile                                   [Profile Component 구현 패키지]        
|      |      |      |      |--- index.js                            [component/profile 패키지 내의 export 컴포넌트 설정: Profile]
|      |      |      |      |--- Profile.js                                
|      |      |      |--- /experiences                               [Experiences Component 구현 패키지]                               
|      |      |      |      |--- index.js                            [component/experiences 패키지 내의 export 컴포넌트 설정: Experiences]
|      |      |      |      |--- Experiences.js
|      |      |      |      |--- ExperienceItem.js
|      |      |      |--- /projects                                  [Projects Component 구현 패키지]
|      |      |      |      |--- index.js                            [component/projects 패키지 내의 export 컴포넌트 설정: Projects]
|      |      |      |      |--- Projects.js
|      |      |      |--- /educations                                [Educations Component 구현 패키지]
|      |      |      |      |--- index.js                            [component/educations 패키지 내의 export 컴포넌트 설정: Educations]
|      |      |      |      |--- Educations.js
|      |      |      |      |--- EducationItem.js
|      |      |      |--- /skills                                    [Skills Component 구현 패키지]
|      |      |      |      |--- index.js                            [component/skills 패키지 내의 export 컴포넌트 설정: Skills]
|      |      |      |      |--- Skills.js
|      |      |      |--- /trainings                                 [Trainings Component 구현 패키지]
|      |      |      |      |--- index.js                            [component/trainings 패키지 내의 export 컴포넌트 설정: Trainings]
|      |      |      |      |--- Trainings.js
|      |      |--- /dashboard
|      |      |--- /common                                           [common components 구현 패키지]
|      |      |      |--- index.js                                   [component/common 패키지 내의 export 컴포넌트 설정: Header, Footer]
|      |      |      |--- Header.js
|      |      |      |--- Footer.js
|      |      |      |--- SidePannel.js
</pre>
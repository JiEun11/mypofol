1. 프로젝트 생성
$ npm init -y 

2. 패키지 설치
    1) 개발툴
        $ npm i -D webpack webpack-cli webpack-dev-server style-loader css-loader node-sass sass-loader babel-loader @babel/core @babel/cli @babel/preset-env @babel/preset-react @babel/plugin-transform-runtime @babel/plugin-syntax-throw-expressions concurrently

    2) react library
        $ npm i react react-dom react-addons-update react-router react-router-dom prop-types react-modal styled-components react-cookie jwt-decode

3. webpack.config.js 설정 (https://github.com/poscoict-bitacademy/react-practices/tree/main/mysite07 참고)
4. babel.config.json 설정 (https://github.com/poscoict-bitacademy/react-practices/tree/main/mysite07 참고)

5. npm 스크립팅
    1) "dev:be": "cd ../backend && npm run dev"
    2) "dev:fe": "npx webpack serve --config config/webpack.config.js --progress --mode development"
    3) "dev": "concurrently \"npm run dev:be\" \"npm run dev:fe\" --kill-others",

    4) "build:be": "cd ../backend && npm i",
    5) "build:fe": "npx webpack --config config/webpack.config.js --progress --mode production",
    6) "build": "npm run build:fe && npm run build:be",

    7) "start": "npm run build:fe && cd ../backend && npm i && npm start"


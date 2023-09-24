# pofol03.facelift


## outline
#### 1. backend
1. rdbms: mariadb, schema.v3
2. express mvc/restful
3. view engine: ejs
4. model: mysql2, sql based
5. api docs: swagger-ui-express, swagger-jsdoc
#### 2. frontend
1. facelift
2. jQuery(dom api + $.ajax)


## packages installed
```sh
$ npm i express
$ npm i express-session
$ npm i mysql2 
$ npm i ejs
$ npm i dotenv
$ npm i cross-env
$ npm i -D swagger-ui-express
$ npm i -D swagger-jsdoc
$ npm i -D nodemon
$ npm i jsonwebtoken cookie-parser
```

## project structure
<pre>
/pofol03.facelift
    |--- package.json
    |--- package-lock.json
    |--- [node_modules]
    |--- public
    |       |--- js
    |       |--- css
    |       |--- images
    |--- index.js
    |--- config
    |--- routes
    |--- models      (M)
    |--- views       (V)
    |--- controllers (C)
</pre>


## run application
#### 1. development
```sh
$ npm run dev
```
#### 2. production
```sh
$ npm start
```

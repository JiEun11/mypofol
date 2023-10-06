## mariadb set-up

#### 1. 데이터베이스 / 계정 생성 / 권한 작업
```sh
$ mysql -u root -p
MariaDB [(none)]> create database mypofol;
MariaDB [(none)]> create user 'mypofol'@'localhost' identified by 'mypofol';
MariaDB [(none)]> grant all privileges on mypofol.* to 'mypofol'@'localhost';
MariaDB [(none)]> flush privileges;
```

#### 2. workbench
1. Connection 생성
2. Model 파일(mypofol.mwb) forward engineering
3. mypofol.data.sql 실행

#### 3. config/db.env 정보 확인
```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=mypofol
DB_USER=mypofol
DB_PASSWORD=mypofol
DB_CONNECTION_TIMEOUT=5000
DB_CONNECTION_LIMIT=30
DB_CONNECTION_MAXIDLE=10
```


-- user 추가
desc user;

insert
  into user
values (null, 'bella', 'shdudtnr3939@gmail.com', password('1234'), '김지은', 'World-renowned Software Engineer', '경기도 성남시 중원구', 'Hello, This is DreamCoder Full of Inspiration.',  '/upload-images/1e9b025b67079428922a41d5bc6aa952.jpg', now(), now());

select * from user;
select id, account, email, name, title, description, image_profile as imageProfile from user where email='soo' and password='soo';

-- experience 추가
desc experience;

insert into experience values(null, '사원 / 정규직', '포스코 DX/Smart IT 사업실 포스코 IT 사업부 ERP섹션', 'Java 풀스택 개발/운영', '2019-01-00', null, '/upload-images/1f1b025b67079428922a41d5bc6aa952.jpg', now(), now(), 1); 

select id, title, company, description, date_format(from_date, "%Y-%m") as fromDate, if(to_date is null, "재직", date_format(to_date, "%Y-%m")) as toDate, image_logo as imageLogo from experience where user_id=1;

-- education 추가
desc education;

insert into education values(null, '단국 대학교 / 응용 컴퓨터 공학과', '2016-03-00', '2022-02-00', 'BS', '/upload-images/2a1b025b67072421922a41d5bc6ab351.png', now(), now(), 1); 
insert into education values(null, '체코 오스트라바 공과 대학교 / 컴퓨터 엔지니어링', '2020-09-00', '2020-12-00', 'EX', '/upload-images/3b1b025b0707a421922a41d5bc6abe51.png', now(), now(), 1); 
insert into education values(null, '천안 북일 여자고등학교', '2013-03-00', '2016-02-00', 'GRD', '/upload-images/3f1e029ba707a421922a4115bceabe39.jpg', now(), now(), 1);

select id, title, date_format(from_date, "%Y-%m") as fromDate, if(to_date is null, "재학중", date_format(to_date, "%Y-%m")) as toDate, degrees, image_logo as imageLogo from education where user_id=1 order by from_date desc;


-- training 추가
desc training;

insert into training values(null, 'education', '포스코 청년 IT 아카데미', '2022-05-00', null, now(), now(), 1);
insert into training values(null, 'certificate', '정보처리기사', '2022-12-00', null, now(), now(), 1);
insert into training values(null, 'certificate', '리눅스마스터', '2018-09-00', '2급', now(), now(), 1);  
insert into training values(null, 'language', 'OPIC', '2021-06-00', '레벨 IH', now(), now(), 1);
insert into training values(null, 'language', 'TOFEL', '2020-02-00', '73점', now(), now(), 1);

select id, type, title, date_format(awarded, "%Y-%m") as awarded, ifnull(description, "") as description from training where user_id=1 order by type, awarded desc;


-- skillset 추가
desc skillset;

insert into skillset values(null, 'Backend', now(), now(), 1);
insert into skillset values(null, 'Frontend', now(), now(), 1);
insert into skillset values(null, 'Data Science', now(), now(), 1);
insert into skillset values(null, 'Database', now(), now(), 1);
insert into skillset values(null, 'Development Env.', now(), now(), 1);
insert into skillset values(null, 'Web Service Infra.', now(), now(), 1);

select * from skillset;


-- skill 추가
desc skill;

insert into skill values(null, 'Java / Spring', '4', null, now(), now(), 1);
insert into skill values(null, 'Node.js / Express', '4', null, now(), now(), 1);

insert into skill values(null, 'JavaScript', '4', null, now(), now(), 2);
insert into skill values(null, 'TypeScript', '3', null, now(), now(), 2);
insert into skill values(null, 'HTML5, CSS3 / 웹표준', '4', null, now(), now(), 2);
insert into skill values(null, 'React.js', '4', null, now(), now(), 2);
insert into skill values(null, 'jQuery', '4', null, now(), now(), 2);

insert into skill values(null, 'Python', '4', null, now(), now(), 3);
insert into skill values(null, 'Machine Learning', '4', null, now(), now(), 3);
insert into skill values(null, 'Tensorflow', '4', null, now(), now(), 3);
insert into skill values(null, 'R', '4', null, now(), now(), 3);

insert into skill values(null, 'MariaDB(MySql)', '4', null, now(), now(), 4);
insert into skill values(null, 'Oracle', '3', null, now(), now(), 4);
insert into skill values(null, 'PostgreSQL', '3', null, now(), now(), 4);
insert into skill values(null, 'MongoDB', '3', null, now(), now(), 4);
insert into skill values(null, 'SQL Development', '4', null, now(), now(), 4);
insert into skill values(null, 'Schema Design(Data Modeling)', '4', null, now(), now(), 4);
insert into skill values(null, 'ORM / Java, MyBatis', '4', null, now(), now(), 4);

insert into skill values(null, 'Git', '4', null, now(), now(), 5);
insert into skill values(null, 'Jenkins(CI/CD)', '4', null, now(), now(), 5);

insert into skill values(null, 'Linux Configuration & Management / CentOS, Ubuntu', '4', null, now(), now(), 6);
insert into skill values(null, 'Cloud Computing / AWS, GCP', '4', null, now(), now(), 6);
insert into skill values(null, 'Web Server(WAS) / Tomcat, Apache, Nginx', '4', null, now(), now(), 6);


select a.id, a.name, a.level, a.duration, b.name as skillSet from skill a, skillset b where a.skillset_id = b.id and b.user_id = 1;

-- Projects
desc project_category;

insert into project_category values(null, 'Backend', now(), now());
insert into project_category values(null, 'Frontend', now(), now());

select * from project_category;

desc project;

insert into project values(null, 'ERP 구매, eProcument 시스템', null, '포스코 계열사 및 공급사가 사용하는 ERP의 구매 시스템 고도화 및 운영', '/upload-images/4e1e019ba707a421922a4125bckaq130.png', '2023-01-00', null, now(), now(), 1, 1);
insert into project values(null, 'AI 원료 예측 시스템', null, '적기적소의 원료 구매를 위한 원료 예측 시스템 개발 (포스코 홀딩스 AI 연구소 및 포스코 원료팀)', '/upload-images/4b1e019ya719a211122a9105bckpq232.png', '2022-06-00', null, now(), now(), 1, 2);
insert into project values(null, '내부 회계 관리 시스템', null, '포스코 ERP 내부통제 프로세스가 반영된 내부 회계 관리 시스템 구축(신입 사원 입사 프로젝트)', '/upload-images/4e1e019ba707a421922a4125bckaq130.png', '2022-03-00', '2022-06-00', now(), now(), 1, 1);
insert into project values(null, '포트폴리오 서비스, MyPortfolio', null, '회원들의 포트폴리오 제작 / 관리 서비스 (개인 프로젝트)', '/upload-images/5k1t011cn188a81102ya4125mcka2159.png', '2022-01-00', '2022-03-00', now(), now(), 1, 2);


select a.id, a.name, b.projectCount from project_category a, (select b.id, count(*) as projectCount from project a, project_category b where a.project_category_id = b.id  and a.user_id=1 group by b.id) b where a.id = b.id;
select a.name, a.role, a.description, a.image_project, date_format(from_date, "%Y-%m") as fromDate, if(to_date is null, "현재", date_format(to_date, "%Y-%m")) as toDate, b.name as categoryName from project a, project_category b where a.project_category_id = b.id  and a.user_id=1;


-- Contact
desc contact;

insert into contact values(null, 'phone', '010-9959-9896', now(), now(), 1);
insert into contact values(null, 'instagram', 'https://www.instagram.com/bella___jin', now(), now(), 1);
insert into contact values(null, 'github', 'https://github.com/JiEun11', now(), now(), 1);
insert into contact values(null, 'blog', 'https://velog.io/@devbella', now(), now(), 1);
insert into contact values(null, 'youtube', 'https://www.youtube.com/channel/UCffzrqaHP8JB53GHuzmLMDw', now(), now(), 1);
insert into contact values(null, 'email', 'shdudtnr3939@gmail.com', now(), now(), 1);


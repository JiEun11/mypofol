-- insert category
desc category;

insert into category(name, createdAt, lastUpdatedAt) value('skills', now(), now());
insert into category(name, createdAt, lastUpdatedAt) value('tools', now(), now());
insert into category(name, createdAt, lastUpdatedAt) value('etc', now(), now());

select id, name, createdAt, lastUpdatedAt from category;


-- insert skills
desc skills;

insert into skills(name, categoryId, createdAt, lastUpdatedAt) values ('HTML', 1, now(), now());
insert into skills(name, categoryId, createdAt, lastUpdatedAt) values ('CSS', 1, now(), now());
insert into skills(name, categoryId, createdAt, lastUpdatedAt) values ('JavaScript', 1, now(), now());

SELECT sk.id, sk.name, sk.categoryId, sk.createdAt, sk.lastUpdatedAt FROM skills as sk ORDER BY sk.createdAt DESC;



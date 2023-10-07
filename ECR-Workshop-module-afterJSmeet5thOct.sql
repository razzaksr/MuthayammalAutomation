-- create database mec_automation;
use mec_automation;
-- create table data_majors(major_id int not null auto_increment primary key,major_name varchar(255) not null);
-- create table data_subtypes(subtype_id int not null auto_increment primary key, subtype_name varchar(255) not null, major_id int not null);
-- alter table data_subtypes add foreign key(major_id) references data_majors(major_id);
-- create table data_dept(dept_id int not null auto_increment primary key, dept_name varchar(255) not null);
-- create table data_approvals(approval_id int not null auto_increment primary key, subtype_id int not null, report_lvl1 varchar(50) not null, report_lvl2 varchar(50) not null,report_lvl3 varchar(50) not null,report_lvl4 varchar(50) not null,report_lvl5 varchar(50) not null,dept_id int not null);
-- ALTER TABLE `mec_automation`.`data_approvals` CHANGE COLUMN `report_lvl1` `report_lvl1` VARCHAR(50) NULL ,CHANGE COLUMN `report_lvl2` `report_lvl2` VARCHAR(50) NULL ,CHANGE COLUMN `report_lvl3` `report_lvl3` VARCHAR(50) NULL ,CHANGE COLUMN `report_lvl4` `report_lvl4` VARCHAR(50) NULL ,CHANGE COLUMN `report_lvl5` `report_lvl5` VARCHAR(50) NULL ;
-- alter table data_approvals add foreign key(dept_id) references data_dept(dept_id);
-- alter table data_approvals add foreign key(subtype_id) references data_subtypes(subtype_id);
-- show tables;
-- create table data_ecr_workshop(workshop_id int not null auto_increment primary key,workshop_name varchar(255) not null, subtype_id int not null, report_lvl1 varchar(50) not null, report_lvl2 varchar(50) not null,report_lvl3 varchar(50) not null,report_lvl4 varchar(50) not null,report_lvl5 varchar(50) not null,dept_id int not null, eve_status int not null, is_eve_completed bool null);
-- ALTER TABLE `mec_automation`.`data_ecr_workshop` CHANGE COLUMN `report_lvl1` `report_lvl1` VARCHAR(50) NULL ,CHANGE COLUMN `report_lvl2` `report_lvl2` VARCHAR(50) NULL ,CHANGE COLUMN `report_lvl3` `report_lvl3` VARCHAR(50) NULL ,CHANGE COLUMN `report_lvl4` `report_lvl4` VARCHAR(50) NULL ,CHANGE COLUMN `report_lvl5` `report_lvl5` VARCHAR(50) NULL ;
-- alter table data_ecr_workshop add foreign key(subtype_id) references data_subtypes(subtype_id);
-- alter table data_ecr_workshop add foreign key(dept_id) references data_dept(dept_id);
-- alter table data_ecr_workshop add column eve_proposed_by int not null;
-- ALTER TABLE `mec_automation`.`data_ecr_workshop` CHANGE COLUMN `eve_status` `eve_status` INT NOT NULL DEFAULT 0 ;
-- create table data_designation(designation_id int not null auto_increment primary key,designation_name varchar(100) not null);
-- create table data_faculties(faculty_id int not null auto_increment primary key,faculty_name varchar(255) not null, faculty_dept int not null, faculty_desig int not null);
-- alter table data_faculties add foreign key(faculty_dept) references data_dept(dept_id);
-- alter table data_faculties add foreign key(faculty_desig) references data_designation(designation_id);

-- insert into data_majors values(1301,"ECR"),(1302,"SetOf"),(1303,"SysTa");
-- insert into data_subtypes values(1901,"Workshop",1301),(1902,"Seminar",1301),(1903,"Guest Lecturer",1301),(1904,"Conference",1301),(1905,"VAC",1301),(1906,"Symposium",1301),(1907,"FDP",1301),(1908,"Others",1301);

-- ALTER TABLE `mec_automation`.`data_ecr_workshop` 
-- DROP FOREIGN KEY `data_ecr_workshop_ibfk_1`;
-- ALTER TABLE `mec_automation`.`data_ecr_workshop` CHANGE COLUMN `subtype_id` `subtype_id` INT NOT NULL DEFAULT 1901 ;
-- ALTER TABLE `mec_automation`.`data_ecr_workshop` ADD CONSTRAINT `data_ecr_workshop_ibfk_1` FOREIGN KEY (`subtype_id`) REFERENCES `mec_automation`.`data_subtypes` (`subtype_id`);

-- insert into data_designation values(401,"Principal"),(402,"Dean"),(403,"HOD"),(404,"Professor"),(405,"Associate Professor"),(406,"Assistance Professor"),(407,"Society Coordinator");
-- insert into data_dept values(1,"CSE"),(2,"ECE"),(3,"EEE"),(4,"MECH"),(5,"IT"),(6,"AI & DS"),(7,"CS"),(8,"AI & ML");

-- insert into data_faculties values(6001,"Dr.G.Kavitha",1,403),(6002,"Dr.A.S.Prabakaran",1,404),(6003,"Dr.Sabarinathan",3,403),(6004,"Dr.Arun Rajput",3,404),(6005,"Dr.Sheik Ameeth",5,403),(6006,"Dr.Valli",5,404),(6007,"Victor Prakash",1,406),(6008,"Martin",5,406),(6009,"Kevin",3,406),(6010,"Downey",1,407);
-- insert into data_approvals(approval_id,subtype_id,report_lvl1,report_lvl2,dept_id) values(1001,1901,"6001,6002","6000",1),(1002,1901,"6005,6005","6000",5),(1003,1901,"6003,6004","6000",3);

-- update data_ecr_workshop set report_lvl1 = case when report_lvl1 like '%6001%' then '6001' else report_lvl1 end,report_lvl2 = case when report_lvl2 like '%6001%' then '6001' else report_lvl2 end,report_lvl3 = case when report_lvl3 like '%6001%' then '6001' else report_lvl3 end,report_lvl4 = case when report_lvl4 like '%6001%' then '6001' else report_lvl4 end,report_lvl5 = case when report_lvl5 like '%6001%' then '6001' else report_lvl5 end where report_lvl1 like '%6001%' or report_lvl2 like '%6001%' or report_lvl3 like '%6001%' or report_lvl4 like '%6001%' or report_lvl5 like '%6001%';
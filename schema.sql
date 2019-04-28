DROP DATABASE IF EXISTS test;

CREATE DATABASE test;

USE test;

CREATE TABLE users (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  email varchar(255) NOT NULL,
  pass varchar(255) NOT NULL,
  PRIMARY KEY (ID)
);

CREATE TABLE plans (
  id int NOT NULL AUTO_INCREMENT,
  user_id int NOT NULL,
  planName varchar(255) NOT NULL,
  -- exercise varchar(255) NOT NULL,
  -- setCount int NOT NULL,
  -- repTotal int NOT NULL,
  -- plan_group varchar(255) NOT NULL,
  PRIMARY KEY (ID),
  UNIQUE (planName)
 -- remove exercise, repcount?, plangroups
);

CREATE TABLE groups (
  id int NOT NULL AUTO_INCREMENT,
  title varchar(255) NOT NULL,
  plan_id int NOT NULL,
  setCount int NOT NULL,
  -- repCount int NOT NULL,
  PRIMARY KEY (ID)
  -- should make title UNIQUE
  -- set count is just to load preset starter data for set headers
);

CREATE TABLE exercises (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  -- numOfSets int NOT NULL,
  numOfReps int NOT NULL,
  plan_id int NOT NULL,
  group_id int NOT NULL,
  PRIMARY KEY (ID)
  -- numOfReps is to load preset starter data for reps
);

CREATE TABLE sets_rest (
  id int NOT NULL AUTO_INCREMENT,
  logs_id int NOT NULL,
  exercise varchar(255) NOT NULL,
  setNum int NOT NULL,
  weight int,
  reps int,
  rest int,
  date date NOT NULL,
  PRIMARY KEY (ID) 
);

-- CREATE TABLE rest (
--   id int NOT NULL AUTO_INCREMENT,
--   sets_rest_id int NOT NULL,
--   PRIMARY KEY (ID)
-- );

CREATE TABLE logs ( 
  id int NOT NULL AUTO_INCREMENT,
  dateCreated datetime NOT NULL,
  user_id int NOT NULL,
  plan_id int NOT NULL,
  plan_group varchar(255) NOT NULL,
  PRIMARY KEY (ID)
);

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

 INSERT INTO logs (dateCreated, user_id, plan_id, plan_group)
 VALUES (now(), 1, 1, 'B');

 INSERT INTO logs (dateCreated, user_id, plan_id, plan_group)
 VALUES (now(), 1, 1, 'A');

 INSERT INTO logs (dateCreated, user_id, plan_id, plan_group)
 VALUES (now(), 1, 1, 'A');

 INSERT INTO logs (dateCreated, user_id, plan_id, plan_group)
 VALUES (now(), 1, 1, 'A');

 INSERT INTO logs (dateCreated, user_id, plan_id, plan_group)
 VALUES (now(), 1, 1, 'A');

 INSERT INTO logs (dateCreated, user_id, plan_id, plan_group)
 VALUES (now(), 1, 1, 'A');

--  INSERT INTO sets_rest(logs_id, exercise, setNum, reps, rest, date)
--  VALUES (1, 'OverheadPress', 1, 5, 4000, now());

 INSERT INTO plans (user_id, planName)
 VALUES (1, 'woopidy');

 INSERT INTO plans (user_id, planName)
 VALUES (1, 'boopidy');

INSERT INTO groups (title, plan_id, setCount)
VALUES ('A', 1, 5);

INSERT INTO groups (title, plan_id, setCount)
VALUES ('B', 1, 5);

INSERT INTO groups (title, plan_id, setCount)
VALUES ('C', 1, 5);

INSERT INTO groups (title, plan_id, setCount)
VALUES ('on', 2, 5);

INSERT INTO groups (title, plan_id, setCount)
VALUES ('off', 2, 5);

INSERT INTO exercises (name, numOfReps, plan_id, group_id)
VALUES ('Overhead Press', 5, 1, 1);

INSERT INTO exercises (name, numOfReps, plan_id, group_id)
VALUES ('Front Squat/ Clean', 5, 1, 1);

INSERT INTO exercises (name, numOfReps, plan_id, group_id)
VALUES ('Bent-over Row', 5, 1, 1);

INSERT INTO exercises (name, numOfReps, plan_id, group_id)
VALUES ('Dead Lift', 5, 1, 1);

INSERT INTO exercises (name, numOfReps, plan_id, group_id)
VALUES ('Pull-up', 5, 1, 1);

INSERT INTO exercises (name, numOfReps, plan_id, group_id)
VALUES ('Hip Thrust', 5, 1, 1);


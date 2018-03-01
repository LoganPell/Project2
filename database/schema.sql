DROP DATABASE IF EXISTS express_cc;
CREATE DATABASE express_cc;

USE express_cc;

CREATE TABLE users(
	id INT NOT NULL AUTO_INCREMENT,
	username VARCHAR(15) NOT NULL,
	email VARCHAR(100) NOT NULL,
	password VARCHAR(100),
	UNIQUE(username, email),
	PRIMARY KEY (id)
);

CREATE TABLE blogger_table(
	id INT NOT NULL AUTO_INCREMENT,
	author_name VARCHAR(15) NOT NULL,
	posts varchar (200) NOT NULL,	
	PRIMARY KEY (id)
);

CREATE TABLE post_table(
	id INT NOT NULL AUTO_INCREMENT,
	posts varchar (200) NOT NULL,	
	author_name VARCHAR(15) NOT NULL,
	PRIMARY KEY (id)
);

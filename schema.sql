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

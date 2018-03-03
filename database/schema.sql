DROP DATABASE IF EXISTS express_cc;
CREATE DATABASE express_cc;

USE express_cc;

CREATE TABLE users(
	userID INT NOT NULL AUTO_INCREMENT,
	username VARCHAR(15) NOT NULL,
	email VARCHAR(100) NOT NULL,
	password VARCHAR(100),
	UNIQUE(username, email),
	PRIMARY KEY (userID)
);

CREATE TABLE posts(
	postID INT NOT NULL AUTO_INCREMENT,
	postTime TIMESTAMP,
	post TEXT NOT NULL,
	userID INT,
	PRIMARY KEY (postID),
	FOREIGN KEY (userID) REFERENCES users(userID)
);

CREATE TABLE comments(
	commentID INT NOT NULL AUTO_INCREMENT,
	commentTime TIMESTAMP,
	comment TEXT NOT NULL,
	userID INT,
	postID INT,
	PRIMARY KEY (commentID),
	FOREIGN KEY (userID) REFERENCES users(userID),
	FOREIGN KEY (postID) REFERENCES posts(postID)
);
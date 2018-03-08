DROP DATABASE IF EXISTS express_cc;
CREATE DATABASE express_cc;

USE express_cc;

CREATE TABLE users(
    userID INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(15) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(60),
    CONSTRAINT users_uc UNIQUE (username, email),
    PRIMARY KEY (userID)
);

CREATE TABLE posts(
    postID INT NOT NULL AUTO_INCREMENT,
    userID INT NOT NULL,
    postTitle VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    postBody TEXT(1000),
    link TEXT(1000),
    upvotes INT NULL,
    downvotes INT NULL,
    PRIMARY KEY (postID),
    FOREIGN KEY (userID) REFERENCES users(userID),
    ts TIMESTAMP
);

CREATE TABLE comments(
    commentID INT NOT NULL AUTO_INCREMENT,
    userID INT NOT NULL,
    postID INT NOT NULL,
    comment VARCHAR(1000) NOT NULL,
    upvotes INT NULL,
    downvotes INT NULL,
    PRIMARY KEY (commentID),
    FOREIGN KEY (userID) REFERENCES users(userID),
    FOREIGN KEY (postID) REFERENCES posts(postID),
    ts TIMESTAMP
);

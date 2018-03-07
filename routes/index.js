var express = require("express");
var router = express.Router();

var expressValidator = require('express-validator');

//Hashing passwords
var bcrypt = require('bcrypt');
const saltRounds = 10;
//sessions storage
var passport = require('passport');

router.get('/', function(req, res) {
	console.log(req.user);
	console.log(req.isAuthenticated());
	const db = require("../db.js");
	db.query("SELECT * FROM posts",function(error, results, fields){
		console.log(results);
		res.render('home', { title: 'Home', posts: results});
	});
});

router.post('/post', authenticatMiddleware(), function(req, res) {
	console.log(req.body);
	req.checkBody('postTitle').notEmpty();
	req.checkBody('postForm').notEmpty();

	const errors = req.validationErrors();
	if (errors) {
		res.render('post', 
			{ title: 'Post Error', 
			errors: errors
		});
	} else {
		const postTitle = req.body.postTitle;
		const postBody = req.body.postBody;

		const db = require('../db.js');

		db.query('INSERT INTO posts (postTitle, postBody) VALUES (?, ?)', [postTitle, postBody], function(error, results, fields) {
			if (error) throw error;
		});
	}
});

router.get('/post/:id', function(req,res) {
	const db = require('../db.js');
	console.log("/post/ "+req.params.id)
	db.query('SELECT * FROM posts WHERE postID=?', [req.params.id], function(error, results) {
		console.log(results);
		res.render('post', { title: 'Post', post: results });
	});
	// res.redirect to post
});  

<<<<<<< HEAD
router.get('/profile', authenticatMiddleware(), function(req, res) {
	res.render('profile', { title: 'Profile' });
=======
router.get('/', function(req, res) {
	// console.log(req.user);
	console.log(req.isAuthenticated());
	const db = require("../db.js");
	db.query("SELECT * FROM posts",function(error, results, fields){
		console.log(results)
		res.render('home', { title: 'Home', posts: results});
	});
	// console.log(req.user);
	// console.log(req.isAuthenticated());
	// res.render('home', { title: 'Home' });
});


router.get('/profile', function(req, res) {
	res.render('profile', { title: 'Profile', authenticate: true });
>>>>>>> 589ee87799788f72ab3043f7a8e6f497434cdcd2
});

//Login Page
router.get('/login', function(req, res) {
	res.render('login', { title: 'Login'});
});

router.post('/login', passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/login'
	})
);

router.get('/logout', function(req, res) {
	req.logout();
	req.session.destroy();
	res.redirect('/');
});

//Registration Page
router.get('/register', function(req, res, next) {
	console.log(req.status);
  res.render('register', { title: 'Registration' });
});

router.post('/register', function(req, res, next) {
	console.log(req.body);
	req.checkBody('username', 'Username field cannot be empty.').notEmpty();
	req.checkBody('username', 'Username must be between 4-15 characters long.').len(4, 15);
	req.checkBody('email', 'The email you entered is invalid, please try again.').isEmail();
	req.checkBody('email', 'Email address must be between 4-100 characters long, please try again.').len(4, 100);
	req.checkBody('password', 'Password must be between 8-100 characters long.').len(8, 100);
	req.checkBody("password", "Password must include one lowercase character, one uppercase character, a number, and a special character.").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/, "i");
	req.checkBody('passwordMatch', 'Password must be between 8-100 characters long.').len(8, 100);
	req.checkBody('passwordMatch', 'Passwords do not match, please try again.').equals(req.body.password);

	const errors = req.validationErrors();

	if (errors) {
		console.log('Line 59 errors: ${JSON.stringify(errors)}');

		res.render('register', {
			title: 'Registration Error',
			errors: errors
		});
	} else {
		const username = req.body.username;
		const email = req.body.email;
		const password = req.body.password;

		const db = require("../db.js");

		bcrypt.hash(password, saltRounds, function(err, hash) {
			db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hash], function(error, results, fields) {
				if (error) throw error;
					
				//access user sessions data

				db.query('SELECT LAST_INSERT_ID() as user_id', function(error, results, fields) {
					if (error) throw error;

					const user_id = results[0];

					console.log(results[0]);

					req.login(user_id, function(err) {
						// console.log(err);
						res.redirect('/');
					});
				});
			});
			
		});
	}
}); 

passport.serializeUser(function(user_id, done) {
	done(null, user_id);
});

passport.deserializeUser(function(user_id, done) {
	done(null, user_id);
});

function authenticatMiddleware() {
	return (req, res, next) => {
		console.log('req.session.passport.user: $(JSON.stringify(req.session.passport)');

		if (req.isAuthenticated()) return next();

		res.redirect('/login');
	}
}

module.exports = router;
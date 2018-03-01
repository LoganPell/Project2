var express = require("express");
var router = express.Router();
require('dotenv').config();

//Hashing passwords
var bcrypt = require('bcrypt');
const saltRounds = 10;

var passport = require('passport');


router.get('/', function(req, res) {
	// console.log(req.user);
	// console.log(req.isAuthenticated());
	res.render('home', { title: 'Home' });
});

router.get('/profile', function(req, res) {
	res.render('profile', { title: 'Profile', authenticate: true });
});

router.get('/login', function(req, res) {
	res.render('login', { title: 'Login'});
});

router.post('/login', passport.authenticate('local', {
	successRedirect: '/profile',
	failureRedirect: '/login'})
);

router.get('/logout', function(req, res) {
	req.logout();
	req.session.destroy();
	res.redirect('/');
});

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Registration' });
});

router.post('/register', function(req, res, next) {
	console.log(req.body);
	req.checkBody('username', 'Username field cannot be empty.').notEmpty();
	req.checkBody('username', 'Username must be between 4-15 character long.').len(4, 15);
	req.checkBody('email', 'The email you entered is invalid, please try again.').isEmail();
	req.checkBody('email', 'Email address must be between 4-100 characters long, please try again.').len(4, 100);
	req.checkBody('password', 'Password must be between 8-100 characters long.').len(8,100);
	// req.checkBody('password', 'Password must include one lowercase character, one upppercase character, a number, and a special character.').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-D])(?=!.*)(?=.*[^a-zA-Z0-9]).{8,}$/, "i");
	req.checkBody('passwordMatch', 'Password must be between 8-100 characters long.').len(8, 100);
	req.checkBody('passwordMatch', 'Password do not match, please try again.').equals(req.body.password);

	const errors = req.validationErrors();

	if (errors) {
		console.log('errors: ${JSON.stringify(errors)}');

		res.redirect('/register', {
			title: 'Registration Error',
			errors: errors
		});
		alert("please try again");
	} else {
		const username = req.body.username;
		const email = req.body.email;
		const password = req.body.password;

		const db = require("../db.js");

		bcrypt.hash(password, saltRounds, function(err, hash) {
			db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hash], function(error, results, fields) {
				if (error) throw error;

				db.query('SELECT LAST_INSERT_ID() as user_id', function(error, results, fields) {
					if (error) throw error;

					const user_id = results[0];

					console.log(results[0]);
					req.login(user_id, function(err) {
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

// ---------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------


//Our Models
// var db = require("../models/author.js");

// // Find all Authors and return them to the user with res.json
// router.get("/authors", function(req, res) {
// 	db.Author.findAll({}).then(function(dbAuthor) {
// 		res.json(dbAuthor);
// 	});
// });

// router.get("/authors/:id", function(req, res) {
// 	 // Find one Author with the id in req.params.id and return them to the user with res.json
// 	db.Author.findOne({
// 		where: {
// 			id: req.params.id
// 		}
// 	}).then(function(dbAuthor) {
// 		res.json(dbAuthor);
// 	});
// });

// router.post("/authors", function(req, res) {
// 	 // Create an Author with the data available to us in req.body
// 	console.log(req.body);
// 	db.Author.create(req.body).then(function(dbAuthor) {
// 		res.json(dbAuthor);
// 	});
// });

// router.delete("/authors/:id", function(req, res) {
// 	// Delete the Author with the id available to us in req.params.id
// 	db.Author.destroy({
// 		where: {
// 			id: req.params.id
// 		}
// 	}).then(function(dbAuthor) {
// 		res.json(dbAuthor);
// 	});
// });
// // --------------------------------------------------------------------------------------------------
// // --------------------------------------------------------------------------------------------------


// function authenticationMiddleware () {  
// 	return (req, res, next) => {
// 		console.log('req.session.passport.users: ${JSON.stringify(req.session.passport)}');

// 	    if (req.isAuthenticated()) return next();
// 	    res.redirect('/profile');
// 	}
// }

module.exports = router;
// PORT = 3000;
// app.listen(PORT, function() {
// 	console.log("app listening on PORT: " + PORT);
// });
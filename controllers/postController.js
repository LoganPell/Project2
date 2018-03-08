// blogController.js to send router (GET, CREATE & RENDER) to the Front End
var express = require('express');
var router = express.Router();
var posts = require('../models/post.js');

// redirect to posts page
router.get('/post', (req, res) => {
	res.redirect('/post');
});

//List All POSTS 
router.get('/post', (req, res) => {
	posts.all(function (data){
		var postObject = { posts: data };
		console.log(postObject);
		res.render('post', postObject);
	});
});

// Create Post
// router.post('/post/category/:category/create'. (req, res) => {
// 	post.create(['title', 'post'], [req.body.title, req.body.post], (req, res) => {
// 		res.render('/post/category/:category');
// 	});
// });

// //UPDATE Posts & Render to posts
// router.put('/post/category/:category/:id', (req, res) => {
// 	var comment = 'comment = ' + req.params.comment;
// 	console.log(comment);

// 	post.update(postUpdate, comment, function(){  /////req.body.post ???
// 		res.redirect('/posts');
// 		res.render('index', postUpdate);  // INDEX ??????????? FRONT END
// 	});
// });

//DELETE Posts
router.delete('/post/delete/:id', (req, res) => {
	var postId = 'id = ' + req.params.post.id;
	console.log(queryId);

	posts.delete(queryId, function(){
		res.redirect('/posts');
	});
});

module.exports = router;

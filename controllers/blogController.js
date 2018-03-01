// blogController.js to send router (GET, CREATE & RENDER) to the Front End
var express = require('express');
var router = express.Router();
var blogger = require('../models/blogger.js');
var posts = require('../models/post.js');

// redirect to posts page
router.get('/posts', (req, res) => {
	res.redirect('/posts');
});

//LIST All POSTS
router.get('/posts', (req, res) =>{
	posts.all(function (data){
		var postObject = { posts: data };
		console.log(postObject);
		res.render('index', postObject);  //INDEX ???????????????? FRONT END
	});
});

//LIST ALL AUTHORS
router.get('/bloggers', (req, res) => {
	blogger.all(function (data){
		var listBlogger = { bloggers: data};
		console.log(listBlogger);
		res.render('index', listBlogger); //INDEX ??????????????????????? FRONT END
	})
});

//CREATE Post &/ Subpost ????????????????
router.post('/posts/create', (req, res) => {
	posts.create(["title", "subpost"], [req.body.title, req.body.subpost], function(){
		res.redirect('/posts');
	});
});

//UPDATE Posts & Render to posts
router.put('/posts/update/:id', (req, res) => {
	var queryId = 'id = ' + req.params.id;
	console.log(queryId);

	var postUpdate = { postUpdate: req.body.post };
	console.log(postUpdate);

	posts.update(postUpdate, queryId, function(){  /////req.body.post ???
		res.redirect('/posts');
		res.render('index', postUpdate);  // INDEX ??????????? FRONT END
	});
});

//DELETE Posts
router.delete('/posts/delete/:id', (req, res) => {
	var queryId = 'id = ' + req.params.id;
	console.log(queryId);

	posts.delete(queryId, function(){
		res.redirect('/posts');
	});
});

// DELETE Authors
router.delete('/bloggers/delete/:id', (req, res) => {
	var queryId = 'id = ' + req.params.id;
	console.log(queryId);

	posts.delete(queryId, function(){
		res.redirect('/bloggers');
	});
});


module.exports = router;

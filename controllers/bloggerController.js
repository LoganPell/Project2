var express = require("express");

var router = express.Router();

var blogger = require('../models/blogger.js');

//LIST ALL AUTHORS
router.get("/", function(req, res) {
  blogger.all(function(data) {
    var hbsObject = {
      userID: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/post", function(req, res) {
  blogger.create([
    "postID", "postTitle", "category", "postBody", "link"
  ], [
    req.body.postID, req.body.postTitle, req.body.category, req.body.postBody, req.body.link
  ], function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
    console.log("bloggerController.js line 26: ", result);
  });
});

router.put("/post/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition bloggerController 33: ", condition);

  blogger.update({
    postID: req.body.postID,
    postTitle: req.body.postTitle,
    category: req.body.category,
    postBody: req.body.postBody,
    link: req.body.link
  }, condition, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

router.delete("/post/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  blogger.delete(condition, function(result) {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// Export routes for server.js to use.
module.exports = router;

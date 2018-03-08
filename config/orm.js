var express = require('express');
var router = express.Router();
// Connection to MySql
var connection = require('../db.js');

// Object for all our SQL statement functions.
// Setup CRUD for MySQL

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
  var arr = [];

  // loop through the keys and push the key/value as a string int arr
  for (var key in ob) {
    var value = ob[key];
    // check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
      // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
      // e.g. {sleepy: true} => ["sleepy=true"]
      arr.push(key + "=" + value);
    }
  }

  // translate array of strings to a single comma-separated string
  return arr.toString();
}

// var Post = {

//   // View all posts
//   all: function(cb) {
//     var allPost = "SELECT * FROM posts";
//     connection.query(allPost, (err, result) => {
//       if (err) {
//         throw err;
//       }
//       cb(result);
//     });
//   },

//   create: function(vals, cb) {
//     connection.query()
//     var cretePost = "INSERT INTO posts (postTitle, postBody, category) VALUES (?, ?, ?)";
//     connection.query(cretePost, [vals], (err, result) => {
//       if (err) {
//         throw err;
//       }

//       cb(result);
//     });
//   },
//   // An example of objColVals would be {name: panther, sleepy: true}
//   update: function(table, objColVals, post, cb) {
//     var queryString = "UPDATE " + table;

//     // x += y is shorthand for x = x + y
//     queryString += " SET ";
//     queryString += objToSql(objColVals);
//     queryString += " WHERE ";
//     queryString += post;

//     console.log(queryString);
//     connection.query(queryString, function(err, result) {
//       if (err) {
//         throw err;
//       }

//       cb(result);
//     });
//   },

//   delete: function(table, post, cb) {
//     var queryString = "DELETE FROM " + table;
//     queryString += " WHERE ";
//     queryString += post;

//     connection.query(queryString, function(err, result) {
//       if (err) {
//         throw err;
//       }

//       cb(result);
//     });
//   }
// };

var ormBlogger = {
  all: function(tableInput, cb) {
    var queryString = "SELECT * FROM users" + tableInput + ";";
    connection.query(queryString, (err, result) => {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  create: function(table, cols, cb) {
    var queryString = "INSERT INTO users;" + table;

    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    // queryString += printQuestionMarks(vals.length);
    queryString += ") ";

    console.log(queryString);

    connection.query(queryString, (err, result) => {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },
  // An example of objColVals would be {name: panther, sleepy: true}
  update: function(table, objColVals, user, cb) {
    var queryString = "UPDATE users" + table;

    queryString += " SET ";
    queryString += objToSql(objColVals);
    queryString += " WHERE ";
    queryString += user;

    console.log(queryString);
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },

  delete: function(table, user, cb) {
    var queryString = "DELETE FROM users" + table;
    queryString += " WHERE ";
    queryString += user;

    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  }
};

// Export the orm object for the model (blogger.js / post.js).
// module.exports = Post;
module.exports = ormBlogger;


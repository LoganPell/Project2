// var ormBlogger = require('../config/orm.js');

// var Blogger = {
//   all: function(cb){
//     ormBlogger.all('blogger_table', function(res){
//       cb(res);
//     });
//   },
//   // cols and vals are arrays
//   create: function (cols, vals, cb){
//     ormBlogger.create('blogger_table', cols, vals, function(res){
//       cb(res);
//     });
//   },
//   //update
//   update: function (objColVals, post, cb){
//     ormBlogger.update('blogger_table', objColVals, post, function(res){
//       cb(res);
//     });
//   },
  
//   // Delete
//   delete: function(post, cb) {
//     ormBlogger.delete("blogger_table", post, function(res) {
//       cb(res);
//     });
//   }

// }

// module.exports = function(sequelize, DataTypes) {
//   var Author = sequelize.define("Author", {
//     // Giving the Author model a name of type STRING
//     name: DataTypes.STRING
//   });

//   Author.associate = function(models) {
//     // Associating Author with Posts
//     // When an Author is deleted, also delete any associated Posts
//     Author.hasMany(models.Post, {
//       onDelete: "cascade"
//     });
//   };

//   return Author;
// };

// module.exports = Blogger;



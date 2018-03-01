var orm = require('../config/orm.js');

var posts = {
  all: function(cb){
    orm.all('post_table', function(res){
      cb(res);
    });
  },
  // cols and vals are arrays
  create: function(cols, vals, cb){
    orm.create('post_table', cols, vals, function(res){
      cb(res);
    });
  },
  // update posts
  update: function(objColVals, post, cb){
    orm.update('post_table', objColVals, post, function(res){
      cb(res);
    });
  },
  // Delete
  delete: function(post, cb) {
    orm.delete("post_table", post, function(res) {
      cb(res);
    });
  }
};

module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define("Post", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    }
  });

  Post.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Post.belongsTo(models.Author, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Post;
};

module.exports = posts;

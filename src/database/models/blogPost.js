const blogPost = (sequelize, DataTypes) => {
  const blogPost = sequelize.define('BlogPost', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      title: DataTypes.STRING,
      content: DataTypes.TEXT,
      userId: {
        foreignKey: true,
        type: DataTypes.INTEGER,
      },
      published: DataTypes.DATETIME,
      updated: DataTypes.DATETIME,
    }, 
    { timestamps: false }
  );

  blogPost.associate = (models) => {
    blogPost.hasMany(models.PostCategory, {
      foreignKey: 'postId',
      as: 'postCategories',
    });

    blogPost.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
  };

  return blogPost;
};

module.exports = blogPost;

const postCategory = (sequelize, DataTypes) => {
  const postCategory = sequelize.define('PostCategory', {
      postId: {
        primaryKey: true,
        foreignKey: true,
        type: DataTypes.INTEGER,
      },
      categoryId: {
        primaryKey: true,
        foreignKey: true,
        type: DataTypes.INTEGER,
      },
    },
    { timestamps: false }
  );

  postCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      through: models.PostCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId',
      as: 'categories',
    });

    models.Category.belongsToMany(models.BlogPost, {
      through: models.PostCategory,
      foreignKey: 'categoryId',
      otherKey: 'postId',
      as: 'blogPosts',
    });
  };

  return postCategory;
};

module.exports = postCategory;

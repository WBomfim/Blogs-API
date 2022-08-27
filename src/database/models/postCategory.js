const postCategory = (sequelize, DataTypes) => {
  const postCategory = sequelize.define('PostCategory', {
      postId: {
        foreignKey: true,
        type: DataTypes.INTEGER,
      },
      categoryId: {
        foreignKey: true,
        type: DataTypes.INTEGER,
      },
    },
    { timestamps: false }
  );

  postCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      trough: models.PostCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });

    models.Category.belongsToMany(models.BlogPost, {
      trough: models.PostCategory,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  };

  return postCategory;
};

module.exports = postCategory;

const category = (sequelize, DataTypes) => {
    const category = sequelize.define('Category', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      name: DataTypes.STRING,
    },
    { timestamps: false },
  );

  category.associate = (models) => {
    category.hasMany(models.PostCategory, {
      foreignKey: 'categoryId',
      as: 'postCategories',
    });
  }

  return category;
};

module.exports = category;

const user = (sequelize, DataTypes) => {
  const user = sequelize.define('User', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      displayName: DataTypes.STRING,
      email: {
        unique: true,
        type: DataTypes.STRING,
      },
      password: DataTypes.STRING,
      image: DataTypes.STRING,
    }, 
    { timestamps: false },
  );

  user.associate = (models) => {
    user.hasMany(models.BlogPosts, {
      foreignKey: 'userId',
      as: 'blogPosts',
    });
  };

  return user;
};

module.exports = user;

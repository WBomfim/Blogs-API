'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const postCategories = await queryInterface.createTable('PostCategories', {
      postId: {
        allowNull: false,
        primaryKey: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        type: Sequelize.INTEGER,
        references: {
          model: 'BlogPosts',
          key: 'id',
        },
      },
      categoryId: {
        allowNull: false,
        primaryKey: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        type: Sequelize.INTEGER,
        references: {
          model: 'Categories',
          key: 'id',
        },
      },
    });

    return postCategories;
  },

  down: async (queryInterface) => await queryInterface.dropTable('PostCategories'), 
};

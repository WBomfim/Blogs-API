'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const categoriesTable = await queryInterface.createTable('Categories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
    });

    return categoriesTable;
  },

  down: async (queryInterface) => await queryInterface.dropTable('Categories'),
};

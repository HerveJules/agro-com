'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('stores', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      productName:{
        type: Sequelize.STRING,
        allowNull:false
      },
      quality: {
        type: Sequelize.STRING,
        allowNull:false
      },
      quantity: {
        type: Sequelize.STRING,
        allowNull:false
      },
      storeStation: {
        type: Sequelize.STRING,
        allowNull:false
      },
      MaxLifetime: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      CoopId:{
        type: Sequelize.INTEGER
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('stores');
  }
};

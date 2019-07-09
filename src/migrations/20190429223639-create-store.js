'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Stores', {
      id: {
        allowNull: false,
        type: Sequelize.UUID,
        primaryKey: true
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
        type: Sequelize.INTEGER,
        allowNull:false
      },
      price: {
        type: Sequelize.STRING
      },
      storeStation: {
        type: Sequelize.STRING,
        allowNull:false
      },
      image:{
        type: Sequelize.STRING,
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
        type: Sequelize.UUID,
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Stores');
  }
};

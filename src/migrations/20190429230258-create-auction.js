'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Auctions', {
      id: {
        allowNull: false,
        type: Sequelize.UUID,
        primaryKey: true
      },
      quantity: {
        type: Sequelize.STRING,
        allowNull:false
      },
      bidder_tin: {
        type: Sequelize.INTEGER
      },
      price: {
        type: Sequelize.STRING
      },
      payed: {
        type: Sequelize.BOOLEAN
      },
      end_date: {
        type: Sequelize.DATE,
        allowNull:false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      StoreId:{
        type: Sequelize.UUID,
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Auctions');
  }
};

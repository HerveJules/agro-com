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
        type: Sequelize.INTEGER,
        allowNull:false
      },
      bidder_tin: {
        type: Sequelize.INTEGER
      },
      price: {
        type: Sequelize.INTEGER
      },
      payed: {
        type: Sequelize.BOOLEAN
      },
      end_date: {
        type: Sequelize.DATE,
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

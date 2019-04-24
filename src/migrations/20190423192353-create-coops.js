'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('coops', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      coopName: {
        type: Sequelize.STRING
      },
      coopLocation: {
        type: Sequelize.STRING
      },
      coopLicense: {
        type: Sequelize.STRING
      },
      coopReaderName: {
        type: Sequelize.STRING
      },
      coopReaderId: {
        type: Sequelize.STRING
      },
      coopEmail: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('coops');
  }
};
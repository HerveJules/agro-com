'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('bidders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      compName: {
        type: Sequelize.STRING,
        allowNull:false
      },
      compLocation: {
        type: Sequelize.STRING,
        allowNull:false
      },
      compEmail: {
        type: Sequelize.STRING,
        allowNull:false
      },
      compWeb: {
        type: Sequelize.STRING
      },
      RBCertificate: {
        type: Sequelize.STRING,
        allowNull:false
      },
      compAgrees: {
        type: Sequelize.STRING,
        allowNull:false
      },
      LeaderSignL: {
        type: Sequelize.STRING,
        allowNull:false
      },
      BankHis: {
        type: Sequelize.STRING,
        allowNull:false
      },
      RACertificate: {
        type: Sequelize.STRING,
        allowNull:false
      },
      compLogo: {
        type: Sequelize.STRING
      },
      compAuditR: {
        type: Sequelize.STRING,
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
      user_id:{
        type: Sequelize.INTEGER
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('bidders');
  }
};

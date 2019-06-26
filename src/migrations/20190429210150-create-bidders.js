'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Bidders', {
      id: {
        allowNull: false,
        type: Sequelize.UUID,
        primaryKey: true
      },
      compName: {
        type: Sequelize.STRING,
        allowNull:false
      },
      compLocation: {
        type: Sequelize.STRING,
        allowNull:false
      },
      tin:{
        type:Sequelize.STRING,
        allowNull:false
      },
      compWeb: {
        type: Sequelize.STRING
      },
      RBCertificate: {
        type: Sequelize.STRING,
      },
      compAgrees: {
        type: Sequelize.STRING,
      },
      LeaderSignL: {
        type: Sequelize.STRING,
      },
      BankHis: {
        type: Sequelize.STRING,
      },
      RACertificate: {
        type: Sequelize.STRING,
      },
      compLogo: {
        type: Sequelize.STRING
      },
      compAuditR: {
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
      UserId:{
        type: Sequelize.UUID,
        unique: true
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Bidders');
  }
};

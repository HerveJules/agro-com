'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Coops', {
      id: {
        allowNull: false,
        type: Sequelize.UUID,
        primaryKey: true
      },
      coopName: {
        type: Sequelize.STRING,
        allowNull:false
      },
      coopLocation: {
        type: Sequelize.STRING,
        allowNull:false
      },
      // RDB certificate
      RBCertificate: {
        type: Sequelize.STRING,
      },
      // RRA clearance certificate
      RAClearance:{
        type: Sequelize.STRING,
      },
      // cooperative tin number
      tin: {
        type: Sequelize.STRING,
        allowNull:false,
        unique:true
      },
      //terms and agreement of cooperative
      coopAgrees: {
        type: Sequelize.STRING,
      },
      //leaders signature letter
      coopSignL:{
        type: Sequelize.STRING,
      },
      // cooperative leader certificate
      leaderCert:{
        type: Sequelize.STRING,
      },
      bankSlip:{
        type: Sequelize.STRING
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
    return queryInterface.dropTable('Coops');
  }
}

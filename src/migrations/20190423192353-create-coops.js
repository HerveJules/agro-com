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
        allowNull:false
      },
      // RRA clearance certificate
      RAClearance:{
        type: Sequelize.STRING,
        allowNull:false
      },
      // cooperative tin number
      tin: {
        type: Sequelize.INTEGER,
        allowNull:false,
        unique:true
      },
      //terms and agreement of cooperative
      coopAgrees: {
        type: Sequelize.STRING,
        allowNull:false
      },
      coopEmail: {
        type: Sequelize.STRING,
        allowNull: false
      },
      //leaders signature letter
      coopSignL:{
        type: Sequelize.STRING,
        allowNull:false
      },
      // cooperative leader certificate
      leaderCert:{
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
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('coops');
  }
}

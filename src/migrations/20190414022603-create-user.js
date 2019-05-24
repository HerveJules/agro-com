'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        type: Sequelize.UUID,
        primaryKey: true
      },
      firstname: {
        type: Sequelize.STRING
      },
      lastname: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      isadmin: {
        type: Sequelize.STRING
      },
      role:{
        type:Sequelize.STRING,

      },
      isverified: {
        type: Sequelize.BOOLEAN
      },
      status: {
        type: Sequelize.STRING
      },
      adress: {
        type: Sequelize.STRING
      },
      tel: {
        type: Sequelize.STRING
      },
      ID: {
        type: Sequelize.STRING
      },
      jobtitle: {
        type: Sequelize.STRING
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
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};

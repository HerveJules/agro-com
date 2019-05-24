'use strict';
const bidder = (sequelize, DataTypes) => {
  const Bidder = sequelize.define('Bidder', {
    compName: {
      type: DataTypes.STRING,
    },
    compLocation: {
      type: DataTypes.STRING,
    },
    tin:{
      type: DataTypes.STRING,
    },
    compEmail: {
      type: DataTypes.STRING,
    },
    compWeb: {
      type: DataTypes.STRING,
      // defaultValue:null
    },
    RBCertificate: {
      type: DataTypes.STRING,
    },
    compAgrees: {
      type: DataTypes.STRING,
    },
    LeaderSignL: {
      type: DataTypes.STRING,
    },
    BankHis: {
      type: DataTypes.STRING,
    },
    RACertificate: {
      type: DataTypes.STRING,
    },
    compLogo: {
      type: DataTypes.STRING,
      defaultValue:null
    },
    compAuditR: {
      type: DataTypes.STRING
    },
  }, {});
  Bidder.associate = function(models) {
    // associations can be defined here
    // bidders belongs to users
  };
  return Bidder;
};


export default bidder;

'use strict';
const bidder = (sequelize, DataTypes) => {
  const Bidder = sequelize.define('Bidder', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    compName: {
      type: DataTypes.STRING,
    },
    compLocation: {
      type: DataTypes.STRING,
    },
    tin:{
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
    Bidder.belongsTo(models.User);
  };
  return Bidder;
};


export default bidder;

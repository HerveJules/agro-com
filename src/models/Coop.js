// 'use strict';
const coops = (sequelize, DataTypes) => {
  const Coop = sequelize.define('Coop', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    coopName: {
      type:DataTypes.STRING
    },
    coopLocation: {
      type:DataTypes.STRING
    },
    RBCertificate: {
      type:DataTypes.STRING
    },
    RAClearance: {
      type:DataTypes.STRING
    },
    tin: {
      type:DataTypes.STRING
    },
    coopAgrees:{
      type: DataTypes.STRING
    },
    coopSignL:{
      type: DataTypes.STRING
    },
    leaderCert:{
      type: DataTypes.STRING
    }
  }, {});
  Coop.associate = function(models) {
    // associations can be defined here
    Coop.belongsTo(models.User);
    Coop.hasMany(models.Store);
  };
  return Coop;
};

export default coops;

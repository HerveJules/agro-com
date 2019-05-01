// 'use strict';
const coop = (sequelize, DataTypes) => {
  const coops = sequelize.define('coops', {
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
    coopEmail: {
      type:DataTypes.STRING
    },
    coopSignL:{
      type: DataTypes.STRING
    },
    leaderCert:{
      type: DataTypes.STRING
    }
  }, {});
  coops.associate = function(models) {
    // associations can be defined here
    // coops belongs to user model
    coops.belongsTo(models.user,{
      foreignKey: 'user_id'
    });
    // coops has many store
    coops.hasMany(models.store,{
      foreignKey:'coops_id',
      as:'store'
    })
  };
  return coops;
};

export default coop;

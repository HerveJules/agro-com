// 'use strict';
const coop = (sequelize, DataTypes) => {
  const coops = sequelize.define('coops', {
    coopName: {
      type:DataTypes.STRING
    },
    coopLocation: {
      type:DataTypes.STRING
    },
    coopLicense: {
      type:DataTypes.STRING
    },
    coopReaderName: {
      type:DataTypes.STRING
    },
    coopReaderId: {
      type:DataTypes.STRING
    },
    coopEmail: {
      type:DataTypes.STRING
    }
  }, {});
  coops.associate = function(models) {
    // associations can be defined here
  };
  return coops;
};

export default coop;
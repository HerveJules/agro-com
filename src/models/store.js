{
  type: 'use strict';
module.exports = (sequelize, DataTypes) => {
  const store = sequelize.define('store', {
    quality: {
      type: DataTypes.STRING,
    },
    quantity: {
      type: DataTypes.STRING,
    },
    storeStation: {
      type: DataTypes.STRING,
    },
    product: {
      type: DataTypes.STRING,
    },
    MaxLifetime: {
      type: DataTypes.DATE
    },
  }, {});
  store.associate = function(models) {
    // associations can be defined here
  };
  return store;
};
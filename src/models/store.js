'use strict';
module.exports = (sequelize, DataTypes) => {
  const store = sequelize.define('store', {
    quality: DataTypes.STRING,
    quantity: DataTypes.STRING,
    storeStation: DataTypes.STRING,
    product: DataTypes.STRING,
    MaxLifetime: DataTypes.DATE
  }, {});
  store.associate = function(models) {
    // associations can be defined here
  };
  return store;
};
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Coffee = sequelize.define('Coffee', {
    name: DataTypes.STRING,
    type: DataTypes.STRING
  }, {});
  Coffee.associate = function(models) {
    // associations can be defined here
    Coffee.belongsTo(models.Shop);
  };
  return Coffee;
};
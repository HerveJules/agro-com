'use strict';
module.exports = (sequelize, DataTypes) => {
  const auction = sequelize.define('auction', {
    quantity: {
      type: DataTypes.STRING,
    },
    bidder_tin: {
      type: DataTypes.INTEGER,
      defaultValue:null
    },
    price: {
      type: DataTypes.STRING,
      defaultValue:null
    },
    payed: {
      type: DataTypes.BOOLEAN,
      defaultValue:false
    },
    end_date: {
      type: DataTypes.DATE
    }
  }, {});
  auction.associate = function(models) {
    // associations can be defined here
    // auction belongs to store
    auction.belongsTo(models.store,{
      foreignKey:'store-id'
    })
  };
  return auction;
};

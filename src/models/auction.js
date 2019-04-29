'use strict';
module.exports = (sequelize, DataTypes) => {
  const auction = sequelize.define('auction', {
    quantity: {
      type: DataTypes.STRING,
    },
    bidder_tin: {
      type: DataTypes.INTEGER,
    },
    price: {
      type: DataTypes.STRING,
    },
    payed: {
      type: DataTypes.BOOLEAN,
    },
    end_date: {
      type: DataTypes.DATE
    }
  }, {});
  auction.associate = function(models) {
    // associations can be defined here
  };
  return auction;
};
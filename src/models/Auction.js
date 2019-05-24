'use strict';
module.exports = (sequelize, DataTypes) => {
  const Auction = sequelize.define('Auction', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
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
  Auction.associate = function(models) {
    // associations can be defined here
    // auction belongs to store
    Auction.belongsTo(models.Store);
  };
  return Auction;
};

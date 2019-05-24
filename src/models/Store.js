
const store = (sequelize, DataTypes) => {
  const Store = sequelize.define('Store', {
    productName:{
      type: DataTypes.STRING
    },
    quality: {
      type: DataTypes.STRING,
    },
    quantity: {
      type: DataTypes.STRING,
    },
    storeStation: {
      type: DataTypes.STRING,
    },
    MaxLifetime: {
      type: DataTypes.DATE,
      defaultValue:null
    },
  }, {});
  Store.associate = function(models) {
    // associations can be defined here
    // store belongs to coops
    Store.belongsTo(models.Coop);
  };
  return Store;
};

export default store;
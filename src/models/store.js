
const Store = (sequelize, DataTypes) => {
  const store = sequelize.define('store', {
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
  store.associate = function(models) {
    // associations can be defined here
    // store belongs to coops
  };
  return store;
};

export default Store;
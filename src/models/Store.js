
const store = (sequelize, DataTypes) => {
  const Store = sequelize.define('Store', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    productName:{
      type: DataTypes.STRING
    },
    quality: {
      type: DataTypes.STRING,
    },
    quantity: {
      type: DataTypes.INTEGER,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    storeStation: {
      type: DataTypes.STRING,
    },
  }, {});
  Store.associate = function(models) {
    // associations can be defined here
    // store belongs to coops
    Store.belongsTo(models.Coop);
    Store.hasMany(models.Auction);
  };
  return Store;
};

export default store;
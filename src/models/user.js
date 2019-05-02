
const User = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    firstname: {
      type: DataTypes.STRING
    },
    lastname: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: { 
      type: DataTypes.STRING
    },
    isadmin: {
      type: DataTypes.STRING,
      defaultValue: 'false'
    },
    role:{
      type:DataTypes.STRING,
      defaultValue: null
    },
    isverified:{
      type: DataTypes.BOOLEAN,
      defaultValue: 'false'
    },
    status: {
      type:DataTypes.STRING,
      defaultValue:'inactive '
    },
    adress: {
      type: DataTypes.STRING
    },
    tel: {
      type: DataTypes.STRING,
      unique:true
    },
    ID: {
      type: DataTypes.STRING,
      unique:true
    },
    jobtitle: {
      type: DataTypes.STRING,
      allowNull:false
    },
    image:{
      type: DataTypes.STRING,
      defaultValue:null
    }
  }, {});
  users.associate = function(models) {
    // associations can be defined here
    // user model has one association with coops
    // users.hasOne(models.coops,{
    //   foreignKey:'user_id',
    //   as:'coops'
    // });
    // user model has one association with bidders
    users.hasOne(models.bidders)
  };
  return users;
};

export default User;


const User = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    firstname: {
      type: DataTypes.STRING
    },
    lastname: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      // allowNull: false,
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
      // allowNull:false
    },
    image:{
      type: DataTypes.STRING,
      defaultValue:null
    }
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasOne(models.Coop);
    User.hasOne(models.Bidder);
  };
  return User;
};

export default User;

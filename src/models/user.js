
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
    status: {
      type:DataTypes.STRING,
      defaultValue:'pending '
    },
    adress: {
      type: DataTypes.STRING
    },
    tel: {
      type: DataTypes.STRING
    },
    tin: {
      type: DataTypes.STRING
    },
    jobtitle: {
      type: DataTypes.STRING
    },
  }, {});
  users.associate = function(models) {
    // associations can be defined here
  };
  return users;
};

export default User;
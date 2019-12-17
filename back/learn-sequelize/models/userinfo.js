module.exports = (sequelize, DataTypes) => {
  return sequelize.define("userinfo", {
    number: {
      type: DataTypes.INTEGER(11),
      primarykey: true,
      autoIncrement: true,
      allowNull: false,
      unique: false
    },
    id: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    pointAvg: {
      type: DataTypes.DECIMAL(7, 1),
      defaultValue: null
    },
    email: {
      type: DataTypes.STRING(45),
      unique: false
    },
    auth: {
      type: DataTypes.BOOLEAN(2),
      allowNull: false
    },
    ethAccount: {
      type: DataTypes.STRING(100),
      defaultValue: null
    }
  });
};

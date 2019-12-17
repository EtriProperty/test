module.exports = (sequelize, DataTypes) => {
  //외부키는 등록안했음 ,1차 완료
  return sequelize.define("userinfo", {
    number: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
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
      type: DataTypes.TEXT("tiny"),
      allowNull: false
    },
    ethAccount: {
      type: DataTypes.STRING(100),
      defaultValue: null
    }
  });
};

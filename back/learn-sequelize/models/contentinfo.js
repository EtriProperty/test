module.exports = (sequelize, DataTypes) => {
  //외부키는 등록안했음, 1차 완료
  return sequelize.define("contentinfo", {
    number: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: false
    },
    floor: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    owner_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    priceDep: {
      type: DataTypes.INTEGER(11),
      defaultValue: null
    },
    priceMon: {
      type: DataTypes.INTEGER(11),
      defaultValue: null
    },
    price: {
      type: DataTypes.INTEGER(11),
      defaultValue: null
    },
    hTime: {
      type: DataTypes.DATE(6),
      defaultValue: null
    },
    priceway: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    option_desk: {
      type: DataTypes.TEXT("tiny"),
      defaultValue: null
    },
    option_chair: {
      type: DataTypes.TEXT("tiny"),
      defaultValue: null
    },
    roomCount: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    roomSize: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    imgPath: {
      type: DataTypes.STRING(45),
      defaultValue: null
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  });
};

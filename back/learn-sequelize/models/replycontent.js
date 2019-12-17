module.exports = (sequelize, DataTypes) => {
  //외부키는 등록안했음, 1차 완료
  return sequelize.define("replycontent", {
    number: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: false
    },
    content: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    user: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    owner: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    point: {
      type: DataTypes.INTEGER(11),
      defaultValue: null
    },
    rTime: {
      type: DataTypes.DATE(6),
      allowNull: false
    }
  });
};

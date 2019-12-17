module.exports = (sequelize, DataTypes) => {
  //외부키는 등록안했음 ,1차 완료
  return sequelize.define("wishilist", {
    id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      allowNull: false
    },
    imgPath: {
      type: DataTypes.STRING(45),
      defaultValue: null
    },
    userId: {
      type: DataTypes.INTEGER(11),
      defaultValue: null
    },
    homeid: {
      type: DataTypes.INTEGER(11),
      defaultValue: null
    }
  });
};

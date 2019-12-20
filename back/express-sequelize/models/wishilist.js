module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    "wishilist",
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true
      },
      imgpath: {
        type: DataTypes.STRING(45),
        allowNull: true
      },
      userid: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        references: {
          model: "userinfo",
          key: "number"
        }
      },
      homeid: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        references: {
          model: "contentinfo",
          key: "number"
        }
      }
    },
    {
      tableName: "wishilist"
    }
  );
};

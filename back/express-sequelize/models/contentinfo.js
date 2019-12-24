module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    "contentinfo",
    {
      number: {
        type: DataTypes.INTEGER(11),
        // allowNull: false,
        primaryKey: true
      },
      floor: {
        type: DataTypes.STRING(45),
        allowNull: false
      },
      owner_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        references: {
          model: "userinfo",
          key: "number"
        }
      },
      pricedep: {
        type: DataTypes.INTEGER(11),
        allowNull: true
      },
      pricemon: {
        type: DataTypes.INTEGER(11),
        allowNull: true
      },
      price: {
        type: DataTypes.INTEGER(11),
        allowNull: true
      },
      htime: {
        type: DataTypes.DATE,
        allowNull: true
      },
      priceway: {
        type: DataTypes.STRING(45),
        allowNull: false
      },
      optiondesk: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      optionchair: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      roomcount: {
        type: DataTypes.STRING(45),
        allowNull: false
      },
      roomsize: {
        type: DataTypes.STRING(45),
        allowNull: false
      },
      imgpath: {
        type: DataTypes.STRING(45),
        allowNull: true
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false
      }
    },
    {
      tableName: "contentinfo"
    }
  );
};

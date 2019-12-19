/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('userinfo', {
    number: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
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
    pointavg: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    auth: {
      type: DataTypes.INTEGER(2),
      allowNull: false
    },
    ethaccount: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    tableName: 'userinfo'
  });
};

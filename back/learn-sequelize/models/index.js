const path = require("path");
const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development"; // 배포시에는 confing.json에서 production으로 바꾸고 배포하면된다.
const config = require(path.join(__dirname, "..", "config", "config.json"))[
  env
];
const db = {};
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.userinfo = require("./userinfo")(sequelize, Sequelize);
db.contentinfo = require("./contentinfo")(sequelize, Sequelize);
db.replycontent = require("./replycontent")(sequelize, Sequelize);
db.wishilist = require("./wishilist")(sequelize, Sequelize);

//관계정의
db.userinfo.hasMany(db.wishilist, {
  sourceKey: "number",
  foreignKey: "userId"
});

db.wishilist.belongsTo(db.userinfo, {
  targetKey: "number",
  foreignKey: "userId"
});

db.userinfo.hasMany(db.contentinfo, {
  sourceKey: "number",
  foreignKey: "owner_id"
});

db.contentinfo.belongsTo(db.userinfo, {
  targetKey: "number",
  foreignKey: "owner_id"
});

db.contentinfo.hasMany(db.wishilist, {
  sourceKey: "number",
  foreignKey: "homeid"
});

db.wishilist.belongsTo(db.contentinfo, {
  targetKey: "number",
  foreignKey: "homeid"
});

//db 객체에 userinfo라는 모델을 담았고 접근가능
module.exports = db;

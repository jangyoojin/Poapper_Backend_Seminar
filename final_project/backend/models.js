const Sequelize = require("sequelize");

const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/config/config.json")[env];
const db = {};


//mysql에 접속하는 sequelize 객체
const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
);

//재사용을 위해 sequelize 객체를 저장
db.sequelize = sequelize;
db.Sequelize = Sequelize;

//table 설정
const stage_dummy = {
    word: { type: Sequelize.DataTypes.TEXT, allowNull: false, },
    mean: { type: Sequelize.DataTypes.TEXT, allowNull: false, }
};

const utf_setting = {
    charset: "utf8",
    collate: "utf8_general_ci",
};

//stage별 테이블 생성
db.Stage1 = sequelize.define(
    "stage1",
    stage_dummy,
    utf_setting
);

db.Stage2 = sequelize.define(
    "stage2",
    stage_dummy,
    utf_setting
);

db.Stage3 = sequelize.define(
    "stage3",
    stage_dummy,
    utf_setting
);

db.Stage4 = sequelize.define(
    "stage4",
    stage_dummy,
    utf_setting
);

db.Stage5 = sequelize.define(
    "stage5",
    stage_dummy,
    utf_setting
);

module.exports = db;
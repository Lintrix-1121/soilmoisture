const dbConfig = require("../config/dbConfig");

const Sequelize = require("sequelize");
const sequelize_config = new Sequelize (
    dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        }
    }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize_config = sequelize_config;

db.users = require("./user.model.js")(sequelize_config, Sequelize);
db.embedded = require("./embedded.model.js")(sequelize_config,Sequelize);

module.exports =db;
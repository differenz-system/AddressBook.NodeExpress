"use strict";
var Sequelize = require('sequelize');
var connection = new Sequelize('address_book', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        timestamps: false
    }
});
try {
    connection.authenticate();
    console.log("Connection Sucess");
}
catch (error) {
    console.log("Connection " + error);
}
connection.sync({ force: false });
var db = {};
db.Sequelize = Sequelize;
db.connecation = connection;
db.user_model = require('../model/user_model')(connection, Sequelize);
db.address_model = require('../model/address_model')(connection, Sequelize);
db.user_model.hasMany(db.address_model, { foreignKey: 'user_id', targetKey: 'user_id' });
db.address_model.belongsTo(db.user_model, { foreignKey: 'user_id', targetKey: 'user_id' });
module.exports = db;

var sequelize = require('sequelize');
var connecation = new sequelize('address_book', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        timestamps: false
    }
});
module.exports = connecation;

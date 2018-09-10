
var sequelize = require('sequelize');


//create sql conneaction
var connecation = new sequelize('address_book', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        timestamps: false // I don't want timestamp fields by default
    }
});



module.exports = connecation;

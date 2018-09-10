var connecation=require('../configuration/sequelize');

var sequelize = require('sequelize');
var address;
address = {
    address_id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: sequelize.TEXT,
    email: sequelize.TEXT,
    contact_number: sequelize.TEXT,
    is_active: sequelize.TEXT,
    create_date: sequelize.DATE,
    user_id: sequelize.INTEGER,
    is_deleted: sequelize.INTEGER
}
module.exports= connecation.define('address',address);

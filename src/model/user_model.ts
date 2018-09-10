var conneaction=require('../configuration/sequelize');

var sequelize = require('sequelize');
var user;
user={
   user_id: {
       type: sequelize.INTEGER,
       primaryKey: true,
       autoIncrement: true
   },
   email: sequelize.STRING,
   password: sequelize.STRING,
   external_id: sequelize.INTEGER,
   create_date: sequelize.DATE
}

module.exports=conneaction.define('user',user);
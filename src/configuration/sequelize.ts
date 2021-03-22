var Sequelize = require('sequelize');

//create sql conneaction :- Vruk patel (18_03_21)
var connection = new Sequelize('address_book', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        timestamps: false // I don't want timestamp fields by default
    }
});

// check connection is sucess or not
try {
    connection.authenticate()
    console.log("Connection Sucess");
} catch (error) {
    console.log("Connection "+error);
}

// Model sync with force:false
connection.sync({force:false})

var db:any={}
db.Sequelize=Sequelize
db.connecation=connection

// include model and passing parameters
db.user_model=require('../model/user_model')(connection,Sequelize)
db.address_model=require('../model/address_model')(connection,Sequelize)

// Table associate (Join Using DOM)
db.user_model.hasMany(db.address_model,{foreignKey:'user_id',targetKey:'user_id'})
db.address_model.belongsTo(db.user_model,{foreignKey:'user_id',targetKey:'user_id'})

export = db;

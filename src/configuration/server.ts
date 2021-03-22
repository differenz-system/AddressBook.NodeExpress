            // Vruk patel (18_03_21)
var express=require('express')
var app=express();
var router=express.Router()

app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers,crossdomain,withcredentials,Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Origin");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
});

import usersRouter=require('../api/user')
app.use('/',usersRouter)

import addressRouter=require('../api/address')
app.use('/',addressRouter)

app.listen(8800,()=>{
    console.log("Your app is running on 8800");
})



var express = require('express');
var url = require('url');
var bodyParser = require('body-parser');
var connecation = require('../configuration/sequelize');
var Router=require('router');


var urlencodedParser = bodyParser.urlencoded({ extended: true });
var api = "192.168.1.142";
var router=Router();
var app = express();


app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers,crossdomain,withcredentials,Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Origin");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
});
//create server
require('./route')(app,{});
var server = app.listen(8800, api, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Example app listening at %s:%s Port", host, port);
});



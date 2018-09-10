var express = require('express');
var url = require('url');
var bodyParser = require('body-parser');
var md5 = require('md5');
var connecation = require('../configuration/sequelize');
var rout=require('router');
var user=require('../model/user_model');
var server=require('../configuration/server');

var datetime = new Date();
var urlencodedParser = bodyParser.urlencoded({ extended: true });
var app = express();

app.use(rout);
app.use(bodyParser.json());

module.exports=function(app,db){
//Login Api
app.post('/login', urlencodedParser, function (req, res) {
    var ui = req.body.email;
    var pas = req.body.password;
    var pass = md5(req.body.password);
    connecation.sync().then(function () {
        user.findAll({
            where: {
                email: req.body.email,
                password: pass
            }
        }).then(function (data) {
            if (data == "") {
                res.json({ 'res': '1', 'msg': 'enter proper email and password' });
            }
            else {
                var id = data[0].user_id;
                res.json({ 'res': '0', 'msg': 'Login User', 'user_id': id });
            }
        });
    });
});

//Registration API
app.post("/registration", urlencodedParser, function (req, res, next) {
    var date = datetime.getFullYear() + "/" + datetime.getMonth() + "/" + datetime.getDate();
    console.log(req.body.email);
    var pass = md5(req.body.password);
    connecation.sync().then(function () {
        user.create({
            email: req.body.email,
            password: pass,
            external_id: null,
            create_date: date
        }).then(function (data) {
            var id = data.user_id;
            res.json({ 'res': '0', 'msg': 'Successfully insert', 'user_id': id });
        })["catch"](function (err) {
            res.json({ 'res': '1', 'msg': 'use another email id' });
        });
    });
    
});
      
}

var express = require('express');
var url = require('url');
var bodyParser = require('body-parser');
var md5 = require('md5');
var connecation = require('../configuration/sequelize');
var user=require('../model/user_model');
var address=require('../model/address_model');

var datetime = new Date();
var app = express();

app.use(bodyParser.json());
var urlencodedParser = bodyParser.urlencoded({ extended: true });


module.exports=function(app,db){
    //Display APi
app.get("/display/:userid", urlencodedParser, function (req, res) {
    var uid = req.params.userid;
    if (uid == undefined || uid == "") {
        console.log("First Login in system");
        res.json({ 'res': '1', 'msg': 'first login in system' });
    }
    else {
        var arr = [];
        connecation.sync().then(function () {
            address.findAll({
                where: {
                    user_id: req.params.userid,
                    is_deleted: 0
                }
            }).then(function (addresses) {
                
                res.json({ 'res': '0', 'data': addresses, 'msg': 'successfully display' });
            });
        });
    }
});
//Add Address API
app.post('/addaddress/:user_id', urlencodedParser, function (req, res) {
    var reply = '';
    var act = req.body.active;
    var uid = req.params.user_id;
    var a = 0;
    var date = datetime.getFullYear() + "/" + datetime.getMonth() + "/" + datetime.getDate();
    if (act == "true") {
        a = 1;
    }
    else {
        a = 0;
    }
    connecation.sync().then(function () {
        address.create({
            name: req.body.name,
            email: req.body.email,
            contact_number: req.body.contact_number,
            is_active: act,
            create_date: date,
            user_id: req.params.user_id,
            is_delete: 0
        }).then(function (data) {
            var aid = data.address_id;
            res.json({ 'res': '0', 'msg': 'Successfully insert', 'addressid': aid, 'data': data });
        });
    });
});
    //update API
    app.post("/update/:userid/:addressid", urlencodedParser, function (req, res) {
        var act = req.body.active;
        var uid = req.params.userid;
        var addid = req.params.addressid;
        var a = 0;
        var date = datetime.getFullYear() + "/" + datetime.getMonth() + "/" + datetime.getDate();
       
        connecation.sync().then(function () {
            address.update({
                name: req.body.name,
                email: req.body.email,
                contact_number: req.body.contact_number,
                is_active: act,
                create_date: date,
                is_delete: 0
            }, {
                where: { address_id: req.params.addressid,
                    user_id: req.params.userid
                }
            }).then(function (data) {
                console.log("successfully update");
                address.findAll({
                    where: { address_id: req.params.addressid }
                }).then(function (data) {
                    res.json({ 'res': '0', 'msg': 'Successfully update', 'data': data });
                });
            });
        });
    });

    //Delete Address Api
app.post("/delete/:userid/:addressid", urlencodedParser, function (req, res) {
    var act = req.body.active;
    var uid = req.params.userid;
    var addid = req.params.addressid;
    var a = 0;
    var date = datetime.getFullYear() + "/" + datetime.getMonth() + "/" + datetime.getDate();
    
    connecation.sync().then(function () {
        address.update({
            is_deleted: 1
        }, {
            where: { address_id: req.params.addressid,
                user_id: req.params.userid
            }
        }).then(function (data) {
            res.json({ 'res': '0', 'msg': "successfully delete" });
        });
    });
});

}

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var express = require('express');
var router = express.Router();
const db = require("../configuration/sequelize");
var datetime = new Date();
router.get("/getAddressBookByID/:user_id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield db.address_model.findAll({
            where: {
                user_id: req.params.user_id,
                is_deleted: 0
            },
        });
        if (result.length > 0) {
            res.json({ 'res': '0', 'msg': 'successfully display', 'data': result });
        }
        else {
            res.json({ 'res': '0', 'msg': 'user is not match', 'data': result });
        }
    }
    catch (error) {
        res.json({ 'res': '1', 'error': error.message });
    }
}));
router.post('/createAddressBook', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, contact_number, is_active, user_id } = req.body;
        var date = datetime.getFullYear() + "/" + datetime.getMonth() + "/" + datetime.getDate();
        var a = is_active == true ? 1 : 0;
        const result = yield db.address_model.create({
            name,
            email,
            contact_number,
            is_active: a,
            create_date: date,
            user_id,
            is_deleted: 0
        });
        if (result) {
            var address_id = result.address_id;
            res.json({ 'res': '0', 'msg': 'Successfully insert', 'addressid': address_id, 'data': result });
        }
        else {
            res.json({ 'res': '1', 'msg': 'Insert Error', 'data': result });
        }
    }
    catch (error) {
        res.json({ 'res': '1', 'error': error.message });
    }
}));
router.put("/updateAddressBook/:userid/:addressid", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var date = datetime.getFullYear() + "/" + datetime.getMonth() + "/" + datetime.getDate();
        const { name, email, contact_number, is_active } = req.body;
        var a = is_active == "true" ? 1 : 0;
        yield db.address_model.update({
            name,
            email,
            contact_number,
            is_active: a,
            create_date: date,
            is_deleted: 0
        }, {
            where: {
                address_id: req.params.addressid,
                user_id: req.params.userid
            }
        }).then((data) => {
            if (data == "") {
                res.json({ 'res': '1', 'msg': 'Update Error', 'data': data });
            }
            else {
                db.address_model.findAll({
                    where: { address_id: req.params.addressid }
                }).then((data) => {
                    res.json({ 'res': '0', 'msg': 'Successfully update', 'data': data });
                });
            }
        });
    }
    catch (error) {
        res.json({ 'res': '1', 'error': error.message });
    }
}));
router.delete("/removeAddressBook/:userid/:addressid", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield db.address_model.update({
            is_deleted: 1
        }, {
            where: { address_id: req.params.addressid,
                user_id: req.params.userid
            }
        });
        if (result) {
            res.json({ 'res': '0', 'msg': "successfully delete", 'data': result });
        }
        else {
            res.json({ 'res': '1', 'msg': 'delete Error', 'data': result });
        }
    }
    catch (error) {
        res.json({ 'res': '1', 'error': error.message });
    }
}));
module.exports = router;

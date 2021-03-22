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
var { Op } = require('sequelize');
const db = require("../configuration/sequelize");
var datetime = new Date();
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email) {
            throw new Error("Please enter Email");
        }
        else if (!password) {
            throw new Error("Please enter Password");
        }
        else {
            const result = yield db.user_model.findOne({
                where: {
                    email,
                    password
                }
            });
            if (!result) {
                res.json({ 'res': '1', 'msg': 'Enter proper email and password' });
            }
            else {
                res.json({ 'res': '0', 'msg': 'Login User', 'data': result });
            }
        }
    }
    catch (error) {
        res.json({ 'res': '1', 'error': error.message });
    }
}));
router.post('/registration', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var date = datetime.getFullYear() + "/" + datetime.getMonth() + "/" + datetime.getDate();
        const { email, password } = req.body;
        const verifyEmail = yield db.user_model.findOne({
            where: {
                email
            }
        });
        if (verifyEmail) {
            res.json({ 'res': '1', 'msg': 'This email is already exists ' });
        }
        else {
            const result = yield db.user_model.create({
                email,
                password,
                create_date: date
            });
            if (!result) {
                res.json({ 'res': '1', 'msg': 'Error in registration' });
            }
            else {
                var id = result.user_id;
                res.json({ 'res': '0', 'msg': 'Successfully registration', 'data': result });
            }
        }
    }
    catch (error) {
        res.json({ 'res': '1', 'error': error.message });
    }
}));
router.delete('/user/delete', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { create_date } = req.body;
        if (!req.body.create_date) {
            res.json({ 'res': 1, 'msg': 'create_data is require' });
        }
        else {
            const result = yield db.user_model.findOne({
                where: {
                    create_date: create_date
                }
            });
            if (result) {
                const result1 = yield db.user_model.destroy({
                    where: {
                        create_date: create_date
                    }
                });
                if (result1) {
                    res.json({ 'res': 0, 'msg': 'sucess delete', 'data': result1 });
                }
                else {
                    res.json({ 'res': 1, 'msg': 'no data delete', 'data': result1 });
                }
            }
            else {
                res.json({ 'res': 1, 'msg': 'your date is not match' });
            }
        }
    }
    catch (error) {
        res.json({ 'res': 1, 'msg': error.message });
    }
}));
router.get('/search/:email/:password', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield db.user_model.findAll({
            where: {
                [Op.or]: [{
                        email: {
                            [Op.substring]: req.params.email
                        }
                    }, {
                        password: {
                            [Op.substring]: req.params.password
                        }
                    }]
            }
        });
        if (result.length > 0) {
            res.json({ 'res': 0, 'msg': 'search record', 'data': result });
        }
        else {
            res.json({ 'res': 1, 'msg': 'not record', 'data': result });
        }
    }
    catch (error) {
        res.json({ 'res': '1', 'msg': error.message });
    }
}));
module.exports = router;

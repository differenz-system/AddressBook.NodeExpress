"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var app = express();
var router = express.Router();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers,crossdomain,withcredentials,Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Origin");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
});
const user_1 = require("../api/user");
app.use('/', user_1.default);
const address_1 = require("../api/address");
app.use('/', address_1.default);
app.listen(8800, () => {
    console.log("Your app is running on 8800");
});

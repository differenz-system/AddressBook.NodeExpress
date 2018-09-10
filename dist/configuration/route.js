const userrout = require('../api/user');
var address = require('../api/address');
module.exports = function (app, db) {
    userrout(app, db);
    address(app, db);
};

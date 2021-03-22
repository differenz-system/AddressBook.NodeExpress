"use strict";
module.exports = (connection, Sequelize) => {
    var addressSchema = connection.define('address', {
        address_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
        email: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
        contact_number: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
        is_active: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
        create_date: Sequelize.DATE,
        user_id: Sequelize.INTEGER,
        is_deleted: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
    }, {
        tableName: 'address',
    });
    return addressSchema;
};

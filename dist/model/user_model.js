"use strict";
module.exports = (connection, Sequelize) => {
    var userSchema = connection.define('users', {
        user_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                isEmail: true,
            }
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        external_id: {
            type: Sequelize.INTEGER,
            allowNull: true,
            defaultValue: 1
        },
        create_date: Sequelize.DATEONLY,
    }, {
        tableName: 'users'
    });
    return userSchema;
};

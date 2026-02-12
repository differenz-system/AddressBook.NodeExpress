"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userModel = (connection, Sequelize) => {
    const userSchema = connection.define('users', {
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
            },
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        external_id: {
            type: Sequelize.INTEGER,
            allowNull: true,
            defaultValue: 1,
        },
        create_date: Sequelize.DATEONLY,
    }, {
        tableName: 'users',
        timestamps: false,
    });
    return userSchema;
};
exports.default = userModel;

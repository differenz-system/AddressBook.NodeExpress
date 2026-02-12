// Vruk patel (18_03_21)

const userModel = (connection: any, Sequelize: any) => {
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

export default userModel;

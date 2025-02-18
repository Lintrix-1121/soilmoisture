module.exports = (sequelize_config, Sequelize) => {
    const user = sequelize_config.define("user", {
        name: {type: Sequelize.STRING, allowNull: false},
        email: {type: Sequelize.STRING, allowNull: false},
        password: {type: Sequelize.STRING, allowNull: false}
    });
    return user;
}
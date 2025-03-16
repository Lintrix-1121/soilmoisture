module.exports = (sequelize_config, Sequelize) => {
    const notification = sequelize_config.define('notification', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        message: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        timestamp: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
        },
    });
    return notification;
};

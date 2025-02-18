module.exports = (sequelize_config, Sequelize) => {
    const Embedded = sequelize_config.define("embedded", {
        temperature: { type: Sequelize.FLOAT },
        humidity: { type: Sequelize.FLOAT },
        soilMoisture: { type: Sequelize.INTEGER },
        distance: { type: Sequelize.INTEGER },
        time: { 
            type: Sequelize.DATE, 
            defaultValue: Sequelize.NOW 
        }
    });

    return Embedded;
};

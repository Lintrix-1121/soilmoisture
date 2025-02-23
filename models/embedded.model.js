const moment = require("moment-timezone");

module.exports = (sequelize_config, Sequelize) => {
    const Embedded = sequelize_config.define("embedded", {
        temperature: { type: Sequelize.FLOAT },
        humidity: { type: Sequelize.FLOAT },
        soilMoisture: { type: Sequelize.INTEGER },
        distance: { type: Sequelize.INTEGER },
        time: { 
            type: Sequelize.DATE,
            defaultValue: () => moment().tz("Africa/Nairobi").format("YYYY-MM-DD HH:mm:ss") // Ensures EAT time
        }
    });

    return Embedded;
};




// module.exports = (sequelize_config, Sequelize) => {
//     const Embedded = sequelize_config.define("embedded", {
//         temperature: { type: Sequelize.FLOAT },
//         humidity: { type: Sequelize.FLOAT },
//         soilMoisture: { type: Sequelize.INTEGER },
//         distance: { type: Sequelize.INTEGER },
//         time: { 
//             type: Sequelize.DATE, 
//             defaultValue: Sequelize.NOW 
//         }
//     });

//     return Embedded;
// };

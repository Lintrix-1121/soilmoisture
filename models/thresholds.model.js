module.exports = (sequelize_config, Sequelize) => {
  const Thresholds = sequelize_config.define("thresholds", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    temperature: {
      type: Sequelize.FLOAT,
      allowNull: false,
      defaultValue: 20.84, 
    },
    humidity: {
      type: Sequelize.FLOAT,
      allowNull: false,
      defaultValue: 80.0, 
    },
    soilMoisture: {
      type: Sequelize.JSON, 
      allowNull: false,
      defaultValue: { min: 600, max: 1000 }, 
    },
    distance: {
      type: Sequelize.FLOAT,
      allowNull: false,
      defaultValue: 21.0, 
    },
    time: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
  });

  return Thresholds;
};

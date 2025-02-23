module.exports = (sequelize_config, Sequelize) => {
    const RelayControl = sequelize_config.define('relayControl', {
        relayState: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },
      });
      return RelayControl;
}
const db = require("../models")
const RelayControl = db.relayControl;

exports.GetState = async (req, res) => {
    try {
      const relayState = await RelayControl.findOne({
        order: [['createdAt', 'DESC']], // Get the latest relay state
      });
  
      if (relayState) {
        res.send({
          status: "success",
          status_code: 200,
          message: "Relay state retrieved successfully",
          result: relayState,
        });
      } else {
        res.send({
          status: "error",
          status_code: 404,
          message: "Relay state not found",
        });
      }
    } catch (err) {
      res.send({
        status: "error",
        status_code: 500,
        message: err.message || "Failed to retrieve relay state",
      });
    }
  };
  
  // Endpoint to update relay state
exports.UpdateState = async (req, res) => {
    try {
      const { relayState } = req.body;
  
      if (typeof relayState !== 'boolean') {
        return res.send({
          status: "error",
          status_code: 400,
          message: "Invalid relay state value",
        });
      }
  
      const newRelayState = await RelayControl.create({ relayState });
  
      res.send({
        status: "success",
        status_code: 200,
        message: "Relay state updated successfully",
        result: newRelayState,
      });
    } catch (err) {
      res.send({
        status: "error",
        status_code: 500,
        message: err.message || "Failed to update relay state",
      });
    }
  }
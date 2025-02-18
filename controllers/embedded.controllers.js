const db = require("../models");
const Embedded = db.embedded;


exports.SensorData = (req, res) => {
  const sensorData = {
      temperature: req.body.temperature,
      humidity: req.body.humidity,
      soilMoisture: req.body.soilMoisture,
      distance: req.body.distance
  };

  Embedded.create(sensorData)
      .then(data => {
          res.send({
              status: "success",
              status_code: 200,
              result: data
          });
      })
      .catch(err => {
          res.send({
              status: "error",
              status_code: 500,
              message: err.message || "Error saving sensor data"
          });
      });
};

exports.GetData = (req, res) => {
    Embedded.findAll()
    .then(data => {
        res.send({
            status: "success",
            status_code: 200,
            message: "Data retrieved success",
            result: data
        });
    })
    .catch(err => {
        res.send({
            status: "Error",
            status_code: 201,
            message: err.message || "Failed to retrieve data"
        });
    });
}
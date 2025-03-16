const db = require("../models");
const Thresholds = db.thresholds;

//fetching the threshold values
exports.GetThresholds = async (req, res) => {
  try {
    const thresholds = await Thresholds.findOne({ where: { id: 1 } });

    if (thresholds) {
      res.status(200).json({
        status: "success",
        status_code: 200,
        message: "Thresholds retrieved successfully",
        result: {
          temperature: thresholds.temperature,
          humidity: thresholds.humidity,
          distance: thresholds.distance,
          soilMoisture: {
            min: thresholds.soilMoisture.min,
            max: thresholds.soilMoisture.max
          },
          time: thresholds.time,
        },
      });
    } else {
      res.status(404).json({
        status: "error",
        status_code: 404,
        message: "Thresholds not found",
      });
    }
  } catch (err) {
    console.error("Error fetching thresholds:", err);
    res.status(500).json({
      status: "error",
      status_code: 500,
      message: "Failed to retrieve thresholds",
      error: err.message,
    });
  }
};




//updating threshold values
exports.UpdateThresholds = (req, res) => {
  const param_id = 1; 
  const { temperature, humidity, distance, moistureMin, moistureMax } = req.body;

  Thresholds.update(
    { temperature, humidity, distance, moistureMin, moistureMax },
    {
      where: { id: param_id }
    }
  )
  .then(data => {
    if (data[0] === 1) {
      res.send({
        status: "success",
        status_code: 200,
        message: "Thresholds updated successfully!",
        result: data
      });
    } else {
      res.send({
        status: "error",
        status_code: 404,
        message: `Thresholds with id ${param_id} not found. No record updated`,
        result: data
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      status: "error",
      status_code: 500,
      message: err.message || "Error occurred while updating thresholds"
    });
  });
};

const db = require("../models");
const Thresholds = db.thresholds;

//fetching the threshold values
exports.GetThresholds = async (req, res) => {
  try {
    const thresholds = await Thresholds.findByPk(1); // Pass only the primary key value

    if (thresholds) {
      res.send({
        status: "success",
        status_code: 200,
        message: "Thresholds retrieved successfully",
        result: thresholds, // No need to access an array
      });
    } else {
      res.send({
        status: "error",
        status_code: 404,
        message: "Thresholds not found",
      });
    }
  } catch (err) {
    res.send({
      status: "error",
      status_code: 500,
      message: err.message || "Failed to retrieve thresholds",
    });
  }
};


// exports.GetThresholds = async (req, res) => {
//   try {
//     const thresholds = await Thresholds.findByPk({
//       where: {id : 1}
//     });
//     if (thresholds[0].length > 0) {
//       res.send({
//         status: "success",
//         status_code: 200,
//         message: "Thresholds retrieved successfully",
//         result: thresholds[0][0], // Get the first record
//       });
//     } else {
//       res.send({
//         status: "error",
//         status_code: 404,
//         message: "Thresholds not found",
//       });
//     }
//   } catch (err) {
//     res.send({
//       status: "error",
//       status_code: 500,
//       message: err.message || "Failed to retrieve thresholds",
//     });
//   }
// };

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

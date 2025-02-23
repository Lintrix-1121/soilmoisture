const {Router} = require('express');

module.exports = app => {
   const embedded_controller = require('../controllers/embedded.controllers');
    var router = require('express').Router();  
    
    router.post('/values', embedded_controller.SensorData);
    router.get("/data", embedded_controller.GetData);
    router.get("/data3hrs", embedded_controller.GetDataLast3Hours);
    router.get("/data24hrs", embedded_controller.GetDataLast24Hours);
    router.get("/data4d", embedded_controller.GetDataLast4Days);


    app.use('/api', router);
}



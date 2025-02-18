const {Router} = require('express');

module.exports = app => {
   const embedded_controller = require('../controllers/embedded.controllers');
    var router = require('express').Router();  
    
    router.post('/values', embedded_controller.SensorData);
    router.get("/data", embedded_controller.GetData);


    app.use('/api', router);
}



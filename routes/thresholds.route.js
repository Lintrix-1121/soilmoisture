const {Router} = require('express');

module.exports = app => {
   const thresholds_controller = require('../controllers/thresholds.controllers');
    var router = require('express').Router();  
    
    router.post('/thresholds', thresholds_controller.UpdateThresholds);
    router.get("/thresholds", thresholds_controller.GetThresholds);


    app.use('/api', router);
}



const {Router} = require('express');

module.exports = app => {
   const relay_controller = require('../controllers/relay.controller.js');
    var router = require('express').Router();  
    
    router.post("/relayControl", relay_controller.UpdateState);
    router.get("/relayControl", relay_controller.GetState);


    app.use('/api', router);
}



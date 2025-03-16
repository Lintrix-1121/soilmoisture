const {Router} = require("express");

module.exports = app => {
    const users_controller = require ('../controllers/users.controllers.js');
   // const embedded_controller = require('../controllers/embedded.controllers.js');
    var router = require("express").Router();

    router.post('/signup', users_controller.Signup);
    router.post('/logout', users_controller.Logout);
    router.post('/login', users_controller.Login);
    router.get('/users', users_controller.GetUsers);
    router.delete('/deluser/:id', users_controller.DeleteUser);

    // router.post('/values', embedded_controller.SensorData);
    // router.get("/data", embedded_controller.GetData);
    

   



    app.use('/api', router);
}

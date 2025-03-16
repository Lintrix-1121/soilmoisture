
const {Router} = require("express");

module.exports = app => {
    const notificationController = require('../controllers/notification.controller.js');

    var router = require("express").Router();

    router.post('/notification', notificationController.PostNotification);
    router.get('/notifications', notificationController.GetNotifications);
    router.delete('/delnot/:id', notificationController.DeleteNotification);

    app.use('/api', router);
}
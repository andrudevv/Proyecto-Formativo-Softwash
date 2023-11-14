const express = require('express');
const userRouter = require('./users.Routes.js');
const laundryRouter = require('./laundry.Routes.js');
const vehicleRouter = require('./vehicle.Routes.js');
const appointmentRouter = require('./appointments.Routes.js');
const serviceRouter = require('./service.Routes.js');


function rutas(app) {
    const router = express.Router();
    app.use('/api',router);
    router.use('/users', userRouter);
    router.use('/client', laundryRouter);
    router.use('/vehicle', vehicleRouter);
    router.use('/service', serviceRouter);
    router.use('/appointment', appointmentRouter);
    
}
module.exports = rutas ;
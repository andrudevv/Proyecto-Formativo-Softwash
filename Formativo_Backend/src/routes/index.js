import express from 'express'
import {userRouter} from './users.Routes.js'
// import {categoryRouter} from './category.Routes.js'
import { laundryRouter } from './laundry.Routes.js';
import { vehicleRouter } from './vehicle.Routes.js';
import { appointmentRouter } from './appointments.Routes.js';
import { serviceRouter } from './service.Routes.js';

export function rutas(app) {
    const router = express.Router();
    app.use('/api',router);
    
    router.use('/users', userRouter);
    // router.use('/category', categoryRouter);
    router.use('/client', laundryRouter);
    router.use('/vehicle', vehicleRouter);
    router.use('/services', serviceRouter);
    router.use('/appointment', appointmentRouter);
    
}

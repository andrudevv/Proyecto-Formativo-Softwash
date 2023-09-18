import express from 'express'
import {userRouter} from './users.Routes.js'
import {categoryRouter} from './category.Routes.js'
import { laundryRouter } from './laundry.Routes.js';

export function rutas(app) {
    const router = express.Router();
    app.use('/api',router);
    
    router.use('/users', userRouter);
    router.use('/clients', categoryRouter);
    router.use('/client', laundryRouter);
    
}

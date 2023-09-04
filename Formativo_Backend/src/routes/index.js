import express from 'express'
import {userRouter} from './users.Routes.js'

export function rutas(app) {
    const router = express.Router();
    app.use('/api',router);
    
    router.use('/users', userRouter);
    
}

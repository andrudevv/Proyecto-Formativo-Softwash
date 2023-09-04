import express from 'express';
import morgan from 'morgan'
import cookieParser from 'cookie-parser';
import cors from 'cors'
import { conexionDB } from './lib/sequelize.js';
import { rutas } from './routes/index.js';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
const app = express();
dotenv.config();
const port = 4000 ; 

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true, // This is important as it allows us to send cookies along with the request
}));
conexionDB();
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.json())
app.use(cookieParser());
rutas(app);



app.listen(port, ()=>{
    console.log(`corriendo en el puerto ${port}`);
})

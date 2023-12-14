const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const {conexionDB} = require('./lib/sequelize.js');
const  rutas  = require('./routes/index.js');
const { programarRecordatorios } = require('./utils/timer.js');
require('dotenv').config();

// const { bodyParser } = require('body-parser');
const app = express();
// const { config } = require('./config/config.js')
const port = 4000 ; 
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true, // This is important as it allows us to send cookies along with the request
}));
conexionDB();
// app.use(express.static(path.join(__dirname, '../../uploads')));
app.use(morgan('dev'));
app.use(express.json())
app.use(cookieParser());
rutas(app);
// programarRecordatorios();

app.listen(port, ()=>{
    console.log(`corriendo en el puerto ${port}`);
})

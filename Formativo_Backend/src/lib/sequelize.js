import {Sequelize} from 'sequelize';

// const {config} = require('../config/config');
import {setUpModels } from '../db/models/index.js';


// const USER  = encodeURIComponent(config.dbUser);
// const PASSWORD  = encodeURIComponent(config.dbPassword);
// const URI  =  `mysql://${USER}:${PASSWORD}@${config.dbHost}:${config.dbHost}/${config.dbName}`


const sequelize = new Sequelize('Proyecto_Softwash','root','zyzz',{
    dialect: 'mysql',
    logging : false,
})

async function conexionDB() { 
  try {
    await setUpModels(sequelize); // Configurar los modelos utilizando la función setUpModels

    // await sequelize.sync({ force: true }); // Sincronizar los modelos con la base de datos

    console.log('Modelo sincronizado correctamente con la base de datos');
  } catch (error) {
    console.error('Error al sincronizar el modelo con la base de datos:', error);
  }
}
// const sequelize = new Sequelize(config.dbUrl, options);

export { sequelize, conexionDB } ;

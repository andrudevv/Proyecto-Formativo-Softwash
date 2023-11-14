const {Sequelize} = require('sequelize');
require('dotenv').config();

// dotenv.config();

const {setUpModels } = require('../db/models/index.js');
const nameDB = process.env.DB_NAME;
const userDb = process.env.DB_USER;
const passwordDb = process.env.DB_PASSWORD;
const dialectDb = process.env.DB_DIALECT;

// const USER  = encodeURIComponent(config.dbUser);
// const PASSWORD  = encodeURIComponent(config.dbPassword);
// const URI  =  `mysql://${USER}:${PASSWORD}@${config.dbHost}:${config.dbHost}/${config.dbName}`


const sequelize = new Sequelize(nameDB,userDb,passwordDb,{
    dialect: dialectDb,
    logging : false,
})

async function conexionDB() { 
  try {
    await setUpModels(sequelize); // Configurar los modelos utilizando la función setUpModels

    // await sequelize.sync(); // Sincronizar los modelos con la base de datos

    console.log('Modelo sincronizado correctamente con la base de datos');
  } catch (error) {
    console.error('Error al sincronizar el modelo con la base de datos:', error);
  }
}
// const sequelize = new Sequelize(config.dbUrl, options);

module.exports= { sequelize, conexionDB } ;

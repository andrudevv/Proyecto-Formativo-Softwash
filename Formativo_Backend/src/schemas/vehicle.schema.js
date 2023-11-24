const Joi = require('joi');


const id = Joi.number().integer();
const plate = Joi.string().max(7).min(5).regex(/^[A-Z]{3}-\d{2}[A-Z\d]?$/);
const model = Joi.number().integer().max(2024).min(1900);
const color = Joi.string();
const userId = Joi.number().integer();
const typeVehicle =  Joi.string().valid('carro','moto');


const getVehicleSchema = Joi.object({
    id: id.required().messages({
        'number.base': 'El ID de vehiculo debe ser un número entero.',
        'any.required': 'El ID de vehiculo es un campo obligatorio. y debe ser un numero entero',
        'any.only': 'El ID de vehiculo debe ser un numero entero',
    })
  });

const createVehicleShema = Joi.object({
    plate: plate
    .required().messages({'string.min': 'La longitud mínima de (placa) es de 5 caracteres.',
    'string.max': 'La longitud máxima de (placa) es de 6 caracteres. y un guion (-)',
    'string.pattern.base': 'El campo (placa) no cumple con el formato de placa válido verifica que este en mayusculas y contenga el guion(-).','string.base':'El campo "placa" debe ser una cadena de texto.',
    'any.required': 'El campo (placa) es obligatorio'}),
    model: model.required().messages({
        'number.base': 'El modelo debe ser un número entero.',
        'any.required': 'El modelo es un campo obligatorio.',
        'number.min': 'El modelo debe ser un número entero minimo de 4 dígitos a partir del año 1900',
    'number.max': 'El modelo debe ser un número entero maximo de 4 dígitos hasta el año2024.'
    }),
    color: color.required().messages({
        'string.base': 'El color debe ser una cadena de texto.',
        'any.required': 'El color es un campo obligatorio.',
    }),
    typeVehicle: typeVehicle.required().messages({
        'string.base': 'El tipo de vehículo debe ser una cadena de texto.',
        'any.required': 'El tipo de vehículo es un campo obligatorio.',
        'any.only': 'El tipo de vehículo debe ser (carro) o (moto) en minusculas.',
    })
})


const 
updateParams = Joi.object({
    id: id.required().messages({
        'number.base': 'El numero de vehiculo debe ser un número entero.',
        'any.required': 'El numero de vehiculo es un campo obligatorio. y debe ser un numero entero',
        'any.only': 'El numero de vehiculo debe ser un numero entero',
    }),
});
deleteParams = Joi.object({
    id: id.required().messages({
        'number.base': 'El ID de vehiculo debe ser un número entero.',
        'any.required': 'El ID de vehiculo es un campo obligatorio. y debe ser un numero entero',
        'any.only': 'El ID de vehiculo debe ser un numero entero',
    }),
});
const updateVehicleShema = Joi.object({
    plate: plate
    .required().messages({'string.min': 'La longitud mínima de (placa) es de 5 caracteres.',
    'string.max': 'La longitud máxima de (placa) es de 6 caracteres. y un guion (-)',
    'string.pattern.base': 'El campo (placa) no cumple con el formato de placa válido verifica que este en mayusculas y contenga el guion(-).','string.base':'El campo "placa" debe ser una cadena de texto.',
    'any.required': 'El campo (placa) es obligatorio'
    }),
    model: model.required().messages({
        'number.base': 'El modelo debe ser un número entero.',
        'any.required': 'El modelo es un campo obligatorio.',
        'number.min': 'El modelo debe ser un número entero minimo de 4 dígitos a partir del año 1900',
    'number.max': 'El modelo debe ser un número entero maximo de 4 dígitos hasta el año2024.'
    }),
    color: color.required().messages({
        'string.base': 'El color debe ser una cadena de texto.',
        'any.required': 'El color es un campo obligatorio.',
    }),
    typeVehicle: typeVehicle.required().messages({
        'string.base': 'El tipo de vehículo debe ser una cadena de texto.',
        'any.required': 'El tipo de vehículo es un campo obligatorio.',
        'any.only': 'El tipo de vehículo debe ser (carro) o (moto) en minusculas.',
    })
})


module.exports ={createVehicleShema, updateVehicleShema,getVehicleSchema,updateParams,deleteParams}

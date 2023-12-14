const express = require("express");
const VehicleService = require("../services/vehicle.service.js");
const {
  createVehicleShema,
  updateVehicleShema,
  updateParams,
  deleteParams,
} = require("../schemas/vehicle.schema.js");
const { validatorHandler } = require("../middlewares/validator.handler.js");
const { validateType } = require("../middlewares/validatePlate.js");
const { checkUser } = require("../middlewares/auth.handler.js");
const {authRequiredUser} = require("../middlewares/validateToken.js");
const vehicle = new VehicleService();
const vehicleRouter = express.Router();

//ruta para crear vehiculos segun el usuario que tenga sesion iniciada
vehicleRouter.post(
  "/create-vehicle",
  authRequiredUser,
  checkUser,
  validatorHandler(createVehicleShema, "body"),
  async (req, res) => {
    try {
      const user = req.user;
      const body = req.body;
      const rtaPlate = await validateType(body.typeVehicle, body.plate);
      if (!rtaPlate)
        return res.status(401).json({
          message:
            "Error en el formato de placa, verifica que cumpla ABC-123 para carro o ABC-12A para moto",
        });
      body.plate = rtaPlate;
      await vehicle.create(body, user.id);
      res.status(201).json({ message: "Registro de vehículo exitoso "});
    } catch (error) {
      console.error(error);
      return res.status(500).json([error.message]);
    }
    (err, res) => {
      res.status(400).json({ error: err.message });
    };
  }
);
//ruta para traer los vehiculos segun tenga el usuario que tenga sesion iniciada
vehicleRouter.get("/", authRequiredUser, checkUser, async (req, res) => {
  try {
    const user = req.user.id;
    const getVehicle = await vehicle.findVehicle(user);
    res.status(201).json(getVehicle);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
  (err, res) => {
    res.status(400).json({ error: err.message });
  };
});
//ruta para eliminar el vehiculo que desee el usuario que tenga sesion iniciada
vehicleRouter.delete(
  "/:id",
  authRequiredUser,
  checkUser,
  validatorHandler(deleteParams, "params"),
  async (req, res) => {
    try {
      const user = req.user.id;
      const { id } = req.params;
      const deleteVehicle = await vehicle.delete(user, id);
      res.status(201).json(deleteVehicle);
    } catch (error) {
      console.error(error);
      return res.status(500).json([error.message]);
    }
    (err, res) => {
      res.status(400).json({ error: err.message });
    };
  }
);
//ruta para actualizar un vehiculo que desee el usuario
vehicleRouter.patch(
  "/:id",
  authRequiredUser,
  checkUser,
  validatorHandler(updateParams, "params"),
  validatorHandler(updateVehicleShema, "body"),
  async (req, res) => {
    try {
      const { id } = req.params;
      const user = req.user.id;
      const body = req.body;
      const rtaPlate = await validateType(body.typeVehicle, body.plate);
      if (!rtaPlate)
        res.status(401).json({
          message:
            "Error en el formato de placa, verifica que cumpla ABC-123 para carro o ABC-12A para moto",
        });
      body.plate = rtaPlate;
      const updateVehicle = await vehicle.findAndUpdate(body, id, user);
      res.status(201).json(updateVehicle);
    } catch (error) {
      console.error(error);
      return res.status(500).json([error.message]);
    }
    (err, res) => {
      res.status(400).json({ error: err.message });
    };
  }
);

module.exports = vehicleRouter;

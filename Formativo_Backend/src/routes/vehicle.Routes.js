import express from "express";
// import passport from 'passport';

//
import { VehicleService } from "../services/vehicle.service.js";
import {
  createVehicleShema,
  updateVehicleShema,
  getVehivleSchema,
} from "../schemas/vehicle.schema.js";
import validatorHandler from "../middlewares/validator.handler.js";
import { authRequired } from "../middlewares/validateToken.js";

//
const vehicleService = new VehicleService();
const vehicleRouter = express.Router();

vehicleRouter.post(
  "/create-vehicle",
  authRequired,
  validatorHandler(createVehicleShema, "body"),
  async (req, res) => {
    try {
      const body = req.body;
      const rta = await vehicleService.create(body);
      res.status(201).json({ message: "Registro de vehiculo exitoso ", rta });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: error.message });
    }
    (err, res) => {
      res.status(400).json({ error: err.message });
    };
  }
);

vehicleRouter.get(
  "/get-vehicle",
  validatorHandler(getVehivleSchema, "body"),
  async (req, res) => {
    try {
      const body = req.body;
      const rta = await vehicleService.findByPlate(body.plate);
      res.status(201).json({ message: "vehiculo ", rta });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: error.message });
    }
    (err, res) => {
      res.status(400).json({ error: err.message });
    };
  }
);
vehicleRouter.patch(
  "/get-vehicle",
  validatorHandler(getVehivleSchema, "params"),
  validatorHandler(updateVehicleShema, "body"),
  async (req, res) => {
    try {
      const body = req.body;
      const rta = await vehicleService.findByPlate(body.plate);
      res.status(201).json({ message: "vehiculo ", rta });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: error.message });
    }
    (err, res) => {
      res.status(400).json({ error: err.message });
    };
  }
);

export { vehicleRouter };

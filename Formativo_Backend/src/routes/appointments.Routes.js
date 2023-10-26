import express from "express";


//

import AppointmentService from "../services/appointments.service.js";
import Services from "../services/services.service.js";
// import {
//   createVehicleShema,
//   updateVehicleShema,
//   getVehivleSchema,
// } from "../schemas/vehicle.schema.js";
// import validatorHandler from "../middlewares/validator.handler.js";
// import { authRequired } from "../middlewares/validateToken.js";

//

const serviceLaudry = new Services();
const appointment = new AppointmentService();
const appointmentRouter = express.Router();

appointmentRouter.post(
  "/create-appointment",
//   authRequired,
//   validatorHandler(createVehicleShema, "body"),
  async (req, res) => {
    try {
      const body = req.body;
      const rta = await appointment.saveAppointment(body);
      res.status(201).json({ message: "Registro de cita exitoso ", rta });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: error.message });
    }
    (err, res) => {
      res.status(400).json({ error: err.message });
    };
  }
);

appointmentRouter.get(
  "/get-appointment/:date",
//   validatorHandler(getVehivleSchema, "body"),
  async (req, res) => {
    try {
      const {date} = req.params;
      const hora = '10:00 AM';
      // busca servicios por id
      // const numS = 1;
      // const rtaService = await serviceLaudry.findServices(numS);
      // console.log(rtaService, ' servicios de lavaderos');

      const laundry = 1;
      // const rtaAppointment = await appointment.findAppointments(citas);
      const ttr = await appointment.findApp(laundry);


      console.log(ttr, 'citas de un lavadero');
      // console.log(rtaAppointment, ' citas de un lavadero');
      const rta = await appointment.findAbility(date,hora);
      res.status(201).json({ message: "citas ", rta,ttr});
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: error.message });
    }
    (err, res) => {
      res.status(400).json({ error: err.message });
    };
  }
);
// appointmentRouter.patch(
//   "/get-vehicle",
//   validatorHandler(getVehivleSchema, "params"),
//   validatorHandler(updateVehicleShema, "body"),
//   async (req, res) => {
//     try {
//       const body = req.body;
//       const rta = await appointment.findByPlate(body.plate);
//       res.status(201).json({ message: "vehiculo ", rta });
//     } catch (error) {
//       console.error(error);
//       return res.status(500).json({ message: error.message });
//     }
//     (err, res) => {
//       res.status(400).json({ error: err.message });
//     };
//   }
// );

export { appointmentRouter };

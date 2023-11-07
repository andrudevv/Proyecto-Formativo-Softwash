import express from "express";

//

import AppointmentService from "../services/appointments.service.js";
// import Services from "../services/services.service.js";
import { validateHour12, validateDate } from "../middlewares/validateTime.js";
// import {
//   createVehicleShema,
//   updateVehicleShema,
//   getVehivleSchema,
// } from "../schemas/vehicle.schema.js";
// import validatorHandler from "../middlewares/validator.handler.js";
// import { authRequired } from "../middlewares/validateToken.js";

//

// const serviceLaudry = new Services();
const appointment = new AppointmentService();
const appointmentRouter = express.Router();

appointmentRouter.post(
  "/create-appointment",
  //   authRequired,
  //   validatorHandler(createVehicleShema, "body"),
  async (req, res) => {
    try {
      const body = req.body;
      const dateValidated = validateDate(body.date);
      if (!dateValidated)
        return res
          .status(404)
          .json({
            message:
              "error en el formato de fecha por favor ingrese una fecha valida o proxima fecha a partir de la fecha actual ",
          });
      body.date = dateValidated;
      const hourFomatted = validateHour12(body.time);
      if (!hourFomatted)
        return res
          .status(404)
          .json({
            message:
              "error en el formato de hora por favor ingrese una hora valida ",
          });
      body.time = hourFomatted;
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
  "/get-appointment/:idlaundry/:date",
  //   validatorHandler(getVehivleSchema, "body"),
  async (req, res) => {
    try {
      const { idlaundry , date} = req.params;
      
      validateDate(date);
      if (!validateDate)
        return res
          .status(404)
          .json({
            message:
              "error en el formato de fecha por favor ingrese una fecha valida o proxima fecha a partir de la fecha actual ",
          });

      const rta = await appointment.findAbility(idlaundry, date);

      console.log(rta);
      // busca servicios por id
      // const numS = 1;
      // const rtaService = await serviceLaudry.findServices(numS);
      // console.log(rtaService, ' servicios de lavaderos');

      // const rtaAppointment = await appointment.findAppointments(citas);


      // citas de un lavadero
      const ttr = await appointment.findApp(idlaundry);

      console.log(ttr, "citas de un lavadero");
      // console.log(rtaAppointment, ' citas de un lavadero');
      res.status(201).json({ message: "citas " ,rta, ttr });
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

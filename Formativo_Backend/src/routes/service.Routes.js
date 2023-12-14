const express = require("express");
const Services = require("../services/services.service.js");
const {
  getServiceSchema,
  getQuery,
  createServiceShema,
  updateServiceShema,
} = require("../schemas/services.schema.js");
const {authRequiredClient, authRequiredUser} = require("../middlewares/validateToken.js");
const { validatorHandler } = require("../middlewares/validator.handler.js");
const { checkLaundry, checkUser } = require("../middlewares/auth.handler.js");

const Service = new Services();
const serviceRouter = express.Router();

//ruta para crear servicios del lavadero que tenga sesion iniciada
serviceRouter.post(
  "/create-service",
  authRequiredClient,
  checkLaundry,
  validatorHandler(createServiceShema, "body"),
  async (req, res,next) => {
    try {
      const user = req.user;
      const body = req.body;
      const findLaundry = await Service.findAndCreate(user.id, body);
      res.status(201).json(findLaundry);
    } catch (error) {
      next(error);
      return res.status(500).json([error.message ]);
    }
    (err, res) => {
      res.status(400).json({ error: err.message });
    };
  }
);

//ruta para obtener los servicios sobre el lavadero que tiene session iniciada
serviceRouter.get(
  "/get/:id",
  authRequiredUser,
  checkUser,
  validatorHandler(getServiceSchema, "params"),
  validatorHandler(getQuery, "query"),

  async (req, res, next) => {
    try {
      const { id } = req.params;
      const query = req.query;
      const servicesFound = await Service.findServices(id, query);
      return res.json(servicesFound);
    } catch (error) {
      next(error);
      res.status(400).json([error.message]);
    }
    (err, res) => {
      // Este middleware manejará los errores generados por el validador
      res.status(400).json({ error: err.message });
    };
  }
);

// ruta para traer los servicios del lavadero que tenga sesion iniciada
serviceRouter.get("/", authRequiredClient, checkLaundry, async (req, res, next) => {
  try {
    const query = req.query;
    const user = req.user.id;
    const servicesFound = await Service.findServicesLaundry(user, query);
    return res.json(servicesFound);
  } catch (error) {
    next(error);
    res.status(400).json([error.message]);
  }
  (err, res) => {
    // Este middleware manejará los errores generados por el validador
    res.status(400).json({ error: err.message });
  };
});

//ruta para actualizar el servicio del lavadero
serviceRouter.patch(
  "/:id",
  authRequiredClient,
  validatorHandler(getServiceSchema, "params"),
  validatorHandler(updateServiceShema, "body"),
  async (req, res) => {
    try {
      const user = req.user.id;
      const { id } = req.params;
      const body = req.body;
      const update = await Service.updateService(id, user, body);
      res.status(201).json(update);
    } catch (error) {
      console.error(error);
      return res.status(500).json([ error.message]);
    }
    (err, res) => {
      res.status(400).json({ error: err.message });
    };
  }
);
//ruta para eliminar servicios segun el lavadero tenga la sesion iniciada
serviceRouter.delete(
  "/:id",
  authRequiredClient,
  checkLaundry,
  validatorHandler(getServiceSchema, "params"),
  async (req, res) => {
    try {
      const user = req.user.id;
      const { id } = req.params;
      const deleteService = await Service.deleteService(id, user);
      res.status(201).json(deleteService);
    } catch (error) {
      console.error(error);
      return res.status(500).json([ error.message]);
    }
    (err, res) => {
      res.status(400).json({ error: err.message });
    };
  }
);

module.exports = serviceRouter;

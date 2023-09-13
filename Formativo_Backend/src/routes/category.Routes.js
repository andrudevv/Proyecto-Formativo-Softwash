import CategoryService from "../services/category.service.js";
import {createCategorySchema, updateCategorySchema, getCategorySchema} from "../schemas/category.shema.js";
import validatorHandler from "../middlewares/validator.handler.js";

import express from "express";
const categoryRouter = express.Router();
const category = new CategoryService();

categoryRouter.post("/createcategory", validatorHandler(createCategorySchema, "body"),
async (req, res, next) => {
  try {
    const body = req.body;
    console.log(body);
    const rta = await category.create(body);
    console.log(rta);
    res.status(201).json({message: "Registro de categoria exitoso"});
  } catch (error) {
    console.error(error)

    next(error);
    return res.status(500).json({ message: error.message });
  }
  (err,  res) => {
    // Este middleware manejará los errores generados por el validador
    res.status(400).json({ error: err.message });
  }
})


export { categoryRouter };

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
    
    const rta = await category.create(body);
    
    res.status(201).json({message: "Registro de categoria exitoso ", rta});
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
// para traer una categoria por id o parametro
categoryRouter.get("/getcategory",validatorHandler(getCategorySchema, "body"), 
async( req, res, next) =>{
  try{
    const body = req.body;

    const rta = await category.findOne(body.name);
    res.status(201).json({message: "categoria ", rta});
  }catch (error){
    console.error(error)

    next(error);
    return res.status(500).json({ message: error.message });
  }
  (err,  res) => {
    // Este middleware manejará los errores generados por el validador
    res.status(400).json({ error: err.message });
  }
});
// para traer las categorias
categoryRouter.get("/getcategoryServices") ,
async( req, res, next) =>{
  try{
    /*     const body = req.body; */
  }catch (error){
    console.error(error)

    next(error);
    return res.status(500).json({ message: error.message });
  }
};
// para actualizar toda la categoria, cuerpo
categoryRouter.put("/updatecategory/:allcategory",validatorHandler(updateCategorySchema, "body"), 
async( req, res, next) =>{
  try{
  }catch (error){
    console.error(error)

    next(error);
    return res.status(500).json({ message: error.message });
  }
});





export { categoryRouter };

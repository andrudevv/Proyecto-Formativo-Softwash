import LaundryService from "../services/laundry.service.js";

import validatorHandler from "../middlewares/validator.handler.js";
import { createLaundrySchema, updateLaundrySchema, getLaundrySchema, loginLaundrySchema,getLaundrysSchema} from "../schemas/laundry.shema.js";
import express from "express";
const laundryRouter = express.Router();
const Laundry = new LaundryService();

laundryRouter.post("/registerlaundry", validatorHandler(createLaundrySchema, "body"),
async (req, res, next) => {
  try {
    const body = req.body;
    const rta = await Laundry.create(body);
    if(rta) return res.status(201).json({message:`registro exitoso ${rta.name}`})
  } catch (error) {
    console.error(error)
    console.log(error);

    // next(error);
    return res.status(400).json([error.message] );
  }
  (err,  res) => {
    // Este middleware manejará los errores generados por el validador
    res.status(400).json({ error: err.message });
  }
})
// para traer una categoria por id o parametro

// // para traer las categorias
// laundryRouter.get("/getcategoryServices") ,
// async( req, res, next) =>{
//   try{
//     /*     const body = req.body; */
//   }catch (error){
//     console.error(error)

//     next(error);
//     return res.status(500).json({ message: error.message });
//   }
// };
// // para actualizar toda la categoria, cuerpo
// laundryRouter.put("/updatecategory/:allcategory",validatorHandler(updateCategorySchema, "body"), 
// async( req, res, next) =>{
//   try{
//   }catch (error){
//     console.error(error)

//     next(error);
//     return res.status(500).json({ message: error.message });
// //   }
// });





export { laundryRouter };

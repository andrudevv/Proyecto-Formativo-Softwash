import UserService from "../services/user.service.js";
import LaundryService from "../services/laundry.service.js";
import { authRequired } from "../middlewares/validateToken.js";
import {
  updateUserShema,
  createuserShema,
  getUserShema,
  loginShema,
} from "../schemas/user.shema.js";
import validatorHandler from "../middlewares/validator.handler.js";
import { createAccessToken } from "../lib/jwt.js";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config/token.js";
import express from "express";
import { sendEmail } from "../envioCorreos.js";
import { getLaundrysSchema } from "../schemas/laundry.shema.js";
import { DepartmentService } from "../services/department.service.js";
import { MunicipalityService } from "../services/municipality.service.js";
const userRouter = express.Router();
const service = new UserService();
const Laundry = new LaundryService();
const department =new DepartmentService()
const municipality=new MunicipalityService()
userRouter.post("/forgot-password", async (req, res, next) => {
  try {
    const  {Email}  = req.body;
    const rta = await service.findByEmail(Email);
    if(rta){const send = sendEmail(Email);
      return res.status(200).json(send);

    }
  } catch (error) {
    next(error);
  }
});
userRouter.post(
  "/login",
  validatorHandler(loginShema, "body"),
  async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const findUser = await service.login(email, password);
      const token = await createAccessToken({
        id: findUser.documentUser,
        username: findUser.name,
      });
      res.cookie("token", token, {
        // httpOnly: process.env.NODE_ENV !== "development",
        secure: true,
        sameSite: "none",
      });
      return res.status(200).json(findUser)
    } catch (error) {
      // next(error);
    console.log(error);
    return res.status(400).json([error.message] );

    }
  }
);
userRouter.get("/getlaundrys",validatorHandler(getLaundrysSchema, "body"), 
async( req, res, next) =>{
  try{
    const body = req.body;

    const rta = await Laundry.findAllsWhere(body.departmentId,body.municipalityId);
    res.status(201).json({message: "lavadero", rta});
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
userRouter.get("/getDepartments", 
async( req, res, next) =>{
  try{

    const rta = await department.find();
    // const rta = await DepartmentService.findOne(body.departmentId);
    res.status(201).json(rta);
    
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

userRouter.get("/getDepartments/:id", 
async( req, res, next) =>{
  try{

    const {id} = req.params;
    const rta = await municipality.findOne(id);
    // const rta = await DepartmentService.findOne(body.departmentId);
    res.status(201).json(rta);
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
userRouter.post(
  "/register",
  validatorHandler(createuserShema, "body"),
  async (req, res, next) => {
    try {
      
      const body = req.body;
      const newUser = await service.registerUser(body);
      
      const token = await createAccessToken({ id: newUser.documentUser });

      res.cookie("token", token);
      if (newUser) return res.status(201).json({message: `Registro exitoso ${newUser.name}`});
    } catch (error) {

      next(error);
      return res.status(500).json({ message: error.message });
    }
    (err,  res) => {
      // Este middleware manejará los errores generados por el validador
      res.status(400).json({ error: err.message });
    }
  }
);

// Ruta para salir/ cerrar sesion
userRouter.get("/verify", async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) return res.sendStatus(401);

  jwt.verify(token, TOKEN_SECRET, async (error, user) => {
    if (error) return res.sendStatus(401);

    const userFound = await service.findOne(user);
    if (!userFound) return res.sendStatus(401);

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
  });
});

userRouter.get("/task", authRequired, async (req, res, next) => {
  res.send("tareas hechas");
  // try {
  //   const users = await service.find();
  //   res.json(users);
  // } catch (error) {
  //   next(error);
  // }
});
userRouter.patch(
  "/:id",
  validatorHandler(getUserShema, "params"),
  validatorHandler(updateUserShema, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const category = await service.update(id, body);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);

userRouter.delete(
  "/:id",
  validatorHandler(getUserShema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(201).json({ id });
    } catch (error) {
      next(error);
    }
  }
);


export { userRouter };

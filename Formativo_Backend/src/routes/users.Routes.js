import express from "express";
import jwt from "jsonwebtoken";
//
import UserService from "../services/user.service.js";
import LaundryService from "../services/laundry.service.js";
import { authRequired } from "../middlewares/validateToken.js";
import {
  updateUserShema,
  createuserShema,
  getUserShema,
  loginShema,
} from "../schemas/user.schema.js";
import validatorHandler from "../middlewares/validator.handler.js";
import { createAccessToken } from "../lib/jwt.js";
import { config } from "../config/config.js";
import { getLaundrysSchema } from "../schemas/laundry.schema.js";
import { DepartmentService } from "../services/department.service.js";
import { MunicipalityService } from "../services/municipality.service.js";
import { register} from "../utils/emailRegister.js"
//
const userRouter = express.Router();
const service = new UserService();
const Laundry = new LaundryService();
const department = new DepartmentService();
const municipality = new MunicipalityService();
userRouter.post("/forgot-password", async (req, res, next) => {
  try {
    const { email } = req.body;
    const send = await service.sendEmailForgot(email);
    if(send) return res.status(201).json({message:'Se ha enviado un correo de recuperación'});
  } catch (error) {
    next(error);
  }
});
userRouter.post(
  "/login",
  validatorHandler(loginShema, "body"),
  async (req, res) => {
    try {
      const { email, password } = req.body;
      const findUser = await service.login(email, password);
      const token = await createAccessToken({
        id: findUser._id,
        document: findUser.documentUser,
        username: findUser.name,
        role: findUser.role,
      });
      res.cookie("token", token, {
        // httpOnly: process.env.NODE_ENV !== "development",
        secure: true,
        sameSite: "none",
      });
      return res.status(200).json(findUser);
    } catch (error) {
      // next(error);
      console.log(error);
      return res.status(400).json([error.message]);
    }
  }
);
userRouter.post("/logout",  authRequired,(req, res) => {
  // Para cerrar sesión, simplemente borramos la cookie de token
  res.clearCookie("token", {
    secure: true, // Asegúrate de que coincida con la configuración utilizada al establecer la cookie
    sameSite: "none", // Asegúrate de que coincida con la configuración utilizada al establecer la cookie
  });

  return res.status(200).json({ message: "hasta pronto" });
});

userRouter.post("/change-password/:token", async (req, res, next) => {
  try {
    const { token } = req.params;
    // const user = await service.reset(token);
    const { newPassword } = req.body;
    const rta = await service.changePassword(token, newPassword);
    res.json(rta);
  } catch (error) {
    next(error);
  }
});
userRouter.get(
  "/getlaundrys",
  validatorHandler(getLaundrysSchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;

      const rta = await Laundry.findAllsWhere(
        body.departmentId,
        body.municipalityId
      );
      res.status(201).json({ message: "lavadero", rta });
    } catch (error) {
      console.error(error);

      next(error);
      return res.status(500).json({ message: error.message });
    }
    (err, res) => {
      // Este middleware manejará los errores generados por el validador
      res.status(400).json({ error: err.message });
    };
  }
);
userRouter.get("/getDepartments", async (req, res, next) => {
  try {
    const rta = await department.find();
    // const rta = await DepartmentService.findOne(body.departmentId);
    console.log(rta);
    res.status(201).json(rta);
  } catch (error) {
    console.error(error);

    next(error);
    return res.status(500).json({ message: error.message });
  }
  (err, res) => {
    // Este middleware manejará los errores generados por el validador
    res.status(400).json({ error: err.message });
  };
});

userRouter.post(
  "/register",
  validatorHandler(createuserShema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newUser = await service.registerUser(body);
      if (newUser){

        await register(newUser.email, newUser.name)

        return res
          .status(201)
          .json({ message: `Registro exitoso ${newUser.name}` });
      }
        
    } catch (error) {
      next(error);
      return res.status(500).json({ message: error.message });
    }
    (err, res) => {
      // Este middleware manejará los errores generados por el validador
      res.status(400).json({ error: err.message });
    };
  }
);

// Ruta para salir/ cerrar sesion
userRouter.get("/verify", async (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.sendStatus(401);

  jwt.verify(token, config.jwtSecret, async (error, user) => {
    if (error) return res.sendStatus(401);

    const userFound = await service.findOne(user);
    if (!userFound) return res.sendStatus(401);

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      role: userFound.role,
    });
  });
});

// userRouter.get("/task", authRequired, async (req, res) => {
//   res.send("tareas hechas");
//   // try {
//   //   const users = await service.find();
//   //   res.json(users);
//   // } catch (error) {
//   //   next(error);
//   // }
// });
userRouter.get("/getDepartments/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const rta = await municipality.findOne(id);
    // const rta = await DepartmentService.findOne(body.departmentId);
    res.status(201).json(rta);
  } catch (error) {
    console.error(error);

    next(error);
    return res.status(500).json({ message: error.message });
  }
  (err, res) => {
    // Este middleware manejará los errores generados por el validador
    res.status(400).json({ error: err.message });
  };
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
userRouter.get("/reset-password/:token", async (req, res, next) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;
    const user = await service.reset(token);

    if( user){
      try {
      const updatePassword = await service.update(user.id, newPassword)
        if(updatePassword){
          console.log('actualizada la contraseña');
        }
      } catch (error) {
        next(error);
      }
    }
  } catch (error) {
    console.error(error);

    next(error);
    return res.status(500).json({ message: error.message });
  }
  (err, res) => {
    // Este middleware manejará los errores generados por el validador
    res.status(400).json({ error: err.message });
  };
});

export { userRouter };

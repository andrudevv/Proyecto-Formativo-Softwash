import UserService from "../services/user.service.js";
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
const userRouter = express.Router();
const service = new UserService();

userRouter.post("/forgot-password", async (req, res, next) => {
  try {
    const  {email}  = req.body;
    const rta = await service.findByEmail(email);
    if(rta){const send = sendEmail(email);
    console.log(send);
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
      if (!findUser) {
        return res.status(401).send("Correo o contraseña incorrectos");
      }
      const token = await createAccessToken({
        id: findUser.documentUser,
        username: findUser.name,
      });
      console.log(token);
      res.cookie("token", token, {
        // httpOnly: process.env.NODE_ENV !== "development",
        secure: true,
        sameSite: "none",
      });
      res.json(findUser);
    } catch (error) {
      next(error);
    }
  }
);

userRouter.post(
  "/register",
  validatorHandler(createuserShema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newUser = await service.registerUser(body);
      const token = await createAccessToken({ id: newUser.documentUser });

      res.cookie("token", token);
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
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

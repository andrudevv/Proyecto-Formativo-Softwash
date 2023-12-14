const express = require("express");
const LaundryService = require("../services/laundry.service.js");
const { validatorHandler } = require("../middlewares/validator.handler.js");
const { checkLaundry, checkUser } = require("../middlewares/auth.handler.js");
const { authRequiredClient } = require("../middlewares/validateToken.js");
const { createAccessToken } = require("../lib/jwt.js");
const path = require("path");
const { register } = require("../utils/clientEmailRegister.js");
const fs = require("node:fs");
const jwt = require("jsonwebtoken");
const { config } = require("../config/config.js");
const multer = require("multer");
const upload = multer({ dest: "../uploads/" });
const {
  createLaundrySchema,
  updateLaundrySchema,
  getLaundryQuery,
  loginLaundrySchema,
} = require("../schemas/laundry.schema.js");
const { authRequiredUser } = require("../middlewares/validateToken.js");
const laundryRouter = express.Router();
const Laundry = new LaundryService();

// ruta para registrarse el cliente
laundryRouter.post(
  "/register-client",
  validatorHandler(createLaundrySchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newClient = await Laundry.regiterClient(body);
      const token = await createAccessToken({
        id: newClient.id,
        rut: newClient.rutLaundry,
        username: newClient.name,
        membership: newClient.membership,
      });
      res.cookie("tokenClient", token, {
        // httpOnly: process.env.NODE_ENV !== "development",
        secure: true,
        sameSite: "none",
      });
      // await register(newClient.email, newClient.name);
      res.status(201).json(newClient);
    } catch (error) {
      next(error);
      return res.status(400).json([error.message]);
    }
    (err, res) => {
      // Este middleware manejará los errores generados por el validador
      res.status(400).json({ error: err.message });
    };
  }
);

// ruta para iniciar sesion
laundryRouter.post(
  "/login-client",
  validatorHandler(loginLaundrySchema, "body"),
  async (req, res, next) => {
    try {
      const { rutLaundry, email, password } = req.body;
      const findLaundry = await Laundry.login(rutLaundry, email, password);
      const token = await createAccessToken({
        id: findLaundry.id,
        rut: findLaundry.rutLaundry,
        username: findLaundry.name,
        membership: findLaundry.membership,
      });
      res.cookie("tokenClient", token, {
        // httpOnly: process.env.NODE_ENV !== "development",
        secure: true,
        sameSite: "none",
      });
      res.status(200).json(findLaundry);
    } catch (error) {
      next(error);
      return res.status(400).json([error.message]);
    }
    (err, res) => {
      // Este middleware manejará los errores generados por el validador
      res.status(400).json({ error: err.message });
    };
  }
);

//ruta para cerrar sesion
laundryRouter.post("/logout", authRequiredClient, checkLaundry, (req, res) => {
  // Para cerrar sesión, simplemente borramos la cookie de token
  res.clearCookie("tokenClient", {
    secure: true, // Asegúrate de que coincida con la configuración utilizada al establecer la cookie
    sameSite: "none", // Asegúrate de que coincida con la configuración utilizada al establecer la cookie
  });

  return res.status(200).json({ message: "hasta pronto" });
});

//filtro de todos los lavaderos por departamento , municipio y tipo de vehiculo
laundryRouter.get(
  "/",
  authRequiredUser,
  checkUser,
  validatorHandler(getLaundryQuery, "query"),
  async (req, res, next) => {
    try {
      const query = req.query;
      const findDepartments = await Laundry.findAllsWhere(query);
      res.status(201).json(findDepartments);
    } catch (error) {
      next(error);
      return res.status(400).json([error.message]);
    }
    (err, res) => {
      // Este middleware manejará los errores generados por el validador
      res.status(400).json({ error: err.message });
    };
  }
);

//ruta para el perfil del cliente
laundryRouter.get(
  "/profile-client",
  authRequiredClient,
  checkLaundry,
  async (req, res, next) => {
    try {
      const user = req.user;
      const userFound = await Laundry.findProfile(user.id);
      if (!userFound) return res.sendStatus(401);

      return res.json(userFound);
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
laundryRouter.get("/verify", async (req, res) => {
  const { tokenClient } = req.cookies;
  if (!tokenClient) return res.sendStatus(401);

  jwt.verify(tokenClient, config.jwtSecret, async (error, user) => {
    if (error) return res.sendStatus(401);

    const userFound = await Laundry.findOne(user.id);
    if (!userFound) return res.sendStatus(401);

    return res.json({
      id: userFound._id,
      name: userFound.name,
      email: userFound.email,
    });
  });
});
// ruta para actualizar datos del cliente
laundryRouter.patch(
  "/",
  authRequiredClient,
  checkLaundry,
  validatorHandler(updateLaundrySchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const user = req.user;
      const update = await Laundry.updateClient(user.id, body);
      return res.status(201).json(update);
    } catch (error) {
      res.json([error.message]);
      next(error);
      // return res.status(400).json([error.message]);
    }
    (err, res) => {
      // Este middleware manejará los errores generados por el validador
      res.status(400).json({ error: err.message });
    };
  }
);
function saveImg(file) {
  const newFileName = `${Date.now()}_${file.originalname}`;
  const newPath = path.join("./uploads", newFileName);
  fs.renameSync(file.path, newPath);
  const img = { imageUrl: newFileName };
  return img;
}
laundryRouter.get("/:imageName", (req, res) => {
  const { imageName } = req.params;
  const imagePath = path.join(__dirname, "../../uploads", imageName);

  // Envía la imagen como respuesta
  res.sendFile(imagePath);
});
//ruta para actualizar la imagen
laundryRouter.patch(
  "/img-profile/",
  authRequiredClient,
  checkLaundry,
  upload.single("imageUrl"),
  async (req, res, next) => {
    try {
      const user = req.user.id;
      const img = await saveImg(req.file);
      const updateImg = await Laundry.updateImgClient(user, img);
      return res.status(201).json(updateImg);
    } catch (error) {
      res.json([error.message]);
      next(error);
      // return res.status(400).json([error.message]);
    }
    (err, res) => {
      // Este middleware manejará los errores generados por el validador
      res.status(400).json({ error: err.message });
    };
  }
);
//ruta para tomar el correo de restablecer contraseña
laundryRouter.post("/forgot-password", async (req, res, next) => {
  try {
    const { email } = req.body;
    const send = await Laundry.sendEmailForgot(email);
    res.status(201).json(send);
  } catch (error) {
    next(error);
  }
});
//ruta para cambiar contraseña por medio de la redireccion en el correo
laundryRouter.post("/change-password/:token", async (req, res, next) => {
  try {
    const { token } = req.params;
    // const user = await service.reset(token);
    const { newPassword } = req.body;
    const rta = await Laundry.changePassword(token, newPassword);
    res.json(rta);
  } catch (error) {
    next(error);
  }
});

module.exports = laundryRouter;

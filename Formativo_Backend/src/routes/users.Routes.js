const express = require("express");
const jwt = require("jsonwebtoken");
const { config } = require("../config/config.js");
//
const UserService = require("../services/user.service.js");
const LaundryService = require("../services/laundry.service.js");
const {authRequiredUser} = require("../middlewares/validateToken.js");
const {
  updateUserShema,
  createuserShema,
  getUserShema,
  loginShema,
} = require("../schemas/user.schema.js");
const { validatorHandler } = require("../middlewares/validator.handler.js");
const { checkUser } = require("../middlewares/auth.handler.js");
const { createAccessToken } = require("../lib/jwt.js");
const { getLaundrysSchema } = require("../schemas/laundry.schema.js");
const DepartmentService = require("../services/department.service.js");
const MunicipalityService = require("../services/municipality.service.js");
const { register } = require("../utils/userEmailRegister.js");
const VehicleService = require("../services/vehicle.service.js");
//
const userRouter = express.Router();
const Vehicle = new VehicleService();
const service = new UserService();
const Laundry = new LaundryService();
const department = new DepartmentService();
const municipality = new MunicipalityService();

// ruta que toma el correo para enviar la recuperacion de la contraseña
userRouter.post("/forgot-password", async (req, res, next) => {
  try {
    const { email } = req.body;
    const send = await service.sendEmailForgot(email);
    res.status(201).json(send);
  } catch (error) {
    next(error);
  }
});


//registro de usuario
userRouter.post(
  "/register",
  validatorHandler(createuserShema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newUser = await service.registerUser(body);
      // await register(newUser.email, newUser.name);
      const token = await createAccessToken({
        id: newUser.id,
        document: newUser.documentUser,
        username: newUser.name,
      });
      res.cookie("tokenUser", token, {
        // httpOnly: process.env.NODE_ENV !== "development",
        secure: true,
        sameSite: "none",
      });
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
      return res.status(500).json([error.message]);
    }(err, res) => {
      // Este middleware manejará los errores generados por el validador
      res.status(400).json({ error: err.message });
    };
  }
);
// ruta para iniciar sesion
userRouter.post(
  "/login",
  validatorHandler(loginShema, "body"),
  async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const findUser = await service.login(email, password);
      const token = await createAccessToken({
        id: findUser.id,
        document: findUser.documentUser,
        username: findUser.name,
      });
      res.cookie("tokenUser", token, {
        // httpOnly: process.env.NODE_ENV !== "development",
        secure: true,
        sameSite: "none",
      });
      return res.status(200).json(findUser);
    } catch (error) {
      next(error);
      res.status(400).json([error.message]);
    }(err, res) => {
      // Este middleware manejará los errores generados por el validador
      res.status(400).json({ error: err.message });
    };
  }
);
//ruta para cerrar sesion
userRouter.post("/logout", authRequiredUser, (req, res) => {
  // Para cerrar sesión, simplemente borramos la cookie de token
  res.clearCookie("tokenUser", {
    secure: true, // Asegúrate de que coincida con la configuración utilizada al establecer la cookie
    sameSite: "none", // Asegúrate de que coincida con la configuración utilizada al establecer la cookie
  });

  return res.status(200).json({ message: "hasta pronto" });
});

// cambiar contraseña con un token que se envio al correo para restablecer
userRouter.post("/change-password/:token", async (req, res, next) => {
  try {
    const { tokenUser } = req.params;
    // const user = await service.reset(token);
    const { newPassword } = req.body;
    const rta = await service.changePassword(tokenUser, newPassword);
    res.json(rta);
  } catch (error) {
    next(error);
  }
});

// buscar todos los lavaderos segun el usuario realize el filtro
// userRouter.get(
//   "/getlaundrys",
//   authRequiredUser,
//   checkUser,
//   validatorHandler(getLaundrysSchema, "body"),
//   async (req, res, next) => {
//     try {
//       const body = req.body;

//       const rta = await Laundry.findAllsWhere(
//         body.departmentId,
//         body.municipalityId
//       );
      
//       res.status(201).json({ message: "lavadero", rta });
//     } catch (error) {
//       console.error(error);

//       next(error);
//       return res.status(500).json({ message: error.message });
//     }
//     (err, res) => {
//       // Este middleware manejará los errores generados por el validador
//       res.status(400).json({ error: err.message });
//     };
//   }
// );


userRouter.get(
  "/profile-user",
  authRequiredUser,
  checkUser,
 
  async (req, res, next) => {
    try {
      const user = req.user;
      const userFound = await service.findProfile(user.id);
      if (!userFound) return res.sendStatus(401);
      return res.status(200).json( userFound);
    } catch (error) {
      next(error);
      res.status(400).json([error.message]);
    }
    (err, res) => {
      res.status(400).json({ error: err.message });
    };
  }
);

//traer vehiculos de el usuario autenticado
userRouter.get(
  "/profile-user-vehicle",
  authRequiredUser,
  checkUser,
 
  async (req, res, next) => {
    try {
      const user = req.user;
      const userFound = await Vehicle.findByUser(user.id);
      return res.status(200).json(userFound);
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

//actualizar datos sin incluir la contraseña
userRouter.patch(
  "/",
  authRequiredUser,
  // checkLaundry,
  validatorHandler(updateUserShema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const user = req.user;
      const update = await service.updateUser(user.id, body);
      res.status(201).json(update);
    } catch (error) {
      // res.json([error.message]);
      next(error);
      res.status(400).json([error.message]);
    }
    (err, res) => {
      // Este middleware manejará los errores generados por el validador
      res.status(400).json({ error: err.message });
    };
  }
);

// ver el verfil del lavadero
userRouter.get(
  "/view-profile/:id",
  authRequiredUser,
  checkUser,
  // validatorHandler(createLaundrySchema, "query"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const query = req.query;
      const viewLaundry = await Laundry.findLaundry(id, query);
      return res.status(200).json(viewLaundry);
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

//traer departamentos
userRouter.get("/getDepartments", async (req, res, next) => {
  try {
    const rta = await department.find();
    // const rta = await DepartmentService.findOne(body.departmentId);
    console.log(rta);
    res.status(201).json(rta);
  } catch (error) {
    console.error(error);

    next(error);
    return res.status(500).json([error.message ]);
  }
  (err, res) => {
    // Este middleware manejará los errores generados por el validador
    res.status(400).json({ error: err.message });
  };
});


// ruta necesaria para que el front valide las cookies y manipule el id o el nombre o correo segun lo requiera
userRouter.get("/verify-user", async (req, res) => {
  const { tokenUser } = req.cookies;
  if (!tokenUser) return res.sendStatus(401);

  jwt.verify(tokenUser, config.jwtSecret, async (error, user) => {
    if (error) return res.sendStatus(401);

    const userFound = await service.findOne(user.id);
    if (!userFound) return res.sendStatus(401);

    return res.json(userFound);
  });
});

// ruta para traer los municipios segun el departamento(formularios o registro)
userRouter.get("/get-municipality/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const rta = await municipality.findOne(id);
    // const rta = await DepartmentService.findOne(body.departmentId);
    res.status(201).json(rta);
  } catch (error) {
    console.error(error);

    next(error);
    return res.status(500).json([error.message ]);
  }
  (err, res) => {
    // Este middleware manejará los errores generados por el validador
    res.status(400).json({ error: err.message });
  };
});



//actualizar la contraseña por medio de token
userRouter.get("/reset-password/:token", async (req, res, next) => {
  try {
    const { tokenUser } = req.params;
    const { newPassword } = req.body;
    const user = await service.changePassword(tokenUser, newPassword);
    res.status(201).json(user);
  } catch (error) {
    console.error(error);

    next(error);
    return res.status(500).json([error.message]);
  }
  (err, res) => {
    // Este middleware manejará los errores generados por el validador
    res.status(400).json({ error: err.message });
  };
});

module.exports = userRouter;

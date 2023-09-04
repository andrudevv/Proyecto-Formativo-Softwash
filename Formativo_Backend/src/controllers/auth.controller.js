import { User } from "../../models/userModels/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createAccessToken } from "../lib/jwt.js";
import { TOKEN_SECRET } from "../config/token.js";

export const register = async (req, res) => {
  const {
    documentUser,
    name,
    lastName,
    phone,
    email,
    password,
    city,
    municipality,
  } = req.body;

  try {
    const userFound = await User.findOne({ email });
    if (userFound) return res.status(400).json(["el correo ya existe"]);

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({
      documentUser,
      name,
      lastName,
      phone,
      email,
      password: passwordHash,
      city,
      municipality, 
    });

    const userSaved = await newUser.save();

    const token = await createAccessToken({ id: userSaved._id });
    res.cookie("token", token);
    res.json({
      id: userSaved._id,
      documentUser: userSaved.documentUser,
      name: userSaved.name,
      lastName: userSaved.lastName,
      phone: userSaved.phone,
      email: userSaved.email,
      password: userSaved.password,
      token: token,
      city: userSaved.city,
      municipality: userSaved.municipality,
    });

    // res.json({
    //     message:"usuario creado"
    // })
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userFound = await User.findOne({ email });
    if (!userFound) return res.status(400).json(["el correo no existe"]);

    const ismatch = await bcrypt.compare(password, userFound.password);
    if (!ismatch) return res.status(400).json(["contraseña incorrecta"]);

    const token = await createAccessToken({
      id: userFound._id,
      username: userFound.username,
    });
    res.cookie("token", token, {
      // httpOnly: process.env.NODE_ENV !== "development",
      secure: true,
      sameSite: "none",
    });

    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.send(false);

  jwt.verify(token, TOKEN_SECRET, async (error, user) => {
    if (error) return res.sendStatus(401);

    const userFound = await User.findById(user.id);
    if (!userFound) return res.sendStatus(401);

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
  });
};

export const logout = async (req, res) => {
  res.cookie("token", "", {
    secure: true,
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

export const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id);
  if (!userFound)
    return res.status(400).json({
      message: "user not found",
    });
  return res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
    createdAt: userFound.createdAt,
    updateAt: userFound.updateAt,
  });
};

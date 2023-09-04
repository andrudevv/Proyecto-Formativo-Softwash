// import axios from "axios";
import Axios from "../axios";

const API = "http://localhost:4000/api";

// export const registerRequest = (user) => Axios.post(`${API}/register`, user);

// /registrarse  para usuario
export const registerRequest = (user) =>
  Axios.post(`${API}/users/register`, user);

// /validar para usuario
export const loginRequest = (user) => 
    Axios.post(`${API}/users/login`, user);

//verificar token

// export const verifyTokenRequest = () => Axios.get(`${API}/users/verify`);
export const verifyTokenRequest = () => Axios.get(`${API}/users/verify`);


export const resetPassword = (data) =>
    Axios.post(`${API}/users/forgot-password`, data  );







// /actualizar para recuperar clave en el usuario

// /restablecer  ruta para correo restablecer ingresando correo

// export const verifyTokenRequest = () => Axios.get(`${API}/verify`);
// export const logoutRequest = () => Axios.post(`${API}/logout`);

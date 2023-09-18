// import axios from "axios";
import Axios from "../axios";

const API = "http://localhost:4000/api";

// export const registerRequest = (user) => Axios.post(`${API}/register`, user);

// /registrarse  para usuario
export const registerRequest = (user) =>
  Axios.post(`${API}/users/register`, user);

// /validar para usuario
export const loginRequest = (user) => Axios.post(`${API}/users/login`, user);

//verificar token

// export const verifyTokenRequest = () => Axios.get(`${API}/users/verify`);
export const verifyTokenRequest = () => Axios.get(`${API}/users/verify`);

export const resetPassword = (data) =>
  Axios.post(`${API}/users/forgot-password`, data)
    .then((Response) => {
      return Response;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });

// /actualizar para recuperar clave en el usuario

// /restablecer  ruta para correo restablecer ingresando correo

// export const verifyTokenRequest = () => Axios.get(`${API}/verify`);
// export const logoutRequest = () => Axios.post(`${API}/logout`);

export const registerClientRequest = (user) =>
  Axios.post(`${API}/client/registerlaundry`, user)
    .then((Response) => {
      return Response;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });

// /validar para usuario
export const loginClientRequest = (user) =>
  Axios.post(`${API}/client/register`, user);

//verificar token

// export const verifyTokenRequest = () => Axios.get(`${API}/users/verify`);
export const clientVerifyTokenRequest = () => Axios.get(`${API}/users/verify`);

export const resetPasswordClient = (data) =>
  Axios.post(`${API}/users/forgot-password`, data)
    .then((Response) => {
      console.log("correo enviado ", Response);
      return Response.data;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });

export const getDepartment = () => {
  Axios.get(`${API}/users/getDepartments`)
    .then((Response) => {
      return Response.data;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
};
export const getMunicipalities = (id) => {
  Axios.get(`${API}/client/getDepartments/${id}`)
    .then((Response) => {
      setMunicipalities(Response.data);
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
};

// import axios from "axios";
import Axios from "../axios";

const API = "http://localhost:4000/api";
 //////////////////////// USUARIO  ///////////////////////////
// export const registerRequest = (user) => Axios.post(`${API}/register`, user);

// /registrarse  para usuario
export const registerRequest = (user) =>
  Axios.post(`${API}/users/register`, user);

// /validar para usuario
export const loginRequest = (user) => Axios.post(`${API}/users/login`, user);

// ruta para actualizar vehiculo
export const updateVehicleRequest = (id,vehicle) => Axios.patch(`${API}/vehicle/${id}`,vehicle)

// ruta para traer vehiculos del usuario
export const getVehiclesUser = () => Axios.get(`${API}/users/profile-user-vehicle`);
// ruta para eliminar un vehiculo
export const deleteVehicleUser = (id) =>Axios.delete(`${API}/vehicle/${id}`);

// ruta para crear vehiculo
export const createNewVehicle = (newVehicle) => Axios.post(`${API}/vehicle/create-vehicle`, newVehicle);

export const getUserProfile = () => Axios.get(`${API}/users/profile-user`);

// ruta para traer todas las citas del usuario
export const getAppointments = () => Axios.get(`${API}/appointment/my-appointments`);
// export const verifyTokenRequest = () => Axios.get(`${API}/users/verify`);
export const verifyTokenRequest = () => Axios.get(`${API}/users/verify-user`);

//ruta para actualzar datos del usuario
export const updateUser = (userUpdate) => Axios.patch(`${API}/users/`, userUpdate)

export const resetPassword = (data) =>
  Axios.post(`${API}/users/forgot-password`, data)
    .then((Response) => {
      return Response;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });

// ruta para crear la cita    
export const registerAppointment = (appointment) => Axios.post(`${API}/appointment/create-appointment` , appointment)

// ruta para obtener disponibilidad segun el id del servicio y fecha
export const availabilityFound = (idService, date) => Axios.get(`${API}/appointment/${idService}/${date}`)

//ruta para obtener servicios del lavadero seleccionado
export const getProfileWithServices = (id) => Axios.get(`${API}/users/view-profile/${id}`);
// /actualizar para recuperar clave en el usuario

// /restablecer  ruta para correo restablecer ingresando correo

// export const verifyTokenRequest = () => Axios.get(`${API}/verify`);
// export const logoutRequest = () => Axios.post(`${API}/logout`);



///////////////////////////////CLIENTE ////////////////////////////
export const registerClientRequest = (user) =>
  Axios.post(`${API}/client/register-client`, user)
   

// /validar para usuario
export const loginClientRequest = (user) =>
  Axios.post(`${API}/client/login-client`, user);


  // ruta para traer los datos del cliente
export const getClientProfile = () => Axios.get(`${API}/client/profile-client`);


//ruta para traer los servicios del lavadero
export const getServicesLaudry = () => Axios.get(`${API}/service`);
// ruta para actualizar servicio
export const updateService = (id, dataUpdate) => Axios.patch(`${API}/service/${id}`, dataUpdate);
// ruta para crear servicio
 export const createService = (newService) => Axios.post(`${API}/service/create-service`,newService);
// ruta para eliminar servicio
export const deleteService = (id) => Axios.delete(`${API}/service/${id}`);
// ruta para actualizar datos del lavadero
export const updateClient = (dataClient) => Axios.patch(`${API}/client`, dataClient);
export const clientVerifyTokenRequest = () => Axios.get(`${API}/client/verify`);

export const resetPasswordClient = (data) =>
  Axios.post(`${API}/client/forgot-password`, data)
    .then((Response) => {
      console.log("correo enviado ", Response);
      return Response.data;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });


export const FindLaundry = (queryFind) => Axios.get(`${API}/client/`,{ params: queryFind});
// export const getDepartment = () => {
//   Axios.get(`${API}/users/getDepartments`)
//     .then((Response) => {
//       return Response.data;
//     })
//     .catch((error) => {
//       console.log(error);
//       throw error;
//     });
// };
// export const getMunicipalities = (id) => {
//   Axios.get(`${API}/client/getDepartments/${id}`)
//     .then((Response) => {
//       // setMunicipalities(Response.data);
//     })
//     .catch((error) => {
//       console.log(error);
//       throw error;
//     });
// };

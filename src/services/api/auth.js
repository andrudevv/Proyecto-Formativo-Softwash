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
export const getProfileWithServices = (id,query) => Axios.get(`${API}/users/view-profile/${id}`,{params: query});
// /actualizar para recuperar clave en el usuario

// /restablecer  ruta para correo restablecer ingresando correo

// export const verifyTokenRequest = () => Axios.get(`${API}/verify`);
// export const logoutRequest = () => Axios.post(`${API}/logout`);



///////////////////////////////CLIENTE ////////////////////////////
export const registerClientRequest = (user) =>
  Axios.post(`${API}/client/register-client`, user)
   
export const changuePhotoClient = (img) => Axios.patch(`${API}/client/img-profile`,img,{
  headers: {
    "Content-Type": "multipart/form-data",
  }
})
// /validar para usuario
export const loginClientRequest = (user) =>
  Axios.post(`${API}/client/login-client`, user);

//ruta para finalizar una cita del lado del cliente
export const sendFinalizedAppointment = (id) => Axios.patch(`${API}/appointment/update-appointment-finalized/${id}`);
  // ruta para traer los datos del cliente
export const getClientProfile = () => Axios.get(`${API}/client/profile-client`);

//ruta para eliminar la cita del lado del cliente
export const appointmentDeleted = (idAppointment) => Axios.delete(`${API}/appointment/delete-appointment/${idAppointment}`);
//ruta para traer los servicios del lavadero
export const getServicesLaudry = (query) => Axios.get(`${API}/service`,{params: query});
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




//ruta para buscar disponibilidad de citas del lado del cliente
export const availabilityFoundClient = (id, date) => Axios.get(`${API}/appointment/reschedule/${id}/${date}`)

// ruta para traer la cita a reagendar
export const findAppointmentForReschedule = (id) => Axios.get(`${API}/appointment/get-appointment-reschedule/${id}`)


//ruta para filtro de citas segun fecha y estado
export const FindAppointments = (date, state) => Axios.get(`${API}/appointment/get-appointments/${date}`,{ params: state});


//ruta para filtrar las citas no asistidas, por fecha o placa
export const FindAppointmentsAbsence = (query) => Axios.get(`${API}/appointment/get-appointments-absence/`,{ params: query});


//ruta para actualizar la cita confirmando asistencia
export const sendToProcess = (id, state) => Axios.patch(`${API}/appointment/my-appointments/${id}`, state);

//ruta para el filtro de los lavaderos del lado del usuario
export const FindLaundry = (queryFind) => Axios.get(`${API}/client/`,{ params: queryFind});


//ruta para traer las citas que el cliente envia a proceso
export const getProcessAppointments =() => Axios.get(`${API}/appointment/get-process-appointment`);
//ruta para actualizar o reagendar la cita 
export const updateAndReschedule = (idAppointment,appointment) => Axios.patch(`${API}/appointment/update-appointment/${idAppointment}`,appointment)

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

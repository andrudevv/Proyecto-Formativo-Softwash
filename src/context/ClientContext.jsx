import { createContext, useState, useContext,useEffect } from "react";
import { registerClientRequest, 
    loginClientRequest, 
    resetPasswordClient,
    clientVerifyTokenRequest,
    getClientProfile,
    updateClient,
    getServicesLaudry,
    updateService,
    deleteService,
    createService,
    FindAppointments,
    sendToProcess,
    FindAppointmentsAbsence,
    findAppointmentForReschedule,
    updateAndReschedule,
    availabilityFoundClient,
    appointmentDeleted,
    getProcessAppointments,
    sendFinalizedAppointment,
    changuePhotoClient
 } from "../services/api/auth";
import Cookies from "js-cookie";



export const AuthClientContext = createContext()
export const clientAuth = () => {
    const context = useContext(AuthClientContext);
    if (!context) throw new Error('No se encuentra el usuario autenticado');
    return { ...context };

}


export const AuthClientProvider = ({ children }) => {
    const [client, setCLient] = useState(null)
    const [isAuthenticatedClient, setIsAuthenticatedClient] = useState(false);
    const [registerErrors, setRegisterErrors] = useState([]);

    // const [departments, setDepartments] = useState([]);
    // const [municipalities, setMunicipalities] = useState([]);

    const [loading, setLoading] = useState(false);


    useEffect(() => {
        if (registerErrors.length > 0) {
            const timer = setTimeout(() => {
                setRegisterErrors([]);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [registerErrors]);

    const signUpClient = async (user) => {
        try {

            const res = await registerClientRequest(user);
            console.log(res);
            setCLient(res.data);
            setIsAuthenticatedClient(true);
            setRegisterErrors([]);
            return true;
            
        } catch (error) {
            setRegisterErrors(error.response.data);
        }
    }
    const signIn = async (user) => {
        try {
            const res = await loginClientRequest(user);
            setIsAuthenticatedClient(true);
            setCLient(res.data)
        } catch (error) {
            console.log(error);
            setRegisterErrors(error.response.data);
        }
    }
    const logout = () => {
        Cookies.remove("tokenClient");
        setCLient(null);
        setIsAuthenticatedClient(false);
    };
    const getServices = async (query) =>{
        try {
            const findServices = await getServicesLaudry(query);
            return findServices.data;
        } catch (error) {
            setRegisterErrors(error.response.data)
        }
    }
    const updateImgProfile = async(img) =>{
        try {
            
            const updateImg = await changuePhotoClient(img);
            return updateImg.data;
        } catch (error) {
            console.log(error);
            setRegisterErrors(error.response.data)
        }
    }
    const getAppointments = async (date,state) =>{
        try {
            const foundAppointments = await FindAppointments(date, state);
            return foundAppointments.data;
            
        } catch (error) {
            setRegisterErrors(error.response)
        }
    }
    const finalizedProcess = async (id)=>{
        try {
            const finalized = await sendFinalizedAppointment(id);
            return finalized.data
        } catch (error) {
            setRegisterErrors(error.response.data);
        }
    }
    const getProcessAppointment = async()=>{
        try {   
            const getToProcess = await getProcessAppointments();
            return getToProcess.data;
            
        } catch (error) {
            setRegisterErrors(error.response.data);
        }
    }
    const sendAbsence = async (id, state) =>{
        try {
            const absence = await sendToProcess(id, state);
            return absence.data;
        } catch (error) {
            setRegisterErrors(error.response.data);
        }
    }
    const sendProcess = async (id, state) =>{
        try {
            const responseProcess = await sendToProcess(id, state); 
            return responseProcess.data;
        } catch (error) {
            setRegisterErrors(error.response.data);
        }
    }
    const findAbsence = async (query)=>{
        try {
            const findAppointments = await FindAppointmentsAbsence(query);
            return findAppointments.data;
        } catch (error) {
            setRegisterErrors(error.response.data);
        }
    }
    const findAppointment= async (id)=>{
        try {
            const find = await findAppointmentForReschedule(id);
            return find.data;
        } catch (error) {
            setRegisterErrors(error.response.data);
        }
    }
    const updateAppointment = async (idAppointment,appointment)=>{
        try {
            const update = await updateAndReschedule(idAppointment,appointment);
            return update.data
        } catch (error) {
            setRegisterErrors(error.response.data)
        }
    }
    const deleteAppointment = async (idAppointment) =>{
        try {
            const wasDeleted = await appointmentDeleted(idAppointment);
            return wasDeleted.data;
        } catch (error) {
            setRegisterErrors(error.response.data);
        }
    }
    const getAvailability = async (idService, date)=>{
        try {
            const findAvailability = await availabilityFoundClient(idService, date);
            return findAvailability.data;
        } catch (error) {
            setRegisterErrors(error.response.data)
        }
    }
    const newService = async (service) =>{
        try {
            const created = await createService(service);
            return created.data.message;
        } catch (error) {
            setRegisterErrors(error.response.data);
        }
    }
    const updateServiceLaundry = async (id, serviceToUpdate) =>{
         try {
            const serviceUpdate = await updateService(id, serviceToUpdate)
            return serviceUpdate.data.message;
         } catch (error) {
            setRegisterErrors(error.response.data)
         }
    }
    const serviceDelete = async (id) =>{
        try {
            const deletService = await deleteService(id);
            return deletService.data.message;
        } catch (error) {
            setRegisterErrors(error.response.data)
        }
    }
    const updateProfileClient = async (dataClient) =>{
        try {
            const resp = await updateClient(dataClient);
            return resp.data.message;
        } catch (error) {
            setRegisterErrors(error.response.data);
        }
    }
    const getProfileClient = async () => {
        try {
            const resp = await getClientProfile();
            return resp.data;
        } catch (error) {
            setRegisterErrors(error.response.data);
            
        }
    }
    const resetEmail = async (email) => {
        try {
            const res = await resetPasswordClient(email);
            return res
        } catch (error) {
            console.log(error.response);
        }
    }
    useEffect(() => {


        const checkLogin = async () => {
            const cookies = Cookies.get();
            if (!cookies.tokenClient) {
                setIsAuthenticatedClient(false);
                setLoading(false);
                return;
            }
            try {
                const res = await clientVerifyTokenRequest(cookies.token);
                if (!res.data) return setIsAuthenticatedClient(false);
                setIsAuthenticatedClient(true);
                setCLient(res.data);
                setLoading(false);
            } catch (error) {
                setIsAuthenticatedClient(false);
                setLoading(false);
            }
            
        }; 
            checkLogin();

    }, []);
    return (
        <AuthClientContext.Provider value={{
            signUpClient,
            client,
            isAuthenticatedClient,
            registerErrors,
            getProfileClient,
            updateProfileClient,
            updateServiceLaundry,
            serviceDelete,
            getServices,
            newService,
            signIn,
            logout,
            loading,
            resetEmail,
            getAppointments,
            sendProcess,
            sendAbsence,
            findAbsence,
            findAppointment,
            updateAppointment,
            getAvailability,
            deleteAppointment,
            getProcessAppointment,
            finalizedProcess,
            updateImgProfile
            
        }}>
            {children}
        </AuthClientContext.Provider>
    )
}
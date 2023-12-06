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
    createService
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
            }, 5000);
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
    const getServices = async () =>{
        try {
            const findServices = await getServicesLaudry();
            return findServices.data;
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
            
            
        }}>
            {children}
        </AuthClientContext.Provider>
    )
}
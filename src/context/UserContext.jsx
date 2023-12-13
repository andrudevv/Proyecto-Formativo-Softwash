import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, 
    loginRequest, 
    resetPassword, 
    verifyTokenRequest,
    updateVehicleRequest,
    getVehiclesUser,
    createNewVehicle,
    updateUser,
    getUserProfile,
    getAppointments,
    FindLaundry,
    availabilityFound,
    registerAppointment,
    getProfileWithServices,
    deleteVehicleUser } from "../services/api/auth";
import Cookies from "js-cookie";
export const AuthUserContext = createContext()
export const useAuth = () => {
    const context = useContext(AuthUserContext);
    if (!context) throw new Error('No se encuentra el usuario autenticado');
    return { ...context };

}

export const AuthUserProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isAuthenticatedUser, setIsAuthenticatedUser] = useState(false);
    const [registerErrors, setRegisterErrors] = useState([]);

    const [loading, setLoading] = useState(false);


    useEffect(() => {
        if (registerErrors.length > 0) {
            const timer = setTimeout(() => {
                setRegisterErrors([]);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [registerErrors]);


    const signup = async (user) => {
        try {
            const res = await registerRequest(user);
            setUser(res.data);
            setIsAuthenticatedUser(true);
            setRegisterErrors([]);
            return true;
        } catch (error) {
            setRegisterErrors(error.response.data);
        }


    }



    const signin = async (user) => {
        try {
            const res = await loginRequest(user);
            setIsAuthenticatedUser(true);
            setUser(res.data)
        } catch (error) {
            setRegisterErrors(error.response.data)

        }
    }
    const createAppointment = async (data) =>{
        try {
            await registerAppointment(data);
            return true;
        } catch (error) {
            setRegisterErrors(error.response.data)
        }
    }
    const getAvailability = async (idService, date) =>{
        try {
            const findAvailability = await availabilityFound(idService, date);
            return findAvailability.data;
        } catch (error) {
            setRegisterErrors(error.response.data)
        }
    }
    const getAppointmentsUser = async () => {
        try {
            const resp = await getAppointments();
            return  resp.data
        } catch (error) {
            setRegisterErrors(error.response.data)
        }
    }
    const searchLaundry = async (filteredQuery) =>{
        try {
            const filter = await FindLaundry(filteredQuery);
            return filter.data;
        } catch (error) {
            setRegisterErrors(error.response.data)
        }
    }
    const getVehiclesAppointment = async () =>{
        try {
            const getVehicles = await getVehiclesUser();
            return getVehicles.data;
        } catch (error) {
            setRegisterErrors(error.response.data);
        }
    }
    const getProfile = async () =>{
        try {
            const objUser  = await getUserProfile();
            return objUser.data;
        } catch (error) {
            setRegisterErrors(error.response.data);
        }
    }
    const updateUserProfile = async (upUser) =>{
        try {
            const response = await updateUser(upUser);
            return response.data.message;
        } catch (error) {
            setRegisterErrors(error.response.data)
        }
    }
    const ViewProfileLaundryId  = async (id, query) =>{
        try {
            const responseData = await getProfileWithServices(id, query);
            return responseData.data;
        } catch (error) {
            setRegisterErrors(error.response.data);
        }
    }
    const createVehicle = async (newVehicle) => {
        try {
            const response = await createNewVehicle(newVehicle);
            return response.data.message;
        } catch (error) {
            setRegisterErrors(error.response.data)
        }
    }
    const getVehicles = async () =>{
        try {
            const rt = await getVehiclesUser();
            return rt.data
        } catch (error) {
            setRegisterErrors(error.response.data)
        }
    }
    const deleteVehicle = async (id) =>{
        try {
             const response = await deleteVehicleUser(id);
             return response.data.message;
            //  setSuccessMessage(response.data.message)

        } catch (error) {
            setRegisterErrors(error.response.data)
        }
    }
    const updateVehicle = async (id,vehicle) =>{
        try {
            await updateVehicleRequest(id,vehicle);
        } catch (error) {
            setRegisterErrors(error.response.data)
            
        }
    }
    const logout = () => {
        Cookies.remove("tokenUser");
        setUser(null);
        setIsAuthenticatedUser(false);
    };
    const resetEmail = async (email) => {
        try {
            const res = await resetPassword(email);
            return res
        } catch (error) {
            console.log(error.response);
        }
    }
    useEffect(() => {
       
        const checkLogin = async () => {
            const cookies = Cookies.get();
            if (!cookies.tokenUser) {
                setIsAuthenticatedUser(false);
                setLoading(false);
                return;
            }

            
            try {
                const res = await verifyTokenRequest(cookies.token);
                if (!res.data) return setIsAuthenticatedUser(false);
                setIsAuthenticatedUser(true);
                setUser(res.data);
                setLoading(false);
            } catch (error) {
                setIsAuthenticatedUser(false);
                setLoading(false);
            }
            
        };
            checkLogin();
            

    }, []);
    return (
        <AuthUserContext.Provider value={{
            signup,
            user,
            isAuthenticatedUser,
            registerErrors,
            updateVehicle,
            signin,
            logout,
            loading,
            updateUserProfile,
            createVehicle,
            deleteVehicle,
            getVehicles,
            createAppointment,
            getVehiclesAppointment,
            searchLaundry,
            ViewProfileLaundryId,
            getAvailability,
            getAppointmentsUser,
            getProfile,
            resetEmail,
           
        }}>
            {children}
        </AuthUserContext.Provider>
    )
}
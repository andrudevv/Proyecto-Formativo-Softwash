import { createContext, useState, useContext,useEffect } from "react";
import { registerClientRequest, loginClientRequest, resetPasswordClient,clientVerifyTokenRequest } from "../services/api/auth";
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
    const [successMessage, setSuccessMessage] = useState("");

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
            setSuccessMessage(res.data.name);
    
            
        } catch (error) {
            setRegisterErrors(error.response.data);
        }
    }



    const signIn = async (user) => {


        try {
            const res = await loginClientRequest(user);
            console.log(res);
            setIsAuthenticatedClient(true);
            setCLient(res.data)

            // console.log(Response.data);
            // setIsAuthenticated(true);
        } catch (error) {
            console.log(error);
            setRegisterErrors(error.response.data);

        }
    }
    const logout = () => {
        Cookies.remove("token");
        setCLient(null);
        setIsAuthenticatedClient(false);
    };
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
            signIn,
            logout,
            loading,
            resetEmail,
            successMessage,
            
        }}>
            {children}
        </AuthClientContext.Provider>
    )
}
import { createContext, useState, useContext, useEffect } from "react";
import { registerClientRequest, loginClientRequest, resetPasswordClient } from "../services/api/auth";
import Cookies from "js-cookie";
import { clientVerifyTokenRequest } from "../services/api/auth";
export const AuthClientContext = createContext()
export const clientAuth = () => {
    const context = useContext(AuthClientContext);
    if (!context) throw new Error('No se encuentra el usuario autenticado');
    return { ...context };

}

export const AuthClientProvider = ({ children }) => {

    const [client, setCLient] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [registerErrors, setRegisterErrors] = useState([]);
    const [successMessage, setSuccessMessage] = useState("");

    // const [departments, setDepartments] = useState([]);
    // const [municipalities, setMunicipalities] = useState([]);

    const [loading, setLoading] = useState(true);


    useEffect(() => {
        if (registerErrors.length > 0) {
            const timer = setTimeout(() => {
                setRegisterErrors([]);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [registerErrors]);

    const signupClient = async (user) => {
        try {

            const res = await registerClientRequest(user);
            console.log(res);
            setCLient(res.data);
            setIsAuthenticated(true);
            setRegisterErrors([]);
            setSuccessMessage(res.data.name);
    
            
        } catch (error) {
            setRegisterErrors(error.response.data);
        }
    }



    const signin = async (user) => {


        try {
            const res = await loginClientRequest(user);
            console.log(res);
            setIsAuthenticated(true);
            setCLient(res.data)

            // console.log(Response.data);
            // setIsAuthenticated(true);
        } catch (error) {
            setRegisterErrors(error.response.data);

        }
    }
    const logout = () => {
        Cookies.remove("token");
        setCLient(null);
        setIsAuthenticated(false);
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
            if (!cookies.token) {
                setIsAuthenticated(false);
                setLoading(false);
                return;
            }
            try {
                const res = await clientVerifyTokenRequest(cookies.token);
                if (!res.data) return setIsAuthenticated(false);
                setIsAuthenticated(true);
                setCLient(res.data);
                setLoading(false);
            } catch (error) {
                setIsAuthenticated(false);
                setLoading(false);
            }
        };
        checkLogin();
    }, []);
    return (
        <AuthClientContext.Provider value={{
            signupClient,
            client,
            isAuthenticated,
            registerErrors,
            signin,
            logout,
            loading,
            resetEmail,
            successMessage,
            
        }}>
            {children}
        </AuthClientContext.Provider>
    )
}
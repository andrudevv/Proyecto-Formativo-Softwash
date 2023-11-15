import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, resetPassword } from "../services/api/auth";
import Cookies from "js-cookie";
import { verifyTokenRequest } from "../services/api/auth";
export const AuthUserContext = createContext()
export const useAuth = () => {

    const context = useContext(AuthUserContext)
    if (!context) throw new Error('No se encuentra el usuario autenticado');
    return { ...context };

}

export const AuthUserProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [registerErrors, setRegisterErrors] = useState([]);
    const [successMessage, setSuccessMessage] = useState("");
    const [registrationSuccess, setRegistrationSuccess] = useState(false);

    const [loading, setLoading] = useState(true);


    useEffect(() => {
        if (registerErrors.length > 0) {
            const timer = setTimeout(() => {
                setRegisterErrors([]);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [registerErrors]);


    const signup = async (user) => {
        try {
            const res = await registerRequest(user);
            console.log(res);
            setUser(res.data);
            // setIsAuthenticated(true);
            setRegisterErrors([]);
            setSuccessMessage(`Registro exitoso ${res.data.name}`);
            setRegistrationSuccess(true);
        } catch (error) {
            console.log(error);
            setRegisterErrors(error.response.data);
        }


    }



    const signin = async (user) => {
        try {
            const res = await loginRequest(user);
            console.log(res);
            setIsAuthenticated(true);
            setUser(res.data)


            // console.log(Response.data);
            // setIsAuthenticated(true);
        } catch (error) {
            setRegisterErrors(error.response.data)

        }
    }
    const logout = () => {
        Cookies.remove("token");
        setUser(null);
        setIsAuthenticated(false);
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
            if (!cookies.token) {
                setIsAuthenticated(false);
                setLoading(false);
                return;
            }
            try {
                const res = await verifyTokenRequest(cookies.token);
                if (!res.data) return setIsAuthenticated(false);
                setIsAuthenticated(true);
                setUser(res.data);
                setLoading(false);
            } catch (error) {
                setIsAuthenticated(false);
                setLoading(false);
            }
        };
        checkLogin();
    }, []);
    return (
        <AuthUserContext.Provider value={{
            signup,
            user,
            isAuthenticated,
            registerErrors,
            signin,
            logout,
            loading,
            resetEmail,
            successMessage,
            registrationSuccess
        }}>
            {children}
        </AuthUserContext.Provider>
    )
}
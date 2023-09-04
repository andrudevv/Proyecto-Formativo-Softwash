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
    const [errors, setErrors] = useState([])
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([]);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [errors]);

    const signup = async (user) => {
        const res = await registerRequest(user);
        console.log(res.data);
        setUser(res.data);
        setErrors(errors);
        setIsAuthenticated(true);
    }



    const signin = async (user) => {

        setErrors(errors)
        try {
            const res = await loginRequest(user);
            console.log(res);
            setIsAuthenticated(true);


            // console.log(Response.data);
            // setIsAuthenticated(true);
        } catch (error) {
            setUser(error.response.data.msg);

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
            console.log(res.data);
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
            errors,
            signin,
            logout,
            loading,
            resetEmail
        }}>
            {children}
        </AuthUserContext.Provider>
    )
}
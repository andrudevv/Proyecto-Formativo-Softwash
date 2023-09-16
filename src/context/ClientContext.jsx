import { createContext, useState, useContext, useEffect } from "react";
import { registerClientRequest, loginClientRequest, resetPasswordClient } from "../services/api/auth";
import Cookies from "js-cookie";
import { clientVerifyTokenRequest } from "../services/api/auth";
export const AuthClientContext = createContext()
export const clientAuth = () => {
    const context = useContext(AuthClientContext);
    if (!context) {
        // Puedes devolver un valor por defecto o manejarlo de otra manera
        return { isAuthenticated: false, user: null };
    }
    return { ...context };

}

export const AuthUserProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [registerErrors, setRegisterErrors] = useState([]);
    const [successMessage, setSuccessMessage] = useState("");
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
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

    // const getDeps = async()=>{
    //     try {
    //     const resGetDep = await getDepartment()
    //     setDepartments(resGetDep);
    //     setRegisterErrors([]);

    //     } catch (error) {
    //         setRegisterErrors([error])
            
    //     }
    //     }

    const signupClient = async (user) => {
        try {
            const res = await registerClientRequest(user);
            console.log(res);
            setUser(res.data);
            // setIsAuthenticated(true);
            setRegisterErrors([]);
            setSuccessMessage(res.data.message);
      setRegistrationSuccess(true);
        } catch (error) {
            setRegisterErrors([error])

        }


    }



    const signin = async (user) => {

        
        try {
            const res = await loginClientRequest(user);
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
        <AuthClientContext.Provider value={{
            signupClient,
            user,
            isAuthenticated,
            registerErrors,
            signin,
            logout,
            loading,
            resetEmail,
            successMessage,
            registrationSuccess,
        }}>
            {children}
        </AuthClientContext.Provider>
    )
}
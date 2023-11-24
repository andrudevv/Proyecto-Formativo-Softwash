import {useAuth } from "../context/UserContext";
import { Navigate, Outlet } from "react-router-dom";
import Spinner from "../components/SpinnerLoading";

function ProtectedRoutesUser() {
    const {loading , isAuthenticatedUser} = useAuth();
    if(loading) return <Spinner/>;
    if(!isAuthenticatedUser && !loading ) return <Navigate to='/' replace />
    return <Outlet/>
        
}

export default ProtectedRoutesUser


// vamos a hacer una funcion que tome 2 parametros para sumarlos y el resultado se retornar dividido entre 2
// function sumar(a,b){
    //     let result=a+b;
    //     return result/2;
    // }


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
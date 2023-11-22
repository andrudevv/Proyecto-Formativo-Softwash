import {  clientAuth } from "../context/ClientContext";
import { Navigate, Outlet } from "react-router-dom";
import Spinner from "../components/SpinnerLoading";

function ProtectedRoutesClient() {
    const {loading , isAuthenticatedClient} = clientAuth();
    if(loading) return <Spinner/>;
    if(!isAuthenticatedClient && !loading ) return <Navigate to='/' replace />
 return <Outlet/>
   
}

export default ProtectedRoutesClient
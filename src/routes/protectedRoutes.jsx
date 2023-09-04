import { useAuth } from "../context/UserContext";
import { Navigate, Outlet } from "react-router-dom";
function protectedRoutes() {

    const {loading , isAuthenticated} = useAuth();

    if(loading) return <h1>Loading...</h1>;
    if(!isAuthenticated && !loading ) return <Navigate to='/iniciarsesion' replace />
 return <Outlet/>
}

export default protectedRoutes
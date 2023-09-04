import { useAuth } from "./context/UserContext";
import { Navigate, Outlet } from "react-router-dom";



function RoutersUser() {
    const {user, isAuthenticated} = useAuth()
    if(!isAuthenticated) return <Navigate to='/iniciarsesion' replace/>
  return <Outlet/>;
}

export default RoutersUser
import { useAuth } from "../context/UserContext";
import { Navigate, Outlet } from "react-router-dom";
import Spinner from "../components/SpinnerLoading";
function protectedRoutes() {

    const {loading , isAuthenticated} = useAuth();

    if(loading) return <Spinner/>;
    if(!isAuthenticated && !loading ) return <Navigate to='/sign-in-user' replace />
 return <Outlet/>
}

export default protectedRoutes
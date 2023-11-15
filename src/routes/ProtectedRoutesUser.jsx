import { useAuth } from "../context/UserContext";
import { Navigate, Outlet } from "react-router-dom";
import Spinner from "../components/SpinnerLoading";
function ProtectedRoutesUser() {

    const {loading , isAuthenticated} = useAuth();

    if(loading) return <Spinner/>;
    if(!isAuthenticated && !loading ) return <Navigate to='/*not-found-404' replace />
 return <Outlet/>
}

export default ProtectedRoutesUser
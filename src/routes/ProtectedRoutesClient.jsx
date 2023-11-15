import { clientAuth } from "../context/ClientContext";
import { Navigate, Outlet } from "react-router-dom";
import Spinner from "../components/SpinnerLoading";
function ProtectedRoutesClient() {

    const {loading , isAuthenticated} = clientAuth();

    if(loading) return <Spinner/>;
    if(!isAuthenticated && !loading ) return <Navigate to='/*not-found-404' replace />
 return <Outlet/>
}

export default ProtectedRoutesClient
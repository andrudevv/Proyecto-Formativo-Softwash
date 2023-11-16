
import { useAuth } from '../context/UserContext';
import { clientAuth } from '../context/ClientContext';
import NavbarClient from '../pages/Client/NavbarClient';
import NavbarUser from '../pages/User/NavbarUser';
import GenericNavbar from '../pages/GenericNavbar';
const Navbar = () => {
  const { isAuthenticated: isUserAuthenticated, logout: logoutUser } = useAuth();
  const { isAuthenticated: isClientAuthenticated, logout: logoutClient } = clientAuth();



  return (
    <>
        {isUserAuthenticated &&  <NavbarUser  logoutUser={logoutUser}/>}
        {isClientAuthenticated && <NavbarClient  logoutClient={logoutClient}/>}
        {!isUserAuthenticated && !isClientAuthenticated && <GenericNavbar/>}
    </>
  );
};

export default Navbar;



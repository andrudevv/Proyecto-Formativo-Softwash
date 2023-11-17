
import { useAuth } from '../context/UserContext';
import { clientAuth } from '../context/ClientContext';
import NavbarClient from '../pages/Client/NavbarClient';
import NavbarUser from '../pages/User/NavbarUser';
import GenericNavbar from '../pages/GenericNavbar';
const Navbar = () => {
  const { isAuthenticated: isUserAuthenticated } = useAuth();
  const { isAuthenticated: isClientAuthenticated } = clientAuth();



  return (
    <>
        {isUserAuthenticated &&  <NavbarUser  />}
        {isClientAuthenticated && <NavbarClient />}
        {!isUserAuthenticated && !isClientAuthenticated && <GenericNavbar/>}
    </>
  );
};

export default Navbar;



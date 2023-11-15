
import { useAuth } from '../context/UserContext';
import { clientAuth } from '../context/ClientContext';
import NavbarClient from '../pages/Client/NavbarClient';
import NavbarUser from '../pages/User/NavbarUser';
import GenericNavbar from '../pages/GenericNavbar';
const Navbar = () => {
  const { isAuthenticated: isUserAuthenticated, user, logout: logoutUser } = useAuth();
  const { isAuthenticated: isClientAuthenticated, client, logout: logoutClient } = clientAuth();
  console.log(user);
  console.log(client);


  return (
    <>
        {isUserAuthenticated &&  <NavbarUser nameUser={user.name} logoutUser={logoutUser}/>}
        {isClientAuthenticated && <NavbarClient nameClient={client.name} logoutClient={logoutClient}/>}
        {!isUserAuthenticated && !isClientAuthenticated && <GenericNavbar/>}
    </>
  );
};

export default Navbar;



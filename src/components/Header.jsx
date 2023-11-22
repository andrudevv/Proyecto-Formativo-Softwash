
import {useAuth } from '../context/UserContext';
import {clientAuth } from '../context/ClientContext';
import NavbarClient from '../pages/Client/NavbarClient';
import NavbarUser from '../pages/User/NavbarUser';
import GenericNavbar from '../pages/GenericNavbar';
const Navbar = () => {
 const {isAuthenticatedUser} = useAuth();
 const {isAuthenticatedClient } = clientAuth();



  return (
    <>
        {isAuthenticatedUser &&  <NavbarUser  />}
        {isAuthenticatedClient && <NavbarClient />} 
        {!isAuthenticatedUser && !isAuthenticatedClient && <GenericNavbar/>}
    </>
  );
};

export default Navbar;




import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthUserProvider } from "./context/UserContext";
import LoginUser from "./pages/User/LoginUser";
import LoginClient from "./pages/Client/LoginClient";
import RegisterUser from "./pages/User/RegisterUser";
import RegisterClient from "./pages/Client/RegisterClient";
import ProtectedRoutesUser from "./routes/ProtectedRoutesUser";
import Navbar from "./components/Header"
import UserEmailReset from "./utils/UserEmailReset";
import ClientEmailReset from "./utils/ClientEmailReset";
import { AuthClientProvider } from "./context/ClientContext";
import ViewProfile from "./pages/User/ViewProfileUser";
import ProtectedRoutesClient from "./routes/ProtectedRoutesClient";
import HomeUsers from "./pages/HomeUsers";
import NotFound404 from "./pages/NotFound404";
import Footer from "./components/Footer";

import MyAppointmentUser from "./pages/User/MyAppointmentUser";
import ModalRegisterVehicle from "./components/ModalRegisterVehicle";
import ViewProfileClient from "./pages/Client/ViewProfileClient";

function App() {
  return (


    <AuthUserProvider>
      <AuthClientProvider>
        <BrowserRouter>
          <Navbar />
          <main className=" pt-20 container mx-auto min-h-screen">
            <Routes>
              <Route path="/" element={<HomeUsers />} />
              <Route path="/sign-in-user" element={<LoginUser />} />
              <Route path="/register-user" element={<RegisterUser />} />
              <Route path="/ensayo" element={<ModalRegisterVehicle />} />
              <Route path="/*" element={<NotFound404 />} />
              <Route path="/reset-password-user" element={<UserEmailReset />} />

              {/* <Route path="/my-vehicles" element={<MyVehicles/>} /> */}
              // rutas protegidas usuario
              <Route element={<ProtectedRoutesUser />}>
                <Route path="view-profile-user" element={<ViewProfile />} />
                <Route path="home-user" element={<HomeUsers />} />
                <Route path="logout" element={<h1>hasta pronto </h1>} />
                <Route path="find-laundry" element={<h1>buscar labaderos con el filtro</h1>} />
                <Route path="my-appointments" element={<MyAppointmentUser />} />
                <Route path="view-profile-laundry" element={<h1>perfil del lavadero</h1>} />
              </Route>


              <Route path="/register-client" element={<RegisterClient />} />
              <Route path="/sign-in-client" element={<LoginClient />} />
              <Route path="/reset-password-client" element={<ClientEmailReset />} />

              // rutas protegidas cliente
              <Route element={<ProtectedRoutesClient />}>
                <Route path="/home-client" element={<h1>iniciado correctamente cliente</h1>} />
                <Route path="/my-services" element={<h1>servicios</h1>} />
                <Route path="/view-profile-client" element={<ViewProfileClient />} />
                <Route path="/view-appoinments" element={<h1>ver citas por filtro de fecha</h1>} />
                <Route path="/view-appoinments-today" element={<h1>ver citas para hoy , para tomar asistencia y pasar a proceso</h1>} />
                <Route path="/view-appoinments-process" element={<h1>ver las citas que estan siendo atendidas</h1>} />
                <Route path="/logout" element={<h1>hasta pronto </h1>} />
              </Route>
            </Routes>
          </main>
          <Footer />
        </BrowserRouter>
      </AuthClientProvider>
    </AuthUserProvider>


  )
}

export default App

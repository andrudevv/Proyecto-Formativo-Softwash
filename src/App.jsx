
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthUserProvider } from "./context/UserContext";

import LoginUser from "./pages/User/LoginUser";
import LoginClient from "./pages/Client/LoginClient";
import RegisterUser from "./pages/User/RegisterUser";
import RegisterClient from "./pages/Client/RegisterClient";
import ProtectedRoutesUser from "./routes/ProtectedRoutesUser";
import Navbar from "./components/Header"
import UserEmailReset from "./utils/UserEmailReset";
import ClientEmailReset from "./utils/ClientEmailReset";
import { AuthClientProvider} from "./context/ClientContext";
import ViewProfile from "./pages/User/ViewProfileUser";
import ProtectedRoutesClient from "./routes/ProtectedRoutesClient";
import HomeUser from "./pages/User/HomeUser";
import HomeUsers from "./pages/HomeUsers";
import NotFound404 from "./pages/NotFound404";
import Footer from "./components/Footer";
import HomeServicesClient from "./pages/Client/HomeServicesClient";

import MyAppointmentUser from "./pages/User/MyAppointmentUser";
import ModalRegisterVehicle from "./components/User/ModalRegisterVehicle";
import ViewProfileClient from "./pages/Client/ViewProfileClient";
import FindLaundry from "./pages/User/FindLaundry";
import ViewProfileLaundry from "./pages/User/ViewProfileLaundry";
import CreateAppointment from "./pages/User/CreateAppointment";
import RescheduleAppointmens from "./pages/Client/RescheduleAppointmens";
import AppointmentsClient from "./pages/Client/AppointmentsClient";
import UpdateAppointment from "./pages/Client/UpdateAppointment";

function App() {
  return (

    <AuthUserProvider>
      <AuthClientProvider>
        <BrowserRouter>
          <Navbar />
          <main className=" pt-20  mx-auto min-h-screen">
            <Routes>
              <Route path="/" element={<HomeUsers />} />
              <Route path="/sign-in-user"  element={ <LoginUser />} />
              <Route path="/register-user" element={ <RegisterUser />} />
              <Route path="/ensayo" element={<ModalRegisterVehicle />} />
              <Route path="/*" element={<NotFound404 />} />
              <Route path="/reset-password-user" element={ <UserEmailReset />} />

              {/* <Route path="/my-vehicles" element={<MyVehicles/>} /> */}
              // rutas protegidas usuario
              <Route element={<ProtectedRoutesUser />}>
                <Route path="view-profile-user" element={<ViewProfile />} />
                <Route path="home-user" element={<HomeUser />} />
                <Route path="logout" element={<h1>hasta pronto </h1>} />
                <Route path="search" element={<FindLaundry/>} />
                <Route path="my-appointments" element={<MyAppointmentUser />} />
              <Route path="profile-laundry/:id" element={<ViewProfileLaundry/>} />
              <Route path="appointment/create-appointment/:id/:name/:price" element={<CreateAppointment/>} />
              </Route>


              <Route path="/register-client" element={ <RegisterClient />}  />
              <Route path="/sign-in-client" element={<LoginClient />} />
              <Route path="/reset-password-client" element={ <ClientEmailReset />}/>

              // rutas protegidas cliente
              <Route element={<ProtectedRoutesClient />}>
                <Route path="/home-client" element={<HomeServicesClient/>} />
                <Route path="/view-profile-client" element={<ViewProfileClient />} />
                <Route path="/view-appointments" element={<AppointmentsClient/>} />
                <Route path="/missed-appointments" element={<RescheduleAppointmens/>} />
                <Route path="/reschedule-appointment/:id" element={<UpdateAppointment/>}  />
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

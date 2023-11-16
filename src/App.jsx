
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthUserProvider } from "./context/UserContext";
import LoginUser from "./pages/User/LoginUser";
import LoginClient from "./pages/Client/LoginClient";
import RegisterUser from "./pages/User/RegisterUser";
import RegisterClient from "./pages/Client/RegisterClient";
import ProtectedRoutesUser from "./routes/ProtectedRoutesUser";
import Navbar from "./components/Header"
import UserEmailReset from "./utils/userEmailReset";
import { AuthClientProvider } from "./context/ClientContext";
import MyVehicles from "./pages/User/ViewVehicles";
import ProtectedRoutesClient from "./routes/ProtectedRoutesClient";
import HomeUsers from "./pages/HomeUsers";
import NotFound404 from "./pages/NotFound404";
import Footer from "./components/Footer";
function App() {

  return (
    <AuthUserProvider>
      <AuthClientProvider>
<BrowserRouter>
<Navbar/>
<main className=" pt-20
 container mx-auto min-h-screen">
    <Routes>
      <Route path="/" element={<HomeUsers/>} />
      
      <Route path="/sign-in-user" element={<LoginUser/>} />
      <Route path="/sign-in-client" element={<LoginClient/>} />
      <Route path="/register-user" element={<RegisterUser/>} />
      <Route path="/register-client" element={<RegisterClient/>} />
      <Route path="/*" element={<NotFound404/>} />
      
      
      <Route path="/reset-password" element={<UserEmailReset/>} />

//  Rutas para el usuario protegidas 
      <Route element={<ProtectedRoutesUser/>}>
        <Route path="/home-user" element={<HomeUsers/>} />
        <Route path="/logout" element={<h1>hasta pronto </h1>} />
        <Route path="/my-vehicles" element={<MyVehicles/>} />
        <Route path="/my-appointments" element={<h1>citas</h1>} />

      </Route>
// finaliza rutas protegidas

        



// Rutas protegidas para el cliente
      <Route element={<ProtectedRoutesClient/>}>
      <Route path="/home-client" element={<h1>iniciado correctamente cliente</h1>} />
      <Route path="/my-services" element={<h1>servicios</h1>} />

      <Route path="/logout" element={<h1>hasta pronto </h1>} />

      </Route>
// Finaliza rutas protegidas del cliente


      {/* <Route path="/iniciarsessionAdministrador" element={<LoginClient/>} /> */}
      {/* <Route path="/registrarlavadero" element={<RegisterLaundry/>} /> */}
      <Route path="/registrarse" element={<h1>homepage</h1>} />
    </Routes>
    </main>
    <Footer />
    </BrowserRouter>
    </AuthClientProvider>
    </AuthUserProvider>
  )
}

export default App

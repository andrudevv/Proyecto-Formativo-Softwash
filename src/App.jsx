
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthUserProvider } from "./context/UserContext";
// import LoginUsuario from "./Infrastructure/components/User/LoginUsuario";
import LoginUser from "./components/User/LoginUser";
import RegisterUsuario from "./components/User/RegisterUsuario";
import LoginAdmin from "./components/Client/LoginAdmin";
import RegisterLaundry from "./components/Admin/RegisterLaundry";
import ProtectedRoute from "./routes/protectedRoutes";
import Navbar from "./components/Header"
import UserEmailReset from "./pages/userEmailReset";
function App() {

  return (
    <AuthUserProvider>
<BrowserRouter>
<Navbar/>
<main className=" pt-20
 container mx-auto">
    <Routes>
      <Route path="/" element={<h1>homepage</h1>} />
      <Route path="/homeUser" element={<h1>iniciado correctamente</h1>} />
      <Route path="/iniciarsesion" element={<LoginUser/>} />
      <Route path="/registrousuario" element={<RegisterUsuario/>} />
      
      <Route path="/reset-password" element={<UserEmailReset/>} />

      <Route element={<ProtectedRoute/>}>
      <Route path="/task" element={<h1>task hechas</h1>} />
      </Route>




      <Route path="/iniciarsessionAdministrador" element={<LoginAdmin/>} />
      <Route path="/registrarlavadero" element={<RegisterLaundry/>} />
      <Route path="/registrarse" element={<h1>homepage</h1>} />
    </Routes>
    </main>
    </BrowserRouter>
    </AuthUserProvider>
  )
}

export default App

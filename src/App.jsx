
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginUsuario from "./Infrastructure/components/User/LoginUsuario";
import LoginAdmin from "./Infrastructure/components/Admin/LoginAdmin";
import RegisterLaundry from "./Infrastructure/components/SuperAdmin/RegisterLaundry";
import Navbar from "./Infrastructure/components/Header"
function App() {

  return (
<BrowserRouter>
<Navbar/>
<main className=" pt-20
 container mx-auto">
    <Routes>
      <Route path="/" element={<h1>homepage</h1>} />
      <Route path="/iniciarsession" element={<LoginUsuario/>} />
      <Route path="/iniciarsessionAdministrador" element={<LoginAdmin/>} />
      <Route path="/registrarlavadero" element={<RegisterLaundry/>} />
      <Route path="/registrarse" element={<h1>homepage</h1>} />
    </Routes>
    </main>
    </BrowserRouter>
  )
}

export default App

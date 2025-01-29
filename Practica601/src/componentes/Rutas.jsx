import { Routes, Route } from 'react-router-dom';
import Inicio from './paginas/Inicio.jsx';
import Login from './paginas/Login.jsx';
import Error from './paginas/Error.jsx';
import RestablecerPassword from './sesion/RestablecerPassword.jsx';
import CrearCuenta from './sesion/CrearCuenta.jsx';
import CambiarPassword from './sesion/CambiarPassword.jsx';

const Rutas = () => {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/login" element={<Login />} />
      <Route path="/crear-cuenta" element={<CrearCuenta />} />
      <Route path="/restablecer-password" element={<RestablecerPassword />} />
      <Route path="/cambiar-password" element={<CambiarPassword />}/>
      <Route path="*" element={<Error />} />
    </Routes>
  );
};

export default Rutas;
import CrearCuenta from "../sesion/CrearCuenta.jsx";
import IniciarSesion from "../sesion/IniciarSesion.jsx";
import { Link } from "react-router-dom";
import "../../css/login.css";

const Login = () => {
  return (
    <div className="contenedor-login">
      <IniciarSesion />
      <div className="contenedor-enlaces-sesion">
        <Link className="iniciar-btn" to="/restablecer-password">Restablecer contraseña</Link>
        <Link className="iniciar-btn" to="/crear-cuenta">Crear Cuenta</Link>
      </div>
    </div>
  );
};

export default Login;
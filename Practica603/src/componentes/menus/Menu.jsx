import { useContext } from "react";
import {Link} from "react-router-dom";
import { sesionContexto } from "../contextos/ProveedorSesion.jsx";
import CerrarSesion from "../sesion/CerrarSesion.jsx";
import "../../css/menu.css";

const Menu = () => {
  const { sesionIniciada } = useContext(sesionContexto);

  return (
    <>
        <nav className="nav">
            <Link className="menu-link" to="/">Inicio</Link>
            <Link className="menu-link" to="/productos">Productos</Link>
            {sesionIniciada && <Link className="menu-link" to="/listas">Listas</Link>}
            { /*Si la sesión no está iniciada, se muestra el enlace de Login 
            y si está iniciada, se muestra el botón de cerrar sesión.*/}
            { sesionIniciada ? <CerrarSesion />
            : <Link className="menu-link" to="/login">Login</Link> }
        </nav>
    </>
  )
};

export default Menu;
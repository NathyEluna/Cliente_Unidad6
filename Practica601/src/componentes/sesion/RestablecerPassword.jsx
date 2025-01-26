import { useContext } from "react";
import { sesionContexto } from "../contextos/ProveedorSesion.jsx";
import Errores from "../Errores.jsx";

const RestablecerPassword = () => {
    const { restablecerPassword, actualizarDatos, errorUsuario } = useContext(sesionContexto);
    
  return (
    <div className="contenedor-login">
      <div className="contenedor-sesion">
        <h2>Restablecer contraseña</h2>
        <label htmlFor="email">Correo electrónico:</label>
        <input type="email" name="email" id="email-3" placeholder="name@correo.com" onChange={(e) => actualizarDatos(e)}/>
        
        <button className="crear-btn" onClick={restablecerPassword}>Restablecer contraseña</button>
        {errorUsuario && <Errores>{errorUsuario}</Errores>}
      </div>
    </div>
  );
};

export default RestablecerPassword;
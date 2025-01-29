import { useContext } from 'react';
import { sesionContexto } from '../contextos/ProveedorSesion.jsx';
import Errores from '../Errores.jsx';
import "../../css/login.css";

const CambiarPassword = () => {
    const { actualizarDatos, cambiarPassword, errorUsuario } = useContext(sesionContexto);
  return (
    <div className='contenedor-login'>
        <div className='contenedor-sesion'>
            <h2>Cambiar Contraseña</h2>

            <label htmlFor="new-pass">Contraseña nueva:</label>
            <input type="password" name="password" id="new-pass" placeholder="********" onChange={(e) => actualizarDatos(e)}/>
        
            <button className="crear-btn" onClick={cambiarPassword}>Cambiar contraseña</button>
            {errorUsuario && <Errores>{errorUsuario}</Errores>}
        </div>
    </div>
  );
};

export default CambiarPassword;
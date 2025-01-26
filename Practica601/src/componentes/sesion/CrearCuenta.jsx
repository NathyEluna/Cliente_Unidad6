import { useContext } from 'react';
import { sesionContexto } from '../contextos/ProveedorSesion.jsx';
import Errores from '../Errores.jsx';

const CrearCuenta = () => {
    const { actualizarDatos, crearUsuario, errorUsuario } = useContext(sesionContexto);
    return (
    <div className="contenedor-login">
      <div className="contenedor-sesion">
        <h2>Crear Cuenta</h2>
        <label htmlFor="email">Correo Electrónico:</label>
        <input type="email" name="email" id="email-2" placeholder="Correo Electrónico" onChange={(e) => actualizarDatos(e)} />
        
        <label htmlFor="password">Contraseña:</label>
        <input type="password" name="password" id="pass-2" placeholder="Contraseña" onChange={(e) => actualizarDatos(e)} />

        <button className="crear-btn" onClick={crearUsuario}>Crear Cuenta</button>
        {errorUsuario && <Errores>{errorUsuario}</Errores>}
      </div>
    </div>
  );
};

export default CrearCuenta;
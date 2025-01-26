import { useContext } from 'react';
import { sesionContexto } from '../contextos/ProveedorSesion.jsx';
import { Link } from 'react-router-dom';
import Errores from '../Errores.jsx';

const IniciarSesion = () => {
    const { actualizarDatos, iniciarSesionPassword, errorUsuario } = useContext(sesionContexto);
  
    return (
    <div className="contenedor-sesion">
      <h1>Iniciar Sesión</h1>
      <label htmlFor="email">Correo Electrónico:</label>
      <input type="email" name="email" id="email-1" placeholder="name@correo.com" onChange={(e) => actualizarDatos(e)} />
      
      <label htmlFor="password">Contraseña:</label>
      <input type="password" name="password" id="pass-1" placeholder="******" onChange={(e) => actualizarDatos(e)} />
      
      <button className="iniciar-btn btn-1" onClick={iniciarSesionPassword}>Iniciar Sesión</button>
      {/*Tuve que utilizar la comprobación para mostrar el error por su estilo,
         que por tener un borde y un padding, aparecían siempre.*/}
      {errorUsuario && <Errores>{errorUsuario}</Errores>}
    </div>
  );
};

export default IniciarSesion;
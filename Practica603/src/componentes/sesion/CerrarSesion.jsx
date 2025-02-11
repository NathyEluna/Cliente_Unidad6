import { useContext } from 'react';
import { sesionContexto } from '../contextos/ProveedorSesion.jsx';

const CerrarSesion = () => {
    const { cerrarSesion} = useContext(sesionContexto);
  return (
    <>
        <button className="menu-link cerrar-sesion" onClick={cerrarSesion}>Cerrar sesión</button>
    </>
  );
};

export default CerrarSesion;
import { useContext } from 'react';
import { productoContexto } from '../contextos/ProveedorProducto.jsx';
import BotonesOrdenar from "../productos/BotonesOrdenar.jsx";
import ListaProductos from '../productos/ListaProductos.jsx';

const SubmenuOrdenar = () => {
  return (
    <div className="productos">
            <BotonesOrdenar/>

            <ListaProductos/>
    </div>
  );
};

export default SubmenuOrdenar;
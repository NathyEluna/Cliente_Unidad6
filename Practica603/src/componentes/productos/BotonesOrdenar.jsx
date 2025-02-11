import { useContext } from "react";
import { productoContexto } from "../contextos/ProveedorProducto.jsx";

const BotonesOrdenar = () => {
    const { sortProductos } = useContext(productoContexto);

  return (
    <div>  
        <button className="sort-btn" onClick={() => sortProductos("product_name", true)}>Ordenar por Nombre Ascendente</button>
        <button className="sort-btn" onClick={() => sortProductos("product_name", false)}>Ordenar por Nombre Descendente</button>
        <button className="sort-btn" onClick={() => sortProductos("weight", true)}>Ordenar por Peso Ascendente</button>
        <button className="sort-btn" onClick={() => sortProductos("weight", false)}>Ordenar por Peso Descendente</button>
        <button className="sort-btn" onClick={() => sortProductos("price", true)}>Ordenar por Precio Ascendente</button>
        <button className="sort-btn" onClick={() => sortProductos("price", false)}>Ordenar por Precio Descendente</button>
    </div>
  );
};

export default BotonesOrdenar;
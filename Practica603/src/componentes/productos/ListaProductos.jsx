import { useContext, useEffect } from "react";
import { productoContexto } from "../contextos/ProveedorProducto.jsx";
import ListaProducto from "./ListaProducto.jsx";
import "../../css/productos.css";

const ListaProductos = () => {
  const { listadoProducto, listadoFiltrado, borrarFiltros} = useContext(productoContexto);

  const productosMostrar = listadoFiltrado.length > 0 ? listadoFiltrado : listadoProducto;

  //Cálculo del precio medio de los productos.
  const totalProductos = listadoProducto.length;
  const precioMedio = totalProductos ? (listadoProducto.reduce((x, producto) => x + producto.price, 0) / totalProductos).toFixed(2) : 0;

  useEffect(() => {borrarFiltros()}, []);
  return (
        <div className="productos">
            <div className="contenedorProductos">
                {productosMostrar.length ? (
                productosMostrar.map((prod) => (
                    <ListaProducto key={prod.product_id} datos={prod}/>
                ))
                ) : (
                `Sin productos`
                )}
            </div>

            <div className="resumen">
                <p>Total de productos: {totalProductos}</p>
                <p>Precio medio: {precioMedio}</p>
            </div>
        </div>
  );
};

export default ListaProductos;

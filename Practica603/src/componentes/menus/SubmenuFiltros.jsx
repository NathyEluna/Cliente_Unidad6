import { useContext } from 'react';
import { productoContexto } from '../contextos/ProveedorProducto.jsx';
import ListaProductos from '../productos/ListaProductos.jsx';


const SubmenuFiltros = () => {
    const { filterProductos, actualizarFiltro, filtros, borrarFiltros } = useContext(productoContexto);

    //Manejar el envío del formulario de filtros.
    const submitFiltros = (e) => {
        e.preventDefault();
        filterProductos();
    };
  return (
    <div className="productos">
        <form onSubmit={submitFiltros}>
            <input type="text" name="name" placeholder="Nombre" value={filtros.name} onChange={actualizarFiltro} />
            <input type="number" min={0} step={0.1} name="weight" placeholder="Peso" value={filtros.weight} onChange={actualizarFiltro} />
            <input type="number" min={0} step={0.01} name="price" placeholder="Precio" value={filtros.price} onChange={actualizarFiltro} />
            <button className="filter-btn" type="submit">Filtrar</button>
            <button className="filter-btn" onClick={borrarFiltros}>Borrar Filtros</button>
        </form>

        <ListaProductos/>
    </div>
  );
};

export default SubmenuFiltros;
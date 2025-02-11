import { Link, Outlet } from 'react-router-dom';
import "../../css/productos.css";

const LayoutProductos = () => {
  return (
    <div className="contenedor-productos">
        <nav className="sort-nav">
            <Link className="sub-btn" to="/productos">Ver productos</Link>
            <Link className="sub-btn" to="/productos/ordenar">Ordenar productos</Link>
            <Link className="sub-btn" to="/productos/filtrar">Filtrar productos</Link>
            <Link className="sub-btn" to="/productos/insertar">Insertar productos</Link>
        </nav>
        <h2>El Tesoro de Azeroth</h2>
        {/* El componente Outlet renderiza las rutas hijas aquí */}
        <Outlet />
    </div>
  );
};

export default LayoutProductos;

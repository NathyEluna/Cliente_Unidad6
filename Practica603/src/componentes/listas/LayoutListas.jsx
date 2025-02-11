import { Link, Outlet } from "react-router-dom";
import "../../css/listas.css";

const LayoutListas = () => {
    return (
        <div className="contenedor-listas">
            <nav className="sort-nav">
                <button className="list-btn">
                    <Link to="/listas">Ver Listas</Link>
                </button>
                <button className="list-btn">
                    <Link to="/listas/crear">Crear Lista</Link>
                </button>
            </nav>
            <h2>Gestión de Listas de Compra</h2>
            <Outlet />
        </div>
    );
};

export default LayoutListas;
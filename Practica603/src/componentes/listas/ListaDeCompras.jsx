import { useContext } from "react";
import { listaContexto } from "../contextos/ProveedorLista.jsx";
import { Link } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import BotonesListas from "./BotonesLista.jsx";

const ListaDeCompras = () => {
    const { listas, deleteLista } = useContext(listaContexto);

    return (
        <div className="listas">
            <h2>Mis Listas de Compras</h2>
            <BotonesListas />
            <ul>
                {listas.map(lista => (
                    <li key={lista.list_id}>
                        <Link to={`/listas/detalle/${lista.list_id}`}>{lista.list_name}</Link>
                        <button className="sub-btn" onClick={() => deleteLista(lista.list_id)}><FaTrashAlt color="yellow" fontSize={"2em"} /></button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListaDeCompras;

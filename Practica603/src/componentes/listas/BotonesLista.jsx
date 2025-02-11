import { useContext } from "react";
import { listaContexto } from "../contextos/ProveedorLista.jsx";

const BotonesListas = () => {
    const { listas, deleteLista } = useContext(listaContexto);

    const ordenarPorNombre = () => {
        listas.sort((a, b) => a.list_name.localeCompare(b.list_name));
    };
    
      const ordenarPorFecha = () => {
        listas.sort((a, b) => new Date(a.creation_date) - new Date(b.creation_date));
    };

    return (
        <div>
            <button className="sort-btn" onClick={ordenarPorNombre}>Ordenar por Nombre</button>
            <button className="sort-btn" onClick={ordenarPorFecha}>Ordenar por Fecha</button>
            {listas.map(lista => (
                <button className="sort-btn" key={lista.list_id} onClick={() => deleteLista(lista.list_id)}>Eliminar {lista.list_name}</button>
            ))}
        </div>
    );
};

export default BotonesListas;
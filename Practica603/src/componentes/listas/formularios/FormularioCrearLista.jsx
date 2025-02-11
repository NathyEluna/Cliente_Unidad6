import { useState, useContext } from "react";
import { listaContexto } from "../../contextos/ProveedorLista";
import { FaPlus } from "react-icons/fa";

const FormularioCrearLista = () => {
    const { insertLista } = useContext(listaContexto);
    const [listName, setListName] = useState("");

    const submitLista = (e) => {
        e.preventDefault();
        insertLista(listName);
        setListName("");
    };

    return (
        <form onSubmit={submitLista} className="contenedor-formulario">
            <input 
                type="text" 
                value={listName} 
                onChange={(e) => setListName(e.target.value)} 
                placeholder="Nombre de la lista"
            />
            <br />
            <button className="sub-btn" type="submit"><FaPlus color="white" fontSize={"1em"}/></button>
        </form>
    );
};

export default FormularioCrearLista;

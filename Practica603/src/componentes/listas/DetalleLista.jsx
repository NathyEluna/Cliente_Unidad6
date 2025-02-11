import { useContext, useEffect } from "react";
import { listaContexto } from "../contextos/ProveedorLista.jsx";
import { useParams } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import "../../css/listas.css";

const DetalleLista = () => {
    const { productosLista, selectProductosDeLista, deleteProductoDeLista, calcularPesoTotal, calcularTotalEuros, pesoUmbral } = useContext(listaContexto);
    const { id } = useParams();

    useEffect(() => {
        selectProductosDeLista(id);
    }, [id]);

    const pesoTotal = calcularPesoTotal();
    const totalEuros = calcularTotalEuros();
    const necesitaCoche = pesoTotal > pesoUmbral;

    return (
        <div className="card-lista">
            <div className="contenedorListas">
                <h2>Detalles de la Lista</h2>
                <ul>
                    {productosLista.map(item => (
                        <li key={item.product_id}>
                            {item.productos.product_name} - {item.quantity} uds
                            <button className="card-btn" onClick={() => deleteProductoDeLista(id, item.product_id)}><FaTrashAlt color="yellow" fontSize={"2em"} /></button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="resumen">
                <p>Peso total: {pesoTotal} kg {necesitaCoche && "Necesario Montura"}</p>
                <p>Total en euros: {totalEuros}€</p>
            </div>
        </div>
    );
};

export default DetalleLista;

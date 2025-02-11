import { useContext, useState } from "react";
import { productoContexto } from "../contextos/ProveedorProducto.jsx";
import { sesionContexto } from "../contextos/ProveedorSesion.jsx";
import { listaContexto } from "../contextos/ProveedorLista.jsx";
import { Link } from "react-router-dom";
import { FaPlus, FaTrashAlt, FaEdit } from "react-icons/fa";
import { toast } from 'react-toastify';

const ListaProducto = ({ datos }) => {
  const { seleccionarProducto, deleteProducto } = useContext(productoContexto);
  const { sesionIniciada } = useContext(sesionContexto);
  const { listas, addProductoALista } = useContext(listaContexto);

  const [listaSeleccionada, setListaSeleccionada] = useState("");
  const [cantidad, setCantidad] = useState(1);

  const manejarAgregarProducto = () => {
    if (listaSeleccionada) {
      addProductoALista(listaSeleccionada, datos.product_id, cantidad);
      setListaSeleccionada("");
      setCantidad(1);
    }
  };

  const manejarEliminarProducto = (productId) => {
    const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar este producto?");
    if (!confirmacion) return;
    deleteProducto(productId);
    toast.success("Producto eliminado correctamente.");
};

  return (
    <div className="card-producto" id={datos.product_id}>
      <img src={datos.image} alt={datos.product_name} />
      <h3>{datos.product_name}</h3>
      <div className="contenedorPrecioPeso">
        <p>{datos.weight} kg</p>
        <p>{datos.price}€</p>
      </div>
      <p>{datos.description}</p>

      {sesionIniciada && (
        <div className="contenedorBotones">
          <button className="sub-btn" style={{ marginRight: "10px" }} onClick={() => seleccionarProducto(datos)}>
            <Link to={`/productos/editar/${datos.product_id}`}>
              <FaEdit color="white" fontSize={"2em"} />
            </Link>
          </button>
          <button className="sub-btn" onClick={() => manejarEliminarProducto(datos.product_id)}>
                        <FaTrashAlt color="yellow" fontSize={"2em"} />
                    </button>
        </div>
      )}

      {sesionIniciada && (
        <div className="agregar-a-lista">
          <select value={listaSeleccionada} onChange={(e) => setListaSeleccionada(e.target.value)}>
            <option value="">Selecciona una lista</option>
            {listas.map(lista => (
              <option key={lista.list_id} value={lista.list_id}>{lista.list_name}</option>
            ))}
          </select>
          <input
            type="number"
            value={cantidad}
            min="1"
            onChange={(e) => setCantidad(Number(e.target.value))}
          />
          <button className="sub-btn" style={{ marginRight: "10px" }} onClick={manejarAgregarProducto}>
            <FaPlus color="white" fontSize={"2em"} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ListaProducto;
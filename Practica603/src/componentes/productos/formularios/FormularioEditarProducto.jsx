import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { productoContexto } from "../../contextos/ProveedorProducto.jsx";

const FormularioEditarProducto = () => {
    const { productoEditado, actualizarDatoElegido, updateProducto } = useContext(productoContexto);
    const navigate = useNavigate();

    const submitEditar = async (e) => {
        e.preventDefault();
        await updateProducto();
        navigate("/productos");
    };

    return (
            <form onSubmit={submitEditar} className="contenedor-formulario">
                <h3>Editar Producto</h3>
                <label htmlFor="name-ed">Nombre:</label>
                <input type="text" id="name-ed" name="product_name" value={productoEditado.product_name || ""} onChange={actualizarDatoElegido} required />
                <br />
                <label htmlFor="weight-ed">Peso (kg):</label>
                <input type="number" id="weight-ed" name="weight" value={productoEditado.weight || ""} onChange={actualizarDatoElegido} required/>
                <br />
                <label htmlFor="price-ed">Precio (€):</label>
                <input type="number" id="price-ed" name="price" value={productoEditado.price || ""} onChange={actualizarDatoElegido} required />
                <br />
                <label htmlFor="img-ed">Imagen (URL):</label>
                <input type="text" id="img-ed" name="image" value={productoEditado.image || ""} onChange={actualizarDatoElegido} required />
                <br />
                <label htmlFor="desc-ed">Descripción:</label>
                <textarea name="description" id="desc-ed" value={productoEditado.description || ""} onChange={actualizarDatoElegido} required />
                <br />
                <button className="sort-btn edit-btn" type="submit">Guardar Cambios</button>
            </form>
    );
};

export default FormularioEditarProducto;

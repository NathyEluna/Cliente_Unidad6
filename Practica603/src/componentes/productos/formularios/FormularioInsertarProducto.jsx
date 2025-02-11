import { useContext} from "react";
import { productoContexto } from "../../contextos/ProveedorProducto.jsx";

const FormularioInsertarProducto = () => {
    const { insertProducto, actualizarNuevoProducto, nuevoProducto } = useContext(productoContexto);

    const submitNuevoProducto = (e) => {
        e.preventDefault();
        insertProducto(nuevoProducto);
    };

    return (
        <form onSubmit={submitNuevoProducto} className="contenedor-formulario">
            <h3>Insertar Producto</h3>
            <label htmlFor="name-in" >Nombre:</label>
            <input type="text" id="name-in" name="product_name" value={nuevoProducto.product_name} onChange={actualizarNuevoProducto} placeholder="Nombre" required />
            <br />
            <label htmlFor="weight-in">Peso (kg):</label>
            <input type="number" id="weight-in" name="weight" value={nuevoProducto.weight} onChange={actualizarNuevoProducto} placeholder="Peso" step="0.01" required />
            <br />
            <label htmlFor="price-in">Precio (€):</label>
            <input type="number" id="price-in" name="price" value={nuevoProducto.price} onChange={actualizarNuevoProducto} placeholder="Precio" step="0.01" required />
            <br />
            <label htmlFor="img-in">Imagen (URL):</label>
            <input type="text" id="img-in" name="image" value={nuevoProducto.image} onChange={actualizarNuevoProducto} placeholder="URL de la imagen" required />
            <br />
            <label htmlFor="desc-in">Descripción:</label>
            <textarea name="description" id="desc-in" value={nuevoProducto.description} onChange={actualizarNuevoProducto} placeholder="Descripción"></textarea>
            <br />
            <button className="sort-btn insert-btn" type="submit">Insertar Producto</button>
        </form>
    );
};

export default FormularioInsertarProducto;

import { createContext, useState, useEffect } from "react";
import { supabase } from '../../config/supabase.js';

const productoContexto = createContext();

const ProveedorProducto = ({ children }) => {
    //Valores iniciales de los estados.
    const defaultProducto = {
        product_name : "",
        weight : 0.0,
        price : 0.0,
        image : "",
        description : "",
    };

    const defaultFiltro = {
        name : "",
        weight : 0.0,
        price : 0.0,
    };

    //Estados.
    const [listadoProducto, setListadoProducto] = useState([]);
    const [listadoFiltrado, setListadoFiltrado] = useState([]);
    const [filtros, setFiltros] = useState(defaultFiltro);
    const [productoElegido, setProductoElegido] = useState(defaultProducto);
    const [nuevoProducto, setNuevoProducto] = useState(defaultProducto);
    const [errorProducto, setErrorProducto] = useState("");
    const [productoEditado, setProductoEditado] = useState(defaultProducto);

    //Funciones.

    //Función para obtener todos los productos(Read).
    const selectProductos = async () => {
        try{
            const {data, error} = await supabase.from("productos").select("*");

            if(error){
                throw error;
            }else{
                setListadoProducto(data);
            };

        }catch(error){
            setErrorProducto(error.message);
        };
    };

    //Función para ordenar productos
    const sortProductos = (atributo, asc = true) => {
        //Verificar si hay productos filtrados.
        const listadoAMostrar = listadoFiltrado.length > 0 ? listadoFiltrado : listadoProducto;

        //Realizar copia y ordenar el listado correspondiente.
        const sorted = [...listadoAMostrar].sort((x, y) => {
            if (typeof x[atributo] !== "string" || typeof y[atributo] !== "string") {
                console.error("Los atributos no son cadenas:", x[atributo], y[atributo]);
            }

            //Si el atributo es de tipo string, utilizamos localeCompare para soportar varios idiomas y caracteres especiales.
            if (typeof x[atributo] === "string") {
                return asc ? x[atributo].localeCompare(y[atributo]) : y[atributo].localeCompare(x[atributo]);
            } else {
                return asc ? x[atributo] - y[atributo] : y[atributo] - x[atributo];
            }
        });

        //Actualizar el estado según el listado mostrado.
        if (listadoFiltrado.length > 0) {
            //Si estamos ordenando el listado filtrado.
            setListadoFiltrado(sorted);
        } else {
            //Si estamos ordenando el listado completo.
            setListadoProducto(sorted);
        };
    };

    //Función para filtras los productos con el filtro elegido.
    const filterProductos = () => {
        let productoFiltrado = [...listadoProducto];
    
        // Aplicar filtro solo si los campos no están vacíos
        if(filtros.name.trim()){
            productoFiltrado = productoFiltrado.filter((articulo) => 
            articulo.product_name.toLowerCase().startsWith(filtros.name.toLowerCase()));
        };
    
        if(!isNaN(filtros.weight) && filtros.weight > 0){
            productoFiltrado = productoFiltrado.filter((articulo) =>
            articulo.weight >= filtros.weight);
        };
    
        if(!isNaN(filtros.price) && filtros.price > 0){
            productoFiltrado = productoFiltrado.filter((articulo) =>
            articulo.price >= filtros.price);
        };
    
        setListadoFiltrado(productoFiltrado);
    };

    const borrarFiltros = () => {
        setFiltros(defaultFiltro);
        setListadoFiltrado([]);
    };

    //Función para actualizar los datos de los productos.
    const actualizarFiltro = (e) => {
        const {name, value} = e.target;
        setFiltros({...filtros, [name]: value});
    };

    //Funciones CRUD. 
    const encontrarProductoPorId = (id) => {
        if(!listadoProducto || listadoProducto.length === 0) return null;
        return listadoProducto.find(producto => producto.product_id === id) || null;
    };

    //Función para añadir nuevos productos(Create).
    const insertProducto = async () => {
        try{
            //Insertar el producto sin ID porque Supabase lo generará automáticamente.
            const {data, error} = await supabase.from("productos")
            .insert(productoElegido).select();

            if(error){
                throw error;
            };
            if(!data || data.length === 0){
                throw new Error("No se pudo insertar el producto.");
            };

            //Nos aseguramos que data tenga el nuevo producto con su ID generado.
            const nuevoProducto = data[0];

            //Actualizar estados con el producto insertado.
            //Utilizamos prev cuando el nuevo estado depende del anterior, así evitamos problemas si React aún no 
            //ha actualizado el estado cuando llamamos a algún setEstado. 
            //Lo utilizaré en las funciones C-UD del CRUD porque dependen de un estado. El Read no depende de un estado anterior.
            setListadoProducto(prev => [...prev, nuevoProducto]);

            //Reiniciar el estado del producto elegido.
            setProductoElegido(defaultProducto);

        }catch(error){
            setErrorProducto(error.message);
        };
    };

    //Función para actualizar los datos del nuevo producto.
    const actualizarNuevoProducto = (e) => {
        const { name, value } = e.target;
        setNuevoProducto((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    //Función para actualizar productos(Update).
    const updateProducto = async () => {
        try{
            const {data, error} = await supabase.from("productos").update(productoElegido)
            .eq("product_id", productoElegido.product_id).select();
            //El select() nos asegura de que hemos recibido los datos actualizados desde supabase.

            if(error){
                throw error;
            };

            //Si el producto no existe o no pudo ser encontrado.
            if(!data || data.length === 0){
                throw new Error("No se pudo actualizar el producto.");
            };

            setListadoProducto(prev => prev.map(producto => (producto.product_id === productoElegido.product_id ? data[0] : producto)));

            //Reiniciar el estado del producto elegido.
            setProductoElegido(defaultProducto);
        }catch(error){
            setErrorProducto(error.message);
        };
    };

    const actualizarDatoElegido = (e) => {
        const { name, value } = e.target;
        setProductoEditado((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const seleccionarProducto = (id) => {
        const producto = encontrarProductoPorId(id);
        if (producto) {
            setProductoElegido(producto);
            setProductoEditado(producto); // Asegúrese de que productoEditado se actualice aquí
        };
    };

    //Función para eliminar productos(Delete).
    const deleteProducto = async (product_id) => {
        try{
            const {data, error} = await supabase.from("productos").delete()
            .eq("product_id", product_id);

            if(error){
                throw error;
            };

            //Actualización de los estados sin el producto eliminado.
            const listadoActualizado = listadoProducto.filter(producto => producto.product_id !== product_id);
           //ListadoFiltrado tiene su propia actualización porque así al eliminar un producto del listado con filtro, el filtro se mantiene.
            const listadoFiltradoActualizado = listadoFiltrado.filter(producto => producto.product_id !== product_id)

            setListadoProducto(listadoActualizado);
            setListadoFiltrado(listadoFiltradoActualizado);

        }catch(error){
            setErrorProducto(error.message);
        };
    };
    
    const limpiarErrorProducto = () => {
        setErrorProducto("");
    };

    useEffect(() => {
        limpiarErrorProducto();
        selectProductos();
    }, []);

    const datosExportarProductos = {
        listadoProducto,
        listadoFiltrado,
        productoElegido,
        filtros,
        errorProducto,
        nuevoProducto,
        productoEditado,
        filterProductos, actualizarFiltro, seleccionarProducto,
        borrarFiltros, sortProductos,
        actualizarDatoElegido, insertProducto, updateProducto,
        deleteProducto, encontrarProductoPorId,
        limpiarErrorProducto, selectProductos, actualizarNuevoProducto,
    };

    return(
        <productoContexto.Provider value={datosExportarProductos}>
            {children}
        </productoContexto.Provider>
    );
};

export { productoContexto };
export default ProveedorProducto;
import { createContext, useState, useEffect, useContext } from "react";
import { supabase } from "../../config/supabase.js";
import { sesionContexto } from "../contextos/ProveedorSesion.jsx";
import { toast } from 'react-toastify';

const listaContexto = createContext();

const ProveedorLista = ({ children }) => {
    //Importar el contexto de la sesión.
    const { usuario } = useContext(sesionContexto);

    //Estados para las listas y los productos de la lista.
    const [listas, setListas] = useState([]);
    const [productosLista, setProductosLista] = useState([]);
    const [errorLista, setErrorLista] = useState("");
    const pesoCompras = 20; // Umbral de peso para usar el coche

    //Funciones para interactuar con la base de datos.
    const selectListas = async () => {
        if (!usuario || !usuario.id) return; // 🔹 Evita ejecutar la consulta si `usuario.id` no está disponible.
        
        try {
            const { data, error } = await supabase
                .from("listas")
                .select("list_id, list_name, owner_id, creation_date")
                .eq("owner_id", usuario.id);
    
            if (error) throw error;
            setListas(data);
        } catch (error) {
            setErrorLista(error.message);
        }
    };

    //Función para insertar una lista en la base de datos.
    const insertLista = async (listName) => {
        if (!usuario) return;
        try {
            const { data, error } = await supabase.from("listas").insert({
                list_name: listName,
                owner_id: usuario.id,
                creation_date: new Date()
            }).select();
            if (error) throw error;
            setListas(prev => [...prev, data[0]]);
        } catch (error) {
            setErrorLista(error.message);
        }
    };

    //Función para eliminar una lista de la base de datos.
    const deleteLista = async (listId) => {
        try {
            const { error } = await supabase.from("listas").delete().eq("list_id", listId);
            if (error) throw error;
            setListas(prev => prev.filter(lista => lista.list_id !== listId));
        } catch (error) {
            setErrorLista(error.message);
        }
    };

    //Función para seleccionar los productos de una lista.
    const selectProductosDeLista = async (listId) => {
        try {
            const { data, error } = await supabase
                .from("lista_producto")
                .select("list_id, product_id, quantity, productos(product_name, weight, price)") // Relacionando productos
                .eq("list_id", listId);
            if (error) throw error;
            setProductosLista(data);
        } catch (error) {
            setErrorLista(error.message);
        }
    };

    //Función para añadir un producto a una lista.
    const addProductoALista = async (listId, productId, quantity) => {
        try {
            const { data, error } = await supabase.from("lista_producto").insert({
                list_id: listId,
                product_id: productId,
                quantity: quantity
            }).select();

            if (error) throw error;
            setProductosLista(prev => [...prev, data[0]]);
            toast.success("Producto agregado a la lista correctamente.");
        } catch (error) {
            setErrorLista(error.message);
            toast.error("Error al agregar el producto a la lista.");
        }
    };

    //Función para eliminar un producto de una lista.
    const deleteProductoDeLista = async (listId, productId) => {
        const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar este producto de la lista?");
        if (!confirmacion) return;

        try {
            const { error } = await supabase.from("lista_producto")
                .delete()
                .eq("list_id", listId)
                .eq("product_id", productId);
            if (error) throw error;
            setProductosLista(prev => prev.filter(item => item.product_id !== productId));
            toast.success("Producto eliminado de la lista correctamente.");
        } catch (error) {
            setErrorLista(error.message);
            toast.error("Error al eliminar el producto de la lista.");
        }
    };

    //Funciones para calcular el peso total y el total en euros de los productos de la lista.
    const calcularPesoTotal = () => {
        if (!productosLista || productosLista.length === 0) return 0; // 🔹 Evita errores si no hay productos
    
        return productosLista.reduce((total, item) => {
            if (!item.productos || typeof item.productos.weight !== "number") return total; // 🔹 Evita `undefined`
            return total + (item.productos.weight * item.quantity);
        }, 0);
    };
    

    const calcularTotalEuros = () => {
        return productosLista.reduce((total, item) => total + (item.productos.price * item.quantity), 0).toFixed(2);
    };

    useEffect(() => {
        if (usuario && usuario.id){
            selectListas();
        };
    }, [usuario]);

    return (
        <listaContexto.Provider value={{ 
            listas, 
            productosLista, 
            insertLista, 
            deleteLista, 
            selectProductosDeLista, 
            addProductoALista, 
            deleteProductoDeLista, 
            calcularPesoTotal, 
            calcularTotalEuros, 
            pesoCompras,
            errorLista 
        }}>
            {children}
        </listaContexto.Provider>
    );
};

export { listaContexto };
export default ProveedorLista;

import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { supabase } from '../../config/supabase.js';

const sesionContexto = createContext();

const ProveedorSesion = ({ children }) => {
    const navegar = useNavigate();
    //hook para conseguir la ruta en que estamos localizados.
    const location = useLocation();

    //Valores iniciales de los estados.
    const defaultDatosSesion = { email : "", password : "" ,};
    const defaultUsuario = {};

    //Estados.
    const [datosSesion, setDatosSesion] = useState(defaultDatosSesion);
    const [usuario, setUsuario] = useState(defaultUsuario);
    const [errorUsuario, setErrorUsuario] = useState("");
    const [sesionIniciada, setSesionIniciada] = useState(false);

    //Funciones.
    
    //Función para crear un nuevo usuario.
    const crearUsuario = async () => {
        try{
            const { data, error } = await supabase.auth.signUp({
                email: datosSesion.email,
                password: datosSesion.password,
            });

            if(error){
                throw error;
            }else{
                setErrorUsuario(`Verifica tu correo electrónico(${datosSesion.email}) para activar tu cuenta.`);
            };
        }catch(error){
            setErrorUsuario(error.message);
        };
    };

    //Función para iniciar sesión con contraseña.
    const iniciarSesionPassword = async () => {
        try{
            const { data, error } = await supabase.auth.signInWithPassword({
                email: datosSesion.email,
                password: datosSesion.password,
            });

            if(error){
                throw error;
            }else{
                navegar("/");
            };

        }catch(error){
            setErrorUsuario(error.message);
        };
    };

    //Función para cerrar sesión.
    const cerrarSesion = async () => {
        try{
            //Cerrar sesión
            await supabase.auth.signOut();
            //Navegar a la página de inicio de sesión(parte pública).
            navegar("/login");

            if(error){
                throw error;
            };

        }catch(error){
            setErrorUsuario(error.message);
        };
    };

    //Función para obtener el usuario actual.
    const obtenerUsuarioActual = async () => {
        try{
            setErrorUsuario("");
            const { data, error} = await supabase.auth.getUser();
            
            if(error){
                throw error;
            };
            setUsuario(data.user);

        }catch(error){
            setErrorUsuario(error.message);
        };
    };

    //Función para actualizar los datos del usuario.
    const actualizarDatos = (e) => {
        const {name, value} = e.target;
        setDatosSesion({...datosSesion, [name]: value});
    };

    //Función para restablecer la contraseña. Primero el usuario pide para restablecer la contraseña, entonces el enlace
    //enviado por correo redirecciona el usuario a la página de cambiar contraseña y hace login automaticamente.
    const restablecerPassword = async () => {
        try{
            const { data, error } = await supabase.auth.resetPasswordForEmail(datosSesion.email, {
                redirectTo:"http://localhost:5173/cambiar-password"
            });

            if(error){
                throw error;
            }else{
                setErrorUsuario("Se ha enviado un correo electrónico para restablecer tu contraseña.");
            };

        }catch(error){
            setErrorUsuario(error.message);
        };
    };

    //Función para cambiar la contraseña del usuario.
    const cambiarPassword = async () => {
        try{
            const { data, error} = await supabase.auth.updateUser({
                password: datosSesion.password,
            });
            //Antes de poner esa función no funcionaba el cambio de contraseña. No se si debería ir aqui o antes pero no quiero tocarlo. xD
            obtenerUsuarioActual();
            //Navegar a la página de inicio.
            navegar("/");

            if(error){
                throw error;
            };

        }catch(error){
            setErrorUsuario(error.message);
        };
    };

    const limpiarError = () => {
        setErrorUsuario("");
    };

    useEffect(() => {
        limpiarError();
        //Función que estará siempre activa y verifica si la sesión se inicia o se cierra.
        const suscrito = supabase.auth.onAuthStateChange((e, session) => {
            if(session){
                //Verifica si estamos en la ruta de cambiar contraseña, si no estamos redirige el usuario
                //a la página de inicio. Sí el usuario está con la sesión iniciada por el enlace de restablecer
                //contraseña, deja el usuario en cambiar-password y no en inicio.
                if(location.pathname !== "/cambiar-password"){
                    navegar("/");
                };
                setSesionIniciada(true);
                obtenerUsuarioActual();
                setErrorUsuario("");
            }else{
                navegar("/login");
                setSesionIniciada(false);
                setErrorUsuario("");
            };
        });
    }, []);

    const datosExportar = {
        usuario,
        errorUsuario,
        sesionIniciada,
        crearUsuario,
        iniciarSesionPassword,
        cerrarSesion,
        actualizarDatos,
        restablecerPassword,
        obtenerUsuarioActual,
        cambiarPassword,
        limpiarError,
    };

  return (
    <sesionContexto.Provider value={datosExportar}>
      {children}
    </sesionContexto.Provider>
  );
};

export { sesionContexto };
export default ProveedorSesion;
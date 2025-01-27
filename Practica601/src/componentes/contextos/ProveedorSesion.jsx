import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../config/supabase.js';

const sesionContexto = createContext();

const ProveedorSesion = ({ children }) => {
    const navegar = useNavigate();

    //Valores iniciales de los estados.
    const defaultDatosSesion = { email : "", password : "" ,};
    const defaultUsuario = {};

    //Estados.
    const [datosSesion, setDatosSesion] = useState(defaultDatosSesion);
    const [usuario, setUsuario] = useState(defaultUsuario);
    const [errorUsuario, setErrorUsuario] = useState("");
    const [sesionIniciada, setSesionIniciada] = useState(false);

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

    //Función para restablecer la contraseña.
    const restablecerPassword = async () => {
        try{
            const { data, error } = await supabase.auth.api.resetPasswordForEmail(datosSesion.email);

            if(error){
                throw error;
            }else{
                setErrorUsuario("Se ha enviado un correo electrónico para restablecer tu contraseña.");
            };

        }catch(error){
            setErrorUsuario(error.message);
        };
    };


    useEffect(() => {
        //Función que estará siempre activa y verifica si la sesión se inicia o se cierra.
        const suscrito = supabase.auth.onAuthStateChange((event, session) => {
            if(session){
                navegar("/");
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
        //Estados.
        usuario,
        errorUsuario,
        sesionIniciada,
        //Funciones.
        crearUsuario,
        iniciarSesionPassword,
        cerrarSesion,
        actualizarDatos,
        restablecerPassword,
        obtenerUsuarioActual,
    };

  return (
    <sesionContexto.Provider value={datosExportar}>
      {children}
    </sesionContexto.Provider>
  );
};

export { sesionContexto };
export default ProveedorSesion;
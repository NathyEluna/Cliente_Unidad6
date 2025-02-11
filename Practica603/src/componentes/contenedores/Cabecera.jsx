import { useContext } from 'react';
import { sesionContexto } from '../contextos/ProveedorSesion.jsx';
import "../../css/cabecera.css";
import Navegador from "./Navegador.jsx";

const Cabecera = () => {
  const { sesionIniciada, usuario } = useContext(sesionContexto);
  return (
    <header className="cabecera">
      <h1 className="titulo">Práctica 6.05</h1>
      <Navegador />
      { sesionIniciada && <p>Hola, {usuario.email}</p> }
    </header>
  );
};

export default Cabecera;


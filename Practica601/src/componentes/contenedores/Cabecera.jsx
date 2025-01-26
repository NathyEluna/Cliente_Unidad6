import { useContext } from 'react';
import { sesionContexto } from '../contextos/ProveedorSesion.jsx';
import "../../css/cabecera.css";
import Navegador from "./Navegador.jsx";

const Cabecera = () => {
  const { sesionIniciada, usuario } = useContext(sesionContexto);
  return (
    <header className="cabecera">
      <h1 className="titulo">Práctica 6.01</h1>
      <Navegador />
      { sesionIniciada && `Hola, ${usuario.email}` }
    </header>
  )
}

export default Cabecera
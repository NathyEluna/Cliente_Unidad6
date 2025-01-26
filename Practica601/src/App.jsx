import './App.css'
import Contenedor from './componentes/contenedores/Contenedor.jsx'
import ProveedorSesion from './componentes/contextos/ProveedorSesion.jsx'
import Cabecera from './componentes/contenedores/Cabecera.jsx';
import Contenido from './componentes/contenedores/Contenido.jsx';
import Rutas from './componentes/Rutas.jsx';
import Pie from './componentes/contenedores/Pie.jsx';

function App() {
  return (
    <>
      <ProveedorSesion>
        <Contenedor>
          <Cabecera />
          <Contenido>
            <Rutas />
          </Contenido>
          <Pie />
        </Contenedor>
      </ProveedorSesion>
    </>
  );
};

export default App;

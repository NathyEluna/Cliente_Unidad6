import './App.css'
import Contenedor from './componentes/contenedores/Contenedor.jsx'
import ProveedorSesion from './componentes/contextos/ProveedorSesion.jsx'
import Cabecera from './componentes/contenedores/Cabecera.jsx';
import Contenido from './componentes/contenedores/Contenido.jsx';
import Rutas from './componentes/Rutas.jsx';
import Pie from './componentes/contenedores/Pie.jsx';
import ProveedorProducto from './componentes/contextos/ProveedorProducto.jsx';
import ProveedorLista from './componentes/contextos/ProveedorLista.jsx';

function App() {
  return (
      <ProveedorSesion>
        <Contenedor>
          <ProveedorProducto>
            <ProveedorLista>
              <Cabecera />
              <Contenido>
                  <Rutas />
              </Contenido>
              <Pie />
            </ProveedorLista>
          </ProveedorProducto>
        </Contenedor>
      </ProveedorSesion>
  );
};

export default App;

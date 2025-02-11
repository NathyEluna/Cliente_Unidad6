import { Routes, Route } from 'react-router-dom';
import Inicio from './paginas/Inicio.jsx';
import Login from './paginas/Login.jsx';
import Error from './paginas/Error.jsx';
import RestablecerPassword from './sesion/RestablecerPassword.jsx';
import CrearCuenta from './sesion/CrearCuenta.jsx';
import CambiarPassword from './sesion/CambiarPassword.jsx';
import ListaProductos from './productos/ListaProductos.jsx';
import LayoutProductos from './productos/LayoutProductos.jsx';
import SubmenuFiltros from './menus/SubmenuFiltros.jsx';
import SubmenuOrdenar from './menus/SubmenuOrdenar.jsx';
import FormularioInsertarProducto from './productos/formularios/FormularioInsertarProducto.jsx';
import FormularioEditarProducto from './productos/formularios/FormularioEditarProducto.jsx';
import DetalleLista from './listas/DetalleLista.jsx';
import ListaDeCompras from './listas/ListaDeCompras.jsx';
import LayoutListas from './listas/LayoutListas.jsx';
import FormularioCrearLista from './listas/formularios/FormularioCrearLista.jsx';

const Rutas = () => {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/login" element={<Login />} />
      <Route path="/crear-cuenta" element={<CrearCuenta />} />
      <Route path="/restablecer-password" element={<RestablecerPassword />} />
      <Route path="/cambiar-password" element={<CambiarPassword />}/>
      <Route path="/productos" element={<LayoutProductos />} >
        <Route index element={<ListaProductos />} />
        <Route path="ordenar" element={<SubmenuOrdenar/>} />
        <Route path="filtrar" element={<SubmenuFiltros/>} />
        <Route path="insertar" element={<FormularioInsertarProducto/>} />
        <Route path="editar/:id" element={<FormularioEditarProducto/>} />
      </Route>
      <Route path="/listas" element={<LayoutListas />}>
        <Route index element={<ListaDeCompras />} />
        <Route path="detalle/:id" element={<DetalleLista />} />
        <Route path="crear" element={<FormularioCrearLista />} />
      </Route>
      <Route path="*" element={<Error />} />
    </Routes>
  );
};

export default Rutas;
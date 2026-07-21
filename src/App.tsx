import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Home } from './page/home/Home';
import { Clientes } from './page/clientes/Clientes';
import { MisProductos } from './page/misProductos/MisProductos';
import { AgregarProducto } from './componenetes/agregarProducto/AgregarProducto';
import { PedidoProvider } from './componenetes/context/PedidoContext';
import { NuevoCliente } from './componenetes/nuevoCliente/NuevoCliente';
import { Pedido } from './page/pedido/Pedido';


function App() {

  return (
    <>
      <BrowserRouter>
      <PedidoProvider>
        <Routes>
          <Route path='/' element={<Home />}>
          <Route index element={<MisProductos/>}/>
          <Route path='/clientes' element={<Clientes />}/>
          <Route path='/crearProducto' element={<AgregarProducto/>}/>
          <Route path='/pedido' element={<Pedido/>}/>
          <Route path='/nuevoCliente' element={<NuevoCliente/>}/>
          </Route>
        </Routes>
        
      </PedidoProvider>
      </BrowserRouter>
    </>
  )
}

export default App

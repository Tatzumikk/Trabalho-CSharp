import './App.css';
import { Routes, Route } from 'react-router-dom'
import Layout from './layout/Layout';
import Categorias from './pages/Categorias';
import Produtos from './pages/Produtos';
import Fornecedores from './pages/Fornecedores';
import Inventario from './pages/Inventario';
import Home from './pages/Home'
import Participantes from './pages/Participantes';

function App() {
  return (
  <>
    <Routes>
       <Route path="/" element={<Layout><Home/></Layout>} />
       <Route path="/categorias" element={<Layout><Categorias/></Layout>} />
       <Route path="/produtos" element={<Layout><Produtos/></Layout>} />
       <Route path="/fornecedores" element={<Layout><Fornecedores/></Layout>} />
       <Route path="/inventario" element={<Layout><Inventario></Inventario></Layout>} />
       <Route path="/participantes" element={<Layout><Participantes></Participantes></Layout>} />
    </Routes>
  </>
  );
}
export default App;

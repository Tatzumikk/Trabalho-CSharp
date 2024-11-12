import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Categoria from './pages/categoria/Index';
import Fornecedor from './pages/fornecedor/Index';
import Inventario from './pages/inventario/Index';
import Produto from './pages/produto/Index';

function App() {
  return (
    <>
        <Routes>
          <Route path='/categoria' element={<Categoria />} />
          <Route path='/fornecedor' element={<Fornecedor />} />
          <Route path='/inventario' element={<Inventario />} />
          <Route path='/produto' element={<Produto />} />
        </Routes>
    </>
  );
}

export default App;
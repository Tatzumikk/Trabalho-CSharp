import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CategoriaCrud() {
  const [categorias, setCategorias] = useState([]);
  const [descricao, setDescricao] = useState('');
  const [selectedCategoria, setSelectedCategoria] = useState(null);

  useEffect(() => {
    // Carrega todas as categorias ao montar o componente
    axios.get('/categorias')
      .then(response => setCategorias(response.data))
      .catch(error => console.error('Erro ao carregar categorias:', error));
  }, []);

  const handleAddCategoria = () => {
    const novaCategoria = { descricao };
    axios.post('/categorias', novaCategoria)
      .then(response => {
        setCategorias([...categorias, response.data]);
        limparCampos();
      })
      .catch(error => console.error('Erro ao adicionar categoria:', error));
  };

  const handleUpdateCategoria = (id) => {
    const categoriaAtualizada = { descricao };
    axios.put(`/categorias/${id}`, categoriaAtualizada)
      .then(() => {
        setCategorias(categorias.map(c => (c.id === id ? { ...c, descricao } : c)));
        limparCampos();
        setSelectedCategoria(null);
      })
      .catch(error => console.error('Erro ao atualizar categoria:', error));
  };

  const handleDeleteCategoria = (id) => {
    axios.delete(`/categorias/${id}`)
      .then(() => {
        setCategorias(categorias.filter(c => c.id !== id));
      })
      .catch(error => console.error('Erro ao deletar categoria:', error));
  };

  const limparCampos = () => {
    setDescricao('');
  };

  return (
    <div>
      <h1>Gerenciamento de Categorias</h1>

      {/* Formulário para adicionar/atualizar categorias */}
      <div>
        <input
          type="text"
          placeholder="Descrição da Categoria"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
        {selectedCategoria ? (
          <button onClick={() => handleUpdateCategoria(selectedCategoria.id)}>
            Atualizar Categoria
          </button>
        ) : (
          <button onClick={handleAddCategoria}>Adicionar Categoria</button>
        )}
      </div>

      {/* Lista de categorias */}
      <div>
        <h2>Lista de Categorias</h2>
        <ul>
          {categorias.map(categoria => (
            <li key={categoria.id}>
              {categoria.descricao}
              <button onClick={() => {
                setSelectedCategoria(categoria);
                setDescricao(categoria.descricao);
              }}>Editar</button>
              <button onClick={() => handleDeleteCategoria(categoria.id)}>Deletar</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CategoriaCrud;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const ProductManagementDashboard = () => {
  const [categorias, setCategorias] = useState([]);
  const [newCategoria, setNewCategoria] = useState('');
  const [editCategoria, setEditCategoria] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  // Função para carregar as categorias
  const loadCategorias = () => {
    axios.get('/categorias')
      .then(response => {
        console.log(response.data); // Verifique o que está sendo retornado
        setCategorias(response.data);
      })
      .catch(error => console.error('Erro ao carregar categorias:', error));
  };
  

  useEffect(() => {
    loadCategorias();
  }, []);

  // Função para criar nova categoria
  const handleCreateCategoria = () => {
    if (newCategoria) {
      axios.post('/categorias', { nome: newCategoria })
        .then(response => {
          setNewCategoria('');
          loadCategorias();
        })
        .catch(error => console.error('Erro ao criar categoria:', error));
    }
  };

  // Função para editar categoria
  const handleEditCategoria = (id) => {
    setIsEditing(true);
    const categoria = categorias.find(c => c.id === id);
    setEditCategoria(categoria.nome);
  };

  // Função para salvar categoria editada
  const handleSaveEditCategoria = (id) => {
    axios.put(`/categorias/${id}`, { nome: editCategoria })
      .then(response => {
        setEditCategoria('');
        setIsEditing(false);
        loadCategorias();
      })
      .catch(error => console.error('Erro ao atualizar categoria:', error));
  };

  // Função para excluir categoria
  const handleDeleteCategoria = (id) => {
    axios.delete(`/categorias/${id}`)
      .then(response => loadCategorias())
      .catch(error => console.error('Erro ao excluir categoria:', error));
  };

  return (
    <div>
      {/* Menu superior */}
      <div className="navbar">
        <a href="/categorias">Categorias</a>
        <a href="/fornecedores">Fornecedores</a>
        <a href="/produtos">Produtos</a>
        <a href="/inventarios">Inventários</a>
      </div>

      {/* Título */}
      <h1>Gestão de Categorias</h1>

      {/* Criação de Nova Categoria */}
      <div className="create-category">
        <input
          type="text"
          placeholder="Nome da categoria"
          value={newCategoria}
          onChange={(e) => setNewCategoria(e.target.value)}
        />
        <button onClick={handleCreateCategoria}>Criar Categoria</button>
      </div>

      {/* Listagem de Categorias */}
      <div>
        <h2>Categorias</h2>
        <ul>
          {categorias.map(categoria => (
            <li key={categoria.id}>
              {isEditing && editCategoria === categoria.descricao ? (
                <div>
                  <input
                    type="text"
                    value={editCategoria}
                    onChange={(e) => setEditCategoria(e.target.value)}
                  />
                  <button onClick={() => handleSaveEditCategoria(categoria.id)}>Salvar</button>
                </div>
              ) : (
                <div>
                  {categoria.descricao} {categoria.id}
                  <button onClick={() => handleEditCategoria(categoria.id)}>Editar</button>
                  <button onClick={() => handleDeleteCategoria(categoria.id)}>Deletar</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductManagementDashboard;

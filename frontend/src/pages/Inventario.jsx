import React, { useState, useEffect } from "react";
import axios from "axios";

function Inventario() {
  // Estado inicial do inventário
  const [inventario, setInventario] = useState({
    id: 0,
    nomeProduto: "",
    descricao: "",
    quantidade: 0,
  });

  // Estado para armazenar todos os itens do inventário
  const [inventarios, setInventarios] = useState([]);
  const [idBusca, setIdBusca] = useState("");
  const [inventarioEncontrado, setInventarioEncontrado] = useState(null);
  // Função para atualizar o estado do inventário conforme o usuário digita no input
  function aoAlterarInventario(event) {
    const { name, value } = event.target;
    setInventario((prevInventario) => ({
      ...prevInventario,
      [name]: value,
    }));
  }

  // Função para salvar o item no banco de dados
  function salvar(event) {
    event.preventDefault();

    if (inventario.id) {
      // Atualizar item existente (PUT)
      axios
        .put(`http://localhost:5033/inventarios/inventarios/${inventario.id}`, inventario)
        .then(() => {
          listarInventarios();
          limparFormulario();
        })
        .catch((error) => {
          console.error("Erro ao atualizar inventário:", error);
          alert("Erro ao atualizar item. Verifique o console.");
        });
    } else {
      // Adicionar novo item (POST)
      axios
        .post("http://localhost:5033/inventarios/inventarios", inventario)
        .then(() => {
          listarInventarios();
          limparFormulario();
        })
        .catch((error) => {
          console.error("Erro ao salvar inventário:", error);
          alert("Erro ao salvar item. Verifique o console.");
        });
    }
  }

  // Função para listar todos os itens do inventário
  function listarInventarios() {
    axios
      .get("http://localhost:5033/inventarios/inventarios")
      .then((resposta) => {
        setInventarios(resposta.data);
      })
      .catch((error) => console.error("Erro ao listar inventários:", error));
  }

  // Função para limpar o formulário
  function limparFormulario() {
    setInventario({
      id: 0,
      nomeProduto: "",
      descricao: "",
      quantidade: 0,
    });
  }

  // Função para cancelar a operação
  function cancelar(event) {
    event.preventDefault();
    limparFormulario();
  }

  // useEffect para carregar os itens do inventário ao montar o componente
  useEffect(() => {
    listarInventarios();
  }, []);

  // Função para carregar os dados do inventário no formulário de edição
  function editarInventario(id) {
    axios
      .get(`http://localhost:5033/inventarios/inventarios/${id}`)
      .then((response) => {
        setInventario(response.data);
      })
      .catch((error) => console.error("Erro ao buscar inventário para editar:", error));
  }

  // Função para excluir um item do inventário
  function excluirInventario(id) {
    axios
      .delete(`http://localhost:5033/inventarios/inventarios/${id}`)
      .then(() => {
        listarInventarios();
      })
      .catch((error) => console.error("Erro ao excluir o inventário:", error));
  }

  function buscarInventario() {
    if (!idBusca) {
      alert("Por favor, insira um ID válido.");
      return;
    }

    axios.get(`http://localhost:5033/inventarios/inventarios/${idBusca}`)
    .then((response) => {
      setInventarioEncontrado(response.data);
      console.log("Inventário encontardo:", response.data);
    })
    .catch((error) => {
      console.error("Erro ao buscar o inventário:", error);
      alert("Inventário não encontrado.");
    })
  }

  // Formulário e lista de inventários
  return (
    <div>
      <h1>Cadastro de Inventário</h1>
      <form>
        {inventario.id !== 0 && (
          <div>
            <label htmlFor="idInventario">Id</label>
            <input
              type="number"
              id="idInventario"
              name="id"
              value={inventario.id}
              onChange={aoAlterarInventario}
              disabled
            />
          </div>
        )}
        <div>
          <label htmlFor="nomeProduto">Nome do Produto</label>
          <input
            type="text"
            id="nomeProduto"
            name="nomeProduto"
            value={inventario.nomeProduto}
            onChange={aoAlterarInventario}
          />
        </div>
        <div>
          <label htmlFor="descricao">Descrição</label>
          <input
            type="text"
            id="descricao"
            name="descricao"
            value={inventario.descricao}
            onChange={aoAlterarInventario}
          />
        </div>
        <div>
          <label htmlFor="quantidade">Quantidade</label>
          <input
            type="number"
            id="quantidade"
            name="quantidade"
            value={inventario.quantidade}
            onChange={aoAlterarInventario}
          />
        </div>
        <button type="button" onClick={salvar}>Salvar</button>
        <button type="button" onClick={cancelar}>Cancelar</button>
      </form>

      <hr />

      <h3>Itens no Inventário</h3>
      <ul>
        {inventarios.map((item) => (
          <li key={item.id}>
            <p>
              {item.id} {item.nomeProduto} - {item.descricao} - {item.quantidade} unidades
            </p>
            <button onClick={() => editarInventario(item.id)}>Editar</button>
            <button onClick={() => excluirInventario(item.id)}>Excluir</button>
          </li>
        ))}
      </ul>

      <h3>Buscar inventário por Id</h3>
      <label htmlFor="idBusca">ID: </label>
      <input type="number" id="idBusca" value={idBusca} onChange={(e) => setIdBusca(e.target.value)}></input>
      <button type="button" onClick={buscarInventario}>Buscar</button>

      {inventarioEncontrado && (
        <div> 
          <h4>Detalhes do inventário encontrado</h4>
          <p><strong>ID:</strong>{inventarioEncontrado.id}</p>
          <p><strong>Nome do Produto:</strong>{inventarioEncontrado.nomeProduto}</p>
          <p><strong>Descrição:</strong>{inventarioEncontrado.descricao}</p>
          <p><strong>Quantidade:</strong>{inventarioEncontrado.quantidade}</p>
        </div>
      )}
    </div>
  );
}

export default Inventario;
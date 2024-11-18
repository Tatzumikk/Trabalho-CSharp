import React, { useState, useEffect } from "react";
import axios from "axios";

function Formulario() {
  const [produto, setProduto] = useState({
    id: 0,
    nomeProduto: "",
    codigoProduto: "",
    preco: 0.0,
  });
  const [produtos, setProdutos] = useState([]); // Lista de produtos
  const [idBusca, setIdBusca] = useState(""); // ID para busca
  const [produtoEncontrado, setProdutoEncontrado] = useState(null); // Produto encontrado pela busca

  useEffect(() => {
    listarProdutos(); // Carrega os produtos ao montar o componente
  }, []);

  function listarProdutos() {
    axios
      .get("http://localhost:5033/produtos/produtos")
      .then((resposta) => setProdutos(resposta.data)) // Atualiza a lista de produtos
      .catch((error) => console.error("Erro ao listar produtos:", error));
  }

  function buscarProduto() {
    if (!idBusca) {
      alert("Por favor, insira um ID válido.");
      return;
    }

    axios
      .get(`http://localhost:5033/produtos/produtos/${idBusca}`)
      .then((response) => {
        setProdutoEncontrado(response.data); // Armazena o produto buscado
        console.log("Produto encontrado:", response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar o produto:", error);
        alert("Produto não encontrado.");
      });
  }

  function aoAlterarProduto(event) {
    const { name, value } = event.target;
    setProduto((prevProduto) => ({
      ...prevProduto,
      [name]: value,
    }));
  }

  function salvar(event) {
    event.preventDefault();
    if (produto.id) {
      axios
        .put(`http://localhost:5033/produtos/produtos/${produto.id}`, produto)
        .then(() => {
          listarProdutos();
          limparFormulario();
        })
        .catch((error) => console.error("Erro ao atualizar produto:", error));
    } else {
      axios
        .post("http://localhost:5033/produtos", produto)
        .then(() => {
          listarProdutos();
          limparFormulario();
        })
        .catch((error) => console.error("Erro ao salvar produto:", error));
    }
  }

  function limparFormulario() {
    setProduto({
      id: 0,
      nomeProduto: "",
      codigoProduto: "",
      preco: 0.0,
    });
  }

  function excluirProduto(id){
    if (!window.confirm("Tem certeza que deseja excluir este produto?")) {
      return; // Cancela a exclusão se o usuário não confirmar
    }
  
    axios
      .delete(`http://localhost:5033/produtos/produtos/${id}`)
      .then(() => {
        listarProdutos(); // Atualiza a lista após excluir
        alert("Produto excluído com sucesso!");
      })
      .catch((error) => console.error("Erro ao excluir o produto:", error));
  }
  function cancelar(event) {
    event.preventDefault();
    limparFormulario();
    setProdutoEncontrado(null); // Limpa o estado do produto buscado ao cancelar
  }

  return (
    <div>
      <h1>Cadastro de produtos</h1>
      {/* Formulário de cadastro */}
      <form>
        {produto.id !== 0 && (
          <div>
            <label htmlFor="idProduto">Id</label>
            <input
              type="number"
              id="idProduto"
              name="id"
              value={produto.id}
              onChange={aoAlterarProduto}
              disabled
            />
          </div>
        )}
        <div>
          <label htmlFor="nomeProduto">Nome</label>
          <input
            type="text"
            id="nomeProduto"
            name="nomeProduto"
            value={produto.nomeProduto}
            onChange={aoAlterarProduto}
          />
        </div>
        <div>
          <label htmlFor="codigoProduto">Código do Produto</label>
          <input
            type="text"
            id="codigoProduto"
            name="codigoProduto"
            value={produto.codigoProduto}
            onChange={aoAlterarProduto}
          />
        </div>
        <div>
          <label htmlFor="preco">Preço</label>
          <input
            type="number"
            id="preco"
            name="preco"
            value={produto.preco}
            onChange={aoAlterarProduto}
          />
        </div>
        <button type="button" onClick={salvar}>Salvar</button>
        <button type="button" onClick={cancelar}>Cancelar</button>
      </form>

      <hr />

      {/* Lista de produtos */}
      <h3>Produtos Cadastrados</h3>
      <ul>
        {produtos.map((prod) => (
          <li key={prod.id}>
            <p>
              {prod.id} {prod.nomeProduto} - {prod.codigoProduto} - R${prod.preco.toFixed(2)}
            </p>
            <button onClick={() => setProduto(prod)}>Editar</button>
            <button onClick={() => excluirProduto(prod.id)}>Excluir</button>
          </li>
        ))}
      </ul>

      <hr />

      {/* Busca de produto */}
      <h4>Buscar produto por Id</h4>
      <label htmlFor="idBusca">ID: </label>
      <input
        type="number"
        id="idBusca"
        value={idBusca}
        onChange={(e) => setIdBusca(e.target.value)}
      />
      <button type="button" onClick={buscarProduto}>Buscar</button>

      {/* Exibição do produto encontrado */}
      {produtoEncontrado && (
        <div>
          <h5>Detalhes do produto encontrado</h5>
          <p><strong>ID:</strong> {produtoEncontrado.id}</p>
          <p><strong>Nome:</strong> {produtoEncontrado.nomeProduto}</p>
          <p><strong>Código:</strong> {produtoEncontrado.codigoProduto}</p>
          <p><strong>Preço:</strong> R${produtoEncontrado.preco.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
}

export default Formulario;

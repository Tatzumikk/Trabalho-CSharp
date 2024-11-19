import axios from "axios";
import { useState, useEffect } from "react";

function Categorias() {
  const [categoria, setCategoria] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [idBusca, setIdBusca] = useState("");
  const [categoriaEncontrada, setCategoriaEncontrada] = useState(null);

  function listarCategorias() {
    axios.get("http://localhost:5033/categorias/categorias").then((resposta) => {
      setCategorias(resposta.data);
    });
  }

  useEffect(listarCategorias, []);


  function excluir(id) {
    axios.delete("http://localhost:5033/categorias/categorias/" + id).then(() => {
      listarCategorias();
    });
  }

  function Linha(index, categoria) {
    return (
      <tr key={index}>
        <td>{categoria.id}</td>
        <td>{categoria.descricao}</td>
        <td>
          <button
            onClick={() => {
              excluir(categoria.id);
            }}
          >
            Excluir
          </button>
          <button
            onClick={() => {
              editar(categoria);
            }}
          >
            Editar
          </button>
        </td>
      </tr>
    );
  }

  function Linhas(categorias) {
    return categorias.map((categoria, index) => Linha(index, categoria));
  }

  function cancelar() {
    setCategoria(null);
  }

  function aoAlterarCategoria(e) {
    const { name, value, type, checked } = e.target;
    setCategoria((prevCategoria) => ({
      ...prevCategoria,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function editar(categoria) {
    setCategoria({ ...categoria });
  }

  function salvar(e) {
    e.preventDefault();
    if (categoria.id) {
      axios
        .put("http://localhost:5033/categorias/categorias/" + categoria.id, categoria)
        .then(() => listarCategorias());
    } else {
      axios.post("http://localhost:5033/categorias/categorias", categoria).then(() => listarCategorias());
    }
    cancelar();
  }

  function Formulario() {
    return (
      <form onSubmit={salvar}>
        <label htmlFor="descricao">Descrição</label>
        <input
          type="text"
          id="descricao"
          name="descricao"
          value={categoria.descricao || ""}
          onChange={aoAlterarCategoria}
        />
        <button type="submit">Salvar</button>
        <button type="button" onClick={cancelar}>Cancelar</button>
      </form>
    );
  }

  function novaCategoria() {
    setCategoria({ descricao: "", concluida: false });
  }

  function buscarCategoria(){
    if (!idBusca) {
      alert("Por favor, insira um ID válido.");
      return;
    }
    
    axios.get(`http://localhost:5033/categorias/categorias/${idBusca}`)
    .then((response) => {
      setCategoriaEncontrada(response.data);
      console.log("Produto encontrado:",response.data);
    })
    .catch((error) => {
      console.error("Erro ao buscar o produto:", error);
      alert("Produto não encontrado.");
    })
  }

  function Tabela(categorias) {
    return (
      <>
        <button onClick={novaCategoria}>Nova Categoria</button>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Categoria</th>
            </tr>
          </thead>
          <tbody>{Linhas(categorias)}</tbody>
        </table>
      </>
    );
  }

  function conteudoPrincipal() {
    if (categoria == null) {
      return Tabela(categorias);
    } else {
      return Formulario();
    }
  }

  return (
    <div>
      <h1>Cadastro de Categorias</h1>
      {conteudoPrincipal()}
      <h2>Buscar categorias por Id</h2>
      <label htmlFor="idBusca">ID: </label>
      <input
        type="number"
        id="idBusca"
        value={idBusca}
        onChange={(e)=>setIdBusca(e.target.value)}
      />
      <button type="button" onClick={buscarCategoria}>Buscar</button>
      {categoriaEncontrada && (
        <div>
        <h3>Detalhes da categoria encontrada</h3>
        <p><strong>ID:</strong> {categoriaEncontrada.id} </p>
        <p><strong>Descrição:</strong>{categoriaEncontrada.descricao}</p>
        </div>
      )}
    </div>
  );
}

export default Categorias;

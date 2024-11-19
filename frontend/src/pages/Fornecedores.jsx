import axios from "axios";
import { useEffect, useState } from "react";
    
    function FormularioFornecedor(){

    const [fornecedor, setFornecedor] = useState({
            id: 0,
            nomeFornecedor: "",
            produtoFornecido: "",
            codigoFornecedor: "",
        });
    
    const [fornecedores, setFornecedores] = useState([]);
    const [idBusca, setIdBusca] = useState(""); 
    const [fornecedorEncontrado, setFornecedorEncontrado] = useState(null); 

    function aoAlterarFornecedor(event) {
        const {name, value} = event.target;
        setFornecedor((prevFornecedor) => ({
            ...prevFornecedor,
            [name]: value,
        }));
    }

    function salvar(event) {
        event.preventDefault();

        if(fornecedor.id) {
            axios.put(`http://localhost:5033/fornecedores/fornecedores/${fornecedor.id}`, fornecedor).then(() => {
                listarFornecedores();
                limparFormulario();
            }).catch((error) => {
                console.error("Error ao atualizar fornecedor: ", error);
            });
        } else {
            axios.post("http://localhost:5033/fornecedores/fornecedores", fornecedor).then(() => {
                listarFornecedores();
                limparFormulario();
            }).catch((error) => {
                console.error("Erro ao salvar fornecedor: ", error);
            });
        }
    }

    function listarFornecedores(){
        axios.get("http://localhost:5033/fornecedores/fornecedores")
        .then((resposta) => {
            setFornecedores(resposta.data);
        })
        .catch((error)=>console.error("Erro ao listar fornecedores: ", error));
    }

    function limparFormulario(){
        setFornecedor({
            id: 0,
            nomeFornecedor: "",
            produtoFornecido: "",
            codigoFornecedor: "",
        });
    }

    useEffect(() => {
        listarFornecedores();
    }, []);

    function editarFornecedor(id) {
        axios.get(`http://localhost:5033/fornecedores/fornecedores/${id}`)
        .then((response) => {
            setFornecedor(response.data);
        })
        .catch((error) => console.error("Erro ao buscar produto para editar: ", error));
    }
   

    function excluirFornecedor(id){
        axios.delete("http://localhost:5033/fornecedores/fornecedores/" + id).then(() => {
            listarFornecedores();
        })
        .catch((error)=> console.error("Erro ao excluir fornecedor: "+error));
    }

    function cancelar(){
        limparFormulario();
    }

    function buscarFornecedor(){
      if (!idBusca) {
        alert("Por favor, insira um ID válido.");
        return;
      }

      axios.get(`http://localhost:5033/fornecedores/fornecedores/${idBusca}`)
      .then((response) => {
        setFornecedorEncontrado(response.data);
        console.log("Fornecedor encontrado:",response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar o fornecedor:",error);
        alert("Fornecedor não encontrado")
      })
    }

    return (
       <div>
      <h1>Cadastro de Fornecedores</h1>
      <form>
        {fornecedor.id !== 0 && (
          <div>
            <label htmlFor="idProduto">Id</label>
            <input
              type="number"
              id="idFornecedor"
              name="id"
              value={fornecedor.id}
              onChange={aoAlterarFornecedor}
              disabled // Desabilitado para evitar edição
            />
          </div>
        )}
        <div>
          <label htmlFor="nomeFornecedor">Nome do Fornecedor</label>
          <input
            type="text"
            id="nomeFornecedor"
            name="nomeFornecedor"
            value={fornecedor.nomeFornecedor}
            onChange={aoAlterarFornecedor}
          />
        </div>
        <div>
          <label htmlFor="produtoFornecido">Produto fornecido</label>
          <input
            type="text"
            id="produtoFornecido"
            name="produtoFornecido"
            value={fornecedor.produtoFornecido}
            onChange={aoAlterarFornecedor}
          />
        </div>
        <div>
          <label htmlFor="codigoFornecedor">Código do fornecedor</label>
          <input
            type="text"
            id="codigoFornecedor"
            name="codigoFornecedor"
            value={fornecedor.codigoFornecedor}
            onChange={aoAlterarFornecedor}
          />
        </div>
        {/* Corrigir tipo de botão */}
        <button type="button" onClick={salvar}>Salvar</button>
        <button type="button" onClick={cancelar}>Cancelar</button>
      </form>

      <hr />

      {/* Lista de produtos */}
      <h3>Fornecedores Cadastrados</h3>
      <ul>
        {fornecedores.map((forn) => (
          <li key={forn.id}>
            <p>
              {forn.id} {forn.nomeFornecedor} - {forn.produtoFornecido} - {forn.codigoFornecedor}
            </p>
            <button onClick={() => editarFornecedor(forn.id)}>Editar</button>
            <button onClick={() => excluirFornecedor(forn.id)}>Excluir</button>
          </li>
        ))}
      </ul>
      <h4>Buscar fornecedor por ID</h4>
      <label htmlFor="idBusca">ID: </label>
      <input 
        type="number"
        id="idBusca"
        value={idBusca}
        onChange={(e) => setIdBusca(e.target.value)}
      />
      <button type="button" onClick={buscarFornecedor}>Buscar</button> 
      {fornecedorEncontrado && (
        <div> 
          <h5>Detalhes do fornecedor encontrado</h5>
          <p><strong>ID:</strong>{fornecedorEncontrado.id}</p>
          <p><strong>Nome do fornecedor:</strong>{fornecedorEncontrado.nomeFornecedor}</p>
          <p><strong>Produto fornecido:</strong>{fornecedorEncontrado.produtoFornecido}</p>
          <p><strong>Código do fornecedor:</strong>{fornecedorEncontrado.codigoFornecedor}</p>
        </div>
      )}
    </div>
  );
} 
export default FormularioFornecedor;
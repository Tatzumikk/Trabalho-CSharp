import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./Style.css";

export default function Categoria() {
    const [categoriaId, setCategoriaId] = useState('');
    const [descricao, setDescricao] = useState('');
    const [response, setResponse] = useState(null);

    // Função para buscar uma categoria
    const buscarCategoria = async () => {
        try {
            const res = await fetch(`/categorias/${categoriaId}`);
            const data = await res.json();
            setResponse(data);
        } catch (error) {
            console.error('Erro ao buscar categoria:', error);
        }
    };

    // Função para criar uma categoria
    const criarCategoria = async () => {
        try {
            const res = await fetch(`/categorias`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: categoriaId, descricao })
            });
            const data = await res.json();
            setResponse(data);
        } catch (error) {
            console.error('Erro ao criar categoria:', error);
        }
    };

    // Função para atualizar uma categoria
    const atualizarCategoria = async () => {
        try {
            const res = await fetch(`/categorias/${categoriaId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ descricao })
            });
            if (res.status === 204) {
                setResponse('Categoria atualizada com sucesso!');
            }
        } catch (error) {
            console.error('Erro ao atualizar categoria:', error);
        }
    };

    // Função para deletar uma categoria
    const deletarCategoria = async () => {
        try {
            const res = await fetch(`/categorias/${categoriaId}`, {
                method: 'DELETE'
            });
            if (res.status === 204) {
                setResponse('Categoria deletada com sucesso!');
            }
        } catch (error) {
            console.error('Erro ao deletar categoria:', error);
        }
    };

    return (
        <div className='body'>
            <h1 className='titulo'>CRUD de Categoria</h1>

            <div className='cards'>
                <div className='card'>
                    <h4 className='tituloCard'>Buscar Categoria - GET</h4>
                    <input 
                        className='inputCard' 
                        type="number" 
                        placeholder='Insira o ID da Categoria'
                        value={categoriaId}
                        onChange={e => setCategoriaId(e.target.value)} 
                    />
                    <button onClick={buscarCategoria}>Buscar</button>
                </div>
                
                <div className='card'>
                    <h4 className='tituloCard'>Inserir Categoria - POST</h4>
                    <input 
                        className='inputCard' 
                        type="number" 
                        placeholder='Insira o ID da Categoria'
                        value={categoriaId}
                        onChange={e => setCategoriaId(e.target.value)} 
                    />
                    <input 
                        className='inputCard' 
                        type="text" 
                        placeholder='Insira a descrição da Categoria'
                        value={descricao}
                        onChange={e => setDescricao(e.target.value)} 
                    />
                    <button onClick={criarCategoria}>Inserir</button>
                </div>
                
                <div className='card'>
                    <h4 className='tituloCard'>Atualizar Categoria - PUT</h4>
                    <input 
                        className='inputCard' 
                        type="number" 
                        placeholder='Insira o ID da Categoria'
                        value={categoriaId}
                        onChange={e => setCategoriaId(e.target.value)} 
                    />
                    <input 
                        className='inputCard' 
                        type="text" 
                        placeholder='Insira a nova descrição da Categoria'
                        value={descricao}
                        onChange={e => setDescricao(e.target.value)} 
                    />
                    <button onClick={atualizarCategoria}>Atualizar</button>
                </div>
                
                <div className='card'>
                    <h4 className='tituloCard'>Deletar Categoria - DELETE</h4>
                    <input 
                        className='inputCard' 
                        type="number" 
                        placeholder='Insira o ID da Categoria'
                        value={categoriaId}
                        onChange={e => setCategoriaId(e.target.value)} 
                    />
                    <button onClick={deletarCategoria}>Deletar</button>
                </div>
            </div>

            {response && <div className='response'><pre>{JSON.stringify(response, null, 2)}</pre></div>}
        </div>
    );
}

import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./Style.css"

export default function Produto() {

    return (
        <>
            <div className='body'>
                <h1 className='titulo'>CRUD do Livro</h1>

                <div className='cards'>
                    <div className='card'>
                        <h4 className='tituloCard'>Procure por um Livro - GET</h4>
                        <input className='inputCard' type="number" placeholder='Insira o ID do Livro' />
                    </div>
                    <div className='card'>
                        <h4 className='tituloCard'>Insira um Livro - POST</h4>
                        <input className='inputCard' type="number" placeholder='Insira o ID do Livro' />
                        <input className='inputCard' type="text" placeholder='Insira o titulo do Livro' />
                        <input className='inputCard' type="text" placeholder='Insira o autor do Livro' />
                        <input className='inputCard' type="text" placeholder='Insira a editora do Livro' />
                    </div>
                    <div className='card'>
                        <h4 className='tituloCard'>Atualize um Livro - UPDATE</h4>
                        <input className='inputCard' type="number" placeholder='Insira o ID do Livro' />
                        <input className='inputCard' type="text" placeholder='Insira o titulo do Livro' />
                        <input className='inputCard' type="text" placeholder='Insira o autor do Livro' />
                        <input className='inputCard' type="text" placeholder='Insira a editora do Livro' />
                    </div>
                    <div className='card'>
                        <h4 className='tituloCard'>Delete um Livro - DELETE</h4>
                        <input className='inputCard' type="number" placeholder='Insira o ID do Livro' />
                    </div>
                </div>
            </div>
        </>
    );
}
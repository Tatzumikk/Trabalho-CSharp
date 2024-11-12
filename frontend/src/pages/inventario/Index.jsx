import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./Style.css"

export default function Inventario() {

    return (
        <>
            <div className='body'>
                <h1 className='titulo'>CRUD do Editora</h1>

                <div className='cards'>
                    <div className='card'>
                        <h4 className='tituloCard'>Procure por um Editora - GET</h4>
                        <input className='inputCard' type="number" placeholder='Insira o ID do Editora' />
                    </div>
                    <div className='card'>
                        <h4 className='tituloCard'>Insira um Editora - POST</h4>
                        <input className='inputCard' type="number" placeholder='Insira o ID do Editora' />
                        <input className='inputCard' type="text" placeholder='Insira o nome do Editora' />
                    </div>
                    <div className='card'>
                        <h4 className='tituloCard'>Atualize um Editora - UPDATE</h4>
                        <input className='inputCard' type="number" placeholder='Insira o ID do Editora' />
                        <input className='inputCard' type="text" placeholder='Insira o nome do Editora' />
                    </div>
                    <div className='card'>
                        <h4 className='tituloCard'>Delete um Editora - DELETE</h4>
                        <input className='inputCard' type="number" placeholder='Insira o ID do Editora' />
                    </div>
                </div>
            </div>
        </>
    );
}
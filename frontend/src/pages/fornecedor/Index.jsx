import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./Style.css"

export default function Fornecedor() {

    return (
        <>
            <div className='body'>
                <h1 className='titulo'>CRUD do Cliente</h1>

                <div className='cards'>
                    <div className='card'>
                        <h4 className='tituloCard'>Procure por um Cliente - GET</h4>
                        <input className='inputCard' type="number" placeholder='Insira o ID do Cliente' />
                    </div>
                    <div className='card'>
                        <h4 className='tituloCard'>Insira um Cliente - POST</h4>
                        <input className='inputCard' type="number" placeholder='Insira o ID do Cliente' />
                        <input className='inputCard' type="text" placeholder='Insira o nome do Cliente' />
                        <input className='inputCard' type="text" placeholder='Insira o email do Cliente' />
                    </div>
                    <div className='card'>
                        <h4 className='tituloCard'>Atualize um Cliente - UPDATE</h4>
                        <input className='inputCard' type="number" placeholder='Insira o ID do Cliente' />
                        <input className='inputCard' type="text" placeholder='Insira o nome do Cliente' />
                        <input className='inputCard' type="text" placeholder='Insira o email do Cliente' />
                    </div>
                    <div className='card'>
                        <h4 className='tituloCard'>Delete um Cliente - DELETE</h4>
                        <input className='inputCard' type="number" placeholder='Insira o ID do Cliente' />
                    </div>
                </div>
            </div>
        </>
    );
}
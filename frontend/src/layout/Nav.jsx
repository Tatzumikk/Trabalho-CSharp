import { NavLink } from "react-router-dom";

function NavApp(){
    return(
        <nav className="main-nav">
        <ul>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/categorias">Categorias</NavLink></li>
            <li><NavLink to="/produtos">Produtos</NavLink></li>
            <li><NavLink to="/fornecedores">Fornecedores</NavLink></li>
            <li><NavLink to="/inventario">Inventário</NavLink></li>
        </ul>
    </nav>
    );
}
export default NavApp;
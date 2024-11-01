import { NavLink } from "react-router-dom";

function NavApp(){
    return(
        <nav class="main-nav">
        <ul>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/tarefas">Tarefas</NavLink></li>
            <li><NavLink to="/page3">Página 3</NavLink></li>
        </ul>
    </nav>
    );
}
export default NavApp;
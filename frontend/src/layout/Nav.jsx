import { NavLink } from "react-router-dom";

function NavApp(){
    return(
        <nav class="main-nav">
        <ul>
            <li><NavLink to="/">Home</NavLink></li>
                  </ul>
    </nav>
    );
}
export default NavApp;
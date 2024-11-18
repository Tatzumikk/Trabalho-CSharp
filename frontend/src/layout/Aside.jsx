import { NavLink } from "react-router-dom";
function AsideApp(){
    return (
        <aside className="side">
          <NavLink to="/participantes" className="link">
            Participantes da equipe
          </NavLink>
        </aside>
      );
    }
export default AsideApp;
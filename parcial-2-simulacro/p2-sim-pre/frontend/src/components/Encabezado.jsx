import { NavLink } from 'react-router-dom';

export default function Encabezado() {
    return (
        <header className="bg-dark text-white py-3 mb-4">
            <div className="container py-5 h-100 position-relative">
                <div className="usuario-pill">
                    <i className="bi bi-person-circle"></i>
                    <span>Nombre Apellido</span>
                </div>
                <nav className="mt-3">
                  <ul
                      className="nav nav-pills nav-fill gap-2 p-1 small bg-primary rounded-5 shadow-sm justify-content-center"
                      id="pillNav"
                  >
                      <li className="nav-item">
                          <NavLink
                              to="/juegos/lista"
                              className="nav-link rounded-5"
                              activeclassname="active"
                          >
                              Juegos
                          </NavLink>
                      </li>
                      <li className="nav-item">
                          <NavLink
                              to="/estrenos"
                              className="nav-link rounded-5"
                              activeclassname="active"
                          >
                              Últimos Estrenos
                          </NavLink>
                      </li>
                      <li className="nav-item">
                          <NavLink
                              to="/juegos/nuevo"
                              className="nav-link rounded-5"
                              activeclassname="active"
                          >
                              Nuevo Juego
                          </NavLink>
                      </li>
                  </ul>
                </nav>
            </div>
        </header>
    );
}

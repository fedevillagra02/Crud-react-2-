import './estilos/main.css';
import './Inicio'
import { Link } from 'react-router-dom';


function Main() {
    return (
      <div className="container1">
        <h2>Bienvenido</h2>
        <p>¿Qué deseas hacer?</p>
        <div className="button-container">
          <Link to="/iniciar-sesion">
            <button id="btn2">Iniciar sesión</button>
          </Link>
          <Link to="./Login">
            <button id="btn2">Registrarse</button>
          </Link>
        </div>
      </div>
    );
  }
      

export default Main;

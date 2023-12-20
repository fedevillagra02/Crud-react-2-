import './estilos/registro.css';
import './Inicio'
import { Link } from 'react-router-dom';


function Main() {
  window.location.hash="no-back-button";
  window.location.hash="Again-No-back-button";//esta linea es necesaria para chrome
  window.onhashchange=function(){window.location.hash="no-back-button";}
  return (
      <form className="form">
      <div className="title">Bienvenido<br /><span>Ingrese para continuar</span></div>
      <Link to="/iniciar-sesion"><button className="button-confirm" >Iniciar sesión</button></Link>
      <Link to="./registro"><button className="button-register">Registrar</button></Link>
    </form>

    );
  }
      

export default Main;

import React from 'react';
import App from './App';
import Login from './Login';
import IniciarSesion  from './iniciar-sesion';
import { BrowserRouter,Route,Routes} from 'react-router-dom';
import Main from './Main';

function Inicio() {
  return (
    <div className="Inicio">
      <BrowserRouter>
        <Routes>
        <Route path='/' element={< Main />} />

          <Route path='/iniciar-sesion' element={<IniciarSesion />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/App' element={<App />} />
         
        </Routes>
      </BrowserRouter>
      {/* <Footer /> */}
    </div>
  );
}

export default Inicio;
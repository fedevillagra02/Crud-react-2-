import React from 'react';
import App from './App';
import Registro from './registro';
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
          <Route path='/registro' element={<Registro />} />
          <Route path='/App' element={<App />} />

         
        </Routes>
      </BrowserRouter>
      {/* <Footer /> */}
    </div>
  );
}

export default Inicio;
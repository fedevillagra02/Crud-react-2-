import React, { useState } from 'react';
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import './estilos/Login.css';

import {useNavigate } from 'react-router-dom';



export default function IniciarSesion() {  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const iniciarSesion = () => {

    Axios.post("http://localhost:3001/login", {
      email: email,
      password: password,
    })
    .then(response => {
      const { message, token } = response.data; //recibo del back el mensaje y datos (en cadena)
      if (message === "Inicio exitoso") { //verifico si el mensaje es de inicio exitoso para mandarlo a la pagina de usuario
          localStorage.setItem('token', token); // Almacenar el token en el LocalStorage
          alert('Inicio exitoso');
          navigate(`/App`); //ponemos la url hacia donde lo mandaremos y envio los datos en la variable state.
      } else {
          alert(message) //mostrar mensaje en caso de que las credenciales no sean correctas
      }
  }).catch(e => { alert(e.message) })
}


  return (
    <div id="login-container"> 
    <h1 id='h1'>Iniciar Sesion</h1>
      <input id="input" type="text" placeholder="Correo electrónico" onChange={(event) => setEmail(event.target.value)} />
      <input  id="input"type="password" placeholder="Contraseña" onChange={(event) => setPassword(event.target.value)} />
      <button id="btn1"onClick={iniciarSesion}>Iniciar sesión</button>
    </div>
    
  )
  }
   
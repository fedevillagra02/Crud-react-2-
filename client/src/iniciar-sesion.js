import React, { useState } from 'react';
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import './estilos/registro.css';
import Swal from 'sweetalert2';

import {useNavigate } from 'react-router-dom';



export default function IniciarSesion() {  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const limpiar = () => {
    
  };
  
  const iniciarSesion = () => {
    Axios.post("http://localhost:3001/login", {
      email: email,
      password: password,
    })
      .then(response => {
        const { message, token } = response.data;
        if (message === "Inicio exitoso") {
          localStorage.setItem('token', token);
          const username = localStorage.getItem('username');

          Swal.fire({
            title: "<strong> Inicio exitoso</strong>",
            html: "<i>El usuario <strong>" + username + "</strong> Inicio sesion con éxito</i>",
            icon: 'success',
            timer: 3000
          });
          navigate(`/App`);
        } else {
          Swal.fire({
            title: "<strong> Error al iniciar sesion </strong>",
            icon: 'error',
            timer: 3000
          });
          limpiar();
        }
      })
      .catch(e => { alert(e.message) });
  };


  return (
    <div id="login-container"> 
    <h1 id='h1'>Iniciar Sesion</h1>
      <input className='input' type="text" placeholder="Correo electrónico" onChange={(event) => setEmail(event.target.value)} />
      <input  className='input'type="password"  placeholder="Contraseña" onChange={(event) => setPassword(event.target.value)} />
      <button id="btn1"onClick={iniciarSesion}>Iniciar sesión</button>
    </div>
    
  )
  }
   
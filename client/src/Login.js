import React, { useState } from 'react';
import Axios from "axios";
import './estilos/Login.css';
import {useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();



  
  
  const register = () => {
    Axios.post("http://localhost:3001/register", {
      username: username,
      email: email,
      password: password,
    }).then(() => {
      alert("Empleado registrado");
      
      navigate(`/iniciar-sesion/`);
    });
    
  }
  
  
  return (
    <div id="login-container"> {/* Usa la clase CSS para el contenedor */}
    <h1>Registro </h1>
      <input id="input"type="text" placeholder="Usuario" onChange={(event) => setUsername(event.target.value)} />
      <input id='input' type="text" placeholder="Correo electrónico" onChange={(event) => setEmail(event.target.value)} />
      <input id="input"type="password" placeholder="Contraseña" onChange={(event) => setPassword(event.target.value)} />
      <button id="btn1"onClick={register} >Registrarse</button>

   </div>
    
    




  );



};



export default Login;
          





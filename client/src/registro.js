import React, { useState } from 'react';
import Axios from "axios";
import './estilos/registro.css';
import {useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function Registro() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();



  
  
  const register = () => {
    if (!username || !email || !password) {
      Swal.fire({
        title: 'Error',
        html: 'Por favor, completa todos los campos.',
        icon: 'warning',
        timer: 3000
      });
      return; // Detener la ejecución si falta algún campo
    }
    Axios.post("http://localhost:3001/register", {
      username: username,
      email: email,
      password: password,
    }).then(() => {
      localStorage.setItem('username', username);
      Swal.fire({
        title: "<strong> Registro exitoso</strong>",
        html: "<i>El usuario <strong>" + [username] + "</strong> fue registrado con éxito</i>",
        icon: 'success',
        timer: 3000
      }
      )
      navigate(`/iniciar-sesion/`);
    });
    
  }
  
  
  return (
    <form className="form">
    <div className="title">Bienvenido<br /><span>Registrarse para continuar</span></div>
    <input
      type="text"
      placeholder="Username"
      name="user"
      className="input"
      onChange={(event) => setUsername(event.target.value)}
    />
     <input
      type="email"
      placeholder="Email"
      name="email"
      className="input"
      onChange={(event) => setEmail(event.target.value)}
    />
    <input
      type="password"
      placeholder="Password"
      name="password"
      className="input"
      onChange={(event) => setPassword(event.target.value)}
    />
    <button className="button-confirm" id="registerbtn" onClick={register}>Registrar</button>
  </form>
  );



};



export default Registro;
          





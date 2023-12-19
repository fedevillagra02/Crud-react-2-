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
  const redirectToRegistro = () => {
    navigate('/registro'); 
  };

  const iniciarSesion = () => {
    Axios.post("http://localhost:3001/login", {
      email: email,
      password: password,
    })
      .then(response => {
        const { message, token, datos } = response.data;
  
        if (response.status === 200 && message === "Inicio exitoso") {
          localStorage.setItem('token', token);
          const username = datos.username;
          Swal.fire({
            title: "<strong> Inicio exitoso</strong>",
            html: "<i>El usuario <strong>" + [username] + "</strong> Inició sesión con éxito</i>",
            icon: 'success',
            timer: 3000
          });
          navigate(`/App`);
        } else if (response.status === 401) {
          Swal.fire({
            title: "<strong> Credenciales incorrectas </strong>",
            icon: 'error',
            timer: 3000
          });
        } else if (response.status === 404) {
          Swal.fire({
            title: "<strong> Usuario no encontrado </strong>",
            icon: 'error',
            timer: 3000
          });
        } else {
          Swal.fire({
            title: "<strong> Error al iniciar sesión </strong>",
            icon: 'error',
            timer: 3000
          });
        }
        // Limpiar los campos del input en caso de error de inicio de sesión
        setEmail("");
        setPassword("");
      })
      .catch(error => {
        console.error(error);
        alert("Error al procesar la solicitud. Por favor, inténtalo de nuevo.");
      });
  };


  return (
    <form className="form">
      <div className="title">Bienvenido<br /><span>Ingrese para continuar</span></div>
      <input
        type="email"
        placeholder="Email"
        name="email"
        className="input"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        name="password"
        className="input"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <button className="button-confirm" onClick={iniciarSesion}>Iniciar sesión</button>
      <button className="button-register" onClick={redirectToRegistro}>Registrar</button>
    </form>
  )
  }
   
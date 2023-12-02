
          
 
import React, { useState } from 'react';
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import './Login.css';

function Login() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");



  
  
  const register = () => {
    Axios.post("http://localhost:3001/register", {
      username: username,
      email: email,
      password: password,
    }).then(() => {
      alert("Empleado registrado");
    });
    
  }
 
 
  
  
  
  return (
    <div className="login-container"> {/* Usa la clase CSS para el contenedor */}
      <input type="text" placeholder="Usuario" onChange={(event) => setUsername(event.target.value)} />
      <input type="text" placeholder="Correo electrónico" onChange={(event) => setEmail(event.target.value)} />
      <input type="password" placeholder="Contraseña" onChange={(event) => setPassword(event.target.value)} />
      <button onClick={register} >Registrarse</button>
    </div>
  );
};



export default Login;




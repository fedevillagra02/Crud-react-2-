const express = require("express");
const app=express();
const mysql= require("mysql");
const cors = require("cors");
const generarToken = require("./auth");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

app.use(cors());
app.use(express.json());

const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"empleados_crud"
});


app.post("/create", (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    console.log(req.headers.authorization); //recibo token desde la cabecera enviado desde el cliente
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const anios = req.body.anios;
  
    if (!token) {
      return res.status(401).json({ message: 'Token no proporcionado' });
    }
  
    jwt.verify(token, 'fede', (err, decoded) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(401).json({ message: 'Token expirado, reinicia sesión' });
          
        } else {
          return res.status(401).json({ message: 'Token inválido' });
        }
      }
  
      // Si el token es válido, se procede con la inserción en la base de datos
      db.query("INSERT INTO empleados(nombre, edad, pais, cargo, anios) VALUES (?, ?, ?, ?, ?)",
        [nombre, edad, pais, cargo, anios],
        (err, result) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error al insertar en la base de datos' });
          }
  
          res.status(200).json({ message: 'Datos insertados correctamente', result });
        }
      );
    });
  });
  

app.get("/empleados",(req,res)=>{
    

    db.query("SELECT * FROM  empleados" ,
   
    (err,result)=>{
        if(err){
            console.log(err);

        }else{
            res.send(result);
        }
        
            
        }
    
    );    




    
});
app.put("/update",(req,res)=>{
    const token = req.headers.authorization.split(' ')[1];
    console.log(req.headers.authorization); //recibo token desde la cabecera enviado desde el cliente
    const id = req.body.id;
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const anios = req.body.anios;
    
    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
      }
    
      jwt.verify(token, 'fede', (err, decoded) => {
        if (err) {
          if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expirado, reinicia sesión' });
            
          } else {
            return res.status(401).json({ message: 'Token inválido' });
          }
        }
     
    db.query("UPDATE empleados SET nombre=?,edad=?,pais=?,cargo=?,anios=? WHERE id=? ", [nombre,edad,pais,cargo,anios,id],
    (err,result)=>{
        if(err){
            console.log(err);

        }else{
            res.send(result);
        }
        
            
        }
    
    );    
    
});
 });
app.delete("/delete/:id",(req,res)=>{
    const id = req.params.id;
    const token = req.headers.authorization.split(' ')[1];
    console.log(req.headers.authorization); //recibo token desde la cabecera enviado desde el cliente
    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
      }
    
      jwt.verify(token, 'fede', (err, decoded) => {
        if (err) {
          if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expirado, reinicia sesión' });
            
          } else {
            return res.status(401).json({ message: 'Token inválido' });
          }
        }
         });
    db.query("DELETE FROM empleados  WHERE id=? ", [id],
    (err,result)=>{
        if(err){
            console.log(err);

        }else{
            res.send(result);
        }
        
            
        }
    
    );    
    
});





app.post("/register", async (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    try {
        // Generar el hash de la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Realizar la inserción en la base de datos utilizando el hash de la contraseña
        db.query("INSERT INTO registro (username, email, password) VALUES (?, ?, ?)",
            [username, email, hashedPassword],
            (err, result) => {
                if (err) {
                    console.error(err);
                    res.status(500).send({ message: "Error al registrar el usuario" });
                } else {
                    res.status(200).send({ message: "Usuario registrado exitosamente" });
                }
            }
        );
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error al registrar el usuario" });
    }
});

app.post("/login", (req, res) => {
    const email= req.body.email; //datos que recibo desde el front
    const password = req.body.password;
 
    db.query("SELECT * FROM registro WHERE email = ? ",[email],
async(err,result)=>{
    if(err){
        console.log(err);
    }else{
        if(result.length>0 ){
            const datos=result[0]
            const hashedPassword=datos.password;
            const esigual= await bcrypt.compare(password,hashedPassword);
            if(esigual){
                const token=generarToken(datos);
                console.log("Credenciales correctos",token);
                res.send({message:"Inicio exitoso",token,datos: JSON.stringify(datos)});
            }else{
                console.log("Credenciales incorrectos ");
                res.send({message:"contraseña incorrecta"});
            }
        }else{
            res.send({ message: "usuario no existe"});
          console.log("usuario no encontrado");

        }
    }
}
    )



} 
  );

//app.use((err,req,res,next)=>{
 
//if(err.name==='UnauthorizedError'){
 
//return res.status(401).json({Error:"El token no es valido o ya no existe"})
  //}
   // console.error('Error global:' , err);
   
//res.status(500).json({error:'Error interno del servidor'})

//});
    


app.listen(3001,()=>{console.log("Corriendo en el puerto 3001")}); 





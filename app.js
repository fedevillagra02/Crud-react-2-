const { json } = require("express");
const express=require("express");
const jwt=require("jsonwebtoken");

const app=express();

app.listen(3000,function(){
    console.log("nodejs app runing");
})
app.get("/api",(req,res )=>{
res.json({
    mensaje:"nodejs and jwt"
})
})

app.post("/api/login",(req,res )=>{
    const user ={
        id:1,
        nombre:"Henry",
        email:"henry@gmail.com"
    }
    jwt.sign({user}, 'secretkey',(err,token)=>{
        res.json({
            token
        })
    })
   
    });
    
    
    app.post("/api/posts", verifyToken,(req , res )=>{
       jwt.verify(req.token,'secretkey',(error,authData)=>{
                if(error){
                  res.sendStatus(403);
                }else{
                   res.json({
                    mensaje:"Post fue creado",
                    authData
                   });
                }
      
    
          });
     
        });
        //Authorization: Bearer <token>
        function verifyToken(req, res, next){
        const bearerHeader = req.headers['authorization'];
        if(typeof bearerHeader !=='undefined'){
            const bearerToken = bearerHeader.split(" ")[1];
            req.token=bearerToken;
            next();
        }else{
            res.sendStatus(403);
        }
        }



       
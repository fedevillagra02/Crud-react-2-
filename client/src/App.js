
import './estilos/App.css';
import{useState} from "react";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from 'sweetalert2'




function App() {

  const[nombre,setnombre]=useState("");
  const[edad,setedad]=useState();
  const[pais,setpais]=useState("");
  const[cargo,setcargo]=useState("");
  const[anios,setanios]=useState();
  const[editar,seteditar]=useState(false);
  const[id,setid]=useState();




const [empleadosList,setEmpleados]= useState([]);

const add = () => {
  const token = 'clav3s3cr3ta'; // Aquí deberías tener el valor real de tu token

  Axios.post("http://localhost:3001/create", {
    nombre: nombre,
    edad: edad,
    pais: pais,
    cargo: cargo,
    anios: anios
  }, {
    headers: {
      Authorization: `Bearer ${token}` // Agrega el token al encabezado de autorización
    }
  }).then(() => {
    getEmpleados();
    limpiarCampos();

    Swal.fire({
      title: "<strong> Registro exitoso</strong>",
      html: "<i>El empleado <strong>" + [nombre] + "</strong> fue registrado con éxito</i>",
      icon: 'success',
      timer: 3000
    });
  });
};


 



















  
  
  const update = ()=>{
    Axios.put("http://localhost:3001/update",{
    id:id,  
    nombre:nombre,
      edad:edad,
      pais:pais,
      cargo:cargo,
      anios:anios
    }).then(()=>{
      getEmpleados();
      limpiarCampos();
      Swal.fire({
        title: "<strong> Actualizacion exitosa!!</strong>",
        html:"<i>El empleado  <strong> " +  [nombre] + " </strong> fue actualizado con exito con exito!!</i>",
        icon: 'success',
        timer:3000
      })
    });

  }
  

  const deleteEmple = (val)=>{
    Swal.fire({
      title: 'Confirmar eliminado?',
      html:"<i>Realmente desea eliminar a   <strong> " +  val.nombre + " </strong>?</i>",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si,eliminarlo!',
      cancelButtonText: 'Cancelar'

    }).then((result) => {
      if (result.isConfirmed) {Axios.delete(`http://localhost:3001/delete/+${val.id}`).then(()=>{
        getEmpleados();
        limpiarCampos();
        Swal.fire({
         title: 'Eliminado!',
          text:val.nombre+ " fue eliminado.",
          icon:'success',
            timer:3000
        }
          
          
        );

      });                       
       
      }
    }) 
    
  }






  const limpiarCampos = ()=>{
    setanios("");
    setnombre("");
    setcargo("");
    setedad("");
    setpais("");
    setid("");
seteditar(false);
    

  }



  const getEmpleados =()=>{
    Axios.get("http://localhost:3001/empleados"
   ).then((response)=>{
  setEmpleados(response.data);
    });

  }


 
const editarEmpleado = (val)=>{
seteditar(true);

setnombre(val.nombre);
setedad(val.edad);
setcargo(val.cargo);
setpais(val.pais);
setanios(val.anios);
setid(val.id);

}













  return (
    <div className="container">

    
          <div className="card text-center">
        <div className="card-header">
          Gestion de empleados
        </div>
        <div className="card-body">
        <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">Nombre:</span>
        <input type="text" 
        onChange={(event)=>{setnombre(event.target.value);
        }
        }
        className="form-control" value={nombre}     placeholder="Ingrese un nombre" aria-label="Username" aria-describedby="basic-addon1"/>
     </div>
    
    
    
    
    
      
     

















      
      <div className="input-group mb-3">
  <span className="input-group-text" id="basic-addon1">Edad</span>
  <input type="text" 
  onChange={(event)=>{setedad(event.target.value);
  }
  }
  className="form-control" value={edad}    placeholder="Ingrese una edad" aria-label="Username" aria-describedby="basic-addon1"/>
</div>

<div className="input-group mb-3">
  <span className="input-group-text" id="basic-addon1">Pais</span>
  <input type="text" 
  onChange={(event)=>{setpais(event.target.value);
  }
  }
  className="form-control"  value={pais}   placeholder="Ingrese un Pais " aria-label="Username" aria-describedby="basic-addon1"/>
</div>

<div className="input-group mb-3">
  <span className="input-group-text" id="basic-addon1">Cargo</span>
  <input type="text" 
  onChange={(event)=>{setcargo(event.target.value);
  }
  }
  className="form-control" value={cargo}   placeholder="Ingrese un Cargo " aria-label="Username" aria-describedby="basic-addon1"/>
</div>

<div className="input-group mb-3">
  <span className="input-group-text" id="basic-addon1">Años en la empresa</span>
  <input type="text" 
  onChange={(event)=>{setanios(event.target.value);
  }
  }
  className="form-control" value={anios} placeholder="Ingrese la cantidad de años " aria-label="Username" aria-describedby="basic-addon1"/>
</div>    
        </div>
        <div className="card-footer text-muted">
          {
            editar?
            <div>
            <button className='btn btn-warning'  id='btn'  onClick={update}>Actualizar</button> 
            <button className='btn btn-info'  id='btn'  onClick={limpiarCampos}>Cancelar</button>
            </div>
                 :
                 <button className='btn btn-success'  id='btn'  onClick={add}>Registrar</button>

          }
        <button className='btn btn-success'  id='btn'  onClick={getEmpleados}>Mostrar registros</button>
        </div>
      </div>

      <table className="table table-striped">
      <thead>
    <tr>
      <th scope="col">Id</th>
      <th scope="col">Nombre</th>
      <th scope="col">Edad</th>
      <th scope="col">Pais</th>
      <th scope="col">Cargo</th>
      <th scope="col">Experiencia</th>
      <th scope="col">Acciones</th>
    </tr>
  </thead>
  <tbody>{
  empleadosList.map((val,key)=>{
    return <tr key={val.id}>
      <th >{val.id}</th>
      <td>{val.nombre}</td>
      <td>{val.edad}</td>
      <td>{val.pais}</td>
      <td>{val.cargo}</td>
      <td>{val.anios}</td> 
      <td>
      <div className="btn-group" role="group" aria-label="Basic example">
      <button type="button" 
      onClick={()=>{
        editarEmpleado(val);
         } 
      }
      className="btn btn-info">Editar</button>
      <button type="button"
      onClick={()=>{
        deleteEmple(val);
      }}
      
      className="btn btn-danger">Eliminar</button>
      
</div>
        </td> 

    </tr>
    
    
   
  })
}

    
    
  </tbody>
</table>

    </div>

  );
}

export default App;

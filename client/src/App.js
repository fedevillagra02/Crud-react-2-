
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
const token = localStorage.getItem('token'); //traigo el token desde el local storage 
const validate=()=>{
    // Verificar si los campos obligatorios están completos
    if (!nombre || !edad || !pais || !cargo || !anios) {
      // Mostrar mensaje de error o manejar la falta de campos obligatorios
      // Por ejemplo:
      alert('Por favor, complete todos los campos obligatorios.');
      return;
    }
  
    // Validar el formato de la edad (asegurarse de que sea un número)
    const parsedAge = parseInt(edad);
    if (isNaN(parsedAge) || parsedAge <= 0) {
      // Mostrar mensaje de error o manejar el formato incorrecto de la edad
      // Por ejemplo:
      alert('Por favor, ingrese una edad válida.');
      return;
    }
  
    // Validar el formato de 'anios' (asegurarse de que sea un número)
    const parsedAnios = parseInt(anios);
    if (isNaN(parsedAnios) || parsedAnios <= 0) {
      // Mostrar mensaje de error o manejar el formato incorrecto de 'anios'
      // Por ejemplo:
      alert('Por favor, ingrese una cantidad válida de años.');
      return;
    }
    return true;
}
const add = () => {
   if(!validate()) return;
  Axios.post("http://localhost:3001/create", { //realizo una solicitud post 
    nombre: nombre,
    edad: edad,
    pais: pais,
    cargo: cargo,
    anios: anios,
  },  { 
    headers: { 
      'Authorization': `Bearer ${token}`  /* configuro el encabezado 
                                             para que el token vaya en la cabecera de la solicitud */            
                                                                    
    }
}
  ).then(() => {
    getEmpleados(); //actualiza la lista de empleados 
    limpiarCampos(); //limpia los campos de los inputs 

    Swal.fire({
      title: "<strong> Registro exitoso</strong>",
      html: "<i>El empleado <strong>" + [nombre] + "</strong> fue registrado con éxito</i>",
      icon: 'success',
      timer: 3000
    });
  });
};
 
  const update = ()=>{
    if(!validate()) return;

    Axios.put("http://localhost:3001/update",{
    id:id,  
    nombre:nombre,
      edad:edad,
      pais:pais,
      cargo:cargo,
      anios:anios
    },{ 
      headers: {
        'Authorization': `Bearer ${token}` 
      }
  }
    ).then(()=>{
      getEmpleados();
      limpiarCampos();
      Swal.fire({
        title: "<strong> Actualizacion exitosa!!</strong>",
        html:`<i>El empleado <strong>${nombre}</strong> fue actualizado con éxito!!</i>`,
        icon: 'success',
        timer:3000
      })
    });

  };
  

  const deleteEmple = (val) => {
    Swal.fire({
      title: 'Confirmar eliminado?',
      html: "<i>Realmente desea eliminar a <strong>" + val.nombre + "</strong>?</i>",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminarlo!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3001/delete/${val.id}`, {
            
            headers: {
              'Authorization': `Bearer ${token}` // Agrega el encabezado 'Authorization'
            }
          }
        ).then(() => {
          getEmpleados();
          limpiarCampos();
          Swal.fire({
            title: 'Eliminado!',
            html :`<strong>${val.nombre}</strong> fue eliminado.`,
            icon:'success',
              timer:3000
           });
        })
       }  ;
      
    });
  };
  

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
    const config = {
      headers: {
        'Authorization': `Bearer ${token}` // Usando Bearer authentication para enviar el token
      }
    };
    Axios.get("http://localhost:3001/empleados",config
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
    {/* Encabezado de la tarjeta */}
    <div className="card-header">
      Gestión de empleados
    </div>
    {/* Cuerpo de la tarjeta */}
<div className="card-body">
 {/* Formulario */}
 <div className="input-group mb-3">
 <span className="input-group-text" id="basic-addon1">Nombre:</span>
 <input type="text" 
 onChange={(event)=>{setnombre(event.target.value);}}
className="form-control" 
value={nombre}    
 placeholder="Ingrese un nombre" 
 aria-label="Username" 
 aria-describedby="basic-addon1"/>
 </div>
    
 <div className="input-group mb-3">
 <span className="input-group-text" id="basic-addon1">Edad</span>
<input type="text" 
 onChange={(event)=>{setedad(event.target.value);}}
  className="form-control" 
  value={edad}    
  placeholder="Ingrese una edad" 
  aria-label="Username" 
  aria-describedby="basic-addon1"/>
</div>

<div className="input-group mb-3">
  <span className="input-group-text" id="basic-addon1">Pais</span>
  <input type="text" 
  onChange={(event)=>{setpais(event.target.value);}}
  className="form-control" 
   value={pais}   
   placeholder="Ingrese un Pais " 
   aria-label="Username" 
   aria-describedby="basic-addon1"/>
</div>

<div className="input-group mb-3">
  <span className="input-group-text" id="basic-addon1">Cargo</span>
  <input type="text" 
  onChange={(event)=>{setcargo(event.target.value);}}
  className="form-control" 
  value={cargo}  
   placeholder="Ingrese un Cargo " 
   aria-label="Username" 
   aria-describedby="basic-addon1"/>
</div>

<div className="input-group mb-3">
  <span className="input-group-text" id="basic-addon1">Años en la empresa</span>
  <input type="text" 
  onChange={(event)=>{setanios(event.target.value); }}
  className="form-control" 
  value={anios}
   placeholder="Ingrese la cantidad de años " 
   aria-label="Username" 
   aria-describedby="basic-addon1"/>
</div>    
        </div>
        {/* Pie de la tarjeta */}
      <div className="card-footer text-muted">
        {/* Botones de acciones */}
        {editar ? (
          <div>
            <button className='btn btn-warning' id='btn' onClick={update}>Actualizar</button>
            <button className='btn btn-info' id='btn' onClick={limpiarCampos}>Cancelar</button>
          </div>
        ) : (
          <button className='btn btn-success' id='btn' onClick={add}>Registrar</button>
        )}

        {/* Botón para mostrar registros */}
        <button className='btn btn-success' id='btn' onClick={getEmpleados}>Mostrar registros</button>
      </div>
    </div>


      <table className="table table-striped">
      <thead>
        {/* Encabezados de la tabla */}
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

      {/* Cuerpo de la tabla */}
      <tbody>
        {/* Filas de datos */}
        {empleadosList.map((val, key) => {
          return (
            <tr key={val.id}>
              <th>{val.id}</th>
              <td>{val.nombre}</td>
              <td>{val.edad}</td>
              <td>{val.pais}</td>
              <td>{val.cargo}</td>
              <td>{val.anios}</td>
              <td>
                {/* Botones de acciones por registro */}
                <div className="btn-group" role="group" aria-label="Basic example">
                  <button
                    type="button"
                    onClick={() => { editarEmpleado(val); }}
                    className="btn btn-info"
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    onClick={() => { deleteEmple(val); }}
                    className="btn btn-danger"
                  >
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>

  );
};

export default App;

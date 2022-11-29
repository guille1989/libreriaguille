import {Component} from 'react'
import './App.css';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Table } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      data_libreria_historico: [],
      data_libreria_devolucion: [],
      data_libreria_usuarios : [],
      data_libreria : [],
      modalingresolibro: false,
      modalingresousuario: false,
      modalprestamo: false,
      modaldevolucion: false,
      modalhistorial: false,
      libroNuevo: '',
      usuarioNuevo: '',
      libroRprestamo: '',
      nombre_usuario_registro_p: '',
      libroRdevolucion: '',
      nombre_libro_registro_d: ''
    }
  }
  

  componentDidMount(){
      //Leemos los libros de la libreria
      fetch('http://localhost:8000/api/libreria', {
        method: 'GET', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        }
      })
        .then((response) => response.json())
        .then((data) => {
          this.setState({
            data_libreria: data.lib
          })
          //console.log('Success, se lee libreria', data.lib);
        })
        .catch((error) => {
          //console.error('Error:', error);
        });

      //Leemos los usuarios de la libreria
      fetch('http://localhost:8000/api/usuarios', {
        method: 'GET', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        }
      })
        .then((response) => response.json())
        .then((data) => {
          this.setState({
            data_libreria_usuarios: data.usuarios
          })
          //console.log('Success, se lee libreria', data.usuarios);
        })
        .catch((error) => {
          //console.error('Error:', error);
        });

        //Leemos los libros que estan prestados para el registro de la devolucion
        fetch('http://localhost:8000/api/devoluciones', {
          method: 'GET', // or 'PUT'
          headers: {
            'Content-Type': 'application/json',
          }
        })
          .then((response) => response.json())
          .then((data) => {
            
            this.setState({
              data_libreria_devolucion: data.libNoDisponibles
            })            
            //console.log('Success: ', data.libNoDisponibles );
          })
          .catch((error) => {
            //console.error('Error:', error);
          });
  }

  //Ingreso Nuevo Libro
  ingresarNueoLibro = () => {    
    //Insertamo libro
    const requestOptions ={
      method: 'POST',
      headers : new Headers({
        'Content-type':'application/json'
      }),
      body: JSON.stringify({nombreLibro: this.state.libroNuevo})
    }

    fetch('http://localhost:8000/api/libreria', requestOptions)
      .then((response) => response.json())
      .then((data) => {
        //console.log('Success: ', data.lib);
        if(data.lib === "Libro ya existe en libreria"){
          alert("Libro ya existe en libreria, por favor colocar otro libro")
        }else{
          alert("Libro agregado a la libreria de Guille")

          //Refrescamos la tabla
          fetch('http://localhost:8000/api/libreria', {
            method: 'GET', // or 'PUT'
            headers: {
              'Content-Type': 'application/json',
            }
          })
            .then((response) => response.json())
            .then((data) => {
              this.setState({
                data_libreria: data.lib
              })
              //console.log('Success, se lee libreria', data.lib);
            })
            .catch((error) => {
              //console.error('Error:', error);
            });

          //Salimos del modal
          this.setState({
            modalingresolibro: !this.state.modalingresolibro
          })
        }                
      })
      .catch((error) => {
        //console.error('Error:', error);
      });
    
  }


  //Ingreso Nuevo Usuario
  ingresarNueoUsuario = () => {
    //console.log(this.state.usuarioNuevo)    
    //Insertamo libro
    const requestOptions ={
      method: 'POST',
      headers : new Headers({
        'Content-type':'application/json'
      }),
      body: JSON.stringify({nombre: this.state.usuarioNuevo})
    }

    fetch('http://localhost:8000/api/usuarios', requestOptions)
      .then((response) => response.json())
      .then((data) => {
        //console.log('Success: ', data.usuario);
        if(data.usuario === "Usuario ya existe en libreria"){
          alert("Usuario ya existe en libreria !")
        }else{
          alert("Usuario agregado a la libreria de Guille")

          //Salimos del modal
          this.setState({
            modalingresousuario: !this.state.modalingresousuario
          })
          //Leemos los usuarios de la libreria
          fetch('http://localhost:8000/api/usuarios', {
            method: 'GET', // or 'PUT'
            headers: {
              'Content-Type': 'application/json',
            }
          })
            .then((response) => response.json())
            .then((data) => {
              this.setState({
                data_libreria_usuarios: data.usuarios
              })
              //console.log('Success, se lee libreria', data.usuarios);
            })
            .catch((error) => {
              //console.error('Error:', error);
            });
        }                
      })
      .catch((error) => {
        //console.error('Error:', error);
      });
    
  }

  registroPrestamo = (libro) => {
    this.setState({
      libroRprestamo: libro,
      modalprestamo: true
    })
  }


  prestamoLibro = () => {
    //Prestamo libro
    const requestOptions ={
      method: 'POST',
      headers : new Headers({
        'Content-type':'application/json'
      }),
      body: JSON.stringify({nombreLibro: this.state.libroRprestamo, nombre: this.state.nombre_usuario_registro_p})
    }

    fetch('http://localhost:8000/api/prestamos', requestOptions)
      .then((response) => response.json())
      .then((data) => {
        //console.log('Success: ', data);
       
          //Salimos del modal
          this.setState({
            modalprestamo: !this.state.modalprestamo
          })

          //Actualizar lista libreria
          fetch('http://localhost:8000/api/libreria', {
            method: 'GET', // or 'PUT'
            headers: {
              'Content-Type': 'application/json',
            }
          })
            .then((response) => response.json())
            .then((data) => {
              this.setState({
                data_libreria: data.lib
              })
              //console.log('Success, se lee libreria', data.lib);
            })
            .catch((error) => {
              //console.error('Error:', error);
            });
      })
      .catch((error) => {
        //console.error('Error:', error);
      });
  }

  registroDevolucion = (libro, nombre) => {    
    if (window.confirm("Seguro desea registrar devolucion ?" + libro)) {

      //Devolucion libro
      const requestOptions ={
        method: 'POST',
        headers : new Headers({
          'Content-type':'application/json'
        }),
        body: JSON.stringify({nombreLibro: libro, nombre: nombre[0].usuario_prestamo})
      }

      fetch('http://localhost:8000/api/devoluciones', requestOptions)
        .then((response) => response.json())
        .then((data) => {
          //console.log('Success: ', data);  
          //Actualizar lista libreria
          fetch('http://localhost:8000/api/libreria', {
            method: 'GET', // or 'PUT'
            headers: {
              'Content-Type': 'application/json',
            }
          })
            .then((response) => response.json())
            .then((data) => {
              this.setState({
                data_libreria: data.lib
              })
              //console.log('Success, se lee libreria', data.lib);
            })
            .catch((error) => {
              //console.error('Error:', error);
            });             
        })
        .catch((error) => {
          //console.error('Error:', error);
        });
    }
  }

  historialLibro = () => {
    
  }

  handleHistorico = (libro) => {
    //Historial libro
    const requestOptions ={
      method: 'GET',
      headers : new Headers({
        'Content-type':'application/json'
      })
    }

    fetch('http://localhost:8000/api/historial/' + libro, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        //console.log('Success: ', data.lib);     
        this.setState({
          data_libreria_historico: data.lib,
          modalhistorial: !this.state.modalhistorial
        })     
      })
      .catch((error) => {
        //console.error('Error:', error);
      });
  }

  render(){
    return (
      <>
      <div className='titulo'>
        <h1>La libreria de GUILLE</h1>
      </div>
      <br></br>
      <br></br>

      <div className='botones'>
      <Button color="success" onClick={() => {
        this.setState({
          modalingresolibro: !this.state.modalingresolibro
        })
      }}>Ingresar Libro</Button>
      <Button color="info" onClick={() => {
        this.setState({
          modalingresousuario: !this.state.modalingresousuario
        })
      }}>Ingresar Usuario</Button>
      </div>     

      <div className='tabla'>
      
      <Table 
        striped
        >

      <thead>
        <tr>
            <th>No. Libro</th>
            <th>Nombre Libro</th>
            <th>Disponiel Libro</th>
            <th>Registrar Prestamo</th>
            <th>Registrar Devolucion</th>
            <th>Libro Historial</th>
        </tr>
      </thead>
        
      <tbody>      
      {this.state.data_libreria.map((item, index) => {
        return(
          <>          
           <tr>
              <td>{index + 1}</td>
              <td>{item.nombreLibro}</td>
              <td>{(() => {
                if(item.libroDisponible === true){
                  return(
                    <>
                    <td>Libro Disponible</td>
                    </>
                  )
                }else{
                  return(
                    <>
                    <td>Libro No Disponible</td>
                    </>
                  )
                }
              })()}</td>
              {(() => {
                if(item.libroDisponible === true){
                  return(
                    <>
                    <td className='librohistorial' onClick={() => this.registroPrestamo(item.nombreLibro)}>Prestamo</td>
                    </>                    
                  )
                }else{
                  return(
                    <>
                    <td>Libro en Prestamo</td>
                    </> 
                  )
                }
              })()}

              {(() => {
                if(item.libroDisponible === false){
                  return(
                    <>
                    <td className='librohistorial' onClick={() => this.registroDevolucion(item.nombreLibro, item.libroHistorial)}>Devolucion</td>
                    </>                    
                  )
                }else{
                  return(
                    <>
                    <td></td>
                    </> 
                  )
                }
              })()}              
            
              <td className='librohistorial' onClick={() => this.handleHistorico(item.nombreLibro)}>Ver historial</td>
            </tr>            
          </>
        )
      })}
      </tbody>
      </Table>
      </div>

      <Modal isOpen={this.state.modalingresolibro}>
        <ModalHeader>Ingresar Libro</ModalHeader>
        <ModalBody>
        <Label for="nombreLibroId">
          Nombre Libro:
        </Label>
        <Input
          id="nombreLibroId"
          name="nombreLibro"
          placeholder="Ingrese nombre de nuevo libro"
          onChange={(e) => {            
            this.setState({
              libroNuevo: e.target.value
            })            
          }}
        />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.ingresarNueoLibro}>
            Ingresar Libro
          </Button>{' '}
          <Button color="secondary" onClick={() => {
            this.setState({
              modalingresolibro: !this.state.modalingresolibro
            })
          }}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>


      <Modal isOpen={this.state.modalingresousuario}>
        <ModalHeader>Ingresar Usuario</ModalHeader>
        <ModalBody>
        <Label for="nombreUsuarioId">
          Nombre Usuario:
        </Label>
        <Input
          id="nombreUsuarioId"
          name="nombreUsuario"
          placeholder="Ingrese nombre de nuevo usuario"
          onChange={(e) => {            
            this.setState({
              usuarioNuevo: e.target.value
            })            
          }}
        />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.ingresarNueoUsuario}>
            Ingresar Usuario
          </Button>{' '}
          <Button color="secondary" onClick={() => {
            this.setState({
              modalingresousuario: !this.state.modalingresousuario
            })
          }}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={this.state.modalprestamo}>
        <ModalHeader>Registrar Prestamo de libro: <strong>{this.state.libroRprestamo}</strong></ModalHeader>
        <ModalBody>
        <Label for="nombreUsuarioId">
          Seleccione Usuario:
        </Label>
        <Input
            bsSize="sm"
            className="mb-3"
            type="select"
            onChange={(e) => {            
              this.setState({
                nombre_usuario_registro_p: e.target.value
              })            
            }}
            >
            <option>
              Seleccione usuario
            </option> 
            {this.state.data_libreria_usuarios.map((item, index) => {
              return(
                <option>{item.nombre}</option>
              )
            })}                                 
          </Input>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.prestamoLibro}>
            Registrar Prestamo
          </Button>{' '}
          <Button color="secondary" onClick={() => {
            this.setState({
              modalprestamo: !this.state.modalprestamo
            })
          }}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>     

      <Modal isOpen={this.state.modalhistorial}>
        <ModalHeader>Historial</ModalHeader>
        <ModalBody>
        {this.state.data_libreria_historico.map((item, index) => {
          return(
            <>
              <h5 style={{marginBottom:'20px', display:'flex', justifyContent:'center'}}>Libro: <strong>{item.nombreLibro}</strong></h5>
             
          {item.libroHistorial.map((itemAux, indexAux) => {
            return(
              <div className='historicoLibro'>
                <p>Usuario: {itemAux.usuario_prestamo}</p>
                <p>Fecha Prestamo: {itemAux.fecha_prestamo}</p>
                <p>Fecha Devolucion: {itemAux.fecha_entrega}</p>
              </div>
            )
          })
          }
          </>)  
        })}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => {
            this.setState({
              modalhistorial: !this.state.modalhistorial
            })
          }}>
            Aceptar
          </Button>
        </ModalFooter>
      </Modal>    
      </>
    ); }
}

export default App;

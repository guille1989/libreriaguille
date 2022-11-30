import React, { Component } from 'react';
import {Button, Input, Label} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class login extends Component {
    constructor(props) {
        super(props);
        this.state={
            usuario: '',
            contrasenia: ''
        }
    }

    handleLogin = () => {
        console.log('Usuario: ' + this.state.usuario)
        console.log('Contrasenia: ' + this.state.contrasenia)
        //
        const requestOptions ={
            method: 'POST',
            headers : new Headers({
              'Content-type':'application/json'
            }),
            body: JSON.stringify({nombre: this.state.usuario, contrasenia: this.state.contrasenia})
          }
          fetch('http://localhost:8000/api/autenticacion', requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                if(data.user === null){
                    alert('Usuario y/o Contrasenia no son correctos !')
                }else{
                    alert('Usuario y Contrasenia correctos !')
                    localStorage.setItem('usuarioLibreria', data.user.nombre)
                    this.props.userAut()
                }
            })
    }
    
    render() {
        return (
            <div>
                <h1>La libreria de guille login</h1>
                <Label for="userName">
                    User Name
                </Label>
                <Input
                id="userName"
                name="Username"
                placeholder="Usuario"
                onChange={(e) => this.setState({usuario: e.target.value})}
                />

                <Label
                    for="examplePassword"
                    sm={2}
                    >
                    Password
                    </Label>
                    <Input
                        id="examplePassword"
                        name="password"
                        placeholder="password placeholder"
                        type="password"
                        onChange={(e) => this.setState({contrasenia: e.target.value})}
                    />

                <Button color='success' onClick={this.handleLogin}>Ingresar</Button>
            </div>
        );
    }
}

export default login;
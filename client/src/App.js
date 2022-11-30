import {Component} from 'react'
import './App.css';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Table } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomeLibrera from './components/home';
import LoginLib from './components/login';

class App extends Component{
  constructor(props) {
    super(props);
    this.state = {  
      opcion: 'inicio'    
    }
  }
  

  componentDidMount(){
    if(localStorage.getItem('usuarioLibreria')===null){

    }else{
      this.setState({
        opcion: 'home'
      })
    }
  }

  userAutenticacion = () => {
    this.setState({
      opcion: 'home'
    })
  }

  userLogOut = () => {
    this.setState({
      opcion: 'inicio'
    })
  }

  render(){
    const project = () => {
      switch(this.state.opcion) {

        case "home":   return <HomeLibrera userLogO={this.userLogOut} />;
        case "inicio": return <LoginLib userAut={this.userAutenticacion} />

        default:      return <h1>No project match</h1>
      }
    }
    return (
      <>
        {project()}
      </>
    ); }
}

export default App;

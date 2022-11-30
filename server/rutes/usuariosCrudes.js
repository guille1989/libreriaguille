const Express = require('express');
const route = Express();
const Usuarios = require('../modules/usuariosLibreria');

//Crud GET
route.get('/', (req, res) => {

    let resultUsuarios = leerUsuariosLib();

    resultUsuarios
        .then(msj => {
            res.json({
                usuarios: msj
            })
        })
        .catch(msj => {
            res.json({
                error: msj
            })
        })
})

async function leerUsuariosLib(){
    let result;
    result = await Usuarios.find();
    return result
}

//Crud POST
route.post('/', (req, res) => {
    let body = req.body;
    let usuarioNuevo = insertarUsuario(body);

    usuarioNuevo
        .then(msj => {
            res.json({
                usuario: msj
            })
        })
        .catch(msj => {
            res.json({
                error: msj
            })
        })
})

async function insertarUsuario(body){
    //Validar si el usuario ya esta en libreria
    let resultAux = [];
    resultAux = await Usuarios.findOne({nombre: body.nombre})
    if(resultAux === null){
        let result = [];   
        result = new Usuarios({
            nombre: body.nombre,
            contrasenia: body.contrasenia
        })
        return await result.save()
    }else{
        return 'Usuario ya existe en libreria'
    }
}

module.exports= route
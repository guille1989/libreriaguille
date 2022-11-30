const Express = require('express');
const ruta = Express();
const usuariosLib = require('../modules/usuariosLibreria');

ruta.post('/', (req, res) => {
    let body = req.body;

    let resulAut = validacionUser(body);

    resulAut
        .then(msj => {
            res.json({
                user: msj
            })
        }).catch(err => {
            res.json({
                error: err
            })
        })

})

async function validacionUser(body){
    let result = [];

    result = usuariosLib.findOne({$and:[{nombre: body.nombre}, {contrasenia : body.contrasenia}]});
  
    if(result === null){
        return "Contraseña o Usuario incorrecto"
    }else{
        return result        
    }
}





module.exports = ruta;
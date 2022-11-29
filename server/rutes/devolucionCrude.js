const Express = require('express');
const route = Express();
const Libreria = require('../modules/libreriaHV');
const Usuarios = require('../modules/usuariosLibreria');

//CRUD libros en prestamos
route.get('/', (req, res) => {
    let resultNoDisponibles = leerLibrosNoDisponibles();

    resultNoDisponibles
        .then(msj => {
            res.json({
                libNoDisponibles: msj
            })
        })
        .catch(msj => {
            res.json({
                erros: msj
            })
        })
})

async function leerLibrosNoDisponibles(){
    let result = [];
    result = await Libreria.find({libroDisponible: false})
    return result
}

//CRUD devolucion Libro
route.post('/', (req, res) => {
    let body = req.body;
    let resultDevolucion = devolucionLibro(body);

    resultDevolucion
        .then(msj => {
            res.json({
                libro: msj
            })
        })
        .catch(msj => {
            res.json({
                error: msj
            })
        })
})

async function devolucionLibro(body){  
    console.log(body)  
    let result = [];
    result = await Libreria.updateOne({$and:[{nombreLibro: body.nombreLibro},{"libroHistorial.fecha_entrega": "pendiente"}]}, {$set: {libroDisponible: true, "libroHistorial.$.fecha_entrega": new Date()}})
    
    let resultUsuario = [];
    resultUsuario = await Usuarios.updateOne({
        librosPrestados:{$elemMatch : {libroPrestado: "cuento 2", libroPrestadoEstado: "En Prestamo"}}
        },
        {$set:{"librosPrestados.$.libroPrestadoEstado": "Libro Devuelto", "librosPrestados.$.fecha_entrega":  new Date()}})
   
    return {result, resultUsuario}
}

module.exports = route;
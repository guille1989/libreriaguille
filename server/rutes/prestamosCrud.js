const Express = require('express');
const route = Express();
const Libreria = require('../modules/libreriaHV');
const Usuarios = require('../modules/usuariosLibreria');

//Crud GET libros disponibles
route.get('/', (req, res) => {
    let resultDisponibles = leerLibrosDisponibles();

    resultDisponibles
        .then(msj => {
            res.json({
                libDisponibles: msj
            })
        })
        .catch(msj => {
            res.json({
                erros: msj
            })
        })
})

async function leerLibrosDisponibles(){
    let result = [];
    result = await Libreria.find({libroDisponible: true})
    return result
}

//CRUD prestamo Libro
route.post('/', (req, res) => {
    let body = req.body;
    let resultPrestamo = prestamoLibro(body);

    resultPrestamo
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

async function prestamoLibro(body){
    //Valdiamos si el libro existe
    let resultAux = [];
    resultAux = await Libreria.findOne({$and:[{nombreLibro: body.nombreLibro},{libroDisponible: true}]})
    //Traemos usuario
    let resultAuxUsuario = [];
    resultAuxUsuario = await Usuarios.findOne({nombre: body.nombre})
    //console.log(resultAuxUsuario)

    if(resultAux === null){
        return 'Libro no disponible'
    }else{
        //Actualizamos en user
        let historialUsuaro = resultAuxUsuario.librosPrestados;
        historialUsuaro.push({libroPrestado: body.nombreLibro, libroPrestadoEstado: 'En Prestamo', fecha_prestamo: new Date(), fecha_entrega: 'pendiente'})
        let resultUsuario = [];
        resultUsuario = await Usuarios.updateOne({nombre: body.nombre}, {$set: {librosPrestados: historialUsuaro}})
        
        //Actualizamos en liberia
        let historialLlibro = resultAux.libroHistorial;
        historialLlibro.push({fecha_prestamo: new Date(), fecha_entrega: 'pendiente', usuario_prestamo: body.nombre})
        let result = [];
        result = await Libreria.updateOne({nombreLibro: body.nombreLibro}, {$set: {libroDisponible: false, libroHistorial: historialLlibro}})
        
        return {result , resultUsuario}
        
    }
    
}

module.exports = route;
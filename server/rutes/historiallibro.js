const Express = require('express');
const route = Express();
const Libreria = require('../modules/libreriaHV');

//Crud GET*****
route.get('/:nombreLibro', (req, res) => {
    let nombreLibro = req.params.nombreLibro;
    let resultLibreria = leerLibreriaH(nombreLibro);

    resultLibreria
        .then(msj => {
            res.json({
                lib: msj
            })
        })
        .catch(msj => {
            res.json({
                err: msj
            })
        })
})

async function leerLibreriaH(nombreLibro){
    let result = [];
    result = await Libreria.find({nombreLibro: nombreLibro})
    return result
}

module.exports = route;
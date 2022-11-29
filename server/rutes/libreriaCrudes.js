const Express = require('express');
const route = Express();
const Libreria = require('../modules/libreriaHV');

//Crud GET*****
route.get('/', (req, res) => {
    let resultLibreria = leerLibreria();

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

async function leerLibreria(){
    let result = [];
    result = await Libreria.find()
    return result
}

//Crud POST*****
route.post('/', (req, res) => {
    let body = req.body;
    let resultLibreria = insertarLibro(body);

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

async function insertarLibro(body){
    //Validar si el libro ya esta en libreria
    console.log(body)
    let resultAux = [];
    resultAux = await Libreria.findOne({nombreLibro: body.nombreLibro})
    if(resultAux === null){
        let result = [];   
        result = new Libreria({
            nombreLibro: body.nombreLibro,
            libroDisponible: true 
        })
        return await result.save()
    }else{
        return 'Libro ya existe en libreria'
    }
}



module.exports = route;
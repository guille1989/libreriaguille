const mongoose = require('mongoose');
const libreriaHojaVida = new mongoose.Schema({
nombreLibro:    {type: String},
libroDisponible: {type: Boolean},
libroHistorial: {type: Array}
})
module.exports = mongoose.model('libreriaHV', libreriaHojaVida)
const mongoose = require('mongoose');
const usuariosLibreria = new mongoose.Schema({
nombre:    {type: String},
contrasenia: {type: String},
librosPrestados: {type: Array}
})
module.exports = mongoose.model('usuariosLib', usuariosLibreria)
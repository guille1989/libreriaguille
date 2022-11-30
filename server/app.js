const Express = require('express');
const app = Express();
const mongose = require('mongoose');
var cors = require('cors');
//Importamos rutas
const LibreriaCrudes = require('./rutes/libreriaCrudes');
const UsuariosCrudes = require('./rutes/usuariosCrudes');
const PrestamosCrudes = require('./rutes/prestamosCrud');
const DevolucionesCrudes = require('./rutes/devolucionCrude');
const HistorialLibroCrudes = require('./rutes/historiallibro');
const Autenticacion = require('./rutes/autenticacion');

//Declaramos Middleware para POST
app.use(Express.json());
app.use(Express.urlencoded({extended:true}));
app.use(cors());

//Conectamos con Data Base
mongose.connect('mongodb+srv://root:123@cluster0.jwxt0.mongodb.net/libreria?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Conectado con DB'))
    .catch(() => console.log('No se puedo conectar con DB'))

//Middlewares de rutas
app.use('/api/libreria', LibreriaCrudes);
app.use('/api/usuarios', UsuariosCrudes);
app.use('/api/prestamos', PrestamosCrudes);
app.use('/api/devoluciones', DevolucionesCrudes);
app.use('/api/historial', HistorialLibroCrudes);
app.use('/api/autenticacion', Autenticacion)

app.listen(8000, () => {
    console.log('Server escuchando por puerto 8000')
})
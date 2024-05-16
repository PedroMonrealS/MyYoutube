const mongoose = require('mongoose');

const usuarioSchema = mongoose.Schema({
    nombreUsuario:{
        type: String,
        required:true
    },
    apellidosUsuario:{
        type: String,
        required:true
    },
    nombreCanal:{
        type: String,
        required:true
    },
    fotoPerfil:{
        type: String,
        required:true
    },
    contraseña:{
        type: String,
        required:true
}
});


module.exports = mongoose.model('usuario', usuarioSchema);
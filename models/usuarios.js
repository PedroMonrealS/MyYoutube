const mongoose = require('mongoose');

const usuarioSchema = mongoose.Schema({
    nombre:{
        type: String,
        required:true
    },
    apellidos:{
        type: String,
        required:true
    },
    correo:{
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
    banner:{
        type: String,
        required:true
    },
    contrasena:{
        type: String,
        required:true
}
});


module.exports = mongoose.model('usuario', usuarioSchema);
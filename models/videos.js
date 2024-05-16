const mongoose = require('mongoose');

const videoSchema = mongoose.Schema({
    nombreVideo:{
        type: String,
        required:true
    },
    descripcionVideo:{
        type: String,
        required:true
    },
    idUsuario:{
        type: String,
        required:true
    },
    fechaVideo:{
        type: String,
        required:true
    },
    miniatura:{
        type: String,
        required:true
}
});


module.exports = mongoose.model('video', videoSchema);
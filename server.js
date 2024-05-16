const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var path = require('path');
require('dotenv').config();
const app = express();
const port = 3000;

app.use(express.json());


app.use(express.static("views"));

app.use(bodyParser.urlencoded({ extended: false })); //Para analizar los datos json

//Rutas para videos
const rutasVideos = require('./routes/videos')
const rutasUsuarios = require('./routes/usuarios')

app.use('/api', rutasVideos);
app.use('/api', rutasUsuarios);





//Página de inicio
app.get("/", (req,res) =>{
    res.sendFile(path.join(__dirname, '/views/html/inicio.html'));
})





// Escuchar en el puerto especificado
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});


//Conectarse a la base de datos 
mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log('Connected to MongoDB');
    }).catch((error) => {
        console.error('MongoDB connection error:', error);
    });

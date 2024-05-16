const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./models/usuarios');
var path = require('path');
const bcrypt = require('bcrypt');
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



//Formularios

//Login
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/views/html/login/login.html');
});


//REGISTRO

// Registrar un nuevo usuario
app.post('/register', async (req, res) => {
    const { nombre, apellidos, correo, nombreCanal, fotoPerfil, contrasena } = req.body;
    try {
        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ correo });
        if (existingUser) {
            res.sendFile(__dirname + '/views/registered_ko.html'); // Usuario ya registrado
        } else {
            // Hash de la contraseña antes de almacenarla en la base de datos
            const hashedPassword = await bcrypt.hash(contrasena, 10);
            const newUser = new User({
                nombre: nombre,
                apellidos: apellidos,
                correo: correo,
                nombreCanal,
                fotoPerfil,
                contrasena: hashedPassword,
            });
            // Guardar el nuevo usuario en la base de datos
            await newUser.save();
            res.sendFile(__dirname + '/views/registered.html'); // Usuario registrado con éxito
        }
    } catch {
        console.error("Error en el registro");
        res.status(500).send('Internal server error');
    }
});



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

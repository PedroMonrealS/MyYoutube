const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./models/usuarios');
var path = require('path');
const bcrypt = require('bcrypt');
const session = require('express-session');
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

//¡express-session
app.use(session({
    secret: '121212ABCD',
    resave: false,
    saveUninitialized: false
}));



//Página de inicio
app.get("/", (req,res) =>{
    res.sendFile(path.join(__dirname, '/views/html/inicio.html'));
})



//Formularios

//Login
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/views/html/login/login.html');
});
//Register
app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/views/html/login/register.html');
});

//Mostrar video click
app.get('/video', (req, res) => {
    const id = req.query.id;
    res.sendFile(__dirname + '/views/html/video.html');
});
//Mostrar canal click
app.get('/canal', (req, res) => {
    const id = req.query.id;
    res.sendFile(__dirname + '/views/html/canal.html');
});

app.get('/subirVideos', (req, res) => {
    const id = req.query.id;
    res.sendFile(__dirname + '/views/html/subirVideos.html');
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

// Iniciar sesión
app.post('/login', async (req, res) => {
    const { correo, contrasena } = req.body;
    try {
        // Buscar el usuario por su correo electrónico
        const user = await User.findOne({ correo });
        // Verificar si el usuario existe y la contraseña es correcta
        if (!user || !(await bcrypt.compare(contrasena, user.contrasena))) {
            res.sendFile(__dirname + '/views/login/login_ko.html'); // Usuario no encontrado o contraseña incorrecta
        } else {
            req.session.userId = user._id; // guardar el id
            req.session.username = user.nombre; // guarda el nombre

            res.redirect('/'); // Redirigir al usuario a la página de inicio
        }
    } catch (error) {
        console.error('Error en el inicio de sesión:', error);
        res.status(500).send('Internal server error');
    }
});



app.get('/micanal', (req, res) => {
    // Verificar si el usuario ha iniciado sesión
    if (req.session.username) {
        // El usuario ha iniciado sesión, se puede acceder a sus datos
        const nombreUsuario = req.session.username;
        res.send(`Bienvenido a tu canal, ${nombreUsuario}!`);
    } else {
        // Si el usuario no ha iniciado sesión, redirigirlo al formulario de inicio de sesión
        res.redirect('/login');
    }
});

app.get('/misvideos', (req, res) => {
    // Verificar si el usuario ha iniciado sesión
    if (req.session.username) {
        // El usuario ha iniciado sesión, se puede acceder a sus datos
        const nombreUsuario = req.session.username;
        res.send(`Bienvenido a tu panel de control, ${nombreUsuario}!`);
    } else {
        // Si el usuario no ha iniciado sesión, redirigirlo al formulario de inicio de sesión
        res.redirect('/login');
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

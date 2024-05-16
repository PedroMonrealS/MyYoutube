const express = require('express');
const usuarioSchema = require('../models/usuarios');
const router = express.Router();

// Registrar usuario
router.post('/usuarios', (req, res) => {
    const usuarioData = req.body;
    const usuario = new usuarioSchema(usuarioData);

    usuario.save()
        .then((data) => res.json(data))
        .catch((error) => res.status(500).json({ mensaje: 'Error al guardar el usuario', error: error }));
});

//MOSTRAR USUARIOS
router.get('/usuarios', (req, res) => {
    usuarioSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.status(500).json({ mensaje: 'Error al obtener los usuarios', error: error }));
});


//Usuario por id
router.get('/usuarios/:id', async (req, res) => {
    const idUsuario = req.params.id;
    try {
        const usuario = await usuarioSchema.findById(idUsuario);

        if (!usuario) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }

        res.json(usuario);
    } catch (error) {
        console.error('Error al buscar el usuario:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
});
module.exports = router;

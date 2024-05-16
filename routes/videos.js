const express = require('express');
const Video = require('../models/videos');
const router = express.Router();

// Crear video
router.post('/videos', (req, res) => {
    const videoData = req.body;
    const video = new Video(videoData); // Cambié videoSchema por Video

    video.save()
        .then((data) => res.json(data))
        .catch((error) => res.status(500).json({ mensaje: 'Error al guardar el video', error: error }));
});

//MOSTRAR VIDEOS
router.get('/videos', (req, res) => {
    Video.find() // Cambié videoSchema por Video
    .then((data) => res.json(data))
    .catch((error) => res.status(500).json({ mensaje: 'Error al obtener los videos', error: error }));
});

//Video por id
router.get('/videos/:id', async (req, res) => {
    const idVideo = req.params.id;
    try {
        // Buscar el video por su ID en la base de datos
        const video = await Video.findById(idVideo); // Cambié videoSchema por Video

        // Verificar si el video fue encontrado
        if (!video) {
            return res.status(404).json({ mensaje: 'Video no encontrado' });
        }

        // Si el video fue encontrado, devolverlo como respuesta
        res.json(video);
    } catch (error) {
        console.error('Error al buscar el video:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
});

//Get videos de el usuario
router.get('/videos/usuario/:idUsuario', async (req, res) => {
    const idUsuario = req.params.idUsuario;
    try {
        // Buscar los videos que pertenecen al usuario en la base de datos
        const videos = await Video.find({ idUsuario: idUsuario });

        // Verificar si se encontraron videos
        if (!videos || videos.length === 0) {
            return res.status(404).json({ mensaje: 'No se encontraron videos para este usuario' });
        }

        // Si se encontraron videos, devolverlos como respuesta
        res.json(videos);
    } catch (error) {
        console.error('Error al buscar los videos del usuario:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
});

module.exports = router;

const express = require('express');
const videoSchema = require('../models/videos');
const router = express.Router();

// Crear video
router.post('/videos', (req, res) => {
    const videoData = req.body;
    const video = new videoSchema(videoData);

    video.save()
        .then((data) => res.json(data))
        .catch((error) => res.status(500).json({ mensaje: 'Error al guardar el video', error: error }));
});

//MOSTRAR VIDEOS
router.get('/videos', (req, res) => {
    videoSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.status(500).json({ mensaje: 'Error al obtener los videos', error: error }));
});

module.exports = router;

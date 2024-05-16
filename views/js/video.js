// Obtener el ID
const urlParams = new URLSearchParams(window.location.search);
const videoId = urlParams.get('id');

// Hacer la solicitud a la API para obtener los detalles del video
fetch(`http://localhost:3000/api/videos/${videoId}`)
    .then(response => response.json())
    .then(data => {
        console.log(data.url);
        window.location.href = data.url;

    })
    .catch(error => {
        console.error('Error al obtener los detalles del video:', error);
        // Manejar errores aquí
    });

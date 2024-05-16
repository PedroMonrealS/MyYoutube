// Obtener el ID del video de la URL
const urlParams = new URLSearchParams(window.location.search);
const idCanal = urlParams.get('id');

// Mostrar el ID del canal en la consola
console.log(idCanal);

fetch('http://localhost:3000/api/usuarios/' + idCanal)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data)
            crearCanal(data);
        })
        .catch(error => {
            console.error('Error al hacer el GET request de videos:', error);
        });


function crearCanal(usuario){
    var main = document.getElementById("main");
    var presentacion = document.createElement("div");
    var header = document.createElement("div");
    var banner = document.createElement("div");
    banner.style.backgroundImage = "url('" + usuario.banner+ "')";
    banner.classList.add("banner");
    header.classList.add("header");
    var fotoCanal = document.createElement("img");
    fotoCanal.classList.add("fotoCanal");
    fotoCanal.src = usuario.fotoPerfil;
    var cajaDatos = document.createElement("div");
    cajaDatos.classList.add("cajaDatos");
    var nombreCanal = document.createElement("h1");
    nombreCanal.textContent = usuario.nombreCanal;
    nombreCanal.classList.add("nombreCanal");
    header.appendChild(fotoCanal);
    cajaDatos.appendChild(nombreCanal);
    header.appendChild(cajaDatos);
    presentacion.appendChild(banner);
    presentacion.appendChild(header);
    var BOXVideos = document.createElement("div");
    BOXVideos.id = "BOXVideos";
    main.appendChild(presentacion);
    main.appendChild(BOXVideos);

    getVideos(usuario);
}


function getVideos(usuario){
    fetch('http://localhost:3000/api/videos/usuario/' + usuario._id)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data)
            crearVideos(data);

        })
        .catch(error => {
            console.error('Error al hacer el GET request de videos:', error);
        });


}


function crearVideos(videosData) {
    console.log("F");
    console.log(videosData);
    var DIVCuadricula = document.getElementById("BOXVideos");
    for (var i = 0 ; i < videosData.length ; i++) {
        console.log("Cantidad de videos:", videosData.length);
        console.log("VVvvvvvv" +  videosData[i]);
        console.log("PACO");
        var DIVVideo = document.createElement("div");
        DIVVideo.classList.add("DIVVideo");
        var miniatura = document.createElement("img");
        miniatura.id = videosData[i]._id;
        miniatura.addEventListener("click", function () {
            clickVideo(this.id);
        });
        miniatura.classList.add("miniatura");
        miniatura.src = videosData[i].miniatura;
        var divDatos = document.createElement("div");
        divDatos.classList.add("divDatos");
        var divFotoPerfilTitulo = document.createElement("div");
        var TituloVideo = document.createElement("h1");
        TituloVideo.id = videosData[i]._id;
        TituloVideo.addEventListener("click", function () {
            clickVideo(this.id);
        });
        TituloVideo.classList.add("TituloVideo");
        TituloVideo.textContent = videosData[i].nombreVideo;
        var FechaSubida = document.createElement("h1");
        FechaSubida.textContent = videosData[i].fechaVideo;
        FechaSubida.classList.add("FechaSubida");

        var divNombreCanal = document.createElement("div");
        divNombreCanal.classList.add("divNombreCanal");
        divNombreCanal.appendChild(FechaSubida);

        divFotoPerfilTitulo.appendChild(TituloVideo);
        divDatos.appendChild(divFotoPerfilTitulo);

        DIVVideo.appendChild(miniatura);
        DIVVideo.appendChild(divDatos);

        DIVCuadricula.appendChild(DIVVideo);
    }
}

function clickVideo(id) {
window.location.href = "/video?id=" + id;
}
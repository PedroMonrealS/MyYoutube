fetch('http://localhost:3000/api/videos')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            videosData = data;
            DatosUsuario(videosData)
        })
        .catch(error => {
            console.error('Error al hacer el GET request de videos:', error);
        });

function DatosUsuario(){
fetch('http://localhost:3000/api/usuarios')
.then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
})
.then(data => {
    var usuariosData = data;
    MostrarVideosCuadricula(videosData, usuariosData);

})
.catch(error => {
    console.error('Error al hacer el GET request de equipos:', error);
});
}



        function MostrarVideosCuadricula(videosData, usuariosData) {
            var DIVCuadricula = document.getElementById("main");
            for (var i = 0; i < videosData.length; i++) {
                
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
                divFotoPerfilTitulo.classList.add("divFotoPerfilTitulo");
                var FotoPerfil = document.createElement("img");
                FotoPerfil.id = videosData[i].idUsuario;
                FotoPerfil.addEventListener("click", function () {
                    clickCanal(this.id);
                  });
                FotoPerfil.classList.add("FotoPerfil");
                for( var usuario = 0; usuariosData.length; usuario++){
                    if(usuariosData[usuario]._id == videosData[i].idUsuario){
                        var nombreUsuarioActual = usuariosData[usuario].nombreCanal;
                        FotoPerfil.src = usuariosData[usuario].fotoPerfil;  

                        break;
                }
            }
                var TituloVideo = document.createElement("h1");
                TituloVideo.id = videosData[i]._id;
                TituloVideo.addEventListener("click", function () {
                    clickVideo(this.id);
                  });
                TituloVideo.classList.add("TituloVideo");
                TituloVideo.textContent = videosData[i].nombreVideo;
                var NombreCanal = document.createElement("h1");
                NombreCanal.id = videosData[i].idUsuario;
                NombreCanal.addEventListener("click", function () {
                    clickCanal(this.id);
                  });
                NombreCanal.textContent = nombreUsuarioActual;
                NombreCanal.classList.add("NombreCanal");
                var FechaSubida = document.createElement("h1");
                FechaSubida.textContent = videosData[i].fechaVideo;
                FechaSubida.classList.add("FechaSubida");

                var divNombreCanal = document.createElement("div");
                divNombreCanal.classList.add("divNombreCanal");
                divNombreCanal.appendChild(NombreCanal);
                divNombreCanal.appendChild(FechaSubida);

            
                divFotoPerfilTitulo.appendChild(FotoPerfil);
                divFotoPerfilTitulo.appendChild(TituloVideo);
                divDatos.appendChild(divFotoPerfilTitulo);
                DIVVideo.appendChild(miniatura);
                divDatos.appendChild(divNombreCanal);
                DIVVideo.appendChild(divDatos);

                DIVCuadricula.appendChild(DIVVideo);
            }
        
    DIVCuadricula.appendChild(DIVVideo);
}




function clickVideo(id) {
    window.location.href = "/video?id=" + id;
  }

  function clickCanal(id) {
    window.location.href = "/canal?id=" + id;
  }
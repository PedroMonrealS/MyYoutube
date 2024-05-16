fetch('http://localhost:3000/api/videos')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
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
    console.log(data);
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
                miniatura.classList.add("miniatura");
                miniatura.src = videosData[i].miniatura;
                var divDatos = document.createElement("div");
                divDatos.classList.add("divDatos");
                var divFotoPerfilTitulo = document.createElement("div");
                divFotoPerfilTitulo.classList.add("divFotoPerfilTitulo");
                var FotoPerfil = document.createElement("img");
                FotoPerfil.classList.add("FotoPerfil");
                for( var usuario = 0; usuariosData.length; usuario++){
                    console.log("FOR");
                    if(usuariosData[usuario]._id == videosData[i].idUsuario){
                        var nombreUsuarioActual = usuariosData[usuario].nombreCanal;
                        FotoPerfil.src = usuariosData[usuario].fotoPerfil;  

                        break;
                }
            }
                var TituloVideo = document.createElement("h1");
                TituloVideo.classList.add("TituloVideo");
                TituloVideo.textContent = videosData[i].nombreVideo;
                var NombreCanal = document.createElement("h1");
                NombreCanal.textContent = nombreUsuarioActual;
                NombreCanal.classList.add("NombreCanal");
                var divNombreCanal = document.createElement("div");
                divNombreCanal.classList.add("divNombreCanal");
                divNombreCanal.appendChild(NombreCanal);
            
                console.log(nombreUsuarioActual);
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
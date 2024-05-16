// Obtener el elemento body del documento HTML
var body = document.body;

// Crear el HTML del header y contenido
var headerHTML = `
<header>
    <div class="izquierda">
        <button class="fa-solid fa-bars botonMenu" onclick="alternarMenu()"></button>
        <img class="logoYoutube" onclick="window.location.href = '/';" src="../src/logoYoutube.png">  
    </div>

    <div class="central">
        <form>
            <input type="text" placeholder="Buscar">
        </form>
    </div>

    <div class="derecha">
        <button class="fa-solid fa-arrow-up-from-bracket botonSubir"></button>
        <img class="iconoUsuario" src="../src/LOGO CANAL.jpg">
    </div>
</header>

<div class="contenido">
    <nav id="navMenu">
        <div class="opcion">
            <i class="fa-solid fa-house"></i>        
            <a href="/">
                <h1 class="textoNavMenu">Inicio</h1>
            </a>
        </div>

        <div class="opcion">
            <i class="fa-solid fa-id-card-clip"></i>        
            <a href="/micanal">
                <h1 class="textoNavMenu">Tu Canal</h1>
            </a>
        </div>

        <div class="opcion">
            <i class="fa-solid fa-video"></i>
            <a href="/misvideos">
                <h1 class="textoNavMenu">Mis Videos</h1>
            </a>
        </div>
    </nav>
</div>
<main id="main">

`;

// Agregar el HTML al body utilizando innerHTML
body.innerHTML += headerHTML;



//Añadir el script de los iconos
var script = document.createElement("script");
script.src = 'https://kit.fontawesome.com/f25d71746c.js';
script.crossOrigin = 'anonymous';
document.body.appendChild(script);


var menuAbierto = true;

function alternarMenu() {
    var navMenu = document.getElementById("navMenu");
    var textoNavMenus = document.getElementsByClassName("textoNavMenu");

    menuAbierto = !menuAbierto;

    if (menuAbierto) {
        navMenu.style.width = "200px";
        for (var i = 0; i < textoNavMenus.length; i++) {
            textoNavMenus[i].style.display = "inline-block";
        }
    } else {
        navMenu.style.width = "0px";
        for (var i = 0; i < textoNavMenus.length; i++) {
            textoNavMenus[i].style.display = "none";
        }
    }
}



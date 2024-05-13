
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


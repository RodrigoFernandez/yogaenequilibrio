

function getNuevaNovedad(producto){
    let novedadDiv = document.createElement("div");
    novedadDiv.className = "novedades-box";
    novedadDiv.innerHTML = `<a href="">
                                <img src="${producto.imagen}" alt="${producto.nombre}">
                                <div >
                                    <h3>${producto.nombre}</h3>
                                    <p>${producto.descripcion}</p>
                                </div>
                            </a>`;
    return novedadDiv;
}

function cargarNovedades(novedades) {
    let novedadesContainer = document.getElementById("productosNovedades");
    novedades.forEach(producto => {
        novedadesContainer.appendChild(getNuevaNovedad(producto));
    });
}


function getNuevoDestacado(producto){
    let novedadDiv = document.createElement("div");
    novedadDiv.className = "destacados-box";
    novedadDiv.innerHTML = `<a href="">
                                <img src="${producto.imagen}" alt="${producto.nombre}">
                                <div >
                                    <h3>${producto.nombre}</h3>
                                    <p>${producto.descripcion}</p>
                                </div>
                            </a>`;
    return novedadDiv;
}

function cargarDestacados(destacados) {
    let destacadosContainer = document.getElementById("productosDestacados");
    destacados.forEach(producto => {
        destacadosContainer.appendChild(getNuevoDestacado(producto));
    });
}

///////////////////////////////////////////////////////////
function inicializacion() {
// Código a ejecutar cuando el DOM esté completamente cargado
    let novedades = getNovedades();
    let destacados = getDestacados();

    console.log("Novedades:", novedades);
    console.log("Destacados:", destacados);

    cargarNovedades(novedades);
    cargarDestacados(destacados);
}

document.addEventListener("DOMContentLoaded", inicializacion);
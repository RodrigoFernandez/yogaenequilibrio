function abrirDialogoNovedadDestacado(evento) {
    let enlace = evento.target.closest("a");
    let productoId = enlace.getAttribute("producto-id");
    console.log("Producto ID:", productoId);
    console.log("mostrar dialog como el de productos");
};

function getEnlaceNovedadDestacado(producto) {
    let enlace = document.createElement("a");
    enlace.innerHTML = `<img src="${producto.imagen}" alt="${producto.nombre}">
                        <div >
                            <h3>${producto.nombre}</h3>
                            <p>${producto.descripcion}</p>
                        </div>`;
    enlace.setAttribute("producto-id", producto.id);
    enlace.addEventListener("click", abrirDialogoNovedadDestacado);
    return enlace;
}

function getNuevaNovedad(producto){
    let novedadDiv = document.createElement("div");
    novedadDiv.className = "novedades-box";
    novedadDiv.appendChild(getEnlaceNovedadDestacado(producto));
    return novedadDiv;
}

function cargarNovedades(novedades) {
    let novedadesContainer = document.getElementById("productosNovedades");
    novedades.forEach(producto => {
        novedadesContainer.appendChild(getNuevaNovedad(producto));
    });
}


function getNuevoDestacado(producto){
    let destacadoDiv = document.createElement("div");
    destacadoDiv.className = "destacados-box";
    destacadoDiv.appendChild(getEnlaceNovedadDestacado(producto));
    return destacadoDiv;
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

    cargarNovedades(novedades);
    cargarDestacados(destacados);
}

document.addEventListener("DOMContentLoaded", inicializacion);
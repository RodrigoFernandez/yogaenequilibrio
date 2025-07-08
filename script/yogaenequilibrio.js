/*
* yogaenequilibrio.js
*/

function getEnlaceNovedadDestacado(producto) {
    let enlace = document.createElement("a");
    enlace.className = "enlace-producto";
    enlace.innerHTML = `<img src="${producto.imagen}" alt="${producto.nombre}">
                        <div >
                            <h3>${producto.nombre}</h3>
                        </div>`;
    enlace.setAttribute("producto-id", producto.id);

    enlace.addEventListener("click", function(evento) {
        document.getElementById(`cantidad-${producto.id}`).value = 1; // Resetear cantidad al abrir el modal
        document.getElementById(`cantidad-${producto.id}`).removeEventListener('input', cantidadEventInput);
        document.getElementById(`cantidad-${producto.id}`).addEventListener('input', cantidadEventInput);
        document.getElementById(`modal-${producto.id}`).showModal();
    });

    return enlace;
}

function getNuevaNovedad(producto){
    let novedadDiv = document.createElement("div");
    novedadDiv.className = "novedades-box";
    novedadDiv.appendChild(getEnlaceNovedadDestacado(producto));
    novedadDiv.appendChild(getDialogProducto(producto));
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
    destacadoDiv.appendChild(getDialogProducto(producto));
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
    getProductos((productos) => {
        let novedades = getNovedades(productos);
        let destacados = getDestacados(productos);

        cargarNovedades(novedades);
        cargarDestacados(destacados);
        actualizarContadorCarrito();
    });
    
}

document.addEventListener("DOMContentLoaded", inicializacion);
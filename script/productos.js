/*
* productos.js
*/

function getBotonAgregarProducto(producto) {
    let botonAgregar = document.createElement("button");
    botonAgregar.type = "button";
    botonAgregar.className = "boton";
    botonAgregar.textContent = "Agregar al carrito";
    botonAgregar.onclick = function() {
        document.getElementById(`cantidad-${producto.id}`).value = 1; // Resetear cantidad al abrir el modal
        document.getElementById(`cantidad-${producto.id}`).removeEventListener('input', cantidadEventInput);
        document.getElementById(`cantidad-${producto.id}`).addEventListener('input', cantidadEventInput);
        document.getElementById(`modal-${producto.id}`).showModal();
    };
    return botonAgregar;
}

function getNuevoProducto(producto) {
    let productoArticle = document.createElement("article");
    productoArticle.className = "producto-card";
    productoArticle.innerHTML = `<div class="imagen-card">
                                    <img src="../${producto.imagen}" alt="${producto.nombre}">
                                </div>
                                <div class="cuerpo-card">
                                    <h3>${producto.nombre}</h3>                            
                                    <p class="descripcion-cuerpo-card">${producto.descripcion}</p>
                                    <p>Precio: $${producto.precio}</p>
                                </div>`;
    
    productoArticle.appendChild(getBotonAgregarProducto(producto));

    productoArticle.appendChild(getDialogProducto(producto));

    return productoArticle;
}

function cargarProductos(productos) {
    let contenedor = document.getElementById("listadoProductos");
    contenedor.innerHTML = ""; // Limpiar el contenedor antes de cargar nuevos productos

    productos.forEach(producto => {
        contenedor.appendChild(getNuevoProducto(producto));
    });
}

///////////////////////////////////////////////////////////
function inicializacionProductos() {
// Código a ejecutar cuando el DOM esté completamente cargado
    getProductos((productos) => {
        cargarProductos(productos);
    });
}

document.addEventListener("DOMContentLoaded", inicializacionProductos);
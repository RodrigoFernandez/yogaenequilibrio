
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

function getImagenCard(producto) {
    let imagenCard = document.createElement("div");
    imagenCard.className = "imagen-card";
    let img = document.createElement("img");
    img.src = `../${producto.imagen}`;
    img.alt = producto.nombre;
    imagenCard.appendChild(img);
    return imagenCard;
}

function getCrearInputCantidad(producto) {
    let inputCantidad = document.createElement("input");
    inputCantidad.id = `cantidad-${producto.id}`;
    inputCantidad.type = "number";
    inputCantidad.className = "cantidad";
    //inputCantidad.placeholder = "Cantidad";
    inputCantidad.min = 1;
    inputCantidad.max = 10;
    inputCantidad.value = 1;

    return inputCantidad;
}

function getCrearTotal(producto) {
    let total = document.createElement("p");
    total.className = "total";
    total.id = `total-${producto.id}`;
    total.textContent = `Total: $${producto.precio}`;
    return total;
}

function cantidadEventInput(e) {
        //TODO sacar el 10 de mas abajo y ver de donde saco el precio
        let total = document.getElementById(`total-${e.target.id.split('-')[1]}` );
        total.textContent = `Total: $${10 * e.data}`;
}

function getCuerpoCard(producto) {
    let cuerpoCard = document.createElement("div");
    cuerpoCard.className = "cuerpo-card";
    cuerpoCard.innerHTML = `<h3>${producto.nombre}</h3>
                            <p class="descripcion-cuerpo-card">${producto.descripcion}</p>
                            <p>Precio: $${producto.precio}</p>`;
    let inputCantidad = getCrearInputCantidad(producto);
    console.log("inputCantidad:", inputCantidad.value);
    cuerpoCard.innerHTML = cuerpoCard.innerHTML + `<p>Cantidad: ${inputCantidad.outerHTML}</p>`;
    //cuerpoCard.appendChild(inputCantidad);
    
    cuerpoCard.appendChild(getCrearTotal(producto));
    return cuerpoCard;
}

function agregarACarrito(idProducto) {
    let dialog = document.getElementById(`modal-${idProducto}`);
    let producto = JSON.parse(dialog.getAttribute("data-producto"));
    let cantidad = document.getElementById(`cantidad-${idProducto}`);
    
    agregarProductoACarrito(producto, cantidad.value);
    dialog.close();
}
    
function getDialogProducto(producto) {
    let dialog = document.createElement("dialog");
    dialog.id = `modal-${producto.id}`;
    dialog.className = "modal-producto";

    dialog.appendChild(getImagenCard(producto));
    dialog.appendChild(getCuerpoCard(producto));
    dialog.setAttribute("data-producto", JSON.stringify(producto));
    
    dialog.innerHTML += `<div class="botonera-card">
                            <button type="button" class="boton" onclick="agregarACarrito('${producto.id}')">Agregar</button>
                            <button type="button" class="boton" onclick="document.getElementById('${dialog.id}').close()">Cancelar</button>
                        </div>`;
    return dialog;
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
    let productos = getProductos();

    console.log("Productos:", productos);

    cargarProductos(productos);
}

document.addEventListener("DOMContentLoaded", inicializacionProductos);
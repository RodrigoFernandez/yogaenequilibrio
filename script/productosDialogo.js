/*
* productosDialogo.js
 */

function agregarACarrito(idProducto) {
    let dialog = document.getElementById(`modal-${idProducto}`);
    let producto = JSON.parse(dialog.getAttribute("data-producto"));
    let cantidad = document.getElementById(`cantidad-${idProducto}`);
    
    agregarProductoACarrito(producto, cantidad.value);
    dialog.close();
}

function cantidadEventInput(e) {
    let id = e.target.id.split('-')[1];
    let precio = document.getElementById(`precio-${id}`);
    let precioValor = parseFloat(precio.textContent);
    let total = document.getElementById(`total-${id}`);
    total.textContent = `Total: $${precioValor * e.data}`;
}

function getCrearInputCantidad(producto) {
    let inputCantidad = document.createElement("input");
    inputCantidad.id = `cantidad-${producto.id}`;
    inputCantidad.type = "number";
    inputCantidad.className = "cantidad";
    
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

function getCuerpoCard(producto) {
    let cuerpoCard = document.createElement("div");
    cuerpoCard.className = "cuerpo-card";
    cuerpoCard.innerHTML = `<h3>${producto.nombre}</h3>
                            <p class="descripcion-cuerpo-card">${producto.descripcion}</p>
                            <p>Precio: $<span id="precio-${producto.id}">${producto.precio}</span></p>`;
    let inputCantidad = getCrearInputCantidad(producto);
    console.log("inputCantidad:", inputCantidad.value);
    cuerpoCard.innerHTML = cuerpoCard.innerHTML + `<p>Cantidad: ${inputCantidad.outerHTML}</p>`;
    
    cuerpoCard.appendChild(getCrearTotal(producto));
    return cuerpoCard;
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
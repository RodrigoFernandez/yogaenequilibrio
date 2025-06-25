function crearCeldaBotonEliminar(item){
    let celda = document.createElement("td");
    celda.className = "boton-eliminar-td";
    celda.innerHTML = `<button type="button" class="boton boton-error">Eliminar</button>`;
    return celda;
}

function crearCeldaImagen(item){
    let celda = document.createElement("td");
    celda.className = "imagen-card";
    celda.innerHTML = `<img src="../${item.producto.imagen}" alt="${item.producto.nombre}">`;
    return celda;
}

function crearCeldaDescripcion(item){
    let celda = document.createElement("td");
    celda.className = "descripcion-card-td";
    celda.innerHTML = `<h3>${item.producto.nombre}</h3>`;
    return celda;
}

function crearCeldaPrecio(item){
    let celda = document.createElement("td");
    celda.className = "precio-card-td";
    celda.innerHTML = `<p>$${item.producto.precio.toFixed(2)}</p>`;
    return celda;
}

function crearCeldaCantidad(item){
    let celda = document.createElement("td");
    celda.className = "precio-card-td";
    celda.innerHTML = `
        <label for="cantidad">Cantidad: </label>
        <input type="number" name="cantidad" value="${item.cantidad}" min="1" max="10">
    `;
    //agregar evento para actualizar el total del item, y el total del carrito
    return celda;
}

function crearCeldaTotal(item){
    let celda = document.createElement("td");
    celda.className = "total-card-td";
    celda.innerHTML = `<p>$${(item.producto.precio * item.cantidad).toFixed(2)}</p>`;
    return celda;
}

function crearItemCarrito(item){
    console.log(item);
    let fila = document.createElement("tr");
    fila.className = "producto-card";

    fila.appendChild(crearCeldaBotonEliminar(item));
    fila.appendChild(crearCeldaImagen(item));
    fila.appendChild(crearCeldaDescripcion(item));
    fila.appendChild(crearCeldaPrecio(item));
    fila.appendChild(crearCeldaCantidad(item));
    fila.appendChild(crearCeldaTotal(item));

    return fila;
}

function actualizarCarrito(){
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    console.log(carrito);

    let itemsCarrito = document.getElementById("itemsCarrito");
    console.log(itemsCarrito);
    if(itemsCarrito) {
        itemsCarrito.innerHTML = ""; // Limpiar el contenido previo

        if (carrito.length === 0) {
            itemsCarrito.innerHTML = "<td>No hay productos en el carrito.</td>";
        } else {
            carrito.forEach(item => {
                let itemCarrito = crearItemCarrito(item);
                itemsCarrito.appendChild(itemCarrito);
            });
        }
    }
}

document.addEventListener("DOMContentLoaded", actualizarCarrito);
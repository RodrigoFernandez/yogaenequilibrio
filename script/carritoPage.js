

function eliminarItemCarrito(itemId){
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    
    // Filtrar el carrito para eliminar el item con el id especificado
    carrito = carrito.filter(item => item.productoId != itemId);
    
    // Actualizar el localStorage con el nuevo carrito
    localStorage.setItem("carrito", JSON.stringify(carrito));

    actualizarCarrito(); // Actualizar la vista del carrito
}

function crearCeldaBotonEliminar(item){
    let celda = document.createElement("td");
    celda.className = "boton-eliminar-td";
    celda.innerHTML = `<button type="button" class="boton boton-error">Eliminar</button>`;

    let boton = celda.getElementsByTagName("button")[0];
    boton.setAttribute("item-id", item.productoId);

    boton.addEventListener("click", (evento) => {
        eliminarItemCarrito(evento.target.getAttribute("item-id"));
    });

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

function actualizarTotalCarrito(){
    let totalesItems = document.querySelectorAll(".total-card-td p");
    
    totalCarrito = [...totalesItems]
                    .map(total => parseFloat(total.innerText.replace("$", "")))
                    .reduce((acumulador, total) => acumulador + total, 0)
                    .toFixed(2);

    let precioTotal = document.getElementById("precioTotal");
    precioTotal.innerHTML = `<p>$${totalCarrito}</p>`;
};

function actualizarTotalItem(evento){
    let tdCantidad = evento.target.parentElement;
    
    let tdPrecio = tdCantidad.previousElementSibling;
    let precio = parseFloat(tdPrecio.children[0].innerText.replace("$", ""));
        
    let tdTotal = tdCantidad.nextElementSibling;
    tdTotal.innerHTML = `<p>$${(precio * evento.target.value).toFixed(2)}</p>`;

    actualizarTotalCarrito();
};

function crearCeldaCantidad(item){
    let celda = document.createElement("td");
    celda.className = "precio-card-td";
    celda.innerHTML = `
        <label for="cantidad">Cantidad: </label>
        <input type="number" name="cantidad" value="${item.cantidad}" min="1" max="10">
    `;

    celda.getElementsByTagName("input")[0].addEventListener("change", actualizarTotalItem);

    return celda;
}

function crearCeldaTotal(item){
    let celda = document.createElement("td");
    celda.className = "total-card-td";
    celda.innerHTML = `<p>$${(item.producto.precio * item.cantidad).toFixed(2)}</p>`;
    return celda;
}

function crearItemCarrito(item){
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
    let itemsCarrito = document.getElementById("itemsCarrito");
    
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
    actualizarTotalCarrito()
}

document.addEventListener("DOMContentLoaded", function(){
    actualizarCarrito();

    let finalizarCompraBtn = document.getElementById('finalizarCompraBtn');
    finalizarCompraBtn.addEventListener("click", (evento) => {
        console.log(evento);
        console.log("mostrar formulario para cargar datos del usuario para la compra");
    });
});
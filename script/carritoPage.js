/*
* carritoPage.js
*/

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
    let urlImagen = item.producto.imagen.startsWith("../") ? item.producto.imagen : `../${item.producto.imagen}`;
    celda.innerHTML = `<img src="${urlImagen}" alt="${item.producto.nombre}">`;
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
    actualizarContadorCarrito();
};

function actualizarTotalItem(evento){
    let tdCantidad = evento.target.parentElement;
    
    let tdPrecio = tdCantidad.previousElementSibling;
    let precio = parseFloat(tdPrecio.children[0].innerText.replace("$", ""));
        
    let tdTotal = tdCantidad.nextElementSibling;
    tdTotal.innerHTML = `<p>$${(precio * evento.target.value).toFixed(2)}</p>`;
    
    let idItem = evento.target.getAttribute("item-id");
    actualizarItemCarrito(idItem, evento.target.value);
    actualizarTotalCarrito();
};

function crearCeldaCantidad(item){
    let celda = document.createElement("td");
    celda.className = "precio-card-td";
    celda.innerHTML = `
        <label for="cantidad">Cantidad: </label>
        <input type="number" name="cantidad" value="${item.cantidad}" min="1" max="10">
    `;
    celda.getElementsByTagName("input")[0].setAttribute("item-id", item.productoId);
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

function crearCeldaBotonVaciarCarrito(){
    let celda = document.createElement("th");
    celda.className = "boton-eliminar-td boton-vaciar-carrito-th";
    celda.setAttribute("colspan", "6");
    celda.innerHTML = `<button type="button" class="boton boton-error boton-vaciar-carrito">Vaciar carrito</button>`;

    let boton = celda.getElementsByTagName("button")[0];

    boton.addEventListener("click", (evento) => {
        vaciarCarrito();
        actualizarCarrito();
    });

    return celda;
}

function crearHeaderTablaCarrito(){
    let headerFila = document.createElement("tr");
    headerFila.className = "producto-card";
    headerFila.appendChild(crearCeldaBotonVaciarCarrito());
    
    return headerFila;
}

function deshabilitarBotonFinalizarCompra(){
    let finalizarCompraBtn = document.getElementById('finalizarCompraBtn');
    finalizarCompraBtn.disabled = true;
    finalizarCompraBtn.classList.add("boton-deshabilitado");
}

function habilitarBotonFinalizarCompra(){
    let finalizarCompraBtn = document.getElementById('finalizarCompraBtn');
    finalizarCompraBtn.disabled = false;
    finalizarCompraBtn.classList.remove("boton-deshabilitado");
}

function actualizarCarrito(){
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let itemsCarrito = document.getElementById("itemsCarrito");
    
    if(itemsCarrito) {
        itemsCarrito.innerHTML = ""; // Limpiar el contenido previo

        if (carrito.length === 0) {
            itemsCarrito.innerHTML = "<td>No hay productos en el carrito.</td>";

            deshabilitarBotonFinalizarCompra();
        } else {
            itemsCarrito.appendChild(crearHeaderTablaCarrito());
            carrito.forEach(item => {
                let itemCarrito = crearItemCarrito(item);
                itemsCarrito.appendChild(itemCarrito);
            });
        }
    }
    actualizarTotalCarrito()
}

function crearItemCompra(item){
    let fila = document.createElement("tr");
    fila.innerHTML = `<td>${item.producto.nombre}</td>
    <td>(x${item.cantidad})</td>
    <td></td>
    <td class="total-card-td">$${parseFloat(item.cantidad) * parseFloat(item.producto.precio)}</td>`;

    return fila;
}

function crearItemTotalCompra(carrito){
    let totalCarrito = carrito.reduce((total, item) => total + (item.cantidad * item.producto.precio), 0);

    let fila = document.createElement("tr");
    fila.innerHTML = `<td colspan="3" class="resaltado">Total</td>
    <td class="total-card-td resaltado">$${totalCarrito}</td>`;

    return fila;
}

function cargarDatosCompraDialogo(){
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let itemsCompra = document.getElementById('itemsFinCompra');

    if(itemsCompra) {
        itemsCompra.innerHTML = ""; // Limpiar el contenido previo

        if (carrito.length === 0) {
            itemsCarrito.innerHTML = "<td>No hay productos en el carrito.</td>";
        } else {
            
            carrito.forEach(item => {
                let itemCompra = crearItemCompra(item);
                itemsCompra.appendChild(itemCompra);
            });

            let footerCompra = document.getElementById('footerFinCompra');
            footerCompra.innerHTML = ""; // Limpiar el contenido previo
            footerCompra.appendChild(crearItemTotalCompra(carrito));
        }
    }

    let campoCompra = document.getElementById("compra");
    campoCompra.value = JSON.stringify(carrito);
}

function submitFormFinalizarCompra(event){
    event.preventDefault();
    document.getElementById("mensajeErrorEnvio").classList.remove("mensajeVisible");

    let data = new FormData(event.target);

    fetch("https://formspree.io/f/mwpbzoya",
        {
            method: event.target.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        }
    ).then(response => {
        if (response.ok) {
            event.target.reset(); // Resetea el formulario
            window.location.href = "../pages/graciasCompra.html"; // Redirige a la página de agradecimiento
        } else {
            document.getElementById("mensajeErrorEnvio").classList.add("mensajeVisible");
        }
    }).catch(error => {
        document.getElementById("mensajeErrorEnvio").classList.add("mensajeVisible");
    });
}

document.addEventListener("DOMContentLoaded", function(){
    actualizarCarrito();

    let finalizarCompraBtn = document.getElementById('finalizarCompraBtn');
    finalizarCompraBtn.addEventListener("click", (evento) => {
        cargarDatosCompraDialogo();
        document.getElementById(`finalizarCompraForm`).showModal();
    });

    let cancelarConfirmacionBtn = document.getElementById('cancelarConfirmacionBtn');
    cancelarConfirmacionBtn.addEventListener("click", (evento) => {
        let dialogo = document.getElementById(`finalizarCompraForm`);
        dialogo.close();
    });

    let finalizarCompraFormulario = document.getElementById('finalizarCompraFormulario');
    finalizarCompraFormulario.addEventListener("submit", submitFormFinalizarCompra);
});
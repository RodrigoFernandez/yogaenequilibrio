/*
* carrito.js
*/

function actualizarContadorCarrito() {
    const contador = document.getElementById('contador-carrito');
    
    if(contador == null || contador === undefined) {
        return;
    }

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const total = carrito.reduce((acc, prod) => acc + prod.cantidad, 0);
    contador.textContent = total;
}

function agregarProductoACarrito(producto, cantidad){
    if(cantidad > 0){
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

        let itemExistente = carrito.find(item => item.productoId === producto.id);

        if (itemExistente) {
            itemExistente.cantidad += parseInt(cantidad);
        } else {
            let itemCarrito = {
                productoId: producto.id,
                producto: producto,
                cantidad: parseInt(cantidad)
            };

            carrito.push(itemCarrito);
        }

        localStorage.setItem("carrito", JSON.stringify(carrito));
        actualizarContadorCarrito();
    }
}

function vaciarCarrito(){
    localStorage.removeItem("carrito");
    actualizarContadorCarrito();
}

function actualizarItemCarrito(idItem, cantidad){
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    
    let itemExistente = carrito.find(item => item.productoId == idItem);
    if (itemExistente) {
        itemExistente.cantidad = cantidad;
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarContadorCarrito();
};

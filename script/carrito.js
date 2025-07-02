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
    }
}

function vaciarCarrito(){
    localStorage.removeItem("carrito");
}

function actualizarItemCarrito(idItem, cantidad){
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    
    let itemExistente = carrito.find(item => item.productoId == idItem);
    if (itemExistente) {
        itemExistente.cantidad = cantidad;
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
};

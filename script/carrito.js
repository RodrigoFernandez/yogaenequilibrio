function agregarProductoACarrito(producto, cantidad){
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    if(cantidad > 0){
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
    
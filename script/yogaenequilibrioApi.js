/*
* yogaenequilibrioApi.js
*/

function getProductos(callback) {

    fetch('/json/productos.json')
        .then(response => response.json())
        .then(data => {
            callback(data.productos)
        })
        .catch(error => console.error("error:", error))
}

function getNovedades(productos) {
    return productos.filter(producto => producto.esNovedad);

}

function getDestacados(productos) {
    return productos.filter(producto => producto.esDestacado);
}
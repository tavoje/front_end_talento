document.addEventListener("DOMContentLoaded", function() {
    // Recuperar el carrito desde localStorage
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Función para actualizar el carrito en la página
    function actualizarCarrito() {
        const carritoContainer = document.getElementById('carrito-container');
        const carritoTotal = document.getElementById('carrito-total');

        // Limpiar el contenedor del carrito antes de agregar los nuevos elementos
        carritoContainer.innerHTML = '';
        let total = 0;

        // Iterar sobre los productos en el carrito y agregarlos al contenedor
        carrito.forEach(producto => {
            const productoDiv = document.createElement('div');
            productoDiv.classList.add('producto-carrito');
            productoDiv.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-imagen">
                <h3 class="producto-nombre">${producto.nombre}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <p>Cantidad: ${producto.cantidad}</p>
                <p>Total: $${producto.precio * producto.cantidad}</p>
            `;
            carritoContainer.appendChild(productoDiv);
            total += producto.precio * producto.cantidad;
        });

        // Mostrar el total
        carritoTotal.innerHTML = `<h3>Total: $${total}</h3>`;
    }

    // Función para vaciar el carrito
    const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
    vaciarCarritoBtn.addEventListener('click', function() {
        localStorage.removeItem('carrito');
        carrito = []; // Vaciar el array del carrito
        actualizarCarrito(); // Actualizar la vista
        alert("Carrito vacío");
    });

    // Llamar a la función para mostrar los productos del carrito al cargar la página
    actualizarCarrito();
});

document.addEventListener("DOMContentLoaded", function () {
    fetch("../JS/productos.json")
        .then(response => response.json())
        .then(productos => mostrarProductos(productos))
        .catch(error => console.error("Error al cargar los productos:", error));

    function mostrarProductos(productos) {
        const contenedor = document.querySelector('.productos-container');

        productos.forEach(producto => {
            const productoDiv = document.createElement('div');
            productoDiv.classList.add('producto');

            productoDiv.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-imagen">
                <h3 class="producto-nombre">${producto.nombre}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <div class="cantidad-container">
                    <button class="decrease">-</button>
                    <input type="number" value="1" min="1" class="cantidad" id="cantidad-${producto.id}">
                    <button class="increase">+</button>
                </div>
                <button class="comprar" data-id="${producto.id}" data-nombre="${producto.nombre}" data-precio="${producto.precio}" data-imagen="${producto.imagen}">
                    Comprar
                </button>
            `;

            contenedor.appendChild(productoDiv);
        });

        // Event listeners para los botones de cantidad
        document.querySelectorAll('.increase').forEach(button => {
            button.addEventListener('click', (e) => {
                const input = e.target.previousElementSibling;
                input.value = parseInt(input.value) + 1;
            });
        });

        document.querySelectorAll('.decrease').forEach(button => {
            button.addEventListener('click', (e) => {
                const input = e.target.nextElementSibling;
                if (input.value > 1) input.value = parseInt(input.value) - 1;
            });
        });

        // Event listener para el botón de comprar
        document.querySelectorAll('.comprar').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                const nombre = e.target.getAttribute('data-nombre');
                const precio = e.target.getAttribute('data-precio');
                const imagen = e.target.getAttribute('data-imagen');
                const cantidad = document.getElementById(`cantidad-${id}`).value;

                agregarAlCarrito(id, nombre, precio, cantidad, imagen);
            });
        });
    }
});

// Función para agregar productos al carrito
function agregarAlCarrito(id, nombre, precio, cantidad, imagen) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    const productoExistente = carrito.find(producto => producto.id === id);

    if (productoExistente) {
        productoExistente.cantidad = parseInt(productoExistente.cantidad) + parseInt(cantidad);
    } else {
        carrito.push({ id, nombre, precio, cantidad, imagen });
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    alert(`Agregaste ${cantidad} ${nombre}(s) al carrito`);
}

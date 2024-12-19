fetch('../JS/productos.json')
  .then(response => response.json())
  .then(data => {
    const productos = data;
    const productosHTML = document.querySelector('.shop .row');

    productos.forEach(producto => {
      const productoHTML = `
        <div class="col-md-4">
          <img src="../IMG/${producto.imagen}" alt="${producto.nombre}">
          <h3>${producto.nombre}</h3>
          <p>Precio: ${producto.precio}</p>
          <p>Cantidad: 
            <input type="number" class="cantidad" value="1" min="1">
          </p>
          <button class="agregar-al-carrito">Agregar al carrito</button>
        </div>
      `;
      productosHTML.innerHTML += productoHTML;
    });
  })
  .catch(error => console.error('Error:', error));
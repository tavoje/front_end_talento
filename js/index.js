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
          <p>Cantidad: ${producto.cantidad}</p>
        </div>
      `;
      productosHTML.innerHTML += productoHTML;
    });
  })
  .catch(error => console.error('Error:', error));
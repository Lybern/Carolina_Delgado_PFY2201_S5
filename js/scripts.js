const mostrarProductos = (productos) => {
  const rowProductos = document.getElementById("productos");
  rowProductos.innerHTML = "";

  productos.forEach(producto => {
    const tarjeta = `
          <article class="col" id="producto-1">
            <div class="card h-100 shadow-sm">
              <img src="${producto.imagen.src}" class="card-img-top" alt="${producto.imagen.alt}">
              <div class="card-body">
                <h5 class="card-title">${producto.titulo}</h5>
                <p class="card-text">${producto.descripcion}</p>
                <a href="${producto.boton.url}" class="btn btn-primary">${producto.boton.texto}</a>
              </div>
            </div>
          </article>
    `;
    rowProductos.innerHTML += tarjeta;
  });

};

const cargarProductos = () => {
  const rowProductos = document.getElementById("productos");
  rowProductos.innerHTML = "Cargando productos ...";

  fetch("/data/productos.json")
    .then(response => response.json())
    .then(data => {
      mostrarProductos(data);
    })
    .catch(error => {
      rowProductos.innerHTML = "Error al cargar los productos.";
      console.error("Error al cargar los productos:", error);
    });

};


const restablecerColores = () => {
  const parrafos = document.querySelectorAll("p");
  parrafos.forEach(p => {
    p.style.color = "";
  });
};


document.addEventListener("DOMContentLoaded", function() {
  // Cambios en el contenido de un elemento id="productos"
  const rowProductos = document.getElementById("productos");
  rowProductos.innerHTML = "Cargando productos ...";

  // Cambios de características gráficas por class
  const parrafos = document.querySelectorAll("p");
  parrafos.forEach(p => {
    p.style.color = "red";
  });

  // Restablecer estilos - Callback
  setTimeout(restablecerColores, 3000);

  // Manejo de eventos para el menú
  const menuProductos = document.getElementById("menu_productos");
  const menuServicios = document.getElementById("menu_servicios");
  const menuContacto = document.getElementById("menu_contacto");
  const leadInfo = document.getElementById("lead_info");
  const leadDefault = "Encuentra todo lo que necesitas para el bienestar de tus mascotas.";

  menuProductos.addEventListener("mouseover", () => {
    leadInfo.innerHTML = "Explora nuestra variedad de productos para tus mascotas."
  })
  menuProductos.addEventListener("mouseout", () => {
    leadInfo.innerHTML = leadDefault;
  });

  menuServicios.addEventListener("mouseover", () => {
    leadInfo.innerHTML = "Descubre los servicios que ofrecemos para el cuidado de tus mascotas."
  });
  menuServicios.addEventListener("mouseout", () => {
    leadInfo.innerHTML = leadDefault;
  });

  menuContacto.addEventListener("mouseover", () => {
    leadInfo.innerHTML = "Ponte en contacto con nosotros para cualquier consulta o asistencia."
  });
  menuContacto.addEventListener("mouseout", () => {
    leadInfo.innerHTML = leadDefault;
  });

  const botonOfertas = document.getElementById("boton_ofertas");
  botonOfertas.addEventListener("click", () => {
    alert("¡Aprovecha nuestras ofertas especiales para tus mascotas!");
  });

  // Carga de productos
  cargarProductos();

});
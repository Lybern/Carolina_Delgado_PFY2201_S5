/**
 * ==============================================================================
 * FELIMIAU - MANIPULACIÓN DEL DOM, EVENTOS Y FETCH API
 * ==============================================================================
 * Estudiante: Carolina Delgado
 * Asignatura: Desarrollo Frontend I (PFY2201) - Experiencia 2 / Semana 5
 * Institución: Duoc UC
 * 
 * Descripción del archivo:
 * Este archivo implementa la lógica dinámica requerida en la evaluación:
 * 1. Manipulación del DOM mediante document.createElement y appendChild.
 * 2. Carga asincrónica de datos con Fetch API y manejo de Promesas (.then/.catch).
 * 3. Gestión de eventos interactivos: 'click', 'mouseover', 'mouseout' y 'submit'.
 * 4. Validación de formularios con preventDefault() y retroalimentación en el DOM.
 * ==============================================================================
 */

// ==============================================================================
// 1. FUNCIONES DE MANIPULACIÓN DEL DOM Y CREACIÓN DE ELEMENTOS
// ==============================================================================

/**
 * Crea dinámicamente el nodo HTML (árbol DOM) para una tarjeta de producto.
 * Utiliza document.createElement y appendChild garantizando seguridad contra XSS con textContent.
 * 
 * @param {Object} producto - Objeto con la información del producto.
 * @param {string} producto.nombre - Título o nombre del producto.
 * @param {string} producto.categoria - Categoría del producto.
 * @param {string} producto.badge - Texto de la insignia destacada.
 * @param {string} producto.badgeColor - Clase de color Bootstrap para la insignia.
 * @param {string} producto.descripcion - Reseña o descripción del producto.
 * @param {number} producto.precio - Precio en pesos chilenos (CLP).
 * @param {Object} producto.imagen - Objeto con URL (src) y texto alternativo (alt).
 * @returns {HTMLElement} Nodo <article> completamente estructurado y listo para insertarse.
 */
function crearTarjetaProducto(producto) {
  // 1. Crear el contenedor de columna responsiva (col-12 en celular, col-sm-6 en tablet, col-lg-4 en desktop)
  const columna = document.createElement("article");
  columna.classList.add("col-12", "col-sm-6", "col-lg-4");

  // 2. Crear la tarjeta (card)
  const tarjeta = document.createElement("div");
  tarjeta.classList.add("card", "card-producto", "h-100", "shadow-sm", "border-0");

  // 3. Crear contenedor de imagen (<figure>) y etiqueta <img>
  const figura = document.createElement("figure");
  figura.classList.add("m-0", "position-relative");

  const imagen = document.createElement("img");
  imagen.src = producto.imagen.src;
  imagen.alt = producto.imagen.alt;
  imagen.classList.add("card-img-top");
  imagen.setAttribute("loading", "lazy");
  imagen.setAttribute("width", "600");
  imagen.setAttribute("height", "220");

  // 4. Crear etiqueta de insignia (Badge)
  const badge = document.createElement("span");
  badge.classList.add("badge", `bg-${producto.badgeColor || "warning"}`, "position-absolute", "top-0", "start-0", "m-2", "shadow-sm");
  badge.textContent = producto.badge || "Destacado";

  figura.appendChild(imagen);
  figura.appendChild(badge);

  // 5. Crear el cuerpo de la tarjeta (card-body)
  const cuerpo = document.createElement("div");
  cuerpo.classList.add("card-body", "d-flex", "flex-column");

  // Categoría
  const categoria = document.createElement("small");
  categoria.classList.add("text-muted", "fw-semibold", "text-uppercase", "mb-1");
  categoria.textContent = producto.categoria;

  // Título del producto
  const titulo = document.createElement("h3");
  titulo.classList.add("card-title", "h5", "fw-bold", "text-dark", "mb-2");
  titulo.textContent = producto.nombre;

  // Descripción
  const descripcion = document.createElement("p");
  descripcion.classList.add("card-text", "text-muted", "flex-grow-1");
  descripcion.textContent = producto.descripcion;

  // Precio formateado a moneda local chilena ($ CLP)
  const precio = document.createElement("p");
  precio.classList.add("precio-destacado", "mb-3");
  precio.textContent = `$${producto.precio.toLocaleString("es-CL")}`;

  // Botón de acción interactivo
  const botonComprar = document.createElement("button");
  botonComprar.type = "button";
  botonComprar.classList.add("btn", "btn-warning", "text-dark", "fw-bold", "mt-auto", "btn-comprar");
  botonComprar.textContent = "🛒 Añadir al Carrito";

  // Evento click individual para simular la compra en el botón recién creado
  botonComprar.addEventListener("click", () => {
    const textoOriginal = botonComprar.textContent;
    botonComprar.textContent = "✅ ¡Añadido!";
    botonComprar.classList.replace("btn-warning", "btn-success");
    botonComprar.classList.replace("text-dark", "text-white");

    setTimeout(() => {
      botonComprar.textContent = textoOriginal;
      botonComprar.classList.replace("btn-success", "btn-warning");
      botonComprar.classList.replace("text-white", "text-dark");
    }, 1800);
  });

  // 6. Ensamblar todos los nodos hijos en el cuerpo de la tarjeta
  cuerpo.appendChild(categoria);
  cuerpo.appendChild(titulo);
  cuerpo.appendChild(descripcion);
  cuerpo.appendChild(precio);
  cuerpo.appendChild(botonComprar);

  // 7. Ensamblar tarjeta completa
  tarjeta.appendChild(figura);
  tarjeta.appendChild(cuerpo);
  columna.appendChild(tarjeta);

  return columna;
}

/**
 * Renderiza el listado de productos en el contenedor del DOM.
 * Limpia el contenido previo y anida cada tarjeta construida.
 * 
 * @param {Array<Object>} productos - Arreglo de objetos de productos.
 */
function mostrarProductos(productos) {
  const contenedor = document.getElementById("productos");
  if (!contenedor) return;

  // Limpiar el estado de carga o contenido previo
  contenedor.innerHTML = "";

  // Insertar cada tarjeta utilizando appendChild
  productos.forEach((producto) => {
    const tarjetaNode = crearTarjetaProducto(producto);
    contenedor.appendChild(tarjetaNode);
  });
}

/**
 * Muestra un mensaje amigable de error en el DOM si el Fetch falla.
 * 
 * @param {Error} error - Error capturado durante la solicitud.
 */
function mostrarMensajeErrorCatalogo(error) {
  const contenedor = document.getElementById("productos");
  if (!contenedor) return;

  contenedor.innerHTML = `
    <div class="col-12 text-center py-4">
      <div class="alert alert-warning d-inline-block p-4 shadow-sm" role="alert">
        <h4 class="alert-heading fw-bold">⚠️ No se pudo cargar el catálogo</h4>
        <p class="mb-0 text-muted">Ocurrió un inconveniente al consultar los datos del servidor.</p>
        <small class="text-secondary">${error.message}</small>
      </div>
    </div>
  `;
}

// ==============================================================================
// 2. CONSUMO DE DATOS ASINCRÓNICOS CON FETCH API Y PROMESAS
// ==============================================================================

/**
 * Carga los productos desde el archivo JSON local mediante la Fetch API.
 * Gestiona el flujo asincrónico con Promesas (.then y .catch).
 */
function cargarProductos() {
  const contenedor = document.getElementById("productos");
  if (contenedor) {
    contenedor.innerHTML = `
      <div class="col-12 text-center py-5">
        <div class="spinner-border text-warning" role="status">
          <span class="visually-hidden">Cargando catálogo...</span>
        </div>
        <p class="text-muted mt-2">Cargando catálogo oficial de Felimiau...</p>
      </div>
    `;
  }

  // Solicitud con Fetch API (Ruta relativa compatible con GitHub Pages)
  fetch("data/productos.json")
    .then((respuesta) => {
      if (!respuesta.ok) {
        throw new Error(`Error en la solicitud HTTP: ${respuesta.status} - ${respuesta.statusText}`);
      }
      return respuesta.json(); // Parsea los datos JSON a objetos JavaScript
    })
    .then((datos) => {
      console.log("Catálogo Felimiau cargado exitosamente:", datos);
      mostrarProductos(datos);
    })
    .catch((error) => {
      console.error("Fallo al consumir Fetch API:", error);
      mostrarMensajeErrorCatalogo(error);
    });
}

// ==============================================================================
// 3. GESTIÓN DE EVENTOS E INTERACTIVIDAD (CLICK, MOUSEOVER, SUBMIT)
// ==============================================================================

/**
 * Configura el evento 'click' en el botón de ofertas para alternar su visibilidad en el DOM.
 */
function configurarBotonOfertas() {
  const botonOfertas = document.getElementById("boton_ofertas");
  const seccionOfertas = document.getElementById("seccion_ofertas");

  if (!botonOfertas || !seccionOfertas) return;

  botonOfertas.addEventListener("click", () => {
    // Alterna la clase d-none de Bootstrap para mostrar u ocultar
    seccionOfertas.classList.toggle("d-none");

    const estaOculto = seccionOfertas.classList.contains("d-none");
    botonOfertas.textContent = estaOculto ? "🔥 Ver Ofertas Especiales" : "❌ Ocultar Ofertas";
    botonOfertas.setAttribute("aria-expanded", !estaOculto);
  });
}

/**
 * Configura el botón de accesibilidad para pausar o reanudar el carrusel mediante evento 'click'.
 */
function configurarControlCarrusel() {
  const carruselElemento = document.getElementById("carruselFelimiau");
  const botonPausa = document.getElementById("btn_pausa_carrusel");

  if (!carruselElemento || !botonPausa || !window.bootstrap) return;

  // Obtener la instancia del carrusel de Bootstrap
  const carruselInstancia = bootstrap.Carousel.getOrCreateInstance(carruselElemento);
  let enPausa = false;

  botonPausa.addEventListener("click", () => {
    if (!enPausa) {
      carruselInstancia.pause();
      botonPausa.textContent = "▶️ Reanudar";
      botonPausa.setAttribute("aria-label", "Reanudar rotación automática del carrusel");
      enPausa = true;
    } else {
      carruselInstancia.cycle();
      botonPausa.textContent = "⏸️ Pausar";
      botonPausa.setAttribute("aria-label", "Pausar rotación automática del carrusel");
      enPausa = false;
    }
  });
}

/**
 * Configura los eventos 'mouseover' y 'mouseout' en los enlaces del menú
 * para actualizar dinámicamente el texto descriptivo en la sección de bienvenida.
 */
function configurarEventosMenu() {
  const menuProductos = document.getElementById("menu_productos");
  const menuServicios = document.getElementById("menu_servicios");
  const menuContacto = document.getElementById("menu_contacto");
  const leadInfo = document.getElementById("lead_info");

  if (!leadInfo) return;

  const textoDefault = "Explora nuestra selección especial de artículos recomendados para el bienestar felino.";

  const items = [
    {
      elemento: menuProductos,
      mensaje: "🐾 Descubre alimentos premium, rascadores resistentes y camas diseñadas para el descanso de tu gato."
    },
    {
      elemento: menuServicios,
      mensaje: "🚀 Conoce nuestros despachos express en 24/48 hrs, calidad aprobada y formas de pago protegidas."
    },
    {
      elemento: menuContacto,
      mensaje: "💌 ¿Preguntas sobre nutrición o asesoría? Déjanos un mensaje y te responderemos a la brevedad."
    }
  ];

  items.forEach(({ elemento, mensaje }) => {
    if (elemento) {
      elemento.addEventListener("mouseover", () => {
        leadInfo.textContent = mensaje;
        leadInfo.classList.add("text-dark", "fw-medium");
      });

      elemento.addEventListener("mouseout", () => {
        leadInfo.textContent = textoDefault;
        leadInfo.classList.remove("text-dark", "fw-medium");
      });
    }
  });
}

/**
 * Configura el evento 'submit' del formulario de contacto.
 * Utiliza preventDefault() para evitar la recarga, valida los datos y muestra respuesta en el DOM.
 */
function configurarFormularioContacto() {
  const formulario = document.getElementById("form_contacto");
  const cajaMensaje = document.getElementById("mensaje_estado");

  if (!formulario || !cajaMensaje) return;

  formulario.addEventListener("submit", (evento) => {
    // 1. Prevenir el comportamiento por defecto (recarga del navegador)
    evento.preventDefault();

    // 2. Obtener y sanitizar los valores ingresados
    const nombre = document.getElementById("nombre_cliente").value.trim();
    const correo = document.getElementById("correo_cliente").value.trim();
    const asunto = document.getElementById("asunto_cliente").value;
    const mensaje = document.getElementById("mensaje_cliente").value.trim();

    // Expresión regular para validar formato de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // 3. Validaciones defensivas
    if (!nombre || !correo || !asunto || !mensaje) {
      cajaMensaje.style.display = "block";
      cajaMensaje.className = "alert alert-danger shadow-sm";
      cajaMensaje.textContent = "⚠️ Por favor, completa todos los campos obligatorios del formulario.";
      return;
    }

    if (!emailRegex.test(correo)) {
      cajaMensaje.style.display = "block";
      cajaMensaje.className = "alert alert-warning shadow-sm";
      cajaMensaje.textContent = "⚠️ Por favor, ingresa un correo electrónico válido (ejemplo: usuario@correo.com).";
      return;
    }

    // 4. Mensaje de éxito dinámico en el DOM
    cajaMensaje.style.display = "block";
    cajaMensaje.className = "alert alert-success shadow-sm";
    cajaMensaje.textContent = `🐾 ¡Muchas gracias por tu mensaje, ${nombre}! Nos pondremos en contacto contigo a ${correo} muy pronto.`;

    // 5. Restablecer el formulario
    formulario.reset();

    // Ocultar mensaje después de 6 segundos
    setTimeout(() => {
      cajaMensaje.style.display = "none";
    }, 6000);
  });
}

// ==============================================================================
// 4. INICIALIZACIÓN PRINCIPAL AL CARGAR EL DOM
// ==============================================================================

/**
 * Asegura que todo el árbol DOM esté completamente disponible antes de ejecutar
 * las manipulaciones de JavaScript y el registro de eventos.
 */
document.addEventListener("DOMContentLoaded", () => {
  console.log("Felimiau: DOM completamente cargado. Inicializando componentes...");

  // 1. Carga asincrónica de datos externos
  cargarProductos();

  // 2. Registro de eventos interactivos
  configurarBotonOfertas();
  configurarControlCarrusel();
  configurarEventosMenu();
  configurarFormularioContacto();
});
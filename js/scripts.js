/**
 * ==============================================================================
 * APUNTES TÉCNICOS Y CÓDIGO DE EVALUACIÓN SEMANA 5
 * Manipulando el DOM con JavaScript para Mejorar la Interactividad
 * ==============================================================================
 * Asignatura: Desarrollo Frontend I (PFY2201)
 * Unidad / Semana: Experiencia de Aprendizaje 2 – Semana 5
 * Institución: Duoc UC – Escuela de Informática y Telecomunicaciones
 * Estudiante: Carolina Delgado
 * Resultado de Aprendizaje (RA2): Implementa tecnologías JavaScript y Bootstrap 5
 * en sitios web básicos, considerando buenas prácticas de la industria.
 * Indicador de Logro (IL6): Manipula el DOM utilizando JavaScript, Fetch API y el
 * uso de promesas para interactuar con la interfaz de usuario, gestionar eventos y
 * manejar flujos de datos asincrónicos.
 * ==============================================================================
 */

// ==============================================================================
// 3. MANIPULACIÓN DINÁMICA DEL DOM (PASO 1 REQUERIDO)
// ==============================================================================

/**
 * Función que construye dinámicamente una tarjeta de producto utilizando createElement y appendChild.
 * Cumple con el Principio de Seguridad: textContent previene inyección de código (XSS).
 * 
 * @param {Object} prod - Objeto de datos del producto (desde JSON).
 * @returns {HTMLElement} Nodo <article> completamente ensamblado.
 */
function crearTarjetaProducto(prod) {
  // 1. Crear el contenedor de columna responsiva en el grid
  const articulo = document.createElement("article");
  articulo.classList.add("col-12", "col-sm-6", "col-lg-4");

  // 2. Crear la tarjeta (card)
  const tarjeta = document.createElement("div");
  tarjeta.classList.add("card", "card-producto", "h-100", "shadow-sm", "border-0");

  // 3. Crear contenedor multimedia (<figure>) y etiqueta <img>
  const figura = document.createElement("figure");
  figura.classList.add("m-0", "position-relative");

  const img = document.createElement("img");
  img.src = prod.imagen.src;
  img.alt = prod.imagen.alt || `Imagen de ${prod.nombre}`;
  img.classList.add("card-img-top");
  img.setAttribute("loading", "lazy");
  img.onerror = function() {
    if (!this.src.includes("semana5/") && !this.src.startsWith("http")) {
      this.src = "semana5/" + prod.imagen.src;
    }
  };

  // Insignia descriptiva (Badge)
  const badge = document.createElement("span");
  badge.classList.add("badge", `bg-${prod.badgeColor || "warning"}`, "position-absolute", "top-0", "start-0", "m-2", "shadow-sm");
  badge.textContent = prod.badge || "Destacado";

  figura.appendChild(img);
  figura.appendChild(badge);

  // 4. Crear cuerpo de la tarjeta (card-body)
  const cuerpo = document.createElement("div");
  cuerpo.classList.add("card-body", "d-flex", "flex-column");

  // Categoría
  const cat = document.createElement("small");
  cat.classList.add("text-muted", "fw-semibold", "text-uppercase", "mb-1");
  cat.textContent = prod.categoria || "Felimiau";

  // Título con textContent seguro
  const titulo = document.createElement("h4");
  titulo.classList.add("card-title", "h5", "fw-bold", "text-dark", "mb-2");
  titulo.textContent = prod.nombre;

  // Descripción
  const descripcion = document.createElement("p");
  descripcion.classList.add("card-text", "text-muted", "flex-grow-1");
  descripcion.textContent = prod.descripcion;

  // Precio formateado en pesos chilenos
  const precioEl = document.createElement("p");
  precioEl.textContent = `$${prod.precio.toLocaleString("es-CL")}`;
  precioEl.classList.add("precio-destacado", "mb-3");

  // Botón de acción interactivo
  const botonAccion = document.createElement("button");
  botonAccion.type = "button";
  botonAccion.classList.add("btn", "btn-warning", "text-dark", "fw-bold", "mt-auto", "btn-comprar");
  botonAccion.textContent = "🛒 Añadir al Carrito";

  // Evento click con feedback interactivo
  botonAccion.addEventListener("click", () => {
    const textoPrevio = botonAccion.textContent;
    botonAccion.textContent = "✅ ¡Añadido!";
    botonAccion.classList.replace("btn-warning", "btn-success");
    botonAccion.classList.replace("text-dark", "text-white");

    setTimeout(() => {
      botonAccion.textContent = textoPrevio;
      botonAccion.classList.replace("btn-success", "btn-warning");
      botonAccion.classList.replace("text-white", "text-dark");
    }, 1800);
  });

  // 5. Ensamblar estructura con appendChild
  cuerpo.appendChild(cat);
  cuerpo.appendChild(titulo);
  cuerpo.appendChild(descripcion);
  cuerpo.appendChild(precioEl);
  cuerpo.appendChild(botonAccion);

  tarjeta.appendChild(figura);
  tarjeta.appendChild(cuerpo);
  articulo.appendChild(tarjeta);

  return articulo;
}

// ==============================================================================
// 5. FETCH API, ASINCRONÍA Y PROMESAS (PASO 3 REQUERIDO)
// ==============================================================================

/**
 * Carga asincrónica completa con promesas (.then() y .catch()) desde 'data/productos.json'.
 * "Todo lo que sucede en el Fetch está en el futuro" (Apuntes de clase).
 */
function cargarProductos() {
  const contenedor = document.getElementById("productos");
  if (!contenedor) return;

  contenedor.innerHTML = `
    <div class="col-12 text-center py-5">
      <div class="spinner-border text-warning" role="status">
        <span class="visually-hidden">Cargando catálogo...</span>
      </div>
      <p class="text-muted mt-2">Cargando catálogo oficial...</p>
    </div>
  `;

  // Solicitud HTTP con Fetch API (compatible con ejecución en servidor raíz o subcarpeta)
  fetch("data/productos.json")
    .then((respuesta) => {
      if (!respuesta.ok) {
        // Intento de fallback si Live Server fue abierto en la carpeta raíz
        return fetch("semana5/data/productos.json");
      }
      return respuesta;
    })
    .then((respuesta) => {
      // Validación del estado de la respuesta del servidor (HTTP 200 OK)
      if (!respuesta.ok) {
        throw new Error(`Error en servidor: ${respuesta.status}`);
      }
      return respuesta.json(); // Convierte texto a objeto/arreglo JSON
    })
    .then((productos) => {
      // Limpia el contenedor previo a insertar los nuevos nodos
      contenedor.innerHTML = "";

      // Itera y anida dinámicamente cada producto creado con createElement
      productos.forEach((prod) => {
        const card = crearTarjetaProducto(prod);
        contenedor.appendChild(card);
      });
      console.log(`Catálogo cargado con éxito: ${productos.length} productos renderizados.`);
    })
    .catch((error) => {
      // Captura y manejo de posibles errores de red o carga de datos
      console.error("Error en Fetch:", error);
      contenedor.innerHTML = '<div class="col-12 text-center py-4"><p class="alert alert-warning d-inline-block">No se pudo cargar el catálogo de productos.</p></div>';
    });
}

// ==============================================================================
// 4. GESTIÓN DE EVENTOS E INTERACTIVIDAD (PASO 2 REQUERIDO)
// ==============================================================================

/**
 * A) Evento 'click' (Acciones de botones y conmutadores): Mostrar y ocultar ofertas
 */
function configurarEventoClickOfertas() {
  const botonOfertas = document.getElementById("boton_ofertas");
  const seccionOfertas = document.getElementById("seccion_ofertas");

  if (!botonOfertas || !seccionOfertas) return;

  botonOfertas.addEventListener("click", () => {
    seccionOfertas.classList.toggle("d-none");
    botonOfertas.textContent = seccionOfertas.classList.contains("d-none")
      ? "🔥 Ver Ofertas Especiales"
      : "❌ Ocultar Ofertas";
  });
}

/**
 * Evento 'click' adicional para control de accesibilidad del carrusel (Pausar / Reanudar)
 */
function configurarControlCarrusel() {
  const carruselEl = document.getElementById("carruselFelimiau");
  const btnPausa = document.getElementById("btn_pausa_carrusel");

  if (!carruselEl || !btnPausa || !window.bootstrap) return;

  const carrusel = bootstrap.Carousel.getOrCreateInstance(carruselEl);
  let pausado = false;

  btnPausa.addEventListener("click", () => {
    if (!pausado) {
      carrusel.pause();
      btnPausa.textContent = "▶️ Reanudar";
      pausado = true;
    } else {
      carrusel.cycle();
      btnPausa.textContent = "⏸️ Pausar";
      pausado = false;
    }
  });
}

/**
 * B) Eventos 'mouseover' y 'mouseout' (Efectos de puntero dinámico)
 */
function configurarEventosMouseMenu() {
  const menuProductos = document.getElementById("menu_productos");
  const menuServicios = document.getElementById("menu_servicios");
  const menuContacto = document.getElementById("menu_contacto");
  const leadInfo = document.getElementById("lead_info");

  if (!leadInfo) return;

  const textoBase = "Explora nuestra selección especial de artículos recomendados para el bienestar felino.";

  const enlaces = [
    { el: menuProductos, msg: "🐾 Catálogo completo: alimentos premium, rascadores y camas acogedoras." },
    { el: menuServicios, msg: "🚀 Despachos en 24/48 hrs garantizados a todo Chile y calidad veterinaria." },
    { el: menuContacto, msg: "💌 Contáctanos para asesoría personalizada en el cuidado de tu gato." }
  ];

  enlaces.forEach(({ el, msg }) => {
    if (el) {
      el.addEventListener("mouseover", () => {
        leadInfo.textContent = msg;
        leadInfo.classList.add("text-dark", "fw-semibold");
      });
      el.addEventListener("mouseout", () => {
        leadInfo.textContent = textoBase;
        leadInfo.classList.remove("text-dark", "fw-semibold");
      });
    }
  });
}

/**
 * C) Evento 'submit' y Prevención de Recarga con preventDefault()
 * Valida los campos con JavaScript y despliega el mensaje en el DOM sin recargar la página.
 */
function configurarEventoSubmitFormulario() {
  const formContacto = document.getElementById("form_contacto");
  const cajaMensaje = document.getElementById("mensaje_estado");

  if (!formContacto || !cajaMensaje) return;

  formContacto.addEventListener("submit", (evento) => {
    evento.preventDefault(); // Detiene la recarga por defecto obligatoria

    const inputNombre = document.getElementById("nombre_cliente").value.trim();
    const inputCorreo = document.getElementById("correo_cliente").value.trim();
    const inputAsunto = document.getElementById("asunto_cliente").value;
    const inputMensaje = document.getElementById("mensaje_cliente").value.trim();

    // Validación defensiva
    if (inputNombre === "" || inputCorreo === "" || inputAsunto === "" || inputMensaje === "") {
      cajaMensaje.style.display = "block";
      cajaMensaje.className = "alert alert-danger shadow-sm";
      cajaMensaje.textContent = "Debe completar todos los campos.";
      return;
    }

    // Validación básica de correo electrónico
    if (!inputCorreo.includes("@") || !inputCorreo.includes(".")) {
      cajaMensaje.style.display = "block";
      cajaMensaje.className = "alert alert-warning shadow-sm";
      cajaMensaje.textContent = "Por favor ingrese un correo electrónico válido.";
      return;
    }

    // Mensaje de éxito dinámico en el DOM
    cajaMensaje.style.display = "block";
    cajaMensaje.className = "alert alert-success shadow-sm";
    cajaMensaje.textContent = `¡Mensaje enviado con éxito, ${inputNombre}! Nos comunicaremos a ${inputCorreo} a la brevedad.`;
    
    // Restablecer campos del formulario
    formContacto.reset();

    // Ocultar mensaje tras 6 segundos
    setTimeout(() => {
      cajaMensaje.style.display = "none";
    }, 6000);
  });
}

// ==============================================================================
// 4.3 TEMPORIZADORES ASINCRÓNICOS: setTimeout y reestablecerColores()
// ==============================================================================

// --- Uso de setTimeout y función reestablecerColores() ---
// Función vista en clase para restablecer estilos masivamente
function reestablecerColores() {
  const elementosMenu = document.querySelectorAll('.nav-link');
  elementosMenu.forEach((el) => {
    el.style.color = ''; // Elimina el estilo en línea, vuelve al CSS original
    el.style.removeProperty('color');
  });
}

// ==============================================================================
// 1.4 EVENTO DOMContentLoaded (PUNTO DE ENTRADA SEGURO)
// ==============================================================================

// --- Uso Seguro de DOMContentLoaded ---
// BUENA PRÁCTICA: Asegurar la disponibilidad completa del DOM antes de ejecutar código
document.addEventListener("DOMContentLoaded", () => {
  console.log("El DOM está listo para ser manipulado con total seguridad.");

  // --- Demostración vista en clase de setTimeout y manipulación inicial ---
  // Resalta los enlaces del menú (Inicio, Productos, Servicios, Contacto) en color amarillo dorado y restaura tras 3 segundos (3000 ms)
  const elementosMenu = document.querySelectorAll('.nav-link');
  elementosMenu.forEach((el) => {
    el.style.setProperty('color', '#FACC15', 'important'); // Amarillo dorado de Felimiau
  });
  setTimeout(reestablecerColores, 3000);

  // 1. Carga dinámica de datos con Fetch API y Promesas
  cargarProductos();

  // 2. Inicialización de eventos interactivos (click, mouseover, submit)
  configurarEventoClickOfertas();
  configurarControlCarrusel();
  configurarEventosMouseMenu();
  configurarEventoSubmitFormulario();
});
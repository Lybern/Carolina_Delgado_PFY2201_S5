# 🐱 Felimiau | Tienda Especializada para Felinos

**Asignatura:** Desarrollo Frontend I (PFY2201)  
**Evaluación:** Experiencia de Aprendizaje 2 – Semana 5 (Formativa)  
**Actividad:** Manipulando el DOM con JavaScript para Mejorar la Interactividad  
**Estudiante:** Carolina Delgado  
**Institución:** Duoc UC – Escuela de Informática y Telecomunicaciones  

---

## 📖 Descripción del Proyecto

**Felimiau** es una plataforma web interactiva y responsiva desarrollada para una tienda boutique especializada en gatos. En esta quinta semana, se integró **JavaScript Vanilla moderno (ES6+)** para transformar la estructura visual en una aplicación dinámica e interactiva que responde a las acciones del usuario y consume datos de forma asincrónica.

El proyecto incorpora el 100% de la retroalimentación técnica de la semana anterior, separando estilos en una hoja CSS externa, optimizando imágenes locales (`blanquito.jpg`, `talia.jpg`, `rascador.png`), normalizando proporciones y profundizando la accesibilidad web (WCAG).

---

## Funcionalidades implementadas

### 1. Manipulación Dinámica del DOM (`createElement` y `appendChild`)
- Construcción modular y programática de las tarjetas de productos (`<article>`, `<figure>`, `<img>`, `<h3>`, `<p>`, `<button>`).
- Inserción segura mediante `appendChild()` y asignación de contenido textual con `textContent` para prevenir ataques de inyección de código (XSS).

### 2. Gestión de Eventos e Interactividad
- **Evento `click`:**
  - **Ofertas Especiales:** Botón interactivo que alterna la visibilidad de la sección de descuentos (`#seccion_ofertas`) con feedback en el texto del botón.
  - **Control de Accesibilidad del Carrusel:** Botón flotante para pausar o reanudar la rotación automática del carrusel de fotos.
  - **Acción de Compra:** Microinteracción con cambio de estado visual temporal al presionar *"Añadir al Carrito"*.
- **Eventos `mouseover` y `mouseout`:**
  - Guía dinámica para el usuario que actualiza el texto en `#lead_info` según el elemento del menú sobre el cual pasa el cursor.
  - Efectos visuales de realce en las tarjetas del catálogo.
- **Evento `submit` (Formulario de Contacto):**
  - Intercepción obligatoria con `evento.preventDefault()` para evitar la recarga del navegador.
  - Validación de campos requeridos y formato de correo electrónico mediante expresiones regulares.
  - Despliegue de mensajes de éxito/error dinámicos en el DOM (`#mensaje_estado`).

### 3. Consumo de Datos Asincrónicos (Fetch API & Promesas)
- Consumo de catálogo en formato JSON desde `data/productos.json` utilizando `fetch()`.
- Manejo de ciclo de vida de promesas con `.then()` para parseo y renderizado, y `.catch()` para captura y notificación amigable de errores en la interfaz.
- Indicador visual de carga (*Spinner*) durante la solicitud.

### 4. Buenas Prácticas y Código Limpio
- Funciones modulares con responsabilidad única (`crearTarjetaProducto`, `mostrarProductos`, `cargarProductos`, `configurarFormularioContacto`, etc.).
- Documentación completa mediante comentarios y bloques **JSDoc**.
- Hoja de estilos externa modular (`css/styles.css`).

---

## 🛠️ Estructura del Repositorio

```text
Carolina_Delgado_PFY2201_S5/
│
├── css/
│   └── styles.css              # Hoja de estilos personalizada externa
├── data/
│   └── productos.json          # Catálogo de productos en formato JSON
├── img/
│   ├── blanquito.jpg           # Fotografía de Blanquito (Carrusel Slide 1)
│   ├── rascador.png            # Fotografía del Rascador Castillo 3 Niveles
│   └── talia.jpg               # Fotografía de Talia (Carrusel Slide 2)
├── js/
│   └── scripts.js              # Lógica de JavaScript (DOM, Fetch, Eventos)
├── index.html                  # Estructura semántica HTML5 con Bootstrap 5.3
└── README.md                   # Documentación técnica del proyecto
```

---

## 🌐 Despliegue en GitHub Pages

El proyecto se encuentra desplegado y accesible públicamente a través de la rama `gh-pages`:

🔗 **Sitio Web en Vivo:** `https://Lybern.github.io/Carolina_Delgado_PFY2201_S5/` *(o URL de tu usuario)*

---

## 💻 Instrucciones para Ejecución Local

1. Clona este repositorio:
   ```bash
   git clone https://github.com/TU_USUARIO/Carolina_Delgado_PFY2201_S5.git
   ```
2. Abre la carpeta del proyecto en **Visual Studio Code**.
3. Inicia un servidor local (por ejemplo con la extensión **Live Server** o ejecutando `npx serve .`) para que la Fetch API pueda cargar `data/productos.json` sin bloqueos de protocolo local.
4. Abre tu navegador web en `http://localhost:5500`.

---
*Desarrollado con dedicación por **Carolina Delgado** — Duoc UC 2026.*

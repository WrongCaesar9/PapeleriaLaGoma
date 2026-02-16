
document.addEventListener("DOMContentLoaded", function() {
  // Obtener el menú lateral y los enlaces
  const sidebar = document.querySelector('.sidebar');
  const links = document.querySelectorAll('.sidebar nav a');

  // Añadir un evento de clic a cada enlace
  links.forEach(link => {
    link.addEventListener('click', function() {
      // Cerrar el menú lateral
      sidebar.classList.remove('active');
    });
  });

  // Código para el menú hamburguesa
  const hamburger = document.querySelector('.hamburger');
  hamburger.addEventListener('click', function() {
    sidebar.classList.toggle('active');
  });
});

// Código de paginación
const productosContenedor = document.getElementById("productos-contenedor");
const paginacionContenedor = document.getElementById("paginacion-contenedor");

// VARIABLES DE PAGINACIÓN
let paginaActual = 1;
const elementosPorPagina = 15; // ¡Cámbialo a 10, 20 o lo que gustes!

// Obtener los datos
fetch("datapg.json")
  .then(response => response.json())
  .then(data => {
    window.productos = data.productos;
    mostrarProductos();
  })
  .catch(error => console.error(error));


function mostrarProductos() {
  productosContenedor.innerHTML = "";

  // 1. OBTENER VALORES DE FILTROS
  const filtroModelo = document.getElementById("filtro-modelo").value;
  // Usamos || 0 por si el input está vacío o es inválido
  const filtroPrecio = parseFloat(document.getElementById("filtro-precio").value) || 0;
  const terminoBusqueda = document.getElementById("barra-busqueda").value.toLowerCase();

  // 2. FILTRAR PRIMERO (Creamos una lista temporal con los resultados válidos)
  // Usamos .filter en lugar de .forEach para obtener un nuevo array limpio
  const productosFiltrados = window.productos.filter(producto => {
    const nombreProducto = producto.nombre.toLowerCase();

    // Tu misma lógica de filtrado:
    return (
      (filtroModelo === "" || producto.modelo === filtroModelo) &&
      (filtroPrecio === 0 || producto.precio <= filtroPrecio) &&
      (nombreProducto.includes(terminoBusqueda) || terminoBusqueda === "")
    );
  });



  // --- NUEVO CÓDIGO: EL MESERO RESPONDE ---
  if (productosFiltrados.length === 0) {
    // 1. Limpiamos el contenedor
    productosContenedor.innerHTML = `
          <div class="no-resultados">
              <h3>🐸 Ups, no encontramos nada por aquí</h3>
              <p>Salta a otros filtros o busca con otro nombre.</p>
          </div>
      `;

    // 2. Limpiamos la paginación (para que no salgan botones)
    paginacionContenedor.innerHTML = "";

    // 3. DETENEMOS LA FUNCIÓN (Return)
    // Esto es importante: le decimos al código "ya no hagas nada más abajo"
    return;
  }
  // --- FIN DEL NUEVO CÓDIGO ---

  // 3. MATEMÁTICAS DE PAGINACIÓN
  const indiceInicio = (paginaActual - 1) * elementosPorPagina;
  const indiceFinal = indiceInicio + elementosPorPagina;

  // Recortamos la lista filtrada para mostrar solo la página actual
  const productosParaMostrar = productosFiltrados.slice(indiceInicio, indiceFinal);

  // 4. DIBUJAR LOS PRODUCTOS (Solo los de esta página)
  productosParaMostrar.forEach(producto => {
    // --- Aquí va TU código de creación de elementos intacto ---
    const productosDiv = document.createElement("div");
    productosDiv.classList.add("productos");

    const productosImg = document.createElement("img");
    productosImg.src = producto.img;
    productosImg.alt = producto.modelo;
    productosDiv.appendChild(productosImg);

    const productosNombre = document.createElement("p");
    productosNombre.innerHTML = producto.nombre;
    productosDiv.appendChild(productosNombre);

    const productosEnlace = document.createElement("p");
    const enlaceProducto = document.createElement("a");
    enlaceProducto.href = producto.enlace;
    enlaceProducto.target = "__blank";
    enlaceProducto.textContent = "Da el Salto 🐸🤙";
    productosEnlace.appendChild(enlaceProducto);
    productosDiv.appendChild(productosEnlace);

    const productosModel = document.createElement("div");
    productosModel.innerHTML = producto.modelo;
    productosDiv.appendChild(productosModel);

    productosContenedor.appendChild(productosDiv);
  });

  // 5. DIBUJAR LOS BOTONES DE PAGINACIÓN
  // Le pasamos el total de productos FILTRADOS (no el total global)
  setupPaginacion(productosFiltrados.length);
}

function setupPaginacion(totalItems) {
  paginacionContenedor.innerHTML = "";

  // Si no hay productos o caben todos en una página, no mostramos botones
  if (totalItems <= elementosPorPagina) return;

  const totalPaginas = Math.ceil(totalItems / elementosPorPagina);

  for (let i = 1; i <= totalPaginas; i++) {
    const boton = document.createElement("button");
    boton.innerText = i;

    if (i === paginaActual) {
      boton.classList.add("active");
    }

    boton.addEventListener("click", () => {
      paginaActual = i;
      mostrarProductos(); // Recargar productos con la nueva página
      // Opcional: Hacer scroll suave hacia arriba al cambiar de página
      document.getElementById("productos").scrollIntoView({ behavior: 'smooth' });
    });

    paginacionContenedor.appendChild(boton);
  }
}







// Código del botón "Ir Arriba" y Navbar Inteligente
document.addEventListener("DOMContentLoaded", () => {
    // 1. VARIABLES GLOBALES (Para que no las busque a cada rato)
    const btnTop = document.querySelector('.go-top-container');
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');
    let ubicacionPrincipal = window.scrollY;

    // 2. UN SOLO ESCUCHADOR DE EVENTOS (La sala de conferencias)
    window.addEventListener('scroll', () => {
        let desplazamientoActual = window.scrollY;

        // --- TAREA A: Lógica del Botón "Ir Arriba" ---
        // (Usamos desplazamientoActual que es lo mismo que document.documentElement.scrollTop)
        if (desplazamientoActual > 400) {
            btnTop.classList.add('show');
        } else {
            btnTop.classList.remove('show');
        }

        // --- TAREA B: Lógica del Navbar Inteligente ---
        if (ubicacionPrincipal >= desplazamientoActual) {
            // Subiendo
            header.classList.remove('escondido');
            nav.classList.remove('escondido');
        } else {
            // Bajando (con el margen de 50px para evitar parpadeos)
            if (desplazamientoActual > 200) { 
                header.classList.add('escondido');
                nav.classList.add('escondido');
            }
        }

        // Actualizamos la ubicación para la próxima vuelta
        ubicacionPrincipal = desplazamientoActual;
    });

    // 3. EVENTO CLICK DEL BOTÓN (Esto va fuera del scroll)
    btnTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});
// Aquí termina el código del botón "Ir Arriba" y Navbar Inteligente




// EVENTOS: IMPORTANTE
// Cuando se filtra, debemos "resetear" a la página 1, 
// si no, podríamos quedarnos en la página 5 sin resultados.

document.getElementById("filtro-modelo").addEventListener("change", () => {
  paginaActual = 1;
  mostrarProductos();
});

document.getElementById("barra-busqueda").addEventListener("input", () => {
  paginaActual = 1;
  mostrarProductos();
});

//Aquí termina el código de paginación
// Función de navegación entre secciones que se llama SPA por sus siglas en inglés (Single Page Application) 
function navegar(idSeccion) {
  // 1. Ocultar TODAS las secciones
  const todasLasSecciones = document.querySelectorAll('.view');
  todasLasSecciones.forEach(seccion => {
    seccion.style.display = 'none';
  });

  // 2. Mostrar la sección que queremos ver
  const seccionActiva = document.getElementById(idSeccion);
  if (seccionActiva) {
    seccionActiva.style.display = 'block'; // O 'grid' si usas grid en el contenedor padre

    // TRUCO PRO: Si entramos a productos, reseteamos la vista
    if (idSeccion === 'videos') {
      // Opcional: Si quieres que cada vez que entre se recarguen los productos
       //mostrarProductos(); 
    }
  }
}


// Código de formulario WhatsApp
function isMobile() {
  if (sessionStorage.desktop)
    return false;
  else if (localStorage.mobile)
    return true;

  var mobile = ['iphone', 'talet', 'OS', 'mobile', 'ipad', 'android', 'blackberry', 'nokia', 'opera mini', 'windows mobile', 'windows phone', 'iemobile'];
  for (var i in mobile)
    if (navigator.userAgent.toLowerCase().indexOf(mobile[i].toLowerCase()) > 0) return true;

  return false;
}
const formulario = document.querySelector('#formulario');
const buttonSubmit = document.querySelector('#submit');
const urlDesktop = 'https://web.whatsapp.com/';
const urlMobile = 'https://api.whatsapp.com/';
const telefono = '525515833826';
formulario.addEventListener('submit', (event) => {
  event.preventDefault()
  buttonSubmit.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i>'
  buttonSubmit.disabled = true
  setTimeout(() => {
    let nombre = document.querySelector('#nombre').value
    let pedidof = document.querySelector('#pedidof').value
    let mensaje = 'send?phone=' + telefono + '&text=*_Formulario de Sugerencia_*%0A*¿Cuál es tu nombre?*%0A' + nombre + '%0A*¿Qué deseas colocar? :D*%0A' + pedidof + ''
    if (isMobile()) {
      window.open(urlMobile + mensaje, '_blank')
    } else {
      window.open(urlDesktop + mensaje, '_blank')
    }
    buttonSubmit.innerHTML = '<i class="fab fa-whatsapp"></i> Enviar WhatsApp'
    buttonSubmit.disabled = false
  }, 1000);
});



























app.get('/blender', async (req, res) => {
  const response = await fetch('https://lagoma.netlify.app');
  const html = await response.text();
  res.send(html);
});

function copyCode(button) {
  // Selecciona el texto dentro del bloque <code>
  const code = button.nextElementSibling.innerText;
  navigator.clipboard.writeText(code).then(() => {
    button.innerText = "✅ Copiado!";
    setTimeout(() => button.innerText = "📋 Copiar", 2000);
  });
}

/* Código de fecha de actualización
document.getElementById("fecha-actualizacion").textContent = "Última actualización: 09/09/2025 01:42:33";*/
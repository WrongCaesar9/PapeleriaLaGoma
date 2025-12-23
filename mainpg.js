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

      const productosNombre = document.createElement("h3");
      productosNombre.innerHTML = producto.nombre;
      productosDiv.appendChild(productosNombre);

      const productosEnlace = document.createElement("h4");
      const enlaceProducto = document.createElement("a");
      enlaceProducto.href = producto.enlace;
      enlaceProducto.target = "__blank";
      enlaceProducto.textContent = "Da el Salto 🐸🤙";
      productosEnlace.appendChild(enlaceProducto);
      productosDiv.appendChild(productosEnlace);

      const productosModel = document.createElement("p");
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

// Código del botón "Ir arriba"
window.onscroll = function () {
  //console.log(document.documentElement.scrollTop);
  if (document.documentElement.scrollTop > 200) {
    document.querySelector('.go-top-container').classList.add('show');
  }
  else {
    document.querySelector('.go-top-container').classList.remove('show');

  }
}

document.querySelector('.go-top-container').addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});
// EVENTOS: IMPORTANTE
// Cuando se filtra, debemos "resetear" a la página 1, 
// si no, podríamos quedarnos en la página 5 sin resultados.

document.getElementById("filtro-modelo").addEventListener("change", () => {
    paginaActual = 1; 
    mostrarProductos();
});

document.getElementById("btn-buscar").addEventListener("click", () => {
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
            // mostrarProductos(); 
        }
    }
}
// Agrega esto al final de la función navegar:
window.location.hash = idSeccion;

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



window.addEventListener('scroll', function () {
  var nav = document.querySelector('header');
  if (window.scrollY >= 400) { // ajusta este valor según tus necesidades
    nav.classList.add('fixed');
  } else {
    nav.classList.remove('fixed');
  }
});



window.addEventListener('scroll', function () {
  var nav = document.querySelector('nav');
  if (window.scrollY >= 400) { // ajusta este valor según tus necesidades
    nav.classList.add('fixed');
  } else {
    nav.classList.remove('fixed');
  }
});


document.getElementById("fecha-actualizacion").textContent = "Última actualización: 09/09/2025 01:42:33";




document.addEventListener("DOMContentLoaded", function() {
    // 1. Buscamos los elementos. 
    // OJO: Si tus etiquetas NO son <header> y <nav>, cambia esto.
    // Ejemplo: si tienes <div id="mi-header"> usa document.getElementById('mi-header')
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');

    // Verificación de seguridad (El 'Console Log')
    if (!header || !nav) {
        console.error("❌ ERROR: No encuentro el header o el nav. Revisa si son etiquetas <header> o divs.");
        return; // Si no existen, detenemos el código para que no de errores
    } else {
        console.log("✅ Header y Nav encontrados. El script está listo.");
    }

    let ubicacionPrincipal = window.scrollY;

    window.addEventListener('scroll', function() {
        let desplazamientoActual = window.scrollY;

        // Imprime en consola cuánto has bajado (para ver si detecta el scroll)
        // console.log("Haciendo scroll...", desplazamientoActual); 

        if (ubicacionPrincipal >= desplazamientoActual) {
            // SUBIENDO (Mostrar)
            header.classList.remove('escondido');
            nav.classList.remove('escondido');
        } else {
            // BAJANDO (Ocultar)
            // Agregamos un pequeño margen (50px) para que no parpadee apenas bajes
            if (desplazamientoActual > 50) { 
                header.classList.add('escondido');
                nav.classList.add('escondido');
            }
        }

        ubicacionPrincipal = desplazamientoActual;
    });
});
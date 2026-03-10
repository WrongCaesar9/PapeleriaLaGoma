
document.addEventListener("DOMContentLoaded", function() {
  // Obtener el menú lateral y los enlaces
  const sidebar = document.querySelector('.sidebar');
  const links = document.querySelectorAll('.sidebar nav button');

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
const programasContenedor = document.getElementById("programas-contenedor");
const paginacionContenedor = document.getElementById("paginacion-contenedor");

// VARIABLES DE PAGINACIÓN
let paginaActual = 1;
const elementosPorPagina = 15; // ¡Cámbialo a 10, 20 o lo que gustes!

// Obtener los datos
fetch("datapg.json")
  .then(response => response.json())
  .then(data => {
    window.programas = data.programas;
    mostrarprogramas();
  })
  .catch(error => console.error(error));


function mostrarprogramas() {
  programasContenedor.innerHTML = "";

  // 1. OBTENER VALORES DE FILTROS
  const filtroModelo = document.getElementById("filtro-modelo").value;
  // Usamos || 0 por si el input está vacío o es inválido
  
  const terminoBusqueda = document.getElementById("barra-busqueda").value.toLowerCase();

  // 2. FILTRAR PRIMERO (Creamos una lista temporal con los resultados válidos)
  // Usamos .filter en lugar de .forEach para obtener un nuevo array limpio
  const programasFiltrados = window.programas.filter(producto => {
    const descriptionProducto = producto.description.toLowerCase();
    const tituloProducto = producto.titulo.toLowerCase();

    // Tu misma lógica de filtrado:
    return (
      (filtroModelo === "" || producto.modelo === filtroModelo) &&
      (descriptionProducto.includes(terminoBusqueda) || tituloProducto.includes(terminoBusqueda) || terminoBusqueda === "")
    );
  });



  // --- NUEVO CÓDIGO: EL MESERO RESPONDE ---
  if (programasFiltrados.length === 0) {
    // 1. Limpiamos el contenedor
    programasContenedor.innerHTML = `
          <div class="no-resultados">
              <h3>🐸 Ups, no encontramos nada por aquí</h3>
              <p>Salta a otros filtros o busca con otra palabra.</p>
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
  const programasParaMostrar = programasFiltrados.slice(indiceInicio, indiceFinal);

  // 4. DIBUJAR LOS programas (Solo los de esta página)
  programasParaMostrar.forEach(producto => {
    // --- Aquí va TU código de creación de elementos intacto ---
    const programasDiv = document.createElement("div");
    programasDiv.classList.add("programas");

    const programasImg = document.createElement("img");
    programasImg.src = producto.img;
    programasImg.title = producto.titulo;
    programasDiv.appendChild(programasImg);

    const programasTitulo = document.createElement("h2");
    programasTitulo.innerHTML = producto.titulo;
    programasDiv.appendChild(programasTitulo);

    const programasDescripcion = document.createElement("h3");
    programasDescripcion.innerHTML = producto.description;
    programasDiv.appendChild(programasDescripcion);

    const programasEnlace = document.createElement("h3");
    const enlaceProducto = document.createElement("a");
    enlaceProducto.href = producto.enlace;
    enlaceProducto.target = "__blank";
    enlaceProducto.textContent = "Da el Salto 🐸🤙";
    programasEnlace.appendChild(enlaceProducto);
    programasDiv.appendChild(programasEnlace);

    const programasModel = document.createElement("p");
    programasModel.innerHTML = producto.modelo;
    programasDiv.appendChild(programasModel);

    programasContenedor.appendChild(programasDiv);
  });

  // 5. DIBUJAR LOS BOTONES DE PAGINACIÓN     programasModel.innerHTML = producto.modelo + " - Updated:" + producto.fecha;
  // Le pasamos el total de programas FILTRADOS (no el total global)
  setupPaginacion(programasFiltrados.length);
}

function setupPaginacion(totalItems) {
  paginacionContenedor.innerHTML = "";

  // Si no hay programas o caben todos en una página, no mostramos botones
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
      mostrarprogramas(); // Recargar programas con la nueva página
      // Opcional: Hacer scroll suave hacia arriba al cambiar de página
      document.getElementById("programas").scrollIntoView({ behavior: 'smooth' });
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
        } else {
            // Bajando (con el margen de 50px para evitar parpadeos)
            if (desplazamientoActual > 200) { 
                header.classList.add('escondido');
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
  mostrarprogramas();
});

document.getElementById("barra-busqueda").addEventListener("input", () => {
  paginaActual = 1;
  mostrarprogramas();
});

//Aquí termina el código de paginación

// Función de navegación entre secciones
function navegar(idSeccion, event) {
    // 1. Quitar 'active' de todos los botones
    const botones = document.querySelectorAll('.thingi-btn');
    botones.forEach(btn => btn.classList.remove('active'));

    // 2. Si hay evento, marcar el botón clicado
    if (event && event.currentTarget) {
        event.currentTarget.classList.add('active');
    } else {
        // Si no hay evento (ej. carga inicial con hash), buscar el botón que corresponde
        const btnTarget = document.querySelector(`.thingi-btn[onclick*="${idSeccion}"]`);
        if (btnTarget) btnTarget.classList.add('active');
    }

    // 3. Ocultar todas las secciones
    const todasLasSecciones = document.querySelectorAll('.view');
    todasLasSecciones.forEach(seccion => seccion.style.display = 'none');

    // 4. Mostrar la sección activa
    const seccionActiva = document.getElementById(idSeccion);
    if (seccionActiva) {
        seccionActiva.style.display = 'block';
        seccionActiva.scrollIntoView({ behavior: 'smooth' });
        history.pushState(null, null, '#' + idSeccion);
    }
}

// Al cargar la página, si hay un hash en la URL, mostrar esa sección y marcar el botón
window.addEventListener('DOMContentLoaded', () => {
    const hash = window.location.hash.substring(1);
    if (hash) {
        navegar(hash);
    }
});


// Al cargar la página, si hay un hash en la URL, mostrar esa sección
window.addEventListener('DOMContentLoaded', () => {
    const hash = window.location.hash.substring(1);
    if (hash) {
        navegar(hash);
        btn.classList.add('active');
    }
});


window.addEventListener('load', () => {
    const hash = window.location.hash.substring(1); // Obtiene 'videos' de '#videos'
    if (hash) {
        const botones = document.querySelectorAll('.thingi-btn');
        botones.forEach(btn => {
            // Verifica si el onclick del botón contiene el description de la sección
            if (btn.getAttribute('onclick').includes(`'${hash}'`)) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }
});




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
    let description = document.querySelector('#description').value
    let pedidof = document.querySelector('#pedidof').value
    let mensaje = 'send?phone=' + telefono + '&text=*_Formulario de Sugerencia_*%0A*¿Cuál es tu description?*%0A' + description + '%0A*¿Qué deseas colocar? :D*%0A' + pedidof + ''
    if (isMobile()) {
      window.open(urlMobile + mensaje, '_blank')
    } else {
      window.open(urlDesktop + mensaje, '_blank')
    }
    buttonSubmit.innerHTML = '<i class="fab fa-whatsapp"></i> Enviar WhatsApp'
    buttonSubmit.disabled = false
  }, 1000);
});


























function copyCode(button) {
  const codeElement = button.nextElementSibling.querySelector("code"); const codeText = codeElement.innerText; // Intentar con navigator.clipboard 
  if (navigator.clipboard && window.isSecureContext) { navigator.clipboard.writeText(codeText).then(() => { button.innerText = "Copiado"; setTimeout(() => button.innerText = "Copiar", 2000); }); } else {
    // Fallback para móviles 
    const textArea = document.createElement("textarea"); textArea.value = codeText; document.body.appendChild(textArea); textArea.select(); document.execCommand("copy"); document.body.removeChild(textArea); button.innerText = "Copiado"; setTimeout(() => button.innerText = "Copiar", 2000);
  }
}

async function copyC(bt) {
    // 1. Obtener el texto (asumiendo que está en un bloque <pre> o <code>)
    const textToCopy = bt.innerText;
    
    try {
        // 2. Copiar al portapapeles
        await navigator.clipboard.writeText(textToCopy);
        
        // 3. Feedback visual (sin bloquear la pantalla con alert)
        const originalText = bt.innerText;
        bt.innerText = "¡Copiado!";
        setTimeout(() => bt.innerText = originalText, 2000);
    } catch (err) {
        alert("Error al copiar: ", err);
    }
}

function mostrarToast() {
    const container = document.getElementById('toast-container');
    
    // Crear el elemento div
    const toast = document.createElement('div');
    toast.className = 'toast success'; // Se puede cambiar a 'error'
    toast.innerText = '¡Acción exitosa!';
    
    // Añadir al contenedor
    container.appendChild(toast);
    
    // Mostrar la alerta (activar animación)
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    // Eliminar la alerta automáticamente después de 3 segundos
    setTimeout(() => {
        toast.classList.remove('show');
        // Eliminar del DOM después de la transición
        setTimeout(() => {
            container.removeChild(toast);
        }, 500);
    }, 3000);
}


async function iniciarCarruselPro() {
    try {
        const respuesta = await fetch('datapg.json');
        const datos = await respuesta.json();
        const gallery = document.getElementById('carouselGallery');

        const programas = datos.programas
            .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
            .slice(0, 10);
        
        const n = programas.length;

        const crearSlide = (p) => `
        
            <div class="carousel-slide"><h3 style="font-size: 16px; font-weight: bold; position: absolute; margin-top: 92%; background: rgba(0, 0, 0, 0.42); color: white; border-radius: 5px; padding: 5px 5px 2px 5px; backdrop-filter: blur(10px);">${p.titulo}</h3>
                <img src="${p.img}" alt="Imagen de programa">
                <div class="info-overlay">
                    <div class="info-content">
                        <h3>${p.description}</h3>
                        <p class="modelo-tag">Filtro: ${p.modelo}</p>
                        <center><a href="${p.enlace}" target="_blank" class="btn-directo">Da el Salto 🐸🤙</a></center>
                    </div>
                </div>
            </div>`;

        // Clonado para infinito
        let contenidoTrack = crearSlide(programas[n - 1]); 
        programas.forEach(p => contenidoTrack += crearSlide(p));
        contenidoTrack += crearSlide(programas[0]);

        // Inyectamos HTML (incluyendo el contenedor de dots vacío)
        gallery.innerHTML = `
            <div class="carousel-track">${contenidoTrack}</div>
            <button class="carousel-btn prev">◀</button>
            <button class="carousel-btn next">▶</button>
            <div class="carousel-dots" id="dotsContainer"></div>
        `;

        const track = gallery.querySelector('.carousel-track');
        const dotsContainer = document.getElementById('dotsContainer');
        let index = 0; 
        let isTransitioning = false;

        // --- VARIABLES PARA TOUCH SWIPE ---
        let touchStartX = 0;
        let touchEndX = 0;

        // --- CREAR LOS PUNTOS ---
        programas.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => mover(i));
            dotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll('.dot');

        function actualizarDots(idx) {
            dots.forEach(dot => dot.classList.remove('active'));
            // Lógica para que el clon del final active el primer dot y viceversa
            let realIdx = idx;
            if (idx === n) realIdx = 0;
            if (idx === -1) realIdx = n - 1;
            dots[realIdx].classList.add('active');
        }

        track.style.transform = `translateX(-100%)`;
        void track.offsetWidth; 

        function mover(objetivo) {
            if (isTransitioning) return;
            isTransitioning = true;
            index = objetivo;
            
            track.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            track.style.transform = `translateX(-${(index + 1) * 100}%)`;
            actualizarDots(index);
        }
                        
        track.addEventListener('transitionend', () => {
            isTransitioning = false;
            if (index === n) {
                track.style.transition = 'none';
                index = 0;
                track.style.transform = `translateX(-100%)`;
            }
            if (index === -1) {
                track.style.transition = 'none';
                index = n - 1;
                track.style.transform = `translateX(-${(index + 1) * 100}%)`;
            }
        });

        gallery.querySelector('.next').addEventListener('click', () => mover(index + 1));
        gallery.querySelector('.prev').addEventListener('click', () => mover(index - 1));

        // --- TOUCH SWIPE EVENTS ---
        gallery.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        gallery.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });

        function handleSwipe() {
            const diferencia = touchStartX - touchEndX;
            const umbral = 50;

            if (diferencia > umbral) {
                // Swipe a la izquierda (siguiente)
                mover(index + 1);
            } else if (diferencia < -umbral) {
                // Swipe a la derecha (anterior)
                mover(index - 1);
            }
        }

        // --- GESTIÓN DE AUTOPLAY MEJORADA ---
        let intervalo;

        function iniciarAutoplay() {
            detenerAutoplay(); // Limpieza preventiva
            intervalo = setInterval(() => {
                // Solo movemos si la pestaña es visible para evitar que se trabe
                if (!document.hidden) {
                    mover(index + 1);
                }
            }, 2500);
        }

        function detenerAutoplay() {
            clearInterval(intervalo);
        }

        // Iniciar por primera vez
        iniciarAutoplay();

        // Pausar con el mouse
        gallery.addEventListener('mouseenter', detenerAutoplay);
        gallery.addEventListener('mouseleave', iniciarAutoplay);

        // --- EL FIX MAESTRO: Visibility Change ---
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                detenerAutoplay();
            } else {
                isTransitioning = false; 
                iniciarAutoplay();
            }
        });

    } catch (error) {
        console.error("Hubo un error:", error);
    }
}

// --- REINICIAR CARRUSEL AL VOLVER A LA SECCIÓN ---
const originalNavegar = window.navegar;
window.navegar = function(idSeccion, event) {
    originalNavegar(idSeccion, event);
    
    if (idSeccion === 'programas') {
        iniciarCarruselPro();
    }
};

document.addEventListener('DOMContentLoaded', iniciarCarruselPro);
/* 
function copyCode(button) {
  const codeElement = button.nextElementSibling.querySelector("code");
  const codeText = codeElement.innerText;
  
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(codeText).then(() => {
      button.innerText = "Copiado";
      alert("¡Código copiado al portapapeles!");
      setTimeout(() => button.innerText = "Copiar", 2000);
    });
  } else {
    // Fallback para móviles
    const textArea = document.createElement("textarea");
    textArea.value = codeText;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    button.innerText = "Copiado";
    alert("¡Código copiado al portapapeles!");
    setTimeout(() => button.innerText = "Copiar", 2000);
  }
}




Código de fecha de actualización
document.getElementById("fecha-actualizacion").textContent = "Última actualización: 09/09/2025 01:42:33";*/
const dateText = "2026/03/09";
const hourText = "22:12"
const dateContenedor = document.getElementById("date-update");
dateContenedor.innerHTML = "<p style=\"font-size: 18px;\">Copyright © 2026 \"La Goma\"</p>"+"<p style=\"font-size: 16px;\">Última actualización: "+ dateText + " at: " + hourText + "</p>";

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
// Obtener el botón
let scrollTopBtn = document.getElementById("scrollTopBtn");

// Mostrar el botón al hacer scroll hacia abajo
window.onscroll = function() {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    scrollTopBtn.style.display = "block";
  } else {
    scrollTopBtn.style.display = "none";
  }
}

// Volver arriba al hacer clic
function topFunction() {
  document.body.scrollTop = 0; // Para Safari
  document.documentElement.scrollTop = 0; // Para Chrome, Firefox, IE y Opera
}

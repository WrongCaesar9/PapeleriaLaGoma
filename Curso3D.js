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

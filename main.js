//Inicio script Carrousel mainSlider
let mainSliderSlideIndex = 0;
mainSliderShowSlides();

function mainSliderShowSlides() {
    let izzz;
    let slides = document.getElementsByClassName("mainSlider-mySlides");
    let dots = document.getElementsByClassName("mainSlider-dot");
    for (izzz = 0; izzz < slides.length; izzz++) {
        slides[izzz].style.display = "none";  
    }
    mainSliderSlideIndex++;
    if (mainSliderSlideIndex > slides.length) {mainSliderSlideIndex = 1}    
    for (izzz = 0; izzz < dots.length; izzz++) {
        dots[izzz].className = dots[izzz].className.replace(" mainSlider-active", "");
    }
    slides[mainSliderSlideIndex-1].style.display = "block";  
    dots[mainSliderSlideIndex-1].className += " mainSlider-active";
    setTimeout(mainSliderShowSlides, 4000); // Change image every 2 seconds
}
//Fin script Carrousel mainSlider

//Inicio Script para el nav
document.querySelectorAll('.menu-item > a').forEach(link => {
  link.addEventListener('click', function (e) {
    if (window.innerWidth <= 768) {
      const submenu = this.nextElementSibling;
      if (submenu && submenu.classList.contains('submenu')) {
        e.preventDefault();
        submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
      }
    }
  });
});

document.querySelector('.menu-toggle').addEventListener('click', function() {
  document.querySelector('.menu').classList.toggle('active');
});
//Fin Script para el nav

//Inicio Script para los productos de la papeleria
document.addEventListener("DOMContentLoaded", function() {
  fetch('productos.json')
      .then(response => response.json())
      .then(data => {
          const container = document.getElementById('papeleria');
          data.forEach(producto => {
              const productCard = document.createElement('div');
              productCard.className = 'product-card';

              productCard.innerHTML = `
                  <img src="${producto.imagen}" alt="${producto.nombre}" class="product-image">
                  <h1 class="product-name">${producto.nombre}</h1>
                  <p class="product-description">${producto.descripcion}</p>
                  <p class="product-price">$${producto.precio}</p>
                  <button class="product-buy" onclick="comprarProducto('${producto.nombre}', '${producto.descripcion}', '${producto.precio}', '${producto.imagen}', ${JSON.stringify(producto.imagenes)})">Comprar</button>
              `;

              container.appendChild(productCard);
          });
      })
      .catch(error => console.error('Error al cargar los productos:', error));
});

function comprarProducto(nombre, descripcion, precio, imagen, imagenes) {
  localStorage.setItem('productoSeleccionado', JSON.stringify({nombre, descripcion, precio, imagen, imagenes}));
  window.location.href = 'https://www.google.com.mx';
}
//Fin Script para los productos de la papeleria
document.addEventListener("DOMContentLoaded", function() {
    const producto = JSON.parse(localStorage.getItem('productoSeleccionado'));
    if (!producto) return;

    const container = document.getElementById('product-details');

    const productDetails = document.createElement('div');
    productDetails.className = 'product-details';

    let imagenesHTML = '';
    producto.imagenes.forEach(img => {
        imagenesHTML += `<div class="product-slide"><img src="${img}" alt="${producto.nombre}"></div>`;
    });

    productDetails.innerHTML = `
        <div class="product-images">
            <div class="product-slideshow-container">${imagenesHTML}</div>
        </div>
        <h2 class="product-name">${producto.nombre}</h2>
        <p class="product-description">${producto.descripcion}</p>
        <p class="product-price">$${producto.precio}</p>
        <button class="bt-wha" onclick="enviarWhatsApp('${producto.nombre}', '${producto.precio}', '${producto.imagen}')"><i class="fa-brands fa-whatsapp"></i> Comprar por WhatsApp</button>
        <button class="bt-gmail" onclick="enviarEmail('${producto.nombre}', '${producto.precio}', '${producto.imagen}')"><i class="fa-regular fa-envelope"></i> Comprar por Email</button>
    `;

    container.appendChild(productDetails);

    iniciarCarrusel();
});

function iniciarCarrusel() {
    let slideIndex = 0;
    mostrarSlides();

    function mostrarSlides() {
        let i;
        let slides = document.getElementsByClassName("product-slide");
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";  
        }
        slideIndex++;
        if (slideIndex > slides.length) {slideIndex = 1}    
        slides[slideIndex-1].style.display = "block";  
        setTimeout(mostrarSlides, 3000); // Cambia la imagen cada 3 segundos
    }
}



  // Carousel logic for "featured" section
  const carousel = document.querySelector('.carousel');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  const carouselItems = document.querySelectorAll('.carousel-item');

  let currentIndex = 0;

  function updateCarousel() {
    carouselItems.forEach(item => item.classList.remove('active'));
    carouselItems[currentIndex].classList.add('active');
    carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : carouselItems.length - 1;
    updateCarousel();
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex < carouselItems.length - 1) ? currentIndex + 1 : 0;
    updateCarousel();
  });

  updateCarousel();

function enviarWhatsApp(nombre, precio, imagen) {
    const mensaje = `*Formulario de compra*\n¡Hola! Estoy interesado en el producto: *${nombre}*\nCon un costo de: *$${precio}*\nEcha un vistazo a la imagen del producto aquí: * ${window.location.origin}${imagen} *`;
    const url = `https://wa.me/525515833826?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
}

function enviarEmail(nombre, precio, imagen) {
    const subject = `Interesado en el producto: ${nombre}`;
    const body = `Formulario de compra\n¡Hola! Estoy interesado en el producto: ${nombre}\nCon un costo de: $${precio}\nEcha un vistazo a la imagen del producto aquí: ${window.location.origin}${imagen}`;
    const mailto = `mailto:josuejuarez12396@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
}

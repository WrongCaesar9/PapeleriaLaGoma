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
        <button onclick="enviarWhatsApp('${producto.nombre}', '${producto.precio}')">Comprar por WhatsApp</button>
        <button onclick="enviarEmail('${producto.nombre}', '${producto.precio}')">Comprar por Email</button>
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

function enviarWhatsApp(nombre, precio) {
    const mensaje = `Estoy interesado en el producto: ${nombre}, que tiene un precio de $${precio}.`;
    const url = `https://wa.me/?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
}

function enviarEmail(nombre, precio) {
    const subject = `Interesado en el producto: ${nombre}`;
    const body = `Estoy interesado en el producto: ${nombre}, que tiene un precio de $${precio}.`;
    const mailto = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
}
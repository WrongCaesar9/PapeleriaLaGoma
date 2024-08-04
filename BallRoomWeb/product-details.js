// Cargar los datos del producto seleccionado
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

Promise.all([
    fetch('productsM.json'),
    fetch('productsW.json'),
    fetch('galleryproducts.json')
]).then(responses => Promise.all(responses.map(response => response.json())))
  .then(data => {
    const allProducts = [...data[0], ...data[1], ...data[2]];
    const product = allProducts.find(p => p.id === productId || p.title === productId || p.name === productId);

    if (product) {
        document.querySelector('.detail-title').textContent = product.title || product.name;
        document.querySelector('.detail-image').src = product.image;
        document.querySelector('.detail-description').textContent = product.description;
        document.querySelector('.detail-price').textContent = `Cost: ${product.price}`;
        
        // Agregar sugerencias
        const suggestionList = document.querySelector('.suggestion-list');
        const suggestions = allProducts.filter(p => p.id !== productId).slice(0,0); // Limitar a 3 sugerencias

        suggestions.forEach(suggestion => {
            const suggestionDiv = document.createElement('div');
            suggestionDiv.innerHTML = `
                <img src="${suggestion.image}" alt="${suggestion.title || suggestion.name}" class="suggestion-image">
                <p>${suggestion.title || suggestion.name} - ${suggestion.price}</p>
                <a href="product-details.html?id=${suggestion.id}">View details</a>
            `;
            suggestionList.appendChild(suggestionDiv);
        });

        // Agregar funcionalidad al botón de correo
        const emailButton = document.getElementById('email-button');
        emailButton.addEventListener('click', () => {
            const subject = `Check out product: ${product.title || product.name}`;
            const body = `Im interested in the product: ${product.title || product.name}\nDescription: ${product.description}\nCost: ${product.price}\nImage: https://lagoma.netlify.app/BallRoomWeb${product.image}`;
            const mailtoUrl = `mailto:ballroomperfumes@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            window.location.href = mailtoUrl; // Abre el cliente de correo con el mailto URL
        });

        // Agregar funcionalidad al botón de WhatsApp
        const whatsappButton = document.getElementById('whatsapp-button');
        whatsappButton.addEventListener('click', () => {
            const whatsappNumber = '+525515833816';
            const message = `Im interested in the product: ${product.title || product.name}\nDescription: ${product.description}\nCost: ${product.price}\nImage: https://lagoma.netlify.app/BallRoomWeb${product.image}`;
            const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank'); // Abre el enlace de WhatsApp en una nueva pestaña
        });
    } else {
        console.error('Product not found');
    }
}).catch(error => console.error('Error while chargin the products:', error));
















document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById('mobile-menu');
    const navList = document.querySelector('.nav-list');
  
    menuToggle.addEventListener('click', () => {
      navList.classList.toggle('active');
    });
  
    // Función para cerrar el menú al seleccionar un apartado
    function closeMenu() {
      navList.classList.remove('active');
    }
  
    // Mostrar la sección correspondiente
    function showSection(id) {
      document.querySelectorAll('section').forEach(section => {
        section.style.display = 'none';
        if (section.id === id) {
          section.style.display = 'block';
        }
      });
      closeMenu(); // Cerrar el menú después de mostrar la sección
    }
  
    // Inicialización para los enlaces del menú
    document.querySelectorAll('.nav-list a').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = link.getAttribute('href').substring(1);
        showSection(sectionId);
      });
    });
  
    // Inicialización para los enlaces adicionales del menú
    document.querySelectorAll('.nav-listA a').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = link.getAttribute('href').substring(1);
        showSection(sectionId);
      });
    });
  
    // Mostrar la sección de inicio por defecto
    showSection('home');
  
  
  
  
  
  
  
    
  
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
  
    // Carousel logic for "home" section with auto-slide
    const carouselW = document.querySelector('.carousel-innerW');
    const carouselWItems = document.querySelectorAll('.carousel-itemW');
    let currentIndexW = 0;
  
    function updateCarouselW() {
      carouselWItems.forEach(item => item.classList.remove('active'));
      carouselWItems[currentIndexW].classList.add('active');
      carouselW.style.transform = `translateX(-${currentIndexW * 100}%)`;
    }
  
    function autoSlide() {
      currentIndexW = (currentIndexW + 1) % carouselWItems.length;
      updateCarouselW();
    }
  
    setInterval(autoSlide, 2000); // Change slide every 2 seconds
  
    updateCarouselW();
  });
  
  document.addEventListener('DOMContentLoaded', function () {
    const carrusel = document.querySelector('.carrusela');
    const imagenes = document.querySelectorAll('.imagen-carouselHome');
    const botonRetroceder = document.querySelector('.boton-retroceder');
    const botonAvanzar = document.querySelector('.boton-avanzar');
  
    let index = 0;
  
    function mostrarImagen(index) {
        const offset = imagenes[index].offsetLeft;
        carrusel.scrollTo({
            left: offset,
            behavior: 'smooth' // Desplazamiento suave
        });
    }
  
    botonRetroceder.addEventListener('click', () => {
        if (index > 0) {
            index--;
            mostrarImagen(index);
        }
    });
  
    botonAvanzar.addEventListener('click', () => {
        if (index < imagenes.length - 1) {
            index++;
            mostrarImagen(index);
        }
    });
  
    // Auto play
    setInterval(() => {
        index = (index + 1) % imagenes.length;
        mostrarImagen(index);
    }, 1500); // Cambiar cada 3 segundos
  });
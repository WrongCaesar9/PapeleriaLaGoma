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
  }, 2500); // Cambiar cada 3 segundos
});

document.addEventListener('DOMContentLoaded', function () {
  const carrusela = document.querySelector('.carrusela');
  const imagenes = document.querySelectorAll('.imagen-render');
  const botonRetroceder = document.querySelector('.boton-retroceder');
  const botonAvanzar = document.querySelector('.boton-avanzar');

  let currentIndex = 0;

  const mostrarImagen = (index) => {
    currentIndex = index;
    carrusela.scrollLeft = imagenes[index].offsetLeft;
  };

  const avanzarImagen = () => {
    currentIndex++;
    if (currentIndex >= imagenes.length) {
      currentIndex = 0;
    }
    mostrarImagen(currentIndex);
  };

  const retrocederImagen = () => {
    currentIndex--;
    if (currentIndex < 0) {
      currentIndex = imagenes.length - 1;
    }
    mostrarImagen(currentIndex);
  };

  botonAvanzar.addEventListener('click', avanzarImagen);
  botonRetroceder.addEventListener('click', retrocederImagen);

  imagenes.forEach((imagen, index) => {
    imagen.addEventListener('click', () => {
      mostrarImagen(index);
    });
  });

  const iniciarCarruselaAutomatico = () => {
    setInterval(avanzarImagen, 2000);
  };

  iniciarCarruselaAutomatico();
});

function isMobile() {
  if (sessionStorage.desktop) return false;
  if (localStorage.mobile) return true;

  const mobileDevices = ['iphone', 'talet', 'OS', 'mobile', 'ipad', 'android', 'blackberry', 'nokia', 'opera mini', 'windows mobile', 'windows phone', 'iemobile'];
  return mobileDevices.some(device => navigator.userAgent.toLowerCase().includes(device.toLowerCase()));
}

const formulario = document.querySelector('#formulario');
const buttonSubmit = document.querySelector('#submit');
const urlDesktop = 'https://web.whatsapp.com/';
const urlMobile = 'https://api.whatsapp.com/';
const telefono = '0000000000';

formulario.addEventListener('submit', (event) => {
  event.preventDefault();
  buttonSubmit.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i>';
  buttonSubmit.disabled = true;

  setTimeout(() => {
    const nombre = document.querySelector('#nombre').value;
    const pedidof = document.querySelector('#pedidof').value;
    const mensaje = `send?phone=${telefono}&text=*_Suggestion Form_*%0A*Ur Name:*%0A${nombre}%0A*Description:*%0A${pedidof}`;

    window.open(isMobile() ? urlMobile + mensaje : urlDesktop + mensaje, '_blank');
    buttonSubmit.innerHTML = '<i class="fab fa-whatsapp"></i> Send WhatsApp';
    buttonSubmit.disabled = false;
  }, 1000);
});

function sendWhatsApp(productName, description, imagePath, price) {
  const phoneNumber = '0000000000';
  const baseUrl = 'https://lagoma.netlify.app';
  const imageUrl = `${baseUrl}${imagePath}`;
  const message = `Hello, I am interested in the following product:\n\n*${productName}*\n${description}\n*Price:* ${price}\n\nYou can view the product image here: ${imageUrl}`;
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  window.open(whatsappUrl, '_blank');
}

window.onscroll = function () {
  const goTopContainer = document.querySelector('.go-top-container');
  goTopContainer.classList.toggle('show', document.documentElement.scrollTop > 150);
};

document.querySelector('.go-top-container').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', function () {
  const nav = document.querySelector('header');
  nav.classList.toggle('fixed', window.scrollY >= 300);
});

function loadProducts(containerId, jsonFile) {
  const productTableBody = document.getElementById(containerId);

  fetch(jsonFile)
    .then(response => response.json())
    .then(data => {
      data.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td><img src="${product.image}" alt="${product.name}" class="product-image"></td>
          <td>${product.name}</td>
          <td>${product.description}</td>
          <td>${product.price}</td>
          <td><button onclick="sendWhatsApp('${product.name}', '${product.description}', '${product.image}', '${product.price}')">ORDER BY WHATSAPP</button></td>
        `;
        productTableBody.appendChild(row);
      });
    })
    .catch(error => console.error('Error while loading products DX', error));
}

document.addEventListener('DOMContentLoaded', function () {
  loadProducts('product-tableM-body', 'productsM.json');
  loadProducts('product-tableW-body', 'productsW.json');
});





window.addEventListener('resize', function () {
  const frameHeight = window.innerHeight;
  const frameWidth = window.innerWidth;

  document.querySelectorAll('.frame').forEach(frame => {
    frame.style.height = `${frameHeight}px`;
    frame.style.width = `${frameWidth}px`;
  });
});
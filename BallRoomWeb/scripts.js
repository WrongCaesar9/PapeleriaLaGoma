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
    setInterval(avanzarImagen, 1500);
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







/* global woodmart_settings 
(function($) {
	woodmartThemeModule.scrollTop = function() {
		var $scrollTop = $('.scrollToTop');

		woodmartThemeModule.$window.on('scroll', function() {
			if ($(this).scrollTop() > 100) {
				$scrollTop.addClass('button-show');
			} else {
				$scrollTop.removeClass('button-show');
			}
		});

		$scrollTop.on('click', function() {
			$('html, body').animate({
				scrollTop: 0
			}, 800);
			return false;
		});
	};

	$(document).ready(function() {
		woodmartThemeModule.scrollTop();
	});
})(jQuery);*/




let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  slides[slideIndex-1].style.display = "block";
  setTimeout(showSlides,3500); // Change image every 2 seconds
}


























document.addEventListener('DOMContentLoaded', function() {
  fetch('galleryproducts.json')
      .then(response => response.json())
      .then(products => {
          const productContainer = document.getElementById('product-container');
          products.forEach(product => {
              const productHTML = `
                  <div class="home-column">
                      <div class="home-card">
                          <img src="${product.image}" alt="${product.alt}" style="width:100%">
                          <div class="home-container">
                              <pg>${product.title}<pg>
                              <p class="home-title">ID: ${product.id}</p>
                              <p>${product.description}</p>
                              <p>${product.price}</p>
                              <p>${product.volume}</p>
                              <a href="https://wa.me/?text=Im%20interested%20in%20${encodeURIComponent(product.title)}%20with%20ID%20${product.id}%20with%20cost of%20${product.price}%20and%20have%20a%20volume%20of%20${product.volume}" target="_blank">
                                  <p><button class="home-button">Contact</button></p>
                              </a>
                          </div>
                      </div>
                  </div>
              `;
              productContainer.innerHTML += productHTML;
          });
      })
      .catch(error => console.error('Error loading products:', error));
});

















// Cargar los datos del producto seleccionado
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
        document.querySelector('.detail-price').textContent = `Precio: ${product.price}`;
        
        // Agregar sugerencias
        const suggestionList = document.querySelector('.suggestion-list');
        const suggestions = allProducts.filter(p => p.id !== productId).slice(0,0); // Limitar a 3 sugerencias

        suggestions.forEach(suggestion => {
            const suggestionDiv = document.createElement('div');
            suggestionDiv.innerHTML = `
                <img src="${suggestion.image}" alt="${suggestion.title || suggestion.name}" class="suggestion-image">
                <p>${suggestion.title || suggestion.name} - ${suggestion.price}</p>
                <a href="product-details.html?id=${suggestion.id}">Ver Detalles</a>
            `;
            suggestionList.appendChild(suggestionDiv);
        });

        // Agregar funcionalidad al botón de correo
        const emailButton = document.getElementById('email-button');
        emailButton.addEventListener('click', () => {
            const subject = `Interesado en el producto: ${product.title || product.name}`;
            const body = `Estoy interesado en el producto: ${product.title || product.name}\nDescripción: ${product.description}\nPrecio: ${product.price}\nImagen: ${product.image}`;
            const mailtoUrl = `mailto:ballroomperfumes@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            window.location.href = mailtoUrl; // Abre el cliente de correo con el mailto URL
        });

        // Agregar funcionalidad al botón de WhatsApp
        const whatsappButton = document.getElementById('whatsapp-button');
        whatsappButton.addEventListener('click', () => {
            const whatsappNumber = '5620886202';
            const message = `Estoy interesado en el producto: ${product.title || product.name}\nDescripción: ${product.description}\nPrecio: ${product.price}\nImagen: ${product.image}`;
            const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank'); // Abre el enlace de WhatsApp en una nueva pestaña
        });
    } else {
        console.error('Producto no encontrado');
    }
}).catch(error => console.error('Error al cargar los productos:', error));


























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
    setTimeout(mainSliderShowSlides, 2000); // Change image every 2 seconds
}






// Next time use letsdeel.com to make sure you get paid
(function(){
	/* change these variables as you wish */
	var due_date = new Date('2024-08-19');
	var days_deadline = 5;
	/* stop changing here */
	
	var current_date = new Date();
	var utc1 = Date.UTC(due_date.getFullYear(), due_date.getMonth(), due_date.getDate());
	var utc2 = Date.UTC(current_date.getFullYear(), current_date.getMonth(), current_date.getDate());
	var days = Math.floor((utc2 - utc1) / (1000 * 60 * 60 * 24));
	
	if(days > 0) {
		var days_late = days_deadline-days;
		var opacity = (days_late*100/days_deadline)/100;
			opacity = (opacity < 0) ? 0 : opacity;
			opacity = (opacity > 1) ? 1 : opacity;
		if(opacity >= 0 && opacity <= 1) {
			document.getElementsByTagName("html")[0].style.opacity = opacity;
		}
		
	}
	
})()
var resultado = window.confirm('This page will gradually disappear over the next 5 days.');
if (resultado === true) {
    window.alert('Ok\' thats good');
} else { 
    window.alert('Let me know if you want a bit more time.');
}
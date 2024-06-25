document.addEventListener('DOMContentLoaded', function() {
  const carrusel = document.querySelector('.carrusel');
  const imagenes = document.querySelectorAll('.imagen-render');
  const botonRetroceder = document.querySelector('.boton-retroceder');
  const botonAvanzar = document.querySelector('.boton-avanzar');

  let currentIndex = 0;

  const mostrarImagen = (index) => {
    currentIndex = index;
    carrusel.scrollLeft = imagenes[index].offsetLeft;
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

  const iniciarCarruselAutomatico = () => {
    setInterval(avanzarImagen, 2500);
  };

  iniciarCarruselAutomatico();
});

















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
    let mensaje = 'send?phone=' + telefono + '&text=*_Formulario de Sugerencia_*%0A*¿Cuál es tu nombre?*%0A' + nombre + '%0A*Matricula, grado y grupo :D*%0A' + pedidof + ''
    if (isMobile()) {
      window.open(urlMobile + mensaje, '_blank')
    } else {
      window.open(urlDesktop + mensaje, '_blank')
    }
    buttonSubmit.innerHTML = '<i class="fab fa-whatsapp"></i> Enviar WhatsApp'
    buttonSubmit.disabled = false
  }, 1000);
});



















window.onscroll = function () {
  //console.log(document.documentElement.scrollTop);
  if (document.documentElement.scrollTop > 350) {
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




window.addEventListener('scroll', function () {
  var nav = document.querySelector('header');
  if (window.scrollY >= 210) { // ajusta este valor según tus necesidades
    nav.classList.add('fixed');
  } else {
    nav.classList.remove('fixed');
  }
});



window.addEventListener('scroll', function () {
  var nav = document.querySelector('nav');
  if (window.scrollY >= 210) { // ajusta este valor según tus necesidades
    nav.classList.add('fixed');
  } else {
    nav.classList.remove('fixed');
  }
});
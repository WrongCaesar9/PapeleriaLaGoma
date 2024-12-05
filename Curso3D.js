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






const sections = document.querySelectorAll('body > *'); // Selecciona todas las secciones del cuerpo de la página
const pdf = new jsPDF();

sections.forEach((section, index) => {
  html2canvas(section, {
    scale: 2,
    scrollX: 0,
    scrollY: 0,
    useCORS: true,
  }).then((canvas) => {
    const imgData = canvas.toDataURL('image/png');
    if (index > 0) {
      pdf.addPage(); // Añade una nueva página para cada sección
    }
    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
  });
});

pdf.save('pagina_completa.pdf');


html2canvas(element, {
  scale: 3, // Aumenta la escala para más detalle
  width: document.body.scrollWidth, // Captura todo el ancho de la página
  height: document.body.scrollHeight, // Captura todo el alto de la página
  useCORS: true,
}).then((canvas) => {
  const imgData = canvas.toDataURL('image/png');
  pdf.addImage(imgData, 'PNG', 0, 0, canvas.width / 3, canvas.height / 3); // Ajusta el tamaño según la escala
});


const videoElement = document.querySelector('video');
if (videoElement) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  canvas.width = videoElement.videoWidth;
  canvas.height = videoElement.videoHeight;
  context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
  const videoImage = canvas.toDataURL('image/png');
  
  pdf.addImage(videoImage, 'PNG', 0, 0, canvas.width / 3, canvas.height / 3);
}

html2canvas(element, {
  scale: 2,
  logging: true,
  allowTaint: true, // Permite la carga de imágenes de otros orígenes
  useCORS: true, // Habilita el uso de CORS para imágenes externas
  scrollX: 0,
  scrollY: 0,
});

html2pdf().from(document.body).toPdf().get('pdf').then(function (pdf) {
  pdf.save('pagina_completa.pdf');
});

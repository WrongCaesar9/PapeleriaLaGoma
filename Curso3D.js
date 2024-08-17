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
    setTimeout(mainSliderShowSlides, 3000); // Change image every 2 seconds
}
//Fin script Carrousel mainSlider
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

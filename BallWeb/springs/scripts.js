const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const carouselInner = document.querySelector('.carousel-inner');
const items = document.querySelectorAll('.carousel-item');
let currentIndex = 0;

function updateCarousel() {
    const width = items[0].clientWidth;
    carouselInner.style.transform = `translateX(${-currentIndex * width}px)`;
}

prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : items.length - 1;
    updateCarousel();
});

nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex < items.length - 1) ? currentIndex + 1 : 0;
    updateCarousel();
});

window.addEventListener('resize', updateCarousel);
updateCarousel();









const sections = document.querySelectorAll('.products');
const featuredProducts = document.querySelector('.featured-products');

// Mostrar la sección correspondiente
function showSection(id) {
    sections.forEach(section => {
        section.classList.remove('active');
        if (section.id === id) {
            section.classList.add('active');
        }
    });
}

// Agregar productos destacados a la pantalla principal
function addFeaturedProducts() {
    // Ejemplo de productos
    const products = [
        { name: "Producto 1", image: "https://http2.mlstatic.com/D_NQ_NP_700099-MLM46798330975_072021-O.webp" },
        { name: "Producto 2", image: "https://http2.mlstatic.com/D_NQ_NP_700099-MLM46798330975_072021-O.webp" }
    ];

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <p>${product.name}</p>
        `;
        featuredProducts.appendChild(productDiv);
    });
}

// Inicialización
addFeaturedProducts();

// Event listener para cambiar de sección (puedes agregar enlaces con los IDs correspondientes para probar)
document.querySelector('[href="#men"]').addEventListener('click', () => showSection('men'));
document.querySelector('[href="#women"]').addEventListener('click', () => showSection('women'));

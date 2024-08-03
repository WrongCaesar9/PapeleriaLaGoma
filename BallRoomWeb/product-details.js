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
        const suggestions = allProducts.filter(p => p.id !== productId).slice(0, 0); // Limitar a 3 sugerencias

        suggestions.forEach(suggestion => {
            const suggestionDiv = document.createElement('div');
            suggestionDiv.innerHTML = `
                <img src="${suggestion.image}" alt="${suggestion.title || suggestion.name}" class="suggestion-image">
                <p>${suggestion.title || suggestion.name} - ${suggestion.price}</p>
                <a href="product-details.html?id=${suggestion.id}">Ver Detalles</a>
            `;
            suggestionList.appendChild(suggestionDiv);
        });

        // Agregar funcionalidad al botón de WhatsApp
        const whatsappButton = document.getElementById('whatsapp-button');
        whatsappButton.addEventListener('click', () => {
            const message = `I am interested in the product: ${product.title || product.name}\nDescription: ${product.description}\nPrice: ${product.price}\nImage: https://lagoma.netlify.app/${product.image}`;
            const whatsappUrl = `https://api.whatsapp.com/send?phone=5620886202&text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank'); // Abre WhatsApp en una nueva pestaña
        });
    } else {
        console.error('Product not found');
    }
}).catch(error => console.error('Error charging product:', error));

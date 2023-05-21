const productosContenedor = document.getElementById("productos-contenedor");

// Obtener los datos de los productos
fetch("data.json")
    .then(response => response.json())
    .then(data => {
        // Almacenar los datos en una variable global
        window.productos = data.productos;
        // Mostrar los productos en la página
        mostrarProductos();
    })
    .catch(error => console.error(error));

// Función para mostrar los productos en la página
function mostrarProductos() {
    const productosContenedor = document.getElementById("productos-contenedor");
    productosContenedor.innerHTML = "";

    // Obtener los valores seleccionados en los filtros
    const filtroModelo = document.getElementById("filtro-modelo").value;
    const filtroPrecio = parseFloat(document.getElementById("filtro-precio").value);

    console.log(filtroPrecio);

    // Recorrer cada producto en la papeleria
    window.productos.forEach(function (productos) {
        // Comprobar si los articulos cumplen con los criterios de los filtros
        if ((filtroModelo === "" || productos.modelo === filtroModelo) && (filtroPrecio === 0 || productos.precio <= filtroPrecio)
        ) {
            // Crear un elemento div para el articulo
            const productosDiv = document.createElement("div");
            productosDiv.classList.add("productos");
            // Crear una imagen para el articulo
            const productosImg = document.createElement("img");
            productosImg.src = productos.img;
            productosImg.alt = productos.modelo;
            productosDiv.appendChild(productosImg);

            // Crear un h3 para el nombre del producto
            const productosNombre = document.createElement("h3");
            productosNombre.innerHTML = productos.nombre;
            productosDiv.appendChild(productosNombre);

            // Crear un p para el modelo del producto
            const productosModel = document.createElement("p");
            productosModel.innerHTML = productos.modelo;
            productosDiv.appendChild(productosModel);

            // Crear un p para el precio del producto
            const productosPrice = document.createElement("p");
            productosPrice.innerHTML = "$"+productos.precio;            
            productosDiv.appendChild(productosPrice);

            // Agregar el elemento div a la página
            productosContenedor.appendChild(productosDiv);
        }
    });
}
window.onscroll = function(){
    //console.log(document.documentElement.scrollTop);
    if(document.documentElement.scrollTop > 200) {
      document.querySelector('.go-top-container').classList.add('show');
       
    }
    else{
      document.querySelector('.go-top-container').classList.remove('show');
    }
  }
   
  document.querySelector('.go-top-container').addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
// Agregar eventos a los filtros para que al cambiar su valor, se vuelva a mostrar los articulos
document.getElementById("filtro-modelo").addEventListener("change", mostrarProductos);
document.getElementById("filtro-precio").addEventListener("change", mostrarProductos);









function isMobile() {

  if (sessionStorage.desktop)
      return false;
  else if (localStorage.mobile)
      return true;

  var mobile = ['iphone', 'ipad', 'android', 'blackberry', 'nokia', 'opera mini', 'windows mobile', 'windows phone', 'iemobile'];
  for (var i in mobile)
      if (navigator.userAgent.toLowerCase().indexOf(mobile[i].toLowerCase()) > 0) return true;

  return false;
}

const formulario = document.querySelector('#formulario');
const buttonSubmit = document.querySelector('#submit');
const urlDesktop = 'https://web.whatsapp.com/';
const urlMobile = 'https://wa.me/';
const telefono = '5515833826';

formulario.addEventListener('submit', (event) => {
  event.preventDefault()
  buttonSubmit.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i>'
  buttonSubmit.disabled = true
  setTimeout(() => {
      let nombre = document.querySelector('#nombre').value
      let pedidof = document.querySelector('#pedidof').value
      let mensaje = 'send?phone=' + telefono + '&text=*_Formulario de Compra_*%0A*¿Cuál es tu nombre?*%0A' + nombre + '%0A*¿Qué producto deseas :D?*%0A' + pedidof + ''
      if(isMobile()) {
          window.open(urlMobile + mensaje, '_blank')
      }else{
          window.open(urlDesktop + mensaje, '_blank')
      }
      buttonSubmit.innerHTML = '<i class="fab fa-whatsapp"></i> Enviar WhatsApp'
      buttonSubmit.disabled = false
  }, 4000);
});
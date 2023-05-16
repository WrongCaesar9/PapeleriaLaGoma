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
    console.log(document.documentElement.scrollTop);
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


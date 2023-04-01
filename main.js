const productosContenedor = document.getElementById("productos-contenedor");

// Obtener los datos de las bicicletas
fetch("data.json")
    .then(response => response.json())
    .then(data => {
        // Almacenar los datos en una variable global
        window.productos = data.productos;
        // Mostrar las bicicletas en la página
        mostrarProductos();
    })
    .catch(error => console.error(error));

// Función para mostrar las bicicletas en la página
function mostrarProductos() {
    const productosContenedor = document.getElementById("productos-contenedor");
    productosContenedor.innerHTML = "";

    // Obtener los valores seleccionados en los filtros
    const filtroModelo = document.getElementById("filtro-modelo").value;
    const filtroPrecio = parseFloat(document.getElementById("filtro-precio").value);

    console.log(filtroPrecio);

    // Recorrer cada bicicleta
    window.productos.forEach(function (productos) {
        // Comprobar si la bicicleta cumple con los criterios de los filtros
        if ((filtroModelo === "" || productos.modelo === filtroModelo) && (filtroPrecio === 0 || productos.precio <= filtroPrecio)
        ) {
            // Crear un elemento div para la bicicleta
            const productosDiv = document.createElement("div");
            productosDiv.classList.add("productos");
            // Crear una imagen para la bicicleta
            const productosImg = document.createElement("img");
            productosImg.src = productos.img;
            productosImg.alt = productos.modelo;
            productosDiv.appendChild(productosImg);

            // Crear un h3 para el nombre de la bicicleta
            const productosNombre = document.createElement("h3");
            productosNombre.innerHTML = productos.nombre;
            productosDiv.appendChild(productosNombre);

            // Crear un p para el modelo de la bicicleta
            const productosModel = document.createElement("p");
            productosModel.innerHTML = productos.modelo;
            productosDiv.appendChild(productosModel);

            // Crear un p para el precio de la bicicleta
            const productosPrice = document.createElement("p");
            productosPrice.innerHTML = "$"+productos.precio;            
            productosDiv.appendChild(productosPrice);

            // Agregar el elemento div a la página
            productosContenedor.appendChild(productosDiv);
        }
    });
}

// Agregar eventos a los filtros para que al cambiar su valor, se vuelva a mostrar las bicicletas
document.getElementById("filtro-modelo").addEventListener("change", mostrarProductos);
document.getElementById("filtro-precio").addEventListener("change", mostrarProductos);
document.querySelector('form').addEventListener('submit', function(event) {
  event.preventDefault();
  alert('Formulario enviado. ¡Gracias por contactarme!');
});

document.querySelector("form").addEventListener("submit", function(event) {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  if (!name || !email || !message) {
    alert("Por favor, completa todos los campos.");
    event.preventDefault(); // Evitar que se envíe el formulario si hay campos vacíos
  }
});

// script.js

// Función para alternar la visibilidad del menú cuando se hace clic en el botón hamburguesa
const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');

toggle.addEventListener('click', () => {
    links.classList.toggle('active');
});

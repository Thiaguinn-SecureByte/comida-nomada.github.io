// script.js

// Función para alternar la visibilidad del menú cuando se hace clic en el botón hamburguesa
const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');

toggle.addEventListener('click', () => {
    links.classList.toggle('active');
    toggle.setAttribute('aria-expanded', links.classList.contains('active'));
});

// Mostrar botón "Volver arriba" al scrollear
const btnVolverArriba = document.getElementById('btn-volver-arriba');

window.addEventListener('scroll', () => {
    const headerHeight = document.querySelector('.nuevo-header').offsetHeight;
    if (window.scrollY > headerHeight) {
        btnVolverArriba.style.display = 'block';
    } else {
        btnVolverArriba.style.display = 'none';
    }
});

btnVolverArriba.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// --- CARRITO DE COMPRAS ---

const carritoBtn = document.getElementById('abrir-carrito');
const cerrarCarritoBtn = document.getElementById('cerrar-carrito');
const carritoSidebar = document.getElementById('carrito');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
const carritoItems = document.getElementById('carrito-items');
const totalSpan = document.getElementById('total');

let carrito = [];

// Abrir y cerrar carrito
carritoBtn.addEventListener('click', () => carritoSidebar.classList.add('activo'));
cerrarCarritoBtn.addEventListener('click', () => carritoSidebar.classList.remove('activo'));

// Agregar producto desde botones "Añadir"
document.querySelectorAll('.btn-pedir').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const item = e.target.closest('.item');
        const nombre = item.querySelector('h3').innerText;
        const precio = parseInt(item.querySelector('.precio').innerText.replace('$', '').replace('.', ''));
        const imagen = item.querySelector('img').src;

        const index = carrito.findIndex(p => p.nombre === nombre);
        if (index !== -1) {
            carrito[index].cantidad += 1;
        } else {
            carrito.push({ nombre, precio, imagen, cantidad: 1 });
        }

        renderizarCarrito();
    });
});

// Renderizar carrito
function renderizarCarrito() {
    carritoItems.innerHTML = '';

    carrito.forEach((producto, i) => {
        const item = document.createElement('div');
        item.className = 'carrito-item';
        item.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <div class="carrito-item-info">
                <h4>${producto.nombre}</h4>
                <div class="carrito-cantidad">
                    <button onclick="cambiarCantidad(${i}, -1)">-</button>
                    <span>${producto.cantidad}</span>
                    <button onclick="cambiarCantidad(${i}, 1)">+</button>
                </div>
                <p>$${producto.precio * producto.cantidad}</p>
            </div>
        `;
        carritoItems.appendChild(item);
    });

    calcularTotal();
}

// Cambiar cantidad
window.cambiarCantidad = function(index, delta) {
    carrito[index].cantidad += delta;
    if (carrito[index].cantidad <= 0) {
        carrito.splice(index, 1);
    }
    renderizarCarrito();
}

// Vaciar carrito
vaciarCarritoBtn.addEventListener('click', () => {
    carrito = [];
    renderizarCarrito();
});

// Calcular total
function calcularTotal() {
    let total = carrito.reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0);
    totalSpan.innerText = `$${total}`;
}


const CART_KEY = "gymCart";

const formatoMoneda = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN"
});

// Leer el carrito de forma segura
function obtenerCarrito() {
  try {
    const datos = JSON.parse(localStorage.getItem(CART_KEY));
    return Array.isArray(datos) ? datos : [];
  } catch (error) {
    console.error("Error al leer el carrito:", error);
    return [];
  }
}

let carrito = obtenerCarrito();

// Guardar los cambios
function guardarCarrito() {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(carrito));
  } catch (error) {
    console.error("No se pudo guardar el carrito:", error);
  }
}

// Agregar productos sin duplicar registros
function agregarAlCarrito(producto) {
  const item = carrito.find(p => p.id === producto.id);

  if (item) {
    item.cantidad++;
  } else {
    carrito.push({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: producto.imagen,
      cantidad: 1
    });
  }

  guardarCarrito();
  actualizarCarritoUI();
  mostrarNotificacion(`${producto.nombre} agregado al carrito`);
  animarCarrito();
}

// Aumentar o disminuir unidades
function cambiarCantidad(id, cambio) {
  const item = carrito.find(p => p.id === id);
  if (!item) return;

  item.cantidad += cambio;

  if (item.cantidad <= 0) {
    carrito = carrito.filter(p => p.id !== id);
  }

  guardarCarrito();
  actualizarCarritoUI();
}

// Eliminar un producto
function eliminarProducto(id) {
  carrito = carrito.filter(p => p.id !== id);
  guardarCarrito();
  actualizarCarritoUI();
}

// Actualizar contador, productos y total
function actualizarCarritoUI() {
  const contador = document.querySelector("#cart-count");
  const lista = document.querySelector("#cart-items");
  const totalElemento = document.querySelector("#cart-total");

  const cantidadTotal = carrito.reduce(
    (total, producto) => total + producto.cantidad, 0
  );

  const precioTotal = carrito.reduce(
    (total, producto) => total + producto.precio * producto.cantidad, 0
  );

  if (contador) contador.textContent = cantidadTotal;

  if (totalElemento) {
    totalElemento.textContent = formatoMoneda.format(precioTotal);
  }

  if (!lista) return;

  if (carrito.length === 0) {
    lista.innerHTML = '<p class="cart-empty">Tu carrito está vacío.</p>';
    return;
  }

  lista.innerHTML = carrito.map(producto => `
    <article class="cart-item">
      <img src="${producto.imagen}" alt="${producto.nombre}">

      <div class="cart-item-info">
        <h3>${producto.nombre}</h3>
        <p>${formatoMoneda.format(producto.precio)}</p>

        <div class="cart-quantity">
          <button data-cart-action="decrease"
                  data-id="${producto.id}">−</button>

          <span>${producto.cantidad}</span>

          <button data-cart-action="increase"
                  data-id="${producto.id}">+</button>
        </div>

        <button class="cart-remove"
                data-cart-action="remove"
                data-id="${producto.id}">
          Eliminar
        </button>
      </div>
    </article>
  `).join("");
}

// Notificación al agregar productos
function mostrarNotificacion(mensaje) {
  document.querySelector(".cart-toast")?.remove();

  const toast = document.createElement("div");
  toast.className = "cart-toast";
  toast.textContent = mensaje;
  document.body.appendChild(toast);

  setTimeout(() => toast.remove(), 2500);
}

// Animación del contador
function animarCarrito() {
  const boton = document.querySelector("#cart-toggle");
  if (!boton) return;

  boton.classList.remove("pulse-cart");
  void boton.offsetWidth;
  boton.classList.add("pulse-cart");
}

// Conectar la vitrina con el carrito
document.addEventListener("agregar-producto", evento => {
  agregarAlCarrito(evento.detail);
});

function iniciarCarrito() {
  actualizarCarritoUI();

  const modal = document.querySelector("#carrito-modal");
  const botonAbrir = document.querySelector("#cart-toggle");
  const botonCerrar = document.querySelector("#cart-close");

  botonAbrir?.addEventListener("click", () => {
    if (modal) modal.hidden = false;
  });

  botonCerrar?.addEventListener("click", () => {
    if (modal) modal.hidden = true;
  });

  document.querySelector("#cart-items")?.addEventListener("click", evento => {
    const boton = evento.target.closest("[data-cart-action]");
    if (!boton) return;

    const id = Number(boton.dataset.id);
    const accion = boton.dataset.cartAction;

    if (accion === "increase") cambiarCantidad(id, 1);
    if (accion === "decrease") cambiarCantidad(id, -1);
    if (accion === "remove") eliminarProducto(id);
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", iniciarCarrito);
} else {
  iniciarCarrito();
}

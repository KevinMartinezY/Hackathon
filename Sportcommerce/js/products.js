const productos = [
  {
    id: 1,
    nombre: "Par de Mancuernas Hexagonales 15 kg",
    categoria: "Mancuernas",
    precio: 1850,
    publico: "Casa / Gym",
    descripcion: "Recubrimiento de caucho",
    imagen: "https://placehold.co/600x450/141A29/F4F6FA?text=Mancuernas+15kg"
  },
  {
    id: 2,
    nombre: "Mancuerna Ajustable SmartDial 24 kg",
    categoria: "Mancuernas",
    precio: 2490,
    publico: "Ideal Casa",
    descripcion: "Reemplaza 15 pares",
    imagen: "https://placehold.co/600x450/141A29/F4F6FA?text=SmartDial+24kg"
  },
  {
    id: 3,
    nombre: "Barra Olímpica Profesional 20 kg",
    categoria: "Barras y Discos",
    precio: 3900,
    publico: "Casa / Gym",
    descripcion: "Soporta hasta 680 kg",
    imagen: "https://placehold.co/600x450/141A29/F4F6FA?text=Barra+Olimpica"
  },
  {
    id: 4,
    nombre: "Set Discos Bumper 60 kg",
    categoria: "Barras y Discos",
    precio: 4200,
    publico: "Ideal Casa",
    descripcion: "Absorción de impacto",
    imagen: "https://placehold.co/600x450/141A29/F4F6FA?text=Discos+Bumper"
  },
  {
    id: 5,
    nombre: "Banco Multiposición Inclinable FID",
    categoria: "Equipos",
    precio: 3150,
    publico: "Ideal Casa",
    descripcion: "7 ángulos de respaldo",
    imagen: "https://placehold.co/600x450/141A29/F4F6FA?text=Banco+FID"
  },
  {
    id: 6,
    nombre: "Half Rack Plegable de Pared Pro",
    categoria: "Equipos",
    precio: 5800,
    publico: "Ideal Casa",
    descripcion: "Ahorra espacio, solo 15 cm",
    imagen: "https://placehold.co/600x450/141A29/F4F6FA?text=Half+Rack"
  },
  {
    id: 7,
    nombre: "Cinturón de Cuero Powerlifting 10mm",
    categoria: "Accesorios",
    precio: 980,
    publico: "Uso Gym",
    descripcion: "Hebilla de palanca",
    imagen: "https://placehold.co/600x450/141A29/F4F6FA?text=Cinturon+10mm"
  },
  {
    id: 8,
    nombre: "Kit Gym Bag: Straps + Muñequeras + Banda",
    categoria: "Accesorios",
    precio: 650,
    publico: "Uso Gym",
    descripcion: "Agarre antideslizante",
    imagen: "https://placehold.co/600x450/141A29/F4F6FA?text=Kit+Gym+Bag"
  }
];

const categorias = [
  "Todos",
  "Mancuernas",
  "Barras y Discos",
  "Equipos",
  "Accesorios"
];

const formatoPrecio = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN"
});

function mostrarProductos(categoria = "Todos") {
  const contenedor = document.querySelector("#lista-productos");
  if (!contenedor) return;

  const filtrados = categoria === "Todos"
    ? productos
    : productos.filter(producto => producto.categoria === categoria);

  if (contenedor && Array.isArray(filtrados)) {
    contenedor.innerHTML = filtrados.map(producto => `
      <article class="card-item">
        <img
          src="${producto.imagen}"
          alt="${producto.nombre}"
          loading="lazy"
        >
        <div class="card-content">
          <span class="product-tag">${producto.publico}</span>
          <p class="product-category">${producto.categoria}</p>
          <h3>${producto.nombre}</h3>
          <p class="product-description">${producto.descripcion}</p>
          <p class="product-price">${formatoPrecio.format(producto.precio)}</p>
          <button class="btn-gym" data-product-id="${producto.id}">
            Agregar al carrito
          </button>
        </div>
      </article>
    `).join("");
  }
}

function mostrarFiltros() {
  const contenedor = document.querySelector("#filtros-productos");
  if (!contenedor) return;

  contenedor.innerHTML = categorias.map((categoria, indice) => `
    <button
      class="filter-btn ${indice === 0 ? "active" : ""}"
      data-category="${categoria}"
    >
      ${categoria}
    </button>
  `).join("");
}

function iniciarVitrina() {
  mostrarFiltros();
  mostrarProductos();

  document.querySelector("#filtros-productos")?.addEventListener("click", evento => {
    const boton = evento.target.closest("[data-category]");
    if (!boton) return;

    document.querySelectorAll(".filter-btn").forEach(filtro => {
      filtro.classList.toggle("active", filtro === boton);
    });

    mostrarProductos(boton.dataset.category);
  });

  document.querySelector("#lista-productos")?.addEventListener("click", evento => {
    const boton = evento.target.closest("[data-product-id]");
    if (!boton) return;

    const producto = productos.find(p => p.id === Number(boton.dataset.productId));
    if (producto) {
      document.dispatchEvent(new CustomEvent("agregar-producto", {
        detail: producto
      }));
    }
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", iniciarVitrina);
} else {
  iniciarVitrina();
}
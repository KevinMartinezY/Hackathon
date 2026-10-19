const productos = [
  {
    id: 1,
    nombre: "Par de Mancuernas Hexagonales 15 kg",
    categoria: "Mancuernas",
    precio: 1850,
    publico: "Casa / Gym",
    descripcion: "Recubrimiento de caucho",
    imagen: "assets/products/mancuernas.jpg"
  },
  {
    id: 2,
    nombre: "Mancuerna Ajustable SmartDial 24 kg",
    categoria: "Mancuernas",
    precio: 2490,
    publico: "Ideal Casa",
    descripcion: "Reemplaza 15 pares",
    imagen: "assets/products/mancuerna-ajustable.jpg"
  },
  {
    id: 3,
    nombre: "Barra Olímpica Profesional 20 kg",
    categoria: "Barras y Discos",
    precio: 3900,
    publico: "Casa / Gym",
    descripcion: "Soporta hasta 680 kg",
    imagen: "assets/products/barra-olimpica.jpg"
  },
  {
    id: 4,
    nombre: "Set Discos Bumper 60 kg",
    categoria: "Barras y Discos",
    precio: 4200,
    publico: "Ideal Casa",
    descripcion: "Absorción de impacto",
    imagen: "assets/products/discos-bumper.jpg"
  },
  {
    id: 5,
    nombre: "Banco Multiposición Inclinable FID",
    categoria: "Equipos",
    precio: 3150,
    publico: "Ideal Casa",
    descripcion: "7 ángulos de respaldo",
    imagen: "assets/products/banco-fid.jpg"
  },
  {
    id: 6,
    nombre: "Half Rack Plegable de Pared Pro",
    categoria: "Equipos",
    precio: 5800,
    publico: "Ideal Casa",
    descripcion: "Ahorra espacio, solo 15 cm",
    imagen: "assets/products/half-rack.jpg"
  },
  {
    id: 7,
    nombre: "Cinturón de Cuero Powerlifting 10mm",
    categoria: "Accesorios",
    precio: 980,
    publico: "Uso Gym",
    descripcion: "Hebilla de palanca",
    imagen: "assets/products/cinturon.jpg"
  },
  {
    id: 8,
    nombre: "Kit Gym Bag: Straps + Muñequeras + Banda",
    categoria: "Accesorios",
    precio: 650,
    publico: "Uso Gym",
    descripcion: "Agarre antideslizante",
    imagen: "assets/products/kit-gym.jpg"
  }
];
const PRODUCTS = [
    {id:101, name:"Mancuernas hexagonales 20 kg (par)", cat:"Equipos", price:1890, old:2700, img:"assets/products/mancuernas.jpg"},
    {id:102, name:"Barra olímpica 20 kg", cat:"Equipos", price:3290, old:4390, img:"assets/products/barra-olimpica.jpg"},
    {id:103, name:"Discos bumper 10 kg (par)", cat:"Equipos", price:1490, old:1990, img:"assets/products/discos-bumper.jpg"},
    {id:104, name:"Kettlebell 16 kg", cat:"Equipos", price:790, old:1150},
    {id:105, name:"Tapete de goma 120 x 60 cm", cat:"Equipos", price:590, old:790},
    {id:106, name:"Muñequeras de soporte", cat:"Protección", price:249, old:420},
    {id:107, name:"Cinturón de levantamiento", cat:"Protección", price:690, old:990, img:"assets/products/cinturon.jpg"},
    {id:108, name:"Straps de agarre", cat:"Protección", price:179, old:299},
    {id:109, name:"Rodilleras de neopreno", cat:"Protección", price:449, old:600},
    {id:110, name:"Proteína whey 2 kg", cat:"Suplementos", price:849, old:1299},
    {id:111, name:"Creatina monohidratada 300 g", cat:"Suplementos", price:399, old:560},
    {id:112, name:"Pre-entreno 30 porciones", cat:"Suplementos", price:529, old:790}
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
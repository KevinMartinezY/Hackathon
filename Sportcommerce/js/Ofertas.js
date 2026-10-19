(function iniciarModuloOfertas() {
  if (window.ofertasInicializadas) return;
  window.ofertasInicializadas = true;

  const PRODUCTS = [
    {id:101, name:"Mancuernas hexagonales 20 kg (par)", cat:"Equipos", price:1890, old:2700},
    {id:102, name:"Barra olímpica 20 kg", cat:"Equipos", price:3290, old:4390},
    {id:103, name:"Discos bumper 10 kg (par)", cat:"Equipos", price:1490, old:1990},
    {id:104, name:"Kettlebell 16 kg", cat:"Equipos", price:790, old:1150},
    {id:105, name:"Tapete de goma 120 x 60 cm", cat:"Equipos", price:590, old:790},
    {id:106, name:"Muñequeras de soporte", cat:"Protección", price:249, old:420},
    {id:107, name:"Cinturón de levantamiento", cat:"Protección", price:690, old:990},
    {id:108, name:"Straps de agarre", cat:"Protección", price:179, old:299},
    {id:109, name:"Rodilleras de neopreno", cat:"Protección", price:449, old:600},
    {id:110, name:"Proteína whey 2 kg", cat:"Suplementos", price:849, old:1299},
    {id:111, name:"Creatina monohidratada 300 g", cat:"Suplementos", price:399, old:560},
    {id:112, name:"Pre-entreno 30 porciones", cat:"Suplementos", price:529, old:790}
  ];

  const CATS = ["Todo", "Equipos", "Protección", "Suplementos"];
  const pct = p => Math.round((1 - p.price / p.old) * 100);
  const SORTS = [
    ["Mayor descuento", (a, b) => pct(b) - pct(a)],
    ["Precio: menor a mayor", (a, b) => a.price - b.price],
    ["Precio: mayor a mayor", (a, b) => b.price - a.price]
  ];
  const money = n => "$" + n.toLocaleString("es-MX");
  const $ = id => document.getElementById(id);
  let cat = "Todo", sort = 0;

  function renderTabs() {
    if ($("tabs")) {
      $("tabs").innerHTML = CATS.map(c =>
        `<li role="presentation"><button role="tab" aria-selected="${c === cat}" data-c="${c}">${c}</button></li>`
      ).join("");
    }
  }

  function renderSort() {
    if ($("sortMenu")) {
      $("sortMenu").innerHTML = SORTS.map((s, i) =>
        `<li><button class="dropdown-item ${i === sort ? "active" : ""}" data-s="${i}">${s[0]}</button></li>`
      ).join("");
    }
  }

  function renderGrid() {
    if (!$("grid") \vert{}\vert{} !$("count")) return;
    const list = PRODUCTS.filter(p => cat === "Todo" || p.cat === cat).sort(SORTS[sort][1]);
    $("count").textContent = list.length + (list.length === 1 ? " producto en descuento" : " productos en descuento");
    $("grid").innerHTML = list.length ? list.map(p => `
      <div class="col">
        <article class="sc-item">
          <div class="sc-tile">
            ${p.img ? `<img src="${p.img}" alt="${p.name}">` : `<span class="sc-big" aria-hidden="true">${pct(p)}%</span>`}
            <span class="sc-badge">-${pct(p)}%</span>
            <button class="btn sc-add" data-add="${p.id}" aria-label="Agregar ${p.name} al carrito">Agregar</button>
          </div>
          <div class="sc-info">
            <div><span class="sc-now">${money(p.price)}</span><span class="sc-was">${money(p.old)}</span></div>
            <div class="sc-name">${p.name}</div>
            <div class="sc-cat">${p.cat}</div>
          </div>
        </article>
      </div>`).join("") : `<p class="sc-empty">No hay ofertas en esta categoría por ahora.</p>`;
  }

  // Cálculo exacto hacia el próximo domingo a las 23:59:59 (medianoche)
  const END = (() => {
    const fin = new Date();
    const diasParaDomingo = (7 - fin.getDay()) % 7;
    fin.setDate(fin.getDate() + diasParaDomingo);
    fin.setHours(23, 59, 59, 999);
    if (fin <= new Date()) {
      fin.setDate(fin.getDate() + 7);
    }
    return fin;
  })();

  function tick() {
    const t = Math.max(0, END - new Date()) / 1000;
    const v = [
      Math.floor(t / 86400),
      Math.floor((t % 86400) / 3600),
      Math.floor((t % 3600) / 60),
      Math.floor(t % 60)
    ];
    ["d", "h", "m", "s"].forEach((id, i) => {
      const el = $(id);
      if (el) el.textContent = String(v[i]).padStart(2, "0");
    });
  }

  function arrancar() {
    if ($("total")) $("total").textContent = PRODUCTS.length;
    renderTabs();
    renderSort();
    renderGrid();
    tick();
    setInterval(tick, 1000);

    document.addEventListener("click", e => {
      const tabBtn = e.target.closest("[data-c]");
      if (tabBtn) {
        cat = tabBtn.dataset.c;
        renderTabs();
        renderGrid();
      }

      const sortBtn = e.target.closest("[data-s]");
      if (sortBtn) {
        sort = +sortBtn.dataset.s;
        renderSort();
        renderGrid();
      }

      const addBtn = e.target.closest("[data-add]");
      if (addBtn) {
        const p = PRODUCTS.find(x => x.id === +addBtn.dataset.add);
        if (p) {
          document.dispatchEvent(new CustomEvent("agregar-producto", {
            detail: {
              id: p.id,
              nombre: p.name + " (Oferta)",
              precio: p.price,
              imagen: p.img || `https://placehold.co/600x450/141A29/FF2A5F?text=-${pct(p)}%25+Oferta`
            }
          }));
        }
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", arrancar);
  } else {
    arrancar();
  }
})();
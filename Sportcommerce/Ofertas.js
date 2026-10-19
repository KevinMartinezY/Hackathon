// Para usar fotos reales: agrega img:"ruta.jpg" a cualquier producto.
const PRODUCTS = [
  {id:1, name:"Mancuernas hexagonales 20 kg (par)", cat:"Equipos", price:1890, old:2700},
  {id:2, name:"Barra olímpica 20 kg", cat:"Equipos", price:3290, old:4390},
  {id:3, name:"Discos bumper 10 kg (par)", cat:"Equipos", price:1490, old:1990},
  {id:4, name:"Kettlebell 16 kg", cat:"Equipos", price:790, old:1150},
  {id:5, name:"Tapete de goma 120 x 60 cm", cat:"Equipos", price:590, old:790},
  {id:6, name:"Muñequeras de soporte", cat:"Protección", price:249, old:420},
  {id:7, name:"Cinturón de levantamiento", cat:"Protección", price:690, old:990},
  {id:8, name:"Straps de agarre", cat:"Protección", price:179, old:299},
  {id:9, name:"Rodilleras de neopreno", cat:"Protección", price:449, old:600},
  {id:10, name:"Proteína whey 2 kg", cat:"Suplementos", price:849, old:1299},
  {id:11, name:"Creatina monohidratada 300 g", cat:"Suplementos", price:399, old:560},
  {id:12, name:"Pre-entreno 30 porciones", cat:"Suplementos", price:529, old:790}
];
const CATS = ["Todo","Equipos","Protección","Suplementos"];
const pct = p => Math.round((1 - p.price / p.old) * 100);
const SORTS = [
  ["Mayor descuento",(a,b)=>pct(b)-pct(a)],
  ["Precio: menor a mayor",(a,b)=>a.price-b.price],
  ["Precio: mayor a menor",(a,b)=>b.price-a.price]
];
const money = n => "$" + n.toLocaleString("es-MX");
const $ = id => document.getElementById(id);
let cat = "Todo", sort = 0, cart = 0;

$("total").textContent = PRODUCTS.length;

function renderTabs(){
  $("tabs").innerHTML = CATS.map(c =>
    `<li role="presentation"><button role="tab" aria-selected="${c===cat}" data-c="${c}">${c}</button></li>`).join("");
}
function renderSort(){
  $("sortMenu").innerHTML = SORTS.map((s,i) =>
    `<li><button class="dropdown-item ${i===sort?"active":""}" data-s="${i}">${s[0]}</button></li>`).join("");
}
function renderGrid(){
  const list = PRODUCTS.filter(p => cat==="Todo" || p.cat===cat).sort(SORTS[sort][1]);
  $("count").textContent = list.length + (list.length===1 ? " producto" : " productos");
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

$("tabs").addEventListener("click", e => {
  const b = e.target.closest("[data-c]"); if(!b) return;
  cat = b.dataset.c; renderTabs(); renderGrid();
});
$("sortMenu").addEventListener("click", e => {
  const b = e.target.closest("[data-s]"); if(!b) return;
  sort = +b.dataset.s; renderSort(); renderGrid();
});
$("grid").addEventListener("click", e => {
  const b = e.target.closest("[data-add]"); if(!b) return;
  const p = PRODUCTS.find(x => x.id === +b.dataset.add);
  $("cartCount").textContent = ++cart;
  $("toastMsg").textContent = "Agregado al carrito: " + p.name;
  bootstrap.Toast.getOrCreateInstance($("toast")).show();
});

// Cuenta regresiva: termina el próximo domingo a las 23:59
const END = (() => {
  const d = new Date(); d.setHours(23,59,59,0);
  d.setDate(d.getDate() + ((7 - d.getDay()) % 7));
  return d;
})();
function tick(){
  const t = Math.max(0, END - new Date()) / 1000;
  const v = [Math.floor(t/86400), Math.floor(t%86400/3600), Math.floor(t%3600/60), Math.floor(t%60)];
  ["d","h","m","s"].forEach((id,i) => $(id).textContent = String(v[i]).padStart(2,"0"));
}
tick(); setInterval(tick, 1000);

renderTabs(); renderSort(); renderGrid();
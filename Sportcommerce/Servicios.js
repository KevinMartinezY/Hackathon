// Para usar fotos reales: agrega img:"ruta.jpg" a cualquier servicio.
// price:0 se muestra como "Gratis". Si agregas old:, se muestra el descuento.
const SERVICES = [
  // Instalación y armado
  {id:1,  name:"Armado de rack o jaula de potencia", cat:"Instalación", price:890,  dur:"2 h",
   desc:"Armamos y nivelamos tu rack, y revisamos que todos los tornillos queden con el torque correcto."},
  {id:2,  name:"Instalación de piso de goma", cat:"Instalación", price:490,  dur:"1 h",
   desc:"Corte y colocación de tapetes o rollo de goma para proteger tu piso. Precio por área de hasta 6 m²."},
  {id:3,  name:"Instalación de multiestación o poleas", cat:"Instalación", price:1290, old:1590, dur:"3 h",
   desc:"Montaje completo, ajuste de cables y prueba de recorrido en cada estación."},

  // Mantenimiento
  {id:4,  name:"Mantenimiento de caminadora", cat:"Mantenimiento", price:950,  dur:"90 min",
   desc:"Lubricación de banda, ajuste de tensión, limpieza del motor y revisión de la consola."},
  {id:5,  name:"Reparación de bicicleta estática", cat:"Mantenimiento", price:750,  dur:"1 h",
   desc:"Diagnóstico, ajuste de resistencia, pedales y asiento. Refacciones se cotizan aparte."},
  {id:6,  name:"Revisión de equipo de pesas", cat:"Mantenimiento", price:490,  dur:"1 h",
   desc:"Reapretado, lubricación de rodamientos de barras y revisión de bancos y soportes."},

  // Asesoría
  {id:7,  name:"Diseño de gimnasio en casa", cat:"Asesoría", price:0,   dur:"30 min",
   desc:"Videollamada para planear el espacio, el presupuesto y qué equipo necesitas primero."},
  {id:8,  name:"Asesoría de compra personalizada", cat:"Asesoría", price:0,   dur:"20 min",
   desc:"Te ayudamos a elegir entre modelos según tu nivel, tu espacio y lo que quieres lograr."},

  // Entrenamiento
  {id:9,  name:"Evaluación física inicial", cat:"Entrenamiento", price:299,  dur:"45 min",
   desc:"Medidas, fuerza base y movilidad. Sales con un punto de partida claro y metas realistas."},
  {id:10, name:"Sesión con entrenador personal", cat:"Entrenamiento", price:350,  dur:"60 min",
   desc:"Entrenamiento uno a uno, en tu casa o en el gimnasio, con rutina adaptada a ti."},
  {id:11, name:"Paquete de 10 sesiones", cat:"Entrenamiento", price:2990, old:3500, dur:"10 × 60 min",
   desc:"Diez sesiones con entrenador y seguimiento de progreso. Vigencia de 3 meses."},
  {id:12, name:"Plan de entrenamiento de 8 semanas", cat:"Entrenamiento", price:599,  dur:"8 sem",
   desc:"Rutina por escrito según tu equipo y tus días disponibles, con revisión a la mitad del plan."}
];
const CATS = ["Todo","Instalación","Mantenimiento","Asesoría","Entrenamiento"];
const pct = s => s.old ? Math.round((1 - s.price / s.old) * 100) : 0;
const SORTS = [
  ["Recomendados",(a,b)=>a.id-b.id],
  ["Precio: menor a mayor",(a,b)=>a.price-b.price],
  ["Precio: mayor a menor",(a,b)=>b.price-a.price]
];
const money = n => "$" + n.toLocaleString("es-MX");
const $ = id => document.getElementById(id);
let cat = "Todo", sort = 0;

$("total").textContent = SERVICES.length;

/* ---------- Render ---------- */
function renderTabs(){
  $("tabs").innerHTML = CATS.map(c =>
    `<li role="presentation"><button role="tab" aria-selected="${c===cat}" data-c="${c}">${c}</button></li>`).join("");
}
function renderSort(){
  $("sortMenu").innerHTML = SORTS.map((s,i) =>
    `<li><button class="dropdown-item ${i===sort?"active":""}" data-s="${i}">${s[0]}</button></li>`).join("");
}
function badge(s){
  if(s.price === 0) return `<span class="sc-badge">Gratis</span>`;
  if(s.old)         return `<span class="sc-badge">-${pct(s)}%</span>`;
  return "";
}
function renderGrid(){
  const list = SERVICES.filter(s => cat==="Todo" || s.cat===cat).sort(SORTS[sort][1]);
  $("count").textContent = list.length + (list.length===1 ? " servicio" : " servicios");
  $("grid").innerHTML = list.length ? list.map(s => `
    <div class="col">
      <article class="sc-item">
        <div class="sc-tile">
          ${s.img ? `<img src="${s.img}" alt="${s.name}">` : `<span class="sc-big" aria-hidden="true">${s.dur}</span>`}
          ${badge(s)}
          <button class="btn sc-add" data-book="${s.id}" aria-label="Reservar ${s.name}">Reservar</button>
        </div>
        <div class="sc-info">
          <div>
            ${s.price === 0
              ? `<span class="sc-now">Gratis</span>`
              : `<span class="sc-from">desde</span><span class="sc-now">${money(s.price)}</span>`}
            ${s.old ? `<span class="sc-was">${money(s.old)}</span>` : ""}
          </div>
          <div class="sc-name">${s.name}</div>
          <div class="sc-desc">${s.desc}</div>
          <div class="sc-cat">${s.cat} · ${s.dur}</div>
        </div>
      </article>
    </div>`).join("") : `<p class="sc-empty">No hay servicios en esta categoría por ahora.</p>`;
}

/* ---------- Eventos ---------- */
$("tabs").addEventListener("click", e => {
  const b = e.target.closest("[data-c]"); if(!b) return;
  cat = b.dataset.c; renderTabs(); renderGrid();
});
$("sortMenu").addEventListener("click", e => {
  const b = e.target.closest("[data-s]"); if(!b) return;
  sort = +b.dataset.s; renderSort(); renderGrid();
});

/* ---------- Reservación ---------- */
const modalEl = $("bookModal");
const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
const form = $("bookForm");

function toast(msg){
  $("toastMsg").textContent = msg;
  bootstrap.Toast.getOrCreateInstance($("toast")).show();
}

// Opciones del select, agrupadas por categoría
$("fService").innerHTML = `<option value="" disabled selected>Selecciona un servicio</option>` +
  CATS.slice(1).map(c =>
    `<optgroup label="${c}">` +
    SERVICES.filter(s => s.cat===c).map(s => `<option value="${s.id}">${s.name}</option>`).join("") +
    `</optgroup>`).join("");

// Fecha mínima: hoy (en hora local)
(() => {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  $("fDate").min = d.toISOString().slice(0,10);
})();

// "Reservar" en una tarjeta: abre el modal con ese servicio elegido
$("grid").addEventListener("click", e => {
  const b = e.target.closest("[data-book]"); if(!b) return;
  $("fService").value = b.dataset.book;
  modal.show();
});

form.addEventListener("submit", e => {
  e.preventDefault();
  form.classList.add("was-validated");
  if(!form.checkValidity()) return;

  const s = SERVICES.find(x => x.id === +$("fService").value);
  // TODO: aquí conecta con tu backend / correo / WhatsApp. Por ahora solo confirma en pantalla.
  console.log({
    servicio: s.name, nombre: $("fName").value.trim(), telefono: $("fPhone").value.trim(),
    fecha: $("fDate").value, notas: $("fNotes").value.trim()
  });
  modal.hide();
  toast("Solicitud enviada: " + s.name + ". Te contactamos en menos de 24 h.");
});

// Limpia el formulario al cerrar el modal
modalEl.addEventListener("hidden.bs.modal", () => {
  form.reset(); form.classList.remove("was-validated");
});

renderTabs(); renderSort(); renderGrid();
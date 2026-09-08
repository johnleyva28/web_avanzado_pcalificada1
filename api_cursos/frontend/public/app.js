// app.js — consume GET /api/cursos y renderiza con Bootstrap + CSS avanzado
// Soporta vista cards (grid) y vista lista, con filtro por estado y fallback de imagen.

const container = document.getElementById('cursos-container');
const loadingEl = document.getElementById('loading');
const errorEl = document.getElementById('error');
const summaryEl = document.getElementById('summary');

let allCursos = [];
let currentView = localStorage.getItem('cursos-view') || 'cards';   // 'cards' | 'list'
let currentFilter = 'all';                                          // 'all' | 'Activo' | 'Inactivo'

// Fallback inline en SVG (no depende de la red, no muestra ícono de "imagen rota")
function fallbackSvg(nombre) {
  const safe = String(nombre).replace(/[<>&"']/g, (c) =>
    ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&#39;' }[c])
  );
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#1f3a5f"/>
          <stop offset="100%" stop-color="#2c5282"/>
        </linearGradient>
      </defs>
      <rect width="400" height="250" fill="url(#g)"/>
      <text x="50%" y="50%" fill="#ffffff" font-family="Arial, sans-serif"
            font-size="20" font-weight="700" text-anchor="middle"
            dominant-baseline="middle" opacity="0.9">
        ${safe}
      </text>
    </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function escapeHtml(str) {
  return String(str).replace(/[<>&"']/g, (c) =>
    ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&#39;' }[c])
  );
}

function cardHtml(c) {
  const estado = escapeHtml(c.estado);
  const claseEstado = String(c.estado).toLowerCase() === 'activo' ? 'activo' : 'inactivo';
  const fallback = `this.onerror=null;this.src='${fallbackSvg(c.nombre)}';this.classList.add('fallback-img');`;
  return `
    <article class="card" data-id="${c.id}" data-estado="${estado}">
      <img
        src="${escapeHtml(c.imagen)}"
        alt="${escapeHtml(c.nombre)}"
        class="card-img-top"
        loading="lazy"
        onerror="${fallback}"
      />
      <div class="card-body">
        <h2 class="card-title">${escapeHtml(c.nombre)}</h2>
        <div class="card-meta">
          <span><i class="bi bi-bookmark"></i>${escapeHtml(c.carrera)}</span>
          <span><i class="bi bi-person"></i>${escapeHtml(c.profesor)}</span>
        </div>
        <div class="card-footer-custom">
          <span class="creditos"><i class="bi bi-award"></i> ${c.creditos} créditos</span>
          <span class="badge-estado ${claseEstado}">${estado}</span>
        </div>
      </div>
    </article>
  `;
}

function listHtml(c) {
  const estado = escapeHtml(c.estado);
  const claseEstado = String(c.estado).toLowerCase() === 'activo' ? 'activo' : 'inactivo';
  const fallback = `this.onerror=null;this.src='${fallbackSvg(c.nombre)}';this.classList.add('fallback-img');`;
  return `
    <article class="list-card" data-id="${c.id}" data-estado="${estado}">
      <img
        src="${escapeHtml(c.imagen)}"
        alt="${escapeHtml(c.nombre)}"
        class="list-img"
        loading="lazy"
        onerror="${fallback}"
      />
      <div class="list-body">
        <h3>${escapeHtml(c.nombre)}</h3>
        <div class="list-meta">
          <span><strong>Carrera:</strong>${escapeHtml(c.carrera)}</span>
          <span><strong>Profesor:</strong>${escapeHtml(c.profesor)}</span>
          <span><strong>Créditos:</strong>${c.creditos}</span>
        </div>
        <div class="d-flex justify-content-between align-items-center mt-2">
          <span class="text-secondary small">ID #${c.id}</span>
          <span class="badge-estado ${claseEstado}">${estado}</span>
        </div>
      </div>
    </article>
  `;
}

function render() {
  const filtered = currentFilter === 'all'
    ? allCursos
    : allCursos.filter((c) => c.estado === currentFilter);

  const html = filtered
    .map((c) => (currentView === 'cards' ? cardHtml(c) : listHtml(c)))
    .join('');

  container.className = currentView === 'cards' ? 'view-cards' : 'view-list';
  container.innerHTML = html;

  const total = allCursos.length;
  const visibles = filtered.length;
  const activos = allCursos.filter((c) => c.estado === 'Activo').length;
  const inactivos = total - activos;
  summaryEl.textContent =
    `Mostrando ${visibles} de ${total} cursos · ${activos} activos · ${inactivos} inactivos`;
}

function setView(view) {
  currentView = view;
  localStorage.setItem('cursos-view', view);
  document.querySelectorAll('[data-view]').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.view === view);
  });
  render();
}

function setFilter(filter) {
  currentFilter = filter;
  document.querySelectorAll('[data-filter]').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.filter === filter);
  });
  render();
}

async function cargarCursos() {
  try {
    const res = await fetch('/api/cursos');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    allCursos = await res.json();
    loadingEl.classList.add('d-none');
    render();
  } catch (err) {
    loadingEl.classList.add('d-none');
    errorEl.textContent = `Error al cargar los cursos: ${err.message}`;
    errorEl.classList.remove('d-none');
    console.error(err);
  }
}

// Listeners
document.querySelectorAll('[data-view]').forEach((btn) => {
  btn.addEventListener('click', () => setView(btn.dataset.view));
});
document.querySelectorAll('[data-filter]').forEach((btn) => {
  btn.addEventListener('click', () => setFilter(btn.dataset.filter));
});

// Restaurar vista guardada
document.querySelectorAll('[data-view]').forEach((btn) => {
  btn.classList.toggle('active', btn.dataset.view === currentView);
});

cargarCursos();
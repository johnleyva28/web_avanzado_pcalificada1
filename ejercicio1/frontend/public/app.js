// app.js — consume GET /api/cursos y pinta los cards
const grid = document.getElementById('cursos-grid');
const loading = document.getElementById('loading');
const errorEl = document.getElementById('error');

async function cargarCursos() {
  try {
    const res = await fetch('/api/cursos');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const cursos = await res.json();

    loading.style.display = 'none';

    cursos.forEach((curso) => {
      const card = document.createElement('article');
      card.className = 'card';

      const estadoLower = String(curso.estado).toLowerCase();
      const claseEstado = estadoLower === 'activo' ? 'activo' : 'inactivo';

      card.innerHTML = `
        <img src="${curso.imagen}" alt="${curso.nombre}"
             onerror="this.src='https://via.placeholder.com/400x250?text=Sin+Imagen'" />
        <div class="card-body">
          <h2>${curso.nombre}</h2>
          <p><strong>Carrera:</strong> ${curso.carrera}</p>
          <p class="creditos">${curso.creditos} créditos</p>
          <p><strong>Profesor:</strong> ${curso.profesor}</p>
          <span class="badge ${claseEstado}">${curso.estado}</span>
        </div>
      `;
      grid.appendChild(card);
    });
  } catch (err) {
    loading.style.display = 'none';
    errorEl.textContent = `Error al cargar los cursos: ${err.message}`;
    errorEl.style.display = 'block';
    console.error(err);
  }
}

cargarCursos();
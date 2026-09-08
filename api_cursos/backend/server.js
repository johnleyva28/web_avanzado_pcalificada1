// server.js — API REST de Cursos
// Evaluación 01 - Desarrollo de Aplicaciones Web Avanzado

const express = require('express');
const path = require('path');
const cursos = require('./cursos.json');

const app = express();
const PORT = process.env.PORT || 3000;

// 1) Servir archivos estáticos del frontend desde ../frontend/public/
app.use(express.static(path.join(__dirname, '..', 'frontend', 'public')));

// 2) Endpoint principal: devuelve el catálogo de cursos
app.get('/api/cursos', (req, res) => {
  res.json(cursos);
});

// 3) Ruta raíz -> redirige al index.html del frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'public', 'index.html'));
});

// 4) Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`Endpoint API:   http://localhost:${PORT}/api/cursos`);
});
# web_avanzado_pcalificada1

Evaluación 01 — Desarrollo de Aplicaciones Web Avanzado · TECSUP · Ciclo V · 2026-II

[![Deploy](https://img.shields.io/badge/Render-live-46E3B7?logo=render&logoColor=white)](https://web-avanzado-pcalificada1.onrender.com)
[![Repo](https://img.shields.io/badge/GitHub-repo-181717?logo=github&logoColor=white)](https://github.com/johnleyva28/web_avanzado_pcalificada1)
[![Node](https://img.shields.io/badge/Node-%E2%89%A518-339933?logo=node.js&logoColor=white)]()
[![License](https://img.shields.io/badge/License-Academic-blue)]()

---

## 📋 Sobre este repositorio

Este repositorio contiene la solución completa de la **Evaluación 01** del curso *Desarrollo de Aplicaciones Web Avanzado* de TECSUP. La evaluación propone **dos ejercicios independientes** que suman 20 puntos: una API REST local de cursos con Express y un panel de noticias en tiempo real que consume NewsAPI.

| # | Ejercicio | Tema | Puntaje | Carpeta |
|---|-----------|------|---------|---------|
| 1 | API REST de Cursos | Backend Express + frontend con cards de cursos en grilla 4×4 | 10 pts | [`api_cursos/`](./api_cursos/) |
| 2 | Panel de Noticias bitcoin | Backend Express como proxy de NewsAPI + frontend con tarjetas de noticias | 10 pts | [`ejercicio2/`](./ejercicio2/) |

---

## 👥 Autores

- **John Marco Leyva Nuñez** — `john.leyva@tecsup.edu.pe`
- **Gian Marco De la Cruz Bernardo**

**Carrera:** Diseño y Desarrollo de Software
**Ciclo:** V
**Grupo:** 01
**Periodo:** 2026-II

---

## 🚀 Demo en vivo

El Ejercicio 2 está desplegado en Render:

🔗 **https://web-avanzado-pcalificada1.onrender.com**

> El Ejercicio 1 (API REST de Cursos) es local por diseño — corre con `npm start` en cada máquina para que la captura de Postman y la vista del frontend se obtengan del entorno del estudiante.

---

## 🛠️ Stack tecnológico

- **Node.js** 18+ (probado con v22.22.2)
- **Express** 4.x — servidor HTTP
- **Bootstrap 5.3** — UI responsiva (Ejercicio 1)
- **NewsAPI** — fuente de datos para el panel de noticias (Ejercicio 2)
- **HTML5 + CSS3 + JavaScript ES6+** — frontend sin frameworks pesados
- **Unsplash** — imágenes hotlinkables (Unsplash License, uso libre)

---

## 📂 Estructura del repositorio

```
web_avanzado_pcalificada1/
├── README.md              ← este archivo
│
├── api_cursos/            ← Ejercicio 1
│   ├── README.md          (cómo correrlo)
│   ├── instrucciones.md   (guía de capturas para Postman + frontend)
│   ├── .gitignore
│   ├── backend/
│   │   ├── server.js      (Express + GET /api/cursos)
│   │   ├── package.json
│   │   ├── cursos.json    (29 cursos en 5 carreras)
│   │   └── imagenes-cursos.md  (registro de URLs de imágenes)
│   └── frontend/public/
│       ├── index.html     (HTML + Bootstrap 5)
│       ├── styles.css     (CSS avanzado: gradientes, dark mode, anim)
│       └── app.js         (fetch + render + toggle cards/lista)
│
└── ejercicio2/            ← Ejercicio 2
    ├── README.md
    ├── .env.example
    ├── .gitignore
    ├── server.js          (Express + GET /api/noticias + proxy NewsAPI)
    ├── package.json
    └── public/
        ├── index.html     (panel de noticias)
        └── style.css
```

---

## ⚡ Quick start — ambos ejercicios

### Ejercicio 1 (API REST de Cursos)

```bash
cd api_cursos/backend
npm install
npm start
# Abrir http://localhost:3000
```

### Ejercicio 2 (Panel de Noticias)

```bash
cd ejercicio2
npm install
cp .env.example .env       # editar y pegar tu apiKey de newsapi.org
npm start
# Abrir http://localhost:3000
```

> Para instrucciones detalladas, capturas y troubleshooting, leé los README de cada subcarpeta.

---

## ✅ Cumplimiento de la rúbrica

### Ejercicio 1 — API REST de Cursos (10 pts)

| Criterio | Estado |
|----------|--------|
| Servidor Express con endpoint propio `GET /api/cursos` | ✅ `api_cursos/backend/server.js` |
| Frontend consume el endpoint con `fetch()` y renderiza dinámicamente | ✅ `api_cursos/frontend/public/app.js` |
| Grilla de **4 columnas por fila** con cards | ✅ CSS Grid + Bootstrap responsive |
| Cada card muestra imagen, nombre, carrera, créditos, profesor y estado | ✅ |
| Estado distinguido visualmente (Activo / Inactivo) | ✅ Badges verde / rojo con CSS |
| Al menos 8 cursos de prueba | ✅ **29 cursos** en `cursos.json` |
| Captura de Postman del endpoint | ✅ Guía en `instrucciones.md` |

### Ejercicio 2 — NewsAPI bitcoin (10 pts)

| Criterio | Estado |
|----------|--------|
| Servidor Express con endpoint propio `GET /api/noticias` | ✅ `ejercicio2/server.js` |
| Backend consulta NewsAPI desde el servidor (apiKey oculta) | ✅ Variable `NEWS_API_KEY` en `.env` |
| Frontend consume el endpoint propio con `fetch()` | ✅ `ejercicio2/public/index.html` |
| Renderiza dinámicamente las noticias | ✅ |
| Imagen (`urlToImage`) con manejo del caso `null` | ✅ Fallback a placeholder SVG |
| Título, fuente (`source.name`) y fecha (`publishedAt`) | ✅ |
| Botón "Leer más" abre `url` en nueva pestaña (`target="_blank"`) | ✅ |

---

## 🔐 Seguridad

- **`.env` ignorado por git** — tanto en `api_cursos/` como en `ejercicio2/`. La apiKey de NewsAPI nunca se sube al repositorio.
- **CORS abierto solo en desarrollo** — el frontend consume `/api/noticias` desde el mismo origen en producción (Render).
- **NewsAPI key**: nunca compartas tu clave en issues, PRs o capturas. Si la exponés accidentalmente, rotala desde https://newsapi.org/account.

---

## 📸 Capturas y entrega

La guía paso a paso para capturar todo lo que pide la rúbrica está en:

- `api_cursos/instrucciones.md` — capturas de Postman + frontend + código fuente
- `ejercicio2/README.md` — cómo levantar el panel de noticias

---

## 📚 Licencia y atribuciones

- **Imágenes de cursos**: Unsplash License (uso libre). Ver [`api_cursos/backend/imagenes-cursos.md`](./api_cursos/backend/imagenes-cursos.md) para el registro completo de URLs.
- **Datos de noticias**: NewsAPI (https://newsapi.org) — plan free, 100 requests/día.
- **Bootstrap 5.3**: MIT License.
- **Express**: MIT License.

---

## 📞 Contacto

- John Marco Leyva Nuñez — `john.leyva@tecsup.edu.pe`
- Repo: https://github.com/johnleyva28/web_avanzado_pcalificada1
- Issues / preguntas: usar el sistema de issues del repo o contactar por el aula virtual de TECSUP.
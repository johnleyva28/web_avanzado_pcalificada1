# web_avanzado_pcalificada1

Evaluación 01 — Desarrollo de Aplicaciones Web Avanzado (TECSUP, V ciclo).

Este repositorio contiene las dos tareas de la evaluación:

| Tarea | Tema                      | Carpeta                          |
| ----- | ------------------------- | -------------------------------- |
| 1     | API REST de Cursos        | `backend/` (endpoint `/api/cursos`) + `frontend/` (grid 4 columnas) |
| 2     | Panel de noticias bitcoin  | `backend/` (endpoint `/api/noticias`) + `frontend/` (tarjetas) |

> Ambos proyectos usan la **misma** estructura: un backend Express que sirve archivos estáticos del frontend desde su carpeta `public/`. Las carpetas `backend/` y `frontend/` están separadas para mantener limpio el flujo, pero **solo el backend corre el servidor** y debe ser el que se levante durante la evaluación.

---

## 📰 Tarea 2 — Panel de noticias bitcoin (NewsAPI)

Es la tarea en la que se enfoca este README.

### 1. Obtener tu API key de NewsAPI (gratis)

1. Abre en el navegador: **https://newsapi.org/register**
2. Completa el formulario con tu correo electrónico, nombre y contraseña.
3. Confirma tu correo haciendo clic en el enlace que NewsAPI te envía.
4. Inicia sesión en **https://newsapi.org/account** y entra al panel.
5. En la sección **"API Keys"** verás tu clave personal (cadena alfanumérica de ~32 caracteres).
6. Cópiala y pégala en tu archivo `.env` reemplazando el valor de `NEWS_API_KEY`.

Notas del plan gratuito (free tier):
- 100 solicitudes por día.
- Las noticias tienen un retraso de ~24 h (suficiente para esta evaluación).
- No permite uso comercial ni para producción a gran escala.

⚠️ **Nunca subas tu API key al repositorio.** El archivo `.env` ya está excluido en `.gitignore`.

### 2. Configurar las variables de entorno

```bash
# En la raíz del proyecto (web_avanzado_pcalificada1/)
cp .env.example .env
# Edita .env y reemplaza YOUR_NEWSAPI_KEY_HERE por tu clave real
```

Contenido de `.env`:

```env
NEWS_API_KEY=tu_clave_real_aqui
PORT=3000
```

### 3. Levantar el backend

```bash
cd backend
npm install
npm start
```

El servidor escucha en `http://localhost:3000` y sirve:

| Ruta                  | Descripción                                  |
| --------------------- | -------------------------------------------- |
| `GET /`               | Redirige a `frontend/index.html` (panel de noticias). |
| `GET /api/noticias`   | Devuelve el arreglo `articles` de NewsAPI para `q=bitcoin`. |
| `GET /api/cursos`     | (Tarea 1) Devuelve el catálogo local de cursos. |

Prueba rápida en navegador o curl:

```bash
curl http://localhost:3000/api/noticias
```

### 4. Abrir el panel

Con el backend corriendo, abre:

```
http://localhost:3000
```

Ahí verás la grilla con las tarjetas de noticias (imagen, título, fuente, fecha y botón "Leer más").

---

## 📚 Tarea 1 — API REST de Cursos

Documentación completa dentro de `backend/README.md`.

Resumen rápido:

```bash
cd backend
npm install
npm start
# abrir http://localhost:3000/api/cursos
```

---

## 🗂️ Estructura del repositorio

```
web_avanzado_pcalificada1/
├── .env                  # tu clave real (NO se commitea)
├── .env.example          # plantilla pública para otros devs
├── .gitignore
├── README.md             # este archivo
├── backend/
│   ├── server.js         # Express + endpoint /api/noticias + /api/cursos
│   ├── package.json
│   └── cursos.json       # datos locales de la Tarea 1
└── frontend/
    └── public/
        ├── index.html    # panel de noticias (Tarea 2)
        ├── cursos.html   # grid de cursos (Tarea 1)
        ├── styles.css
        └── app.js
```

---

## ✅ Checklist de la rúbrica

- [x] Servidor Express con endpoint propio `/api/noticias` que consulta NewsAPI desde el backend.
- [x] Frontend consume el endpoint propio con `fetch()` y renderiza dinámicamente las noticias.
- [x] Imagen (`urlToImage`) con manejo de caso `null` (imagen por defecto).
- [x] Al hacer clic se abre `url` en nueva pestaña (`target="_blank"`).
- [x] Presentación visual y orden del código.
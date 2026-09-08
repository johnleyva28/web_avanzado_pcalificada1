# api_cursos

API REST local de cursos + vista HTML que la consume. Ejercicio 1 de la Evaluación 01 — Desarrollo de Aplicaciones Web Avanzado (TECSUP, V ciclo).

## ¿De qué trata?

Una pequeña institución educativa necesita mostrar su oferta de cursos en una web. Este proyecto implementa:

1. **Backend** — servidor Node.js con Express que expone el endpoint `GET /api/cursos` y devuelve un catálogo en JSON.
2. **Frontend** — página HTML que consume ese endpoint con `fetch()` y muestra los cursos en una grilla de **4 columnas por fila** (vista cards) o en formato lista. Cada curso tiene imagen, nombre, carrera, créditos, profesor y estado (badge Activo/Inactivo distinguido visualmente).

Todo corre en local, sin base de datos. Los cursos viven en `backend/cursos.json`.

## Estructura

```
api_cursos/
├── README.md                 (este archivo)
├── .gitignore                (excluye node_modules, .env, etc.)
├── backend/
│   ├── server.js             (servidor Express, expone GET /api/cursos)
│   ├── package.json
│   ├── cursos.json           (datos de los 9 cursos)
│   └── imagenes-cursos.md    (registro de las URLs de imágenes)
└── frontend/
    └── public/
        ├── index.html        (HTML + Bootstrap 5)
        ├── styles.css        (CSS avanzado: gradientes, transitions, dark mode)
        └── app.js            (fetch + render dinámico + toggle cards/lista)
```

## Requisitos

- **Node.js** ≥ 18 (probado con 22.22.2).
- **npm** ≥ 9.

## Cómo ejecutarlo

### 1. Instalar dependencias del backend

```bash
cd api_cursos/backend
npm install
```

### 2. Levantar el servidor

```bash
npm start
```

Deberías ver en consola:

```
Servidor corriendo en http://localhost:3000
Endpoint API:   http://localhost:3000/api/cursos
```

### 3. Abrir en el navegador

| URL                                     | Qué hace                                       |
| --------------------------------------- | ---------------------------------------------- |
| `http://localhost:3000/`                | Vista principal (HTML que consume la API).      |
| `http://localhost:3000/api/cursos`      | JSON crudo del catálogo de cursos.              |

> Si el puerto 3000 está ocupado en tu máquina, exportá `PORT` antes de `npm start`:
>
> ```bash
> PORT=3001 npm start
> ```
>
> Y abrí `http://localhost:3001`.

### 4. Probar el endpoint desde otra terminal o Postman

```bash
curl http://localhost:3000/api/cursos
```

Deberías obtener un JSON con 9 cursos, cada uno con estos campos:

| Campo      | Tipo    | Descripción                                   |
| ---------- | ------- | --------------------------------------------- |
| `id`       | number  | Identificador único.                          |
| `nombre`   | string  | Nombre del curso.                             |
| `carrera`  | string  | Carrera a la que pertenece.                   |
| `creditos` | number  | Cantidad de créditos.                         |
| `profesor` | string  | Nombre del docente.                           |
| `estado`   | string  | `"Activo"` o `"Inactivo"`.                    |
| `imagen`   | string  | URL de la imagen representativa del curso.    |

## Vistas disponibles en el frontend

- **Cards** (vista por defecto): grilla de 4 columnas por fila, una card por curso.
- **Lista**: filas horizontales con la imagen a la izquierda y los datos a la derecha. Útil en pantallas chicas o para comparar cursos.

El botón **Cards / Lista** arriba a la derecha cambia entre las dos vistas. La preferencia se guarda en `localStorage` y se recuerda entre recargas.

## Diseño responsive con Bootstrap + CSS avanzado

- Bootstrap 5.3 (CDN) para el grid, navbar, badges, botones y breakpoints.
- CSS personalizado (`styles.css`) para gradientes, hover effects, transiciones suaves, soporte de tema oscuro automático según `prefers-color-scheme`, y fallback de imagen cuando una URL falla (no se muestra el ícono de "imagen rota").

## Manejo de errores de imagen

Si la URL de una imagen no responde o falla, el frontend reemplaza la imagen por un placeholder generado en SVG inline con el nombre del curso, para que ninguna card quede con el ícono de "imagen rota".

## Datos de los cursos

9 cursos en total:

- **6 Activos** — los que estás llevando este ciclo 2026-II.
- **3 Inactivos** — cursos anteriores ya cursados (Estructura de Datos y Algoritmos, Programación en Móviles, Desarrollo de Aplicaciones en Internet).

El catálogo se edita en `backend/cursos.json` — cualquier cambio se refleja al instante sin reiniciar el servidor (Express re-evalúa el JSON en cada request porque el archivo está sincronizado, no cacheado).

## Captura del endpoint en Postman

Para la evidencia que pide la rúbrica:

1. Abrir Postman.
2. Crear un request `GET` a `http://localhost:3000/api/cursos`.
3. **Send**.
4. Captura la respuesta (debería ser un JSON con `status 200` y los 9 cursos en el body).

## Solución de problemas

| Problema                                    | Causa probable                              | Solución                                                   |
| ------------------------------------------- | ------------------------------------------- | ---------------------------------------------------------- |
| `EADDRINUSE: address already in use :::3000`| Otro proceso ocupa el puerto 3000.          | Exportá `PORT=3001 npm start` o cerrá el proceso que usa 3000. |
| `Cannot find module 'express'`              | No corriste `npm install`.                  | `cd api_cursos/backend && npm install`.                    |
| Las imágenes no cargan                      | Tu red bloquea Unsplash.                    | El frontend igual muestra un placeholder SVG con el nombre. |
| `Failed to fetch`                           | El servidor no está corriendo.              | Verificá que `npm start` esté activo en otra terminal.    |

## Licencia de las imágenes

Las URLs de imágenes apuntan a `images.unsplash.com` (Unsplash License — uso libre). El registro completo está en [`backend/imagenes-cursos.md`](./backend/imagenes-cursos.md).
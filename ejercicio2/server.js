require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.NEWS_API_KEY;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/noticias', async (req, res) => {
  try {
    const response = await axios.get('https://newsapi.org/v2/everything', {
      params: {
        q: 'bitcoin',
        apiKey: API_KEY
      }
    });
    res.json(response.data.articles);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Error al consultar NewsAPI' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`Probar endpoint en Postman: GET http://localhost:${PORT}/api/noticias`);
});

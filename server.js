const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

// Configuración de CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.get('/uf/:date', async (req, res) => {
    try {
        const date = req.params.date;
        const response = await axios.get(`https://mindicador.cl/api/uf/${date}`);
        res.send(response.data);
    }
    catch (error) {
        res.status(500).send('Error al obtener el valor de la UF');
    }
});

app.listen(PORT, () => {
    console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
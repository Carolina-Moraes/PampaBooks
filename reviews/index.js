// index.js

require('dotenv').config(); // Carregar variáveis de ambiente do arquivo .env
const express = require('express');
const mongoose = require('mongoose');
const rotasReview = require('./routes/reviewRoutes');
const path = require('path');
const cors = require('cors'); // Importar o CORS

const app = express();
const port = 3005;

// Middleware para parsear JSON
app.use(express.json());

// Habilitar CORS (se necessário)
app.use(cors());

// Servir arquivos estáticos (frontend)
app.use(express.static(path.join(__dirname, 'public')));

// Conectar ao MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log('Reviews conectado ao mongoDB!');
})
.catch((err) => {
    console.error('Erro ao conectar ao mongoDB:', err);
});

// Usar rotas com prefixo '/api'
app.use('/api', rotasReview);

// Rota padrão para verificar se o servidor está funcionando
app.get('/', (req, res) => {
    res.send('Servidor de Reviews está funcionando!');
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor de reviews rodando em http://localhost:${port}`);
});

// Exportar a aplicação configurada (útil para testes)
module.exports = app;

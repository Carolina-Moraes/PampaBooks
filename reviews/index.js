// Importar módulos
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const rotasReview = require('./rotas/rotasReview');
const bodyParser = require('body-parser');
const path = require('path');

// Criar aplicação express
const app = express();
// const port = process.env.PORT || 3002;
const port = 3005;

// Configurar a aplicação para usar o body-parser
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Conectar ao banco de dados
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('Reviews conectado ao mongoDB!');
})
.catch((err) => {
    console.log('Erro ao conectar ao mongoDB: ' + err);
});

// Configurar a aplicação para receber JSON 
/* O Json é usado nas rotas */
app.use(express.json());

// Utilizar rotas importadas
app.use('/', rotasReview);

// Iniciar a aplicação na porta 3005
app.listen(port, () => {
    console.log(`Servidor de reviews rodando em http://localhost:${port}`);
});

// Exportar a aplicação configurada
module.exports = app;









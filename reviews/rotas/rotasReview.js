// Importar módulos
const express = require('express');
const router = express.Router();
const controladorReview = require('../controladores/controladorReview');

// Rota para listar todaS as Reviews
router.get('/', controladorReview.listarReviews);

// Rota para obter Reviews por ID
router.get('/', controladorReview.obterReviewsPorId);

// Rota para Criar Reviews
router.post('/', controladorReview.criarReviews);

// Rota para Atualizar Review
router.put('/', controladorReview.atualizarReview);

// Rota para Deletar Review
router.delete('/', controladorReview.deletarReview);

// Exportar rotas
module.exports = router;
// Importar módulos
const mongoose = require('mongoose');

// Definir schema do usuário
const ReviewSchema = new mongoose.Schema({
    bookId: { type: String, required: true }, // ID do livro
    bookName: { type: String, required: true }, // Nome do livro
    userId: { type: String, required: true }, // ID do usuário que fez a avaliação
    userName: { type: String, required: true }, // Nome do usuário que fez a avaliação
    rating: { type: Number, required: true, min: 1, max: 5 }, // Avaliação do livro (1 a 5)
    reviewText: { type: String, required: true }, // Texto da avaliação
    createdAt: { type: Date, default: Date.now }, // Data da avaliação
    updatedAt: { type: Date, default: Date.now }// Data da última atualização da avaliação
});

// Definir modelo de revisão
const Review = mongoose.model('Review', ReviewSchema);

// Exportar modelo
module.exports = Review;

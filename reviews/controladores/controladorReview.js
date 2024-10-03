// Importar módulos
const Review = require('../modelos/modeloReview');

// Listar todas as reviews
exports.listarReviews = async (req, res) => {
    try {
        const reviews = await Review.find();
        res.json(reviews);
    } catch (erro) {
        res.status(500).json({ mensagem: 'Erro ao listar as reviews' });
    }
};

// Obter review por ID
exports.obterReviewsPorId = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (review) {
            res.json(review);
        } else {
            res.status(404).json({ mensagem: 'Review não encontrada' });
        }
    } catch (erro) {
        res.status(500).json({ mensagem: 'Erro ao obter Review' });
    }
};

// Controlador para criar uma nova review
exports.criarReviews = async (req, res) => {
    const novaReview = new Review({
        bookId: req.body.bookId, // ID do livro
        bookName: req.body.bookName, // Nome do livro
        userId: req.body.userId, // ID do usuário que fez a avaliação
        userName: req.body.userName, // Nome do usuário que fez a avaliação
        rating: req.body.rating, // Avaliação do livro (1 a 5)
        reviewText: req.body.reviewText, // Texto da avaliação
    });

    try {
        const reviewSalva = await novaReview.save();
        res.status(201).json(reviewSalva);
    } catch (erro) {
        res.status(400).json({ mensagem: 'Erro ao criar a Review' });
    }
};

// Atualiza uma review existente no banco de dados com base no ID
exports.atualizarReview = async (req, res) => {
    try {
        const reviewAtualizada = await Review.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (reviewAtualizada) {
            res.json(reviewAtualizada);
        } else {
            res.status(404).json({ mensagem: 'Review não encontrada' });
        }
    } catch (erro) {
        res.status(400).json({ mensagem: 'Erro ao atualizar a Review' });
    }
};

// Deleta uma review do banco de dados com base no ID
exports.deletarReview = async (req, res) => {
    try {
        const reviewDeletada = await Review.findByIdAndDelete(req.params.id);
        if (reviewDeletada) {
            res.status(204).send();
        } else {
            res.status(404).json({ mensagem: 'Review não localizada' });
        }
    } catch (erro) {
        res.status(500).json({ mensagem: 'Erro ao deletar Review' });
    }
};




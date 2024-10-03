document.addEventListener('DOMContentLoaded', () => {
   // Função para listar os reviews ao carregar a página
    listarReviews();

    const reviewForm = document.getElementById('review-form');
    reviewForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const bookId = document.getElementById('bookId').value;
        const reviewText = document.getElementById('review').value;
        const rating = document.getElementById('rating').value;

        const review = {
            bookId: bookId,
            review: reviewText,
            rating: parseInt(rating)
        };

        try {
            const response = await fetch('/reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(review)
            });

            const result = await response.text();
            document.getElementById('review-message').innerText = result;
            listarReviews();  // Atualiza a lista de reviews
        } catch (erro) {
            document.getElementById('review-message').innerText = 'Erro ao enviar o review.';
        }
    });

    // Função para listar os reviews
    async function listarReviews() {
        try {
            const response = await fetch('/reviews');
            const reviews = await response.json();
            const reviewsContainer = document.getElementById('reviews-container');
            reviewsContainer.innerHTML = '';
            
            reviews.forEach(review => {
                const divReview = document.createElement('div');
                divReview.classList.add('review');
                divReview.innerHTML = `
                    <h3>Review</h3>
                    <p>Nome do Livro: ${review.bookName}</p>
                    <p>Comentário: ${review.review}</p>
                    <p>Nota: ${review.rating} estrelas</p>
                `;
                reviewsContainer.appendChild(divReview);
            });
        } catch (erro) {
            console.error('Erro ao listar reviews:\n', erro);
        }
    }
});
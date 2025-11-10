const OMDB_API_KEY = 'chave'
const listaFilmesContainer = document.querySelector('.lista-filmes');
const searchInput = document.querySelector('.search-input');
//
/**
*    @param {Object} filme
*
*/
function criarCardFilme(filme) {
    const card = document.createElement('div');
    card.classList.add('card-filme');
    card.dataset.imdbId = filme.imdbID;

    const rating = filme.imdbRating ? `⭐ ${filme.imdbRating}` : `⭐ N/A`;
}
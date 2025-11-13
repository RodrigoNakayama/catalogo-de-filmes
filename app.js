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

card.innerHTML = `
    <img src="${filme.Poster !== 'N/A' ? filme.Poster : 'placeholder.jpg'}"
        alt="${filme.Titulo}"
        class="poster-filme">
    <span class="avaliacao">${rating}</span>
    <div class="card-detalhes">
        <h3 class="titulo-filme">${filme.Title} (${filme.Year})</h3>
        <button class="botao-adicionar" data-title="${filme.Title}">
            + Minha Lista
        </button>
    </div>
`;

card.addEventListener('click', () => buscarEExibirDetalhes(filme.imdbID));

return card;
}

async function buscarFilmes(termo) {
    if (!termo) return;
}

listaFilmesContainer.innerHTML = '<p style="text-align: center; color: gray;">Carregando...</p>';

try {

    const response = await fetch(`https://www.omdbapi.com/?s-${termo}&apikey=${OMDB_API_KEY}`);
    const data = await response.json();

    listaFilmesContainer.innerHTML = '';

    if (data.response === 'True' && data.Search) {
        data.Search.forEach(async (filmeBase) => {
            const filmeDetalhado = await buscarDetalhes(filmeBase.imdbID);
            if (filmeDetalhado) {
                listaFilmesContainer.appendChild(criarCardFilme(filmeDetalhado));
            }
        })
    }
}
const OMDB_API_KEY = 'a9231b6f'
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
            });
        } else {
            listaFilmesContainer.innerHTML = `<p style="text-align: center;">Nenhum filme encontrado para "${termo}".</p>`
        }
    } catch (error) {
        console.error("Erro ao bucar ilme:", error);
        listaFilmesContainer.innerHTML = '<p style="text-align: center; color: red;">Erro na conexão com a API.</p>';
    }
}

async function buscarDetalhes(imdbID) {
    try {
        const response = await fetch(`https://www.omdbapi.com/?i=${imdbID}&plot=full&apikey=${OMDB_API_KEY}`);
        const data = await response.json();
        return data.Response === 'True' ? data : null;
    } catch (error) {
        console.error("Erro ao buscar detalhes:", error);
        return null;
    }
}

function buscarEExibirDetalhes(imdbID) {
    alert(`Funcionalidade de Detalhes/Trailer para o ID: ${imdbID} (ainda precisa ser implementado)`);
}

let searchTimeout;
searchInput.addEventListener('input', (event) => {
    clearTimeout(searchTimeout);

    searchTimeout = setTimeout(() => {
        buscarFilmes(event.target.value.trim());
    }, 500);
});

document.addEventListener('DOMContentLoaded', () => {
    buscarFilmes('popular');
});
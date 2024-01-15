window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('search');

    if (searchQuery) {
        document.getElementById('movieTitle').value = searchQuery;

        search();
    }

};

document.getElementById('searchForm').addEventListener('submit', function (e) {
    e.preventDefault();
    search(e);
});

function search(e) {

    const apiKey = 'e684ab1ca25ce9861ccd1c17032e82e6';

    const searchTerm = document.getElementById('movieTitle').value;

    const language = 'pt-BR';

    const apiUrl = `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${searchTerm}&language=${language}`;

    scrollToTop();

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
        displayResults(data.results);
        })
        .catch(error => console.error('Erro ao fazer a solicitação à API:', error));

};

// function displayResults(results) {
//     const resultsContainer = document.getElementById('results');

//     resultsContainer.innerHTML = '';

//     if (results.length === 0) {
//         resultsContainer.innerHTML = '<p>Nenhum resultado encontrado.</p>';
//         return;
//     }

//     results.forEach(item => {
//         if (!item.poster_path) {
//             return;
//         }

//         const resultElement = document.createElement('div');
//         resultElement.classList.add('result');

//         let title, overview, imageUrl;

//         if (item.media_type === 'movie') {
//             title = item.title;
//             overview = item.overview;
//             imageUrl = item.poster_path
//                 ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
//                 : '';
//             getMovieDetails(item.id, resultElement);
//         } else if (item.media_type === 'tv') {
//             title = item.name;
//             overview = item.overview;
//             imageUrl = item.poster_path
//                 ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
//                 : '';
//             getTVShowDetails(item.id, resultElement);
//         }

//         if (!imageUrl) {
//             return;
//         }
//         resultElement.innerHTML = `
//             <div class="row">
//                 <div class="col-md-4">
//                     <img src="${imageUrl}" alt="${title} Poster" class="d-block w-100 rounded">
//                 </div>
//                 <div class="col-md-8">
//                     <h2>${title}</h2>
//                     <p>${overview}</p>
//                 </div>
//             </div>
//             `;

//         resultsContainer.appendChild(resultElement);
//     });
// }

async function displayResults(results) {
    const resultsContainer = document.getElementById('results');

    resultsContainer.innerHTML = '';

    if (results.length === 0) {
        resultsContainer.innerHTML = '<p>Nenhum resultado encontrado.</p>';
        return;
    }

    for (const item of results) {
        if (!item.poster_path) {
            continue;
        }

        const resultElement = document.createElement('div');
        resultElement.classList.add('result');

        let title, overview, imageUrl;

        if (item.media_type === 'movie') {
            title = item.title;
            overview = item.overview;
            imageUrl = item.poster_path
                ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                : '';
            await getMovieDetails(item.id, resultElement);
        } else if (item.media_type === 'tv') {
            title = item.name;
            overview = item.overview;
            imageUrl = item.poster_path
                ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                : '';
            await getTVShowDetails(item.id, resultElement);
        }

        if (!imageUrl) {
            continue;
        }

        const streamingProviders = await getStreamingProviders(item.id, item.media_type);

        resultElement.innerHTML = `
            <div class="row">
                <div class="col-md-4">
                    <img src="${imageUrl}" alt="${title} Poster" class="d-block w-100 rounded">
                </div>
                <div class="col-md-8">
                    <h2>${title}</h2>
                    <p>${overview}</p>
                    <p>disponivel em:
                        ${streamingProviders.map(provider => `
                        <img src="${provider.logo}" alt="${provider.name} Logo" class="streaming-logo">
                        `).join('')}
                    </p>
                </div>
            </div>
        `;

        resultsContainer.appendChild(resultElement);
    }
}


async function getStreamingProviders(id, mediaType) {
    const response = await fetch(`https://api.themoviedb.org/3/${mediaType}/${id}/watch/providers?api_key=e684ab1ca25ce9861ccd1c17032e82e6`);
    const data = await response.json();

    const streamingProviders = [];

    if (data.results && data.results.BR) {
        const brProviders = data.results.BR;
        const flatrateProviders = brProviders.flatrate || [];

        for (const provider of flatrateProviders) {
            streamingProviders.push({
                name: provider.provider_name,
                logo: provider.logo_path ? `https://image.tmdb.org/t/p/original${provider.logo_path}` : null,
            });
        }
    }

    return streamingProviders;
}

async   function getMovieDetails(movieId, resultElement) {
    const apiKey = 'e684ab1ca25ce9861ccd1c17032e82e6';

    const movieDetailsUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=pt-BR`;
    const movieCreditsUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`;

    fetch(movieDetailsUrl)
    .then(response => response.json())
    .then(details => {
            fetch(movieCreditsUrl)
            .then(response => response.json())
            .then(credits => {
            const directors = credits.crew.filter(member => member.job === 'Director');
            resultElement.innerHTML += `
                <div class="infos col-md-4 d-flex flex-column">
                    <ul class="lista">
                        <li class="item_lista">
                            <button class="item_lista">
                                <i class="bi bi-bookmark-plus"></i>
                            </button>
                        </li>
                        <li class="item_lista">
                            <button class="item_lista">
                                <i class="bi bi-plus-circle"></i>
                            </button>
                        </li>
                        <li class="item_lista">
                            <button class="item_lista">
                                <i class="bi bi-check-square"></i>
                            </button>
                        </li>
                        <li class="item_lista">
                            <button class="item_lista">
                                <i class="bi bi-hand-thumbs-up"></i>
                            </button>
                        </li>
                        <li class="item_lista">
                            <button class="item_lista">
                                <i class="bi bi-hand-thumbs-down"></i>
                            </button>
                        </li>
                    </ul>
                    <p>Data de lançamento: ${formatarData(details.release_date)}</p>
                </div>
                <div class= "infos col-md-4 d-flex flex-column">
                    <p>Gêneros: ${details.genres.map(genre => genre.name).join(', ')}</p>
                    <p>Classificação: ${details.vote_average.toFixed(1)}</p>
                    <p>Classificação indicativa: ${details.adult}</p>
                    <p>popularidade: ${details.popularity}</p>
                    <p>Duração: ${details.runtime } minutos</p>
                    <p>Diretor: ${directors.map(director => director.name).join(', ') || 'Não disponível'}</p>
                </div>
                
                `;
        })
        .catch(error => console.error('Erro ao obter créditos do filme:', error));
    })
    .catch(error => console.error('Erro ao obter detalhes do filme:', error));
}

async   function getTVShowDetails(tvShowId, resultElement) {
    const apiKey = 'e684ab1ca25ce9861ccd1c17032e82e6';

    const tvShowDetailsUrl = `https://api.themoviedb.org/3/tv/${tvShowId}?api_key=${apiKey}&language=pt-BR`;

    fetch(tvShowDetailsUrl)
        .then(response => response.json())
        .then(details => {
        resultElement.innerHTML += `
            <div class="infos col-md-4 d-flex flex-column">
                <ul class="lista">
                    <li class="item_lista">
                        <button class="item_lista">
                            <i class="bi bi-bookmark-plus"></i>
                        </button>
                    </li>
                    <li class="item_lista">
                        <button class="item_lista">
                            <i class="bi bi-plus-circle"></i>
                        </button>
                    </li>
                    <li class="item_lista">
                        <button class="item_lista">
                            <i class="bi bi-check-square"></i>
                        </button>
                    </li>
                    <li class="item_lista">
                        <button class="item_lista">
                            <i class="bi bi-hand-thumbs-up"></i>
                        </button>
                    </li>
                    <li class="item_lista">
                        <button class="item_lista">
                            <i class="bi bi-hand-thumbs-down"></i>
                        </button>
                    </li>
                </ul>
                <p>Data de lançamento: ${formatarData(details.first_air_date)}</p>
            </div>
            <div class= "infos col-md-4  d-flex flex-column">
                <p>Gêneros: ${details.genres.map(genre => genre.name).join(', ')}</p>
                <p>Classificação: ${details.vote_average.toFixed(1)}</p>
                <p>popularidade: ${details.popularity}</p>
                <p>Duração dos episódios: ${details.episode_run_time.length > 0 ? details.episode_run_time[0] + ' minutos' : 'Não disponível'}</p>
                <p>Temporadas: ${details.number_of_seasons}</p>
                <p>Diretor: ${details.created_by.length > 0 ? details.created_by.map(creator => creator.name).join(', ') : 'Não disponível'}
            </div>
            
        `;
        })
        .catch(error => console.error('Erro ao obter detalhes da série de TV:', error));
}

function formatarData(dataString) {
    if (!dataString) {
        return 'Data indisponível';
    }

    const data = new Date(dataString);
    const dia = data.getDate().toString().padStart(2, '0');
    const mes = (data.getMonth() + 1).toString().padStart(2, '0'); 
    const ano = data.getFullYear();

    return `${dia}/${mes}/${ano}`;
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' 
    });
}
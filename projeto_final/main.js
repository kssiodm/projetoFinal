document.getElementById('searchForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const apiKey = 'e684ab1ca25ce9861ccd1c17032e82e6';

    const searchTerm = document.getElementById('movieTitle').value;

    const language = 'pt-BR';

    const apiUrl = `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${searchTerm}&language=${language}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
        displayResults(data.results);
        })
        .catch(error => console.error('Erro ao fazer a solicitação à API:', error));


});

function displayResults(results) {
    const resultsContainer = document.getElementById('results');

    resultsContainer.innerHTML = '';

    if (results.length === 0) {
        resultsContainer.innerHTML = '<p>Nenhum resultado encontrado.</p>';
        return;
    }

    results.forEach(item => {
        const resultElement = document.createElement('div');
        resultElement.classList.add('result');

    let title, releaseDate, overview, imageUrl;

    if (item.media_type === 'movie') {
        title = item.title;
        releaseDate = formatarData(item.release_date);
        overview = item.overview;
        imageUrl = item.poster_path
        ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
        : 'placeholder-image-url.jpg'; 
        getMovieDetails(item.id, resultElement);
    } else if (item.media_type === 'tv') {
        title = item.name;
        releaseDate = formatarData(item.first_air_date);
        overview = item.overview;
        imageUrl = item.poster_path
        ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
        : 'placeholder-image-url.jpg';
        getTVShowDetails(item.id, resultElement);
    } else {
        
    return;
    }

    resultElement.innerHTML = `
        <div class="row">
            <div class="col-md-4">
                <img src="${imageUrl}" alt="${title} Poster" class="d-block w-100 rounded">
                <ul class="lista">
                    <li class="item_lista">
                        <button class="item_lista">
                            <i class="bi bi-bookmark-plus"></i>
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
                <p>Data de Lançamento: ${releaseDate}</p>
            </div>
            <div class="col-md-8">
                <h2>${title}</h2>
                <p>${overview}</p>
                
            </div>
        </div>
        `;

        resultsContainer.appendChild(resultElement);
    });
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

function getMovieDetails(movieId, resultElement) {
    const apiKey = 'e684ab1ca25ce9861ccd1c17032e82e6';

    const movieDetailsUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=pt-BR`;

    fetch(movieDetailsUrl)
        .then(response => response.json())
        .then(details => {
        resultElement.innerHTML += `
            <p>Gêneros: ${details.genres.map(genre => genre.name).join(', ')}</p>
            <p>Classificação: ${details.vote_average}</p>
            <p>Duração: ${details.runtime} minutos</p>
            <p>Diretor: ${details.director || 'Não disponível'}</p>
            `;
        })
        .catch(error => console.error('Erro ao obter detalhes do filme:', error));
}

function getTVShowDetails(tvShowId, resultElement) {
    const apiKey = 'e684ab1ca25ce9861ccd1c17032e82e6';

    const tvShowDetailsUrl = `https://api.themoviedb.org/3/tv/${tvShowId}?api_key=${apiKey}&language=pt-BR`;

    fetch(tvShowDetailsUrl)
        .then(response => response.json())
        .then(details => {
        resultElement.innerHTML += `
            <p>Gêneros: ${details.genres.map(genre => genre.name).join(', ')}</p>
            <p>Classificação: ${details.vote_average}</p>
            <p>Duração: ${details.runtime} minutos</p>
            <p>Diretor: ${details.created_by.length > 0 ? details.created_by.map(creator => creator.name).join(', ') : 'Não disponível'}
        `;
        })
        .catch(error => console.error('Erro ao obter detalhes da série de TV:', error));
}

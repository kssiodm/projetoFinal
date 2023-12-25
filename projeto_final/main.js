document.getElementById('searchForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Obtenha a chave da API TMDb
    const apiKey = 'e684ab1ca25ce9861ccd1c17032e82e6';

    // Obtenha o valor do campo de pesquisa
    const searchTerm = document.getElementById('movieTitle').value;

    // Especifique o idioma desejado (português do Brasil)
    const language = 'pt-BR';

    // Construa a URL da API TMDb incluindo o parâmetro de idioma
    const apiUrl = `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${searchTerm}&language=${language}`;

    // Faça a solicitação à API usando fetch
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
        // Exiba os resultados na página
        displayResults(data.results);
        })
        .catch(error => console.error('Erro ao fazer a solicitação à API:', error));
});

  // Função para exibir os resultados na página
function displayResults(results) {
    const resultsContainer = document.getElementById('results');

    // Limpe os resultados anteriores
    resultsContainer.innerHTML = '';

    // Verifique se há resultados
    if (results.length === 0) {
        resultsContainer.innerHTML = '<p>Nenhum resultado encontrado.</p>';
        return;
        }

    // Crie elementos para cada resultado e adicione à página
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
            : 'placeholder-image-url.jpg'; // URL de uma imagem de espaço reservado, se não houver imagem disponível
            getMovieDetails(item.id, resultElement);
        } else if (item.media_type === 'tv') {
            title = item.name;
            releaseDate = formatarData(item.first_air_date);
            overview = item.overview;
            imageUrl = item.poster_path
            ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
            : 'placeholder-image-url.jpg'; // URL de uma imagem de espaço reservado, se não houver imagem disponível
            getTVShowDetails(item.id, resultElement);
        } else {
            // Se não for um filme ou série, pule este resultado
            return;
        }

        resultElement.innerHTML = `
        <div class="row">
            <div class="col-md-4">
                <img src="${imageUrl}" alt="${title} Poster" class="d-block w-100 rounded">
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

  // Função para formatar a data no padrão dia/mês/ano
function formatarData(dataString) {
    if (!dataString) {
        return 'Data indisponível';
    }

    const data = new Date(dataString);
    const dia = data.getDate().toString().padStart(2, '0');
    const mes = (data.getMonth() + 1).toString().padStart(2, '0'); // Meses são base 0, então é necessário adicionar 1
    const ano = data.getFullYear();

    return `${dia}/${mes}/${ano}`;
}

  // Função para obter detalhes de um filme por ID
function getMovieDetails(movieId, resultElement) {
    const apiKey = 'SUA_CHAVE_DE_API';

    const movieDetailsUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=pt-BR`;

    fetch(movieDetailsUrl)
        .then(response => response.json())
        .then(details => {
        // Adicione informações adicionais ao resultado
        resultElement.innerHTML += `
            <p>Gêneros: ${details.genres.map(genre => genre.name).join(', ')}</p>
            <p>Classificação: ${details.vote_average}</p>
            <p>Duração: ${details.runtime} minutos</p>
            <p>Diretor: ${details.director || 'Não disponível'}</p>
        `;
        })
        .catch(error => console.error('Erro ao obter detalhes do filme:', error));
}

  // Função para obter detalhes de uma série de TV por ID
function getTVShowDetails(tvShowId, resultElement) {
    const apiKey = 'e684ab1ca25ce9861ccd1c17032e82e6';

    const tvShowDetailsUrl = `https://api.themoviedb.org/3/tv/${tvShowId}?api_key=${apiKey}&language=pt-BR`;

    fetch(tvShowDetailsUrl)
        .then(response => response.json())
        .then(details => {
        // Adicione informações adicionais ao resultado
        resultElement.innerHTML += `
            <p>Gêneros: ${details.genres.map(genre => genre.name).join(', ')}</p>
            <p>Classificação: ${details.vote_average}</p>
            <p>Duração: ${details.episode_run_time.length > 0 ? `${details.episode_run_time[0]} minutos por episódio` : 'Não disponível'}</p>
            <p>Diretor: ${details.created_by.length > 0 ? details.created_by.map(creator => creator.name).join(', ') : 'Não disponível'}</p>
        `;
        })
        .catch(error => console.error('Erro ao obter detalhes da série de TV:', error));
}

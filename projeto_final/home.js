$(document).ready(function () {
    // Chave de API do TMDB (substitua pela sua própria chave)
    const apiKey = 'e684ab1ca25ce9861ccd1c17032e82e6';

    // URL base da API TMDB
    const apiUrl = 'https://api.themoviedb.org/3';

    // Endpoint para obter os filmes mais bem avaliados
    const topRatedEndpoint = '/movie/top_rated';

    // Container onde os resultados serão exibidos
    const resultsContainer = $('#results');

    // Função para obter os filmes mais bem avaliados
    function getTopRatedMovies() {
        $.ajax({
            url: apiUrl + topRatedEndpoint,
            type: 'GET',
            data: {
                api_key: apiKey
            },
            success: function (data) {
                displayMovies(data.results);
            },
            error: function (error) {
                console.error('Erro ao obter os filmes:', error);
            }
        });
    }

    // Função para exibir os filmes na página
    function displayMovies(movies) {
        resultsContainer.empty();

        movies.forEach(function (movie) {
            const movieCard = $('<div class="movie-card">');
            const movieImage = $('<img>').attr('src', 'https://image.tmdb.org/t/p/w500' + movie.poster_path);
            
            // Adicione um ouvinte de evento de clique na imagem para exibir informações detalhadas
            movieImage.click(function () {
                // Implemente a lógica para exibir informações detalhadas do filme/série
                alert('Implemente informações detalhadas aqui!');
            });

            movieCard.append(movieImage);
            resultsContainer.append(movieCard);
        });
    }

    // Inicie o processo de obtenção e exibição dos filmes mais bem avaliados
    getTopRatedMovies();
});

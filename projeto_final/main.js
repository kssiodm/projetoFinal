document.getElementById('searchForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Obtenha a chave da API TMDb
    const apiKey = 'e684ab1ca25ce9861ccd1c17032e82e6';

    // Obtenha o valor do campo de pesquisa
    const movieTitle = document.getElementById('movieTitle').value;

    // Especifique o idioma desejado (português do Brasil)
    const language = 'pt-BR';

    // Construa a URL da API TMDb incluindo o parâmetro de idioma
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${movieTitle}&language=${language}`;

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
    results.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');

        movieElement.innerHTML = `
        <h2>${movie.title}</h2>
        <p>${movie.overview}</p>
        <p>Data de Lançamento: ${movie.release_date}</p>
        <p>Avaliação Média: ${movie.vote_average}</p>
        `;

    resultsContainer.appendChild(movieElement);
    });
}

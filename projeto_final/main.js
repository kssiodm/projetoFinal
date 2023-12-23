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
    
        let title, releaseDate;
        
        if (item.media_type === 'movie') {
            title = item.title;
            releaseDate = item.release_date;
        } else if (item.media_type === 'tv') {
            title = item.name;
            releaseDate = item.first_air_date;
        } else {
            // Se não for um filme ou série, pule este resultado
            return;
        }

    const imageUrl = item.poster_path
        ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
        : 'placeholder-image-url.jpg'; // URL de uma imagem de espaço reservado, se não houver imagem disponível

    resultElement.innerHTML = `
        <h2>${title}</h2>
        <img src="${imageUrl}" alt="${title} Poster">
        <p>${item.overview}</p>
        <p>Data de Lançamento: ${releaseDate}</p>
        <p>Avaliação Média: ${item.vote_average}</p>
    `;

    resultsContainer.appendChild(resultElement);
    });
}
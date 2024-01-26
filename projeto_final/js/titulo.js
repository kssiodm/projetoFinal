document.addEventListener('DOMContentLoaded', async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const itemId = urlParams.get('id');

    if (itemId) {
        const resultElement = document.getElementById('result'); // Substitua 'result' pelo ID do elemento onde deseja exibir os detalhes

        try {
            // Obter informações do filme ou série
            const item = await getMediaDetails(itemId);

            // Obter provedores de streaming
            const streamingProviders = await getStreamingProviders(item.id, item.media_type);

            const streamingLogosElement = document.createElement('div');
            const streamingNamesList = document.createElement('ul');
            streamingLogosElement.classList.add('streaming-logos');

            if (streamingProviders.length > 0) {
                streamingProviders.forEach(provider => {
                    if (provider.logo) {
                        const logoImage = document.createElement('img');
                        logoImage.src = provider.logo;
                        logoImage.alt = `${provider.name} Logo`;
                        logoImage.classList.add('streaming-logo');
                        streamingLogosElement.appendChild(logoImage);

                        const listItem = document.createElement('li');
                        listItem.textContent = provider.name;
                        streamingNamesList.appendChild(listItem);
                    }
                });
            }

            let imageUrl, title, overview;

            if (item.media_type === 'movie') {
                // Obter detalhes do filme
                const movieDetails = await getMovieDetails(item.id, resultElement);
                imageUrl = movieDetails.poster_path;
                title = movieDetails.title;
                overview = movieDetails.overview;
            } else if (item.media_type === 'tv') {
                // Obter detalhes da série de TV
                const tvShowDetails = await getTVShowDetails(item.id, resultElement);
                imageUrl = tvShowDetails.poster_path;
                title = tvShowDetails.name;
                overview = tvShowDetails.overview;
            }

            // Preencher a página de detalhes
            resultElement.innerHTML = `
                <!-- Código HTML da página de detalhes, conforme fornecido anteriormente -->
            `;
        } catch (error) {
            console.error('Erro ao obter detalhes:', error);
        }
    } else {
        console.error('ID do item não encontrado na URL.');
    }
});


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

function displayResults(results) {
    const resultsContainer = document.getElementById('results');

    resultsContainer.innerHTML = '';

    if (results.length === 0) {
        resultsContainer.innerHTML = '<p>Nenhum resultado encontrado.</p>';
        return;
    }

    results.forEach(async item => {
        if (!item.poster_path) {
            return;
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
        } else if (item.media_type === 'tv') {
            title = item.name;
            overview = item.overview;
            imageUrl = item.poster_path
                ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                : '';
        }

        if (!imageUrl) {
            return;
        }

        const streamingLogosElement = document.createElement('div');
        const streamingNamesList = document.createElement('ul');
        streamingLogosElement.classList.add('streaming-logos');

        try {
            const streamingProviders = await getStreamingProviders(item.id, item.media_type);

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
        } catch (error) {
            console.error('Erro ao obter provedores de streaming:', error);
        }

        if (item.media_type === 'movie') {
            await getMovieDetails(item.id, resultElement);
        } else if (item.media_type === 'tv') {
            await getTVShowDetails(item.id, resultElement);
        }

        resultElement.innerHTML = `
            <div class="row">
                <div class="col-md-4">
                    <img src="${imageUrl}" alt="${title} Poster" class="d-block w-100 rounded">
                </div>
                <div class="col-md-8">
                    <h2>${title}</h2>
                    <p>${overview}</p>
                    <div class="streaming-logos-horizontal">
                        ${streamingLogosElement.outerHTML}
                    </div>
                    <div class="streaming-names-list">
                        <p><strong>Disponível em:</strong></p>
                        ${streamingNamesList.outerHTML}
                    </div>
                </div>
            </div>
        `;

        resultsContainer.appendChild(resultElement);
    });
}

function getStreamingProviders(id, mediaType) {
    return fetch(`https://api.themoviedb.org/3/${mediaType}/${id}/watch/providers?api_key=e684ab1ca25ce9861ccd1c17032e82e6`)
        .then(response => response.json())
        .then(data => {
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
        })
        .catch(error => {
            console.error('Erro ao obter provedores de streaming:', error);
            return [];
        });
}

function getMovieDetails(movieId, resultElement) {
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
            const countries = details.production_countries.map(country => country.name).join(', ');
            resultElement.innerHTML += `
                <div class="col-md-4 d-flex flex-column">
                    <ul class="lista">
                        <li class="item_lista">
                            <button class="item_lista" id="bList" onclick="transformarBotaolist(this),adicionarOuRemoverDaLista('${details.poster_path}')")>
                                <i class="bi bi-bookmark-plus"></i>
                            </button>
                        </li>
                        <li class="item_lista bWatch">
                            <button class="item_lista" id="bWatch" onclick="transformarBotaoplay(this),adicionarOuRemoverAssistirMaisTarde('${details.poster_path}')">
                                <i class="bi bi-play-btn"></i>
                            </button>
                        </li>
                        <li class="item_lista">
                            <button class="item_lista" id="butozinho" onclick="transformarBotaoWatch(this)">
                                <i class="bi bi-check-square"></i>
                            </button>
                        </li>
                        <li class="item_lista">
                            <button class="item_lista" onclick="transformarBotaoLike(this)">
                                <i class="bi bi-hand-thumbs-up"></i>
                            </button>
                        </li>
                        <li class="item_lista">
                            <button class="item_lista" onclick="transformarBotaoDislike(this)">
                                <i class="bi bi-hand-thumbs-down"></i>
                            </button>
                        </li>
                    </ul>
                </div>
                <div class="row ">
                    <div class= "infos col-md-4 border-right">
                        <p  class="border-bottom">Data de lançamento: ${formatarData(details.release_date)}</p>
                        <p  class="border-bottom">Classificação: ${details.vote_average.toFixed(1)}</p>
                        <p  class="border-bottom">popularidade: ${details.popularity}</p>
                        <p  class="border-bottom">Duração: ${details.runtime} minutos</p>
                    </div>
                    <div class= "infos col-md-8 d-flex flex-column">
                        <p  class="border-bottom">Gêneros: ${details.genres.map(genre => genre.name).join(', ')}</p>
                        <p  class="border-bottom">País de Produção: ${countries || 'Não disponível'}</p>
                        <p  class="border-bottom">Diretor: ${directors.map(director => director.name).join(', ') || 'Não disponível'}</p>
                    </div>
                </div>
                `;
        })
        .catch(error => console.error('Erro ao obter créditos do filme:', error));
    })
    .catch(error => console.error('Erro ao obter detalhes do filme:', error));
}

function getTVShowDetails(tvShowId, resultElement) {
    const apiKey = 'e684ab1ca25ce9861ccd1c17032e82e6';

    const tvShowDetailsUrl = `https://api.themoviedb.org/3/tv/${tvShowId}?api_key=${apiKey}&language=pt-BR`;

    fetch(tvShowDetailsUrl)
        .then(response => response.json())
        .then(details => {
        const countries = details.production_countries.map(country => country.name).join(', ');
        resultElement.innerHTML += `
            <div class="col-md-4 d-flex flex-column">
                <ul class="lista">
                    <li class="item_lista">
                        <button class="item_lista bList" id="bList" onclick="transformarBotaolist(this),adicionarOuRemoverDaLista('${details.poster_path}') ")>
                            <i class="bi bi-bookmark-plus"></i>
                        </button>
                    </li>
                    <li class="item_lista">
                        <button class="item_lista" id="bWatch" onclick="transformarBotaoplay(this)adicionarOuRemoverAssistirMaisTarde('${details.poster_path}')">
                            <i class="bi bi-play-btn"></i>
                        </button>
                    </li>
                    <li class="item_lista">
                        <button class="item_lista" id="butozinho" onclick="transformarBotaoWatch(this)">
                            <i class="bi bi-check-square"></i>
                        </button>
                    </li>
                    <li class="item_lista">
                        <button class="item_lista" onclick="transformarBotaoLike(this)">
                            <i class="bi bi-hand-thumbs-up"></i>
                        </button>
                    </li>
                    <li class="item_lista">
                        <button class="item_lista" onclick="transformarBotaoDislike(this)">
                            <i class="bi bi-hand-thumbs-down"></i>
                        </button>
                    </li>
                </ul>
            </div>
            <div class="row">
                <div class="infos col-md-4 border-right">
                    <p  class="border-bottom">Data de lançamento: ${formatarData(details.first_air_date)}</p>
                    <p  class="border-bottom">Classificação: ${details.vote_average.toFixed(1)}</p>
                    <p  class="border-bottom">popularidade: ${details.popularity}</p>
                    <p  class="border-bottom">Duração dos episódios: ${details.episode_run_time.length > 0 ? details.episode_run_time[0] + ' minutos' : 'Não disponível'}</p>
                </div>
                <div class= "infos col-md-8  d-flex flex-column">
                    <p  class="border-bottom">Gêneros: ${details.genres.map(genre => genre.name).join(', ')}</p>
                    <p  class="border-bottom">País de Produção: ${countries || 'Não disponível'}</p>
                    <p  class="border-bottom">Temporadas: ${details.number_of_seasons}</p>
                    <p  class="border-bottom">Diretor: ${details.created_by.length > 0 ? details.created_by.map(creator => creator.name).join(', ') : 'Não disponível'}</p>
                </div>
            </div>
        `;
        })
        .catch(error => console.error('Erro ao obter detalhes da série de TV:', error));
}

function adicionarOuRemoverDaLista(poster_path, botao) {
    let lista = JSON.parse(localStorage.getItem('lista')) || [];

    const index = lista.findIndex(item => item && item.poster_path === poster_path);
    if (index === -1) {
        lista.push({ poster_path, type: 'lista' });

        alert(`Item foi adicionado à Lista.`);
    } else {
        lista.splice(index, 1);

        alert(`Item removido da lista.`);
    }

    localStorage.setItem('lista', JSON.stringify(lista));
    transformarBotaolist(botao);
}

function adicionarOuRemoverAssistirMaisTarde(poster_path, botao) {
    let assistirMaisTarde = JSON.parse(localStorage.getItem('assistirMaisTarde')) || [];

    const index = assistirMaisTarde.findIndex(item => item && item.poster_path === poster_path);
    if (index === -1) {
        assistirMaisTarde.push({ poster_path, type: 'assistirMaisTarde' });

        alert(`Item foi adicionado à lista "Assistir Mais Tarde".`);
    } else {
        assistirMaisTarde.splice(index, 1);

        alert(`Item foi removido da lista "Assistir Mais Tarde".`);
    }

    localStorage.setItem('assistirMaisTarde', JSON.stringify(assistirMaisTarde));
    transformarBotaoplay(botao);
}

// function adicionarOuRemoverDaLista(poster_path, titulo, botao) {
//     let lista = JSON.parse(localStorage.getItem('lista')) || [];

//     const index = lista.findIndex(item => item && item.poster_path === poster_path);
//     if (index === -1) {
//         lista.push({ poster_path, titulo, type: 'lista' });

//         alert(`"${titulo}" foi adicionado à Lista.`);
//     } else {
//         lista.splice(index, 1);

//         alert(`"${titulo}" foi removido da lista.`);
//     }

//     localStorage.setItem('lista', JSON.stringify(lista));
//     transformarBotaolist(botao, poster_path);
// }

// function adicionarOuRemoverAssistirMaisTarde(poster_path, titulo, botao) {
//     let assistirMaisTarde = JSON.parse(localStorage.getItem('assistirMaisTarde')) || [];

//     const index = assistirMaisTarde.findIndex(item => item && item.poster_path === poster_path);
//     if (index === -1) {
//         assistirMaisTarde.push({ poster_path, titulo, type: 'assistirMaisTarde' });

//         alert(`"${titulo}" foi adicionado à lista "Assistir Mais Tarde".`);
//     } else {
//         assistirMaisTarde.splice(index, 1);

//         alert(`"${titulo}" foi removido da lista "Assistir Mais Tarde".`);
//     }

//     localStorage.setItem('assistirMaisTarde', JSON.stringify(assistirMaisTarde));
//     transformarBotaoplay(botao, poster_path);
// }

function transformarBotaolist(botao) {
    var estaMarcado = botao.classList.contains('checked');

    if (estaMarcado) {
        botao.classList.remove('checked');
        botao.innerHTML = '<i class="bi bi-bookmark-plus"></i>';
        
    } else {
        botao.classList.add('checked');
        botao.innerHTML = '<i class="bi bi-bookmark-dash-fill"></i>';
    }
}

function transformarBotaoplay(botao) {
    var estaMarcado = botao.classList.contains('checked');

    if (estaMarcado) {
        botao.classList.remove('checked');
        botao.innerHTML = '<i class="bi bi-play-btn"></i>';
    } else {
        botao.classList.add('checked');
        botao.innerHTML = '<i class="bi bi-play-btn-fill"></i>';
    }
}

function transformarBotaoWatch(botao) {
    var estaMarcado = botao.classList.contains('checked');

    if (estaMarcado) {
        botao.classList.remove('checked');
        botao.innerHTML = '<i class="bi bi-check-square"></i>';
    } else {
        botao.classList.add('checked');
        botao.innerHTML = '<i class="bi bi-check-square-fill"></i>';
    }
}

function transformarBotaoLike(botao) {
    var botaoDislike = botao.parentNode.nextElementSibling.querySelector('.item_lista');

    if (botao.classList.contains('checked')) {
        botao.classList.remove('checked');
        botao.innerHTML = '<i class="bi bi-hand-thumbs-up"></i>';
    } else {
        botao.classList.add('checked');
        botaoDislike.classList.remove('checked');

        botao.innerHTML = '<i class="bi bi-hand-thumbs-up-fill"></i>';
        botaoDislike.innerHTML = '<i class="bi bi-hand-thumbs-down"></i>';
    }
}

function transformarBotaoDislike(botao) {
    var botaoLike = botao.parentNode.previousElementSibling.querySelector('.item_lista');

    if (botao.classList.contains('checked')) {
        botao.classList.remove('checked');
        botao.innerHTML = '<i class="bi bi-hand-thumbs-down"></i>';
    } else {
        botao.classList.add('checked');
        botaoLike.classList.remove('checked');

        botao.innerHTML = '<i class="bi bi-hand-thumbs-down-fill"></i>';
        botaoLike.innerHTML = '<i class="bi bi-hand-thumbs-up"></i>';
    }
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

function redirecionarParaPagina() {
    // Substitua 'outra_pagina.html' pelo nome do seu arquivo HTML de destino
    window.location.href = 'login.html';
}

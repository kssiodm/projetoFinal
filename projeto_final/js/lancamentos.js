document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
    const searchQuery = document.getElementById('movieTitle').value;
    if (searchQuery.trim() !== '') {window.onload = function() {
    var btnHome = document.getElementById("btn-home");
    btnHome.classList.add("nav-link-active");
};
        window.location.href = 'pesquisa.html?search=' + encodeURIComponent(searchQuery);
    }
});

document.getElementById('movieTitle').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        document.getElementById('searchForm').submit();
    }
});

$(document).ready(function () {
    const apiKey = 'e684ab1ca25ce9861ccd1c17032e82e6';

    const apiUrl = 'https://api.themoviedb.org/3';

    const latestMoviesEndpoint = '/movie/latest';
    const onTheAirTVShowsEndpoint = '/tv/on_the_air';

    const resultsContainer = $('#results');

    const language = 'pt-BR';

    function getLatestMedia() {
        $.ajax({
            url: apiUrl + latestMoviesEndpoint,
            type: 'GET',
            data: {
                api_key: apiKey,
                language: language
            },
            success: function (moviesData) {
                $.ajax({
                    url: apiUrl + onTheAirTVShowsEndpoint,
                    type: 'GET',
                    data: {
                        api_key: apiKey,
                        language: language
                    },
                    success: function (tvShowsData) {
                        displayMedia([moviesData, ...tvShowsData.results]);
                    },
                    error: function (tvShowsError) {
                        console.error('Erro ao obter as séries:', tvShowsError);
                    }
                });
            },
            error: function (moviesError) {
                console.error('Erro ao obter os filmes:', moviesError);
            }
        });
    }

    function displayMedia(media) {
        resultsContainer.empty();
    
        const chunkedMedia = chunkArray(media, 3);
    
        chunkedMedia.forEach(function (mediaGroup) {
            const row = $('<div class="row">');
    
            mediaGroup.forEach(function (item) {
                const col = $('<div class="col-md-4">');
                const mediaCard = $('<div class="media-card">');
    
                // Verificar se a URL do cartaz está disponível antes de criar a tag de imagem
                if (item.poster_path) {
                    const mediaImage = $('<img>').attr('src', 'https://image.tmdb.org/t/p/w500' + item.poster_path);
    
                    mediaImage.click(function () {
                        mediaImage.attr('data-id', item.id);
                        openMediaModal(item);
                    });
    
                    mediaCard.append(mediaImage);
                    col.append(mediaCard);
                    row.append(col);
                }
            });
    
            resultsContainer.append(row);
        });
    }

    
    function chunkArray(array, size) {
        const chunkedArr = [];
        for (let i = 0; i < array.length; i += size) {
            chunkedArr.push(array.slice(i, i + size));
        }
        return chunkedArr;
    }

    getLatestMedia();
});

function openMediaModal(item) {
    const modalTitle = $('#mediaModalLabel');
    const modalBody = $('#mediaModalBody');

    modalTitle.text(item.title || item.name);

    const modalContent = `
        <div class="row">
            <div class="col-md-4">
                <img src="https://image.tmdb.org/t/p/w500${item.poster_path}" alt="${item.title || item.name} Poster" class="d-block w-100 rounded">
            </div>
            <div class="col-md-8">
                <h2>${item.title || item.name}</h2>
                <p>${item.overview}</p>
                <!-- Adicione mais informações conforme necessário -->
            </div>
        </div>
    `;

    modalBody.html(modalContent);

    $('#mediaModal').modal('show');
}
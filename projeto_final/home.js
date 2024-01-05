window.onload = function() {
    var btnHome = document.getElementById("btn-home");
    btnHome.classList.add("nav-link-active");
};

$(document).ready(function () {
    const apiKey = 'e684ab1ca25ce9861ccd1c17032e82e6';

    const apiUrl = 'https://api.themoviedb.org/3';

    const topRatedMoviesEndpoint = '/movie/top_rated';
    const topRatedTVShowsEndpoint = '/tv/top_rated';

    const resultsContainer = $('#results');

    const language = 'pt-BR';

    function getTopRatedMedia() {
        $.ajax({
            url: apiUrl + topRatedMoviesEndpoint,
            type: 'GET',
            data: {
                api_key: apiKey,
                language: language
            },
            success: function (moviesData) {
                $.ajax({
                    url: apiUrl + topRatedTVShowsEndpoint,
                    type: 'GET',
                    data: {
                        api_key: apiKey,
                        language: language
                    },
                    success: function (tvShowsData) {
                        displayMedia([...moviesData.results, ...tvShowsData.results]);
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
                const mediaImage = $('<img>').attr('src', 'https://image.tmdb.org/t/p/w500' + item.poster_path);

                mediaImage.click(function () {
                    alert('Informações detalhadas!');
                });

                mediaCard.append(mediaImage);
                col.append(mediaCard);
                row.append(col);
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

    getTopRatedMedia();
});
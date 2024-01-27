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

document.addEventListener('DOMContentLoaded', function () {
    // Recuperar informações do sessionStorage
    const movieInfoString = sessionStorage.getItem('movieInfo');
    const resultElement = document.getElementById('titulo');

    if (movieInfoString) {
        const movieInfo = JSON.parse(movieInfoString);
        // Exibir informações na página
        resultElement.innerHTML = `
            <div class="row">
                <div class="col-md-4">
                    <img src="${movieInfo.imageUrl}" alt="${movieInfo.title} Poster" class="d-block w-100 rounded">
                </div>
                <div class="col-md-8">
                    <h2>${movieInfo.title}</h2>
                    <p>${movieInfo.overview}</p>
                </div>
            </div>
        `;
    } else {
        console.error('Informações do filme não encontradas no sessionStorage.');
    }
});


document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
    const searchQuery = document.getElementById('movieTitle').value;
    if (searchQuery.trim() !== '') {window.onload = function() {
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
    // Renderizar a lista
    const lista = obterLista();
    renderizarLista(lista, 'listaContainer');

    // Renderizar a lista "Assistir Mais Tarde"
    const assistirMaisTarde = obterAssistirMaisTarde();
    renderizarLista(assistirMaisTarde, 'assistirMaisTardeContainer');
});

function obterLista() {
    const lista = JSON.parse(localStorage.getItem('lista')) || [];
    return lista;
}

// Função para obter a lista "Assistir Mais Tarde"
function obterAssistirMaisTarde() {
    const assistirMaisTarde = JSON.parse(localStorage.getItem('assistirMaisTarde')) || [];
    return assistirMaisTarde;
}

// Função para renderizar a lista na página
// Chamadas para renderizar as listas na página
document.addEventListener('DOMContentLoaded', function () {
    // Renderizar a lista
    const lista = obterLista();
    renderizarLista(lista, 'listaContainer');

    // Renderizar a lista "Assistir Mais Tarde"
    const assistirMaisTarde = obterAssistirMaisTarde();
    renderizarLista(assistirMaisTarde, 'assistirMaisTardeContainer');
});

console.log(localStorage.getItem('lista'));
console.log(localStorage.getItem('assistirMaisTarde'));

renderizarLista(['Item 1', 'Item 2'], 'listaContainer');
renderizarLista(['Assistir Mais Tarde 1', 'Assistir Mais Tarde 2'], 'assistirMaisTardeContainer');

// function renderizarLista(lista, containerId) {
//     const container = document.getElementById(containerId);

//     if (!container) {
//         console.error(`Elemento com o ID '${containerId}' não encontrado.`);
//         return;
//     }

//     container.innerHTML = ''; // Limpar conteúdo anterior, se houver

//     if (lista.length === 0) {
//         container.innerHTML = '<p>Nenhum item na lista.</p>';
//         return;
//     }

//     container.innerHTML = lista.map(item => `<li>${item}</li>`).join('');
// }

// function renderizarLista(lista, containerId) {
//     const container = document.getElementById(containerId);

//     if (!container) {
//         console.error(`Elemento com o ID '${containerId}' não encontrado.`);
//         return;
//     }

//     container.innerHTML = ''; // Limpar conteúdo anterior, se houver

//     if (lista.length === 0) {
//         container.innerHTML = '<p>Nenhum item na lista.</p>';
//         return;
//     }

//     // Criar elementos HTML para cada item na lista
//     lista.forEach(item => {
//         const listItem = document.createElement('li');

//         // Verificar se o item tem informações sobre o poster (por exemplo, poster_path)
//         if (item && item.poster_path) {
//             // Criar uma imagem para o poster
//             const posterImg = document.createElement('img');
//             posterImg.src = `https://image.tmdb.org/t/p/w500${item.poster_path}`; // URL do poster da TMDB API
//             posterImg.alt = item.title || item.name || 'Poster'; // Usar o título ou nome como texto alternativo, ou 'Poster' se não houver
//             listItem.appendChild(posterImg);
//         }

//         // Adicionar outros detalhes do item (por exemplo, título) se necessário
//         // ...

//         // Adicionar o item à lista no container
//         container.appendChild(listItem);
//     });
// }

// function renderizarLista(lista, containerId) {
//     const container = document.getElementById(containerId);

//     if (!container) {
//         console.error(`Elemento com o ID '${containerId}' não encontrado.`);
//         return;
//     }

//     container.innerHTML = ''; // Limpar conteúdo anterior, se houver

//     if (lista.length === 0) {
//         container.innerHTML = '<p>Nenhum item na lista.</p>';
//         return;
//     }

//     const row = document.createElement('div');
//     row.classList.add('row');

//     container.appendChild(row);

//     lista.forEach(item => {
//         const col = document.createElement('div');
//         col.classList.add('col-md-4', 'mb-4'); // 'col-md-4' para ocupar 3 colunas em telas médias, 'mb-4' para margem inferior

//         if (item && item.poster_path) {
//             const link = document.createElement('a');
//             link.href = `https://image.tmdb.org/t/p/w500${item.poster_path}`; // URL do poster da TMDB API
//             link.target = '_blank'; // Abrir em uma nova guia/janela

//             const posterImg = document.createElement('img');
//             posterImg.src = `https://image.tmdb.org/t/p/w500${item.poster_path}`; // URL do poster da TMDB API
//             posterImg.alt = item.title || item.name || 'Poster'; // Usar o título ou nome como texto alternativo, ou 'Poster' se não houver

//             link.appendChild(posterImg);

//             col.appendChild(link);
//         }

//             row.appendChild(col);
//     });
// }





function renderizarLista(lista, containerId) {
    const container = document.getElementById(containerId);

    if (!container) {
        console.error(`Elemento com o ID '${containerId}' não encontrado.`);
        return;
    }

    container.innerHTML = ''; // Limpar conteúdo anterior, se houver

    if (lista.length === 0) {
        container.innerHTML = '<p>Nenhum item na lista.</p>';
        return;
    }

    lista.forEach(item => {
        if (item && item.poster_path) {
            const listItem = document.createElement('li'); // Criar um elemento de lista ao invés de div
            listItem.className = 'list-inline-item'; // Adicionar classe para exibir em linha e adicionar margem direita

            const mediaCard = document.createElement('div');
            mediaCard.className = 'media-card';

            const posterImg = document.createElement('img');
            posterImg.src = `https://image.tmdb.org/t/p/w500${item.poster_path}`; // URL do poster da TMDB API
            posterImg.alt = item.title || item.name || 'Poster'; // Usar o título ou nome como texto alternativo, ou 'Poster' se não houver

            posterImg.addEventListener('click', function () {
                const itemName = item.title || item.name;
                window.location.href = 'pesquisa.html?search=' + encodeURIComponent(itemName);
            });

            mediaCard.appendChild(posterImg);
            listItem.appendChild(mediaCard);

            container.appendChild(listItem);
        }
    });
}


// function renderizarLista(lista, containerId) {
//     const container = document.getElementById(containerId);

//     if (!container) {
//         console.error(`Elemento com o ID '${containerId}' não encontrado.`);
//         return;
//     }

//     container.innerHTML = ''; // Limpar conteúdo anterior, se houver

//     if (lista.length === 0) {
//         container.innerHTML = '<p>Nenhum item na lista.</p>';
//         return;
//     }

//     // Criar elementos HTML para cada item na lista
//     lista.forEach(item => {
//         const col = document.createElement('div');
//         col.className = 'col-md-4 mb-4'; // Adiciona a classe col-md-4 e margem inferior

//         // Verificar se o item tem informações sobre o poster (por exemplo, poster_path)
//         if (item && item.poster_path) {
//             // Criar uma imagem para o poster
//             const mediaCard = document.createElement('div');
//             mediaCard.className = 'media-card';

//             const posterImg = document.createElement('img');
//             posterImg.src = `https://image.tmdb.org/t/p/w500${item.poster_path}`; // URL do poster da TMDB API
//             posterImg.alt = item.title || item.name || 'Poster'; // Usar o título ou nome como texto alternativo, ou 'Poster' se não houver

//             // Adiciona um evento de clique na imagem
//             posterImg.addEventListener('click', function () {
//                 const itemName = item.title || item.name || 'Item sem título';
//                 window.location.href = 'pesquisa.html?search=' + encodeURIComponent(itemName);
//             });

//             mediaCard.appendChild(posterImg);
//             col.appendChild(mediaCard);
//         }

//         // Adicionar outros detalhes do item (por exemplo, título) se necessário
//         // ...

//         // Adicionar o item à lista no container
//         container.appendChild(col);
//     });
// }




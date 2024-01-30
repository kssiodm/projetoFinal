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

    container.innerHTML = lista.map(item => `<li>${item}</li>`).join('');
}


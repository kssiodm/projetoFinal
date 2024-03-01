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

function createListElement(name, description) {
    var listContainer = document.getElementById('lists-container');

    var newList = document.createElement('div');
    newList.className = 'list-item';
    newList.innerHTML = '<h3 class="list-name" onclick="openDetailedModal(\'' + name + '\', \'' + description + '\')">' + name + '</h3>';

    listContainer.appendChild(newList);
}

function openModal() {
    document.getElementById('myModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('myModal').style.display = 'none';
    document.getElementById('listForm').reset();
}     

function updateSaveButtonState() {
    var listNameInput = document.getElementById('listName');
    var saveListButton = document.getElementById('saveListButton');

    if (listNameInput && saveListButton) {
        saveListButton.disabled = listNameInput.value.trim().length === 0;
    }
}

function saveList() {
    var listNameInput = document.getElementById('listName');
    var listName = listNameInput.value.trim();

    if (listName.length > 0) {
        var listDescription = document.getElementById('listDescription').value;

        // Criar elemento de lista na página
        createListElement(listName, listDescription);

        // Limpar o formulário e fechar o modal
        document.getElementById('listForm').reset();
        $('#myModal').modal('hide');
    } else {
        // Adicione uma lógica para lidar com o caso em que o nome da lista é vazio
        
    }
}

document.addEventListener("DOMContentLoaded", function () {
    // Lista predefinida: Assistir Mais Tarde
    createListElement("Assistir Mais Tarde", "Listinha para os próximos filmes e séries a serem assistidos.");

    // Adicionar evento de input para verificar o comprimento do nome da lista
    var listNameInput = document.getElementById('listName');

    if (listNameInput) {
        listNameInput.addEventListener('input', updateSaveButtonState);
    }

    // Chamar a função inicialmente para definir o estado do botão
    updateSaveButtonState();
});

function openDetailedModal(name, description) {
    var detailedModalBody = document.getElementById('detailedModalBody');
    detailedModalBody.innerHTML = '<p><strong>Nome:</strong> ' + name + '</p>';
    
    if (description) {
        detailedModalBody.innerHTML += '<p><strong>Descrição:</strong> ' + description + '</p>';
    }
    
    // Adicione aqui o conteúdo da lista (filmes, séries, etc.)

    $('#detailedModal').modal('show');
}
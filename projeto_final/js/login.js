function validarCamposEEntrar() {
    var username = document.getElementById('username').value;
    var user_email = document.getElementById('user_email').value;
    var password = document.getElementById('password').value;

    // Verifica se todos os campos estão preenchidos
    if (username !== '' && validarEmail(user_email) && validarSenha(password)) {
        // Se todos os campos estiverem preenchidos, redirecione para a página desejada
        redirecionarParaHome();
    } else {
        // Caso contrário, exiba uma mensagem de erro ou faça outra ação desejada
        alert('Por favor, preencha todos os campos corretamente.');
    }
}

function validarCamposLoginEntrar() {
    var username = document.getElementById('username_login').value;
    var password = document.getElementById('password_login').value;

    // Verifica se todos os campos estão preenchidos
    if (username !== '' &&  validarSenha(password)) {
        // Se todos os campos estiverem preenchidos, redirecione para a página desejada
        redirecionarParaHome();
    } else {
        // Caso contrário, exiba uma mensagem de erro ou faça outra ação desejada
        alert('Por favor, preencha todos os campos corretamente.');
    }
}

function validarEmail(email) {
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return email !== '' && regex.test(email);
}

function validarSenha(senha) {
    // Verifica se a senha tem pelo menos 8 caracteres e contém pelo menos 1 caractere especial
    var regex = /^(?=.*[A-Za-z0-9])(?=.*[^A-Za-z0-9]).{8,}$/;
    return senha !== '' && regex.test(senha);
}

function redirecionarParaHome() {
    console.log('Redirecionando para a página inicial...');
    window.location.href = 'index.html';
}
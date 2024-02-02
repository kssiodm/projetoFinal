function validarCamposEEntrar() {
    var username = document.getElementById('username').value;
    var user_email = document.getElementById('user_email').value;
    var password = document.getElementById('password').value;
    var mensagemElement = document.getElementById('mensagemLogin');

    if (username !== '' && validarEmail(user_email) && validarSenha(password)) {
        redirecionarParaHome();
    } else {
        mensagemElement.innerHTML = 'Por favor, preencha todos os campos corretamente.';
        mensagemElement.style.display = 'block';
    }
}

function validarCamposLoginEntrar() {
    var username = document.getElementById('username_login').value;
    var password = document.getElementById('password_login').value;
    var mensagemElement = document.getElementById('mensagemLogin');

    if (username !== '' &&  validarSenha(password)) {
        redirecionarParaHome();
    } else {
        mensagemElement.innerHTML = 'Por favor, preencha todos os campos corretamente.';
        mensagemElement.style.display = 'block';
    }
}

function validarEmail(email) {
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return email !== '' && regex.test(email);
}

function validarSenha(senha) {
    var regex = /^(?=.*[A-Za-z0-9])(?=.*[^A-Za-z0-9]).{8,}$/;
    return senha !== '' && regex.test(senha);
}

function redirecionarParaHome() {
    console.log('Redirecionando para a página inicial...');
    window.location.href = 'index.html';
}
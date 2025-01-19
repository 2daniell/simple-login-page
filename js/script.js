document.addEventListener('DOMContentLoaded', () => {

    document.querySelectorAll('.switcher').forEach((element ) => {
        element.addEventListener('click', handleForm);
    })

    document.querySelector("#form-register").addEventListener('submit', handleRegister);
    document.querySelector("#form-login").addEventListener('submit', handleLogin);

})

const handleForm = () => {
    
    const isMobile = window.matchMedia('(max-width: 1024px)').matches;

    const forms = document.querySelectorAll('form');
    const formLogin = forms[0];
    const formRegister = forms[1];

    if (isMobile) {

        const main = document.querySelector('main');
        const attribute = main.getAttribute('data-state');

        if (attribute === 'up') {
            main.setAttribute('data-state', "middle");
            setTimeout(() => {
                main.setAttribute('data-state', "down");
            }, 700)
        } else if (attribute === 'down') {
            main.setAttribute('data-state', "middle-up");
            setTimeout(() => {
                main.setAttribute('data-state', "up");
            }, 700)
        }

    } else {
        if (formLogin.classList.contains('active')) {
            formLogin.classList.remove('active');
            formRegister.classList.add('active');
        } else {
            formLogin.classList.add('active');
            formRegister.classList.remove('active');
        }
    }
}

const handleRegister = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const { email, password, confirm } = Object.fromEntries(formData);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        sendMessage("O email informado é invalido")
        return
    }

    if (password !== confirm) {
        sendMessage("As senhas nao conferem")
        return;
    }

    if (password.length < 4) {
        sendMessage("A senha precisa ter pelo menos 4 caracteres")
        return
    }

    sendMessage("Cadastro realizado com sucesso", 'green');

}

const handleLogin = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const { email, password } = Object.fromEntries(formData);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        sendMessage("O email informado é invalido")
        return
    }

    if (password.length < 4) {
        sendMessage("A senha está incorreta")
        return
    }

    sendMessage("Login realizado com sucesso", 'green');
}

const sendMessage = (message, color = 'red') => {
    const messageElement = document.querySelector('#message');

    messageElement.textContent = message;
    messageElement.style.color = color;
    messageElement.style.display = 'block';

    setTimeout(() => {
        messageElement.style.display = 'none';
    }, 3000)
}
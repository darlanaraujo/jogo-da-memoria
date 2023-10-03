// Elementos Tela Login
const inputNomeJogador = document.querySelector('#inputNomeJogador');
const btnPlay = document.querySelector('#btnPlay');
const telaLogin = document.querySelector('#telaLogin');

// Elementos Tela Principal
const telaPrincipal = document.querySelector('#telaPrincipal');
const wrapperCards = document.querySelector('#wrapperCards');

// Variáveis globais
let nomeJogador;
let primeiraCarta = '';
let segundaCarta = '';

// Array
const listaPersonagens = [
    'beth',
    'jerry',
    'jessica',
    'meeseeks',
    'morty',
    'pessoa-passaro',
    'pickle-rick',
    'rick',
    'scroopy',
    'summer'
]

// Funções Tela Login
inputNomeJogador.addEventListener('input', ({ target }) => {

    if(target.value.length >= 3) {
        btnPlay.removeAttribute('disabled');
        
        btnPlay.addEventListener('click', () => {
            nomeJogador = target.value;

            telaLogin.classList.remove('active');
            telaPrincipal.classList.add('active');

        });
    } else {
        btnPlay.setAttribute('disabled', '');
    }
});

// Banco de dados
const bancoDados = (jogador, tempo) => {
    let banco = getBanco();

    let dados = {nomeJogador: jogador, tempoJogo: tempo}

    banco.unshift(dados);

    setBanco(JSON.stringify(banco));

};


const setBanco = (banco) => {
    localStorage.setItem('bd-jogo-memoria', banco);
};

const getBanco = () => {
    return JSON.parse(localStorage.getItem('bd-jogo-memoria')) ?? [];
};

// Funções Tela Principal
const criarElemento = (tag, classe) => {

    const elemento = document.createElement(tag);
    elemento.className = classe;

    return elemento;
    
};

const checkFimJogo = () => {
    const cartasReveladas = document.querySelectorAll('.revelada');

    if(cartasReveladas.length === 20) {
        alert('Parabéns! Final do jogo');
    }
};

const checkCartas = () => {

    const primeiroPersonagem = primeiraCarta.getAttribute('data-personagem');
    const segundoPersonagem = segundaCarta.getAttribute('data-personagem');

    if(primeiroPersonagem === segundoPersonagem) {
        setTimeout(() => {
            primeiraCarta.firstChild.classList.add('revelada');
            segundaCarta.firstChild.classList.add('revelada');
            primeiraCarta = '';
            segundaCarta = '';
            
            checkFimJogo();
        }, 500);


    } else {
        setTimeout(() => {
            primeiraCarta.classList.remove('mostrar-carta');
            segundaCarta.classList.remove('mostrar-carta');
            primeiraCarta = '';
            segundaCarta = '';
        }, 1000)
    }
};

const mostrarCarta = ({target}) => {

    if(target.parentNode.className.includes('mostrar-carta')) {
        return; // <- finaliza a função;
    }

    if(primeiraCarta === '') {
        target.parentNode.classList.add('mostrar-carta'); // <- O target pega o elemento clicado. O parentNode pega o elemento pai do elemento clicado.
        
        primeiraCarta = target.parentNode;
    } else if(segundaCarta === '') {
        target.parentNode.classList.add('mostrar-carta'); // <- O target pega o elemento clicado. O parentNode pega o elemento pai do elemento clicado.
        
        segundaCarta = target.parentNode;

        checkCartas();
    }


};

const criarCarta = (personagem) => {
    const card = criarElemento('div', 'card');
    const cartaPersonagem = criarElemento('span', 'carta personagem');
    const cartaFundo = criarElemento('span', 'carta fundo');

    cartaPersonagem.style.backgroundImage = `url('../img/${personagem}.png')`

    card.appendChild(cartaPersonagem);
    card.appendChild(cartaFundo);

    card.addEventListener('click', mostrarCarta);

    card.setAttribute('data-personagem', personagem);

    return card;
};

const carregarJogo = () => {

    const duplicarCartas = [...listaPersonagens, ...listaPersonagens].sort(() => Math.random() - 0.5);

    duplicarCartas.forEach((personagem) => {
        const carta = criarCarta(personagem);

        wrapperCards.appendChild(carta);
    });
};

carregarJogo();
// Elementos Tela Login
const inputNomeJogador = document.querySelector('#inputNomeJogador');
const btnPlay = document.querySelector('#btnPlay');
const telaLogin = document.querySelector('#telaLogin');

// Elementos Tela Principal
const telaPrincipal = document.querySelector('#telaPrincipal');
const wrapperCards = document.querySelector('#wrapperCards');
const txtJogador = document.querySelector('#txtJogador');
const txtTempo = document.querySelector('#txtTempo');

// Elementos Tela Ranking
const telaRanking = document.querySelector('#telaRanking');
const elementoTabela = document.querySelector('#elementoTabela');
const btnReinicio = document.querySelector('#btnReinicio');

// Variáveis globais
let nomeJogador;
let tempoJogo;
let primeiraCarta = '';
let segundaCarta = '';
let tempo;

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

    if(target.value.length > 2) {
        btnPlay.removeAttribute('disabled');
        nomeJogador = target.value;

    } else {
        btnPlay.setAttribute('disabled', '');
    }
});

btnPlay.addEventListener('click', () => {
    
    telaLogin.classList.remove('active');
    telaPrincipal.classList.add('active');

    inicio();

});

document.addEventListener('keypress', ({key}) => {

    if(! btnPlay.hasAttribute('disabled')) {

        if(key == 'Enter') {
            telaLogin.classList.remove('active');
            telaPrincipal.classList.add('active');
    
            inicio();
        }
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
        clearInterval(tempo);
        tempoJogo = txtTempo.innerHTML;

        bancoDados(nomeJogador, tempoJogo);
        
        setTimeout(() => {
       
            telaRanking.classList.add('active');

            ranking();

        }, 1500);

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

    cartaPersonagem.style.backgroundImage = `url(./img/${personagem}.png)`;

    card.appendChild(cartaPersonagem);
    card.appendChild(cartaFundo);

    card.addEventListener('click', mostrarCarta);

    card.setAttribute('data-personagem', personagem);

    return card;
};

const time = () => {
    let cont = 0;
    tempo = setInterval(() => {
        cont ++;
        txtTempo.innerHTML = cont;
    }, 1000);

    return tempo;
};

const carregarJogo = () => {

    txtJogador.innerHTML = nomeJogador;
    time();

    const duplicarCartas = [...listaPersonagens, ...listaPersonagens].sort(() => Math.random() - 0.5);

    duplicarCartas.forEach((personagem) => {
        const carta = criarCarta(personagem);

        wrapperCards.appendChild(carta);
    });
};

// Funções da tela de ranking
const ranking = () => {
    const classificacao = getBanco().sort(colocacao);

    classificacao.forEach((item, index) => {
        let posicao = index +1;
        let nome = item.nomeJogador;
        let tempo = item.tempoJogo;

        criarTabela(posicao, nome, tempo);
    });
};

const criarTabela = (posicao, nome, tempo) => {
    const elementoHTML = document.createElement('tr');
    elementoHTML.classList.add('linha');

    elementoHTML.innerHTML = `
        <td class="coluna">${posicao}</td>
        <td class="coluna">${nome}</td>
        <td class="coluna">${tempo}</td>
    `;

    elementoTabela.appendChild(elementoHTML);

};

const colocacao = (a, b) => {
    if(Number(a.tempoJogo) > Number(b.tempoJogo)) {
        return 1;
    } else if(Number(a.tempoJogo) < Number(b.tempoJogo)) {
        return -1;
    } else {
        return 0;
    }
};

btnReinicio.addEventListener('click', () => {
    location.reload(true);
});

// Inicio da partida
const inicio = () => {
    carregarJogo();
}

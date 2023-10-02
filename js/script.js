const inputNomeJogador = document.querySelector('#inputNomeJogador');
const btnPlay = document.querySelector('#btnPlay');
const telaLogin = document.querySelector('#telaLogin');
const telaPrincipal = document.querySelector('#telaPrincipal');

// Variáveis globais
let nomeJogador;

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
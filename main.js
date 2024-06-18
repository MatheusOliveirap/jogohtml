const telaBoasVindas = document.getElementById('tela-de-boas-vindas');
const telaJogo = document.getElementById('tela-do-jogo');
const telaResultado = document.getElementById('tela-de-resultado');

const formularioBoasVindas = document.getElementById('formulario-de-boas-vindas');
const entradaNomeUsuario = document.getElementById('nome-usuario');
const entradaEmailUsuario = document.getElementById('nome-usuario-email'); // Corrigido para o ID correto
const mensagemBoasVindas = document.getElementById('mensagem-de-boas-vindas');

const entradaAdivinhacao = document.getElementById('entrada-adivinhacao');
const botaoAdivinhar = document.getElementById('botao-adivinhar');
const mensagemFeedback = document.getElementById('mensagem-de-feedback');

const mensagemResultado = document.getElementById('mensagem-de-resultado');
const numeroCorretoDisplay = document.getElementById('numero-correto');
const mensagemPontuacao = document.getElementById('mensagem-de-pontuacao');
const botaoJogarNovamente = document.getElementById('botao-jogar-novamente');

let numeroCorreto;
let tentativas;
let nomeUsuario;

formularioBoasVindas.addEventListener('submit', function (event) {
    event.preventDefault();
    nomeUsuario = entradaNomeUsuario.value.trim(); // Ajustado para o ID correto
    const email = entradaEmailUsuario.value.trim(); // Ajustado para o ID correto
    
    if (nomeUsuario && email) {
        const formData = new FormData(formularioBoasVindas);
        formData.append('nome-usuario', nomeUsuario); // Ajustado para o name correto
        formData.append('nome-usuario-email', email); // Ajustado para o name correto
        
        fetch(formularioBoasVindas.action, {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao enviar dados');
            }
            iniciarJogo();
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Erro ao enviar dados. Por favor, tente novamente.');
        });
    } else {
        alert('Por favor, preencha seu nome e email.');
    }
});

botaoAdivinhar.addEventListener('click', () => {
    const palpite = parseInt(entradaAdivinhacao.value);
    if (isNaN(palpite) || palpite < 1 || palpite > 100) {
        mensagemFeedback.textContent = 'Por favor, insira um número válido entre 1 e 100.';
        return;
    }
    tentativas++;
    if (palpite === numeroCorreto) {
        finalizarJogo();
    } else if (palpite < numeroCorreto) {
        mensagemFeedback.textContent = 'O número correto é maior.';
    } else {
        mensagemFeedback.textContent = 'O número correto é menor.';
    }
});

botaoJogarNovamente.addEventListener('click', iniciarJogo);

function iniciarJogo() {
    numeroCorreto = Math.floor(Math.random() * 100) + 1;
    tentativas = 0;
    mensagemBoasVindas.textContent = `Bem-vindo, ${nomeUsuario}!`;
    mensagemFeedback.textContent = '';
    entradaAdivinhacao.value = '';
    trocarTela(telaJogo);
}

function finalizarJogo() {
    mensagemResultado.textContent = `Parabéns, ${nomeUsuario}! Você acertou o número!`;
    numeroCorretoDisplay.textContent = `O número correto era: ${numeroCorreto}`;
    mensagemPontuacao.textContent = `Você fez ${tentativas} tentativa(s).`;
    trocarTela(telaResultado);
}

function trocarTela(tela) {
    telaBoasVindas.classList.remove('ativa');
    telaJogo.classList.remove('ativa');
    telaResultado.classList.remove('ativa');
    tela.classList.add('ativa');
}

trocarTela(telaBoasVindas);

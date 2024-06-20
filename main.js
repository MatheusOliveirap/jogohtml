// Seleciona os elementos das telas e campos do HTML
const telaBoasVindas = document.getElementById('tela-de-boas-vindas');
const telaJogo = document.getElementById('tela-do-jogo');
const telaResultado = document.getElementById('tela-de-resultado');

const formularioBoasVindas = document.getElementById('formulario-de-boas-vindas');
const entradaNomeUsuario = document.getElementById('nome-usuario');
const entradaEmailUsuario = document.getElementById('nome-usuario-email');
const mensagemBoasVindas = document.getElementById('mensagem-de-boas-vindas');

const entradaAdivinhacao = document.getElementById('entrada-adivinhacao');
const botaoAdivinhar = document.getElementById('botao-adivinhar');
const mensagemFeedback = document.getElementById('mensagem-de-feedback');

const mensagemResultado = document.getElementById('mensagem-de-resultado');
const numeroCorretoDisplay = document.getElementById('numero-correto');
const mensagemPontuacao = document.getElementById('mensagem-de-pontuacao');
const botaoJogarNovamente = document.getElementById('botao-jogar-novamente');

let numeroCorreto; // Variável para armazenar o número correto a ser adivinhado
let tentativas; // Variável para contar o número de tentativas do usuário
let nomeUsuario; // Variável para armazenar o nome do usuário

// Coloca o foco no campo de nome ao carregar a página
window.onload = () => entradaNomeUsuario.focus();

// Adiciona um ouvinte de evento para o formulário de boas-vindas
formularioBoasVindas.addEventListener('submit', function (event) {
    event.preventDefault(); // Impede o envio padrão do formulário
    nomeUsuario = entradaNomeUsuario.value.trim(); // Obtém e limpa o valor do campo de nome
    const email = entradaEmailUsuario.value.trim(); // Obtém e limpa o valor do campo de email

    // Verifica se o nome e o email não estão vazios
    if (nomeUsuario && email) {
        const formData = new FormData(formularioBoasVindas); // Cria um objeto FormData com os dados do formulário
        formData.append('nome-usuario', nomeUsuario); // Adiciona o nome do usuário ao FormData
        formData.append('nome-usuario-email', email); // Adiciona o email do usuário ao FormData

        // Envia os dados do formulário usando fetch
        fetch(formularioBoasVindas.action, {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao enviar dados'); // Lança um erro se a resposta não for bem-sucedida
            }
            iniciarJogo(); // Inicia o jogo se os dados forem enviados com sucesso
        })
        .catch(error => {
            console.error('Erro:', error); // Exibe o erro no console
            alert('Erro ao enviar dados. Por favor, tente novamente.'); // Alerta o usuário sobre o erro
        });
    } else {
        alert('Por favor, preencha seu nome e email.'); // Alerta o usuário para preencher os campos obrigatórios
    }
});

// Envia o formulário ao pressionar Enter
formularioBoasVindas.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        formularioBoasVindas.dispatchEvent(new Event('submit')); // Dispara o evento de envio do formulário
    }
});

// Adiciona um ouvinte de evento para o botão de adivinhar
botaoAdivinhar.addEventListener('click', () => {
    const palpite = parseInt(entradaAdivinhacao.value); // Obtém e converte o valor do palpite para número
    // Verifica se o palpite é válido
    if (isNaN(palpite) || palpite < 1 || palpite > 100) {
        mensagemFeedback.textContent = 'Por favor, insira um número válido entre 1 e 100.';
        mensagemFeedback.style.color = 'blue'; // Define a cor do feedback para azul
        return;
    }
    tentativas++; // Incrementa o número de tentativas
    if (palpite === numeroCorreto) {
        finalizarJogo(); // Finaliza o jogo se o palpite estiver correto
    } else {
        const diferenca = Math.abs(palpite - numeroCorreto); // Calcula a diferença entre o palpite e o número correto
        if (diferenca <= 10) {
            mensagemFeedback.style.color = 'red'; // Define a cor do feedback para vermelho se a diferença for menor ou igual a 10
        } else {
            mensagemFeedback.style.color = 'blue'; // Define a cor do feedback para azul se a diferença for maior que 10
        }
        // Exibe uma mensagem de feedback dependendo se o palpite é menor ou maior que o número correto
        if (palpite < numeroCorreto) {
            mensagemFeedback.textContent = 'O número correto é maior.';
        } else {
            mensagemFeedback.textContent = 'O número correto é menor.';
        }
    }
    entradaAdivinhacao.value = ''; // Limpa o campo de palpite
    entradaAdivinhacao.focus(); // Coloca o foco de volta no campo de palpite
});

// Adiciona um ouvinte de evento para o botão de jogar novamente
botaoJogarNovamente.addEventListener('click', iniciarJogo);

// Função para iniciar o jogo
function iniciarJogo() {
    numeroCorreto = Math.floor(Math.random() * 100) + 1; // Gera um número aleatório entre 1 e 100
    tentativas = 0; // Reseta o número de tentativas
    mensagemBoasVindas.textContent = `Bem-vindo, ${nomeUsuario}!`; // Exibe uma mensagem de boas-vindas com o nome do usuário
    mensagemFeedback.textContent = ''; // Limpa a mensagem de feedback
    entradaAdivinhacao.value = ''; // Limpa o campo de palpite
    trocarTela(telaJogo); // Troca para a tela do jogo
    entradaAdivinhacao.focus(); // Coloca o foco no campo de palpite
}

// Função para finalizar o jogo
function finalizarJogo() {
    mensagemResultado.textContent = `Parabéns, ${nomeUsuario}! Você acertou o número!`; // Exibe uma mensagem de parabéns
    numeroCorretoDisplay.textContent = `O número correto era: ${numeroCorreto}`; // Exibe o número correto
    mensagemPontuacao.textContent = `Você fez ${tentativas} tentativas.`; // Exibe o número de tentativas
    trocarTela(telaResultado); // Troca para a tela de resultado
}

// Função para trocar a tela ativa
function trocarTela(tela) {
    telaBoasVindas.classList.remove('ativa'); // Remove a classe ativa da tela de boas-vindas
    telaJogo.classList.remove('ativa'); // Remove a classe ativa da tela do jogo
    telaResultado.classList.remove('ativa'); // Remove a classe ativa da tela de resultado
    tela.classList.add('ativa'); // Adiciona a classe ativa à tela passada como argumento
}

// Inicia exibindo a tela de boas-vindas
trocarTela(telaBoasVindas);

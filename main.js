// Seleciona o elemento que exibe o tamanho da senha no HTML
const numeroSenha = document.querySelector('.parametro-senha__texto');

// Define o tamanho inicial da senha como 12 caracteres
let tamanhoSenha = 12;
numeroSenha.textContent = tamanhoSenha;

// Definição dos conjuntos de caracteres possíveis para a senha
const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVXYWZ';
const letrasMinusculas = 'abcdefghijklmnopqrstuvxywz';
const numeros = '0123456789';
const simbolos = '!@%*?';

// Seleciona todos os botões de aumento e diminuição do tamanho da senha
const botoes = document.querySelectorAll('.parametro-senha__botao');

// Seleciona o campo de input onde a senha gerada será exibida
const campoSenha = document.querySelector('#campo-senha');

// Seleciona todas as checkboxes que permitem a personalização da senha
const checkbox = document.querySelectorAll('.checkbox');

// Seleciona o elemento que indica a força da senha
const forcaSenha = document.querySelector('.forca');

// Define as funções de clique para os botões de aumentar e diminuir o tamanho da senha
botoes[0].onclick = diminuiTamanho;
botoes[1].onclick = aumentaTamanho;

/**
 * Função para diminuir o tamanho da senha
 * Esta função é chamada quando o botão "-" é clicado.
 * Ela decrementa o tamanho da senha até um mínimo de 1 caractere.
 */
function diminuiTamanho() {
    if (tamanhoSenha > 1) {
        // Decrementa o tamanho da senha em 1
        tamanhoSenha--;
    }
    // Atualiza o texto que exibe o tamanho da senha
    numeroSenha.textContent = tamanhoSenha;
    // Gera uma nova senha com o tamanho atualizado
    geraSenha();
}

/**
 * Função para aumentar o tamanho da senha
 * Esta função é chamada quando o botão "+" é clicado.
 * Ela incrementa o tamanho da senha até um máximo de 20 caracteres.
 */
function aumentaTamanho() {
    if (tamanhoSenha < 20) {
        // Incrementa o tamanho da senha em 1
        tamanhoSenha++;
    }
    // Atualiza o texto que exibe o tamanho da senha
    numeroSenha.textContent = tamanhoSenha;
    // Gera uma nova senha com o tamanho atualizado
    geraSenha();
}

// Adiciona o evento de clique em todas as checkboxes para gerar a senha quando forem alteradas
for (let i = 0; i < checkbox.length; i++) {
    checkbox[i].onclick = geraSenha;
}

// Gera a senha inicial ao carregar a página
geraSenha();

/**
 * Função que gera a senha com base nos parâmetros selecionados
 * Esta função cria um alfabeto com base nas opções selecionadas
 * e gera uma senha aleatória do tamanho especificado.
 */
function geraSenha() {
    let alfabeto = '';
    
    // Adiciona letras maiúsculas ao alfabeto se a checkbox correspondente estiver marcada
    if (checkbox[0].checked) {
        alfabeto += letrasMaiusculas;
    }
    
    // Adiciona letras minúsculas ao alfabeto se a checkbox correspondente estiver marcada
    if (checkbox[1].checked) {
        alfabeto += letrasMinusculas;
    }
    
    // Adiciona números ao alfabeto se a checkbox correspondente estiver marcada
    if (checkbox[2].checked) {
        alfabeto += numeros;
    }
    
    // Adiciona símbolos ao alfabeto se a checkbox correspondente estiver marcada
    if (checkbox[3].checked) {
        alfabeto += simbolos;
    }
    
    let senha = '';
    
    // Gera uma senha aleatória com o tamanho especificado
    for (let i = 0; i < tamanhoSenha; i++) {
        // Gera um índice aleatório para selecionar um caractere do alfabeto
        let numeroAleatorio = Math.random() * alfabeto.length;
        numeroAleatorio = Math.floor(numeroAleatorio);
        // Adiciona o caractere selecionado à senha
        senha += alfabeto[numeroAleatorio];
    }
    
    // Exibe a senha gerada no campo de input
    campoSenha.value = senha;
    
    // Classifica a força da senha gerada com base na entropia
    classificaSenha(alfabeto.length);
}

/**
 * Função que classifica a força da senha com base na entropia
 * A entropia é uma medida de quão difícil é adivinhar a senha.
 * Quanto maior a entropia, mais forte é a senha.
 * @param {number} tamanhoAlfabeto - O tamanho do alfabeto usado para gerar a senha
 */
function classificaSenha(tamanhoAlfabeto) {
    // Calcula a entropia da senha
    let entropia = tamanhoSenha * Math.log2(tamanhoAlfabeto);
    console.log(entropia);
    
    // Remove classes de força anteriores
    forcaSenha.classList.remove('fraca', 'media', 'forte');
    
    // Adiciona a classe apropriada com base na entropia calculada
    if (entropia > 57) {
        // Senha forte
        forcaSenha.classList.add('forte');
    } else if (entropia > 35 && entropia <= 57) {
        // Senha média
        forcaSenha.classList.add('media');
    } else {
        // Senha fraca
        forcaSenha.classList.add('fraca');
    }
    
    // Exibe a estimativa de tempo para descobrir a senha
    const valorEntropia = document.querySelector('.entropia');
    // Calcula quantos dias um computador levaria para descobrir a senha com base na entropia
    valorEntropia.textContent = `Um computador pode levar até ${Math.floor(2 ** entropia / (100e6 * 60 * 60 * 24))} dias para descobrir essa senha.`;
}

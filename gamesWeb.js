
var myGamePiece;

function startGame() {
    myGamePiece = new component(30, 50, "imagens/navealiada.jpg", 285, 530); // Nave fixa no centro inferior do canvas
    myGameArea.start();
}

var myGameArea = {
    canvas: document.createElement("canvas"), // Cria um novo elemento canvas
    start: function() {
        this.canvas.width = 600;
        this.canvas.height = 600;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]); // Insere o canvas no corpo do documento HTML
        this.interval = setInterval(updateGameArea, 20); // Inicia um intervalo para atualizar a área de jogo a cada 20 milissegundos
    },
    clear: function() { // Método para limpar o canvas
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, imageSrc, x, y) {
    this.width = width; // Largura do componente
    this.height = height; // Altura do componente
    this.x = x; // Posição x do componente
    this.y = y; // Posição y do componente
    this.image = new Image(); // Cria um novo objeto Image para representar a imagem do componente
    this.image.src = imageSrc; // Define o caminho da imagem do componente
    this.update = function() { // Método para atualizar e desenhar o componente
        ctx = myGameArea.context; // Obtém o contexto 2D do canvas
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height); // Desenha a imagem do componente no canvas
    }
}

function updateGameArea() {
    myGameArea.clear();
    myGamePiece.update();
}

function movimentandoNaveTeclado(tecla) {
    myGameArea.clear();
    if (tecla == 65) { // Tecla A para mover para a esquerda
        myGamePiece.x -= 50;
        myGamePiece.x = Math.max(0, myGamePiece.x); // Garante que a nave não saia da borda esquerda do canvas
    } else if (tecla == 68) { // Tecla D para mover para a direita
        myGamePiece.x += 50;
        myGamePiece.x = Math.min(myGameArea.canvas.width - myGamePiece.width, myGamePiece.x); // Garante que a nave não saia da borda direita do canvas
    } else if (tecla == 32) { // Barra de espaço para disparar
        disparaTiro(myGamePiece.x + myGamePiece.width / 2 - 1, myGamePiece.y);
    }
    myGamePiece.update();
}

function disparaTiro(col, lin) {
    if (lin > -6) { // Continua a mover o tiro para cima enquanto ele estiver visível no canvas
        ctx.clearRect(col, lin, 2, 5); // Limpa a área onde o tiro estava desenhado anteriormente
        ctx.fillRect(col, lin - 6, 2, 5); // Desenha o tiro um pouco mais acima
        setTimeout(function() {
            disparaTiro(col, lin - 6); // Chama recursivamente a função para mover o tiro
        }, 50); // Ajusta o intervalo de tempo para mover o tiro (50 milissegundos)
    }
}

// Adiciona um listener para o evento de pressionar tecla
document.addEventListener("keydown", function(event) {
    movimentandoNaveTeclado(event.keyCode);
});

// Inicia o jogo ao carregar a página
window.onload = startGame;

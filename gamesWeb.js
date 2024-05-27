// Variáveis para o canvas e contexto
var canvas;
var ctx;

// Objeto da nave
var nave = {
    width: 90,
    height: 80,
    x: 275,
    y: 500,
    speed: 5,
    image: new Image(),
};

// Objeto do fundo
var fundo = {
    image: new Image(),
    posY: 0,
    velocidade: 1,
};

// Função para iniciar o jogo
function startGame() {
    canvas = document.getElementById("gameCanvas");
    ctx = canvas.getContext("2d");

    // Carregar imagens
    nave.image.src = "imagens/navealiada.jpg";
    fundo.image.src = "imagens/fundo.jpg";

    // Iniciar o loop do jogo
    setInterval(updateGameArea, 20);
}

// Função para atualizar o jogo
function updateGameArea() {
    clearCanvas();
    updateFundo();
    updateNave();
}

// Função para limpar o canvas
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Função para atualizar o fundo
function updateFundo() {
    fundo.posY += fundo.velocidade;
    if (fundo.posY > canvas.height) {
        fundo.posY = 0;
    }
    ctx.drawImage(fundo.image, 0, fundo.posY - canvas.height, canvas.width, canvas.height);
    ctx.drawImage(fundo.image, 0, fundo.posY, canvas.width, canvas.height);
}

// Função para atualizar a nave
function updateNave() {
    ctx.drawImage(nave.image, nave.x, nave.y, nave.width, nave.height);
}

// Função para movimentar a nave para a esquerda
function moveLeft() {
    nave.x -= nave.speed;
    if (nave.x < 0) {
        nave.x = 0;
    }
}

// Função para movimentar a nave para a direita
function moveRight() {
    nave.x += nave.speed;
    if (nave.x > canvas.width - nave.width) {
        nave.x = canvas.width - nave.width;
    }
}

// Event listeners para teclas pressionadas
document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowLeft") {
        moveLeft();
    } else if (event.key === "ArrowRight") {
        moveRight();
    }
});

// Iniciar o jogo ao carregar a página
window.onload = startGame;


// Função para movimentar a nave para a esquerda
function moveLeft() {
    nave.x -= nave.speed;
    if (nave.x < 0) {
        nave.x = 0;
    }
}

// Função para movimentar a nave para a direita
function moveRight() {
    nave.x += nave.speed;
    if (nave.x > canvas.width - nave.width) {
        nave.x = canvas.width - nave.width;
    }
}

// Função para disparar tiros
function disparaTiro() {
    // Define a posição inicial do tiro
    var tiroX = nave.x + nave.width / 2;
    var tiroY = nave.y;

    // Cria uma função para mover o tiro
    function moveTiro() {
        ctx.clearRect(tiroX, tiroY, 2, 5); // Limpa a área onde o tiro estava desenhado anteriormente
        tiroY -= 6; // Move o tiro para cima
        ctx.fillRect(tiroX, tiroY, 2, 5); // Desenha o tiro um pouco mais acima

        // Verifica se o tiro saiu da tela
        if (tiroY > 0) {
            // Continua movendo o tiro
            requestAnimationFrame(moveTiro);
        }
    }

    // Chama a função para mover o tiro
    moveTiro();
}

// Event listener para a tecla de espaço
document.addEventListener("keydown", function(event) {
    if (event.key === " ") {
        // Quando a tecla de espaço for pressionada, dispara um tiro
        disparaTiro();
    } else if (event.key === "ArrowLeft") {
        moveLeft();
    } else if (event.key === "ArrowRight") {
        moveRight();
    }
});

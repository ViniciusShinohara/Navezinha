// Variáveis para o canvas e contexto
var canvas;
var ctx;

// Objeto da nave aliada
var nave = {
    width: 90,
    height: 80,
    x: 275,
    y: 500,
    speed: 5,
    image: new Image(),
};

// Objeto da nave inimiga
var naveInimiga = {
    width: 120,
    height: 90,
    x: 255, // Posição inicial no centro do canvas
    y: 50, // Posição inicial no topo do canvas
    speed: 2,
    direction: 1, // 1 para direita, -1 para esquerda
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
    naveInimiga.image.src = "imagens/naveinimiga.png";

    // Iniciar o loop do jogo
    setInterval(updateGameArea, 20);
}

// Função para atualizar o jogo
function updateGameArea() {
    clearCanvas();
    updateFundo();
    updateNaveInimiga(); // Atualiza a posição da nave inimiga
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

// Função para atualizar a nave aliada
function updateNave() {
    ctx.drawImage(nave.image, nave.x, nave.y, nave.width, nave.height);
}

// Função para atualizar a nave inimiga
function updateNaveInimiga() {
    naveInimiga.x += naveInimiga.speed * naveInimiga.direction;

    // Verifica se a nave inimiga ultrapassou os limites do canvas
    if (naveInimiga.x <= 0 || naveInimiga.x + naveInimiga.width >= canvas.width) {
        naveInimiga.direction *= -1;
    }

    ctx.drawImage(naveInimiga.image, naveInimiga.x, naveInimiga.y, naveInimiga.width, naveInimiga.height);
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

// Event listeners para teclas pressionadas
document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowLeft") {
        moveLeft();
    } else if (event.key === "ArrowRight") {
        moveRight();
    } else if (event.key === " ") {
        disparaTiro();
    }
});

// Iniciar o jogo ao carregar a página
window.onload = startGame;

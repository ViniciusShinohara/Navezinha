// Variáveis para o canvas e contexto
var canvas;
var ctx;

// Objeto da nave aliada
var nave = {
    width: 90,
    height: 80,
    x: 275,
    y: 500,
    speed: 10, // Aumentar a velocidade
    image: new Image(),
    movingLeft: false,
    movingRight: false,
};

// Objeto da nave inimiga 1
var naveInimiga1 = {
    width: 90,
    height: 80,
    x: 255, // Posição inicial no centro do canvas
    y: 50, // Posição inicial no topo do canvas
    speed: 2,
    direction: 1, // 1 para direita, -1 para esquerda
    image: new Image(),
    health: 5, // A nave inimiga pode tomar 5 disparos
    active: true,
};

// Objeto da nave inimiga 2
var naveInimiga2 = {
    width: 90,
    height: 80,
    x: 255, // Posição inicial no centro do canvas
    y: 50, // Posição inicial no topo do canvas
    speed: 2,
    direction: 1, // 1 para direita, -1 para centro
    image: new Image(),
    health: 5, // A nave inimiga pode tomar 5 disparos
    active: false,
};

// Objeto da nave inimiga 3
var naveInimiga3 = {
    width: 90,
    height: 80,
    x: 255, // Posição inicial no centro do canvas
    y: 50, // Posição inicial no topo do canvas
    speed: 2,
    direction: -1, // -1 para esquerda, 1 para centro
    image: new Image(),
    health: 5, // A nave inimiga pode tomar 5 disparos
    active: false,
};

// Objeto do fundo
var fundo = {
    image: new Image(),
    posY: 0,
    velocidade: 1,
};

// Sprite da explosão
var explosao = {
    image: new Image(),
    width: 64,
    height: 64,
    frames: 5,
    currentFrame: 0,
    x: 0,
    y: 0,
    active: false,
    delay: 100, // Atraso entre frames ajustado para 100 milissegundos
    lastFrameTime: 0, // Timestamp do último frame desenhado
};

// Contador de pontos
var pontos = 0;

// Função para iniciar o jogo
function startGame() {
    canvas = document.getElementById("gameCanvas");
    ctx = canvas.getContext("2d");

    // Carregar imagens
    nave.image.src = "imagens/navealiada.jpg";
    fundo.image.src = "imagens/fundo.jpg";
    naveInimiga1.image.src = "imagens/naveinimiga.png";
    naveInimiga2.image.src = "imagens/naveinimiga.png";
    naveInimiga3.image.src = "imagens/naveinimiga.png";
    explosao.image.src = "imagens/explosao.png";

    // Iniciar o loop do jogo
    setInterval(updateGameArea, 20);
}

// Função para reiniciar o jogo
function restartGame() {
    naveInimiga1.health = 5;
    naveInimiga1.x = 255;
    naveInimiga1.y = 50;
    naveInimiga1.direction = 1;
    naveInimiga1.active = true;

    naveInimiga2.health = 5;
    naveInimiga2.x = 255;
    naveInimiga2.y = 50;
    naveInimiga2.direction = 1;
    naveInimiga2.active = false;

    naveInimiga3.health = 5;
    naveInimiga3.x = 255;
    naveInimiga3.y = 50;
    naveInimiga3.direction = -1;
    naveInimiga3.active = false;

    explosao.active = false;
    pontos = 0;
}

// Função para atualizar o jogo
function updateGameArea() {
    clearCanvas();
    updateFundo();
    updateNave();
    if (naveInimiga1.active) {
        updateNaveInimiga(naveInimiga1, handleNaveInimiga1Movement);
    } else if (naveInimiga2.active) {
        updateNaveInimiga(naveInimiga2, handleNaveInimiga2Movement);
    } else if (naveInimiga3.active) {
        updateNaveInimiga(naveInimiga3, handleNaveInimiga3Movement);
    }
    updateExplosao();
    drawScore();
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
    if (nave.movingLeft) {
        moveLeft();
    }
    if (nave.movingRight) {
        moveRight();
    }
    ctx.drawImage(nave.image, nave.x, nave.y, nave.width, nave.height);
}

// Função para lidar com o movimento da nave inimiga 1
function handleNaveInimiga1Movement(nave) {
    nave.x += nave.speed * nave.direction;

    // Verifica se a nave inimiga ultrapassou os limites do canvas
    if (nave.x <= 0 || nave.x + nave.width >= canvas.width) {
        nave.direction *= -1;
    }
}

// Função para lidar com o movimento da nave inimiga 2
function handleNaveInimiga2Movement(nave) {
    nave.x += nave.speed * nave.direction;

    // Verifica se a nave inimiga ultrapassou os limites para a direita ou o centro
    if (nave.x >= canvas.width - nave.width || nave.x <= (canvas.width - nave.width) / 2) {
        nave.direction *= -1;
    }
}

// Função para lidar com o movimento da nave inimiga 3
function handleNaveInimiga3Movement(nave) {
    nave.x += nave.speed * nave.direction;

    // Verifica se a nave inimiga ultrapassou os limites para a esquerda ou o centro
    if (nave.x <= 0 || nave.x >= (canvas.width - nave.width) / 2) {
        nave.direction *= -1;
    }
}

// Função para atualizar uma nave inimiga
function updateNaveInimiga(nave, movementHandler) {
    movementHandler(nave);

    if (nave.health > 0) {
        ctx.drawImage(nave.image, nave.x, nave.y, nave.width, nave.height);
    } else if (!explosao.active) {
        iniciarExplosao(nave.x, nave.y);
    }
}

// Função para iniciar a animação de explosão
function iniciarExplosao(x, y) {
    explosao.x = x;
    explosao.y = y;
    explosao.currentFrame = 0;
    explosao.active = true;
    explosao.lastFrameTime = Date.now();
}

// Função para atualizar a animação de explosão
function updateExplosao() {
    if (explosao.active) {
        var now = Date.now();
        if (now - explosao.lastFrameTime >= explosao.delay) {
            explosao.lastFrameTime = now;
            var frameX = (explosao.currentFrame % explosao.frames) * explosao.width;
            ctx.drawImage(explosao.image, frameX, 0, explosao.width, explosao.height, explosao.x, explosao.y, explosao.width, explosao.height);

            explosao.currentFrame++;
            if (explosao.currentFrame >= explosao.frames) {
                explosao.active = false;
                if (naveInimiga1.active) {
                    naveInimiga1.active = false;
                    naveInimiga2.active = true;
                } else if (naveInimiga2.active) {
                    naveInimiga2.active = false;
                    naveInimiga3.active = true;
                } else {
                    setTimeout(function() {
                        alert("VOCÊ GANHOU!");
                        restartGame();
                    }, explosao.delay);
                }
            }
        }
    }
}

// Função para desenhar a pontuação
function drawScore() {
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "20px Arial";
    ctx.fillText("Pontuação: " + pontos, 450, 30);
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

        // Verifica se o tiro acertou a nave inimiga 1
        if (naveInimiga1.active && tiroX >= naveInimiga1.x && tiroX <= naveInimiga1.x + naveInimiga1.width && tiroY <= naveInimiga1.y + naveInimiga1.height) {
            naveInimiga1.health--;
            pontos += 5; // Incrementa os pontos
            if (naveInimiga1.health <= 0) {
                iniciarExplosao(naveInimiga1.x, naveInimiga1.y);
            }
            return; // Para de mover o tiro após a colisão
        }

        // Verifica se o tiro acertou a nave inimiga 2
        if (naveInimiga2.active && tiroX >= naveInimiga2.x && tiroX <= naveInimiga2.x + naveInimiga2.width && tiroY <= naveInimiga2.y + naveInimiga2.height) {
            naveInimiga2.health--;
            pontos += 5; // Incrementa os pontos
            if (naveInimiga2.health <= 0) {
                iniciarExplosao(naveInimiga2.x, naveInimiga2.y);
            }
            return; // Para de mover o tiro após a colisão
        }

        // Verifica se o tiro acertou a nave inimiga 3
        if (naveInimiga3.active && tiroX >= naveInimiga3.x && tiroX <= naveInimiga3.x + naveInimiga3.width && tiroY <= naveInimiga3.y + naveInimiga3.height) {
            naveInimiga3.health--;
            pontos += 5; // Incrementa os pontos
            if (naveInimiga3.health <= 0) {
                iniciarExplosao(naveInimiga3.x, naveInimiga3.y);
            }
            return; // Para de mover o tiro após a colisão
        }

        // Continua movendo o tiro
        requestAnimationFrame(moveTiro);
    }

    // Chama a função para mover o tiro
    moveTiro();
}

// Event listeners para teclas pressionadas
document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowLeft") {
        nave.movingLeft = true;
    } else if (event.key === "ArrowRight") {
        nave.movingRight = true;
    } else if (event.key === " ") {
        disparaTiro();
    }
});

document.addEventListener("keyup", function(event) {
    if (event.key === "ArrowLeft") {
        nave.movingLeft = false;
    } else if (event.key === "ArrowRight") {
        nave.movingRight = false;
    }
});

// Iniciar o jogo ao carregar a página
window.onload = startGame;


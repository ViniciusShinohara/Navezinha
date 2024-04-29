

var myGamePiece;
function startGame() {
    myGamePiece = new component(30, 50, "imagens/navealiada.jpg", 570, 270);
    myGameArea.start();
}
var myGameArea = {
     canvas : document.createElement("canvas"), // Cria um novo elemento canvas
    start : function() { // Método para iniciar a área de jogo
this.canvas.width = 600; // Define a largura do canvas como 600 pixels
this.canvas.height = 600; // Define a altura do canvas como 600 pixels
this.context = this.canvas.getContext("2d"); // Obtém o contexto 2D para desenhar no canvas
     document.body.insertBefore(this.canvas, document.body.childNodes[0]); // Insere o canvas no corpo do documento HTML
     this.interval = setInterval(updateGameArea, 20); // Inicia um intervalo para atualizar a área de jogo a cada 20 milissegundos
},
clear : function() { // Método para limpar o canvas
this.context.clearRect(0, 0, this.canvas.width, this.canvas.height); // Limpa o canvas completamente
}
}

function component(width, height, imageSrc, x, y) { // Função construtora para criar componentes do jogo
  this.width = width; // Largura do componente
  this.height = height; // Altura do componente
  this.x = x; // Posição x do componente
  this.y = y; // Posição y do componente
this.image = new Image(); // Cria um novo objeto Image para representar a imagem do componente
this.image.src = imageSrc; // Define o caminho da imagem do componente
this.update = function(){ // Método para atualizar e desenhar o componente
ctx = myGameArea.context; // Obtém o contexto 2D do canvas
ctx.drawImage(this.image, this.x, this.y, this.width, this.height); // Desenha a imagem do componente no canvas
this.x -= 1; // Movimento do componente para a esquerda
}
}

function updateGameArea() {
    myGameArea.clear();
    myGamePiece.update();
}
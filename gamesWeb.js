window.onload = function() {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");

    // Objeto com a imagem
    var objeto = {
        x: canvas.width, // posição inicial no canto direito
        y: canvas.height / 2, // altura central do canvas
        imagem: new Image()
    };
    
    objeto.imagem.src = 'imagens/navealiada.jpg'; // substitua 'caminho_para_sua_imagem.png' pelo caminho da sua imagem
    
    // Função para desenhar o objeto
    function drawObjeto() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(objeto.imagem, objeto.x, objeto.y);
    }

    // Função para mover o objeto
    function moveObjeto() {
        objeto.x -= 1; // movimento para a esquerda
        drawObjeto();
    }

    // Chama a função de mover o objeto a cada 10 milissegundos
    setInterval(moveObjeto, 10);
};
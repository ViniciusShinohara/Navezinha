function desenhaImagens(){

canvas = document.getElementById("canvas")
ctx = canvas.getContext("2d");
img = new Image();
Img.src = "";
Img.onload = function(){
    ctx.drawImage(img, 0, 0);
    ctx.drawImage(img, 600, 0, 100, 100);
}
}
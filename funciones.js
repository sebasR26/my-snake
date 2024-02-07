
//coordenadas de la comida
let foodX= 1, foodY = 1;

//coordenadas de la cabeza
let snakeX=8, snakeY= 22;

let snakeBody = [];

let velocityX = 0, velocityY = 0;

const playBoard = document.querySelector(".play-board")


//hacemos aleatoria las coordenadas de la comida
const changFoodPosition = () =>{
    foodX = Math.floor(Math.random()*30) + 1;
    foodY = Math.floor(Math.random()*30) + 1;
    
}

//direccion de las teclas
const changeDirection = (e) =>{
    

    if(e.key === "ArrowUp" || e.key === "w") {
        velocityX = 0;
        velocityY = -1;
    }else if(e.key === "ArrowDown" || e.key === "s"){
        velocityX = 0;
        velocityY = 1;
    }else if(e.key === "ArrowLeft" || e.key === "a"){
        velocityX = -1;
        velocityY = 0;
    }else if(e.key === "ArrowRight" || e.key === "d"){
        velocityX = 1;
        velocityY = 0;
    }
    
    //initgame()
}


//generamos la comida y la cabeza
const initgame = () => {
    let htmlMarkup = `<div class="food" style="grid-area:${foodY} / ${foodX}"></div>`;

    snakeX += velocityX;
    snakeY += velocityY;


    

    snakeBody[0] = [snakeX, snakeY]

    // Verificar si la cabeza de la serpiente alcanza la comida
    if (snakeX === foodX && snakeY === foodY) {
        //console.log("Snake ate food!");
        changFoodPosition();
        snakeBody.push([foodX, foodY])
       // console.log(snakeBody)
    }

    for(let i = snakeBody.length - 1; i>0; i--){
        snakeBody[i] = snakeBody[i-1];
    }

    for(let i = 0; i < snakeBody.length; i++){
        htmlMarkup += `<div class="head" style="grid-area:${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
    }

    

    playBoard.innerHTML = htmlMarkup;
}



changFoodPosition ()

//para que la cabeza se mueva sola

setInterval(initgame, 125)

//generamos la direccion de la teclas
document.addEventListener("keydown", changeDirection);

//coordenadas de la comida
let foodX= 1, foodY = 1;

//coordenadas de la cabeza
let snakeX=8, snakeY= 22;

//variable para limites del juego
gameOver = false;

//variable para el cuerpo
let snakeBody = [];

let velocityX = 0, velocityY = 0;

const playBoard = document.querySelector(".play-board")
const scoreELement =  document.querySelector(".score")
const highScoreELement =  document.querySelector(".high-score")

let setIntervalId;

let score = 0;

let highScore = localStorage.getItem("high-score") || 0;
highScoreELement.innerHTML= `Puntuacion maxima: ${highScore}`;


const handleGameOver = () => {
    clearInterval(setIntervalId);
    alert("F");
    location.reload();
}

//hacemos aleatoria las coordenadas de la comida
const changFoodPosition = () =>{
    foodX = Math.floor(Math.random()*30) + 1;
    foodY = Math.floor(Math.random()*30) + 1;
    
}

//direccion de las teclas
const changeDirection = (e) =>{
    

    if ((e.key === "ArrowUp" || e.key === "w") && velocityY !== 1) {
        velocityX = 0;
        velocityY = -1;
    } else if ((e.key === "ArrowDown" || e.key === "s") && velocityY !== -1) {
        velocityX = 0;
        velocityY = 1;
    } else if ((e.key === "ArrowLeft" || e.key === "a") && velocityX !== 1) {
        velocityX = -1;
        velocityY = 0;
    } else if ((e.key === "ArrowRight" || e.key === "d") && velocityX !== -1) {
        velocityX = 1;
        velocityY = 0;
    }
    
    //initgame()
}


//generamos la comida y la cabeza
const initgame = () => {
    if(gameOver) return handleGameOver();
    let htmlMarkup = `<div class="food" style="grid-area:${foodY} / ${foodX}"></div>`;

    snakeX += velocityX;
    snakeY += velocityY;

    if(snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30){
        //console.log("game over")
        gameOver = true;
    }
    

    
    

    // Verificar si la cabeza de la serpiente alcanza la comida
    if (snakeX === foodX && snakeY === foodY) {
        //console.log("Snake ate food!");
        changFoodPosition();
        snakeBody.push([foodX, foodY])
       // console.log(snakeBody)
       score++;

       highScore = score >= highScore ? score : highScore;
       localStorage.setItem("high-score", highScore);
       scoreELement.innerHTML=`Puntuacion: ${score}`;

       highScoreELement.innerHTML= `Puntuacion maxima: ${highScore}`;

       
       

       
    }
    
    
    //crecimiento del cuerpo
    for(let i = snakeBody.length - 1; i>0; i--){
        snakeBody[i] = snakeBody[i-1];
    }

    snakeBody[0] = [snakeX, snakeY];

    for(let i = 0; i < snakeBody.length; i++){
        htmlMarkup += `<div class="head" style="grid-area:${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
        if(i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]){
            gameOver = true;
        }
    }

    

    playBoard.innerHTML = htmlMarkup;
}



changFoodPosition ()

//para que la cabeza se mueva sola

setIntervalId = setInterval(initgame, 125)

//generamos la direccion de la teclas
document.addEventListener("keydown", changeDirection);
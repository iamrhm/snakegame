function myLoadFunction(){
    var x = document.getElementById("boardScore");
    x.style.display="none";
    var y = document.getElementById("gameBoard");
    y.style.display="none";
    var z = document.getElementById("close");
    z.style.display="none";
    
    
}

function myFunction() {
    var boardSize = 32;
    var refreshTime = 1000;
    var snake = [];
    var foodPosition;
    var direction = "l";
    var lastStep = "l";
    var intervalRef;
    var count=0;
    running = true;
    //Start Button
    var x = document.getElementById("boardScore");
    x.style.display="block";
    document.getElementById("Start").disabled = true;
    var y = document.getElementById("gameBoard");
    y.style.display="block";

    var createBoard = function () {
        var i, j, id = 1;
        for (i = 1; i <= boardSize; i++) {
            var parent = document.getElementById("gameBoard");
            var row = document.createElement("div");
            row.style.cssText="margin-top:-5px;margin-bottom:-5px;"
            parent.appendChild(row);
            for (j = 1; j <= boardSize; j++) {
                var col = document.createElement("div");
                col.setAttribute("id", id);
                row.appendChild(col);
                col.style.cssText = "float:left; width: 8px; height:8px;border-style:solid; border-spacing: 5px; border-radius:3px; border-color: #4C6A92; ";
                id++;
            }
            var br = document.createElement("BR");
            row.appendChild(br);
        }
        for(i=1;i<=boardSize;i++){
            if(i>=1&&i<=boardSize || i>=(boardSize*boardSize-boardSize+1)&&i<=(boardSize*boardSize)
            ||i%boardSize==0||i%boardSize==1){
                temp = document.getElementById(i);
                temp.style.background="none";
            }

        }
    }

    var snakeCreate = function () {
        var position = Math.floor((Math.random() * boardSize * boardSize) + 1);
        var position = Math.floor((Math.random() * boardSize * boardSize) + 1);
        if(position>=1 && position<=boardSize || position>=(boardSize*boardSize-boardSize+1) && position<=(boardSize*boardSize)
        || position%boardSize==0||position%boardSize==1)
        snakeCreate();
        else{
        snake[0] = document.getElementById(position);
        snake[1] = document.getElementById(position + 1);
        snake[2] = document.getElementById(position + 2);
        snake[0].style.background = "#004B8D";
        snake[1].style.background = "MediumSeaGreen";
        snake[2].style.background = "MediumSeaGreen";
        gamePoint();
        }
    }

    var createFood = function () {
        var position = Math.floor((Math.random() * boardSize * boardSize) + 1);
        if(position>=1 && position<=boardSize || position>=(boardSize*boardSize-boardSize+1) && position<=(boardSize*boardSize)
        || position%boardSize==0||position%boardSize==1)
        createFood();
        else if(overlap(position))
        createFood();
        else{
        foodPosition = position;
        var foodDiv = document.getElementById(position);
        foodDiv.style.background = "Tomato";
        }
    }
    function overlap(food){
        var i;
        for(i=0;i<snake.length;i++){
            if(snake[i].id==food)
            return 1;
        }
    }

    const checktimer = function () {
        clearInterval(intervalRef);
    }

    function gamePoint(){
        count=(snake.length-2);
        var score=document.getElementById("score");
        score.innerHTML = count;
        if(parseInt(refreshTime)-(2*count)>500)
        refreshTime=parseInt(refreshTime)-(5*count);
        else
        refreshTime=500;
        
    }


    function checkAlive(){
        var i;
        for(i=1;i<snake.length;i++){
            if(snake[0].id===snake[i].id){
                gameEnd();
            }
        }
        if( parseInt(snake[0].id)%boardSize==1 && direction=="l"  || parseInt(snake[0].id)%boardSize==0 &&  direction=="r" ){
            gameEnd();
        }
        if( (snake[0].id)>=1&&(snake[0].id)<=boardSize && direction=="u" || parseInt(snake[0].id)>=(boardSize*boardSize-boardSize+1)&& parseInt(snake[0].id)<=(boardSize*boardSize) && direction=="d" ){
            gameEnd();
        }

        return 1;
    }

    var move = function () {
        window.onkeydown = function (e) {
            var key = e.keyCode;
            e.preventDefault();
            if (key === 37) {
                if (direction != "r") {
                    lastStep=direction;
                    direction = "l";
                    checkAlive();
                    checktimer();
                    if(checkAlive())
                        moveLeft();
                    intervalRef = setInterval(function () {
                        checkAlive();
                        moveLeft();
                        
                    }, refreshTime, moveLeft);
                }
            }
            else if (key === 39) {
                if (direction != "l") {
                    lastStep=direction;
                    direction = "r";
                    checkAlive();
                    checktimer();
                    if(checkAlive())
                        moveRight();
                    intervalRef = setInterval(function () {
                        checkAlive();
                        moveRight();
                        
                    }, refreshTime, moveRight);
                }
            }
            else if (key === 38) {
                if (direction != "d") {
                    lastStep=direction;
                    direction = "u";
                    checktimer();
                    if(checkAlive())
                        moveUp();
                    intervalRef = setInterval(function () {
                        checkAlive();
                        moveUp();
                        
                    }, refreshTime, moveUp);
                }
            }
            else if (key === 40) {
                if (direction != "u") {
                    lastStep=direction;
                    direction = "d";
                    checktimer();
                    if(checkAlive())
                        moveDown();
                    intervalRef = setInterval(function () {
                        checkAlive();
                        moveDown();
                        
                    }, refreshTime, moveDown);
                }
            }
        }
    }

    function moveLeft() {
        var block, temp, tail;
        tail = snake[snake.length - 1];
        for (block = snake.length - 1; block >= 0; block--) {
            if (block == 0) {
                temp = document.getElementById(parseInt(snake[block].id) - 1);
                snake[block] = temp;
                temp.style.background = "#004B8D";
            } else {
                temp = document.getElementById(parseInt(snake[block - 1].id));
                snake[block] = temp;
                temp.style.background = "MediumSeaGreen";
            }
        }
        tail.style.background = "white";
        if (check(foodPosition, snake[0].id)) {
            temp = document.getElementById(parseInt(snake[snake.length - 1].id) + 1);
            temp.style.background = "MediumSeaGreen";
            snake.push(temp);
            gamePoint();
            createFood();
        }
    }

    function moveRight() {
        var block, temp, tail;
        tail = document.getElementById(parseInt(snake[snake.length - 1].id));
        for (block = snake.length - 1; block >= 0; block--) {
            if (block == 0) {
                temp = document.getElementById(parseInt(snake[block].id) + 1);
                snake[block] = temp;
                temp.style.background = "#004B8D";
            } else {
                temp = document.getElementById(parseInt(snake[block - 1].id));
                temp.style.background = "MediumSeaGreen";
                snake[block] = temp;
            }
        }
        tail.style.background = "white";
        if (check(foodPosition, snake[0].id)) {
            temp = document.getElementById(parseInt(snake[snake.length - 1].id) + 1);
            temp.style.background = "MediumSeaGreen";
            snake.push(temp);
            gamePoint();
            createFood();

        }

    }

    function moveUp() {
        var block, temp, tail;
        tail = document.getElementById(parseInt(snake[snake.length - 1].id));
        for (block = snake.length - 1; block >= 0; block--) {
            if (block == 0) {
                temp = document.getElementById(parseInt(snake[block].id) - boardSize);
                temp.style.background = "#004B8D";
                snake[block] = temp;
            } else {
                temp = document.getElementById(parseInt(snake[block - 1].id));
                temp.style.background = "MediumSeaGreen";
                snake[block] = temp;
            }
        }
        tail.style.background = "white";
        if (check(foodPosition, snake[0].id)) {
            temp = document.getElementById(parseInt(snake[snake.length - 1].id) + 1);
            temp.style.background = "MediumSeaGreen";
            snake.push(temp);
            console.log(snake.length);
            gamePoint();
            createFood();
        }
    }

    function moveDown() {
        var block, temp, tail;
        tail = document.getElementById(parseInt(snake[snake.length - 1].id));
        for (block = snake.length - 1; block >= 0; block--) {
            if (block == 0) {
                temp = document.getElementById(parseInt(snake[block].id) + boardSize);
                temp.style.background = "#004B8D";
                snake[block] = temp;
            } else {
                temp = document.getElementById(parseInt(snake[block - 1].id));
                temp.style.background = "MediumSeaGreen";
                snake[block] = temp;
            }
        }
        tail.style.background = "white";
        if (check(foodPosition, snake[0].id)) {
            temp = document.getElementById(parseInt(snake[snake.length - 1].id) + 1);
            temp.style.background = "MediumSeaGreen";
            snake.push(temp);
            gamePoint();
            createFood();
        }
    }

    function check(foodPosition, snakeCheck) {
        if (foodPosition == snakeCheck) {
            return 1;
        } else {
            return 0;
        }
    }

    createBoard();
    createFood();
    snakeCreate();
    move();

}
function myCloseFunction(){
    location.reload();
}
function gameEnd(){
    var x = document.getElementById("boardScore");
    x.style.display="none";
    var y = document.getElementById("gameBoard");
    y.style.display="none";
    var z = document.getElementById("close");
    z.style.display="block";
    
}

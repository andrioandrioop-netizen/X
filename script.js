const board = document.querySelector(".board");
const cells = document.querySelectorAll(".cell");

const turnBox = document.querySelector(".turn-box");

const restartBtn = document.getElementById("restart");

const popup = document.getElementById("popup");

const winnerText = document.getElementById("winnerText");

const playAgain = document.getElementById("playAgain");

const score1 = document.getElementById("score1");
const score2 = document.getElementById("score2");
const draws = document.getElementById("draws");

let gameBoard = [
    "", "", "",
    "", "", "",
    "", "", ""
];

let currentPlayer = "white";

let gameActive = true;

let player1Score = 0;
let player2Score = 0;
let drawScore = 0;

const wins = [

    [0,1,2],
    [3,4,5],
    [6,7,8],

    [0,3,6],
    [1,4,7],
    [2,5,8],

    [0,4,8],
    [2,4,6]

];

updateTurn();

cells.forEach(cell=>{

    cell.addEventListener("click",cellClicked);

});

restartBtn.addEventListener("click",resetBoard);

playAgain.addEventListener("click",()=>{

    popup.classList.remove("show");

    resetBoard();

});

function cellClicked(e){

    const cell = e.target;

    const index = cell.dataset.index;

    if(!gameActive) return;

    if(gameBoard[index]!="") return;

    gameBoard[index]=currentPlayer;

    /*const img=document.createElement("img");*/

    if(currentPlayer==="white"){

        cell.innerHTML='<img src="IMG_20260705_153704.jpg" alt="White Cat">';
    }

    else{

        cell.innerHTML='<img src="IMG_20260705_162024.jpg" alt="Gray Cat">';

    }

   /* cell.appendChild(img);*/

    if(checkWinner()){

        gameActive=false;

        if(currentPlayer==="white"){

            player1Score++;

            score1.textContent=player1Score;

            winnerText.innerHTML="🐱 Player 1 Wins!";

        }

        else{

            player2Score++;

            score2.textContent=player2Score;

            winnerText.innerHTML="🐈 Player 2 Wins!";

        }

        popup.classList.add("show");

        return;

    }

    if(gameBoard.every(c=>c!="")){

        drawScore++;

        draws.textContent=drawScore;

        winnerText.innerHTML="🤝 It's a Draw!";

        popup.classList.add("show");

        gameActive=false;

        return;

    }

    currentPlayer=currentPlayer==="white"?"gray":"white";

    updateTurn();

}

function updateTurn(){

    if(currentPlayer==="white"){

        turnBox.innerHTML="🐱 Player 1's Turn";

    }

    else{

        turnBox.innerHTML="🐈 Player 2's Turn";

    }

}

function checkWinner(){

    for(let combo of wins){

        const a=combo[0];
        const b=combo[1];
        const c=combo[2];

        if(

            gameBoard[a]!=="" &&

            gameBoard[a]===gameBoard[b] &&

            gameBoard[a]===gameBoard[c]

        ){

            cells[a].style.background="#d8ffd8";
            cells[b].style.background="#d8ffd8";
            cells[c].style.background="#d8ffd8";

            return true;

        }

    }

    return false;

}

function resetBoard(){

    gameBoard=[

        "","","",

        "","","",

        "","",""

    ];

    gameActive=true;

    currentPlayer="white";

    updateTurn();

    cells.forEach(cell=>{

        cell.innerHTML="";

        cell.style.background="#fbfdff";

    });

}
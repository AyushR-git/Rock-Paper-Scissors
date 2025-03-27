const score = {
  wins: 0,
  losses: 0,
  ties: 0
};

// Function to update the score display
function updateScore() {
  document.querySelector('.js-score').innerHTML = 
    `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

// Initialize score display
updateScore();

// Autoplay function and setinterval
let isAutoplaying = false;
let intervalID ;

function autoPlay(){
    if(!isAutoplaying){
        intervalID = setInterval(() => {
        const playerMove = pickComputerMove();
        playGame(playerMove);
        }, 1000);
        isAutoplaying = true;
    }else{
        clearInterval(intervalID);
        isAutoplaying = false;
    }
}

// Insted of onclick() I use addEventlistener to play the game
 document.querySelector('.js-rock-button')
   .addEventListener('click',() => { 
        playGame('rock');
      });
  
 document.querySelector('.js-paper-button')
     .addEventListener('click',() => {
        playGame('paper');
     }); 

document.querySelector('.js-scissors-button')
     .addEventListener('click',() =>{
        playGame('scissors');
     });

// Now I use Keydown Eventlistenr to play game if r-p-s key where press too playGame 
document.body.addEventListener('keydown',(event) =>{
    if(event.key === 'r'){
      playGame('rock');
    }else if(event.key === 'p'){
      playGame('paper');
    }else if(event.key === 's'){
      playGame('scissors');
    }
});

document.querySelector('.js-auto-play')
  .addEventListener('click',() =>{
      autoPlay();
  });

document.querySelector('.js-reset-button')
  .addEventListener('click',()=>{
    resetScore();
  });

// Player Move Function
function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let result = '';

  if (playerMove === 'scissors') {
    if (computerMove === 'rock') {
      result = 'You lose';
    } else if (computerMove === 'paper') {
      result = 'You win';
    } else {
      result = 'Tie';
    }
  } else if (playerMove === 'paper') {
    if (computerMove === 'rock') {
      result = 'You win';
    } else if (computerMove === 'paper') {
      result = 'Tie';
    } else {
      result = 'You lose';
    }
  } else if (playerMove === 'rock') {
    if (computerMove === 'rock') {
      result = 'Tie';
    } else if (computerMove === 'paper') {
      result = 'You lose';
    } else {
      result = 'You win';
    }
  }

  // Update score based on result
  if (result === 'You win') {
    score.wins++;
  } else if (result === 'You lose') {
    score.losses++;
  } else {
    score.ties++;
  }
  // Update the score display
  updateScore();
  document.querySelector('.js-result')
    .innerHTML = result;
  document.querySelector('.js-moves')
    .innerHTML = `You <img src="/image/${playerMove}-emoji.png" class="move-icon">
                      <img src="/image/${computerMove}-emoji.png" class="move-icon">
                  Computer`;
}

// computer move function
function pickComputerMove() {
  const randomNumber = Math.random();
  if (randomNumber < 1 / 3) {
    return 'rock';
  } else if (randomNumber < 2 / 3) {
    return 'paper';
  } else {
    return 'scissors';
  }
}

// Function to reset the score
function resetScore() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  updateScore();
}
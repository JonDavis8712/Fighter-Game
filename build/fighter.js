const atk1 = document.querySelector(".atk1");
const atk2 = document.querySelector(".atk2");
const heal1 = document.querySelector(".heal1");
const heal2 = document.querySelector(".heal2");
const p1health = document.querySelector(".p1health");
const p2health = document.querySelector(".p2health");
const playbtn = document.querySelector(".play");
const resetBtn = document.querySelector(".reset");
const resultDiv = document.querySelector(".result");

const updateGame = (p1, p2, gameState) => {
  p1health.innerText = p1.health;
  p2health.innerText = p2.health;
  if (p1.health <= 0 || p2.health <= 0) {
    resultDiv.style.display = "block";
    game.isOver = true;
    gameState = game.isOver;
    resultDiv.innerText = game.declareWinner(game.isOver, p1, p2);
    return gameState;
  }
};

class Player {
  constructor(health, attackDamage) {
    this.health = health;
    this.attackDmg = attackDamage;
  }
  strike(player, enemy, attackDmg) {
    let damageAmount = Math.ceil(Math.random() * attackDmg);
    enemy.health -= damageAmount;
    updateGame(p1, p2, gameState);
  }
  heal(player) {
    let hpAmount = Math.ceil(Math.random() * 5);
    player.health += hpAmount;
    updateGame(p1, p2, gameState);
    if (player.health > 100) {
      player.health = 100;
      updateGame(p1, p2, gameState);
    }
    if (player.health <= 0) {
      player.health = 0;
      updateGame(p1, p2, gameState);
    }
  }
}

class Game {
  constructor() {
    this.isOver = true;
    playbtn.addEventListener("click", () => {
      playbtn.style.zIndex = 1;
      playbtn.style.backgroundColor = "transparent";
      playbtn.style.borderColor = "transparent";
      playbtn.style.boxShadow = "none";
      playbtn.style.textShadow = "none";
      playbtn.style.color = "grey";
      playbtn.style.textDecoration = "line-through";
      this.isOver = false;
    });
  }
  declareWinner(isOver, p1, p2) {
    let message;
    if (isOver == true && p1.health <= 0) {
      message = "Player 2 wins!";
    } else if (isOver == true && p2.health <= 0) {
      message = "Player 1 wins!";
    }
    console.log(isOver, p1.health, p2.health);
    document.getElementById("victory").play();
    resetBtn.style.display = "block";
    return message;
  }
}
resetBtn.addEventListener("click", function () {
  p1.health = 100;
  p2.health = 100;
  this.isOver = false;
  resultDiv.innerText = "";
  updateGame(p1, p2);
  location.reload();
});

let player1 = new Player(100, 10);
let player2 = new Player(100, 10);
let p1 = player1;
let p2 = player2;
let game = new Game();
updateGame(p1, p2);
let gameState = game.isOver;

document.addEventListener("keydown", function (e) {
  if (e.key == "q" && p2.health > 0 && game.isOver == false) {
    p1.strike(p1, p2, p1.attackDmg);
    document.getElementById("punch1").play();
    document.getElementById("punch1").currentTime = 0;
    document.getElementById("punch1").volume = 0.2;
  }
});

document.addEventListener("keydown", function (e) {
  if (e.key == "a" && p2.health > 0 && game.isOver == false) {
    p1.heal(p1);
    document.getElementById("heal1").play();
    document.getElementById("heal1").currentTime = 0;
    document.getElementById("heal1").volume = 0.2;
  }
});

document.addEventListener("keydown", function (e) {
  if (e.key == "p" && p1.health > 0 && game.isOver == false) {
    p2.strike(p2, p1, p2.attackDmg);
    document.getElementById("punch1").play();
    document.getElementById("punch1").currentTime = 0;
    document.getElementById("punch1").volume = 0.2;
  }
});

document.addEventListener("keydown", function (e) {
  if (e.key == "l" && p2.health > 0 && game.isOver == false) {
    p2.heal(p2);
    document.getElementById("heal2").play().currentTime;
    document.getElementById("heal2").currentTime = 0;
    document.getElementById("heal2").volume = 0.2;
  }
});

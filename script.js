//new DOM
playButtonEl = document.querySelector("#play-btn");
storeButtonEl = document.querySelector("#store-btn");
textWords = document.querySelector(".wwyd-placement");
moveButtons = document.querySelector(".wrapper-button");
playerName = document.querySelector("#playerName");
goldAmount = document.querySelector(".gold-amount");
hpAmount = document.querySelector(".hp-amount");
attackAmount = document.querySelector(".attack-amount");
accuracyAmount = document.querySelector(".accuracy-amount");
shopButton = document.querySelector("store-btn");
potionButtonEl = document.querySelector(".hp");
upAttackButton = document.querySelector(".attack");
upAccuracyButton = document.querySelector(".accuracy");
enterButtonEl = document.querySelector("#enter-btn");
gameScreenHomebutton = document.querySelector("#home-btn1");
shopScreenHomeButton = document.querySelector("#home-btn2");
leaveShopButton = document.querySelector("#leave-btn");
enemyImg = document.querySelector("#enemyPosition img");
enemyName = document.querySelector("#nameEnemyDisplay");
playerNameScreen = document.querySelector("#namePlayerDisplay");
usernameInput = document.querySelector("#userInput");

//Pokemon img
pokemonImg = document.querySelector(".pokemonSprite")
pokemonCard = document.querySelector("#playerPosition")
pokemonCardImg = document.querySelector('#playerPosition img')
//screens
startScreen = document.querySelector("#wrapper-main");
gameScreen = document.querySelector("#game-fieldset");
shopScreen = document.querySelector("#store-fieldset");

var cardImg;

const player1 = {
  maxHp: 100,
  hp: 100,
  attack: 10,
  accuracy: 10,
  gold: 15,
  name: "",
  img: "",
  pokemonName: "",
  hpEl: document.querySelector(".player-hp-fill"),
  hpTextEl: document.querySelector("#player-hp-text")
};

const enemies = [
  {
    name: "Happy Mushroom",
    maxHp: 50,
    hp: 50,
    attack: 10,
    accuracy: 5,
    gold: 25,
    img: "./assets/images/mushroom-base.png",
    hurtImg: "./assets/images/mushroom-hurt.png",
    hpEl: document.querySelector(".enemy-hp-fill"),
    hpTextEl: document.querySelector("#enemy-hp-text")
  },
  {
    name: "Birdy",
    maxHp: 100,
    hp: 100,
    attack: 15,
    accuracy: 5,
    gold: 35,
    img: "./assets/images/bluebird.png",
    hurtImg: "./assets/images/bluebird-bald.png",
    hpEl: document.querySelector(".enemy-hp-fill"),
    hpTextEl: document.querySelector("#enemy-hp-text")
  },
  {
    name: "Ssssneaky Ssssnake",
    maxHp: 150,
    hp: 150,
    attack: 25,
    accuracy: 3,
    gold: 50,
    img: "./assets/images/snake.png",
    hurtImg: "./assets/images/snake-hurt.png",
    hpEl: document.querySelector(".enemy-hp-fill"),
    hpTextEl: document.querySelector("#enemy-hp-text")
  },
];

//Function for creating text
async function text(string) {
  textWords.textContent = `${string}`;
  okBtn = document.createElement("button");
  okBtn.textContent = "ok";
  textWords.appendChild(okBtn);
  await new Promise(function (resolve, reject) {
    okBtn.addEventListener(
      "click",
      () => {
        resolve();
      },
      { once: true }
    );
  });
  textWords.textContent = "";
  okBtn.remove();
}

async function moves() {
  attackBtn = document.createElement("button");
  attackBtn.setAttribute("id", "hit");
//   runBtn = document.createElement("button");
//   runBtn.setAttribute("id", "run");
//   blockBtn = document.createElement("button");
//   blockBtn.setAttribute("id", "block");
  textWords.textContent = "What would you like to do?";
  attackBtn.textContent = "Attack";
//   runBtn.textContent = "Run";
//   blockBtn.textContent = "Block";
  moveButtons.append(attackBtn);
  return await new Promise((resolve, reject) => {
    attackBtn.addEventListener(
      "click",
      () => {
        resolve("Attack");
        moveButtons.innerHTML = "";
      },
      { once: true }
    );
  }).then((results) => {
    return results;
  });
}

//Logic for attacking and enemies showing up

playButtonEl.addEventListener("click", async() => {
  startGame()
  gameScreen.style.display = "block";
  startScreen.style.display = "none";
  playerNameScreen.textContent = player1.name || 'Adventurer';
  if(!player1.img){
    await Randomize()
  }
  pokemonCardImg.src = player1.img
});

storeButtonEl.addEventListener("click", () => {
  startScreen.style.display = "none";
  update();
  shopScreen.style.display = "block";
});

gameScreenHomebutton.addEventListener("click", () => {
  gameScreen.style.display = "none";
  startScreen.style.display = "block";
});

shopScreenHomeButton.addEventListener("click", () => {
  shopScreen.style.display = "none";
  startScreen.style.display = "block";
  console.log("Hello");
});

leaveShopButton.addEventListener("click", () => {
  shopScreen.style.display = "none";
  gameScreen.style.display = "block";
});


//Loop through enemies and choose to attack or run
async function startGame() {
    for (let i = 0; i < enemies.length; i++) {
    currentEnemy = enemies[i];
    enemyImg.src = currentEnemy.img;
    enemyName.textContent = currentEnemy.name;
    playerNameScreen.textContent = player1.name || 'Adventurer';
    player1.name = 'Adventurer'
    console.log(player1.name)
    updateHP(currentEnemy)
    updateHP(player1)
    await text(`Round ${i + 1}: ${currentEnemy.name} has appeared!`);
    while (currentEnemy.hp >= 0) {
      const results = await moves();
      console.log(results);
      if (results === "Attack") {
        await attack(player1, currentEnemy);
      } else {
        await text("You Ran!");
        break;
      }
      if (currentEnemy.hp === 0) {
        await text(`You defeated the ${currentEnemy.name}!`);
        await text(`You have earned ${currentEnemy.gold} gold.`);
        player1.gold += currentEnemy.gold;
        gameScreen.style.display = "none";
        update();
        shopScreen.style.display = "block";
        break;
      } else {
        await attack(currentEnemy, player1);
      }
      if (player1.hp === 0) {
        await text("You have been defeated. Game Over ): (Click Home button to start again!)");
        //back to home screen
        break;
      }
    }
    if (player1.hp === 0) {
      break;
    }
    if (i === enemies.length - 1) {
      enemyImg.src = ''
      await text("Congratulations! You Win!");
    }
  }
}



//Function for attacking / missing target
async function attack(attacker, target) {
  textWords.textContent = "You attacked the enemy";
  const miss = Math.floor(Math.random() * attacker.accuracy);
  if (miss === 0) {
    await text(`${attacker.name} missed`);
    return 0;
  }
  min = attacker.attack;
  max = attacker.attack + 5;
  //Lets hit, attack for a more random number between (attack - attack+5)
  const hit = Math.floor(Math.random() * (max - min + 1)) + min;
  await text(`${attacker.name} did ${hit} damage to ${target.name}!`);
  target.hp = Math.max(target.hp - hit, 0);
  updateHP(target)
  if(target.hurtImg){
    enemyImg.src = target.hurtImg
  }
  await text(`${target.name} now has ${target.hp}hp`);
  if(target.hurtImg){
    enemyImg.src = target.img
  }
}

//Start of the shop
async function update() {
  playerNameScreen.textContent = player1.name || 'Adventurer';
  goldAmount.textContent = `${player1.gold}`;
  hpAmount.textContent = `${player1.hp}`;
  attackAmount.textContent = `${player1.attack}`;
  accuracyAmount.textContent = `${player1.accuracy}`;
}

// event listeners for upgrade buttons
potionButtonEl.addEventListener("click", () => {
  if (player1.hp === player1.maxHp) {
    // text("You are at full health!");
    console.log("hello");
    return;
  }
  if (player1.gold < 10) {
    // text("You do not have enough gold!");
    return;
  }
  player1.hp = Math.min(player1.hp + 10, player1.maxHp);
  player1.gold = Math.max(player1.gold - 10, 0);
  update();
  return;
});

upAttackButton.addEventListener("click", () => {
  if (player1.gold < 10) {
    // text("You do not have enough gold!");
    return;
  }
  player1.gold = Math.max(player1.gold - 10, 0);
  player1.attack += 5;
  update();
  return;
});

upAccuracyButton.addEventListener("click", () => {
  if (player1.gold < 10) {
    // text("You do not have enough gold!");
    return;
  }
  player1.gold = Math.max(player1.gold - 10, 0);
  player1.accuracy += 3;
  update();
  return;
});



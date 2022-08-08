//new DOM
playButtonEl = document.querySelector('#play-btn')
storeButtonEl = document.querySelector('#store-btn')
textWords = document.querySelector(".wwyd-placement")
moveButtons = document.querySelector('.wrapper-button')
playerName = document.querySelector('.player-name')
goldAmount = document.querySelector('.gold-amount')
hpAmount = document.querySelector('.hp-amount')
attackAmount = document.querySelector('.attack-amount')
accuracyAmount = document.querySelector('.accuracy-amount')
shopButton = document.querySelector('store-btn')
potionButtonEl = document.querySelector('.hp')
upAttackButton = document.querySelector('.attack')
upAccuracyButton = document.querySelector('.accuracy')
gameScreenHomebutton = document.querySelector('#home-btn1')
shopScreenHomeButton = document.querySelector('#home-btn2')
leaveShopButton = document.querySelector('#leave-btn')
enemyImg = document.querySelector("#enemyPosition img")

//screens
startScreen = document.querySelector('#wrapper-main')
gameScreen = document.querySelector('#game-fieldset')
shopScreen = document.querySelector('#store-fieldset')


const player1 = {
    maxHp: 100,
    hp: 100,
    attack: 10,
    accuracy: 10,
    gold: 100,
    name:  '',
}

const enemies = [
    {
        name: "monster-1",
        maxHp: 50,
        hp: 50,
        attack: 10,
        accuracy: 5,
        gold: 15,
        img: './assets/mushroom-base.png',
        hurtImg: './assets/mushroom-hurt.png'
    },
    {
        name: "monster-2",
        maxHp: 70,
        hp: 70,
        attack: 15,
        accuracy: 5,
        gold: 35,
        img: './assets/bluebird.png',
        hurtImg: './assets/bluebird-bald.png'
    },
    {
        name: "monster-3",
        maxHp: 100,
        hp: 100,
        attack: 35,
        accuracy: 3,
        gold: 100,
        img: './assets/snake.png',
        hurtImg: './assets/snake-hurt.png'
    }
]


//playbuttonEl.addEventListener("click",()=>{ 
    //console.log('hello')
    // await text("Welcome to the game!")
    // player1.name = noNullAnswers('What is your name?')

    // function noNullAnswers(promptStr){
    //     const answer = prompt(promptStr)
    //     if(answer){
    //         return answer
    //     }else {
    //         await text('This is invalid!')
    //         return noNullAnswers(promptStr)
    //     }
    // }
//});



//Function for creating text
async function text(string){
    textWords.textContent = `${string}`
    okBtn = document.createElement("button")
    okBtn.setAttribute('id', 'startTimer')
    okBtn.textContent = "ok"
    textWords.appendChild(okBtn)
    await new Promise(function(resolve, reject){
        okBtn.addEventListener("click", ()=>{
            resolve()
        }, {once: true})
    })
    textWords.textContent = ''
    okBtn.remove()
}


async function moves(){
    attackBtn = document.createElement("button")
    attackBtn.setAttribute('id', 'hit')
    runBtn = document.createElement("button")
    runBtn.setAttribute('id', 'run')
    blockBtn = document.createElement("button")
    blockBtn.setAttribute('id', 'block')
    textWords.textContent = 'What would you like to do?'
    attackBtn.textContent = "Attack"
    runBtn.textContent = "Run"
    blockBtn.textContent = "Block"
    moveButtons.append(attackBtn, runBtn, blockBtn)
    return await new Promise((resolve,reject)=>{
        attackBtn.addEventListener("click",()=>{
            resolve('Attack')
            moveButtons.innerHTML = ''
        }, {once: true})
    })
    .then(results =>{
        return results
    })
}


//Logic for attacking and enemies showing up
// Temporary await text until we finish modal for text input

playButtonEl.addEventListener("click", ()=>{
    gameScreen.style.display = 'block'
    startScreen.style.display = 'none'
    console.log('hello')
})
 
storeButtonEl.addEventListener("click",()=>{
    startScreen.style.display = 'none'
    update()
    shopScreen.style.display = 'block'
})

gameScreenHomebutton.addEventListener("click", ()=>{
    gameScreen.style.display = 'none'
    startScreen.style.display = 'block'
})

shopScreenHomeButton.addEventListener("click", ()=>{
    shopScreen.style.display = 'none'
    startScreen.style.display = 'block'
    console.log('Hello')
})

leaveShopButton.addEventListener("click", ()=>{
    shopScreen.style.display = 'none'
    gameScreen.style.display = 'block'
})


startGame()
//Loop through enemies and choose to attack or run
 async function startGame(){
    for(let i =0; i <enemies.length; i++){
    currentEnemy = enemies[i]
    enemyImg.src = currentEnemy.img
    await text(`Round ${i + 1}: ${currentEnemy.name} has appeared!`)

        while(currentEnemy.hp >= 0){
            const results = await moves()
            console.log(results)
            if (results === "Attack"){
                await attack(player1, currentEnemy)
            }else{
                await text('You Ran!')
                break
            }
            if(currentEnemy.hp === 0){
                await text(`You defeated the ${currentEnemy.name}!`)
                await text(`You have earned ${currentEnemy.gold} gold.`)
                player1.gold += currentEnemy.gold
                gameScreen.style.display = 'none'
                update()
                shopScreen.style.display = 'block'
                break
            } else{
                await attack(currentEnemy, player1)
            }
            if(player1.hp === 0){
                await text('You have been defeated. Game Over ):')
                //back to home screen
                break
            }
        }
        if (player1.hp === 0){
            break
        }
        if(i === enemies.length - 1){
            await text('Congratulations! You Win!')
        }
    }
}


//Function for attacking / missing target
async function attack(attacker, target){
    textWords.textContent = "You attacked the enemy"
    const miss = Math.floor(Math.random() * attacker.accuracy)
    if(miss === 0){
        await text(`${attacker.name} missed`)
        return 0
    }
    min = attacker.attack
    max = attacker.attack +5
//Lets hit, attack for a more random number between (attack - attack+5)
    const hit = Math.floor(Math.random() * (max - min + 1)) + min
    await text(`${attacker.name} did ${hit} damage to ${target.name}!`)
    target.hp = Math.max(target.hp - hit, 0)
    await text(`${target.name} now has ${target.hp}hp`)
}

//Start of the shop
async function update(){
    playerName.textContent = `${player1.name}`
    goldAmount.textContent = `${player1.gold}`
    hpAmount.textContent = `${player1.hp}`
    attackAmount.textContent = `${player1.attack}`
    accuracyAmount.textContent = `${player1.accuracy}`
}

// event listeners for upgrade buttons
potionButtonEl.addEventListener("click", ()=>{
    if (player1.hp === player1.maxHp) {
        text('You are at full health!')
        console.log('hello')
        return
    }
    if (player1.gold < 10) {
        text('You do not have enough gold!')
        return
    }
    player1.hp = Math.min(player1.hp + 10, player1.maxHp);
    player1.gold = Math.max(player1.gold - 10, 0);
    update()
    return
})

upAttackButton.addEventListener("click", ()=>{
    if (player1.gold < 10) {
        text('You do not have enough gold!')
        return
    }
    player1.gold = Math.max(player1.gold - 10, 0);
    player1.attack += 5;
    update()
    return
})

upAccuracyButton.addEventListener("click",()=>{
    if (player1.gold < 10) {
        text('You do not have enough gold!')
        return
    }
    player1.gold = Math.max(player1.gold - 10, 0);
    player1.accuracy += 3;
    update()
    return
})

// ______code for hp bar_____
let playerOneCanvas = document.getElementById("player-hp-bar");
let playerOneContext = playerOneCanvas.getContext("2d");

// canvas box sizing for player one
const playerOneCanvasWidth = playerOneCanvas.width = 300;
const playerOneCanvasHeight = playerOneCanvas.height = 20;

// moving the canvas to the top and bottom
playerOneCanvas.style.marginTop = window.innerHeight / 2 - playerOneCanvasHeight / 2 + "px";

// link to player one health
let playerOneHealth = 100;

// actual health bar display for player one
const playerOneHpBarWidth = 300;
const playerOneHpBarHeight = 20;
const x = playerOneCanvasWidth / 2 - playerOneHpBarWidth / 2;
const y = playerOneCanvasHeight / 2 - playerOneHpBarHeight / 2;

const playerOneHpBar = new HpBar(x, y, playerOneHpBarWidth, playerOneHpBarHeight, playerOneHealth, "red");

const frame = function () {
    playerOneContext.clearRect(0, 0, playerOneCanvasWidth, playerOneCanvasHeight);
    playerOneHpBar.show(playerOneContext);
    requestAnimationFrame(frame);
}

// get rid of an attach to where ever damage is being taking
playerOneCanvas.onclick = function () {
    playerOneHealth -= 10;
    playerOneHpBar.updateHealth(playerOneHealth);
};



frame();

    // switch(choice.toLowerCase()){
    //     case '1': 
    //     case 'potion':
    //     if (player1.hp === player1.maxHp) {
    //         await text ('You are at full health!')
    //         return shop();
    //     }
    //     if (player1.gold < 10) {
    //         await text('You do not have enough gold!')
    //         return shop();
    //     }
    //     player1.hp = Math.min(player1.hp + 10, player1.maxHp);
    //     player1.gold = Math.max(player1.gold - 10, 0);
    //     return shop();
    //     break;

    // case '2':
    // case 'upgrade':
    //     if (player1.gold < 10) {
    //         await text('You do not have enough gold!')
    //         return shop();
    //     }
    //     player1.gold = Math.max(player1.gold - 10, 0);
    //     player1.attack += 5;
    //     return shop();
    //     break;

    // case '3':
    // case 'accuracy':
    //     if (player1.gold < 10) {
    //         await text('You do not have enough gold!')
    //         return shop();
    //     }
    //     player1.gold = Math.max(player1.gold - 10, 0);
    //     player1.accuracy += 3;
    //     return shop();
    //     break;

    // case '4':
    // case 'leave':
    // default:
    //     let leaveShop = confirm('Are you sure you want to leave the shop?');
    //     if (!leaveShop) {
    //         return shop()
    //     }
    //     break;
    // }
// } 
// Fix exit shop to return to enemy one 

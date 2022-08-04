playbuttonEl = document.querySelector('#play-btn')
storeButtonEl = document.querySelector('#store-btn')
fieldSetScreen = document.querySelector('#game-fieldset')
startScreen = document.querySelector('#main-fieldset')
storeScreen = document.querySelector('#store-fieldset')
textBox = document.querySelector('.txt-container')
textBoxText = document.querySelector(".txt-container p")
moveBtnContainer = document.querySelector(".btn-container")
shopContainer = document.querySelector("#shop-container p")
modalEl = document.querySelector('.modal')
modalText = document.querySelector(".modal p")

const player1 = {
    maxHp: 100,
    hp: 50,
    attack: 10,
    accuracy: 10,
    gold: 10,
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
    },
    {
        name: "monster-2",
        maxHp: 70,
        hp: 70,
        attack: 15,
        accuracy: 5,
        gold: 35,
    },
    {
        name: "monster-3",
        maxHp: 100,
        hp: 100,
        attack: 35,
        accuracy: 3,
        gold: 100,
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
    textBoxText.innerHTML = `<pre>${string}</pre>`
    okBtn = document.createElement("button")
    okBtn.textContent = "ok"
    textBox.appendChild(okBtn)
    await new Promise(function(resolve, reject){
        okBtn.addEventListener("click", ()=>{
            resolve()
        }, {once: true})
    })
    textBoxText.innerHTML = ''
    okBtn.remove()
}

async function moves(){
    attackBtn = document.createElement("button")
    runBtn = document.createElement("button")
    miscBtn = document.createElement("button")

    textBoxText.textContent = 'What would you like to do?'
    attackBtn.textContent = "Attack"
    runBtn.textContent = "Run"
    miscBtn.textContent = "Misc"
    moveBtnContainer.append(attackBtn, runBtn, miscBtn)
    
    return await new Promise((resolve,reject)=>{
        attackBtn.addEventListener("click",()=>{
            resolve('Attack')
        })
    })
    .then(results =>{
        console.log(results)
        moveBtnContainer.innerHTML = ''
        return results
    })
}


//Logic for attacking and enemies showing up
// Temporary await text until we finish modal for text input

playbuttonEl.addEventListener("click", ()=>{
    fieldSetScreen.style.display = 'block'
    startScreen.style.display = 'none'
})

storeButtonEl.addEventListener("click",async ()=>{
    await shop()
    startScreen.style.display = 'none'
    storeScreen.style.display = 'block'
})

startGame()

//Loop through enemies and choose to attack or run
 async function startGame(){
    for(let i =0; i <enemies.length; i++){
    currentEnemy = enemies[i]
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
                break
            } else{
                await attack(currentEnemy, player1)
            }
            if(player1.hp === 0){
                await text('You have been defeated. Game Over ):')
                break
            }
        }
        if (player1.hp === 0){
            break
        }

        if(i === enemies.length - 1){
            await text('Congratulations! You Win!')
        }else{
            await text('You have entered the shop!')
            // add shop function here 
            await shop()
        }
    }
}




//Function for attacking / missing target
async function attack(attacker, target){
    textBoxText.textContent = "You attacked the enemy"
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
async function shop(){

    textBoxText.textContent = (`Name: ${player1.name}, 
        Gold: ${player1.gold} gold,
        Hp: ${player1.hp} hp,
        Attack: ${player1.attack} attack,
        Accuracy: ${player1.accuracy} accuracy
        \n What would you like to buy:`)

    //Give textBoxText container class name shop so we can target it in css to look different
    shopContainer.innerHTML = (`<pre>${textBoxText.textContent}</pre>`)

    potionBtn = document.createElement('button')
    upgradeBtn = document.createElement('button')
    accuracyBtn = document.createElement('button')
    leaveBtn = document.createElement('button')
    
    potionBtn.textContent = "Potion(+10 health, cost 10 gold)"
    upgradeBtn.textContent = "upgrade(+5 attack, cost 10 gold)"
    accuracyBtn.textContent = "accuracy(+3 accuracy, cost 10 gold)"
    leaveBtn.textContent = "leave"

    potionModal = document.createElement('p')
    potionModal.innerHTML = `<a href="#ex1" rel="modal:open">${potionBtn.textContent}</a>`
    upgradeModal = document.createElement('p')
    upgradeModal.innerHTML = `<a href="#ex1" rel="modal:open">${upgradeBtn.textContent}</a>`
    accuracyModal = document.createElement('p')
    accuracyModal.innerHTML = `<a href="#ex1" rel="modal:open">${accuracyBtn.textContent}</a>`
    leaveModal = document.createElement('p')
    leaveModal.innerHTML = `<a href="#ex1" rel="modal:open">${leaveBtn.textContent}</a>`

    shopContainer.append(potionModal, upgradeModal, accuracyModal, leaveModal)

    document.querySelector('#buttonList').addEventListener("click", (e)=>{
        console.log(e.target)
        if (player1.hp === player1.maxHp) {
            console.log('hello')
            modalText.textContent = 'You are at max health!'
            return shop();
        }
        if (player1.gold < 10) {
            modalText.textContent = 'You do not have enough gold!'
            return shop();
        }
        player1.hp = Math.min(player1.hp + 10, player1.maxHp);
        player1.gold = Math.max(player1.gold - 10, 0);

        return shop();
    })


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
} 
// Fix exit shop to return to enemy one 

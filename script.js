const player1 = {
    maxHp: 100,
    hp: 100,
    attack: 10,
    accuracy: 10,
    gold: 20,
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

// Temporary alert until we finish modal for text input
alert("Welcome to the game!")
player1.name = noNullAnswers('What is your name?')

function noNullAnswers(promptStr){
    const answer = prompt(promptStr)
    if(answer){
        return answer
    }else {
         alert('This is invalid!')
        return noNullAnswers(promptStr)
    }
}

//Loop through enemies and choose to attack or run
for(let i =0; i <enemies.length; i++){
    currentEnemy = enemies[i]
    alert(`Round ${i + 1}: ${currentEnemy.name} has appeared!`)

    while(currentEnemy.hp >= 0){
        const attackOption = confirm('Click OK to attack or Cancel to run')
        if (attackOption){
            attack(player1, currentEnemy)
        }else{
            alert('You Ran!')
            break
        }
        if(currentEnemy.hp === 0){
            alert(`You defeated the ${currentEnemy.name}!`)
            alert(`You have earned ${currentEnemy.gold} gold.`)
            player1.gold += currentEnemy.gold
            break
        } else{
            attack(currentEnemy, player1)
        }
        if(player1.hp === 0){
            alert('You have been defeated. Game Over ):')
            break
        }
    }
    if (player1.hp === 0){
        break
    }

    if(i === enemies.length - 1){
        alert('Congratulations! You Win!')
    }else{
        alert('You have entered the shop!')
        // add shop function here 
        //shop()
    }

}

//Function for attacking / missing target
function attack(attacker, target){
    const miss = Math.floor(Math.random() * attacker.accuracy)
    if(miss === 0){
        alert(`${attacker.name} missed`)
        return 0
    }
    min = attacker.attack
    max = attacker.attack +5
    //Lets hit, attack for a more random number between (attack - attack+5)
    const hit = Math.floor(Math.random() * (max - min + 1)) + min
    alert(`${attacker.name} did ${hit} damage to ${target.name}!`)
    target.hp = Math.max(target.hp - hit, 0)
    alert(`${target.name} now has ${target.hp}hp`)
}

//Start of the shop
function shop(){
    const choice = prompt(`
    Name: ${player1.name}`)
}

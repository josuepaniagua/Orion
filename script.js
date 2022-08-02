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

document.getElementById("play-btn").addEventListener("click", alert("Welcome to the game!"));
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
        shop()
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
    Name: ${player1.name}, 
    Gold: ${player1.gold} gold,
    Hp: ${player1.hp} hp,
    Attack: ${player1.attack} attack,
    Accuracy: ${player1.accuracy} accuracy
    \n Would you like to buy
    1: potion(+10 health, cost 10 gold)
    2: upgrade(+5 attack, cost 10 gold)
    3: accuracy(+3 accuracy, cost 10 gold)
    4: leave`)
    
    switch(choice.toLowerCase()){
        case '1': 
        case 'potion':
            if (player1.hp === player1.maxHp) {
                alert ('You are at full health!')
                return shop();
        }
        if (player1.gold < 10) {
            alert('You do not have enough gold!')
            return shop();
        }
        player1.hp = Math.min(player1.hp + 10, player1.maxHp);
        player1.gold = Math.max(player1.gold - 10, 0);
        return shop();
        break;

    case '2':
    case 'upgrade':
        if (player1.gold < 10) {
            alert('You do not have enough gold!')
            return shop();
        }
        player1.gold = Math.max(player1.gold - 10, 0);
        player1.attack += 5;
        return shop();
        break;

    case '3':
    case 'accuracy':
        if (player1.gold < 10) {
            alert('You do not have enough gold!')
            return shop();
        }
        player1.gold = Math.max(player1.gold - 10, 0);
        player1.accuracy += 3;
        return shop();
        break;

    case '4':
    case 'leave':
    default:
        let leaveShop = confirm('Are you sure you want to leave the shop?');
        if (!leaveShop) {
            return shop()
        }
        break;
    }
} 
// Fix exit shop to return to enemy one 

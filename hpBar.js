


// progress bar goes off of percent
playerValue = (player1.hp/player1.maxHp) * 100


function updatePlayerHP (playerHp, value, playerHealthTotal) {
    value = Math.round(value);
    playerHpDisplay.querySelector(".player-hp-fill").style.width = `${value}%`; 
    playerHpDisplay.querySelector("#player-hp-text").textContent = `${playerHealthTotal}`; 
}

const playerHpDisplay = document.querySelector('#player-hp-container')
console.log(playerHpDisplay)

updatePlayerHP(playerHpDisplay, playerValue, player1.hp);












// class HpBar {
//     constructor(x, y, w, h, maxHealth, color) {
//         this.x = x;
//         this.y = y;
//         this.w = w;
//         this.h = h;
//         this.maxHealth = maxHealth;
//         this.maxWidth = w;
//         this.health = maxHealth;
//         this.color = color;
//     }

//     show(context) {
//         context.lineWidth = 4;
//         context.strokeStyle = "#333";
//         context.fillStyle = this.color;
//         context.fillRect(this.x, this.y, this.w, this.h);
//         context.strokeRect(this.x, this.y, this.maxWidth, this.h);
//     }

//     updateHealth(val) {
//         if (val >= 0) {
//             this.health = val;
//             this.w = (this.health / this.maxHealth) * this.maxWidth;
//         }
//     }
// }
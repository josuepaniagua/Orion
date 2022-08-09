
function updateHP (target) {
    const value = Math.round((target.hp/target.maxHp) * 100);
    target.hpEl.style.width = `${value}%`; 
    target.hpTextEl.textContent = `${target.hp}`; 
}

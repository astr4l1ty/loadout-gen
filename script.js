// Add your game's towers here! 
const TOWERS = [
    { name: "Scout", type: "basic", icon: "scout.png" },
    { name: "Sniper", type: "basic", icon: "sniper.png" },
    { name: "Soldier", type: "basic", icon: "soldier.png" },
    { name: "Commando", type: "basic", icon: "commando.png" },
    { name: "Railgunner", type: "basic", icon: "railgunner.png" },
    { name: "Aviator", type: "basic", icon: "aviator.png" },
    { name: "Fragger", type: "basic", icon: "fragger.png" },
    { name: "Cryo-Gunner", type: "basic", icon: "cryo.png" },
    { name: "Patrol", type: "basic", icon: "patrol.png" },
    { name: "Mercenary", type: "basic", icon: "merc.png" },
    { name: "Shotgunner", type: "basic", icon: "shotty.png" },
    { name: "Tuber", type: "basic", icon: "tuber.png" },
    { name: "Mortar", type: "basic", icon: "mortar.png" },
    { name: "Enforcer", type: "basic", icon: "enforcer.png" },
    { name: "Barracks", type: "basic", icon: "barracks.png" },
    { name: "Flamethrower", type: "basic", icon: "flame.png" },
    { name: "Marksman", type: "basic", icon: "marks.png" },
    { name: "Plasma Trooper", type: "basic", icon: "plasma.png" },
    { name: "Phaser", type: "basic", icon: "fazer.png" },
    { name: "Zed", type: "basic", icon: "zed.png" },
    { name: "Harpoon Hunter", type: "exclusive", icon: "harpoon.png" },
    { name: "Huntsman", type: "exclusive", icon: "hunts.png" },
    { name: "Sleeter", type: "exclusive", icon: "sleeter.png" },
    { name: "Hallowboomer", type: "exclusive", icon: "hallowboomer.png" },
    { name: "Graveyard", type: "exclusive", icon: "graveyard.png" }
];

const FARM = { name: "Farm", type: "eco", icon: "farm.png" };
const DJ = { name: "DJ", type: "support", icon: "dj.png" };
const CMDR = { name: "Commander", type: "support", icon: "commander.png" };

function roll() {
    let loadout = [];
    let pool = [...TOWERS];

    if (!document.getElementById('opt-exclusive').checked) {
        pool = pool.filter(t => t.type !== 'exclusive');
    }

    if (document.getElementById('opt-farm').checked) {
        loadout.push(FARM);
    }

    const bothSupport = document.getElementById('opt-both').checked;
    const oneSupport = document.getElementById('opt-support').checked;

    if (bothSupport) {
        loadout.push(DJ, CMDR);
    } else if (oneSupport) {
        loadout.push(Math.random() > 0.5 ? DJ : CMDR);
    }

    let shuffledPool = pool.sort(() => 0.5 - Math.random());
    
    for (let tower of shuffledPool) {
        if (loadout.length >= 5) break;
        if (!loadout.some(t => t.name === tower.name)) {
            loadout.push(tower);
        }
    }
    render(loadout);
}

function render(loadout) {
    const display = document.getElementById('loadout-display');
    display.innerHTML = ''; 

    loadout.forEach((tower, index) => {
        const slot = document.createElement('div');
        
        slot.className = "tower-slot flex items-center p-3 rounded shadow-lg animate-pop";
        slot.style.animationDelay = `${index * 0.05}s`;

        slot.innerHTML = `
            <div class="w-12 h-12 bg-zinc-800 border border-zinc-600 rounded flex items-center justify-center overflow-hidden">
                <img src="icons/${tower.icon}" alt="${tower.name}" class="w-full h-full object-contain p-1">
            </div>
            <div class="ml-4 text-zinc-200 text-lg font-normal normal-case">
                ${tower.name}
            </div>
        `;
        display.appendChild(slot);
    });
}

document.getElementById('roll-btn').addEventListener('click', roll);
window.onload = roll;

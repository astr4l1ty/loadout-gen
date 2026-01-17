// Add your game's towers here! 
const TOWERS = [
    { name: "Scout", type: "basic", icon: "scout.png" },
    { name: "Sniper", type: "basic", icon: "sniper.png" },
    { name: "Soldier", type: "basic", icon: "soldier.png" },
    { name: "Minigunner", type: "basic", icon: "minigunner.png" },
    { name: "Ranger", type: "basic", icon: "ranger.png" },
    { name: "Ace Pilot", type: "basic", icon: "ace.png" },
    { name: "Sledger", type: "exclusive", icon: "sledger.png" },
    { name: "Gladiator", type: "exclusive", icon: "gladiator.png" },
    { name: "Toxic Gunner", type: "exclusive", icon: "toxic.png" }
];

const FARM = { name: "Farm", type: "eco", icon: "https://cdn.discordapp.com/attachments/1390748385644122182/1462177980569620691/latest.png?ex=696d3edc&is=696bed5c&hm=5a09731d68d6788e72cfa2ba860d13097c08910acfa64f52f65dde7a35d3906f&" };
const DJ = { name: "DJ Booth", type: "support", icon: "dj.png" };
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
        
        // Removed all potential "bold" or "uppercase" Tailwind classes
        slot.className = "tower-slot flex items-center p-3 rounded shadow-lg animate-pop";
        slot.style.animationDelay = `${index * 0.05}s`;

        // Added explicit "font-normal" and "normal-case" classes
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

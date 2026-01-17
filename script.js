// Add your game's towers here! 
// Ensure your image files are in a folder named 'icons'
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

const FARM = { name: "Farm", type: "eco", icon: "farm.png" };
const DJ = { name: "DJ Booth", type: "support", icon: "dj.png" };
const CMDR = { name: "Commander", type: "support", icon: "commander.png" };

function roll() {
    let loadout = [];
    let pool = [...TOWERS];

    // 1. Filter out Exclusives if toggle is off
    if (!document.getElementById('opt-exclusive').checked) {
        pool = pool.filter(t => t.type !== 'exclusive');
    }

    // 2. Add Farm if toggled
    if (document.getElementById('opt-farm').checked) {
        loadout.push(FARM);
    }

    // 3. Handle Support logic
    const bothSupport = document.getElementById('opt-both').checked;
    const oneSupport = document.getElementById('opt-support').checked;

    if (bothSupport) {
        loadout.push(DJ, CMDR);
    } else if (oneSupport) {
        // Randomly pick DJ or Commander
        loadout.push(Math.random() > 0.5 ? DJ : CMDR);
    }

    // 4. Fill remaining slots up to 5
    // Shuffle the pool for variety
    let shuffledPool = pool.sort(() => 0.5 - Math.random());
    
    for (let tower of shuffledPool) {
        if (loadout.length >= 5) break;
        // Avoid duplicates if the random pool picks a tower already added via settings
        if (!loadout.some(t => t.name === tower.name)) {
            loadout.push(tower);
        }
    }

    render(loadout);
}

function render(loadout) {
    const display = document.getElementById('loadout-display');
    display.innerHTML = ''; // Clear old loadout

    loadout.forEach((tower, index) => {
        const slot = document.createElement('div');
        
        // Classes updated to remove font-black and uppercase
        slot.className = "tower-slot flex items-center p-3 rounded shadow-lg animate-pop";
        slot.style.animationDelay = `${index * 0.05}s`;

        slot.innerHTML = `
            <div class="w-12 h-12 bg-zinc-800 border border-zinc-600 rounded flex items-center justify-center overflow-hidden">
                <img src="icons/${tower.icon}" alt="${tower.name}" class="w-full h-full object-contain p-1">
            </div>
            <div class="ml-4 text-zinc-200 text-lg">
                ${tower.name}
            </div>
        `;
        display.appendChild(slot);
    });
}

// Event Listeners
document.getElementById('roll-btn').addEventListener('click', roll);

// Initial roll when page opens
window.onload = roll;

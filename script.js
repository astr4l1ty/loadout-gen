// Add your game's towers here!
const TOWERS = [
    { name: "Scout", type: "basic", icon: "🔫" },
    { name: "Sniper", type: "basic", icon: "🎯" },
    { name: "Soldier", type: "basic", icon: "🎖️" },
    { name: "Minigunner", type: "basic", icon: "🔥" },
    { name: "Ranger", type: "basic", icon: "🏹" },
    { name: "Ace Pilot", type: "basic", icon: "✈️" },
    { name: "Sledger", type: "exclusive", icon: "🔨" },
    { name: "Gladiator", type: "exclusive", icon: "⚔️" },
    { name: "Toxic Gunner", type: "exclusive", icon: "🧪" }
];

const FARM = { name: "Farm", type: "eco", icon: "💰" };
const DJ = { name: "DJ Booth", type: "support", icon: "🎧" };
const CMDR = { name: "Commander", type: "support", icon: "🗣️" };

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
    // We shuffle the pool to pick random unique towers
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
    display.innerHTML = ''; // Clear old loadout

    loadout.forEach((tower, index) => {
        const slot = document.createElement('div');
        slot.className = "tower-slot flex items-center p-3 rounded shadow-lg animate-pop";
        slot.style.animationDelay = `${index * 0.05}s`; // Staggered entrance

        slot.innerHTML = `
            <div class="w-12 h-12 bg-zinc-800 border border-zinc-600 rounded flex items-center justify-center text-2xl">
                ${tower.icon}
            </div>
            <div class="ml-4 font-black uppercase tracking-tight">
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

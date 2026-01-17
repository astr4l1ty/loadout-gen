const towerData = [
    { name: "Sniper", type: "Offense" },
    { name: "Archer", type: "Offense" },
    { name: "Medic", type: "Support" },
    { name: "Farmer", type: "Support" },
    { name: "Wizard", type: "Offense" },
    { name: "Ice Mage", type: "Support" }
];

function generateLoadout() {
    const display = document.getElementById('tower-display');
    const noSupport = document.getElementById('no-support').checked;

    // Filter list based on blue box settings
    let available = noSupport ? towerData.filter(t => t.type !== "Support") : [...towerData];

    // Shuffle and pick 5
    let shuffled = available.sort(() => 0.5 - Math.random());
    let selection = shuffled.slice(0, 5);

    // Update the Yellow box
    display.innerHTML = "";
    selection.forEach(tower => {
        display.innerHTML += `
            <div class="tower-slot">
                <div class="icon-box"></div>
                <div class="name-box">${tower.name}</div>
            </div>
        `;
    });
}

let players = null;
let formation = {
    players: new Array(11).fill(null)
};
let selectedPlayerNames = new Array(11).fill("");

function loadPlayersFromJson() {
    fetch('player-data/players.json')
        .then(response => response.json())
        .then(data => {
            players = data;
            showForm();
        });
}

function showForm() {
    const formContainer = document.getElementById("formContainer");
    formContainer.style.display = "block";

    const formationForm = document.getElementById("formationForm");
    formationForm.innerHTML = "";

    // Arqueros
    addPlayerSelect(0, "Arquero");

    // Defensas
    for (let i = 1; i < 5; i++) {
        addPlayerSelect(i, ["Defensa", "Lateral"]);
    }

    // Mediocampistas
    for (let i = 5; i < 8; i++) {
        addPlayerSelect(i, ["Pivote", "Mediocentro"]);
    }

    // Delanteros
    for (let i = 8; i < 11; i++) {
        addPlayerSelect(i, ["Delantero", "Extremo"]);
    }
}

function addPlayerSelect(index, positions) {
    const formationForm = document.getElementById("formationForm");

    const div = document.createElement("div");
    div.className = "form-group";

    const label = document.createElement("label");
    label.textContent = index === 0 ? "Arquero" : index < 5 ? "Defensa" : index < 8 ? "Mediocampista" : "Delantero";
    div.appendChild(label);

    const select = document.createElement("select");
    select.id = `player-${index}`;
    select.className = "form-control";
    select.onchange = (event) => {
        selectedPlayerNames[index] = event.target.value;
        updateX3D(); // Llama a la función updateX3D cuando cambia la selección
    };

    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "-- Escoge un jugador --";
    select.appendChild(defaultOption);

    players.forEach(player => {
        if (positions.includes(player.position)) {
            const option = document.createElement("option");
            option.value = player.name;
            option.textContent = player.name;
            select.appendChild(option);
        }
    });

    div.appendChild(select);
    formationForm.appendChild(div);
}

function updateX3D() {
    formation.players.forEach((player, index) => {
        const selectedPlayerName = selectedPlayerNames[index];
        const textNode = document.getElementById(`player-${index}-text`).querySelector("text");

        if (selectedPlayerName) {
            textNode.setAttribute("string", selectedPlayerName);
            textNode.setAttribute("solid", "false");
        } else {
            // Ocultar el texto estableciendo el string a una cadena vacía
            textNode.setAttribute("string", "");
        }
    });
}

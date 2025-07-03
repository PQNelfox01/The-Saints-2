// Función para precargar imágenes
function preloadImages(players) {
    players.forEach(player => {
        const img = new Image();
        img.src = `assets/images/players/${player.id}.png`; // Corregido: player.id en lugar de players.id
    });
}

// Función principal para cargar y mostrar datos
function loadAndDisplayPlayers() {
    fetch('players.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            preloadImages(data.players);
            displayPlayers(data.players);
        })
        .catch(error => {
            console.error('Error al cargar los datos:', error);
            // Mostrar mensaje de error al usuario
            const container = document.getElementById('playersContainer');
            container.innerHTML = `
                <div class="error-message">
                    <p>No se pudieron cargar los datos de los jugadores.</p>
                    <p>Por favor, intenta recargar la página.</p>
                    <p>Error: ${error.message}</p>
                </div>
            `;
        });
}

// Función para mostrar los jugadores
function displayPlayers(players) {
    const container = document.getElementById('playersContainer');
    container.innerHTML = ''; // Limpiar contenedor primero

    players.forEach(player => {
        const playerCard = document.createElement('div');
        playerCard.className = 'player-card';

        playerCard.innerHTML = `
            <div class="card-inner">
                <div class="card-front">
                    <img src="assets/images/players/${player.img}" 
                         alt="${player.name}" 
                         class="player-image"
                         loading="lazy"
                         onerror="this.onerror=null;this.src='assets/images/players/default.png'">
                    <h3 class="player-name">${player.name}</h3>
                    <p class="player-desc">${player.description}</p>
                    ${player.hours_played ? `<p class="player-hours">Horas jugadas: ${player.hours_played}</p>` : ''}
                </div>
                <div class="card-back">
                    <h3 class="player-name">${player.name}</h3>
                    <p class="player-desc">${player.description}</p>
                    <div class="stats-container">
                        ${generateStatsHTML(player.stats)}
                    </div>
                    <a href="${player.tracker_url}" target="_blank" rel="noopener noreferrer" class="tracker-link">
                        Ver perfil en Tracker Network
                    </a>
                </div>
            </div>
        `;

        container.appendChild(playerCard);
    });
}

// Función auxiliar para generar el HTML de las estadísticas
function generateStatsHTML(stats) {
    const statItems = [
        { label: 'Goles', value: stats.goals },
        { label: 'Asistencias', value: stats.assists },
        { label: 'Atajadas', value: stats.saves }
    ];
    
    return statItems.map(stat => `
        <div class="stat-item">
            <span>${stat.label}:</span>
            <span>${stat.value}</span>
        </div>
    `).join('');
}

// Iniciar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', loadAndDisplayPlayers);
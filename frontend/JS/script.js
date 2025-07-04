// Función para precargar imágenes
function preloadImages(players) {
    players.forEach(player => {
        const img = new Image();
        img.src = `assets/images/players/${player.img}`;
    });
}

// Función principal para cargar y mostrar datos
function loadAndDisplayPlayers() {
    fetch('/players.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            preloadImages(data.players);
            displayPlayers(data.players);
            setupCardAnimations();
        })
        .catch(error => {
            console.error('Error al cargar los datos:', error);
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
    container.innerHTML = '';

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

// Función para generar HTML de estadísticas con barras animadas
function generateStatsHTML(stats) {
    return `
        <div class="stat-item">
            <span>Goles</span>
            <div class="stat-bar-container">
                <div class="stat-bar">
                    <div class="stat-bar-fill" style="--width: ${stats.goals}%"></div>
                </div>
                <span class="stat-value">${stats.goals}%</span>
            </div>
        </div>
        <div class="stat-item">
            <span>Asistencias</span>
            <div class="stat-bar-container">
                <div class="stat-bar">
                    <div class="stat-bar-fill" style="--width: ${stats.assists}%"></div>
                </div>
                <span class="stat-value">${stats.assists}%</span>
            </div>
        </div>
        <div class="stat-item">
            <span>Atajadas</span>
            <div class="stat-bar-container">
                <div class="stat-bar">
                    <div class="stat-bar-fill" style="--width: ${stats.saves}%"></div>
                </div>
                <span class="stat-value">${stats.saves}%</span>
            </div>
        </div>
    `;
}

// Configurar animaciones al voltear las tarjetas
function setupCardAnimations() {
    const cards = document.querySelectorAll('.player-card');
    
    cards.forEach(card => {
        card.addEventListener('click', function() {
            // Activar animaciones cuando se voltea la tarjeta
            if (this.classList.contains('flipped')) {
                this.classList.add('active');
            }
        });
        
        // Observar cuando la tarjeta entra en la vista
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(card);
    });
}

// Iniciar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', loadAndDisplayPlayers);
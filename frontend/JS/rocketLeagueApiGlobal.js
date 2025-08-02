// rocketLeagueApiGlobal.js

/**
 
Obtiene el perfil de Rocket League de un usuario en Tracker.gg,
@param {string} platform - Plataforma (e.g. "epic", "steam"),
@param {string} username - Nombre de usuario (ej. "R . K . X"),
@returns {Promise<Object>} - El JSON con la respuesta del API*/
async function fetchRocketLeagueProfile(platform, username) {
  const encodedUser = encodeURIComponent(username);
  const url = `https://api.tracker.gg/api/v2/rocket-league/standard/profile/${platform}/${encodedUser}`;

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
      // 'TRN-Api-Key': 'TU_API_KEY_AQUI'  si la necesitas
    }
  });

  if (!res.ok) {
    const txt = await res.text();
    // throw new Error(Error ${res.status}: ${txt});
  }

  return res.json();
}

// Exponerla globalmente
window.fetchRocketLeagueProfile = fetchRocketLeagueProfile;
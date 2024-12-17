// Exemple de requête fetch pour accéder à une route protégée
fetch('/profile', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${document.cookie.token}`  // Ajouter le token depuis le cookie, si besoin
    },
    credentials: 'same-origin' // Envoie les cookies (dont le token) dans les requêtes
  })
    .then(response => response.json())
    .then(data => {
      console.log('Profile data:', data);
    })
    .catch(error => {
      console.error('Error fetching profile:', error);
    });

function homeView(annonces, user) {
    return `
    <html>
        <head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f9fafb;
                    color: #333;
                }
                .container {
                    width: 80%;
                    margin: 0 auto;
                    padding: 20px;
                    text-align: center;
                }
                h1 {
                    color: #333;
                }
                .card {
                    background-color: white;
                    border-radius: 8px;
                    padding: 20px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    margin-bottom: 20px;
                }
                .card:hover {
                    transform: scale(1.05);
                    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
                }
                .buttons {
                    margin-top: 10px;
                    display: flex;
                    justify-content: center;
                    gap: 20px;
                }
                .btn {
                    padding: 10px 20px;
                    margin: 5px;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    font-weight: bold;
                }
                .btn-login {
                    background-color: #4CAF50;
                    color: white;
                }
                .btn-login:hover {
                     background-color:rgb(19, 169, 46);
                    }
                .btn-register {
                    background-color: #2196F3;
                    color: white;
                }
                button {
                    padding: 10px 20px;
                    margin: 5px;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                }
            </style>
        </head>
        <body>

            <div class="container">
                <h1>Bienvenue sur notre plateforme d'annonces</h1>
                <p>Voici quelques annonces que vous pouvez consulter :</p>

            <!-- Bouton d'accès à l'administration (visible uniquement pour les admins) -->
            ${user && user.role === 'admin' ? `
                <button onclick="window.location.href='/admin'" class="btn btn-login">page administrateur</button>
            ` : ''}
                              
                <button onclick="window.location.href='/profile'" class="w-full py-3 mb-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            profil utilisateur
            </button>

                <button onclick="window.location.href='/logout'" class="w-full py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500">
            Se déconnecter
            </button>
                
                <!-- Affichage des annonces -->

                <div>
                    ${annonces.map(annonce => `
                    <div class="card">
                        <h2>${annonce.title}</h2>
                        <h3>Annonce publiée par : ${user.username}</h3>
                        <p>${annonce.description}</p>
                        <p><strong>Prix:</strong> ${annonce.price}€</p>
                         <form method="POST" action="/favorites/${annonce.id}">
                         <button type="submit">Ajouter aux favoris</button>
                         </form>
                    </div>
                    `).join('')}
                </div>
                
                <!-- Boutons de connexion et d'inscription -->
               <div class="buttons">
                    ${!user ? `
                    <button onclick="window.location.href='/login'" class="btn btn-login">Se connecter</button>
                    <button onclick="window.location.href='/register'" class="btn btn-register">S'inscrire</button>
                    ` : ''}
                </div>
            </div>

        </body>
    </html>
    `;
}

module.exports = homeView;

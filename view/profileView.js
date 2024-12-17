const nav = require('./nav');  

function profileView(user, annonces) {
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
                }
                h1, h2 {
                    text-align: center;
                    color: #333;
                }
                .card {
                    background-color: white;
                    border-radius: 8px;
                    padding: 20px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    margin-bottom: 20px;
                }
                .buttons {
                    margin-top: 10px;
                }
                button {
                    padding: 10px 20px;
                    margin: 5px;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                }
                .btn-delete {
                    background-color: red;
                    color: white;
                }
                
                .btn-delete:hover {
                    background-color:rgb(255, 92, 89);
                }

                .btn-edit:hover {
                    background-color:rgb(96, 99, 255);
                }

                .btn-edit {
                    background-color: blue;
                    color: white;
                }

                .btn-update:hover {
                    background-color:rgb(19, 169, 46);
                }

                .btn-update {
                    background-color: green;
                    color: white;
                }
                .form-container {
                    display: none;
                    margin-top: 10px;
                    padding: 15px;
                    background-color: #f0f0f0;
                    border-radius: 5px;
                }
                input[type="text"], textarea, input[type="number"] {
                    width: 100%;
                    padding: 10px;
                    margin-bottom: 10px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                }
                input[type="submit"] {
                    background-color: green;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    cursor: pointer;
                    border-radius: 5px;
                }
            </style>
        </head>
        <body>

            <div class="container">
                <h1>Bienvenue, ${user.username}!</h1>
                <p>Voici votre profil :</p>
                <ul>
                    <li><strong>Nom d'utilisateur:</strong> ${user.username}</li>
                </ul>
           
                <button onclick="window.location.href='/depot'" class="w-full py-3 mb-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            Déposer une nouvelle annonce
            </button>

            <button onclick="window.location.href='/logout'" class="w-full py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500">
            Se déconnecter
            </button>

            <button onclick="window.location.href='/home'" class="w-full py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500">
            page d'accueil
            </button>
            </div>


            <div class="container">
                <h2>Vos Annonces :</h2>
                ${annonces.map(annonce => `
                <div class="card">
                    <div>
                        <strong>${annonce.title}</strong><br>
                        <p>${annonce.description}</p>
                        <p><strong>Prix:</strong> ${annonce.price}€</p>
                    </div>

                    <div class="buttons">
                        <!-- Formulaire de suppression -->
                        <form action="/supprDepot" method="POST" style="display:inline;">
                            <input type="hidden" name="adId" value="${annonce.id}">
                            <button type="submit" class="btn-delete" onclick="return confirm('Êtes-vous sûr de vouloir supprimer cette annonce ?');">Supprimer</button>
                        </form>

                        <!-- Bouton Modifier -->
                        <button onclick="openEditForm(${annonce.id}, '${annonce.title}', '${annonce.description}', ${annonce.price})" class="btn-edit">Modifier</button>
                    </div>

                    <!-- Formulaire de modification -->
                    <div id="editForm${annonce.id}" class="form-container">
                        <form action="/modifierAnnonce" method="POST">
                            <input type="hidden" name="adId" value="${annonce.id}">
                            <label for="title">Titre :</label>
                            <input type="text" id="title" name="title" value="${annonce.title}" required><br>

                            <label for="description">Description :</label>
                            <textarea id="description" name="description" required>${annonce.description}</textarea><br>

                            <label for="price">Prix :</label>
                            <input type="number" id="price" name="price" value="${annonce.price}" required><br>

                            <input type="submit" value="Mettre à jour" class="btn-update">
                        </form>
                    </div>
                </div>
                `).join('')}
            </div>

        
            <script>
                // Fonction pour ouvrir le formulaire de modification
                function openEditForm(adId, title, description, price) {
                    const form = document.getElementById('editForm' + adId);
                    form.style.display = form.style.display === 'block' ? 'none' : 'block'; // Toggle display
                }
            </script>

        </body>
    </html>
    `;
}

module.exports = profileView;

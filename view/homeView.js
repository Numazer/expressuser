const annonces = [
    {
        title: "Vente de vélo",
        description: "Vélo en excellent état, utilisé pendant un mois.",
        price: 150.00
    },
    {
        title: "Canapé d'occasion",
        description: "Canapé 3 places en bon état, à récupérer sur place.",
        price: 250.00
    },
    {
        title: "Jeu vidéo PS5",
        description: "Jeu PS5 neuf, jamais ouvert.",
        price: 60.00
    },
    {
        title: "Table en bois",
        description: "Table en bois massif, dimensions 120x80 cm.",
        price: 120.00
    },
    {
        title: "Smartphone Samsung",
        description: "Smartphone Samsung Galaxy S21, état neuf.",
        price: 350.00
    },
    {
        title: "Vélo électrique",
        description: "Vélo électrique, 10 vitesses, avec chargeur.",
        price: 500.00
    },
    {
        title: "Tente de camping",
        description: "Tente de camping pour 4 personnes, jamais utilisée.",
        price: 80.00
    },
    {
        title: "Cuisinière à gaz",
        description: "Cuisinière à gaz 4 foyers, en parfait état de fonctionnement.",
        price: 150.00
    },
    {
        title: "Chaussettes de sport",
        description: "Chaussettes de sport, taille 42-46, lot de 6 paires.",
        price: 15.00
    },
    {
        title: "Lampe de bureau",
        description: "Lampe de bureau à LED, avec variateur de lumière.",
        price: 30.00
    }
];

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
                .btn-register {
                    background-color: #2196F3;
                    color: white;
                }
            </style>
        </head>
        <body>

            <div class="container">
                <h1>Bienvenue sur notre plateforme d'annonces</h1>
                <p>Voici quelques annonces que vous pouvez consulter :</p>
                
                <!-- Affichage des annonces -->

                <div>
                    ${annonces.map(annonce => `
                    <div class="card">
                        <h2>${annonce.title}</h2>
                        <p>${annonce.description}</p>
                        <p><strong>Prix:</strong> ${annonce.price}€</p>
                    </div>
                    `).join('')}
                </div>

                <!-- Boutons de connexion et d'inscription -->
                <div class="buttons">
                    <button onclick="window.location.href='/login'" class="btn btn-login">Se connecter</button>
                    <button onclick="window.location.href='/register'" class="btn btn-register">S'inscrire</button>
                </div>
            </div>

        </body>
    </html>
    `;
}

module.exports = homeView;

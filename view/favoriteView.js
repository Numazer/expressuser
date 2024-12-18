function favoritesView(favorites) {
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
                     button {
                    padding: 10px 20px;
                    margin: 5px;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                }
                    .btn-login {
                    background-color: #4CAF50;
                    color: white;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Vos annonces favorites</h1>
                <div>
                    ${favorites.map(annonce => `
                    <div class="card">
                        <h2>${annonce.title}</h2>
                        <p>${annonce.description}</p>
                        <p><strong>Prix:</strong> ${annonce.price}€</p>
                        <form method="POST" action="/favorites/remove/${annonce.id}">
                            <button type="submit">Supprimer des favoris</button>
                        </form>
                    </div>
                    `).join('')}
                </div>
            </div>
        </body>
    </html>
    `;
}

module.exports = favoritesView;

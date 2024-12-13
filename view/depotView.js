function depotView() {
    return `
        <html>
            <body>
                <h1>Déposer une annonce</h1>
                <form method="POST" action="/depot">
                    <label for="title">Titre de l'annonce:</label>
                    <input type="text" name="title" placeholder="Titre de l'annonce" required>
                    
                    <label for="description">Description de l'annonce:</label>
                    <textarea name="description" placeholder="Description de l'annonce" required></textarea>
                    
                    <label for="price">Prix de l'article:</label>
                    <input type="text" name="price" placeholder="Prix de l'article" required>
                    
                    <button type="submit">Déposer l'annonce</button>
                </form>
            </body>
        </html>
    `;
}

module.exports = depotView;
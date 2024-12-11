function profileView(user) {
    return `
        <html>
            <body>
                <h1>Bienvenue, ${user.username}!</h1>
                <p>Voici votre profil :</p>
                <ul>
                    <li><strong>Nom d'utilisateur:</strong> ${user.username}</li>
                    <li><strong>Email:</strong> ${user.email}</li>  <!-- Exemple si vous avez un email dans la table -->
                    <!-- Ajoutez d'autres informations ici si nécessaire -->
                </ul>
                 <a href="/logout">Se déconnecter</a>
            </body>
        </html>
    `;
}

module.exports = profileView;
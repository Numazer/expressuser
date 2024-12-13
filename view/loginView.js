function loginView() {
    return `
    <html>
        <head>
            <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
        </head>
        <body class="bg-gray-100 h-screen flex justify-center items-center">

            <div class="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 class="text-3xl font-semibold text-center text-gray-800 mb-6">Connexion</h2>
                
                <form method='POST' action='/login'>
                    <!-- Champ Nom d'utilisateur -->
                    <div class="mb-4">
                        <label for="username" class="block text-sm font-medium text-gray-600">Nom d'utilisateur</label>
                        <input type="text" id="username" name="username" placeholder="Nom d'utilisateur" 
                               class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                    </div>
                    
                    <!-- Champ Mot de passe -->
                    <div class="mb-6">
                        <label for="password" class="block text-sm font-medium text-gray-600">Mot de passe</label>
                        <input type="password" id="password" name="password" placeholder="Mot de passe" 
                               class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                    </div>
                    
                    <!-- Bouton Connexion -->
                    <button type="submit" class="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                        Connexion
                    </button>
                </form>
                
                <p class="mt-4 text-center text-sm text-gray-600">
                    Pas encore de compte ? <a href="/register" class="text-indigo-600 hover:text-indigo-700">Inscrivez-vous</a>
                </p>
            </div>

        </body>
    </html>
    `;
}

module.exports = loginView;

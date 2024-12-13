function registerView() {
    return `
    <html>
        <head>
            <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body class="bg-gray-100 flex justify-center items-center h-screen">

            <div class="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
                <h1 class="text-3xl font-bold text-center text-gray-700 mb-6">Créer un compte</h1>

                <form method='POST' action='/register' class="space-y-4">
                    <div>
                        <label for="username" class="block text-sm font-medium text-gray-700">Nom d'utilisateur</label>
                        <input type="text" name="username" id="username" placeholder="Nom d'utilisateur"
                            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-700">
                    </div>

                    <div>
                        <label for="password" class="block text-sm font-medium text-gray-700">Mot de passe</label>
                        <input type="password" name="password" id="password" placeholder="Mot de passe"
                            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-700">
                    </div>

                    <button type="submit"
                        class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
                        Envoyer
                    </button>
                </form>

                <p class="text-center text-sm text-gray-600 mt-4">
                    Vous avez déjà un compte? <a href="/login" class="text-blue-500 hover:text-blue-700">Se connecter</a>
                </p>
            </div>

        </body>
    </html>
    `;
}

module.exports = registerView;

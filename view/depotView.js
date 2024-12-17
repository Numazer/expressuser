function depotView() {
    return `
        <html>
            <head>
                <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
            </head>
            <body class="bg-gray-100 h-screen flex justify-center items-center">

                <div class="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                    <h1 class="text-3xl font-semibold text-center text-gray-800 mb-6">Déposer une annonce</h1>
                    
                    <form method="POST" action="/depot">
                        <!-- Champ Titre de l'annonce -->
                        <div class="mb-4">
                            <label for="title" class="block text-sm font-medium text-gray-600">Titre de l'annonce</label>
                            <input type="text" name="title" placeholder="Titre de l'annonce" 
                                   class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" required>
                        </div>
                        
                        <!-- Champ Description de l'annonce -->
                        <div class="mb-4">
                            <label for="description" class="block text-sm font-medium text-gray-600">Description de l'annonce</label>
                            <textarea name="description" placeholder="Description de l'annonce" 
                                      class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" required></textarea>
                        </div>
                        
                        <!-- Champ Prix de l'article -->
                        <div class="mb-6">
                            <label for="price" class="block text-sm font-medium text-gray-600">Prix de l'article</label>
                            <input type="text" name="price" placeholder="Prix de l'article (€) 
                                   class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" required>
                        </div>
                        
                        <!-- Bouton de soumission -->
                        <button type="submit" class="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                            Déposer l'annonce
                        </button>
                    </form>
                </div>

            </body>
        </html>
    `;
}

module.exports = depotView;

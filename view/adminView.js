function adminView(annonces) {
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
                .btn-approve {
                    background-color: #4CAF50;
                    color: white;
                }
                .btn-reject {
                    background-color: #F44336;
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
                <h1>Page d'Administration - Annonces en attente de validation</h1>
                
                <button onclick="window.location.href='/profile'" class="w-full py-3 mb-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                profil utilisateur
                </button>

                <!-- Si aucune annonce n'est en attente -->
                ${annonces.length === 0 ? `
                  <p>Aucune annonce en attente de validation.</p>
                ` : `
                  <div>
                      ${annonces.map(annonce => `
                          <div class="card">
                              <h3>${annonce.title}</h3>
                              <p>${annonce.description}</p>
                              <p><strong>Prix:</strong> ${annonce.price}€</p>
                              <div class="buttons">
                                  <form action="/admin/approve/${annonce.id}" method="POST">
                                      <button type="submit" class="btn btn-approve">Approuver</button>
                                  </form>
                                  <form action="/admin/reject/${annonce.id}" method="POST">
                                      <button type="submit" class="btn btn-reject">Refuser</button>
                                  </form>
                              </div>
                          </div>
                      `).join('')}
                  </div>
                `}
            </div>
        </body>
    </html>
    `;
  }
  
  module.exports = adminView;
  
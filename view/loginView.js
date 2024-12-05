function loginView() {
    return `<html>
                <body>
                    <form method='POST' action='/login'>
                        <input type='text' placeholder='name' name='username'/>
                        <input type='text' placeholder='password' name='password'/>
                        <button type='submit'>envoyer</button>
                    </form>
                </body>
            </html>`
}

module.exports = loginView;